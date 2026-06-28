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
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
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

                // Stylize character clothing and cap for a stylish coder aesthetic
                if (
                  nameLower.includes("shirt") || 
                  child.name === "Cube.002" || 
                  child.name === "Cube_002" || 
                  nameLower.includes("pant") || 
                  nameLower.includes("shoe")
                ) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  mat.vertexColors = false;

                  if (nameLower.includes("shirt")) {
                    // Sleek matte black hoodie
                    mat.color.set("#050505");
                    mat.roughness = 0.85;
                  } else if (child.name === "Cube.002" || child.name === "Cube_002") {
                    // Vibrant neon violet cap (brand accent)
                    mat.color.set("#6C63FF");
                    mat.roughness = 0.5;
                  } else if (nameLower.includes("pant")) {
                    // Dark charcoal techwear pants
                    mat.color.set("#161622");
                    mat.roughness = 0.9;
                  } else if (nameLower.includes("shoe")) {
                    // Sleek neon cyan sneakers (brand accent 2)
                    mat.color.set("#00D4FF");
                    mat.roughness = 0.4;
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
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
