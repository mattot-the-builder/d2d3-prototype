const canvas = new fabric.Canvas("c", {
    backgroundColor: 0x34ebd,
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
    fill: "#faa",
});

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

canvas.add(boundingBox);
canvas.add(movingBox);
canvas.add(rect);
