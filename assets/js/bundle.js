!function(){function e(t,n,i){function s(o,a){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!a&&u)return u(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var h=n[o]={exports:{}};t[o][0].call(h.exports,function(e){return s(t[o][1][e]||e)},h,h.exports,e,t,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}return e}()({1:[function(e,t,n){function i(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function s(e){return"function"==typeof e}function r(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=i,i.EventEmitter=i,i.prototype._events=void 0,i.prototype._maxListeners=void 0,i.defaultMaxListeners=10,i.prototype.setMaxListeners=function(e){if(!r(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},i.prototype.emit=function(e){var t,n,i,r,u,l;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if((t=arguments[1])instanceof Error)throw t;var h=new Error('Uncaught, unspecified "error" event. ('+t+")");throw h.context=t,h}if(n=this._events[e],a(n))return!1;if(s(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:r=Array.prototype.slice.call(arguments,1),n.apply(this,r)}else if(o(n))for(r=Array.prototype.slice.call(arguments,1),l=n.slice(),i=l.length,u=0;u<i;u++)l[u].apply(this,r);return!0},i.prototype.addListener=function(e,t){var n;if(!s(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,s(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned&&(n=a(this._maxListeners)?i.defaultMaxListeners:this._maxListeners)&&n>0&&this._events[e].length>n&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace()),this},i.prototype.on=i.prototype.addListener,i.prototype.once=function(e,t){function n(){this.removeListener(e,n),i||(i=!0,t.apply(this,arguments))}if(!s(t))throw TypeError("listener must be a function");var i=!1;return n.listener=t,this.on(e,n),this},i.prototype.removeListener=function(e,t){var n,i,r,a;if(!s(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],r=n.length,i=-1,n===t||s(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(n)){for(a=r;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){i=a;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},i.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],s(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},i.prototype.listeners=function(e){return this._events&&this._events[e]?s(this._events[e])?[this._events[e]]:this._events[e].slice():[]},i.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(s(t))return 1;if(t)return t.length}return 0},i.listenerCount=function(e,t){return e.listenerCount(t)}},{}],2:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=e("paper"),a=i(o),u=e("events"),l=i(u),h=e("./tine"),f=i(h),c=function(){function e(t,n,i){s(this,e),this.showTracks=!1,this.center=t,this.radius=n,this.speed=0,this.path=e.createPath(t,n),this.zero=e.createZero(t,n),this.tines=this.createTines(i),this.events=new l.default}return r(e,[{key:"createTines",value:function(e){for(var t=[],n=this.radius/e*2,i=this.radius-n/2,s=0;s<e;s+=1){var r=0+(i-0)/e*(s+1),o=s+1;this.showTracks&&(this.tracks=[],this.tracks.push(new a.default.Path.Circle(this.center,r).strokeColor="white")),t.push(new f.default(s+1,this,r,n,"white",o))}return t}},{key:"onFrame",value:function(e){this.tines.forEach(function(t){return t.onFrame(e)})}},{key:"onZero",value:function(e){this.events.emit("zero",e.id)}},{key:"setSpeed",value:function(e){this.speed=1*e/(2*this.tines.length)}}],[{key:"createPath",value:function(e,t){var n=new a.default.Path.Circle(e,t);return n.fillColor="white",n.opacity=.05,n}},{key:"createZero",value:function(e,t){new a.default.Path.Line(e,e.add(new a.default.Point(t,0))).strokeColor="white"}}]),e}();n.default=c},{"./tine":4,events:1,paper:"paper"}],3:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=e("events"),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=function(){function e(t){var n=this;i(this,e),this.down=!1,this.value=0,this.min=-1,this.max=1,this.snapMargin=.25,this.snapPoints=[{snapTo:0,from:-1*this.snapMargin,to:this.snapMargin}],this.element=t,this.snapElements=this.snapPoints.map(function(e){return n.createSnapElement(e)}),this.snapElements.forEach(function(e){return n.element.appendChild(e)}),this.handle=document.createElement("div"),this.element.appendChild(this.handle),this.handle.setAttribute("class","handle"),this.events=new o.default,this.element.addEventListener("mousedown",this.onMouseDown.bind(this)),document.addEventListener("mousemove",this.onMouseMove.bind(this)),document.addEventListener("mouseup",this.onMouseUp.bind(this)),this.setValue(this.value)}return s(e,[{key:"createSnapElement",value:function(e){var t=document.createElement("div");t.setAttribute("class","snap");var n=this.valueToRatio(e.snapTo);return t.style.left=100*n+"%",t}},{key:"onMouseDown",value:function(e){0===e.button&&(this.down=!0),this.onSlideTo(e.clientX)}},{key:"onMouseMove",value:function(e){this.down&&this.onSlideTo(e.clientX)}},{key:"onMouseUp",value:function(e){0===e.button&&(this.setValue(this.snapValue(this.value)),this.down=!1)}},{key:"onSlideTo",value:function(e){var t=this.element.getBoundingClientRect(),n=Math.min(Math.max(0,e-t.left),t.width),i=n/t.width;this.setValue(this.ratioToValue(i))}},{key:"moveHandle",value:function(e){var t=this.valueToRatio(e);this.handle.style.left=100*t+"%"}},{key:"ratioToValue",value:function(e){return this.min+e*(this.max-this.min)}},{key:"valueToRatio",value:function(e){return(e-this.min)/(this.max-this.min)}},{key:"snapValue",value:function(e){var t=e;return this.snapPoints.forEach(function(e){t>=e.from&&t<=e.to&&(t=e.snapTo)}),t}},{key:"setValue",value:function(e){this.value=e,this.moveHandle(e),this.events.emit("changed",this.value)}}]),e}();n.default=a},{events:1}],4:[function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=e("paper"),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=function(){function e(t,n,s,r,o,a){i(this,e),this.id=t,this.parent=n,this.radius=s,this.size=r,this.fillColor=o,this.speedFactor=a,this.path=e.buildPath(this.size,this.fillColor),this.setAngle(0)}return s(e,[{key:"setAngle",value:function(e){(e>=360||e<0)&&this.onZero(),this.angle=e>=0?e%360:360+e,this.path.position=new o.default.Point(this.radius,0).rotate(this.angle).add(this.parent.center)}},{key:"onFrame",value:function(e){0!==this.parent.speed&&this.setAngle(this.angle+360*e.delta*this.parent.speed*this.speedFactor)}},{key:"onZero",value:function(){this.parent.onZero(this)}}],[{key:"buildPath",value:function(e,t){var n=new o.default.Path.Circle(new o.default.Point(0,0),e/2);return n.fillColor=t,n}}]),e}();n.default=a},{paper:"paper"}],5:[function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var s=e("paper"),r=i(s),o=e("tone"),a=i(o),u=e("./lib/disc"),l=i(u),h=e("./lib/slider"),f=i(h),c=document.getElementById("mainCanvas");r.default.setup(c);for(var v=r.default.view.center,d=Math.min(r.default.view.size.height,r.default.view.size.width)/2,p=new l.default(v,d,48),m=[],y=0;48!==y;y+=1)m.push(a.default.Frequency("A2").transpose(y));var _=new a.default.PolySynth(48,a.default.Synth).toMaster();_.set("envelope",{attack:0,decay:.1,sustain:.3,release:1});var w=[];p.events.on("zero",function(e){w.push(m[e-1])}),new f.default(document.getElementById("speedSlider")).events.on("changed",function(e){p.setSpeed(e)}),r.default.view.onFrame=function(e){w.length=0,p.onFrame(e),_.triggerAttackRelease(w,"8n")},r.default.view.draw()},{"./lib/disc":2,"./lib/slider":3,paper:"paper",tone:"tone"}]},{},[5]);
//# sourceMappingURL=bundle.js.map
