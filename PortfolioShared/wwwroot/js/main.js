import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import * as THREE from './three.module.js';


var scene, camera, renderer,oldModel



window.setupViewer = function () {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        10 / 10,
        1,
        70
    );
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);
    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = -19;
    camera.position.x = 22;
    camera.position.y = 7;
    camera.rotation.y = 100;
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
}

window.loadModel = function (url) {
    const loader = new GLTFLoader();
    loader.load(url, function (gltf) {
        if (oldModel) {
            scene.remove(oldModel)
            clearScene()
        }
        var model = gltf.scene;

        const modelContainer = new THREE.Object3D();
        const desiredSize = 15;
        const boundingBox = new THREE.Box3().setFromObject(model);
        const currentSize = boundingBox.getSize(new THREE.Vector3());
        const scaleFactor = desiredSize / currentSize.length();
        modelContainer.scale.set(scaleFactor, scaleFactor, scaleFactor);
        modelContainer.add(gltf.scene);

        modelContainer.position.set(0, -0, 0);
        modelContainer.rotation.set(0, -Math.PI / 2, 0);

        const mixer = new THREE.AnimationMixer(model);

        const animations = gltf.animations;

        animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
        });
        scene.add(modelContainer);
        oldModel = modelContainer
        function animate() {
            requestAnimationFrame(animate);

            mixer.update(0.005);
        }
        animate();
    });
}
function clearScene() {
    function disposeMaterial(material) {
        if (material.map) material.map.dispose()
        if (material.lightMap) material.lightMap.dispose()
        if (material.bumpMap) material.bumpMap.dispose()
        if (material.normalMap) material.normalMap.dispose()
        if (material.specularMap) material.specularMap.dispose()
        if (material.envMap) material.envMap.dispose()
        material.dispose();
    }
    for (let i = 0; i < oldModel.children.length; i++) {
        let object = oldModel.children[i];
        if (object.geometry) object.geometry.dispose();
        if (object.meterial) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => disposeMaterial(material))
        } else {
            disposeMaterial(object.material);
        }
        }
    }

}

window.onSceneParentChangeColor = function (color) {
    scene.background = new THREE.Color(color);
}

window.onSceneParentChangeSize = function () {
    const card = document.getElementById("card");
    var parentWidth = card.clientWidth - 5;
    renderer.setSize(parentWidth, parentWidth);
}

//document.addEventListener("DOMContentLoaded", function () {
//window.setupViewer();
//});
