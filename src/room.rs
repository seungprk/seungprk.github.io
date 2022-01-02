use crate::renderer::*;

pub struct Room<M: ForwardMaterial> {
    pub wireframe: InstancedModel<M>,
    pub floor: Model<M>,
    aabb: AxisAlignedBoundingBox,
}

impl<M: ForwardMaterial> Room<M> {
    ///
    /// Creates a room object.
    ///
    pub fn new(context: &Context, wireframe_mat: M, floor_mat: M) -> ThreeDResult<Self> {
        let mut box_mesh = CPUMesh::cube();
        box_mesh.transform(&Mat4::from_nonuniform_scale(1.0, 0.75, 1.0)); // reduce box height

        let aabb = box_mesh.compute_aabb();
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
        let wireframe =
            InstancedModel::new_with_material(context, &transformations, &mesh, wireframe_mat)?;

        let mut floor_mesh = CPUMesh::square();
        floor_mesh.transform(&Mat4::from_angle_x(degrees(90.0))); // rotate to be parallel to ground
        floor_mesh.transform(&Mat4::from_translation(vec3(0.0, min.y, 0.0))); // move to bottom of cube
        let floor = Model::new_with_material(context, &floor_mesh, floor_mat)?;

        Ok(Self {
            wireframe,
            floor,
            aabb,
        })
    }
}

impl<M: ForwardMaterial> Shadable for Room<M> {
    fn render_forward(
        &self,
        material: &dyn ForwardMaterial,
        camera: &Camera,
        lights: &Lights,
    ) -> ThreeDResult<()> {
        self.wireframe.render_forward(material, camera, lights)?;
        self.floor.render_forward(material, camera, lights)?;
        Ok(())
    }

    fn render_deferred(
        &self,
        material: &dyn DeferredMaterial,
        camera: &Camera,
        viewport: Viewport,
    ) -> ThreeDResult<()> {
        self.wireframe.render_deferred(material, camera, viewport)?;
        self.floor.render_deferred(material, camera, viewport)?;
        Ok(())
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
        self.wireframe.render(camera, lights)?;
        self.floor.render(camera, lights)?;
        Ok(())
    }

    fn is_transparent(&self) -> bool {
        false
    }
}
