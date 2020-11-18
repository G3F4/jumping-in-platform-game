/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/entities/Ground.ts":
/*!********************************!*\
  !*** ./src/entities/Ground.ts ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export drawGround [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getGround [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.drawGround = exports.getGround = void 0;
function getGround(size) {
    const x = 0;
    const y = size.height / 3;
    const height = 16;
    const width = size.width;
    return { x, y, width, height };
}
exports.getGround = getGround;
function drawGround(context, ground) {
    context.fillStyle = '#202020';
    context.lineWidth = 4;
    context.strokeRect(ground.x, ground.y, ground.width, ground.height);
}
exports.drawGround = drawGround;


/***/ }),

/***/ "./src/entities/SimpleJumper.ts":
/*!**************************************!*\
  !*** ./src/entities/SimpleJumper.ts ***!
  \**************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const appEvents_1 = __webpack_require__(/*! ../utils/appEvents */ "./src/utils/appEvents.ts");
const color_1 = __webpack_require__(/*! ../utils/color */ "./src/utils/color.ts");
class SimpleJumper {
    constructor(x = 0, y = 0, jumping = true, xVelocity = 0, yVelocity = 0, color = color_1.randomRgba()) {
        this.x = x;
        this.y = y;
        this.jumping = jumping;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.color = color;
        this.controller = {
            left: false,
            right: false,
            up: false,
            keyListener: (event) => {
                const keyState = event.type === 'keydown';
                switch (event.key) {
                    case 'ArrowUp':
                        this.controller.up = keyState;
                        break;
                    case 'ArrowLeft':
                        this.controller.left = keyState;
                        break;
                    case 'ArrowRight':
                        this.controller.right = keyState;
                        break;
                }
            },
        };
        appEvents_1.registerKeyDownHandler(this.controller.keyListener);
        appEvents_1.registerKeyUpHandler(this.controller.keyListener);
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.x, this.y, SimpleJumper.Size, SimpleJumper.Size);
        ctx.fill();
    }
    update(ground) {
        if (this.controller.up && !this.jumping) {
            this.yVelocity -= SimpleJumper.JumpPower;
            this.jumping = true;
        }
        if (this.controller.left) {
            this.xVelocity -= SimpleJumper.MovingSpeed;
        }
        if (this.controller.right) {
            this.xVelocity += SimpleJumper.MovingSpeed;
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.yVelocity += SimpleJumper.Gravity;
        this.xVelocity *= SimpleJumper.Friction;
        this.yVelocity *= SimpleJumper.Friction;
        if (this.y > ground.y - SimpleJumper.Size) {
            this.jumping = false;
            this.y = ground.y - SimpleJumper.Size;
            this.yVelocity = 0;
        }
        if (this.x < -SimpleJumper.Size) {
            this.x = ground.width;
        }
        else if (this.x > ground.width) {
            this.x = -SimpleJumper.Size;
        }
    }
}
exports.default = SimpleJumper;
SimpleJumper.Size = 32;
SimpleJumper.Gravity = 1.5;
SimpleJumper.Friction = 0.9;
SimpleJumper.JumpPower = 20;
SimpleJumper.MovingSpeed = 1;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const appLoop_1 = __importDefault(__webpack_require__(/*! ./utils/appLoop */ "./src/utils/appLoop.ts"));
const appWindow_1 = __webpack_require__(/*! ./utils/appWindow */ "./src/utils/appWindow.ts");
const SimpleJumper_1 = __importDefault(__webpack_require__(/*! ./entities/SimpleJumper */ "./src/entities/SimpleJumper.ts"));
const Ground_1 = __webpack_require__(/*! ./entities/Ground */ "./src/entities/Ground.ts");
const fps = 24;
appLoop_1.default({ fps, onFrame: loop });
const context = appWindow_1.getDrawingContext();
const jumper = new SimpleJumper_1.default();
function loop() {
    const windowSize = appWindow_1.getWindowSize();
    const ground = Ground_1.getGround(windowSize);
    jumper.update(ground);
    appWindow_1.clearDrawingArea();
    Ground_1.drawGround(context, ground);
    jumper.draw(context);
}


