import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.querySelector('.childone').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();


//_________________________________________________________-Boids-__________________________________________________________________

const boidCount = 150;
const boidSize = 0.1;
const boidGeometry = new THREE.TetrahedronGeometry(boidSize, 0);
const boidMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xffffff,
});
const boidMeshes = [];
let boidsActive = false;

const separationFactor = 5.2; // Facteur de séparation
const alignmentFactor = 3.5; // Facteur d'alignement
const cohesionFactor = 0.1; // Facteur de cohésion
const maxSpeed = 0.05; // Vitesse maximale

const xMin = -4;
const xMax = 4;
const yMin = -4;
const yMax = 4;
const zMin = -4;
const zMax = 4;

boidMeshes.forEach((boid) => {
    boid.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * maxSpeed,
        (Math.random() - 0.5) * maxSpeed,
        (Math.random() - 0.5) * maxSpeed
        );
    });
    
    function animateBoids() {
    boidMeshes.forEach((boid) => {
        const separation = new THREE.Vector3();
        const alignment = new THREE.Vector3();
        const cohesion = new THREE.Vector3();
        
        const boidPosition = boid.position.clone();
        
        boidMeshes.forEach((otherBoid) => {
            if (boid !== otherBoid) {
                const direction = new THREE.Vector3();
                direction.subVectors(boidPosition, otherBoid.position);
                const distance = direction.length();
                
                if (distance < 0.3) {
                    separation.add(direction.clone().normalize().divideScalar(distance));
                }
                
                if (distance < 0.4) {
                    alignment.add(otherBoid.velocity);
                    cohesion.add(otherBoid.position);
                }
            }
            boid.position.x = Math.min(xMax, Math.max(xMin, boid.position.x));
            boid.position.y = Math.min(yMax, Math.max(yMin, boid.position.y));
            boid.position.z = Math.min(zMax, Math.max(zMin, boid.position.z));
        });

        if (separation.length() > 0) {
            separation.normalize();
            separation.multiplyScalar(separationFactor);
            separation.sub(boid.velocity);
        }
        
        if (alignment.length() > 0) {
            alignment.normalize();
            alignment.multiplyScalar(alignmentFactor);
            alignment.sub(boid.velocity);
        }

        if (cohesion.length() > 0) {
            cohesion.normalize();
            cohesion.sub(boid.position);
            cohesion.multiplyScalar(cohesionFactor);
            cohesion.sub(boid.velocity);
        }
        
        // À l'intérieur de la boucle d'animation
        boid.velocity.add(separation);
        boid.velocity.add(alignment);
        boid.velocity.add(cohesion);
        
        // Définir la vitesse maximale
        const maxVelocity = maxSpeed;
        
        // Vérifier si la vélocité dépasse la vitesse maximale
        if (boid.velocity.length() > maxVelocity) {
            boid.velocity.setLength(maxVelocity);
        }

        // Ajuster la position pour rester dans la boîte
        boid.position.add(boid.velocity);
    });
    
    requestAnimationFrame(animateBoids);
}

document.getElementById('Organism').addEventListener('mouseover', () => {
    if (!boidsActive) {
        for (let i = 0; i < boidCount; i++) {
            const boidMesh = new THREE.Mesh(boidGeometry, boidMaterial);
            boidMesh.position.set(
                Math.random() * 4 - 2,
                Math.random() * 4 - 2,
                Math.random() * 4 - 2
                );
                
                // Initialisez la vélocité ici
                const maxVelocity = maxSpeed;
                const boidVelocity = new THREE.Vector3(
                    (Math.random() - 0.5) * maxSpeed * maxVelocity,
                    (Math.random() - 0.5) * maxSpeed * maxVelocity,
                    (Math.random() - 0.5) * maxSpeed * maxVelocity
                );
                    
                boidMesh.velocity = boidVelocity;
                    
                scene.add(boidMesh);
                boidMeshes.push(boidMesh);
                    
                // Supprimez les modèles actuels de la scène
                models.forEach((modelInfo) => {
                    const { id } = modelInfo;
                    const modelToRemove = scene.getObjectByName('currentModel');
                    if (modelToRemove) {
                        scene.remove(modelToRemove);
                    }
                });
        }
        animateBoids();
        boidsActive = true;
    }
});


        
//_________________________________________________________-Boids-__________________________________________________________________
        
        
document.getElementById('glass', 'mold', 'Exp', 'Ant').addEventListener('mouseover', () => {
    if (boidsActive) {
        boidMeshes.forEach((boid) => {
            scene.remove(boid);
        });
        boidMeshes.length = 0;
        boidsActive = false;
    }
});

