mod control;
mod room;

use three_d::*;
use wasm_bindgen::prelude::*;

use control::CustomControl;
use room::Room;

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
    console_log::init_with_level(log::Level::Debug).unwrap();

    use log::info;
    info!("Logging works!");

    std::panic::set_hook(Box::new(console_error_panic_hook::hook));
    main();
    Ok(())
}

fn main() {
    let args: Vec<String> = std::env::args().collect();

    let window = Window::new(WindowSettings {
        title: "David's Space".to_string(),
        //max_size: Some((1280, 720)),
        ..Default::default()
    })
    .unwrap();
    let context = window.gl().unwrap();

    let pipeline = ForwardPipeline::new(&context).unwrap();
    let mut camera = Camera::new_perspective(
        &context,
        window.viewport().unwrap(),
        vec3(0.0, 0.0, 5.0),
        vec3(0.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        degrees(45.0),
        0.1,
        1000.0,
    )
    .unwrap();
    let mut control = CustomControl::new(*camera.target(), 1.0, 100.0);

    Loader::load(
        &[
            "assets/skybox/right.jpg",
            "assets/skybox/left.jpg",
            "assets/skybox/up.jpg",
            "assets/skybox/down.jpg",
            "assets/skybox/front.jpg",
            "assets/skybox/back.jpg",
        ],
        move |mut loaded| {
            // Triangle
            let triangle_pos: Vec<f32> = vec![
                0.1, -0.1, 0.0, // bottom right
                -0.1, -0.1, 0.0, // bottom left
                0.0, 0.1, 0.0, // top
            ];
            let triangle_colors: Vec<u8> = vec![
                255, 0, 0, 255, // bottom right
                0, 255, 0, 255, // bottom left
                0, 0, 255, 255, // top
            ];
            let triangle_mesh = CPUMesh {
                positions: triangle_pos,
                colors: Some(triangle_colors),
                ..Default::default()
            };
            let mut triangle = Model::new(&context, &triangle_mesh).unwrap();

            // Room
            let room = Room::new(
                &context,
                ColorMaterial {
                    color: Color::WHITE,
                    ..Default::default()
                },
            )
            .unwrap();

            // Misc
            let skybox = Skybox::new(
                &context,
                &mut loaded
                    .cube_image(
                        "assets/skybox/right.jpg",
                        "assets/skybox/left.jpg",
                        "assets/skybox/up.jpg",
                        "assets/skybox/down.jpg",
                        "assets/skybox/front.jpg",
                        "assets/skybox/back.jpg",
                    )
                    .unwrap(),
            )
            .unwrap();

            let lights = Lights {
                ambient: Some(AmbientLight {
                    intensity: 0.4,
                    color: Color::WHITE,
                }),
                directional: vec![DirectionalLight::new(
                    &context,
                    2.0,
                    Color::WHITE,
                    &vec3(0.0, -1.0, -1.0),
                )
                .unwrap()],
                ..Default::default()
            };

            // main loop
            window
                .render_loop(move |mut frame_input| {
                    camera.set_viewport(frame_input.viewport).unwrap();
                    control
                        .handle_events(&mut camera, &mut frame_input.events)
                        .unwrap();

                    // draw
                    Screen::write(&context, ClearState::default(), || {
                        triangle.set_transformation(Mat4::from_angle_y(radians(
                            (frame_input.accumulated_time * 0.001) as f32,
                        )));
                        pipeline.render_pass(&camera, &[&room, &triangle], &lights)?;
                        skybox.render(&camera)?;
                        Ok(())
                    })
                    .unwrap();

                    if args.len() > 1 {
                        // To automatically generate screenshots of the examples, can safely be ignored.
                        FrameOutput {
                            screenshot: Some(args[1].clone().into()),
                            exit: true,
                            ..Default::default()
                        }
                    } else {
                        FrameOutput::default()
                    }
                })
                .unwrap();
        },
    );
}