/***/ }),

/***/ "./src/utils/appEvents.ts":
/*!********************************!*\
  !*** ./src/utils/appEvents.ts ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMousePosition [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerClickHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerKeyDownHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerKeyUpHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerResizeHandler [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerKeyUpHandler = exports.registerKeyDownHandler = exports.registerClickHandler = exports.getMousePosition = exports.registerResizeHandler = void 0;
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
function registerResizeHandler(handler) {
    addEventListener('resize', () => {
        setTimeout(handler, 100);
    });
}
exports.registerResizeHandler = registerResizeHandler;
function getMousePosition() {
    return mouse;
}
exports.getMousePosition = getMousePosition;
function registerClickHandler(handler) {
    addEventListener('click', handler);
}
exports.registerClickHandler = registerClickHandler;
function registerKeyDownHandler(handler) {
    window.addEventListener('keydown', handler);
}
exports.registerKeyDownHandler = registerKeyDownHandler;
function registerKeyUpHandler(handler) {
    window.addEventListener('keyup', handler);
}
exports.registerKeyUpHandler = registerKeyUpHandler;


/***/ }),

/***/ "./src/utils/appLoop.ts":
/*!******************************!*\
  !*** ./src/utils/appLoop.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed, loop;
function appLoop({ fps, onFrame, }) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    loop = createLoop(onFrame);
    loop(startTime);
}
exports.default = appLoop;
function createLoop(logic) {
    return (loopTime) => {
        requestAnimationFrame(loop);
        now = loopTime;
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            const sinceStart = now - startTime;
            const currentFps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100;
            logic({ currentFps });
        }
    };
}


/***/ }),

/***/ "./src/utils/appWindow.ts":
/*!********************************!*\
  !*** ./src/utils/appWindow.ts ***!
  \********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export clearDrawingArea [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getDrawingContext [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getWindowSize [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getWindowSize = exports.getDrawingContext = exports.clearDrawingArea = void 0;
const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});
function clearDrawingArea() {
    const c = getDrawingContext();
    c.clearRect(0, 0, canvas.width, canvas.height);
}
exports.clearDrawingArea = clearDrawingArea;
function getDrawingContext() {
    const context = canvas.getContext('2d');
    if (context) {
        return context;
    }
    throw new Error('Unable to get canvas drawing 2d context');
}
exports.getDrawingContext = getDrawingContext;
function getWindowSize() {
    return {
        width: innerWidth,
        height: innerHeight,
    };
}
exports.getWindowSize = getWindowSize;


/***/ }),

