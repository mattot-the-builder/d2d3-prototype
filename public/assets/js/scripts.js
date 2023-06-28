/*
    Canvas section start
*/

const canvas = new fabric.Canvas("c", {
    backgroundColor: 0x34ebd,
    fireRightClick: true, // <-- enable firing of right click events
    fireMiddleClick: true, // <-- enable firing of middle click events
    stopContextMenu: true, // <--  prevent context menu from showing
    selection: true,
});

canvas.on("mouse:down", (event) => {
    if (event.button === 1) {
        console.log("left click");
    }
    if (event.button === 2) {
        console.log("middle click");
    }
    if (event.button === 3) {
        console.log("right click");
    }
});

// Layer Arrangement Section

document.getElementById("bring-forward").addEventListener("click", function () {
    canvas.getActiveObject().bringForward();
});

document
    .getElementById("bring-to-front")
    .addEventListener("click", function () {
        canvas.getActiveObject().bringToFront();
    });

document.getElementById("send-backward").addEventListener("click", function () {
    canvas.getActiveObject().sendBackwards();
});

document.getElementById("send-to-back").addEventListener("click", function () {
    canvas.getActiveObject().sendToBack();
});

// Add Shapes Section

document.getElementById("add-square").addEventListener("click", function () {
    var rect = new fabric.Rect({
        width: 100,
        height: 100,
        left: 200,
        top: 200,
        stroke: "#aaf",
        strokeWidth: 5,
        fill: "#faa",
        originX: "center",
        originY: "center",
        name: "rectangle",
    });

    canvas.add(rect);

    const objectName = canvas.getObjects()[0].name;

    const htmlStr =
        "<li class='flex align-middle px-5 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold mb-2'><svg class='w-4 me-5 fill-gray-400 hover:fill-white' viewBox='0 0 50 60' xmlns='http://www.w3.org/2000/svg'> <path d='M1.00452 7.40631C0.982545 3.61703 3.93986 0.974052 7.51676 1.00001C11.2299 1.03029 13.9543 3.60405 14.0334 7.30682C14.1081 10.8279 11.1684 13.8429 7.5607 13.791C3.97062 13.7434 1.0177 11.2042 1.00452 7.40631Z'/> <path d='M22.9887 7.14243C23.103 3.40506 26.1394 0.935112 29.5405 0.999997C33.4074 1.07786 36.1055 3.88089 35.9912 7.56635C35.8814 11.1004 32.867 13.9251 29.3823 13.8083C25.678 13.6872 22.8262 10.7154 22.9887 7.14243Z'/> <path d='M14.0245 29.0692C13.9367 32.6422 10.9002 35.5361 7.38486 35.3977C3.7069 35.2549 0.916565 32.3654 1.00006 28.8227C1.09233 25.0247 4.15071 22.5158 7.57821 22.5937C11.4232 22.6802 14.0509 25.4443 14.0201 29.0692H14.0245Z'/> <path d='M22.9844 50.4683C23.0283 46.7049 26.0032 44.1442 29.5054 44.1831C33.2844 44.2263 36.0176 46.9083 36.0001 50.6067C35.9825 54.171 32.9636 57.0736 29.4175 56.9957C25.7791 56.9178 22.9141 54.011 22.9844 50.4683Z'/> <path d='M22.9975 28.8572C23.1557 25.2064 26.0999 22.4077 29.646 22.5591C33.6755 22.7321 36.0484 25.8336 35.9781 29.1557C35.9078 32.6855 32.8758 35.5231 29.4043 35.4063C25.7395 35.2852 22.8437 32.3264 22.9931 28.8572H22.9975Z'/> <path d='M1.02641 50.3947C1.21536 46.7352 4.19464 43.9755 7.72321 44.1528C11.7791 44.3604 14.1036 47.5441 14.0026 50.8013C13.8927 54.3441 10.8343 57.1557 7.37606 56.9914C3.67173 56.8097 0.846244 53.8769 1.02641 50.3947Z'/></svg>" +
        objectName +
        "</li>";

    document
        .getElementById("layers-list")
        .insertAdjacentHTML("beforeend", htmlStr);

    document.getElementById("layers-list").appendChild();
});

// Text Section

document.getElementById("add-text").addEventListener("click", function () {
    const userText = document.getElementById("user-text").value;

    var text = new fabric.Text(userText, {
        fill: "white",
    });

    canvas.add(text);
    canvas.renderAll();
});

/*
    Canvas section end
*/

/*
    3d Model section start
*/

const mockupURL = new URL("../tshirtmockup.glb", import.meta.url);

const sizes = {
    width: window.innerWidth / 3,
    height: window.innerHeight / 1.11,
};

function getScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd4d6d6);

    return scene;
}

function getCamera() {
    const camera = new THREE.PerspectiveCamera(
        45,
        sizes.width / sizes.height,
        1,
        100
    );

    camera.position.set(0, 2, 10);

    return camera;
}

function getLight(scene) {
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(directionalLight);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.bottom = -12;
    directionalLight.intensity = 0.9;

    const backDirectionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(backDirectionalLight);
    backDirectionalLight.position.set(0, 10, -10);
    backDirectionalLight.castShadow = true;
    backDirectionalLight.shadow.camera.bottom = -12;
    backDirectionalLight.intensity = 0.9;

    const leftDirectionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(leftDirectionalLight);
    leftDirectionalLight.position.set(10, -10, 0);
    leftDirectionalLight.castShadow = true;
    leftDirectionalLight.shadow.camera.bottom = -12;
    leftDirectionalLight.intensity = 0.5;

    const rightDirectionalLight = new THREE.DirectionalLight(0xffffff);
    scene.add(rightDirectionalLight);
    rightDirectionalLight.position.set(-10, -10, 0);
    rightDirectionalLight.castShadow = true;
    rightDirectionalLight.shadow.camera.bottom = -12;
    rightDirectionalLight.intensity = 0.5;
}

function getRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(sizes.width, sizes.height);

    renderer.render(scene, camera);

    document.getElementById("3d").appendChild(renderer.domElement);

    return renderer;
}

function getControls(camera, renderer) {
    const orbit = new OrbitControls(camera, renderer.domElement);

    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    orbit.update();

    return orbit;
}

function loadMockup() {
    var assetLoader = new GLTFLoader();

    assetLoader.load(mockupURL.href, function (gltf) {
        var model = gltf.scene;

        const front = model.children[2].children[4];
        const back = model.children[2].children[3];
        const right = model.children[2].children[2];
        const left = model.children[2].children[1];

        const positionShift = new THREE.Vector3(0, 1.2, 0);
        front.position.add(positionShift);
        back.position.add(positionShift);
        left.position.add(positionShift);
        right.position.add(positionShift);

        const newMaterial = front.material.clone();
        newMaterial.color.set(0x486285);

        var newTexture = new THREE.CanvasTexture(document.getElementById("c"));

        newTexture.wrapS = THREE.RepeatWrapping;
        newTexture.repeat.x = -1;
        newTexture.offset.x = 0.15; // 0.0 - 1.0
        newTexture.offset.y = -0.22;

        var secondMaterial = new THREE.MeshLambertMaterial({ map: newTexture });

        front.material = secondMaterial;

        console.log(model.children[2].position.y);
        scene.add(model.children[2]);

        canvas.on("after:render", function () {
            front.material.map.needsUpdate = true;
        });
    });
}

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);
var mockup = loadMockup();

function animate(time) {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

/*
    3d model end
*/
