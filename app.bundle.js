/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
class SimpleJumper {
    constructor(x = 0, y = 0, width = SimpleJumper.JumperSize, height = SimpleJumper.JumperSize, jumping = true, xVelocity = 0, yVelocity = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.jumping = jumping;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.controller = {
            left: false,
            right: false,
            up: false,
            keyListener: (event) => {
                const key_state = event.type == 'keydown';
                switch (event.keyCode) {
                    case 37: // left key
                        this.controller.left = key_state;
                        break;
                    case 38: // up key
                        this.controller.up = key_state;
                        break;
                    case 39: // right key
                        this.controller.right = key_state;
                        break;
                }
            },
        };
        appEvents_1.registerKeyDownHandler(this.controller.keyListener);
        appEvents_1.registerKeyUpHandler(this.controller.keyListener);
    }
    draw(ctx) {
        ctx.fillStyle = '#ff0000'; // hex for red
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
    update(ground) {
        if (this.controller.up && !this.jumping) {
            this.yVelocity -= 20;
            this.jumping = true;
        }
        if (this.controller.left) {
            this.xVelocity -= 0.5;
        }
        if (this.controller.right) {
            this.xVelocity += 0.5;
        }
        this.yVelocity += 1.5; // gravity
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.xVelocity *= 0.9; // friction
        this.yVelocity *= 0.9; // friction
        // if this is falling below floor line
        if (this.y > ground.y - 32) {
            this.jumping = false;
            this.y = ground.y - 32;
            this.yVelocity = 0;
        }
        // if this is going off the left of the screen
        if (this.x < -32) {
            this.x = ground.width;
        }
        else if (this.x > ground.width) {
            // if this goes past right boundary
            this.x = -32;
        }
    }
}
exports.default = SimpleJumper;
SimpleJumper.JumperSize = 32;


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
const fps = 24;
appLoop_1.default({ fps, onFrame: loop });
const context = appWindow_1.getDrawingContext();
const jumper = new SimpleJumper_1.default();
function getGround(size) {
    const x = 0;
    const y = 164;
    const height = 16;
    const width = size.width;
    return { x, y, width, height };
}
function loop() {
    const windowSize = appWindow_1.getWindowSize();
    const ground = getGround(windowSize);
    jumper.update(ground);
    appWindow_1.clearDrawingArea();
    context.fillStyle = '#202020';
    context.lineWidth = 4;
    context.strokeRect(ground.x, ground.y, ground.width, ground.height);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL1NpbXBsZUp1bXBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwRXZlbnRzLnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvdXRpbHMvYXBwTG9vcC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcFdpbmRvdy50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLG9EQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOzs7Ozs7Ozs7Ozs7OztBQ3pFYTtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtDQUFrQyxtQkFBTyxDQUFDLCtDQUFpQjtBQUMzRCxvQkFBb0IsbUJBQU8sQ0FBQyxtREFBbUI7QUFDL0MsdUNBQXVDLG1CQUFPLENBQUMsK0RBQXlCO0FBQ3hFO0FBQ0EsbUJBQW1CLHFCQUFxQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw0QkFBNEIsR0FBRyw4QkFBOEIsR0FBRyw0QkFBNEIsR0FBRyx3QkFBd0IsR0FBRyw2QkFBNkI7QUFDdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDZjtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RDtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGFBQWE7QUFDaEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcseUJBQXlCLEdBQUcsd0JBQXdCO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7Ozs7Ozs7VUM3QnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXBwRXZlbnRzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvYXBwRXZlbnRzXCIpO1xuY2xhc3MgU2ltcGxlSnVtcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIHdpZHRoID0gU2ltcGxlSnVtcGVyLkp1bXBlclNpemUsIGhlaWdodCA9IFNpbXBsZUp1bXBlci5KdW1wZXJTaXplLCBqdW1waW5nID0gdHJ1ZSwgeFZlbG9jaXR5ID0gMCwgeVZlbG9jaXR5ID0gMCkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmp1bXBpbmcgPSBqdW1waW5nO1xuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IHhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSB5VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IHtcbiAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgdXA6IGZhbHNlLFxuICAgICAgICAgICAga2V5TGlzdGVuZXI6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleV9zdGF0ZSA9IGV2ZW50LnR5cGUgPT0gJ2tleWRvd24nO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM3OiAvLyBsZWZ0IGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLmxlZnQgPSBrZXlfc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzODogLy8gdXAga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIudXAgPSBrZXlfc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOTogLy8gcmlnaHQga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIucmlnaHQgPSBrZXlfc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBhcHBFdmVudHNfMS5yZWdpc3RlcktleURvd25IYW5kbGVyKHRoaXMuY29udHJvbGxlci5rZXlMaXN0ZW5lcik7XG4gICAgICAgIGFwcEV2ZW50c18xLnJlZ2lzdGVyS2V5VXBIYW5kbGVyKHRoaXMuY29udHJvbGxlci5rZXlMaXN0ZW5lcik7XG4gICAgfVxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmMDAwMCc7IC8vIGhleCBmb3IgcmVkXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgdXBkYXRlKGdyb3VuZCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLnVwICYmICF0aGlzLmp1bXBpbmcpIHtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5IC09IDIwO1xuICAgICAgICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLmxlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFZlbG9jaXR5IC09IDAuNTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhWZWxvY2l0eSArPSAwLjU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy55VmVsb2NpdHkgKz0gMS41OyAvLyBncmF2aXR5XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLnhWZWxvY2l0eSAqPSAwLjk7IC8vIGZyaWN0aW9uXG4gICAgICAgIHRoaXMueVZlbG9jaXR5ICo9IDAuOTsgLy8gZnJpY3Rpb25cbiAgICAgICAgLy8gaWYgdGhpcyBpcyBmYWxsaW5nIGJlbG93IGZsb29yIGxpbmVcbiAgICAgICAgaWYgKHRoaXMueSA+IGdyb3VuZC55IC0gMzIpIHtcbiAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy55ID0gZ3JvdW5kLnkgLSAzMjtcbiAgICAgICAgICAgIHRoaXMueVZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGlzIGlzIGdvaW5nIG9mZiB0aGUgbGVmdCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIGlmICh0aGlzLnggPCAtMzIpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IGdyb3VuZC53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnggPiBncm91bmQud2lkdGgpIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgZ29lcyBwYXN0IHJpZ2h0IGJvdW5kYXJ5XG4gICAgICAgICAgICB0aGlzLnggPSAtMzI7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTaW1wbGVKdW1wZXI7XG5TaW1wbGVKdW1wZXIuSnVtcGVyU2l6ZSA9IDMyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBMb29wXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdXRpbHMvYXBwTG9vcFwiKSk7XG5jb25zdCBhcHBXaW5kb3dfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2FwcFdpbmRvd1wiKTtcbmNvbnN0IFNpbXBsZUp1bXBlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2VudGl0aWVzL1NpbXBsZUp1bXBlclwiKSk7XG5jb25zdCBmcHMgPSAyNDtcbmFwcExvb3BfMS5kZWZhdWx0KHsgZnBzLCBvbkZyYW1lOiBsb29wIH0pO1xuY29uc3QgY29udGV4dCA9IGFwcFdpbmRvd18xLmdldERyYXdpbmdDb250ZXh0KCk7XG5jb25zdCBqdW1wZXIgPSBuZXcgU2ltcGxlSnVtcGVyXzEuZGVmYXVsdCgpO1xuZnVuY3Rpb24gZ2V0R3JvdW5kKHNpemUpIHtcbiAgICBjb25zdCB4ID0gMDtcbiAgICBjb25zdCB5ID0gMTY0O1xuICAgIGNvbnN0IGhlaWdodCA9IDE2O1xuICAgIGNvbnN0IHdpZHRoID0gc2l6ZS53aWR0aDtcbiAgICByZXR1cm4geyB4LCB5LCB3aWR0aCwgaGVpZ2h0IH07XG59XG5mdW5jdGlvbiBsb29wKCkge1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBhcHBXaW5kb3dfMS5nZXRXaW5kb3dTaXplKCk7XG4gICAgY29uc3QgZ3JvdW5kID0gZ2V0R3JvdW5kKHdpbmRvd1NpemUpO1xuICAgIGp1bXBlci51cGRhdGUoZ3JvdW5kKTtcbiAgICBhcHBXaW5kb3dfMS5jbGVhckRyYXdpbmdBcmVhKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSAnIzIwMjAyMCc7XG4gICAgY29udGV4dC5saW5lV2lkdGggPSA0O1xuICAgIGNvbnRleHQuc3Ryb2tlUmVjdChncm91bmQueCwgZ3JvdW5kLnksIGdyb3VuZC53aWR0aCwgZ3JvdW5kLmhlaWdodCk7XG4gICAganVtcGVyLmRyYXcoY29udGV4dCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVnaXN0ZXJLZXlVcEhhbmRsZXIgPSBleHBvcnRzLnJlZ2lzdGVyS2V5RG93bkhhbmRsZXIgPSBleHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gZXhwb3J0cy5nZXRNb3VzZVBvc2l0aW9uID0gZXhwb3J0cy5yZWdpc3RlclJlc2l6ZUhhbmRsZXIgPSB2b2lkIDA7XG5jb25zdCBtb3VzZSA9IHtcbiAgICB4OiBpbm5lcldpZHRoIC8gMixcbiAgICB5OiBpbm5lckhlaWdodCAvIDIsXG59O1xuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgbW91c2UueCA9IGV2ZW50LmNsaWVudFg7XG4gICAgbW91c2UueSA9IGV2ZW50LmNsaWVudFk7XG59KTtcbmZ1bmN0aW9uIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGhhbmRsZXIsIDEwMCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnJlZ2lzdGVyUmVzaXplSGFuZGxlciA9IHJlZ2lzdGVyUmVzaXplSGFuZGxlcjtcbmZ1bmN0aW9uIGdldE1vdXNlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIG1vdXNlO1xufVxuZXhwb3J0cy5nZXRNb3VzZVBvc2l0aW9uID0gZ2V0TW91c2VQb3NpdGlvbjtcbmZ1bmN0aW9uIHJlZ2lzdGVyQ2xpY2tIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZWdpc3RlckNsaWNrSGFuZGxlciA9IHJlZ2lzdGVyQ2xpY2tIYW5kbGVyO1xuZnVuY3Rpb24gcmVnaXN0ZXJLZXlEb3duSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJLZXlEb3duSGFuZGxlciA9IHJlZ2lzdGVyS2V5RG93bkhhbmRsZXI7XG5mdW5jdGlvbiByZWdpc3RlcktleVVwSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlZ2lzdGVyS2V5VXBIYW5kbGVyID0gcmVnaXN0ZXJLZXlVcEhhbmRsZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmxldCBmcmFtZUNvdW50ID0gMDtcbmxldCBmcHNJbnRlcnZhbCwgc3RhcnRUaW1lLCBub3csIHRoZW4sIGVsYXBzZWQsIGxvb3A7XG5mdW5jdGlvbiBhcHBMb29wKHsgZnBzLCBvbkZyYW1lLCB9KSB7XG4gICAgZnBzSW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuICAgIHRoZW4gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgc3RhcnRUaW1lID0gdGhlbjtcbiAgICBsb29wID0gY3JlYXRlTG9vcChvbkZyYW1lKTtcbiAgICBsb29wKHN0YXJ0VGltZSk7XG59XG5leHBvcnRzLmRlZmF1bHQgPSBhcHBMb29wO1xuZnVuY3Rpb24gY3JlYXRlTG9vcChsb2dpYykge1xuICAgIHJldHVybiAobG9vcFRpbWUpID0+IHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICBub3cgPSBsb29wVGltZTtcbiAgICAgICAgZWxhcHNlZCA9IG5vdyAtIHRoZW47XG4gICAgICAgIGlmIChlbGFwc2VkID4gZnBzSW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZWxhcHNlZCAlIGZwc0ludGVydmFsKTtcbiAgICAgICAgICAgIGNvbnN0IHNpbmNlU3RhcnQgPSBub3cgLSBzdGFydFRpbWU7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RnBzID0gTWF0aC5yb3VuZCgoMTAwMCAvIChzaW5jZVN0YXJ0IC8gKytmcmFtZUNvdW50KSkgKiAxMDApIC8gMTAwO1xuICAgICAgICAgICAgbG9naWMoeyBjdXJyZW50RnBzIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRXaW5kb3dTaXplID0gZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGV4cG9ydHMuY2xlYXJEcmF3aW5nQXJlYSA9IHZvaWQgMDtcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcbiAgICBjYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBpbm5lckhlaWdodDtcbn0pO1xuZnVuY3Rpb24gY2xlYXJEcmF3aW5nQXJlYSgpIHtcbiAgICBjb25zdCBjID0gZ2V0RHJhd2luZ0NvbnRleHQoKTtcbiAgICBjLmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuZXhwb3J0cy5jbGVhckRyYXdpbmdBcmVhID0gY2xlYXJEcmF3aW5nQXJlYTtcbmZ1bmN0aW9uIGdldERyYXdpbmdDb250ZXh0KCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZ2V0IGNhbnZhcyBkcmF3aW5nIDJkIGNvbnRleHQnKTtcbn1cbmV4cG9ydHMuZ2V0RHJhd2luZ0NvbnRleHQgPSBnZXREcmF3aW5nQ29udGV4dDtcbmZ1bmN0aW9uIGdldFdpbmRvd1NpemUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGlubmVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogaW5uZXJIZWlnaHQsXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0V2luZG93U2l6ZSA9IGdldFdpbmRvd1NpemU7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==