/***/ "./src/utils/color.ts":
/*!****************************!*\
  !*** ./src/utils/color.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export randomRgba [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomRgba = void 0;
function zeroTo256() {
    return Math.round(Math.random() * 255);
}
function zeroTo1() {
    return Math.random().toFixed(1);
}
function randomRgba() {
    return `rgba(${zeroTo256()},${zeroTo256()},${zeroTo256()},${zeroTo1()})`;
}
exports.randomRgba = randomRgba;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL0dyb3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL1NpbXBsZUp1bXBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwRXZlbnRzLnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwTG9vcC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2NvbG9yLnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FudmFzLWFwcC10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkw7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsb0RBQW9CO0FBQ2hELGdCQUFnQixtQkFBTyxDQUFDLDRDQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMxRWE7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQ0FBa0MsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDM0Qsb0JBQW9CLG1CQUFPLENBQUMsbURBQW1CO0FBQy9DLHVDQUF1QyxtQkFBTyxDQUFDLCtEQUF5QjtBQUN4RSxpQkFBaUIsbUJBQU8sQ0FBQyxtREFBbUI7QUFDNUM7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw0QkFBNEIsR0FBRyw4QkFBOEIsR0FBRyw0QkFBNEIsR0FBRyx3QkFBd0IsR0FBRyw2QkFBNkI7QUFDdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDZjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcseUJBQXlCLEdBQUcsd0JBQXdCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QlI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVksR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLFVBQVU7QUFDMUU7QUFDQSxrQkFBa0I7Ozs7Ozs7VUNabEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRyYXdHcm91bmQgPSBleHBvcnRzLmdldEdyb3VuZCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEdyb3VuZChzaXplKSB7XG4gICAgY29uc3QgeCA9IDA7XG4gICAgY29uc3QgeSA9IHNpemUuaGVpZ2h0IC8gMztcbiAgICBjb25zdCBoZWlnaHQgPSAxNjtcbiAgICBjb25zdCB3aWR0aCA9IHNpemUud2lkdGg7XG4gICAgcmV0dXJuIHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9O1xufVxuZXhwb3J0cy5nZXRHcm91bmQgPSBnZXRHcm91bmQ7XG5mdW5jdGlvbiBkcmF3R3JvdW5kKGNvbnRleHQsIGdyb3VuZCkge1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMyMDIwMjAnO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gNDtcbiAgICBjb250ZXh0LnN0cm9rZVJlY3QoZ3JvdW5kLngsIGdyb3VuZC55LCBncm91bmQud2lkdGgsIGdyb3VuZC5oZWlnaHQpO1xufVxuZXhwb3J0cy5kcmF3R3JvdW5kID0gZHJhd0dyb3VuZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBwRXZlbnRzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXBwRXZlbnRzXCIpO1xuY29uc3QgY29sb3JfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9jb2xvclwiKTtcbmNsYXNzIFNpbXBsZUp1bXBlciB7XG4gICAgY29uc3RydWN0b3IoeCA9IDAsIHkgPSAwLCBqdW1waW5nID0gdHJ1ZSwgeFZlbG9jaXR5ID0gMCwgeVZlbG9jaXR5ID0gMCwgY29sb3IgPSBjb2xvcl8xLnJhbmRvbVJnYmEoKSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLmp1bXBpbmcgPSBqdW1waW5nO1xuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IHhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSB5VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0ge1xuICAgICAgICAgICAgbGVmdDogZmFsc2UsXG4gICAgICAgICAgICByaWdodDogZmFsc2UsXG4gICAgICAgICAgICB1cDogZmFsc2UsXG4gICAgICAgICAgICBrZXlMaXN0ZW5lcjogKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5U3RhdGUgPSBldmVudC50eXBlID09PSAna2V5ZG93bic7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIudXAgPSBrZXlTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmxlZnQgPSBrZXlTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5yaWdodCA9IGtleVN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgYXBwRXZlbnRzXzEucmVnaXN0ZXJLZXlEb3duSGFuZGxlcih0aGlzLmNvbnRyb2xsZXIua2V5TGlzdGVuZXIpO1xuICAgICAgICBhcHBFdmVudHNfMS5yZWdpc3RlcktleVVwSGFuZGxlcih0aGlzLmNvbnRyb2xsZXIua2V5TGlzdGVuZXIpO1xuICAgIH1cbiAgICBkcmF3KGN0eCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdCh0aGlzLngsIHRoaXMueSwgU2ltcGxlSnVtcGVyLlNpemUsIFNpbXBsZUp1bXBlci5TaXplKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgdXBkYXRlKGdyb3VuZCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLnVwICYmICF0aGlzLmp1bXBpbmcpIHtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5IC09IFNpbXBsZUp1bXBlci5KdW1wUG93ZXI7XG4gICAgICAgICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIubGVmdCkge1xuICAgICAgICAgICAgdGhpcy54VmVsb2NpdHkgLT0gU2ltcGxlSnVtcGVyLk1vdmluZ1NwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIucmlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5ICs9IFNpbXBsZUp1bXBlci5Nb3ZpbmdTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gU2ltcGxlSnVtcGVyLkdyYXZpdHk7XG4gICAgICAgIHRoaXMueFZlbG9jaXR5ICo9IFNpbXBsZUp1bXBlci5GcmljdGlvbjtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKj0gU2ltcGxlSnVtcGVyLkZyaWN0aW9uO1xuICAgICAgICBpZiAodGhpcy55ID4gZ3JvdW5kLnkgLSBTaW1wbGVKdW1wZXIuU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnkgPSBncm91bmQueSAtIFNpbXBsZUp1bXBlci5TaXplO1xuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnggPCAtU2ltcGxlSnVtcGVyLlNpemUpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGdyb3VuZC53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnggPiBncm91bmQud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IC1TaW1wbGVKdW1wZXIuU2l6ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNpbXBsZUp1bXBlcjtcblNpbXBsZUp1bXBlci5TaXplID0gMzI7XG5TaW1wbGVKdW1wZXIuR3Jhdml0eSA9IDEuNTtcblNpbXBsZUp1bXBlci5GcmljdGlvbiA9IDAuOTtcblNpbXBsZUp1bXBlci5KdW1wUG93ZXIgPSAyMDtcblNpbXBsZUp1bXBlci5Nb3ZpbmdTcGVlZCA9IDE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcExvb3BfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9hcHBMb29wXCIpKTtcbmNvbnN0IGFwcFdpbmRvd18xID0gcmVxdWlyZShcIi4vdXRpbHMvYXBwV2luZG93XCIpO1xuY29uc3QgU2ltcGxlSnVtcGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZW50aXRpZXMvU2ltcGxlSnVtcGVyXCIpKTtcbmNvbnN0IEdyb3VuZF8xID0gcmVxdWlyZShcIi4vZW50aXRpZXMvR3JvdW5kXCIpO1xuY29uc3QgZnBzID0gMjQ7XG5hcHBMb29wXzEuZGVmYXVsdCh7IGZwcywgb25GcmFtZTogbG9vcCB9KTtcbmNvbnN0IGNvbnRleHQgPSBhcHBXaW5kb3dfMS5nZXREcmF3aW5nQ29udGV4dCgpO1xuY29uc3QganVtcGVyID0gbmV3IFNpbXBsZUp1bXBlcl8xLmRlZmF1bHQoKTtcbmZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IGFwcFdpbmRvd18xLmdldFdpbmRvd1NpemUoKTtcbiAgICBjb25zdCBncm91bmQgPSBHcm91bmRfMS5nZXRHcm91bmQod2luZG93U2l6ZSk7XG4gICAganVtcGVyLnVwZGF0ZShncm91bmQpO1xuICAgIGFwcFdpbmRvd18xLmNsZWFyRHJhd2luZ0FyZWEoKTtcbiAgICBHcm91bmRfMS5kcmF3R3JvdW5kKGNvbnRleHQsIGdyb3VuZCk7XG4gICAganVtcGVyLmRyYXcoY29udGV4dCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVnaXN0ZXJLZXlVcEhhbmRsZXIgPSBleHBvcnRzLnJlZ2lzdGVyS2V5RG93bkhhbmRsZXIgPSBleHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gZXhwb3J0cy5nZXRNb3VzZVBvc2l0aW9uID0gZXhwb3J0cy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIgPSB2b2lkIDA7XG5jb25zdCBtb3VzZSA9IHtcbiAgICB4OiBpbm5lcldpZHRoIC8gMixcbiAgICB5OiBpbm5lckhlaWdodCAvIDIsXG59O1xuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgbW91c2UueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgbW91c2UueSA9IGV2ZW50LmNsaWVudFk7XG59KTtcbmZ1bmN0aW9uIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZXIsIDEwMCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlZ2lzdGVyUmVzaXplSGFuZGxlciA9IHJlZ2lzdGVyUmVzaXplSGFuZGxlcjtcbmZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIG1vdXNlO1xufVxuZXhwb3J0cy5nZXRNb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbjtcbmZ1bmN0aW9uIHJlZ2lzdGVyQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZWdpc3RlckNsaWNrSGFuZGxlciA9IHJlZ2lzdGVyQ2xpY2tIYW5kbGVyO1xuZnVuY3Rpb24gcmVnaXN0ZXJLZXlEb3duSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJLZXlEb3duSGFuZGxlciA9IHJlZ2lzdGVyS2V5RG93bkhhbmRsZXI7XG5mdW5jdGlvbiByZWdpc3RlcktleVVwSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlZ2lzdGVyS2V5VXBIYW5kbGVyID0gcmVnaXN0ZXJLZXlVcEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBmcmFtZUNvdW50ID0gMDtcbmxldCBmcHNJbnRlcnZhbCwgc3RhcnRUaW1lLCBub3csIHRoZW4sIGVsYXBzZWQsIGxvb3A7XG5mdW5jdGlvbiBhcHBMb29wKHsgZnBzLCBvbkZyYW1lLCB9KSB7XG4gICAgZnBzSW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgIHRoZW4gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgc3RhcnRUaW1lID0gdGhlbjtcbiAgICBsb29wID0gY3JlYXRlTG9vcChvbkZyYW1lKTtcbiAgICBsb29wKHN0YXJ0VGltZSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhcHBMb29wO1xuZnVuY3Rpb24gY3JlYXRlTG9vcChsb2dpYykge1xuICAgIHJldHVybiAobG9vcFRpbWUpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBub3cgPSBsb29wVGltZTtcbiAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoZW47XG4gICAgICAgIGlmIChlbGFwc2VkID4gZnBzSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIGZwc0ludGVydmFsKTtcbiAgICAgICAgICAgIGNvbnN0IHNpbmNlU3RhcnQgPSBub3cgLSBzdGFydFRpbWU7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RnBzID0gTWF0aC5yb3VuZCgoMTAwMCAvIChzaW5jZVN0YXJ0IC8gKytmcmFtZUNvdW50KSkgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgbG9naWMoeyBjdXJyZW50RnBzIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRXaW5kb3dTaXplID0gZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGV4cG9ydHMuY2xlYXJEcmF3aW5nQXJlYSA9IHZvaWQgMDtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICBjYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbn0pO1xuZnVuY3Rpb24gY2xlYXJEcmF3aW5nQXJlYSgpIHtcbiAgICBjb25zdCBjID0gZ2V0RHJhd2luZ0NvbnRleHQoKTtcbiAgICBjLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuZXhwb3J0cy5jbGVhckRyYXdpbmdBcmVhID0gY2xlYXJEcmF3aW5nQXJlYTtcbmZ1bmN0aW9uIGdldERyYXdpbmdDb250ZXh0KCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IGNhbnZhcyBkcmF3aW5nIDJkIGNvbnRleHQnKTtcbn1cbmV4cG9ydHMuZ2V0RHJhd2luZ0NvbnRleHQgPSBnZXREcmF3aW5nQ29udGV4dDtcbmZ1bmN0aW9uIGdldFdpbmRvd1NpemUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGlubmVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogaW5uZXJIZWlnaHQsXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0V2luZG93U2l6ZSA9IGdldFdpbmRvd1NpemU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFuZG9tUmdiYSA9IHZvaWQgMDtcbmZ1bmN0aW9uIHplcm9UbzI1NigpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KTtcbn1cbmZ1bmN0aW9uIHplcm9UbzEoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9GaXhlZCgxKTtcbn1cbmZ1bmN0aW9uIHJhbmRvbVJnYmEoKSB7XG4gICAgcmV0dXJuIGByZ2JhKCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMjU2KCl9LCR7emVyb1RvMSgpfSlgO1xufVxuZXhwb3J0cy5yYW5kb21SZ2JhID0gcmFuZG9tUmdiYTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9