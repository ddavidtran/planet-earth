import SceneManager from 'SRC/js/SceneManager.js';
import 'SCSS/main.scss';

global.THREE = require('three');

const canvas = document.getElementById('canvas');
var sm = new SceneManager(canvas);

bindEventListeners();
render();

function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width = '100vw';
	canvas.style.height= '100vh';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sm.onWindowResize();
}

function render() {
    requestAnimationFrame(render);
    sm.update();
}