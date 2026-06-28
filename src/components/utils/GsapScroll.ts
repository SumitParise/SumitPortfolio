import * as THREE from "three";
import gsap from "gsap";

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  _camera?: THREE.PerspectiveCamera
) {
  let intensity: number = 0;
  setInterval(() => {
    intensity = Math.random();
  }, 200);

  character?.traverse((object: any) => {
    try {
      if (object.name === "screenlight" && object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((mat: any) => {
          if (mat && mat.emissive && typeof mat.emissive.set === "function") {
            mat.transparent = true;
            mat.opacity = 1;
            mat.emissive.set("#C8BFFF");
            gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mat, {
              emissiveIntensity: () => intensity * 8,
              duration: () => Math.random() * 0.6,
              delay: () => Math.random() * 0.1,
            });
          }
        });
      }
      if (object.isMesh && object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((mat: any) => {
          if (mat && mat.name === "Material.027" && mat.color && typeof mat.color.set === "function") {
            mat.transparent = true;
            mat.opacity = 1;
            mat.color.set("#FFFFFF");
          }
        });
      }
    } catch (traversalError) {
      console.warn(`Error applying GSAP timeline on object ${object.name}:`, traversalError);
    }
  });
}

export function setAllTimeline() {
  // No-op for local model
}
