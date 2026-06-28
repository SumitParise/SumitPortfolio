import * as THREE from "three";
import { DRACOLoader, GLTFLoader } from "three-stdlib";
import type { GLTF } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            try {
              character = gltf.scene;

              // Safe compile check to avoid WebGL crash on unmounted contexts
              if (renderer && renderer.compileAsync) {
                await renderer.compileAsync(character, camera, scene);
              }

              character.traverse((child: any) => {
                try {
                  if (child.isMesh && child.material) {
                    const mesh = child as THREE.Mesh;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    mesh.frustumCulled = true;

                    const nameLower = child.name.toLowerCase();

                    // Force smile morph shape on the mouth mesh
                    if (nameLower.includes("plane") && nameLower.includes("007")) {
                      if (child.morphTargetInfluences) {
                        child.morphTargetInfluences[0] = 1.0;
                      }
                    }

                    // Stylize character clothing and cap safely supporting single/array materials
                    if (
                      nameLower.includes("shirt") || 
                      child.name === "Cube.002" || 
                      child.name === "Cube_002" || 
                      nameLower.includes("pant") || 
                      nameLower.includes("shoe")
                    ) {
                      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                      materials.forEach((mat: any, idx) => {
                        if (mat) {
                          const clonedMat = mat.clone();
                          clonedMat.vertexColors = false;

                          if (nameLower.includes("shirt")) {
                            clonedMat.color.set("#050505");
                            clonedMat.roughness = 0.85;
                          } else if (child.name === "Cube.002" || child.name === "Cube_002") {
                            clonedMat.color.set("#6C63FF");
                            clonedMat.roughness = 0.5;
                          } else if (nameLower.includes("pant")) {
                            clonedMat.color.set("#161622");
                            clonedMat.roughness = 0.9;
                          } else if (nameLower.includes("shoe")) {
                            clonedMat.color.set("#00D4FF");
                            clonedMat.roughness = 0.4;
                          }

                          if (Array.isArray(mesh.material)) {
                            mesh.material[idx] = clonedMat;
                          } else {
                            mesh.material = clonedMat;
                          }
                        }
                      });
                    }
                  }
                } catch (innerErr) {
                  console.warn("Error processing child node styling:", innerErr);
                }
              });

              resolve(gltf);

              // Safe timeline animation mapping
              try {
                setCharTimeline(character, camera);
                setAllTimeline();
              } catch (timelineErr) {
                console.warn("GsapScroll timeline mapping failed:", timelineErr);
              }

              const footR = character.getObjectByName("footR");
              const footL = character.getObjectByName("footL");
              if (footR) footR.position.y = 3.36;
              if (footL) footL.position.y = 3.36;
              
              dracoLoader.dispose();
            } catch (loadProcessingError) {
              console.error("Failed processing loaded GLTF character scene:", loadProcessingError);
              reject(loadProcessingError);
            }
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
