import "./bootstrap";
import "flowbite";
import * as THREE from "three";
import "fabric";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as dat from "dat.gui";
import * as FontFaceObserver from "fontfaceobserver";

import Alpine from "alpinejs";

window.Alpine = Alpine;

window.THREE = THREE;
window.OrbitControls = OrbitControls;
window.GLTFLoader = GLTFLoader;
window.dat = dat;
window.FontFaceObserver = FontFaceObserver;

Alpine.start();
