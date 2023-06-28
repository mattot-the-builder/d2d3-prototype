console.log("Hi im from script.js");

var canvas = new fabric.Canvas("c", {
    backgroundColor: 0x34ebd,
});

var newColor = "blue";

const mockupURL = new URL("../tshirtmockup.glb", import.meta.url);

const sizes = {
    width: window.innerWidth / 3,
    height: window.innerHeight / 1.11,
};

/**
 * Generate  scene object with a background color
 **/

function getScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd4d6d6);

    return scene;
}

/**
 * Generate the camera to be used in the scene. Camera args:
 *   [0] field of view: identifies the portion of the scene
 *     visible at any time (in degrees)
 *   [1] aspect ratio: identifies the aspect ratio of the
 *     scene in width/height
 *   [2] near clipping plane: objects closer than the near
 *     clipping plane are culled from the scene
 *   [3] far clipping plane: objects farther than the far
 *     clipping plane are culled from the scene
 **/

function getCamera() {
    var aspect = sizes.width / sizes.height;
    var camera = new THREE.PerspectiveCamera(75, aspect, 1, 100);

    camera.position.z = 10;

    return camera;
}

/**
 * Generate the light to be used in the scene. Light args:
 *   [0]: Hexadecimal color of the light
 *   [1]: Numeric value of the light's strength/intensity
 *   [2]: The distance from the light where the intensity is 0
 * @param {obj} scene: the current scene object
 **/

function getLight(scene) {
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 10, 10);
    light.castShadow = true; // default false
    scene.add(light);

    return light;
}

/**
 * Generate the renderer to be used in the scene
 **/

function getRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(2);
    renderer.shadowMap.enabled = true;

    renderer.render(scene, camera);

    // Add it to HTML with id = '3d'
    document.getElementById("3d").appendChild(renderer.domElement);

    return renderer;
}

/**
 * Generate the controls to be used in the scene
 * @param {obj} camera: the three.js camera for the scene
 * @param {obj} renderer: the three.js renderer for the scene
 **/

function getControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    return controls;
}

/**
 *
 * Function to get the shirt model
 *
 */

function loadMockup() {
    var assetLoader = new GLTFLoader();

    assetLoader.load(mockupURL.href, function (gltf) {
        var model = gltf.scene;

        const front = model.children[1].children[4];
        const back = model.children[1].children[3];
        const right = model.children[1].children[2];
        const left = model.children[1].children[1];

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

        var secondMaterial = new THREE.MeshBasicMaterial({ map: newTexture });

        front.material = secondMaterial;

        scene.add(model.children[1]);
        scene.add(model.children[0]);

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
// var mockup = loadMockup();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 5;
cube.position.y = 1;
scene.add(cube);
renderer.render(scene, camera);

// Old code

// Canvas box
var rect = new fabric.Rect({
    width: 50,
    height: 50,
    left: 50,
    top: 128,
    stroke: "#aaf",
    strokeWidth: 5,
    fill: "#faa",
    originX: "center",
    originY: "center",
});

var boundingBox = new fabric.Rect({
    fill: "none",
    width: 320,
    height: 400,
    hasBorders: false,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    evented: false,
});

var movingBox = new fabric.Rect({
    width: 50,
    height: 150,
    left: 135,
    top: 125,
    fill: newColor,
});

canvas.on("object:moving", function () {
    var top = movingBox.top;
    var bottom = top + movingBox.height;
    var left = movingBox.left;
    var right = left + movingBox.width;

    var topBound = boundingBox.top;
    var bottomBound = topBound + boundingBox.height;
    var leftBound = boundingBox.left;
    var rightBound = leftBound + boundingBox.width;

    movingBox.set(
        "left",
        Math.min(Math.max(left, leftBound), rightBound - movingBox.width)
    );
    movingBox.set(
        "top",
        Math.min(Math.max(top, topBound), bottomBound - movingBox.height)
    );
});

canvas.add(boundingBox);
canvas.add(movingBox);

// Resize
window.addEventListener("resize", () => {
    // update size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
});

// Image Preview start

// imageInput.onchange = evt => {
//     const [file] = imageInput.files;
//     if (file) {
//         // blah.src = URL.createObjectURL(file);

//     };
// };

document.getElementById("imageInput").onchange = function (e) {
    const [file] = imageInput.files;
    if (file) {
        blah.src = URL.createObjectURL(file);
        // imageToUpload.src = URL.createObjectURL(file);
    }

    var reader = new FileReader();

    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        console.log(image.src);
        image.onload = function () {
            var img = new fabric.Image(image);
            img.set({
                left: 100,
                top: 100,
            });
            img.scaleToWidth(200);
            canvas.add(img).setActiveObject(img);
        };
    };
    reader.readAsDataURL(e.target.files[0]);
};

// Image Preview end

// Add Image Start

// fabric.Image.fromURL('/emoji.png', (img) => {
//     canvas.add(img);
// })
// console.log('add image');

// Add Image End

// Set new Color

window.addEventListener("addText", (text) => {
    var text = new fabric.Text(text.detail, {
        fill: "white",
    });
    canvas.add(text);
    canvas.renderAll();
});

window.addEventListener("deleteLastItem", () => {
    // Setting custom font
    // canvas.getActiveObject().set("fontFamily", 'Helvetica' );
    console.log("event delete last item");
    canvas.remove(canvas.getActiveObject());
});

window.addEventListener("saveCanvas", () => {
    console.log(JSON.stringify(canvas));
    // const userCanvas = JSON.stringify(canvas);

    // To download image

    console.log(
        document.querySelectorAll("#c")[0].toBlob(function (blob) {
            saveAs(blob, "my design.jpeg");
        })
    );

    // To convert to data url to be uploaded

    var userDesign = canvas.toDataURL({ format: "jpeg" });

    Livewire.emit("getCanvasImage", userDesign);

    // console.log(JSON.stringify(document.querySelectorAll('#c')));
    // console.log(document.querySelectorAll('#c')[0]);
});

window.addEventListener("loadCanvas", (templateDesign) => {
    canvas.loadFromJSON(templateDesign.detail.templateDesign);
    console.log("change the id variable in loadDesign function");
});

$("#newColor").change(function () {
    console.log(JSON.stringify(document.querySelectorAll("#c")[0]));
    var color = $("#newColor").val();

    canvas.getActiveObject().set("fill", color);
    canvas.renderAll();
});

const loop = () => {
    controls.autoRotate = true;
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();

function onMouseMove(event) {
    var mousePosition = new THREE.Vector3(0, 0, 0.5);
    mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
    mousePosition.y = 1 - 2 * (event.clientY / window.innerHeight);
    mousePosition.unproject(camera);
    var raycaster = new THREE.Raycaster(
        camera.position,
        mousePosition.sub(camera.position).normalize()
    );
    var intersects = raycaster.intersectObjects(scene.children);
    controls.enabled = intersects.length > 0;
}