const models = [
    {   
        id: 'Particles', 
        path: './data/object.glb',
        scale : new THREE.Vector3(0.02, 0.02, 0.02),
        position : new THREE.Vector3(0, 0, 0),
        rotation : new THREE.Euler(0, 90, Math.PI / 2),
    },
    { 
        id: 'glass', 
        path: './data/diff.glb' ,
        scale : new THREE.Vector3(1, 1, 1),
        position : new THREE.Vector3(0, 0, 0),
        rotation : new THREE.Euler(0, 90, Math.PI / 2),
    },
    {
        id: 'mold', 
        path: './data/tree.glb',
        scale : new THREE.Vector3(0.05, 0.05, 0.05),
        position : new THREE.Vector3(0, -1.2, 0),
        rotation : new THREE.Euler(0, 90, 0),
    },
    {
        id: 'Exp', 
        path: './data/Ambient.glb',
        scale : new THREE.Vector3(0.6, 0.6, 0.6),
        position : new THREE.Vector3(0.2, -1, 0),
        rotation : new THREE.Euler(0, 0, 0),
    },
    {
        id: 'Ant', 
        path: './data/ant.glb',
        scale : new THREE.Vector3(1.7, 1.7, 1.7),
        position : new THREE.Vector3(0, 0, 0),
        rotation : new THREE.Euler(80, -45, 0),
    },
    {
        id: 'room', 
        path: './data/room.glb',
        scale : new THREE.Vector3(0.1, 0.1, 0.1),
        position : new THREE.Vector3(0, -1, 0),
        rotation : new THREE.Euler(0, 0, 0),
    },
];


const loadedModels = {};

function loadModel(modelInfo) {
    return new Promise((resolve) => {
        const { id, path, position, scale, rotation } = modelInfo;
        
        loader.load(path, (gltf) => {
            const newModel = gltf.scene;
            
            if (position) {
                newModel.position.copy(position);
            }
            
            if (scale) {
                newModel.scale.copy(scale);
            }
            
            if (rotation) {
                newModel.rotation.copy(rotation);
            }
            
            const whiteMaterial = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
            });
            
            newModel.traverse((child) => {
                if (child.isMesh) {
                    child.material = whiteMaterial;
                }
            });
            
            newModel.name = 'currentModel';
            loadedModels[id] = { model: newModel };
            
            const clips = gltf.animations;
            
            if (clips && clips.length > 0) {
                const mixer = new THREE.AnimationMixer(newModel);
                const action = mixer.clipAction(clips[0]);
                action.loop = THREE.LoopRepeat;
                action.play();
            }
            
            resolve();
        });
    });
}



Promise.all(models.map(loadModel)).then(() => {
    models.forEach((modelInfo) => {
        const { id } = modelInfo;
        const element = document.getElementById(id);
        
        if (element) {
            element.addEventListener('mouseover', () => {
                if (boidsActive) {
                    boidMeshes.forEach((boid) => {
                        scene.remove(boid);
                    });
                    boidMeshes.length = 0;
                    boidsActive = false;
                }

                const oldModel = scene.getObjectByName('currentModel');
                if (oldModel) {
                    scene.remove(oldModel);
                }
                
                const newModel = loadedModels[id].model;
                scene.add(newModel);
            });
        }
    });
});





function rotateModels() {
    models.forEach((modelInfo) => {
        const { id } = modelInfo;
        const loadedModel = loadedModels[id];

        if (loadedModel) {
            const model = loadedModel.model;
            model.rotation.y += 0.01;  
        }
    });
}







const image = document.getElementById('image');
const imageContainer = document.getElementById('imageContainer');

const imagePaths = {
    'Particles': './data/0224.jpeg',
    'glass': './data/untitled.jpg',
    'mold': './data/pres.jpeg',
    'Exp': './data/pres1.jpeg',
    'Ant': './data/disp.png',
    'Organism': './data/boid.png',
    'room': './data/VetF.png'
};

function showImage(elementId) {
    const imagePath = imagePaths[elementId];
    if (imagePath && image) {
        image.src = imagePath;
        if (imageContainer) {
            imageContainer.style.display = 'block';
        }
    }
}

function hideImage() {
    if (imageContainer) {
        imageContainer.style.display = 'none';
    }
}

Object.keys(imagePaths).forEach((elementId) => {
    document.getElementById(elementId).addEventListener('mouseover', () => showImage(elementId));
});

document.querySelectorAll('h3').forEach((element) => {
    window.addEventListener('mouseout', hideImage);
});

const handleResize = () => {
    const newWidth = window.innerWidth / 2;
    const newHeight = window.innerHeight / 2;

    renderer.setSize(newWidth, newHeight);

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
};

window.addEventListener('resize', handleResize);

handleResize();

function animate() {
    requestAnimationFrame(animate);

    //event();
    controls.update();
    rotateModels(); // Appel de la fonction de rotation
    renderer.render(scene, camera);
}

animate();



