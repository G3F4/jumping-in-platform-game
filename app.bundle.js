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
function getGround(size, level = 1) {
    const levelHeight = size.height / 3;
    const x = 0;
    const y = levelHeight * level;
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

/***/ "./src/entities/VectorJumper.ts":
/*!**************************************!*\
  !*** ./src/entities/VectorJumper.ts ***!
  \**************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:23-27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const appEvents_1 = __webpack_require__(/*! ../utils/appEvents */ "./src/utils/appEvents.ts");
const color_1 = __webpack_require__(/*! ../utils/color */ "./src/utils/color.ts");
const Vector_1 = __importDefault(__webpack_require__(/*! ../models/Vector */ "./src/models/Vector.ts"));
class VectorJumper {
    constructor(x = 0, y = 0, jumping = true, velocity = new Vector_1.default(0, 0), color = color_1.randomRgba()) {
        this.x = x;
        this.y = y;
        this.jumping = jumping;
        this.velocity = velocity;
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
        ctx.rect(this.x, this.y, VectorJumper.Size, VectorJumper.Size);
        ctx.fill();
    }
    update(ground) {
        if (this.controller.up && !this.jumping) {
            this.velocity = this.velocity.add(new Vector_1.default(0, 20));
            this.jumping = true;
        }
        if (this.controller.left) {
            this.velocity = this.velocity.subtract(new Vector_1.default(VectorJumper.MovingSpeed, 0));
        }
        if (this.controller.right) {
            this.velocity = this.velocity.add(new Vector_1.default(VectorJumper.MovingSpeed, 0));
        }
        this.x += this.velocity.components[0];
        this.y += this.velocity.components[1];
        this.velocity = this.velocity.add(new Vector_1.default(0, VectorJumper.Gravity));
        this.velocity = this.velocity.add(new Vector_1.default(VectorJumper.GroundFriction, 0));
        this.velocity = this.velocity.add(new Vector_1.default(0, VectorJumper.AirFriction));
        if (this.y > ground.y - VectorJumper.Size) {
            this.jumping = false;
            this.y = ground.y - VectorJumper.Size;
            this.velocity = new Vector_1.default(this.velocity.components[0], 0);
        }
        if (this.x < -VectorJumper.Size) {
            this.x = ground.width;
        }
        else if (this.x > ground.width) {
            this.x = -VectorJumper.Size;
        }
    }
}
exports.default = VectorJumper;
VectorJumper.Size = 32;
VectorJumper.Gravity = 2;
VectorJumper.GroundFriction = 0.9;
VectorJumper.AirFriction = 0.9;
VectorJumper.JumpPower = 30;
VectorJumper.MovingSpeed = 1;


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
const VectorJumper_1 = __importDefault(__webpack_require__(/*! ./entities/VectorJumper */ "./src/entities/VectorJumper.ts"));
const fps = 50;
appLoop_1.default({ fps, onFrame: loop });
const context = appWindow_1.getDrawingContext();
const simpleJumper = new SimpleJumper_1.default();
const vectorJumper = new VectorJumper_1.default(0, appWindow_1.getWindowSize().height / 3);
function loop() {
    const windowSize = appWindow_1.getWindowSize();
    const firstGround = Ground_1.getGround(windowSize, 1);
    const secondGround = Ground_1.getGround(windowSize, 2);
    simpleJumper.update(firstGround);
    vectorJumper.update(secondGround);
    appWindow_1.clearDrawingArea();
    Ground_1.drawGround(context, firstGround);
    Ground_1.drawGround(context, secondGround);
    simpleJumper.draw(context);
    vectorJumper.draw(context);
}


/***/ }),

