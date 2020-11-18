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
    context.fillRect(ground.x, ground.y, ground.width, ground.height);
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
SimpleJumper.Gravity = 2;
SimpleJumper.Friction = 0.9;
SimpleJumper.JumpPower = 30;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL0dyb3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL1NpbXBsZUp1bXBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwRXZlbnRzLnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwTG9vcC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2NvbG9yLnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2FudmFzLWFwcC10ZW1wbGF0ZS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkw7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsb0RBQW9CO0FBQ2hELGdCQUFnQixtQkFBTyxDQUFDLDRDQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMxRWE7QUFDYjtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQ0FBa0MsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDM0Qsb0JBQW9CLG1CQUFPLENBQUMsbURBQW1CO0FBQy9DLHVDQUF1QyxtQkFBTyxDQUFDLCtEQUF5QjtBQUN4RSxpQkFBaUIsbUJBQU8sQ0FBQyxtREFBbUI7QUFDNUM7QUFDQSxtQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw0QkFBNEIsR0FBRyw4QkFBOEIsR0FBRyw0QkFBNEIsR0FBRyx3QkFBd0IsR0FBRyw2QkFBNkI7QUFDdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDZjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcseUJBQXlCLEdBQUcsd0JBQXdCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QlI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVksR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLFVBQVU7QUFDMUU7QUFDQSxrQkFBa0I7Ozs7Ozs7VUNabEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRyYXdHcm91bmQgPSBleHBvcnRzLmdldEdyb3VuZCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGdldEdyb3VuZChzaXplKSB7XG4gICAgY29uc3QgeCA9IDA7XG4gICAgY29uc3QgeSA9IHNpemUuaGVpZ2h0IC8gMztcbiAgICBjb25zdCBoZWlnaHQgPSAxNjtcbiAgICBjb25zdCB3aWR0aCA9IHNpemUud2lkdGg7XG4gICAgcmV0dXJuIHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9O1xufVxuZXhwb3J0cy5nZXRHcm91bmQgPSBnZXRHcm91bmQ7XG5mdW5jdGlvbiBkcmF3R3JvdW5kKGNvbnRleHQsIGdyb3VuZCkge1xuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJyMyMDIwMjAnO1xuICAgIGNvbnRleHQubGluZVdpZHRoID0gNDtcbiAgICBjb250ZXh0LmZpbGxSZWN0KGdyb3VuZC54LCBncm91bmQueSwgZ3JvdW5kLndpZHRoLCBncm91bmQuaGVpZ2h0KTtcbn1cbmV4cG9ydHMuZHJhd0dyb3VuZCA9IGRyYXdHcm91bmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcEV2ZW50c18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FwcEV2ZW50c1wiKTtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29sb3JcIik7XG5jbGFzcyBTaW1wbGVKdW1wZXIge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwganVtcGluZyA9IHRydWUsIHhWZWxvY2l0eSA9IDAsIHlWZWxvY2l0eSA9IDAsIGNvbG9yID0gY29sb3JfMS5yYW5kb21SZ2JhKCkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5qdW1waW5nID0ganVtcGluZztcbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSB4VmVsb2NpdHk7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0geVZlbG9jaXR5O1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IHtcbiAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgdXA6IGZhbHNlLFxuICAgICAgICAgICAga2V5TGlzdGVuZXI6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleVN0YXRlID0gZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLnVwID0ga2V5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5sZWZ0ID0ga2V5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIucmlnaHQgPSBrZXlTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGFwcEV2ZW50c18xLnJlZ2lzdGVyS2V5RG93bkhhbmRsZXIodGhpcy5jb250cm9sbGVyLmtleUxpc3RlbmVyKTtcbiAgICAgICAgYXBwRXZlbnRzXzEucmVnaXN0ZXJLZXlVcEhhbmRsZXIodGhpcy5jb250cm9sbGVyLmtleUxpc3RlbmVyKTtcbiAgICB9XG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksIFNpbXBsZUp1bXBlci5TaXplLCBTaW1wbGVKdW1wZXIuU2l6ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIHVwZGF0ZShncm91bmQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci51cCAmJiAhdGhpcy5qdW1waW5nKSB7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSAtPSBTaW1wbGVKdW1wZXIuSnVtcFBvd2VyO1xuICAgICAgICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5IC09IFNpbXBsZUp1bXBlci5Nb3ZpbmdTcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhWZWxvY2l0eSArPSBTaW1wbGVKdW1wZXIuTW92aW5nU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54ICs9IHRoaXMueFZlbG9jaXR5O1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy55VmVsb2NpdHk7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICs9IFNpbXBsZUp1bXBlci5HcmF2aXR5O1xuICAgICAgICB0aGlzLnhWZWxvY2l0eSAqPSBTaW1wbGVKdW1wZXIuRnJpY3Rpb247XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICo9IFNpbXBsZUp1bXBlci5GcmljdGlvbjtcbiAgICAgICAgaWYgKHRoaXMueSA+IGdyb3VuZC55IC0gU2ltcGxlSnVtcGVyLlNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy55ID0gZ3JvdW5kLnkgLSBTaW1wbGVKdW1wZXIuU2l6ZTtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy54IDwgLVNpbXBsZUp1bXBlci5TaXplKSB7XG4gICAgICAgICAgICB0aGlzLnggPSBncm91bmQud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gZ3JvdW5kLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnggPSAtU2ltcGxlSnVtcGVyLlNpemU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTaW1wbGVKdW1wZXI7XG5TaW1wbGVKdW1wZXIuU2l6ZSA9IDMyO1xuU2ltcGxlSnVtcGVyLkdyYXZpdHkgPSAyO1xuU2ltcGxlSnVtcGVyLkZyaWN0aW9uID0gMC45O1xuU2ltcGxlSnVtcGVyLkp1bXBQb3dlciA9IDMwO1xuU2ltcGxlSnVtcGVyLk1vdmluZ1NwZWVkID0gMTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBwTG9vcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL2FwcExvb3BcIikpO1xuY29uc3QgYXBwV2luZG93XzEgPSByZXF1aXJlKFwiLi91dGlscy9hcHBXaW5kb3dcIik7XG5jb25zdCBTaW1wbGVKdW1wZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9lbnRpdGllcy9TaW1wbGVKdW1wZXJcIikpO1xuY29uc3QgR3JvdW5kXzEgPSByZXF1aXJlKFwiLi9lbnRpdGllcy9Hcm91bmRcIik7XG5jb25zdCBmcHMgPSAyNDtcbmFwcExvb3BfMS5kZWZhdWx0KHsgZnBzLCBvbkZyYW1lOiBsb29wIH0pO1xuY29uc3QgY29udGV4dCA9IGFwcFdpbmRvd18xLmdldERyYXdpbmdDb250ZXh0KCk7XG5jb25zdCBqdW1wZXIgPSBuZXcgU2ltcGxlSnVtcGVyXzEuZGVmYXVsdCgpO1xuZnVuY3Rpb24gbG9vcCgpIHtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gYXBwV2luZG93XzEuZ2V0V2luZG93U2l6ZSgpO1xuICAgIGNvbnN0IGdyb3VuZCA9IEdyb3VuZF8xLmdldEdyb3VuZCh3aW5kb3dTaXplKTtcbiAgICBqdW1wZXIudXBkYXRlKGdyb3VuZCk7XG4gICAgYXBwV2luZG93XzEuY2xlYXJEcmF3aW5nQXJlYSgpO1xuICAgIEdyb3VuZF8xLmRyYXdHcm91bmQoY29udGV4dCwgZ3JvdW5kKTtcbiAgICBqdW1wZXIuZHJhdyhjb250ZXh0KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZWdpc3RlcktleVVwSGFuZGxlciA9IGV4cG9ydHMucmVnaXN0ZXJLZXlEb3duSGFuZGxlciA9IGV4cG9ydHMucmVnaXN0ZXJDbGlja0hhbmRsZXIgPSBleHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBleHBvcnRzLnJlZ2lzdGVyUmVzaXplSGFuZGxlciA9IHZvaWQgMDtcbmNvbnN0IG1vdXNlID0ge1xuICAgIHg6IGlubmVyV2lkdGggLyAyLFxuICAgIHk6IGlubmVySGVpZ2h0IC8gMixcbn07XG5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICBtb3VzZS54ID0gZXZlbnQuY2xpZW50WDtcbiAgICBtb3VzZS55ID0gZXZlbnQuY2xpZW50WTtcbn0pO1xuZnVuY3Rpb24gcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoaGFuZGxlciwgMTAwKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJSZXNpemVIYW5kbGVyID0gcmVnaXN0ZXJSZXNpemVIYW5kbGVyO1xuZnVuY3Rpb24gZ2V0TW91c2VQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbW91c2U7XG59XG5leHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uO1xuZnVuY3Rpb24gcmVnaXN0ZXJDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gcmVnaXN0ZXJDbGlja0hhbmRsZXI7XG5mdW5jdGlvbiByZWdpc3RlcktleURvd25IYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZWdpc3RlcktleURvd25IYW5kbGVyID0gcmVnaXN0ZXJLZXlEb3duSGFuZGxlcjtcbmZ1bmN0aW9uIHJlZ2lzdGVyS2V5VXBIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJLZXlVcEhhbmRsZXIgPSByZWdpc3RlcktleVVwSGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xubGV0IGZyYW1lQ291bnQgPSAwO1xubGV0IGZwc0ludGVydmFsLCBzdGFydFRpbWUsIG5vdywgdGhlbiwgZWxhcHNlZCwgbG9vcDtcbmZ1bmN0aW9uIGFwcExvb3AoeyBmcHMsIG9uRnJhbWUsIH0pIHtcbiAgICBmcHNJbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG4gICAgdGhlbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICBzdGFydFRpbWUgPSB0aGVuO1xuICAgIGxvb3AgPSBjcmVhdGVMb29wKG9uRnJhbWUpO1xuICAgIGxvb3Aoc3RhcnRUaW1lKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGFwcExvb3A7XG5mdW5jdGlvbiBjcmVhdGVMb29wKGxvZ2ljKSB7XG4gICAgcmV0dXJuIChsb29wVGltZSkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIG5vdyA9IGxvb3BUaW1lO1xuICAgICAgICBlbGFwc2VkID0gbm93IC0gdGhlbjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiBmcHNJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChlbGFwc2VkICUgZnBzSW50ZXJ2YWwpO1xuICAgICAgICAgICAgY29uc3Qgc2luY2VTdGFydCA9IG5vdyAtIHN0YXJ0VGltZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGcHMgPSBNYXRoLnJvdW5kKCgxMDAwIC8gKHNpbmNlU3RhcnQgLyArK2ZyYW1lQ291bnQpKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICBsb2dpYyh7IGN1cnJlbnRGcHMgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFdpbmRvd1NpemUgPSBleHBvcnRzLmdldERyYXdpbmdDb250ZXh0ID0gZXhwb3J0cy5jbGVhckRyYXdpbmdBcmVhID0gdm9pZCAwO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5jYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGNhbnZhcy53aWR0aCA9IGlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xufSk7XG5mdW5jdGlvbiBjbGVhckRyYXdpbmdBcmVhKCkge1xuICAgIGNvbnN0IGMgPSBnZXREcmF3aW5nQ29udGV4dCgpO1xuICAgIGMuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5leHBvcnRzLmNsZWFyRHJhd2luZ0FyZWEgPSBjbGVhckRyYXdpbmdBcmVhO1xuZnVuY3Rpb24gZ2V0RHJhd2luZ0NvbnRleHQoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgY2FudmFzIGRyYXdpbmcgMmQgY29udGV4dCcpO1xufVxuZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGdldERyYXdpbmdDb250ZXh0O1xuZnVuY3Rpb24gZ2V0V2luZG93U2l6ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbm5lckhlaWdodCxcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRXaW5kb3dTaXplID0gZ2V0V2luZG93U2l6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5kb21SZ2JhID0gdm9pZCAwO1xuZnVuY3Rpb24gemVyb1RvMjU2KCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xufVxuZnVuY3Rpb24gemVyb1RvMSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b0ZpeGVkKDEpO1xufVxuZnVuY3Rpb24gcmFuZG9tUmdiYSgpIHtcbiAgICByZXR1cm4gYHJnYmEoJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8xKCl9KWA7XG59XG5leHBvcnRzLnJhbmRvbVJnYmEgPSByYW5kb21SZ2JhO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=