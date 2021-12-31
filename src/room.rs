use crate::renderer::*;

pub struct Room<M: ForwardMaterial> {
    model: InstancedModel<M>,
    aabb: AxisAlignedBoundingBox,
}

impl<M: ForwardMaterial> Room<M> {
    ///
    /// Creates a room object.
    ///
    pub fn new(context: &Context, material: M) -> ThreeDResult<Self> {
        let aabb = CPUMesh::cube().compute_aabb();
        let max = aabb.max();
        let min = aabb.min();
        let size = aabb.size();
        let thickness = 0.005 * size.x.max(size.y).max(size.z);
        let transformations = [
            Mat4::from_translation(min) * Mat4::from_nonuniform_scale(size.x, thickness, thickness),
            Mat4::from_translation(vec3(min.x, max.y, max.z))
                * Mat4::from_nonuniform_scale(size.x, thickness, thickness),
            Mat4::from_translation(vec3(min.x, min.y, max.z))
                * Mat4::from_nonuniform_scale(size.x, thickness, thickness),
            Mat4::from_translation(vec3(min.x, max.y, min.z))
                * Mat4::from_nonuniform_scale(size.x, thickness, thickness),
            Mat4::from_translation(min)
                * Mat4::from_angle_z(degrees(90.0))
                * Mat4::from_nonuniform_scale(size.y, thickness, thickness),
            Mat4::from_translation(vec3(max.x, min.y, max.z))
                * Mat4::from_angle_z(degrees(90.0))
                * Mat4::from_nonuniform_scale(size.y, thickness, thickness),
            Mat4::from_translation(vec3(min.x, min.y, max.z))
                * Mat4::from_angle_z(degrees(90.0))
                * Mat4::from_nonuniform_scale(size.y, thickness, thickness),
            Mat4::from_translation(vec3(max.x, min.y, min.z))
                * Mat4::from_angle_z(degrees(90.0))
                * Mat4::from_nonuniform_scale(size.y, thickness, thickness),
            Mat4::from_translation(min)
                * Mat4::from_angle_y(degrees(-90.0))
                * Mat4::from_nonuniform_scale(size.z, thickness, thickness),
            Mat4::from_translation(vec3(max.x, max.y, min.z))
                * Mat4::from_angle_y(degrees(-90.0))
                * Mat4::from_nonuniform_scale(size.z, thickness, thickness),
            Mat4::from_translation(vec3(min.x, max.y, min.z))
                * Mat4::from_angle_y(degrees(-90.0))
                * Mat4::from_nonuniform_scale(size.z, thickness, thickness),
            Mat4::from_translation(vec3(max.x, min.y, min.z))
                * Mat4::from_angle_y(degrees(-90.0))
                * Mat4::from_nonuniform_scale(size.z, thickness, thickness),
        ];

        let mesh = CPUMesh::cylinder(16);

        let model = InstancedModel::new_with_material(context, &transformations, &mesh, material)?;

        Ok(Self { model, aabb })
    }
}

impl<M: ForwardMaterial> Shadable for Room<M> {
    fn render_forward(
        &self,
        material: &dyn ForwardMaterial,
        camera: &Camera,
        lights: &Lights,
    ) -> ThreeDResult<()> {
        self.model.render_forward(material, camera, lights)
    }

    fn render_deferred(
        &self,
        material: &dyn DeferredMaterial,
        camera: &Camera,
        viewport: Viewport,
    ) -> ThreeDResult<()> {
        self.model.render_deferred(material, camera, viewport)
    }
}

impl<M: ForwardMaterial> Geometry for Room<M> {
    fn aabb(&self) -> AxisAlignedBoundingBox {
        self.aabb
    }

    fn transformation(&self) -> Mat4 {
        Mat4::identity()
    }
}

impl<M: ForwardMaterial> Object for Room<M> {
    fn render(&self, camera: &Camera, lights: &Lights) -> ThreeDResult<()> {
        self.model.render(camera, lights)
    }

    fn is_transparent(&self) -> bool {
        false
    }
}