/***/ "./src/models/Vector.ts":
/*!******************************!*\
  !*** ./src/models/Vector.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const EPSILON = 0.00000001;
function areEqual(one, other, epsilon = EPSILON) {
    return Math.abs(one - other) < epsilon;
}
function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}
class Vector {
    constructor(...components) {
        this.components = components;
    }
    normalize() {
        return this.scaleBy(1 / this.length());
    }
    length() {
        return Math.hypot(...this.components);
    }
    negate() {
        return this.scaleBy(-1);
    }
    withLength(newLength) {
        return this.normalize().scaleBy(newLength);
    }
    add({ components }) {
        return new Vector(...components.map((component, index) => this.components[index] + component));
    }
    subtract({ components }) {
        return new Vector(...components.map((component, index) => this.components[index] - component));
    }
    scaleBy(factor) {
        return new Vector(...this.components.map((component) => component * factor));
    }
    dotProduct({ components }) {
        return components.reduce((acc, component, index) => acc + component * this.components[index], 0);
    }
    haveSameDirectionWith(other) {
        const dotProduct = this.normalize().dotProduct(other.normalize());
        return areEqual(dotProduct, 1);
    }
    haveOppositeDirectionTo(other) {
        const dotProduct = this.normalize().dotProduct(other.normalize());
        return areEqual(dotProduct, -1);
    }
    isPerpendicularTo(other) {
        const dotProduct = this.normalize().dotProduct(other.normalize());
        return areEqual(dotProduct, 0);
    }
    angleBetween(other) {
        return toDegrees(Math.acos(this.dotProduct(other) / (this.length() * other.length())));
    }
    projectOn(other) {
        const normalized = other.normalize();
        return normalized.scaleBy(this.dotProduct(normalized));
    }
    equalTo({ components }) {
        return components.every((component, index) => areEqual(component, this.components[index]));
    }
}
exports.default = Vector;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL0dyb3VuZC50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL1NpbXBsZUp1bXBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2VudGl0aWVzL1ZlY3Rvckp1bXBlci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvLi9zcmMvbW9kZWxzL1ZlY3Rvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcEV2ZW50cy50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlLy4vc3JjL3V0aWxzL2FwcExvb3AudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLWFwcC10ZW1wbGF0ZS8uL3NyYy91dGlscy9hcHBXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vY2FudmFzLWFwcC10ZW1wbGF0ZS8uL3NyYy91dGlscy9jb2xvci50cyIsIndlYnBhY2s6Ly9jYW52YXMtYXBwLXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhbnZhcy1hcHAtdGVtcGxhdGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxrQkFBa0IsR0FBRyxpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQkw7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsb0RBQW9C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aWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kcmF3R3JvdW5kID0gZXhwb3J0cy5nZXRHcm91bmQgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXRHcm91bmQoc2l6ZSwgbGV2ZWwgPSAxKSB7XG4gICAgY29uc3QgbGV2ZWxIZWlnaHQgPSBzaXplLmhlaWdodCAvIDM7XG4gICAgY29uc3QgeCA9IDA7XG4gICAgY29uc3QgeSA9IGxldmVsSGVpZ2h0ICogbGV2ZWw7XG4gICAgY29uc3QgaGVpZ2h0ID0gMTY7XG4gICAgY29uc3Qgd2lkdGggPSBzaXplLndpZHRoO1xuICAgIHJldHVybiB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfTtcbn1cbmV4cG9ydHMuZ2V0R3JvdW5kID0gZ2V0R3JvdW5kO1xuZnVuY3Rpb24gZHJhd0dyb3VuZChjb250ZXh0LCBncm91bmQpIHtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICcjMjAyMDIwJztcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDQ7XG4gICAgY29udGV4dC5maWxsUmVjdChncm91bmQueCwgZ3JvdW5kLnksIGdyb3VuZC53aWR0aCwgZ3JvdW5kLmhlaWdodCk7XG59XG5leHBvcnRzLmRyYXdHcm91bmQgPSBkcmF3R3JvdW5kO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhcHBFdmVudHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcHBFdmVudHNcIik7XG5jb25zdCBjb2xvcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL2NvbG9yXCIpO1xuY2xhc3MgU2ltcGxlSnVtcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDAsIGp1bXBpbmcgPSB0cnVlLCB4VmVsb2NpdHkgPSAwLCB5VmVsb2NpdHkgPSAwLCBjb2xvciA9IGNvbG9yXzEucmFuZG9tUmdiYSgpKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuanVtcGluZyA9IGp1bXBpbmc7XG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0geFZlbG9jaXR5O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IHlWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSB7XG4gICAgICAgICAgICBsZWZ0OiBmYWxzZSxcbiAgICAgICAgICAgIHJpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIHVwOiBmYWxzZSxcbiAgICAgICAgICAgIGtleUxpc3RlbmVyOiAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXlTdGF0ZSA9IGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJztcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci51cCA9IGtleVN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIubGVmdCA9IGtleVN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLnJpZ2h0ID0ga2V5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBhcHBFdmVudHNfMS5yZWdpc3RlcktleURvd25IYW5kbGVyKHRoaXMuY29udHJvbGxlci5rZXlMaXN0ZW5lcik7XG4gICAgICAgIGFwcEV2ZW50c18xLnJlZ2lzdGVyS2V5VXBIYW5kbGVyKHRoaXMuY29udHJvbGxlci5rZXlMaXN0ZW5lcik7XG4gICAgfVxuICAgIGRyYXcoY3R4KSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHRoaXMueCwgdGhpcy55LCBTaW1wbGVKdW1wZXIuU2l6ZSwgU2ltcGxlSnVtcGVyLlNpemUpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cbiAgICB1cGRhdGUoZ3JvdW5kKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIudXAgJiYgIXRoaXMuanVtcGluZykge1xuICAgICAgICAgICAgdGhpcy55VmVsb2NpdHkgLT0gU2ltcGxlSnVtcGVyLkp1bXBQb3dlcjtcbiAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnhWZWxvY2l0eSAtPSBTaW1wbGVKdW1wZXIuTW92aW5nU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5yaWdodCkge1xuICAgICAgICAgICAgdGhpcy54VmVsb2NpdHkgKz0gU2ltcGxlSnVtcGVyLk1vdmluZ1NwZWVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMueVZlbG9jaXR5O1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSArPSBTaW1wbGVKdW1wZXIuR3Jhdml0eTtcbiAgICAgICAgdGhpcy54VmVsb2NpdHkgKj0gU2ltcGxlSnVtcGVyLkZyaWN0aW9uO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSAqPSBTaW1wbGVKdW1wZXIuRnJpY3Rpb247XG4gICAgICAgIGlmICh0aGlzLnkgPiBncm91bmQueSAtIFNpbXBsZUp1bXBlci5TaXplKSB7XG4gICAgICAgICAgICB0aGlzLmp1bXBpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMueSA9IGdyb3VuZC55IC0gU2ltcGxlSnVtcGVyLlNpemU7XG4gICAgICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCA8IC1TaW1wbGVKdW1wZXIuU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy54ID0gZ3JvdW5kLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IGdyb3VuZC53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy54ID0gLVNpbXBsZUp1bXBlci5TaXplO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2ltcGxlSnVtcGVyO1xuU2ltcGxlSnVtcGVyLlNpemUgPSAzMjtcblNpbXBsZUp1bXBlci5HcmF2aXR5ID0gMjtcblNpbXBsZUp1bXBlci5GcmljdGlvbiA9IDAuOTtcblNpbXBsZUp1bXBlci5KdW1wUG93ZXIgPSAzMDtcblNpbXBsZUp1bXBlci5Nb3ZpbmdTcGVlZCA9IDE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcEV2ZW50c18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2FwcEV2ZW50c1wiKTtcbmNvbnN0IGNvbG9yXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvY29sb3JcIik7XG5jb25zdCBWZWN0b3JfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi4vbW9kZWxzL1ZlY3RvclwiKSk7XG5jbGFzcyBWZWN0b3JKdW1wZXIge1xuICAgIGNvbnN0cnVjdG9yKHggPSAwLCB5ID0gMCwganVtcGluZyA9IHRydWUsIHZlbG9jaXR5ID0gbmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMCksIGNvbG9yID0gY29sb3JfMS5yYW5kb21SZ2JhKCkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5qdW1waW5nID0ganVtcGluZztcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IHtcbiAgICAgICAgICAgIGxlZnQ6IGZhbHNlLFxuICAgICAgICAgICAgcmlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgdXA6IGZhbHNlLFxuICAgICAgICAgICAga2V5TGlzdGVuZXI6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleVN0YXRlID0gZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyLnVwID0ga2V5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5sZWZ0ID0ga2V5U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIucmlnaHQgPSBrZXlTdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGFwcEV2ZW50c18xLnJlZ2lzdGVyS2V5RG93bkhhbmRsZXIodGhpcy5jb250cm9sbGVyLmtleUxpc3RlbmVyKTtcbiAgICAgICAgYXBwRXZlbnRzXzEucmVnaXN0ZXJLZXlVcEhhbmRsZXIodGhpcy5jb250cm9sbGVyLmtleUxpc3RlbmVyKTtcbiAgICB9XG4gICAgZHJhdyhjdHgpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3QodGhpcy54LCB0aGlzLnksIFZlY3Rvckp1bXBlci5TaXplLCBWZWN0b3JKdW1wZXIuU2l6ZSk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIHVwZGF0ZShncm91bmQpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci51cCAmJiAhdGhpcy5qdW1waW5nKSB7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQobmV3IFZlY3Rvcl8xLmRlZmF1bHQoMCwgMjApKTtcbiAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29udHJvbGxlci5sZWZ0KSB7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5zdWJ0cmFjdChuZXcgVmVjdG9yXzEuZGVmYXVsdChWZWN0b3JKdW1wZXIuTW92aW5nU3BlZWQsIDApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb250cm9sbGVyLnJpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eS5hZGQobmV3IFZlY3Rvcl8xLmRlZmF1bHQoVmVjdG9ySnVtcGVyLk1vdmluZ1NwZWVkLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHkuY29tcG9uZW50c1swXTtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHkuY29tcG9uZW50c1sxXTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKG5ldyBWZWN0b3JfMS5kZWZhdWx0KDAsIFZlY3Rvckp1bXBlci5HcmF2aXR5KSk7XG4gICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5LmFkZChuZXcgVmVjdG9yXzEuZGVmYXVsdChWZWN0b3JKdW1wZXIuR3JvdW5kRnJpY3Rpb24sIDApKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHkuYWRkKG5ldyBWZWN0b3JfMS5kZWZhdWx0KDAsIFZlY3Rvckp1bXBlci5BaXJGcmljdGlvbikpO1xuICAgICAgICBpZiAodGhpcy55ID4gZ3JvdW5kLnkgLSBWZWN0b3JKdW1wZXIuU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5qdW1waW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnkgPSBncm91bmQueSAtIFZlY3Rvckp1bXBlci5TaXplO1xuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IG5ldyBWZWN0b3JfMS5kZWZhdWx0KHRoaXMudmVsb2NpdHkuY29tcG9uZW50c1swXSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMueCA8IC1WZWN0b3JKdW1wZXIuU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy54ID0gZ3JvdW5kLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IGdyb3VuZC53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy54ID0gLVZlY3Rvckp1bXBlci5TaXplO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmVjdG9ySnVtcGVyO1xuVmVjdG9ySnVtcGVyLlNpemUgPSAzMjtcblZlY3Rvckp1bXBlci5HcmF2aXR5ID0gMjtcblZlY3Rvckp1bXBlci5Hcm91bmRGcmljdGlvbiA9IDAuOTtcblZlY3Rvckp1bXBlci5BaXJGcmljdGlvbiA9IDAuOTtcblZlY3Rvckp1bXBlci5KdW1wUG93ZXIgPSAzMDtcblZlY3Rvckp1bXBlci5Nb3ZpbmdTcGVlZCA9IDE7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFwcExvb3BfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9hcHBMb29wXCIpKTtcbmNvbnN0IGFwcFdpbmRvd18xID0gcmVxdWlyZShcIi4vdXRpbHMvYXBwV2luZG93XCIpO1xuY29uc3QgU2ltcGxlSnVtcGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZW50aXRpZXMvU2ltcGxlSnVtcGVyXCIpKTtcbmNvbnN0IEdyb3VuZF8xID0gcmVxdWlyZShcIi4vZW50aXRpZXMvR3JvdW5kXCIpO1xuY29uc3QgVmVjdG9ySnVtcGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZW50aXRpZXMvVmVjdG9ySnVtcGVyXCIpKTtcbmNvbnN0IGZwcyA9IDUwO1xuYXBwTG9vcF8xLmRlZmF1bHQoeyBmcHMsIG9uRnJhbWU6IGxvb3AgfSk7XG5jb25zdCBjb250ZXh0ID0gYXBwV2luZG93XzEuZ2V0RHJhd2luZ0NvbnRleHQoKTtcbmNvbnN0IHNpbXBsZUp1bXBlciA9IG5ldyBTaW1wbGVKdW1wZXJfMS5kZWZhdWx0KCk7XG5jb25zdCB2ZWN0b3JKdW1wZXIgPSBuZXcgVmVjdG9ySnVtcGVyXzEuZGVmYXVsdCgwLCBhcHBXaW5kb3dfMS5nZXRXaW5kb3dTaXplKCkuaGVpZ2h0IC8gMyk7XG5mdW5jdGlvbiBsb29wKCkge1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBhcHBXaW5kb3dfMS5nZXRXaW5kb3dTaXplKCk7XG4gICAgY29uc3QgZmlyc3RHcm91bmQgPSBHcm91bmRfMS5nZXRHcm91bmQod2luZG93U2l6ZSwgMSk7XG4gICAgY29uc3Qgc2Vjb25kR3JvdW5kID0gR3JvdW5kXzEuZ2V0R3JvdW5kKHdpbmRvd1NpemUsIDIpO1xuICAgIHNpbXBsZUp1bXBlci51cGRhdGUoZmlyc3RHcm91bmQpO1xuICAgIHZlY3Rvckp1bXBlci51cGRhdGUoc2Vjb25kR3JvdW5kKTtcbiAgICBhcHBXaW5kb3dfMS5jbGVhckRyYXdpbmdBcmVhKCk7XG4gICAgR3JvdW5kXzEuZHJhd0dyb3VuZChjb250ZXh0LCBmaXJzdEdyb3VuZCk7XG4gICAgR3JvdW5kXzEuZHJhd0dyb3VuZChjb250ZXh0LCBzZWNvbmRHcm91bmQpO1xuICAgIHNpbXBsZUp1bXBlci5kcmF3KGNvbnRleHQpO1xuICAgIHZlY3Rvckp1bXBlci5kcmF3KGNvbnRleHQpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBFUFNJTE9OID0gMC4wMDAwMDAwMTtcbmZ1bmN0aW9uIGFyZUVxdWFsKG9uZSwgb3RoZXIsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKG9uZSAtIG90aGVyKSA8IGVwc2lsb247XG59XG5mdW5jdGlvbiB0b0RlZ3JlZXMocmFkaWFucykge1xuICAgIHJldHVybiAocmFkaWFucyAqIDE4MCkgLyBNYXRoLlBJO1xufVxuY2xhc3MgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvciguLi5jb21wb25lbnRzKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgfVxuICAgIG5vcm1hbGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGVCeSgxIC8gdGhpcy5sZW5ndGgoKSk7XG4gICAgfVxuICAgIGxlbmd0aCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguaHlwb3QoLi4udGhpcy5jb21wb25lbnRzKTtcbiAgICB9XG4gICAgbmVnYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZUJ5KC0xKTtcbiAgICB9XG4gICAgd2l0aExlbmd0aChuZXdMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKCkuc2NhbGVCeShuZXdMZW5ndGgpO1xuICAgIH1cbiAgICBhZGQoeyBjb21wb25lbnRzIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoLi4uY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaW5kZXgpID0+IHRoaXMuY29tcG9uZW50c1tpbmRleF0gKyBjb21wb25lbnQpKTtcbiAgICB9XG4gICAgc3VidHJhY3QoeyBjb21wb25lbnRzIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoLi4uY29tcG9uZW50cy5tYXAoKGNvbXBvbmVudCwgaW5kZXgpID0+IHRoaXMuY29tcG9uZW50c1tpbmRleF0gLSBjb21wb25lbnQpKTtcbiAgICB9XG4gICAgc2NhbGVCeShmYWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoLi4udGhpcy5jb21wb25lbnRzLm1hcCgoY29tcG9uZW50KSA9PiBjb21wb25lbnQgKiBmYWN0b3IpKTtcbiAgICB9XG4gICAgZG90UHJvZHVjdCh7IGNvbXBvbmVudHMgfSkge1xuICAgICAgICByZXR1cm4gY29tcG9uZW50cy5yZWR1Y2UoKGFjYywgY29tcG9uZW50LCBpbmRleCkgPT4gYWNjICsgY29tcG9uZW50ICogdGhpcy5jb21wb25lbnRzW2luZGV4XSwgMCk7XG4gICAgfVxuICAgIGhhdmVTYW1lRGlyZWN0aW9uV2l0aChvdGhlcikge1xuICAgICAgICBjb25zdCBkb3RQcm9kdWN0ID0gdGhpcy5ub3JtYWxpemUoKS5kb3RQcm9kdWN0KG90aGVyLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgcmV0dXJuIGFyZUVxdWFsKGRvdFByb2R1Y3QsIDEpO1xuICAgIH1cbiAgICBoYXZlT3Bwb3NpdGVEaXJlY3Rpb25UbyhvdGhlcikge1xuICAgICAgICBjb25zdCBkb3RQcm9kdWN0ID0gdGhpcy5ub3JtYWxpemUoKS5kb3RQcm9kdWN0KG90aGVyLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgcmV0dXJuIGFyZUVxdWFsKGRvdFByb2R1Y3QsIC0xKTtcbiAgICB9XG4gICAgaXNQZXJwZW5kaWN1bGFyVG8ob3RoZXIpIHtcbiAgICAgICAgY29uc3QgZG90UHJvZHVjdCA9IHRoaXMubm9ybWFsaXplKCkuZG90UHJvZHVjdChvdGhlci5ub3JtYWxpemUoKSk7XG4gICAgICAgIHJldHVybiBhcmVFcXVhbChkb3RQcm9kdWN0LCAwKTtcbiAgICB9XG4gICAgYW5nbGVCZXR3ZWVuKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0b0RlZ3JlZXMoTWF0aC5hY29zKHRoaXMuZG90UHJvZHVjdChvdGhlcikgLyAodGhpcy5sZW5ndGgoKSAqIG90aGVyLmxlbmd0aCgpKSkpO1xuICAgIH1cbiAgICBwcm9qZWN0T24ob3RoZXIpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG90aGVyLm5vcm1hbGl6ZSgpO1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplZC5zY2FsZUJ5KHRoaXMuZG90UHJvZHVjdChub3JtYWxpemVkKSk7XG4gICAgfVxuICAgIGVxdWFsVG8oeyBjb21wb25lbnRzIH0pIHtcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHMuZXZlcnkoKGNvbXBvbmVudCwgaW5kZXgpID0+IGFyZUVxdWFsKGNvbXBvbmVudCwgdGhpcy5jb21wb25lbnRzW2luZGV4XSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZlY3RvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZWdpc3RlcktleVVwSGFuZGxlciA9IGV4cG9ydHMucmVnaXN0ZXJLZXlEb3duSGFuZGxlciA9IGV4cG9ydHMucmVnaXN0ZXJDbGlja0hhbmRsZXIgPSBleHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBleHBvcnRzLnJlZ2lzdGVyUmVzaXplSGFuZGxlciA9IHZvaWQgMDtcbmNvbnN0IG1vdXNlID0ge1xuICAgIHg6IGlubmVyV2lkdGggLyAyLFxuICAgIHk6IGlubmVySGVpZ2h0IC8gMixcbn07XG5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICBtb3VzZS54ID0gZXZlbnQuY2xpZW50WDtcbiAgICBtb3VzZS55ID0gZXZlbnQuY2xpZW50WTtcbn0pO1xuZnVuY3Rpb24gcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICBhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoaGFuZGxlciwgMTAwKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJSZXNpemVIYW5kbGVyID0gcmVnaXN0ZXJSZXNpemVIYW5kbGVyO1xuZnVuY3Rpb24gZ2V0TW91c2VQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbW91c2U7XG59XG5leHBvcnRzLmdldE1vdXNlUG9zaXRpb24gPSBnZXRNb3VzZVBvc2l0aW9uO1xuZnVuY3Rpb24gcmVnaXN0ZXJDbGlja0hhbmRsZXIoaGFuZGxlcikge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlcik7XG59XG5leHBvcnRzLnJlZ2lzdGVyQ2xpY2tIYW5kbGVyID0gcmVnaXN0ZXJDbGlja0hhbmRsZXI7XG5mdW5jdGlvbiByZWdpc3RlcktleURvd25IYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xufVxuZXhwb3J0cy5yZWdpc3RlcktleURvd25IYW5kbGVyID0gcmVnaXN0ZXJLZXlEb3duSGFuZGxlcjtcbmZ1bmN0aW9uIHJlZ2lzdGVyS2V5VXBIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVyKTtcbn1cbmV4cG9ydHMucmVnaXN0ZXJLZXlVcEhhbmRsZXIgPSByZWdpc3RlcktleVVwSGFuZGxlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xubGV0IGZyYW1lQ291bnQgPSAwO1xubGV0IGZwc0ludGVydmFsLCBzdGFydFRpbWUsIG5vdywgdGhlbiwgZWxhcHNlZCwgbG9vcDtcbmZ1bmN0aW9uIGFwcExvb3AoeyBmcHMsIG9uRnJhbWUsIH0pIHtcbiAgICBmcHNJbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG4gICAgdGhlbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICBzdGFydFRpbWUgPSB0aGVuO1xuICAgIGxvb3AgPSBjcmVhdGVMb29wKG9uRnJhbWUpO1xuICAgIGxvb3Aoc3RhcnRUaW1lKTtcbn1cbmV4cG9ydHMuZGVmYXVsdCA9IGFwcExvb3A7XG5mdW5jdGlvbiBjcmVhdGVMb29wKGxvZ2ljKSB7XG4gICAgcmV0dXJuIChsb29wVGltZSkgPT4ge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIG5vdyA9IGxvb3BUaW1lO1xuICAgICAgICBlbGFwc2VkID0gbm93IC0gdGhlbjtcbiAgICAgICAgaWYgKGVsYXBzZWQgPiBmcHNJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChlbGFwc2VkICUgZnBzSW50ZXJ2YWwpO1xuICAgICAgICAgICAgY29uc3Qgc2luY2VTdGFydCA9IG5vdyAtIHN0YXJ0VGltZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRGcHMgPSBNYXRoLnJvdW5kKCgxMDAwIC8gKHNpbmNlU3RhcnQgLyArK2ZyYW1lQ291bnQpKSAqIDEwMCkgLyAxMDA7XG4gICAgICAgICAgICBsb2dpYyh7IGN1cnJlbnRGcHMgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFdpbmRvd1NpemUgPSBleHBvcnRzLmdldERyYXdpbmdDb250ZXh0ID0gZXhwb3J0cy5jbGVhckRyYXdpbmdBcmVhID0gdm9pZCAwO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XG5jYW52YXMud2lkdGggPSBpbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgIGNhbnZhcy53aWR0aCA9IGlubmVyV2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGlubmVySGVpZ2h0O1xufSk7XG5mdW5jdGlvbiBjbGVhckRyYXdpbmdBcmVhKCkge1xuICAgIGNvbnN0IGMgPSBnZXREcmF3aW5nQ29udGV4dCgpO1xuICAgIGMuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5leHBvcnRzLmNsZWFyRHJhd2luZ0FyZWEgPSBjbGVhckRyYXdpbmdBcmVhO1xuZnVuY3Rpb24gZ2V0RHJhd2luZ0NvbnRleHQoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBnZXQgY2FudmFzIGRyYXdpbmcgMmQgY29udGV4dCcpO1xufVxuZXhwb3J0cy5nZXREcmF3aW5nQ29udGV4dCA9IGdldERyYXdpbmdDb250ZXh0O1xuZnVuY3Rpb24gZ2V0V2luZG93U2l6ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBpbm5lckhlaWdodCxcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRXaW5kb3dTaXplID0gZ2V0V2luZG93U2l6ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5kb21SZ2JhID0gdm9pZCAwO1xuZnVuY3Rpb24gemVyb1RvMjU2KCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xufVxuZnVuY3Rpb24gemVyb1RvMSgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKS50b0ZpeGVkKDEpO1xufVxuZnVuY3Rpb24gcmFuZG9tUmdiYSgpIHtcbiAgICByZXR1cm4gYHJnYmEoJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8yNTYoKX0sJHt6ZXJvVG8xKCl9KWA7XG59XG5leHBvcnRzLnJhbmRvbVJnYmEgPSByYW5kb21SZ2JhO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=