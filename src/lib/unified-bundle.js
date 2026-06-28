var UnifiedRenderer = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all6) => {
    for (var name in all6)
      __defProp(target, name, { get: all6[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/bail/index.js
  function bail(error) {
    if (error) {
      throw error;
    }
  }
  var init_bail = __esm({
    "node_modules/bail/index.js"() {
    }
  });

  // node_modules/extend/index.js
  var require_extend = __commonJS({
    "node_modules/extend/index.js"(exports, module) {
      "use strict";
      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;
      var defineProperty = Object.defineProperty;
      var gOPD = Object.getOwnPropertyDescriptor;
      var isArray = function isArray2(arr) {
        if (typeof Array.isArray === "function") {
          return Array.isArray(arr);
        }
        return toStr.call(arr) === "[object Array]";
      };
      var isPlainObject2 = function isPlainObject3(obj) {
        if (!obj || toStr.call(obj) !== "[object Object]") {
          return false;
        }
        var hasOwnConstructor = hasOwn.call(obj, "constructor");
        var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }
        var key2;
        for (key2 in obj) {
        }
        return typeof key2 === "undefined" || hasOwn.call(obj, key2);
      };
      var setProperty = function setProperty2(target, options) {
        if (defineProperty && options.name === "__proto__") {
          defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true
          });
        } else {
          target[options.name] = options.newValue;
        }
      };
      var getProperty = function getProperty2(obj, name) {
        if (name === "__proto__") {
          if (!hasOwn.call(obj, name)) {
            return void 0;
          } else if (gOPD) {
            return gOPD(obj, name).value;
          }
        }
        return obj[name];
      };
      module.exports = function extend2() {
        var options, name, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          i = 2;
        }
        if (target == null || typeof target !== "object" && typeof target !== "function") {
          target = {};
        }
        for (; i < length; ++i) {
          options = arguments[i];
          if (options != null) {
            for (name in options) {
              src = getProperty(target, name);
              copy = getProperty(options, name);
              if (target !== copy) {
                if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject2(src) ? src : {};
                  }
                  setProperty(target, { name, newValue: extend2(deep, clone, copy) });
                } else if (typeof copy !== "undefined") {
                  setProperty(target, { name, newValue: copy });
                }
              }
            }
          }
        }
        return target;
      };
    }
  });

  // node_modules/devlop/lib/default.js
  function ok() {
  }
  var init_default = __esm({
    "node_modules/devlop/lib/default.js"() {
    }
  });

  // node_modules/is-plain-obj/index.js
  function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
  }
  var init_is_plain_obj = __esm({
    "node_modules/is-plain-obj/index.js"() {
    }
  });

  // node_modules/trough/lib/index.js
  function trough() {
    const fns = [];
    const pipeline = { run, use };
    return pipeline;
    function run(...values) {
      let middlewareIndex = -1;
      const callback = values.pop();
      if (typeof callback !== "function") {
        throw new TypeError("Expected function as last argument, not " + callback);
      }
      next2(null, ...values);
      function next2(error, ...output) {
        const fn = fns[++middlewareIndex];
        let index2 = -1;
        if (error) {
          callback(error);
          return;
        }
        while (++index2 < values.length) {
          if (output[index2] === null || output[index2] === void 0) {
            output[index2] = values[index2];
          }
        }
        values = output;
        if (fn) {
          wrap(fn, next2)(...output);
        } else {
          callback(null, ...output);
        }
      }
    }
    function use(middelware) {
      if (typeof middelware !== "function") {
        throw new TypeError(
          "Expected `middelware` to be a function, not " + middelware
        );
      }
      fns.push(middelware);
      return pipeline;
    }
  }
  function wrap(middleware, callback) {
    let called;
    return wrapped;
    function wrapped(...parameters) {
      const fnExpectsCallback = middleware.length > parameters.length;
      let result;
      if (fnExpectsCallback) {
        parameters.push(done);
      }
      try {
        result = middleware.apply(this, parameters);
      } catch (error) {
        const exception = (
          /** @type {Error} */
          error
        );
        if (fnExpectsCallback && called) {
          throw exception;
        }
        return done(exception);
      }
      if (!fnExpectsCallback) {
        if (result && result.then && typeof result.then === "function") {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }
    function done(error, ...output) {
      if (!called) {
        called = true;
        callback(error, ...output);
      }
    }
    function then(value) {
      done(null, value);
    }
  }
  var init_lib = __esm({
    "node_modules/trough/lib/index.js"() {
    }
  });

  // node_modules/trough/index.js
  var init_trough = __esm({
    "node_modules/trough/index.js"() {
      init_lib();
    }
  });

  // node_modules/unist-util-stringify-position/lib/index.js
  function stringifyPosition(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if ("position" in value || "type" in value) {
      return position(value.position);
    }
    if ("start" in value || "end" in value) {
      return position(value);
    }
    if ("line" in value || "column" in value) {
      return point(value);
    }
    return "";
  }
  function point(point5) {
    return index(point5 && point5.line) + ":" + index(point5 && point5.column);
  }
  function position(pos) {
    return point(pos && pos.start) + "-" + point(pos && pos.end);
  }
  function index(value) {
    return value && typeof value === "number" ? value : 1;
  }
  var init_lib2 = __esm({
    "node_modules/unist-util-stringify-position/lib/index.js"() {
    }
  });

  // node_modules/unist-util-stringify-position/index.js
  var init_unist_util_stringify_position = __esm({
    "node_modules/unist-util-stringify-position/index.js"() {
      init_lib2();
    }
  });

  // node_modules/vfile-message/lib/index.js
  var VFileMessage;
  var init_lib3 = __esm({
    "node_modules/vfile-message/lib/index.js"() {
      init_unist_util_stringify_position();
      VFileMessage = class extends Error {
        /**
         * Create a message for `reason`.
         *
         * > 🪦 **Note**: also has obsolete signatures.
         *
         * @overload
         * @param {string} reason
         * @param {Options | null | undefined} [options]
         * @returns
         *
         * @overload
         * @param {string} reason
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @overload
         * @param {string} reason
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @overload
         * @param {string} reason
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {string | null | undefined} [origin]
         * @returns
         *
         * @param {Error | VFileMessage | string} causeOrReason
         *   Reason for message, should use markdown.
         * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
         *   Configuration (optional).
         * @param {string | null | undefined} [origin]
         *   Place in code where the message originates (example:
         *   `'my-package:my-rule'` or `'my-rule'`).
         * @returns
         *   Instance of `VFileMessage`.
         */
        // eslint-disable-next-line complexity
        constructor(causeOrReason, optionsOrParentOrPlace, origin) {
          super();
          if (typeof optionsOrParentOrPlace === "string") {
            origin = optionsOrParentOrPlace;
            optionsOrParentOrPlace = void 0;
          }
          let reason = "";
          let options = {};
          let legacyCause = false;
          if (optionsOrParentOrPlace) {
            if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
              options = { place: optionsOrParentOrPlace };
            } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
              options = { place: optionsOrParentOrPlace };
            } else if ("type" in optionsOrParentOrPlace) {
              options = {
                ancestors: [optionsOrParentOrPlace],
                place: optionsOrParentOrPlace.position
              };
            } else {
              options = { ...optionsOrParentOrPlace };
            }
          }
          if (typeof causeOrReason === "string") {
            reason = causeOrReason;
          } else if (!options.cause && causeOrReason) {
            legacyCause = true;
            reason = causeOrReason.message;
            options.cause = causeOrReason;
          }
          if (!options.ruleId && !options.source && typeof origin === "string") {
            const index2 = origin.indexOf(":");
            if (index2 === -1) {
              options.ruleId = origin;
            } else {
              options.source = origin.slice(0, index2);
              options.ruleId = origin.slice(index2 + 1);
            }
          }
          if (!options.place && options.ancestors && options.ancestors) {
            const parent = options.ancestors[options.ancestors.length - 1];
            if (parent) {
              options.place = parent.position;
            }
          }
          const start = options.place && "start" in options.place ? options.place.start : options.place;
          this.ancestors = options.ancestors || void 0;
          this.cause = options.cause || void 0;
          this.column = start ? start.column : void 0;
          this.fatal = void 0;
          this.file = "";
          this.message = reason;
          this.line = start ? start.line : void 0;
          this.name = stringifyPosition(options.place) || "1:1";
          this.place = options.place || void 0;
          this.reason = this.message;
          this.ruleId = options.ruleId || void 0;
          this.source = options.source || void 0;
          this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
          this.actual = void 0;
          this.expected = void 0;
          this.note = void 0;
          this.url = void 0;
        }
      };
      VFileMessage.prototype.file = "";
      VFileMessage.prototype.name = "";
      VFileMessage.prototype.reason = "";
      VFileMessage.prototype.message = "";
      VFileMessage.prototype.stack = "";
      VFileMessage.prototype.column = void 0;
      VFileMessage.prototype.line = void 0;
      VFileMessage.prototype.ancestors = void 0;
      VFileMessage.prototype.cause = void 0;
      VFileMessage.prototype.fatal = void 0;
      VFileMessage.prototype.place = void 0;
      VFileMessage.prototype.ruleId = void 0;
      VFileMessage.prototype.source = void 0;
    }
  });

  // node_modules/vfile-message/index.js
  var init_vfile_message = __esm({
    "node_modules/vfile-message/index.js"() {
      init_lib3();
    }
  });

  // node_modules/vfile/lib/minpath.browser.js
  function basename(path2, extname2) {
    if (extname2 !== void 0 && typeof extname2 !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path2);
    let start = 0;
    let end = -1;
    let index2 = path2.length;
    let seenNonSlash;
    if (extname2 === void 0 || extname2.length === 0 || extname2.length > path2.length) {
      while (index2--) {
        if (path2.codePointAt(index2) === 47) {
          if (seenNonSlash) {
            start = index2 + 1;
            break;
          }
        } else if (end < 0) {
          seenNonSlash = true;
          end = index2 + 1;
        }
      }
      return end < 0 ? "" : path2.slice(start, end);
    }
    if (extname2 === path2) {
      return "";
    }
    let firstNonSlashEnd = -1;
    let extnameIndex = extname2.length - 1;
    while (index2--) {
      if (path2.codePointAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd < 0) {
          seenNonSlash = true;
          firstNonSlashEnd = index2 + 1;
        }
        if (extnameIndex > -1) {
          if (path2.codePointAt(index2) === extname2.codePointAt(extnameIndex--)) {
            if (extnameIndex < 0) {
              end = index2;
            }
          } else {
            extnameIndex = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) {
      end = firstNonSlashEnd;
    } else if (end < 0) {
      end = path2.length;
    }
    return path2.slice(start, end);
  }
  function dirname(path2) {
    assertPath(path2);
    if (path2.length === 0) {
      return ".";
    }
    let end = -1;
    let index2 = path2.length;
    let unmatchedSlash;
    while (--index2) {
      if (path2.codePointAt(index2) === 47) {
        if (unmatchedSlash) {
          end = index2;
          break;
        }
      } else if (!unmatchedSlash) {
        unmatchedSlash = true;
      }
    }
    return end < 0 ? path2.codePointAt(0) === 47 ? "/" : "." : end === 1 && path2.codePointAt(0) === 47 ? "//" : path2.slice(0, end);
  }
  function extname(path2) {
    assertPath(path2);
    let index2 = path2.length;
    let end = -1;
    let startPart = 0;
    let startDot = -1;
    let preDotState = 0;
    let unmatchedSlash;
    while (index2--) {
      const code4 = path2.codePointAt(index2);
      if (code4 === 47) {
        if (unmatchedSlash) {
          startPart = index2 + 1;
          break;
        }
        continue;
      }
      if (end < 0) {
        unmatchedSlash = true;
        end = index2 + 1;
      }
      if (code4 === 46) {
        if (startDot < 0) {
          startDot = index2;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
        preDotState = -1;
      }
    }
    if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
    preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path2.slice(startDot, end);
  }
  function join(...segments) {
    let index2 = -1;
    let joined;
    while (++index2 < segments.length) {
      assertPath(segments[index2]);
      if (segments[index2]) {
        joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
      }
    }
    return joined === void 0 ? "." : normalize(joined);
  }
  function normalize(path2) {
    assertPath(path2);
    const absolute = path2.codePointAt(0) === 47;
    let value = normalizeString(path2, !absolute);
    if (value.length === 0 && !absolute) {
      value = ".";
    }
    if (value.length > 0 && path2.codePointAt(path2.length - 1) === 47) {
      value += "/";
    }
    return absolute ? "/" + value : value;
  }
  function normalizeString(path2, allowAboveRoot) {
    let result = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index2 = -1;
    let code4;
    let lastSlashIndex;
    while (++index2 <= path2.length) {
      if (index2 < path2.length) {
        code4 = path2.codePointAt(index2);
      } else if (code4 === 47) {
        break;
      } else {
        code4 = 47;
      }
      if (code4 === 47) {
        if (lastSlash === index2 - 1 || dots === 1) {
        } else if (lastSlash !== index2 - 1 && dots === 2) {
          if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
            if (result.length > 2) {
              lastSlashIndex = result.lastIndexOf("/");
              if (lastSlashIndex !== result.length - 1) {
                if (lastSlashIndex < 0) {
                  result = "";
                  lastSegmentLength = 0;
                } else {
                  result = result.slice(0, lastSlashIndex);
                  lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
                }
                lastSlash = index2;
                dots = 0;
                continue;
              }
            } else if (result.length > 0) {
              result = "";
              lastSegmentLength = 0;
              lastSlash = index2;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            result = result.length > 0 ? result + "/.." : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (result.length > 0) {
            result += "/" + path2.slice(lastSlash + 1, index2);
          } else {
            result = path2.slice(lastSlash + 1, index2);
          }
          lastSegmentLength = index2 - lastSlash - 1;
        }
        lastSlash = index2;
        dots = 0;
      } else if (code4 === 46 && dots > -1) {
        dots++;
      } else {
        dots = -1;
      }
    }
    return result;
  }
  function assertPath(path2) {
    if (typeof path2 !== "string") {
      throw new TypeError(
        "Path must be a string. Received " + JSON.stringify(path2)
      );
    }
  }
  var minpath;
  var init_minpath_browser = __esm({
    "node_modules/vfile/lib/minpath.browser.js"() {
      minpath = { basename, dirname, extname, join, sep: "/" };
    }
  });

  // node_modules/vfile/lib/minproc.browser.js
  function cwd() {
    return "/";
  }
  var minproc;
  var init_minproc_browser = __esm({
    "node_modules/vfile/lib/minproc.browser.js"() {
      minproc = { cwd };
    }
  });

  // node_modules/vfile/lib/minurl.shared.js
  function isUrl(fileUrlOrPath) {
    return Boolean(
      fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && // @ts-expect-error: indexing is fine.
      fileUrlOrPath.auth === void 0
    );
  }
  var init_minurl_shared = __esm({
    "node_modules/vfile/lib/minurl.shared.js"() {
    }
  });

  // node_modules/vfile/lib/minurl.browser.js
  function urlToPath(path2) {
    if (typeof path2 === "string") {
      path2 = new URL(path2);
    } else if (!isUrl(path2)) {
      const error = new TypeError(
        'The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`"
      );
      error.code = "ERR_INVALID_ARG_TYPE";
      throw error;
    }
    if (path2.protocol !== "file:") {
      const error = new TypeError("The URL must be of scheme file");
      error.code = "ERR_INVALID_URL_SCHEME";
      throw error;
    }
    return getPathFromURLPosix(path2);
  }
  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      const error = new TypeError(
        'File URL host must be "localhost" or empty on darwin'
      );
      error.code = "ERR_INVALID_FILE_URL_HOST";
      throw error;
    }
    const pathname = url.pathname;
    let index2 = -1;
    while (++index2 < pathname.length) {
      if (pathname.codePointAt(index2) === 37 && pathname.codePointAt(index2 + 1) === 50) {
        const third = pathname.codePointAt(index2 + 2);
        if (third === 70 || third === 102) {
          const error = new TypeError(
            "File URL path must not include encoded / characters"
          );
          error.code = "ERR_INVALID_FILE_URL_PATH";
          throw error;
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  var init_minurl_browser = __esm({
    "node_modules/vfile/lib/minurl.browser.js"() {
      init_minurl_shared();
      init_minurl_shared();
    }
  });

  // node_modules/vfile/lib/index.js
  function assertPart(part, name) {
    if (part && part.includes(minpath.sep)) {
      throw new Error(
        "`" + name + "` cannot be a path: did not expect `" + minpath.sep + "`"
      );
    }
  }
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error("`" + name + "` cannot be empty");
    }
  }
  function assertPath2(path2, name) {
    if (!path2) {
      throw new Error("Setting `" + name + "` requires `path` to be set too");
    }
  }
  function isUint8Array(value) {
    return Boolean(
      value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
    );
  }
  var order, VFile;
  var init_lib4 = __esm({
    "node_modules/vfile/lib/index.js"() {
      init_vfile_message();
      init_minpath_browser();
      init_minproc_browser();
      init_minurl_browser();
      order = /** @type {const} */
      [
        "history",
        "path",
        "basename",
        "stem",
        "extname",
        "dirname"
      ];
      VFile = class {
        /**
         * Create a new virtual file.
         *
         * `options` is treated as:
         *
         * *   `string` or `Uint8Array` — `{value: options}`
         * *   `URL` — `{path: options}`
         * *   `VFile` — shallow copies its data over to the new file
         * *   `object` — all fields are shallow copied over to the new file
         *
         * Path related fields are set in the following order (least specific to
         * most specific): `history`, `path`, `basename`, `stem`, `extname`,
         * `dirname`.
         *
         * You cannot set `dirname` or `extname` without setting either `history`,
         * `path`, `basename`, or `stem` too.
         *
         * @param {Compatible | null | undefined} [value]
         *   File value.
         * @returns
         *   New instance.
         */
        constructor(value) {
          let options;
          if (!value) {
            options = {};
          } else if (isUrl(value)) {
            options = { path: value };
          } else if (typeof value === "string" || isUint8Array(value)) {
            options = { value };
          } else {
            options = value;
          }
          this.cwd = "cwd" in options ? "" : minproc.cwd();
          this.data = {};
          this.history = [];
          this.messages = [];
          this.value;
          this.map;
          this.result;
          this.stored;
          let index2 = -1;
          while (++index2 < order.length) {
            const field2 = order[index2];
            if (field2 in options && options[field2] !== void 0 && options[field2] !== null) {
              this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
            }
          }
          let field;
          for (field in options) {
            if (!order.includes(field)) {
              this[field] = options[field];
            }
          }
        }
        /**
         * Get the basename (including extname) (example: `'index.min.js'`).
         *
         * @returns {string | undefined}
         *   Basename.
         */
        get basename() {
          return typeof this.path === "string" ? minpath.basename(this.path) : void 0;
        }
        /**
         * Set basename (including extname) (`'index.min.js'`).
         *
         * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
         * on windows).
         * Cannot be nullified (use `file.path = file.dirname` instead).
         *
         * @param {string} basename
         *   Basename.
         * @returns {undefined}
         *   Nothing.
         */
        set basename(basename2) {
          assertNonEmpty(basename2, "basename");
          assertPart(basename2, "basename");
          this.path = minpath.join(this.dirname || "", basename2);
        }
        /**
         * Get the parent path (example: `'~'`).
         *
         * @returns {string | undefined}
         *   Dirname.
         */
        get dirname() {
          return typeof this.path === "string" ? minpath.dirname(this.path) : void 0;
        }
        /**
         * Set the parent path (example: `'~'`).
         *
         * Cannot be set if there’s no `path` yet.
         *
         * @param {string | undefined} dirname
         *   Dirname.
         * @returns {undefined}
         *   Nothing.
         */
        set dirname(dirname2) {
          assertPath2(this.basename, "dirname");
          this.path = minpath.join(dirname2 || "", this.basename);
        }
        /**
         * Get the extname (including dot) (example: `'.js'`).
         *
         * @returns {string | undefined}
         *   Extname.
         */
        get extname() {
          return typeof this.path === "string" ? minpath.extname(this.path) : void 0;
        }
        /**
         * Set the extname (including dot) (example: `'.js'`).
         *
         * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
         * on windows).
         * Cannot be set if there’s no `path` yet.
         *
         * @param {string | undefined} extname
         *   Extname.
         * @returns {undefined}
         *   Nothing.
         */
        set extname(extname2) {
          assertPart(extname2, "extname");
          assertPath2(this.dirname, "extname");
          if (extname2) {
            if (extname2.codePointAt(0) !== 46) {
              throw new Error("`extname` must start with `.`");
            }
            if (extname2.includes(".", 1)) {
              throw new Error("`extname` cannot contain multiple dots");
            }
          }
          this.path = minpath.join(this.dirname, this.stem + (extname2 || ""));
        }
        /**
         * Get the full path (example: `'~/index.min.js'`).
         *
         * @returns {string}
         *   Path.
         */
        get path() {
          return this.history[this.history.length - 1];
        }
        /**
         * Set the full path (example: `'~/index.min.js'`).
         *
         * Cannot be nullified.
         * You can set a file URL (a `URL` object with a `file:` protocol) which will
         * be turned into a path with `url.fileURLToPath`.
         *
         * @param {URL | string} path
         *   Path.
         * @returns {undefined}
         *   Nothing.
         */
        set path(path2) {
          if (isUrl(path2)) {
            path2 = urlToPath(path2);
          }
          assertNonEmpty(path2, "path");
          if (this.path !== path2) {
            this.history.push(path2);
          }
        }
        /**
         * Get the stem (basename w/o extname) (example: `'index.min'`).
         *
         * @returns {string | undefined}
         *   Stem.
         */
        get stem() {
          return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : void 0;
        }
        /**
         * Set the stem (basename w/o extname) (example: `'index.min'`).
         *
         * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
         * on windows).
         * Cannot be nullified (use `file.path = file.dirname` instead).
         *
         * @param {string} stem
         *   Stem.
         * @returns {undefined}
         *   Nothing.
         */
        set stem(stem) {
          assertNonEmpty(stem, "stem");
          assertPart(stem, "stem");
          this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
        }
        // Normal prototypal methods.
        /**
         * Create a fatal message for `reason` associated with the file.
         *
         * The `fatal` field of the message is set to `true` (error; file not usable)
         * and the `file` field is set to the current file path.
         * The message is added to the `messages` field on `file`.
         *
         * > 🪦 **Note**: also has obsolete signatures.
         *
         * @overload
         * @param {string} reason
         * @param {MessageOptions | null | undefined} [options]
         * @returns {never}
         *
         * @overload
         * @param {string} reason
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @overload
         * @param {string} reason
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @overload
         * @param {string} reason
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {string | null | undefined} [origin]
         * @returns {never}
         *
         * @param {Error | VFileMessage | string} causeOrReason
         *   Reason for message, should use markdown.
         * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
         *   Configuration (optional).
         * @param {string | null | undefined} [origin]
         *   Place in code where the message originates (example:
         *   `'my-package:my-rule'` or `'my-rule'`).
         * @returns {never}
         *   Never.
         * @throws {VFileMessage}
         *   Message.
         */
        fail(causeOrReason, optionsOrParentOrPlace, origin) {
          const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
          message.fatal = true;
          throw message;
        }
        /**
         * Create an info message for `reason` associated with the file.
         *
         * The `fatal` field of the message is set to `undefined` (info; change
         * likely not needed) and the `file` field is set to the current file path.
         * The message is added to the `messages` field on `file`.
         *
         * > 🪦 **Note**: also has obsolete signatures.
         *
         * @overload
         * @param {string} reason
         * @param {MessageOptions | null | undefined} [options]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @param {Error | VFileMessage | string} causeOrReason
         *   Reason for message, should use markdown.
         * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
         *   Configuration (optional).
         * @param {string | null | undefined} [origin]
         *   Place in code where the message originates (example:
         *   `'my-package:my-rule'` or `'my-rule'`).
         * @returns {VFileMessage}
         *   Message.
         */
        info(causeOrReason, optionsOrParentOrPlace, origin) {
          const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
          message.fatal = void 0;
          return message;
        }
        /**
         * Create a message for `reason` associated with the file.
         *
         * The `fatal` field of the message is set to `false` (warning; change may be
         * needed) and the `file` field is set to the current file path.
         * The message is added to the `messages` field on `file`.
         *
         * > 🪦 **Note**: also has obsolete signatures.
         *
         * @overload
         * @param {string} reason
         * @param {MessageOptions | null | undefined} [options]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {string} reason
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Node | NodeLike | null | undefined} parent
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {Point | Position | null | undefined} place
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @overload
         * @param {Error | VFileMessage} cause
         * @param {string | null | undefined} [origin]
         * @returns {VFileMessage}
         *
         * @param {Error | VFileMessage | string} causeOrReason
         *   Reason for message, should use markdown.
         * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
         *   Configuration (optional).
         * @param {string | null | undefined} [origin]
         *   Place in code where the message originates (example:
         *   `'my-package:my-rule'` or `'my-rule'`).
         * @returns {VFileMessage}
         *   Message.
         */
        message(causeOrReason, optionsOrParentOrPlace, origin) {
          const message = new VFileMessage(
            // @ts-expect-error: the overloads are fine.
            causeOrReason,
            optionsOrParentOrPlace,
            origin
          );
          if (this.path) {
            message.name = this.path + ":" + message.name;
            message.file = this.path;
          }
          message.fatal = false;
          this.messages.push(message);
          return message;
        }
        /**
         * Serialize the file.
         *
         * > **Note**: which encodings are supported depends on the engine.
         * > For info on Node.js, see:
         * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
         *
         * @param {string | null | undefined} [encoding='utf8']
         *   Character encoding to understand `value` as when it’s a `Uint8Array`
         *   (default: `'utf-8'`).
         * @returns {string}
         *   Serialized file.
         */
        toString(encoding) {
          if (this.value === void 0) {
            return "";
          }
          if (typeof this.value === "string") {
            return this.value;
          }
          const decoder = new TextDecoder(encoding || void 0);
          return decoder.decode(this.value);
        }
      };
    }
  });

  // node_modules/vfile/index.js
  var init_vfile = __esm({
    "node_modules/vfile/index.js"() {
      init_lib4();
    }
  });

  // node_modules/unified/lib/callable-instance.js
  var CallableInstance;
  var init_callable_instance = __esm({
    "node_modules/unified/lib/callable-instance.js"() {
      CallableInstance = /**
       * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
       */
      /** @type {unknown} */
      /**
       * @this {Function}
       * @param {string | symbol} property
       * @returns {(...parameters: Array<unknown>) => unknown}
       */
      (function(property) {
        const self2 = this;
        const constr = self2.constructor;
        const proto2 = (
          /** @type {Record<string | symbol, Function>} */
          // Prototypes do exist.
          // type-coverage:ignore-next-line
          constr.prototype
        );
        const value = proto2[property];
        const apply = function() {
          return value.apply(apply, arguments);
        };
        Object.setPrototypeOf(apply, proto2);
        return apply;
      });
    }
  });

  // node_modules/unified/lib/index.js
  function assertParser(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `parser`");
    }
  }
  function assertCompiler(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `compiler`");
    }
  }
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error(
        "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
      );
    }
  }
  function assertNode(node2) {
    if (!isPlainObject(node2) || typeof node2.type !== "string") {
      throw new TypeError("Expected node, got `" + node2 + "`");
    }
  }
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error(
        "`" + name + "` finished async. Use `" + asyncName + "` instead"
      );
    }
  }
  function vfile(value) {
    return looksLikeAVFile(value) ? value : new VFile(value);
  }
  function looksLikeAVFile(value) {
    return Boolean(
      value && typeof value === "object" && "message" in value && "messages" in value
    );
  }
  function looksLikeAValue(value) {
    return typeof value === "string" || isUint8Array2(value);
  }
  function isUint8Array2(value) {
    return Boolean(
      value && typeof value === "object" && "byteLength" in value && "byteOffset" in value
    );
  }
  var import_extend, own, Processor, unified;
  var init_lib5 = __esm({
    "node_modules/unified/lib/index.js"() {
      init_bail();
      import_extend = __toESM(require_extend(), 1);
      init_default();
      init_is_plain_obj();
      init_trough();
      init_vfile();
      init_callable_instance();
      own = {}.hasOwnProperty;
      Processor = class _Processor extends CallableInstance {
        /**
         * Create a processor.
         */
        constructor() {
          super("copy");
          this.Compiler = void 0;
          this.Parser = void 0;
          this.attachers = [];
          this.compiler = void 0;
          this.freezeIndex = -1;
          this.frozen = void 0;
          this.namespace = {};
          this.parser = void 0;
          this.transformers = trough();
        }
        /**
         * Copy a processor.
         *
         * @deprecated
         *   This is a private internal method and should not be used.
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *   New *unfrozen* processor ({@linkcode Processor}) that is
         *   configured to work the same as its ancestor.
         *   When the descendant processor is configured in the future it does not
         *   affect the ancestral processor.
         */
        copy() {
          const destination = (
            /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
            new _Processor()
          );
          let index2 = -1;
          while (++index2 < this.attachers.length) {
            const attacher = this.attachers[index2];
            destination.use(...attacher);
          }
          destination.data((0, import_extend.default)(true, {}, this.namespace));
          return destination;
        }
        /**
         * Configure the processor with info available to all plugins.
         * Information is stored in an object.
         *
         * Typically, options can be given to a specific plugin, but sometimes it
         * makes sense to have information shared with several plugins.
         * For example, a list of HTML elements that are self-closing, which is
         * needed during all phases.
         *
         * > **Note**: setting information cannot occur on *frozen* processors.
         * > Call the processor first to create a new unfrozen processor.
         *
         * > **Note**: to register custom data in TypeScript, augment the
         * > {@linkcode Data} interface.
         *
         * @example
         *   This example show how to get and set info:
         *
         *   ```js
         *   import {unified} from 'unified'
         *
         *   const processor = unified().data('alpha', 'bravo')
         *
         *   processor.data('alpha') // => 'bravo'
         *
         *   processor.data() // => {alpha: 'bravo'}
         *
         *   processor.data({charlie: 'delta'})
         *
         *   processor.data() // => {charlie: 'delta'}
         *   ```
         *
         * @template {keyof Data} Key
         *
         * @overload
         * @returns {Data}
         *
         * @overload
         * @param {Data} dataset
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *
         * @overload
         * @param {Key} key
         * @returns {Data[Key]}
         *
         * @overload
         * @param {Key} key
         * @param {Data[Key]} value
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *
         * @param {Data | Key} [key]
         *   Key to get or set, or entire dataset to set, or nothing to get the
         *   entire dataset (optional).
         * @param {Data[Key]} [value]
         *   Value to set (optional).
         * @returns {unknown}
         *   The current processor when setting, the value at `key` when getting, or
         *   the entire dataset when getting without key.
         */
        data(key2, value) {
          if (typeof key2 === "string") {
            if (arguments.length === 2) {
              assertUnfrozen("data", this.frozen);
              this.namespace[key2] = value;
              return this;
            }
            return own.call(this.namespace, key2) && this.namespace[key2] || void 0;
          }
          if (key2) {
            assertUnfrozen("data", this.frozen);
            this.namespace = key2;
            return this;
          }
          return this.namespace;
        }
        /**
         * Freeze a processor.
         *
         * Frozen processors are meant to be extended and not to be configured
         * directly.
         *
         * When a processor is frozen it cannot be unfrozen.
         * New processors working the same way can be created by calling the
         * processor.
         *
         * It’s possible to freeze processors explicitly by calling `.freeze()`.
         * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
         * `.stringify()`, `.process()`, or `.processSync()` are called.
         *
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *   The current processor.
         */
        freeze() {
          if (this.frozen) {
            return this;
          }
          const self2 = (
            /** @type {Processor} */
            /** @type {unknown} */
            this
          );
          while (++this.freezeIndex < this.attachers.length) {
            const [attacher, ...options] = this.attachers[this.freezeIndex];
            if (options[0] === false) {
              continue;
            }
            if (options[0] === true) {
              options[0] = void 0;
            }
            const transformer = attacher.call(self2, ...options);
            if (typeof transformer === "function") {
              this.transformers.use(transformer);
            }
          }
          this.frozen = true;
          this.freezeIndex = Number.POSITIVE_INFINITY;
          return this;
        }
        /**
         * Parse text to a syntax tree.
         *
         * > **Note**: `parse` freezes the processor if not already *frozen*.
         *
         * > **Note**: `parse` performs the parse phase, not the run phase or other
         * > phases.
         *
         * @param {Compatible | undefined} [file]
         *   file to parse (optional); typically `string` or `VFile`; any value
         *   accepted as `x` in `new VFile(x)`.
         * @returns {ParseTree extends undefined ? Node : ParseTree}
         *   Syntax tree representing `file`.
         */
        parse(file) {
          this.freeze();
          const realFile = vfile(file);
          const parser = this.parser || this.Parser;
          assertParser("parse", parser);
          return parser(String(realFile), realFile);
        }
        /**
         * Process the given file as configured on the processor.
         *
         * > **Note**: `process` freezes the processor if not already *frozen*.
         *
         * > **Note**: `process` performs the parse, run, and stringify phases.
         *
         * @overload
         * @param {Compatible | undefined} file
         * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
         * @returns {undefined}
         *
         * @overload
         * @param {Compatible | undefined} [file]
         * @returns {Promise<VFileWithOutput<CompileResult>>}
         *
         * @param {Compatible | undefined} [file]
         *   File (optional); typically `string` or `VFile`]; any value accepted as
         *   `x` in `new VFile(x)`.
         * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
         *   Callback (optional).
         * @returns {Promise<VFile> | undefined}
         *   Nothing if `done` is given.
         *   Otherwise a promise, rejected with a fatal error or resolved with the
         *   processed file.
         *
         *   The parsed, transformed, and compiled value is available at
         *   `file.value` (see note).
         *
         *   > **Note**: unified typically compiles by serializing: most
         *   > compilers return `string` (or `Uint8Array`).
         *   > Some compilers, such as the one configured with
         *   > [`rehype-react`][rehype-react], return other values (in this case, a
         *   > React tree).
         *   > If you’re using a compiler that doesn’t serialize, expect different
         *   > result values.
         *   >
         *   > To register custom results in TypeScript, add them to
         *   > {@linkcode CompileResultMap}.
         *
         *   [rehype-react]: https://github.com/rehypejs/rehype-react
         */
        process(file, done) {
          const self2 = this;
          this.freeze();
          assertParser("process", this.parser || this.Parser);
          assertCompiler("process", this.compiler || this.Compiler);
          return done ? executor(void 0, done) : new Promise(executor);
          function executor(resolve, reject) {
            const realFile = vfile(file);
            const parseTree = (
              /** @type {HeadTree extends undefined ? Node : HeadTree} */
              /** @type {unknown} */
              self2.parse(realFile)
            );
            self2.run(parseTree, realFile, function(error, tree, file2) {
              if (error || !tree || !file2) {
                return realDone(error);
              }
              const compileTree = (
                /** @type {CompileTree extends undefined ? Node : CompileTree} */
                /** @type {unknown} */
                tree
              );
              const compileResult = self2.stringify(compileTree, file2);
              if (looksLikeAValue(compileResult)) {
                file2.value = compileResult;
              } else {
                file2.result = compileResult;
              }
              realDone(
                error,
                /** @type {VFileWithOutput<CompileResult>} */
                file2
              );
            });
            function realDone(error, file2) {
              if (error || !file2) {
                reject(error);
              } else if (resolve) {
                resolve(file2);
              } else {
                ok(done, "`done` is defined if `resolve` is not");
                done(void 0, file2);
              }
            }
          }
        }
        /**
         * Process the given file as configured on the processor.
         *
         * An error is thrown if asynchronous transforms are configured.
         *
         * > **Note**: `processSync` freezes the processor if not already *frozen*.
         *
         * > **Note**: `processSync` performs the parse, run, and stringify phases.
         *
         * @param {Compatible | undefined} [file]
         *   File (optional); typically `string` or `VFile`; any value accepted as
         *   `x` in `new VFile(x)`.
         * @returns {VFileWithOutput<CompileResult>}
         *   The processed file.
         *
         *   The parsed, transformed, and compiled value is available at
         *   `file.value` (see note).
         *
         *   > **Note**: unified typically compiles by serializing: most
         *   > compilers return `string` (or `Uint8Array`).
         *   > Some compilers, such as the one configured with
         *   > [`rehype-react`][rehype-react], return other values (in this case, a
         *   > React tree).
         *   > If you’re using a compiler that doesn’t serialize, expect different
         *   > result values.
         *   >
         *   > To register custom results in TypeScript, add them to
         *   > {@linkcode CompileResultMap}.
         *
         *   [rehype-react]: https://github.com/rehypejs/rehype-react
         */
        processSync(file) {
          let complete = false;
          let result;
          this.freeze();
          assertParser("processSync", this.parser || this.Parser);
          assertCompiler("processSync", this.compiler || this.Compiler);
          this.process(file, realDone);
          assertDone("processSync", "process", complete);
          ok(result, "we either bailed on an error or have a tree");
          return result;
          function realDone(error, file2) {
            complete = true;
            bail(error);
            result = file2;
          }
        }
        /**
         * Run *transformers* on a syntax tree.
         *
         * > **Note**: `run` freezes the processor if not already *frozen*.
         *
         * > **Note**: `run` performs the run phase, not other phases.
         *
         * @overload
         * @param {HeadTree extends undefined ? Node : HeadTree} tree
         * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
         * @returns {undefined}
         *
         * @overload
         * @param {HeadTree extends undefined ? Node : HeadTree} tree
         * @param {Compatible | undefined} file
         * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
         * @returns {undefined}
         *
         * @overload
         * @param {HeadTree extends undefined ? Node : HeadTree} tree
         * @param {Compatible | undefined} [file]
         * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
         *
         * @param {HeadTree extends undefined ? Node : HeadTree} tree
         *   Tree to transform and inspect.
         * @param {(
         *   RunCallback<TailTree extends undefined ? Node : TailTree> |
         *   Compatible
         * )} [file]
         *   File associated with `node` (optional); any value accepted as `x` in
         *   `new VFile(x)`.
         * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
         *   Callback (optional).
         * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
         *   Nothing if `done` is given.
         *   Otherwise, a promise rejected with a fatal error or resolved with the
         *   transformed tree.
         */
        run(tree, file, done) {
          assertNode(tree);
          this.freeze();
          const transformers = this.transformers;
          if (!done && typeof file === "function") {
            done = file;
            file = void 0;
          }
          return done ? executor(void 0, done) : new Promise(executor);
          function executor(resolve, reject) {
            ok(
              typeof file !== "function",
              "`file` can\u2019t be a `done` anymore, we checked"
            );
            const realFile = vfile(file);
            transformers.run(tree, realFile, realDone);
            function realDone(error, outputTree, file2) {
              const resultingTree = (
                /** @type {TailTree extends undefined ? Node : TailTree} */
                outputTree || tree
              );
              if (error) {
                reject(error);
              } else if (resolve) {
                resolve(resultingTree);
              } else {
                ok(done, "`done` is defined if `resolve` is not");
                done(void 0, resultingTree, file2);
              }
            }
          }
        }
        /**
         * Run *transformers* on a syntax tree.
         *
         * An error is thrown if asynchronous transforms are configured.
         *
         * > **Note**: `runSync` freezes the processor if not already *frozen*.
         *
         * > **Note**: `runSync` performs the run phase, not other phases.
         *
         * @param {HeadTree extends undefined ? Node : HeadTree} tree
         *   Tree to transform and inspect.
         * @param {Compatible | undefined} [file]
         *   File associated with `node` (optional); any value accepted as `x` in
         *   `new VFile(x)`.
         * @returns {TailTree extends undefined ? Node : TailTree}
         *   Transformed tree.
         */
        runSync(tree, file) {
          let complete = false;
          let result;
          this.run(tree, file, realDone);
          assertDone("runSync", "run", complete);
          ok(result, "we either bailed on an error or have a tree");
          return result;
          function realDone(error, tree2) {
            bail(error);
            result = tree2;
            complete = true;
          }
        }
        /**
         * Compile a syntax tree.
         *
         * > **Note**: `stringify` freezes the processor if not already *frozen*.
         *
         * > **Note**: `stringify` performs the stringify phase, not the run phase
         * > or other phases.
         *
         * @param {CompileTree extends undefined ? Node : CompileTree} tree
         *   Tree to compile.
         * @param {Compatible | undefined} [file]
         *   File associated with `node` (optional); any value accepted as `x` in
         *   `new VFile(x)`.
         * @returns {CompileResult extends undefined ? Value : CompileResult}
         *   Textual representation of the tree (see note).
         *
         *   > **Note**: unified typically compiles by serializing: most compilers
         *   > return `string` (or `Uint8Array`).
         *   > Some compilers, such as the one configured with
         *   > [`rehype-react`][rehype-react], return other values (in this case, a
         *   > React tree).
         *   > If you’re using a compiler that doesn’t serialize, expect different
         *   > result values.
         *   >
         *   > To register custom results in TypeScript, add them to
         *   > {@linkcode CompileResultMap}.
         *
         *   [rehype-react]: https://github.com/rehypejs/rehype-react
         */
        stringify(tree, file) {
          this.freeze();
          const realFile = vfile(file);
          const compiler2 = this.compiler || this.Compiler;
          assertCompiler("stringify", compiler2);
          assertNode(tree);
          return compiler2(tree, realFile);
        }
        /**
         * Configure the processor to use a plugin, a list of usable values, or a
         * preset.
         *
         * If the processor is already using a plugin, the previous plugin
         * configuration is changed based on the options that are passed in.
         * In other words, the plugin is not added a second time.
         *
         * > **Note**: `use` cannot be called on *frozen* processors.
         * > Call the processor first to create a new unfrozen processor.
         *
         * @example
         *   There are many ways to pass plugins to `.use()`.
         *   This example gives an overview:
         *
         *   ```js
         *   import {unified} from 'unified'
         *
         *   unified()
         *     // Plugin with options:
         *     .use(pluginA, {x: true, y: true})
         *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
         *     .use(pluginA, {y: false, z: true})
         *     // Plugins:
         *     .use([pluginB, pluginC])
         *     // Two plugins, the second with options:
         *     .use([pluginD, [pluginE, {}]])
         *     // Preset with plugins and settings:
         *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
         *     // Settings only:
         *     .use({settings: {position: false}})
         *   ```
         *
         * @template {Array<unknown>} [Parameters=[]]
         * @template {Node | string | undefined} [Input=undefined]
         * @template [Output=Input]
         *
         * @overload
         * @param {Preset | null | undefined} [preset]
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *
         * @overload
         * @param {PluggableList} list
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *
         * @overload
         * @param {Plugin<Parameters, Input, Output>} plugin
         * @param {...(Parameters | [boolean])} parameters
         * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
         *
         * @param {PluggableList | Plugin | Preset | null | undefined} value
         *   Usable value.
         * @param {...unknown} parameters
         *   Parameters, when a plugin is given as a usable value.
         * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
         *   Current processor.
         */
        use(value, ...parameters) {
          const attachers = this.attachers;
          const namespace = this.namespace;
          assertUnfrozen("use", this.frozen);
          if (value === null || value === void 0) {
          } else if (typeof value === "function") {
            addPlugin(value, parameters);
          } else if (typeof value === "object") {
            if (Array.isArray(value)) {
              addList(value);
            } else {
              addPreset(value);
            }
          } else {
            throw new TypeError("Expected usable value, not `" + value + "`");
          }
          return this;
          function add(value2) {
            if (typeof value2 === "function") {
              addPlugin(value2, []);
            } else if (typeof value2 === "object") {
              if (Array.isArray(value2)) {
                const [plugin, ...parameters2] = (
                  /** @type {PluginTuple<Array<unknown>>} */
                  value2
                );
                addPlugin(plugin, parameters2);
              } else {
                addPreset(value2);
              }
            } else {
              throw new TypeError("Expected usable value, not `" + value2 + "`");
            }
          }
          function addPreset(result) {
            if (!("plugins" in result) && !("settings" in result)) {
              throw new Error(
                "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
              );
            }
            addList(result.plugins);
            if (result.settings) {
              namespace.settings = (0, import_extend.default)(true, namespace.settings, result.settings);
            }
          }
          function addList(plugins) {
            let index2 = -1;
            if (plugins === null || plugins === void 0) {
            } else if (Array.isArray(plugins)) {
              while (++index2 < plugins.length) {
                const thing = plugins[index2];
                add(thing);
              }
            } else {
              throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
            }
          }
          function addPlugin(plugin, parameters2) {
            let index2 = -1;
            let entryIndex = -1;
            while (++index2 < attachers.length) {
              if (attachers[index2][0] === plugin) {
                entryIndex = index2;
                break;
              }
            }
            if (entryIndex === -1) {
              attachers.push([plugin, ...parameters2]);
            } else if (parameters2.length > 0) {
              let [primary, ...rest] = parameters2;
              const currentPrimary = attachers[entryIndex][1];
              if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
                primary = (0, import_extend.default)(true, currentPrimary, primary);
              }
              attachers[entryIndex] = [plugin, primary, ...rest];
            }
          }
        }
      };
      unified = new Processor().freeze();
    }
  });

  // node_modules/unified/index.js
  var unified_exports = {};
  __export(unified_exports, {
    unified: () => unified
  });
  var init_unified = __esm({
    "node_modules/unified/index.js"() {
      init_lib5();
    }
  });

  // node_modules/mdast-util-to-string/lib/index.js
  function toString(value, options) {
    const settings = options || emptyOptions;
    const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
  }
  function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
      if ("value" in value) {
        return value.type === "html" && !includeHtml ? "" : value.value;
      }
      if (includeImageAlt && "alt" in value && value.alt) {
        return value.alt;
      }
      if ("children" in value) {
        return all(value.children, includeImageAlt, includeHtml);
      }
    }
    if (Array.isArray(value)) {
      return all(value, includeImageAlt, includeHtml);
    }
    return "";
  }
  function all(values, includeImageAlt, includeHtml) {
    const result = [];
    let index2 = -1;
    while (++index2 < values.length) {
      result[index2] = one(values[index2], includeImageAlt, includeHtml);
    }
    return result.join("");
  }
  function node(value) {
    return Boolean(value && typeof value === "object");
  }
  var emptyOptions;
  var init_lib6 = __esm({
    "node_modules/mdast-util-to-string/lib/index.js"() {
      emptyOptions = {};
    }
  });

  // node_modules/mdast-util-to-string/index.js
  var init_mdast_util_to_string = __esm({
    "node_modules/mdast-util-to-string/index.js"() {
      init_lib6();
    }
  });

  // node_modules/decode-named-character-reference/index.dom.js
  function decodeNamedCharacterReference(value) {
    const characterReference2 = "&" + value + ";";
    element.innerHTML = characterReference2;
    const character = element.textContent;
    if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") {
      return false;
    }
    return character === characterReference2 ? false : character;
  }
  var element;
  var init_index_dom = __esm({
    "node_modules/decode-named-character-reference/index.dom.js"() {
      element = document.createElement("i");
    }
  });

  // node_modules/micromark-util-chunked/index.js
  function splice(list4, start, remove, items) {
    const end = list4.length;
    let chunkStart = 0;
    let parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < 1e4) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      list4.splice(...parameters);
    } else {
      if (remove) list4.splice(start, remove);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + 1e4);
        parameters.unshift(start, 0);
        list4.splice(...parameters);
        chunkStart += 1e4;
        start += 1e4;
      }
    }
  }
  function push(list4, items) {
    if (list4.length > 0) {
      splice(list4, list4.length, 0, items);
      return list4;
    }
    return items;
  }
  var init_micromark_util_chunked = __esm({
    "node_modules/micromark-util-chunked/index.js"() {
    }
  });

  // node_modules/micromark-util-combine-extensions/index.js
  function combineExtensions(extensions) {
    const all6 = {};
    let index2 = -1;
    while (++index2 < extensions.length) {
      syntaxExtension(all6, extensions[index2]);
    }
    return all6;
  }
  function syntaxExtension(all6, extension2) {
    let hook;
    for (hook in extension2) {
      const maybe = hasOwnProperty.call(all6, hook) ? all6[hook] : void 0;
      const left = maybe || (all6[hook] = {});
      const right = extension2[hook];
      let code4;
      if (right) {
        for (code4 in right) {
          if (!hasOwnProperty.call(left, code4)) left[code4] = [];
          const value = right[code4];
          constructs(
            // @ts-expect-error Looks like a list.
            left[code4],
            Array.isArray(value) ? value : value ? [value] : []
          );
        }
      }
    }
  }
  function constructs(existing, list4) {
    let index2 = -1;
    const before = [];
    while (++index2 < list4.length) {
      ;
      (list4[index2].add === "after" ? existing : before).push(list4[index2]);
    }
    splice(existing, 0, 0, before);
  }
  var hasOwnProperty;
  var init_micromark_util_combine_extensions = __esm({
    "node_modules/micromark-util-combine-extensions/index.js"() {
      init_micromark_util_chunked();
      hasOwnProperty = {}.hasOwnProperty;
    }
  });

  // node_modules/micromark-util-decode-numeric-character-reference/index.js
  function decodeNumericCharacterReference(value, base) {
    const code4 = Number.parseInt(value, base);
    if (
      // C0 except for HT, LF, FF, CR, space.
      code4 < 9 || code4 === 11 || code4 > 13 && code4 < 32 || // Control character (DEL) of C0, and C1 controls.
      code4 > 126 && code4 < 160 || // Lone high surrogates and low surrogates.
      code4 > 55295 && code4 < 57344 || // Noncharacters.
      code4 > 64975 && code4 < 65008 || /* eslint-disable no-bitwise */
      (code4 & 65535) === 65535 || (code4 & 65535) === 65534 || /* eslint-enable no-bitwise */
      // Out of range
      code4 > 1114111
    ) {
      return "\uFFFD";
    }
    return String.fromCodePoint(code4);
  }
  var init_micromark_util_decode_numeric_character_reference = __esm({
    "node_modules/micromark-util-decode-numeric-character-reference/index.js"() {
    }
  });

  // node_modules/micromark-util-normalize-identifier/index.js
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  var init_micromark_util_normalize_identifier = __esm({
    "node_modules/micromark-util-normalize-identifier/index.js"() {
    }
  });

  // node_modules/micromark-util-character/index.js
  function asciiControl(code4) {
    return (
      // Special whitespace codes (which have negative values), C0 and Control
      // character DEL
      code4 !== null && (code4 < 32 || code4 === 127)
    );
  }
  function markdownLineEnding(code4) {
    return code4 !== null && code4 < -2;
  }
  function markdownLineEndingOrSpace(code4) {
    return code4 !== null && (code4 < 0 || code4 === 32);
  }
  function markdownSpace(code4) {
    return code4 === -2 || code4 === -1 || code4 === 32;
  }
  function regexCheck(regex) {
    return check;
    function check(code4) {
      return code4 !== null && code4 > -1 && regex.test(String.fromCharCode(code4));
    }
  }
  var asciiAlpha, asciiAlphanumeric, asciiAtext, asciiDigit, asciiHexDigit, asciiPunctuation, unicodePunctuation, unicodeWhitespace;
  var init_micromark_util_character = __esm({
    "node_modules/micromark-util-character/index.js"() {
      asciiAlpha = regexCheck(/[A-Za-z]/);
      asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
      asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
      asciiDigit = regexCheck(/\d/);
      asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
      asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
      unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
      unicodeWhitespace = regexCheck(/\s/);
    }
  });

  // node_modules/micromark-util-sanitize-uri/index.js
  function normalizeUri(value) {
    const result = [];
    let index2 = -1;
    let start = 0;
    let skip = 0;
    while (++index2 < value.length) {
      const code4 = value.charCodeAt(index2);
      let replace2 = "";
      if (code4 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
        skip = 2;
      } else if (code4 < 128) {
        if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code4))) {
          replace2 = String.fromCharCode(code4);
        }
      } else if (code4 > 55295 && code4 < 57344) {
        const next2 = value.charCodeAt(index2 + 1);
        if (code4 < 56320 && next2 > 56319 && next2 < 57344) {
          replace2 = String.fromCharCode(code4, next2);
          skip = 1;
        } else {
          replace2 = "\uFFFD";
        }
      } else {
        replace2 = String.fromCharCode(code4);
      }
      if (replace2) {
        result.push(value.slice(start, index2), encodeURIComponent(replace2));
        start = index2 + skip + 1;
        replace2 = "";
      }
      if (skip) {
        index2 += skip;
        skip = 0;
      }
    }
    return result.join("") + value.slice(start);
  }
  var init_micromark_util_sanitize_uri = __esm({
    "node_modules/micromark-util-sanitize-uri/index.js"() {
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-factory-space/index.js
  function factorySpace(effects, ok3, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    function start(code4) {
      if (markdownSpace(code4)) {
        effects.enter(type);
        return prefix(code4);
      }
      return ok3(code4);
    }
    function prefix(code4) {
      if (markdownSpace(code4) && size++ < limit) {
        effects.consume(code4);
        return prefix;
      }
      effects.exit(type);
      return ok3(code4);
    }
  }
  var init_micromark_factory_space = __esm({
    "node_modules/micromark-factory-space/index.js"() {
      init_micromark_util_character();
    }
  });

  // node_modules/micromark/lib/initialize/content.js
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    let previous3;
    return contentStart;
    function afterContentStartConstruct(code4) {
      if (code4 === null) {
        effects.consume(code4);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return factorySpace(effects, contentStart, "linePrefix");
    }
    function paragraphInitial(code4) {
      effects.enter("paragraph");
      return lineStart(code4);
    }
    function lineStart(code4) {
      const token = effects.enter("chunkText", {
        contentType: "text",
        previous: previous3
      });
      if (previous3) {
        previous3.next = token;
      }
      previous3 = token;
      return data(code4);
    }
    function data(code4) {
      if (code4 === null) {
        effects.exit("chunkText");
        effects.exit("paragraph");
        effects.consume(code4);
        return;
      }
      if (markdownLineEnding(code4)) {
        effects.consume(code4);
        effects.exit("chunkText");
        return lineStart;
      }
      effects.consume(code4);
      return data;
    }
  }
  var content;
  var init_content = __esm({
    "node_modules/micromark/lib/initialize/content.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      content = {
        tokenize: initializeContent
      };
    }
  });

  // node_modules/micromark/lib/initialize/document.js
  function initializeDocument(effects) {
    const self2 = this;
    const stack = [];
    let continued = 0;
    let childFlow;
    let childToken;
    let lineStartOffset;
    return start;
    function start(code4) {
      if (continued < stack.length) {
        const item = stack[continued];
        self2.containerState = item[1];
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code4);
      }
      return checkNewContainers(code4);
    }
    function documentContinue(code4) {
      continued++;
      if (self2.containerState._closeFlow) {
        self2.containerState._closeFlow = void 0;
        if (childFlow) {
          closeFlow();
        }
        const indexBeforeExits = self2.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let point5;
        while (indexBeforeFlow--) {
          if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
            point5 = self2.events[indexBeforeFlow][1].end;
            break;
          }
        }
        exitContainers(continued);
        let index2 = indexBeforeExits;
        while (index2 < self2.events.length) {
          self2.events[index2][1].end = {
            ...point5
          };
          index2++;
        }
        splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
        self2.events.length = index2;
        return checkNewContainers(code4);
      }
      return start(code4);
    }
    function checkNewContainers(code4) {
      if (continued === stack.length) {
        if (!childFlow) {
          return documentContinued(code4);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code4);
        }
        self2.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }
      self2.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code4);
    }
    function thereIsANewContainer(code4) {
      if (childFlow) closeFlow();
      exitContainers(continued);
      return documentContinued(code4);
    }
    function thereIsNoNewContainer(code4) {
      self2.parser.lazy[self2.now().line] = continued !== stack.length;
      lineStartOffset = self2.now().offset;
      return flowStart(code4);
    }
    function documentContinued(code4) {
      self2.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code4);
    }
    function containerContinue(code4) {
      continued++;
      stack.push([self2.currentConstruct, self2.containerState]);
      return documentContinued(code4);
    }
    function flowStart(code4) {
      if (code4 === null) {
        if (childFlow) closeFlow();
        exitContainers(0);
        effects.consume(code4);
        return;
      }
      childFlow = childFlow || self2.parser.flow(self2.now());
      effects.enter("chunkFlow", {
        _tokenizer: childFlow,
        contentType: "flow",
        previous: childToken
      });
      return flowContinue(code4);
    }
    function flowContinue(code4) {
      if (code4 === null) {
        writeToChild(effects.exit("chunkFlow"), true);
        exitContainers(0);
        effects.consume(code4);
        return;
      }
      if (markdownLineEnding(code4)) {
        effects.consume(code4);
        writeToChild(effects.exit("chunkFlow"));
        continued = 0;
        self2.interrupt = void 0;
        return start;
      }
      effects.consume(code4);
      return flowContinue;
    }
    function writeToChild(token, endOfFile) {
      const stream = self2.sliceStream(token);
      if (endOfFile) stream.push(null);
      token.previous = childToken;
      if (childToken) childToken.next = token;
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);
      if (self2.parser.lazy[token.start.line]) {
        let index2 = childFlow.events.length;
        while (index2--) {
          if (
            // The token starts before the line ending…
            childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
            (!childFlow.events[index2][1].end || // …or ends after it.
            childFlow.events[index2][1].end.offset > lineStartOffset)
          ) {
            return;
          }
        }
        const indexBeforeExits = self2.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let seen;
        let point5;
        while (indexBeforeFlow--) {
          if (self2.events[indexBeforeFlow][0] === "exit" && self2.events[indexBeforeFlow][1].type === "chunkFlow") {
            if (seen) {
              point5 = self2.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        exitContainers(continued);
        index2 = indexBeforeExits;
        while (index2 < self2.events.length) {
          self2.events[index2][1].end = {
            ...point5
          };
          index2++;
        }
        splice(self2.events, indexBeforeFlow + 1, 0, self2.events.slice(indexBeforeExits));
        self2.events.length = index2;
      }
    }
    function exitContainers(size) {
      let index2 = stack.length;
      while (index2-- > size) {
        const entry = stack[index2];
        self2.containerState = entry[1];
        entry[0].exit.call(self2, effects);
      }
      stack.length = size;
    }
    function closeFlow() {
      childFlow.write([null]);
      childToken = void 0;
      childFlow = void 0;
      self2.containerState._closeFlow = void 0;
    }
  }
  function tokenizeContainer(effects, ok3, nok) {
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok3, nok), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
  }
  var document2, containerConstruct;
  var init_document = __esm({
    "node_modules/micromark/lib/initialize/document.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_chunked();
      document2 = {
        tokenize: initializeDocument
      };
      containerConstruct = {
        tokenize: tokenizeContainer
      };
    }
  });

  // node_modules/micromark-util-classify-character/index.js
  function classifyCharacter(code4) {
    if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
      return 1;
    }
    if (unicodePunctuation(code4)) {
      return 2;
    }
  }
  var init_micromark_util_classify_character = __esm({
    "node_modules/micromark-util-classify-character/index.js"() {
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-util-resolve-all/index.js
  function resolveAll(constructs2, events, context) {
    const called = [];
    let index2 = -1;
    while (++index2 < constructs2.length) {
      const resolve = constructs2[index2].resolveAll;
      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }
  var init_micromark_util_resolve_all = __esm({
    "node_modules/micromark-util-resolve-all/index.js"() {
    }
  });

  // node_modules/micromark-core-commonmark/lib/attention.js
  function resolveAllAttention(events, context) {
    let index2 = -1;
    let open;
    let group;
    let text9;
    let openingSequence;
    let closingSequence;
    let use;
    let nextEvents;
    let offset;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
        open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
            const start = {
              ...events[open][1].end
            };
            const end = {
              ...events[index2][1].start
            };
            movePoint(start, -use);
            movePoint(end, use);
            openingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start,
              end: {
                ...events[open][1].end
              }
            };
            closingSequence = {
              type: use > 1 ? "strongSequence" : "emphasisSequence",
              start: {
                ...events[index2][1].start
              },
              end
            };
            text9 = {
              type: use > 1 ? "strongText" : "emphasisText",
              start: {
                ...events[open][1].end
              },
              end: {
                ...events[index2][1].start
              }
            };
            group = {
              type: use > 1 ? "strong" : "emphasis",
              start: {
                ...openingSequence.start
              },
              end: {
                ...closingSequence.end
              }
            };
            events[open][1].end = {
              ...openingSequence.start
            };
            events[index2][1].start = {
              ...closingSequence.end
            };
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [["enter", events[open][1], context], ["exit", events[open][1], context]]);
            }
            nextEvents = push(nextEvents, [["enter", group, context], ["enter", openingSequence, context], ["exit", openingSequence, context], ["enter", text9, context]]);
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index2), context));
            nextEvents = push(nextEvents, [["exit", text9, context], ["enter", closingSequence, context], ["exit", closingSequence, context], ["exit", group, context]]);
            if (events[index2][1].end.offset - events[index2][1].start.offset) {
              offset = 2;
              nextEvents = push(nextEvents, [["enter", events[index2][1], context], ["exit", events[index2][1], context]]);
            } else {
              offset = 0;
            }
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "attentionSequence") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok3) {
    const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
    const previous3 = this.previous;
    const before = classifyCharacter(previous3);
    let marker;
    return start;
    function start(code4) {
      marker = code4;
      effects.enter("attentionSequence");
      return inside(code4);
    }
    function inside(code4) {
      if (code4 === marker) {
        effects.consume(code4);
        return inside;
      }
      const token = effects.exit("attentionSequence");
      const after = classifyCharacter(code4);
      const open = !after || after === 2 && before || attentionMarkers2.includes(code4);
      const close = !before || before === 2 && after || attentionMarkers2.includes(previous3);
      token._open = Boolean(marker === 42 ? open : open && (before || !close));
      token._close = Boolean(marker === 42 ? close : close && (after || !open));
      return ok3(code4);
    }
  }
  function movePoint(point5, offset) {
    point5.column += offset;
    point5.offset += offset;
    point5._bufferIndex += offset;
  }
  var attention;
  var init_attention = __esm({
    "node_modules/micromark-core-commonmark/lib/attention.js"() {
      init_micromark_util_chunked();
      init_micromark_util_classify_character();
      init_micromark_util_resolve_all();
      attention = {
        name: "attention",
        resolveAll: resolveAllAttention,
        tokenize: tokenizeAttention
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/autolink.js
  function tokenizeAutolink(effects, ok3, nok) {
    let size = 0;
    return start;
    function start(code4) {
      effects.enter("autolink");
      effects.enter("autolinkMarker");
      effects.consume(code4);
      effects.exit("autolinkMarker");
      effects.enter("autolinkProtocol");
      return open;
    }
    function open(code4) {
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        return schemeOrEmailAtext;
      }
      if (code4 === 64) {
        return nok(code4);
      }
      return emailAtext(code4);
    }
    function schemeOrEmailAtext(code4) {
      if (code4 === 43 || code4 === 45 || code4 === 46 || asciiAlphanumeric(code4)) {
        size = 1;
        return schemeInsideOrEmailAtext(code4);
      }
      return emailAtext(code4);
    }
    function schemeInsideOrEmailAtext(code4) {
      if (code4 === 58) {
        effects.consume(code4);
        size = 0;
        return urlInside;
      }
      if ((code4 === 43 || code4 === 45 || code4 === 46 || asciiAlphanumeric(code4)) && size++ < 32) {
        effects.consume(code4);
        return schemeInsideOrEmailAtext;
      }
      size = 0;
      return emailAtext(code4);
    }
    function urlInside(code4) {
      if (code4 === 62) {
        effects.exit("autolinkProtocol");
        effects.enter("autolinkMarker");
        effects.consume(code4);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok3;
      }
      if (code4 === null || code4 === 32 || code4 === 60 || asciiControl(code4)) {
        return nok(code4);
      }
      effects.consume(code4);
      return urlInside;
    }
    function emailAtext(code4) {
      if (code4 === 64) {
        effects.consume(code4);
        return emailAtSignOrDot;
      }
      if (asciiAtext(code4)) {
        effects.consume(code4);
        return emailAtext;
      }
      return nok(code4);
    }
    function emailAtSignOrDot(code4) {
      return asciiAlphanumeric(code4) ? emailLabel(code4) : nok(code4);
    }
    function emailLabel(code4) {
      if (code4 === 46) {
        effects.consume(code4);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code4 === 62) {
        effects.exit("autolinkProtocol").type = "autolinkEmail";
        effects.enter("autolinkMarker");
        effects.consume(code4);
        effects.exit("autolinkMarker");
        effects.exit("autolink");
        return ok3;
      }
      return emailValue(code4);
    }
    function emailValue(code4) {
      if ((code4 === 45 || asciiAlphanumeric(code4)) && size++ < 63) {
        const next2 = code4 === 45 ? emailValue : emailLabel;
        effects.consume(code4);
        return next2;
      }
      return nok(code4);
    }
  }
  var autolink;
  var init_autolink = __esm({
    "node_modules/micromark-core-commonmark/lib/autolink.js"() {
      init_micromark_util_character();
      autolink = {
        name: "autolink",
        tokenize: tokenizeAutolink
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/blank-line.js
  function tokenizeBlankLine(effects, ok3, nok) {
    return start;
    function start(code4) {
      return markdownSpace(code4) ? factorySpace(effects, after, "linePrefix")(code4) : after(code4);
    }
    function after(code4) {
      return code4 === null || markdownLineEnding(code4) ? ok3(code4) : nok(code4);
    }
  }
  var blankLine;
  var init_blank_line = __esm({
    "node_modules/micromark-core-commonmark/lib/blank-line.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      blankLine = {
        partial: true,
        tokenize: tokenizeBlankLine
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/block-quote.js
  function tokenizeBlockQuoteStart(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      if (code4 === 62) {
        const state = self2.containerState;
        if (!state.open) {
          effects.enter("blockQuote", {
            _container: true
          });
          state.open = true;
        }
        effects.enter("blockQuotePrefix");
        effects.enter("blockQuoteMarker");
        effects.consume(code4);
        effects.exit("blockQuoteMarker");
        return after;
      }
      return nok(code4);
    }
    function after(code4) {
      if (markdownSpace(code4)) {
        effects.enter("blockQuotePrefixWhitespace");
        effects.consume(code4);
        effects.exit("blockQuotePrefixWhitespace");
        effects.exit("blockQuotePrefix");
        return ok3;
      }
      effects.exit("blockQuotePrefix");
      return ok3(code4);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok3, nok) {
    const self2 = this;
    return contStart;
    function contStart(code4) {
      if (markdownSpace(code4)) {
        return factorySpace(effects, contBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
      }
      return contBefore(code4);
    }
    function contBefore(code4) {
      return effects.attempt(blockQuote, ok3, nok)(code4);
    }
  }
  function exit(effects) {
    effects.exit("blockQuote");
  }
  var blockQuote;
  var init_block_quote = __esm({
    "node_modules/micromark-core-commonmark/lib/block-quote.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      blockQuote = {
        continuation: {
          tokenize: tokenizeBlockQuoteContinuation
        },
        exit,
        name: "blockQuote",
        tokenize: tokenizeBlockQuoteStart
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/character-escape.js
  function tokenizeCharacterEscape(effects, ok3, nok) {
    return start;
    function start(code4) {
      effects.enter("characterEscape");
      effects.enter("escapeMarker");
      effects.consume(code4);
      effects.exit("escapeMarker");
      return inside;
    }
    function inside(code4) {
      if (asciiPunctuation(code4)) {
        effects.enter("characterEscapeValue");
        effects.consume(code4);
        effects.exit("characterEscapeValue");
        effects.exit("characterEscape");
        return ok3;
      }
      return nok(code4);
    }
  }
  var characterEscape;
  var init_character_escape = __esm({
    "node_modules/micromark-core-commonmark/lib/character-escape.js"() {
      init_micromark_util_character();
      characterEscape = {
        name: "characterEscape",
        tokenize: tokenizeCharacterEscape
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/character-reference.js
  function tokenizeCharacterReference(effects, ok3, nok) {
    const self2 = this;
    let size = 0;
    let max;
    let test;
    return start;
    function start(code4) {
      effects.enter("characterReference");
      effects.enter("characterReferenceMarker");
      effects.consume(code4);
      effects.exit("characterReferenceMarker");
      return open;
    }
    function open(code4) {
      if (code4 === 35) {
        effects.enter("characterReferenceMarkerNumeric");
        effects.consume(code4);
        effects.exit("characterReferenceMarkerNumeric");
        return numeric;
      }
      effects.enter("characterReferenceValue");
      max = 31;
      test = asciiAlphanumeric;
      return value(code4);
    }
    function numeric(code4) {
      if (code4 === 88 || code4 === 120) {
        effects.enter("characterReferenceMarkerHexadecimal");
        effects.consume(code4);
        effects.exit("characterReferenceMarkerHexadecimal");
        effects.enter("characterReferenceValue");
        max = 6;
        test = asciiHexDigit;
        return value;
      }
      effects.enter("characterReferenceValue");
      max = 7;
      test = asciiDigit;
      return value(code4);
    }
    function value(code4) {
      if (code4 === 59 && size) {
        const token = effects.exit("characterReferenceValue");
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self2.sliceSerialize(token))) {
          return nok(code4);
        }
        effects.enter("characterReferenceMarker");
        effects.consume(code4);
        effects.exit("characterReferenceMarker");
        effects.exit("characterReference");
        return ok3;
      }
      if (test(code4) && size++ < max) {
        effects.consume(code4);
        return value;
      }
      return nok(code4);
    }
  }
  var characterReference;
  var init_character_reference = __esm({
    "node_modules/micromark-core-commonmark/lib/character-reference.js"() {
      init_index_dom();
      init_micromark_util_character();
      characterReference = {
        name: "characterReference",
        tokenize: tokenizeCharacterReference
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/code-fenced.js
  function tokenizeCodeFenced(effects, ok3, nok) {
    const self2 = this;
    const closeStart = {
      partial: true,
      tokenize: tokenizeCloseStart
    };
    let initialPrefix = 0;
    let sizeOpen = 0;
    let marker;
    return start;
    function start(code4) {
      return beforeSequenceOpen(code4);
    }
    function beforeSequenceOpen(code4) {
      const tail = self2.events[self2.events.length - 1];
      initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
      marker = code4;
      effects.enter("codeFenced");
      effects.enter("codeFencedFence");
      effects.enter("codeFencedFenceSequence");
      return sequenceOpen(code4);
    }
    function sequenceOpen(code4) {
      if (code4 === marker) {
        sizeOpen++;
        effects.consume(code4);
        return sequenceOpen;
      }
      if (sizeOpen < 3) {
        return nok(code4);
      }
      effects.exit("codeFencedFenceSequence");
      return markdownSpace(code4) ? factorySpace(effects, infoBefore, "whitespace")(code4) : infoBefore(code4);
    }
    function infoBefore(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("codeFencedFence");
        return self2.interrupt ? ok3(code4) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code4);
      }
      effects.enter("codeFencedFenceInfo");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return info(code4);
    }
    function info(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return infoBefore(code4);
      }
      if (markdownSpace(code4)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceInfo");
        return factorySpace(effects, metaBefore, "whitespace")(code4);
      }
      if (code4 === 96 && code4 === marker) {
        return nok(code4);
      }
      effects.consume(code4);
      return info;
    }
    function metaBefore(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        return infoBefore(code4);
      }
      effects.enter("codeFencedFenceMeta");
      effects.enter("chunkString", {
        contentType: "string"
      });
      return meta(code4);
    }
    function meta(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("chunkString");
        effects.exit("codeFencedFenceMeta");
        return infoBefore(code4);
      }
      if (code4 === 96 && code4 === marker) {
        return nok(code4);
      }
      effects.consume(code4);
      return meta;
    }
    function atNonLazyBreak(code4) {
      return effects.attempt(closeStart, after, contentBefore)(code4);
    }
    function contentBefore(code4) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return contentStart;
    }
    function contentStart(code4) {
      return initialPrefix > 0 && markdownSpace(code4) ? factorySpace(effects, beforeContentChunk, "linePrefix", initialPrefix + 1)(code4) : beforeContentChunk(code4);
    }
    function beforeContentChunk(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code4);
      }
      effects.enter("codeFlowValue");
      return contentChunk(code4);
    }
    function contentChunk(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("codeFlowValue");
        return beforeContentChunk(code4);
      }
      effects.consume(code4);
      return contentChunk;
    }
    function after(code4) {
      effects.exit("codeFenced");
      return ok3(code4);
    }
    function tokenizeCloseStart(effects2, ok4, nok2) {
      let size = 0;
      return startBefore;
      function startBefore(code4) {
        effects2.enter("lineEnding");
        effects2.consume(code4);
        effects2.exit("lineEnding");
        return start2;
      }
      function start2(code4) {
        effects2.enter("codeFencedFence");
        return markdownSpace(code4) ? factorySpace(effects2, beforeSequenceClose, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4) : beforeSequenceClose(code4);
      }
      function beforeSequenceClose(code4) {
        if (code4 === marker) {
          effects2.enter("codeFencedFenceSequence");
          return sequenceClose(code4);
        }
        return nok2(code4);
      }
      function sequenceClose(code4) {
        if (code4 === marker) {
          size++;
          effects2.consume(code4);
          return sequenceClose;
        }
        if (size >= sizeOpen) {
          effects2.exit("codeFencedFenceSequence");
          return markdownSpace(code4) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code4) : sequenceCloseAfter(code4);
        }
        return nok2(code4);
      }
      function sequenceCloseAfter(code4) {
        if (code4 === null || markdownLineEnding(code4)) {
          effects2.exit("codeFencedFence");
          return ok4(code4);
        }
        return nok2(code4);
      }
    }
  }
  function tokenizeNonLazyContinuation(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code4) {
      return self2.parser.lazy[self2.now().line] ? nok(code4) : ok3(code4);
    }
  }
  var nonLazyContinuation, codeFenced;
  var init_code_fenced = __esm({
    "node_modules/micromark-core-commonmark/lib/code-fenced.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      nonLazyContinuation = {
        partial: true,
        tokenize: tokenizeNonLazyContinuation
      };
      codeFenced = {
        concrete: true,
        name: "codeFenced",
        tokenize: tokenizeCodeFenced
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/code-indented.js
  function tokenizeCodeIndented(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      effects.enter("codeIndented");
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code4);
    }
    function afterPrefix(code4) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code4) : nok(code4);
    }
    function atBreak(code4) {
      if (code4 === null) {
        return after(code4);
      }
      if (markdownLineEnding(code4)) {
        return effects.attempt(furtherStart, atBreak, after)(code4);
      }
      effects.enter("codeFlowValue");
      return inside(code4);
    }
    function inside(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("codeFlowValue");
        return atBreak(code4);
      }
      effects.consume(code4);
      return inside;
    }
    function after(code4) {
      effects.exit("codeIndented");
      return ok3(code4);
    }
  }
  function tokenizeFurtherStart(effects, ok3, nok) {
    const self2 = this;
    return furtherStart2;
    function furtherStart2(code4) {
      if (self2.parser.lazy[self2.now().line]) {
        return nok(code4);
      }
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return furtherStart2;
      }
      return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code4);
    }
    function afterPrefix(code4) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok3(code4) : markdownLineEnding(code4) ? furtherStart2(code4) : nok(code4);
    }
  }
  var codeIndented, furtherStart;
  var init_code_indented = __esm({
    "node_modules/micromark-core-commonmark/lib/code-indented.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      codeIndented = {
        name: "codeIndented",
        tokenize: tokenizeCodeIndented
      };
      furtherStart = {
        partial: true,
        tokenize: tokenizeFurtherStart
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/code-text.js
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    let index2;
    let enter;
    if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
      index2 = headEnterIndex;
      while (++index2 < tailExitIndex) {
        if (events[index2][1].type === "codeTextData") {
          events[headEnterIndex][1].type = "codeTextPadding";
          events[tailExitIndex][1].type = "codeTextPadding";
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index2 = headEnterIndex - 1;
    tailExitIndex++;
    while (++index2 <= tailExitIndex) {
      if (enter === void 0) {
        if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
          enter = index2;
        }
      } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
        events[enter][1].type = "codeTextData";
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          tailExitIndex -= index2 - enter - 2;
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return events;
  }
  function previous(code4) {
    return code4 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
  }
  function tokenizeCodeText(effects, ok3, nok) {
    const self2 = this;
    let sizeOpen = 0;
    let size;
    let token;
    return start;
    function start(code4) {
      effects.enter("codeText");
      effects.enter("codeTextSequence");
      return sequenceOpen(code4);
    }
    function sequenceOpen(code4) {
      if (code4 === 96) {
        effects.consume(code4);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit("codeTextSequence");
      return between(code4);
    }
    function between(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      if (code4 === 32) {
        effects.enter("space");
        effects.consume(code4);
        effects.exit("space");
        return between;
      }
      if (code4 === 96) {
        token = effects.enter("codeTextSequence");
        size = 0;
        return sequenceClose(code4);
      }
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return between;
      }
      effects.enter("codeTextData");
      return data(code4);
    }
    function data(code4) {
      if (code4 === null || code4 === 32 || code4 === 96 || markdownLineEnding(code4)) {
        effects.exit("codeTextData");
        return between(code4);
      }
      effects.consume(code4);
      return data;
    }
    function sequenceClose(code4) {
      if (code4 === 96) {
        effects.consume(code4);
        size++;
        return sequenceClose;
      }
      if (size === sizeOpen) {
        effects.exit("codeTextSequence");
        effects.exit("codeText");
        return ok3(code4);
      }
      token.type = "codeTextData";
      return data(code4);
    }
  }
  var codeText;
  var init_code_text = __esm({
    "node_modules/micromark-core-commonmark/lib/code-text.js"() {
      init_micromark_util_character();
      codeText = {
        name: "codeText",
        previous,
        resolve: resolveCodeText,
        tokenize: tokenizeCodeText
      };
    }
  });

  // node_modules/micromark-util-subtokenize/lib/splice-buffer.js
  function chunkedPush(list4, right) {
    let chunkStart = 0;
    if (right.length < 1e4) {
      list4.push(...right);
    } else {
      while (chunkStart < right.length) {
        list4.push(...right.slice(chunkStart, chunkStart + 1e4));
        chunkStart += 1e4;
      }
    }
  }
  var SpliceBuffer;
  var init_splice_buffer = __esm({
    "node_modules/micromark-util-subtokenize/lib/splice-buffer.js"() {
      SpliceBuffer = class {
        /**
         * @param {ReadonlyArray<T> | null | undefined} [initial]
         *   Initial items (optional).
         * @returns
         *   Splice buffer.
         */
        constructor(initial) {
          this.left = initial ? [...initial] : [];
          this.right = [];
        }
        /**
         * Array access;
         * does not move the cursor.
         *
         * @param {number} index
         *   Index.
         * @return {T}
         *   Item.
         */
        get(index2) {
          if (index2 < 0 || index2 >= this.left.length + this.right.length) {
            throw new RangeError("Cannot access index `" + index2 + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
          }
          if (index2 < this.left.length) return this.left[index2];
          return this.right[this.right.length - index2 + this.left.length - 1];
        }
        /**
         * The length of the splice buffer, one greater than the largest index in the
         * array.
         */
        get length() {
          return this.left.length + this.right.length;
        }
        /**
         * Remove and return `list[0]`;
         * moves the cursor to `0`.
         *
         * @returns {T | undefined}
         *   Item, optional.
         */
        shift() {
          this.setCursor(0);
          return this.right.pop();
        }
        /**
         * Slice the buffer to get an array;
         * does not move the cursor.
         *
         * @param {number} start
         *   Start.
         * @param {number | null | undefined} [end]
         *   End (optional).
         * @returns {Array<T>}
         *   Array of items.
         */
        slice(start, end) {
          const stop = end === null || end === void 0 ? Number.POSITIVE_INFINITY : end;
          if (stop < this.left.length) {
            return this.left.slice(start, stop);
          }
          if (start > this.left.length) {
            return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
          }
          return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
        }
        /**
         * Mimics the behavior of Array.prototype.splice() except for the change of
         * interface necessary to avoid segfaults when patching in very large arrays.
         *
         * This operation moves cursor is moved to `start` and results in the cursor
         * placed after any inserted items.
         *
         * @param {number} start
         *   Start;
         *   zero-based index at which to start changing the array;
         *   negative numbers count backwards from the end of the array and values
         *   that are out-of bounds are clamped to the appropriate end of the array.
         * @param {number | null | undefined} [deleteCount=0]
         *   Delete count (default: `0`);
         *   maximum number of elements to delete, starting from start.
         * @param {Array<T> | null | undefined} [items=[]]
         *   Items to include in place of the deleted items (default: `[]`).
         * @return {Array<T>}
         *   Any removed items.
         */
        splice(start, deleteCount, items) {
          const count = deleteCount || 0;
          this.setCursor(Math.trunc(start));
          const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
          if (items) chunkedPush(this.left, items);
          return removed.reverse();
        }
        /**
         * Remove and return the highest-numbered item in the array, so
         * `list[list.length - 1]`;
         * Moves the cursor to `length`.
         *
         * @returns {T | undefined}
         *   Item, optional.
         */
        pop() {
          this.setCursor(Number.POSITIVE_INFINITY);
          return this.left.pop();
        }
        /**
         * Inserts a single item to the high-numbered side of the array;
         * moves the cursor to `length`.
         *
         * @param {T} item
         *   Item.
         * @returns {undefined}
         *   Nothing.
         */
        push(item) {
          this.setCursor(Number.POSITIVE_INFINITY);
          this.left.push(item);
        }
        /**
         * Inserts many items to the high-numbered side of the array.
         * Moves the cursor to `length`.
         *
         * @param {Array<T>} items
         *   Items.
         * @returns {undefined}
         *   Nothing.
         */
        pushMany(items) {
          this.setCursor(Number.POSITIVE_INFINITY);
          chunkedPush(this.left, items);
        }
        /**
         * Inserts a single item to the low-numbered side of the array;
         * Moves the cursor to `0`.
         *
         * @param {T} item
         *   Item.
         * @returns {undefined}
         *   Nothing.
         */
        unshift(item) {
          this.setCursor(0);
          this.right.push(item);
        }
        /**
         * Inserts many items to the low-numbered side of the array;
         * moves the cursor to `0`.
         *
         * @param {Array<T>} items
         *   Items.
         * @returns {undefined}
         *   Nothing.
         */
        unshiftMany(items) {
          this.setCursor(0);
          chunkedPush(this.right, items.reverse());
        }
        /**
         * Move the cursor to a specific position in the array. Requires
         * time proportional to the distance moved.
         *
         * If `n < 0`, the cursor will end up at the beginning.
         * If `n > length`, the cursor will end up at the end.
         *
         * @param {number} n
         *   Position.
         * @return {undefined}
         *   Nothing.
         */
        setCursor(n) {
          if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0) return;
          if (n < this.left.length) {
            const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
            chunkedPush(this.right, removed.reverse());
          } else {
            const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
            chunkedPush(this.left, removed.reverse());
          }
        }
      };
    }
  });

  // node_modules/micromark-util-subtokenize/index.js
  function subtokenize(eventsArray) {
    const jumps = {};
    let index2 = -1;
    let event;
    let lineIndex;
    let otherIndex;
    let otherEvent;
    let parameters;
    let subevents;
    let more;
    const events = new SpliceBuffer(eventsArray);
    while (++index2 < events.length) {
      while (index2 in jumps) {
        index2 = jumps[index2];
      }
      event = events.get(index2);
      if (index2 && event[1].type === "chunkFlow" && events.get(index2 - 1)[1].type === "listItemPrefix") {
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === "content") {
              break;
            }
            if (subevents[otherIndex][1].type === "chunkText") {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index2));
          index2 = jumps[index2];
          more = true;
        }
      } else if (event[1]._container) {
        otherIndex = index2;
        lineIndex = void 0;
        while (otherIndex--) {
          otherEvent = events.get(otherIndex);
          if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events.get(lineIndex)[1].type = "lineEndingBlank";
              }
              otherEvent[1].type = "lineEnding";
              lineIndex = otherIndex;
            }
          } else if (otherEvent[1].type === "linePrefix" || otherEvent[1].type === "listItemIndent") {
          } else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = {
            ...events.get(lineIndex)[1].start
          };
          parameters = events.slice(lineIndex, index2);
          parameters.unshift(event);
          events.splice(lineIndex, index2 - lineIndex + 1, parameters);
        }
      }
    }
    splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
  }
  function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    const startPositions = [];
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
      tokenizer = context.parser[token.contentType](token.start);
      if (token._contentTypeTextTrailing) {
        tokenizer._contentTypeTextTrailing = true;
      }
    }
    const childEvents = tokenizer.events;
    const jumps = [];
    const gaps = {};
    let stream;
    let previous3;
    let index2 = -1;
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [start];
    while (current) {
      while (events.get(++startPosition)[1] !== current) {
      }
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(null);
        }
        if (previous3) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = void 0;
        }
      }
      previous3 = current;
      current = current.next;
    }
    current = token;
    while (++index2 < childEvents.length) {
      if (
        // Find a void token that includes a break.
        childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
      ) {
        start = index2 + 1;
        breaks.push(start);
        current._tokenizer = void 0;
        current.previous = void 0;
        current = current.next;
      }
    }
    tokenizer.events = [];
    if (current) {
      current._tokenizer = void 0;
      current.previous = void 0;
    } else {
      breaks.pop();
    }
    index2 = breaks.length;
    while (index2--) {
      const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
      const start2 = startPositions.pop();
      jumps.push([start2, start2 + slice.length - 1]);
      events.splice(start2, 2, slice);
    }
    jumps.reverse();
    index2 = -1;
    while (++index2 < jumps.length) {
      gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
      adjust += jumps[index2][1] - jumps[index2][0] - 1;
    }
    return gaps;
  }
  var init_micromark_util_subtokenize = __esm({
    "node_modules/micromark-util-subtokenize/index.js"() {
      init_micromark_util_chunked();
      init_splice_buffer();
    }
  });

  // node_modules/micromark-core-commonmark/lib/content.js
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok3) {
    let previous3;
    return chunkStart;
    function chunkStart(code4) {
      effects.enter("content");
      previous3 = effects.enter("chunkContent", {
        contentType: "content"
      });
      return chunkInside(code4);
    }
    function chunkInside(code4) {
      if (code4 === null) {
        return contentEnd(code4);
      }
      if (markdownLineEnding(code4)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code4);
      }
      effects.consume(code4);
      return chunkInside;
    }
    function contentEnd(code4) {
      effects.exit("chunkContent");
      effects.exit("content");
      return ok3(code4);
    }
    function contentContinue(code4) {
      effects.consume(code4);
      effects.exit("chunkContent");
      previous3.next = effects.enter("chunkContent", {
        contentType: "content",
        previous: previous3
      });
      previous3 = previous3.next;
      return chunkInside;
    }
  }
  function tokenizeContinuation(effects, ok3, nok) {
    const self2 = this;
    return startLookahead;
    function startLookahead(code4) {
      effects.exit("chunkContent");
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return factorySpace(effects, prefixed, "linePrefix");
    }
    function prefixed(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        return nok(code4);
      }
      const tail = self2.events[self2.events.length - 1];
      if (!self2.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return ok3(code4);
      }
      return effects.interrupt(self2.parser.constructs.flow, nok, ok3)(code4);
    }
  }
  var content2, continuationConstruct;
  var init_content2 = __esm({
    "node_modules/micromark-core-commonmark/lib/content.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_subtokenize();
      content2 = {
        resolve: resolveContent,
        tokenize: tokenizeContent
      };
      continuationConstruct = {
        partial: true,
        tokenize: tokenizeContinuation
      };
    }
  });

  // node_modules/micromark-factory-destination/index.js
  function factoryDestination(effects, ok3, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    function start(code4) {
      if (code4 === 60) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code4);
        effects.exit(literalMarkerType);
        return enclosedBefore;
      }
      if (code4 === null || code4 === 32 || code4 === 41 || asciiControl(code4)) {
        return nok(code4);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return raw3(code4);
    }
    function enclosedBefore(code4) {
      if (code4 === 62) {
        effects.enter(literalMarkerType);
        effects.consume(code4);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok3;
      }
      effects.enter(stringType);
      effects.enter("chunkString", {
        contentType: "string"
      });
      return enclosed(code4);
    }
    function enclosed(code4) {
      if (code4 === 62) {
        effects.exit("chunkString");
        effects.exit(stringType);
        return enclosedBefore(code4);
      }
      if (code4 === null || code4 === 60 || markdownLineEnding(code4)) {
        return nok(code4);
      }
      effects.consume(code4);
      return code4 === 92 ? enclosedEscape : enclosed;
    }
    function enclosedEscape(code4) {
      if (code4 === 60 || code4 === 62 || code4 === 92) {
        effects.consume(code4);
        return enclosed;
      }
      return enclosed(code4);
    }
    function raw3(code4) {
      if (!balance && (code4 === null || code4 === 41 || markdownLineEndingOrSpace(code4))) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok3(code4);
      }
      if (balance < limit && code4 === 40) {
        effects.consume(code4);
        balance++;
        return raw3;
      }
      if (code4 === 41) {
        effects.consume(code4);
        balance--;
        return raw3;
      }
      if (code4 === null || code4 === 32 || code4 === 40 || asciiControl(code4)) {
        return nok(code4);
      }
      effects.consume(code4);
      return code4 === 92 ? rawEscape : raw3;
    }
    function rawEscape(code4) {
      if (code4 === 40 || code4 === 41 || code4 === 92) {
        effects.consume(code4);
        return raw3;
      }
      return raw3(code4);
    }
  }
  var init_micromark_factory_destination = __esm({
    "node_modules/micromark-factory-destination/index.js"() {
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-factory-label/index.js
  function factoryLabel(effects, ok3, nok, type, markerType, stringType) {
    const self2 = this;
    let size = 0;
    let seen;
    return start;
    function start(code4) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code4);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code4) {
      if (size > 999 || code4 === null || code4 === 91 || code4 === 93 && !seen || // To do: remove in the future once we’ve switched from
      // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
      // which doesn’t need this.
      // Hidden footnotes hook.
      /* c8 ignore next 3 */
      code4 === 94 && !size && "_hiddenFootnoteSupport" in self2.parser.constructs) {
        return nok(code4);
      }
      if (code4 === 93) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code4);
        effects.exit(markerType);
        effects.exit(type);
        return ok3;
      }
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return atBreak;
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return labelInside(code4);
    }
    function labelInside(code4) {
      if (code4 === null || code4 === 91 || code4 === 93 || markdownLineEnding(code4) || size++ > 999) {
        effects.exit("chunkString");
        return atBreak(code4);
      }
      effects.consume(code4);
      if (!seen) seen = !markdownSpace(code4);
      return code4 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code4) {
      if (code4 === 91 || code4 === 92 || code4 === 93) {
        effects.consume(code4);
        size++;
        return labelInside;
      }
      return labelInside(code4);
    }
  }
  var init_micromark_factory_label = __esm({
    "node_modules/micromark-factory-label/index.js"() {
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-factory-title/index.js
  function factoryTitle(effects, ok3, nok, type, markerType, stringType) {
    let marker;
    return start;
    function start(code4) {
      if (code4 === 34 || code4 === 39 || code4 === 40) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code4);
        effects.exit(markerType);
        marker = code4 === 40 ? 41 : code4;
        return begin;
      }
      return nok(code4);
    }
    function begin(code4) {
      if (code4 === marker) {
        effects.enter(markerType);
        effects.consume(code4);
        effects.exit(markerType);
        effects.exit(type);
        return ok3;
      }
      effects.enter(stringType);
      return atBreak(code4);
    }
    function atBreak(code4) {
      if (code4 === marker) {
        effects.exit(stringType);
        return begin(marker);
      }
      if (code4 === null) {
        return nok(code4);
      }
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return factorySpace(effects, atBreak, "linePrefix");
      }
      effects.enter("chunkString", {
        contentType: "string"
      });
      return inside(code4);
    }
    function inside(code4) {
      if (code4 === marker || code4 === null || markdownLineEnding(code4)) {
        effects.exit("chunkString");
        return atBreak(code4);
      }
      effects.consume(code4);
      return code4 === 92 ? escape : inside;
    }
    function escape(code4) {
      if (code4 === marker || code4 === 92) {
        effects.consume(code4);
        return inside;
      }
      return inside(code4);
    }
  }
  var init_micromark_factory_title = __esm({
    "node_modules/micromark-factory-title/index.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-factory-whitespace/index.js
  function factoryWhitespace(effects, ok3) {
    let seen;
    return start;
    function start(code4) {
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        seen = true;
        return start;
      }
      if (markdownSpace(code4)) {
        return factorySpace(effects, start, seen ? "linePrefix" : "lineSuffix")(code4);
      }
      return ok3(code4);
    }
  }
  var init_micromark_factory_whitespace = __esm({
    "node_modules/micromark-factory-whitespace/index.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
    }
  });

  // node_modules/micromark-core-commonmark/lib/definition.js
  function tokenizeDefinition(effects, ok3, nok) {
    const self2 = this;
    let identifier;
    return start;
    function start(code4) {
      effects.enter("definition");
      return before(code4);
    }
    function before(code4) {
      return factoryLabel.call(
        self2,
        effects,
        labelAfter,
        // Note: we don’t need to reset the way `markdown-rs` does.
        nok,
        "definitionLabel",
        "definitionLabelMarker",
        "definitionLabelString"
      )(code4);
    }
    function labelAfter(code4) {
      identifier = normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1));
      if (code4 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code4);
        effects.exit("definitionMarker");
        return markerAfter;
      }
      return nok(code4);
    }
    function markerAfter(code4) {
      return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, destinationBefore)(code4) : destinationBefore(code4);
    }
    function destinationBefore(code4) {
      return factoryDestination(
        effects,
        destinationAfter,
        // Note: we don’t need to reset the way `markdown-rs` does.
        nok,
        "definitionDestination",
        "definitionDestinationLiteral",
        "definitionDestinationLiteralMarker",
        "definitionDestinationRaw",
        "definitionDestinationString"
      )(code4);
    }
    function destinationAfter(code4) {
      return effects.attempt(titleBefore, after, after)(code4);
    }
    function after(code4) {
      return markdownSpace(code4) ? factorySpace(effects, afterWhitespace, "whitespace")(code4) : afterWhitespace(code4);
    }
    function afterWhitespace(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("definition");
        self2.parser.defined.push(identifier);
        return ok3(code4);
      }
      return nok(code4);
    }
  }
  function tokenizeTitleBefore(effects, ok3, nok) {
    return titleBefore2;
    function titleBefore2(code4) {
      return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, beforeMarker)(code4) : nok(code4);
    }
    function beforeMarker(code4) {
      return factoryTitle(effects, titleAfter, nok, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(code4);
    }
    function titleAfter(code4) {
      return markdownSpace(code4) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code4) : titleAfterOptionalWhitespace(code4);
    }
    function titleAfterOptionalWhitespace(code4) {
      return code4 === null || markdownLineEnding(code4) ? ok3(code4) : nok(code4);
    }
  }
  var definition, titleBefore;
  var init_definition = __esm({
    "node_modules/micromark-core-commonmark/lib/definition.js"() {
      init_micromark_factory_destination();
      init_micromark_factory_label();
      init_micromark_factory_space();
      init_micromark_factory_title();
      init_micromark_factory_whitespace();
      init_micromark_util_character();
      init_micromark_util_normalize_identifier();
      definition = {
        name: "definition",
        tokenize: tokenizeDefinition
      };
      titleBefore = {
        partial: true,
        tokenize: tokenizeTitleBefore
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/hard-break-escape.js
  function tokenizeHardBreakEscape(effects, ok3, nok) {
    return start;
    function start(code4) {
      effects.enter("hardBreakEscape");
      effects.consume(code4);
      return after;
    }
    function after(code4) {
      if (markdownLineEnding(code4)) {
        effects.exit("hardBreakEscape");
        return ok3(code4);
      }
      return nok(code4);
    }
  }
  var hardBreakEscape;
  var init_hard_break_escape = __esm({
    "node_modules/micromark-core-commonmark/lib/hard-break-escape.js"() {
      init_micromark_util_character();
      hardBreakEscape = {
        name: "hardBreakEscape",
        tokenize: tokenizeHardBreakEscape
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/heading-atx.js
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;
    let content3;
    let text9;
    if (events[contentStart][1].type === "whitespace") {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content3 = {
        type: "atxHeadingText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text9 = {
        type: "chunkText",
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: "text"
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [["enter", content3, context], ["enter", text9, context], ["exit", text9, context], ["exit", content3, context]]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok3, nok) {
    let size = 0;
    return start;
    function start(code4) {
      effects.enter("atxHeading");
      return before(code4);
    }
    function before(code4) {
      effects.enter("atxHeadingSequence");
      return sequenceOpen(code4);
    }
    function sequenceOpen(code4) {
      if (code4 === 35 && size++ < 6) {
        effects.consume(code4);
        return sequenceOpen;
      }
      if (code4 === null || markdownLineEndingOrSpace(code4)) {
        effects.exit("atxHeadingSequence");
        return atBreak(code4);
      }
      return nok(code4);
    }
    function atBreak(code4) {
      if (code4 === 35) {
        effects.enter("atxHeadingSequence");
        return sequenceFurther(code4);
      }
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("atxHeading");
        return ok3(code4);
      }
      if (markdownSpace(code4)) {
        return factorySpace(effects, atBreak, "whitespace")(code4);
      }
      effects.enter("atxHeadingText");
      return data(code4);
    }
    function sequenceFurther(code4) {
      if (code4 === 35) {
        effects.consume(code4);
        return sequenceFurther;
      }
      effects.exit("atxHeadingSequence");
      return atBreak(code4);
    }
    function data(code4) {
      if (code4 === null || code4 === 35 || markdownLineEndingOrSpace(code4)) {
        effects.exit("atxHeadingText");
        return atBreak(code4);
      }
      effects.consume(code4);
      return data;
    }
  }
  var headingAtx;
  var init_heading_atx = __esm({
    "node_modules/micromark-core-commonmark/lib/heading-atx.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_chunked();
      headingAtx = {
        name: "headingAtx",
        resolve: resolveHeadingAtx,
        tokenize: tokenizeHeadingAtx
      };
    }
  });

  // node_modules/micromark-util-html-tag-name/index.js
  var htmlBlockNames, htmlRawNames;
  var init_micromark_util_html_tag_name = __esm({
    "node_modules/micromark-util-html-tag-name/index.js"() {
      htmlBlockNames = [
        "address",
        "article",
        "aside",
        "base",
        "basefont",
        "blockquote",
        "body",
        "caption",
        "center",
        "col",
        "colgroup",
        "dd",
        "details",
        "dialog",
        "dir",
        "div",
        "dl",
        "dt",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "frame",
        "frameset",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hr",
        "html",
        "iframe",
        "legend",
        "li",
        "link",
        "main",
        "menu",
        "menuitem",
        "nav",
        "noframes",
        "ol",
        "optgroup",
        "option",
        "p",
        "param",
        "search",
        "section",
        "summary",
        "table",
        "tbody",
        "td",
        "tfoot",
        "th",
        "thead",
        "title",
        "tr",
        "track",
        "ul"
      ];
      htmlRawNames = ["pre", "script", "style", "textarea"];
    }
  });

  // node_modules/micromark-core-commonmark/lib/html-flow.js
  function resolveToHtmlFlow(events) {
    let index2 = events.length;
    while (index2--) {
      if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
        break;
      }
    }
    if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
      events[index2][1].start = events[index2 - 2][1].start;
      events[index2 + 1][1].start = events[index2 - 2][1].start;
      events.splice(index2 - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok3, nok) {
    const self2 = this;
    let marker;
    let closingTag;
    let buffer;
    let index2;
    let markerB;
    return start;
    function start(code4) {
      return before(code4);
    }
    function before(code4) {
      effects.enter("htmlFlow");
      effects.enter("htmlFlowData");
      effects.consume(code4);
      return open;
    }
    function open(code4) {
      if (code4 === 33) {
        effects.consume(code4);
        return declarationOpen;
      }
      if (code4 === 47) {
        effects.consume(code4);
        closingTag = true;
        return tagCloseStart;
      }
      if (code4 === 63) {
        effects.consume(code4);
        marker = 3;
        return self2.interrupt ? ok3 : continuationDeclarationInside;
      }
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        buffer = String.fromCharCode(code4);
        return tagName;
      }
      return nok(code4);
    }
    function declarationOpen(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        marker = 2;
        return commentOpenInside;
      }
      if (code4 === 91) {
        effects.consume(code4);
        marker = 5;
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        marker = 4;
        return self2.interrupt ? ok3 : continuationDeclarationInside;
      }
      return nok(code4);
    }
    function commentOpenInside(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return self2.interrupt ? ok3 : continuationDeclarationInside;
      }
      return nok(code4);
    }
    function cdataOpenInside(code4) {
      const value = "CDATA[";
      if (code4 === value.charCodeAt(index2++)) {
        effects.consume(code4);
        if (index2 === value.length) {
          return self2.interrupt ? ok3 : continuation;
        }
        return cdataOpenInside;
      }
      return nok(code4);
    }
    function tagCloseStart(code4) {
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        buffer = String.fromCharCode(code4);
        return tagName;
      }
      return nok(code4);
    }
    function tagName(code4) {
      if (code4 === null || code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
        const slash = code4 === 47;
        const name = buffer.toLowerCase();
        if (!slash && !closingTag && htmlRawNames.includes(name)) {
          marker = 1;
          return self2.interrupt ? ok3(code4) : continuation(code4);
        }
        if (htmlBlockNames.includes(buffer.toLowerCase())) {
          marker = 6;
          if (slash) {
            effects.consume(code4);
            return basicSelfClosing;
          }
          return self2.interrupt ? ok3(code4) : continuation(code4);
        }
        marker = 7;
        return self2.interrupt && !self2.parser.lazy[self2.now().line] ? nok(code4) : closingTag ? completeClosingTagAfter(code4) : completeAttributeNameBefore(code4);
      }
      if (code4 === 45 || asciiAlphanumeric(code4)) {
        effects.consume(code4);
        buffer += String.fromCharCode(code4);
        return tagName;
      }
      return nok(code4);
    }
    function basicSelfClosing(code4) {
      if (code4 === 62) {
        effects.consume(code4);
        return self2.interrupt ? ok3 : continuation;
      }
      return nok(code4);
    }
    function completeClosingTagAfter(code4) {
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return completeClosingTagAfter;
      }
      return completeEnd(code4);
    }
    function completeAttributeNameBefore(code4) {
      if (code4 === 47) {
        effects.consume(code4);
        return completeEnd;
      }
      if (code4 === 58 || code4 === 95 || asciiAlpha(code4)) {
        effects.consume(code4);
        return completeAttributeName;
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return completeAttributeNameBefore;
      }
      return completeEnd(code4);
    }
    function completeAttributeName(code4) {
      if (code4 === 45 || code4 === 46 || code4 === 58 || code4 === 95 || asciiAlphanumeric(code4)) {
        effects.consume(code4);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code4);
    }
    function completeAttributeNameAfter(code4) {
      if (code4 === 61) {
        effects.consume(code4);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code4);
    }
    function completeAttributeValueBefore(code4) {
      if (code4 === null || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96) {
        return nok(code4);
      }
      if (code4 === 34 || code4 === 39) {
        effects.consume(code4);
        markerB = code4;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return completeAttributeValueBefore;
      }
      return completeAttributeValueUnquoted(code4);
    }
    function completeAttributeValueQuoted(code4) {
      if (code4 === markerB) {
        effects.consume(code4);
        markerB = null;
        return completeAttributeValueQuotedAfter;
      }
      if (code4 === null || markdownLineEnding(code4)) {
        return nok(code4);
      }
      effects.consume(code4);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code4) {
      if (code4 === null || code4 === 34 || code4 === 39 || code4 === 47 || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96 || markdownLineEndingOrSpace(code4)) {
        return completeAttributeNameAfter(code4);
      }
      effects.consume(code4);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code4) {
      if (code4 === 47 || code4 === 62 || markdownSpace(code4)) {
        return completeAttributeNameBefore(code4);
      }
      return nok(code4);
    }
    function completeEnd(code4) {
      if (code4 === 62) {
        effects.consume(code4);
        return completeAfter;
      }
      return nok(code4);
    }
    function completeAfter(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        return continuation(code4);
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return completeAfter;
      }
      return nok(code4);
    }
    function continuation(code4) {
      if (code4 === 45 && marker === 2) {
        effects.consume(code4);
        return continuationCommentInside;
      }
      if (code4 === 60 && marker === 1) {
        effects.consume(code4);
        return continuationRawTagOpen;
      }
      if (code4 === 62 && marker === 4) {
        effects.consume(code4);
        return continuationClose;
      }
      if (code4 === 63 && marker === 3) {
        effects.consume(code4);
        return continuationDeclarationInside;
      }
      if (code4 === 93 && marker === 5) {
        effects.consume(code4);
        return continuationCdataInside;
      }
      if (markdownLineEnding(code4) && (marker === 6 || marker === 7)) {
        effects.exit("htmlFlowData");
        return effects.check(blankLineBefore, continuationAfter, continuationStart)(code4);
      }
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("htmlFlowData");
        return continuationStart(code4);
      }
      effects.consume(code4);
      return continuation;
    }
    function continuationStart(code4) {
      return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code4);
    }
    function continuationStartNonLazy(code4) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return continuationBefore;
    }
    function continuationBefore(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        return continuationStart(code4);
      }
      effects.enter("htmlFlowData");
      return continuation(code4);
    }
    function continuationCommentInside(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return continuationDeclarationInside;
      }
      return continuation(code4);
    }
    function continuationRawTagOpen(code4) {
      if (code4 === 47) {
        effects.consume(code4);
        buffer = "";
        return continuationRawEndTag;
      }
      return continuation(code4);
    }
    function continuationRawEndTag(code4) {
      if (code4 === 62) {
        const name = buffer.toLowerCase();
        if (htmlRawNames.includes(name)) {
          effects.consume(code4);
          return continuationClose;
        }
        return continuation(code4);
      }
      if (asciiAlpha(code4) && buffer.length < 8) {
        effects.consume(code4);
        buffer += String.fromCharCode(code4);
        return continuationRawEndTag;
      }
      return continuation(code4);
    }
    function continuationCdataInside(code4) {
      if (code4 === 93) {
        effects.consume(code4);
        return continuationDeclarationInside;
      }
      return continuation(code4);
    }
    function continuationDeclarationInside(code4) {
      if (code4 === 62) {
        effects.consume(code4);
        return continuationClose;
      }
      if (code4 === 45 && marker === 2) {
        effects.consume(code4);
        return continuationDeclarationInside;
      }
      return continuation(code4);
    }
    function continuationClose(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("htmlFlowData");
        return continuationAfter(code4);
      }
      effects.consume(code4);
      return continuationClose;
    }
    function continuationAfter(code4) {
      effects.exit("htmlFlow");
      return ok3(code4);
    }
  }
  function tokenizeNonLazyContinuationStart(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      if (markdownLineEnding(code4)) {
        effects.enter("lineEnding");
        effects.consume(code4);
        effects.exit("lineEnding");
        return after;
      }
      return nok(code4);
    }
    function after(code4) {
      return self2.parser.lazy[self2.now().line] ? nok(code4) : ok3(code4);
    }
  }
  function tokenizeBlankLineBefore(effects, ok3, nok) {
    return start;
    function start(code4) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return effects.attempt(blankLine, ok3, nok);
    }
  }
  var htmlFlow, blankLineBefore, nonLazyContinuationStart;
  var init_html_flow = __esm({
    "node_modules/micromark-core-commonmark/lib/html-flow.js"() {
      init_micromark_util_character();
      init_micromark_util_html_tag_name();
      init_blank_line();
      htmlFlow = {
        concrete: true,
        name: "htmlFlow",
        resolveTo: resolveToHtmlFlow,
        tokenize: tokenizeHtmlFlow
      };
      blankLineBefore = {
        partial: true,
        tokenize: tokenizeBlankLineBefore
      };
      nonLazyContinuationStart = {
        partial: true,
        tokenize: tokenizeNonLazyContinuationStart
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/html-text.js
  function tokenizeHtmlText(effects, ok3, nok) {
    const self2 = this;
    let marker;
    let index2;
    let returnState;
    return start;
    function start(code4) {
      effects.enter("htmlText");
      effects.enter("htmlTextData");
      effects.consume(code4);
      return open;
    }
    function open(code4) {
      if (code4 === 33) {
        effects.consume(code4);
        return declarationOpen;
      }
      if (code4 === 47) {
        effects.consume(code4);
        return tagCloseStart;
      }
      if (code4 === 63) {
        effects.consume(code4);
        return instruction;
      }
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        return tagOpen;
      }
      return nok(code4);
    }
    function declarationOpen(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return commentOpenInside;
      }
      if (code4 === 91) {
        effects.consume(code4);
        index2 = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        return declaration;
      }
      return nok(code4);
    }
    function commentOpenInside(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return commentEnd;
      }
      return nok(code4);
    }
    function comment4(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      if (code4 === 45) {
        effects.consume(code4);
        return commentClose;
      }
      if (markdownLineEnding(code4)) {
        returnState = comment4;
        return lineEndingBefore(code4);
      }
      effects.consume(code4);
      return comment4;
    }
    function commentClose(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return commentEnd;
      }
      return comment4(code4);
    }
    function commentEnd(code4) {
      return code4 === 62 ? end(code4) : code4 === 45 ? commentClose(code4) : comment4(code4);
    }
    function cdataOpenInside(code4) {
      const value = "CDATA[";
      if (code4 === value.charCodeAt(index2++)) {
        effects.consume(code4);
        return index2 === value.length ? cdata : cdataOpenInside;
      }
      return nok(code4);
    }
    function cdata(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      if (code4 === 93) {
        effects.consume(code4);
        return cdataClose;
      }
      if (markdownLineEnding(code4)) {
        returnState = cdata;
        return lineEndingBefore(code4);
      }
      effects.consume(code4);
      return cdata;
    }
    function cdataClose(code4) {
      if (code4 === 93) {
        effects.consume(code4);
        return cdataEnd;
      }
      return cdata(code4);
    }
    function cdataEnd(code4) {
      if (code4 === 62) {
        return end(code4);
      }
      if (code4 === 93) {
        effects.consume(code4);
        return cdataEnd;
      }
      return cdata(code4);
    }
    function declaration(code4) {
      if (code4 === null || code4 === 62) {
        return end(code4);
      }
      if (markdownLineEnding(code4)) {
        returnState = declaration;
        return lineEndingBefore(code4);
      }
      effects.consume(code4);
      return declaration;
    }
    function instruction(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      if (code4 === 63) {
        effects.consume(code4);
        return instructionClose;
      }
      if (markdownLineEnding(code4)) {
        returnState = instruction;
        return lineEndingBefore(code4);
      }
      effects.consume(code4);
      return instruction;
    }
    function instructionClose(code4) {
      return code4 === 62 ? end(code4) : instruction(code4);
    }
    function tagCloseStart(code4) {
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        return tagClose;
      }
      return nok(code4);
    }
    function tagClose(code4) {
      if (code4 === 45 || asciiAlphanumeric(code4)) {
        effects.consume(code4);
        return tagClose;
      }
      return tagCloseBetween(code4);
    }
    function tagCloseBetween(code4) {
      if (markdownLineEnding(code4)) {
        returnState = tagCloseBetween;
        return lineEndingBefore(code4);
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return tagCloseBetween;
      }
      return end(code4);
    }
    function tagOpen(code4) {
      if (code4 === 45 || asciiAlphanumeric(code4)) {
        effects.consume(code4);
        return tagOpen;
      }
      if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
        return tagOpenBetween(code4);
      }
      return nok(code4);
    }
    function tagOpenBetween(code4) {
      if (code4 === 47) {
        effects.consume(code4);
        return end;
      }
      if (code4 === 58 || code4 === 95 || asciiAlpha(code4)) {
        effects.consume(code4);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code4)) {
        returnState = tagOpenBetween;
        return lineEndingBefore(code4);
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return tagOpenBetween;
      }
      return end(code4);
    }
    function tagOpenAttributeName(code4) {
      if (code4 === 45 || code4 === 46 || code4 === 58 || code4 === 95 || asciiAlphanumeric(code4)) {
        effects.consume(code4);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code4);
    }
    function tagOpenAttributeNameAfter(code4) {
      if (code4 === 61) {
        effects.consume(code4);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code4)) {
        returnState = tagOpenAttributeNameAfter;
        return lineEndingBefore(code4);
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code4);
    }
    function tagOpenAttributeValueBefore(code4) {
      if (code4 === null || code4 === 60 || code4 === 61 || code4 === 62 || code4 === 96) {
        return nok(code4);
      }
      if (code4 === 34 || code4 === 39) {
        effects.consume(code4);
        marker = code4;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code4)) {
        returnState = tagOpenAttributeValueBefore;
        return lineEndingBefore(code4);
      }
      if (markdownSpace(code4)) {
        effects.consume(code4);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code4);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code4) {
      if (code4 === marker) {
        effects.consume(code4);
        marker = void 0;
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code4 === null) {
        return nok(code4);
      }
      if (markdownLineEnding(code4)) {
        returnState = tagOpenAttributeValueQuoted;
        return lineEndingBefore(code4);
      }
      effects.consume(code4);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueUnquoted(code4) {
      if (code4 === null || code4 === 34 || code4 === 39 || code4 === 60 || code4 === 61 || code4 === 96) {
        return nok(code4);
      }
      if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
        return tagOpenBetween(code4);
      }
      effects.consume(code4);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuotedAfter(code4) {
      if (code4 === 47 || code4 === 62 || markdownLineEndingOrSpace(code4)) {
        return tagOpenBetween(code4);
      }
      return nok(code4);
    }
    function end(code4) {
      if (code4 === 62) {
        effects.consume(code4);
        effects.exit("htmlTextData");
        effects.exit("htmlText");
        return ok3;
      }
      return nok(code4);
    }
    function lineEndingBefore(code4) {
      effects.exit("htmlTextData");
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return lineEndingAfter;
    }
    function lineEndingAfter(code4) {
      return markdownSpace(code4) ? factorySpace(effects, lineEndingAfterPrefix, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4) : lineEndingAfterPrefix(code4);
    }
    function lineEndingAfterPrefix(code4) {
      effects.enter("htmlTextData");
      return returnState(code4);
    }
  }
  var htmlText;
  var init_html_text = __esm({
    "node_modules/micromark-core-commonmark/lib/html-text.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      htmlText = {
        name: "htmlText",
        tokenize: tokenizeHtmlText
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/label-end.js
  function resolveAllLabelEnd(events) {
    let index2 = -1;
    const newEvents = [];
    while (++index2 < events.length) {
      const token = events[index2][1];
      newEvents.push(events[index2]);
      if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
        const offset = token.type === "labelImage" ? 4 : 2;
        token.type = "data";
        index2 += offset;
      }
    }
    if (events.length !== newEvents.length) {
      splice(events, 0, events.length, newEvents);
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    let index2 = events.length;
    let offset = 0;
    let token;
    let open;
    let close;
    let media;
    while (index2--) {
      token = events[index2][1];
      if (open) {
        if (token.type === "link" || token.type === "labelLink" && token._inactive) {
          break;
        }
        if (events[index2][0] === "enter" && token.type === "labelLink") {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
          open = index2;
          if (token.type !== "labelLink") {
            offset = 2;
            break;
          }
        }
      } else if (token.type === "labelEnd") {
        close = index2;
      }
    }
    const group = {
      type: events[open][1].type === "labelLink" ? "link" : "image",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };
    const label = {
      type: "label",
      start: {
        ...events[open][1].start
      },
      end: {
        ...events[close][1].end
      }
    };
    const text9 = {
      type: "labelText",
      start: {
        ...events[open + offset + 2][1].end
      },
      end: {
        ...events[close - 2][1].start
      }
    };
    media = [["enter", group, context], ["enter", label, context]];
    media = push(media, events.slice(open + 1, open + offset + 3));
    media = push(media, [["enter", text9, context]]);
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
    media = push(media, [["exit", text9, context], events[close - 2], events[close - 1], ["exit", label, context]]);
    media = push(media, events.slice(close + 1));
    media = push(media, [["exit", group, context]]);
    splice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok3, nok) {
    const self2 = this;
    let index2 = self2.events.length;
    let labelStart;
    let defined;
    while (index2--) {
      if ((self2.events[index2][1].type === "labelImage" || self2.events[index2][1].type === "labelLink") && !self2.events[index2][1]._balanced) {
        labelStart = self2.events[index2][1];
        break;
      }
    }
    return start;
    function start(code4) {
      if (!labelStart) {
        return nok(code4);
      }
      if (labelStart._inactive) {
        return labelEndNok(code4);
      }
      defined = self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      })));
      effects.enter("labelEnd");
      effects.enter("labelMarker");
      effects.consume(code4);
      effects.exit("labelMarker");
      effects.exit("labelEnd");
      return after;
    }
    function after(code4) {
      if (code4 === 40) {
        return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code4);
      }
      if (code4 === 91) {
        return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code4);
      }
      return defined ? labelEndOk(code4) : labelEndNok(code4);
    }
    function referenceNotFull(code4) {
      return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code4);
    }
    function labelEndOk(code4) {
      return ok3(code4);
    }
    function labelEndNok(code4) {
      labelStart._balanced = true;
      return nok(code4);
    }
  }
  function tokenizeResource(effects, ok3, nok) {
    return resourceStart;
    function resourceStart(code4) {
      effects.enter("resource");
      effects.enter("resourceMarker");
      effects.consume(code4);
      effects.exit("resourceMarker");
      return resourceBefore;
    }
    function resourceBefore(code4) {
      return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceOpen)(code4) : resourceOpen(code4);
    }
    function resourceOpen(code4) {
      if (code4 === 41) {
        return resourceEnd(code4);
      }
      return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(code4);
    }
    function resourceDestinationAfter(code4) {
      return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceBetween)(code4) : resourceEnd(code4);
    }
    function resourceDestinationMissing(code4) {
      return nok(code4);
    }
    function resourceBetween(code4) {
      if (code4 === 34 || code4 === 39 || code4 === 40) {
        return factoryTitle(effects, resourceTitleAfter, nok, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(code4);
      }
      return resourceEnd(code4);
    }
    function resourceTitleAfter(code4) {
      return markdownLineEndingOrSpace(code4) ? factoryWhitespace(effects, resourceEnd)(code4) : resourceEnd(code4);
    }
    function resourceEnd(code4) {
      if (code4 === 41) {
        effects.enter("resourceMarker");
        effects.consume(code4);
        effects.exit("resourceMarker");
        effects.exit("resource");
        return ok3;
      }
      return nok(code4);
    }
  }
  function tokenizeReferenceFull(effects, ok3, nok) {
    const self2 = this;
    return referenceFull;
    function referenceFull(code4) {
      return factoryLabel.call(self2, effects, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(code4);
    }
    function referenceFullAfter(code4) {
      return self2.parser.defined.includes(normalizeIdentifier(self2.sliceSerialize(self2.events[self2.events.length - 1][1]).slice(1, -1))) ? ok3(code4) : nok(code4);
    }
    function referenceFullMissing(code4) {
      return nok(code4);
    }
  }
  function tokenizeReferenceCollapsed(effects, ok3, nok) {
    return referenceCollapsedStart;
    function referenceCollapsedStart(code4) {
      effects.enter("reference");
      effects.enter("referenceMarker");
      effects.consume(code4);
      effects.exit("referenceMarker");
      return referenceCollapsedOpen;
    }
    function referenceCollapsedOpen(code4) {
      if (code4 === 93) {
        effects.enter("referenceMarker");
        effects.consume(code4);
        effects.exit("referenceMarker");
        effects.exit("reference");
        return ok3;
      }
      return nok(code4);
    }
  }
  var labelEnd, resourceConstruct, referenceFullConstruct, referenceCollapsedConstruct;
  var init_label_end = __esm({
    "node_modules/micromark-core-commonmark/lib/label-end.js"() {
      init_micromark_factory_destination();
      init_micromark_factory_label();
      init_micromark_factory_title();
      init_micromark_factory_whitespace();
      init_micromark_util_character();
      init_micromark_util_chunked();
      init_micromark_util_normalize_identifier();
      init_micromark_util_resolve_all();
      labelEnd = {
        name: "labelEnd",
        resolveAll: resolveAllLabelEnd,
        resolveTo: resolveToLabelEnd,
        tokenize: tokenizeLabelEnd
      };
      resourceConstruct = {
        tokenize: tokenizeResource
      };
      referenceFullConstruct = {
        tokenize: tokenizeReferenceFull
      };
      referenceCollapsedConstruct = {
        tokenize: tokenizeReferenceCollapsed
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/label-start-image.js
  function tokenizeLabelStartImage(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      effects.enter("labelImage");
      effects.enter("labelImageMarker");
      effects.consume(code4);
      effects.exit("labelImageMarker");
      return open;
    }
    function open(code4) {
      if (code4 === 91) {
        effects.enter("labelMarker");
        effects.consume(code4);
        effects.exit("labelMarker");
        effects.exit("labelImage");
        return after;
      }
      return nok(code4);
    }
    function after(code4) {
      return code4 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code4) : ok3(code4);
    }
  }
  var labelStartImage;
  var init_label_start_image = __esm({
    "node_modules/micromark-core-commonmark/lib/label-start-image.js"() {
      init_label_end();
      labelStartImage = {
        name: "labelStartImage",
        resolveAll: labelEnd.resolveAll,
        tokenize: tokenizeLabelStartImage
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/label-start-link.js
  function tokenizeLabelStartLink(effects, ok3, nok) {
    const self2 = this;
    return start;
    function start(code4) {
      effects.enter("labelLink");
      effects.enter("labelMarker");
      effects.consume(code4);
      effects.exit("labelMarker");
      effects.exit("labelLink");
      return after;
    }
    function after(code4) {
      return code4 === 94 && "_hiddenFootnoteSupport" in self2.parser.constructs ? nok(code4) : ok3(code4);
    }
  }
  var labelStartLink;
  var init_label_start_link = __esm({
    "node_modules/micromark-core-commonmark/lib/label-start-link.js"() {
      init_label_end();
      labelStartLink = {
        name: "labelStartLink",
        resolveAll: labelEnd.resolveAll,
        tokenize: tokenizeLabelStartLink
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/line-ending.js
  function tokenizeLineEnding(effects, ok3) {
    return start;
    function start(code4) {
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      return factorySpace(effects, ok3, "linePrefix");
    }
  }
  var lineEnding;
  var init_line_ending = __esm({
    "node_modules/micromark-core-commonmark/lib/line-ending.js"() {
      init_micromark_factory_space();
      lineEnding = {
        name: "lineEnding",
        tokenize: tokenizeLineEnding
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/thematic-break.js
  function tokenizeThematicBreak(effects, ok3, nok) {
    let size = 0;
    let marker;
    return start;
    function start(code4) {
      effects.enter("thematicBreak");
      return before(code4);
    }
    function before(code4) {
      marker = code4;
      return atBreak(code4);
    }
    function atBreak(code4) {
      if (code4 === marker) {
        effects.enter("thematicBreakSequence");
        return sequence(code4);
      }
      if (size >= 3 && (code4 === null || markdownLineEnding(code4))) {
        effects.exit("thematicBreak");
        return ok3(code4);
      }
      return nok(code4);
    }
    function sequence(code4) {
      if (code4 === marker) {
        effects.consume(code4);
        size++;
        return sequence;
      }
      effects.exit("thematicBreakSequence");
      return markdownSpace(code4) ? factorySpace(effects, atBreak, "whitespace")(code4) : atBreak(code4);
    }
  }
  var thematicBreak;
  var init_thematic_break = __esm({
    "node_modules/micromark-core-commonmark/lib/thematic-break.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      thematicBreak = {
        name: "thematicBreak",
        tokenize: tokenizeThematicBreak
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/list.js
  function tokenizeListStart(effects, ok3, nok) {
    const self2 = this;
    const tail = self2.events[self2.events.length - 1];
    let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size = 0;
    return start;
    function start(code4) {
      const kind = self2.containerState.type || (code4 === 42 || code4 === 43 || code4 === 45 ? "listUnordered" : "listOrdered");
      if (kind === "listUnordered" ? !self2.containerState.marker || code4 === self2.containerState.marker : asciiDigit(code4)) {
        if (!self2.containerState.type) {
          self2.containerState.type = kind;
          effects.enter(kind, {
            _container: true
          });
        }
        if (kind === "listUnordered") {
          effects.enter("listItemPrefix");
          return code4 === 42 || code4 === 45 ? effects.check(thematicBreak, nok, atMarker)(code4) : atMarker(code4);
        }
        if (!self2.interrupt || code4 === 49) {
          effects.enter("listItemPrefix");
          effects.enter("listItemValue");
          return inside(code4);
        }
      }
      return nok(code4);
    }
    function inside(code4) {
      if (asciiDigit(code4) && ++size < 10) {
        effects.consume(code4);
        return inside;
      }
      if ((!self2.interrupt || size < 2) && (self2.containerState.marker ? code4 === self2.containerState.marker : code4 === 41 || code4 === 46)) {
        effects.exit("listItemValue");
        return atMarker(code4);
      }
      return nok(code4);
    }
    function atMarker(code4) {
      effects.enter("listItemMarker");
      effects.consume(code4);
      effects.exit("listItemMarker");
      self2.containerState.marker = self2.containerState.marker || code4;
      return effects.check(
        blankLine,
        // Can’t be empty when interrupting.
        self2.interrupt ? nok : onBlank,
        effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix)
      );
    }
    function onBlank(code4) {
      self2.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code4);
    }
    function otherPrefix(code4) {
      if (markdownSpace(code4)) {
        effects.enter("listItemPrefixWhitespace");
        effects.consume(code4);
        effects.exit("listItemPrefixWhitespace");
        return endOfPrefix;
      }
      return nok(code4);
    }
    function endOfPrefix(code4) {
      self2.containerState.size = initialSize + self2.sliceSerialize(effects.exit("listItemPrefix"), true).length;
      return ok3(code4);
    }
  }
  function tokenizeListContinuation(effects, ok3, nok) {
    const self2 = this;
    self2.containerState._closeFlow = void 0;
    return effects.check(blankLine, onBlank, notBlank);
    function onBlank(code4) {
      self2.containerState.furtherBlankLines = self2.containerState.furtherBlankLines || self2.containerState.initialBlankLine;
      return factorySpace(effects, ok3, "listItemIndent", self2.containerState.size + 1)(code4);
    }
    function notBlank(code4) {
      if (self2.containerState.furtherBlankLines || !markdownSpace(code4)) {
        self2.containerState.furtherBlankLines = void 0;
        self2.containerState.initialBlankLine = void 0;
        return notInCurrentItem(code4);
      }
      self2.containerState.furtherBlankLines = void 0;
      self2.containerState.initialBlankLine = void 0;
      return effects.attempt(indentConstruct, ok3, notInCurrentItem)(code4);
    }
    function notInCurrentItem(code4) {
      self2.containerState._closeFlow = true;
      self2.interrupt = void 0;
      return factorySpace(effects, effects.attempt(list, ok3, nok), "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
    }
  }
  function tokenizeIndent(effects, ok3, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "listItemIndent", self2.containerState.size + 1);
    function afterPrefix(code4) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self2.containerState.size ? ok3(code4) : nok(code4);
    }
  }
  function tokenizeListEnd(effects) {
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok3, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "listItemPrefixWhitespace", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1);
    function afterPrefix(code4) {
      const tail = self2.events[self2.events.length - 1];
      return !markdownSpace(code4) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok3(code4) : nok(code4);
    }
  }
  var list, listItemPrefixWhitespaceConstruct, indentConstruct;
  var init_list = __esm({
    "node_modules/micromark-core-commonmark/lib/list.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_blank_line();
      init_thematic_break();
      list = {
        continuation: {
          tokenize: tokenizeListContinuation
        },
        exit: tokenizeListEnd,
        name: "list",
        tokenize: tokenizeListStart
      };
      listItemPrefixWhitespaceConstruct = {
        partial: true,
        tokenize: tokenizeListItemPrefixWhitespace
      };
      indentConstruct = {
        partial: true,
        tokenize: tokenizeIndent
      };
    }
  });

  // node_modules/micromark-core-commonmark/lib/setext-underline.js
  function resolveToSetextUnderline(events, context) {
    let index2 = events.length;
    let content3;
    let text9;
    let definition3;
    while (index2--) {
      if (events[index2][0] === "enter") {
        if (events[index2][1].type === "content") {
          content3 = index2;
          break;
        }
        if (events[index2][1].type === "paragraph") {
          text9 = index2;
        }
      } else {
        if (events[index2][1].type === "content") {
          events.splice(index2, 1);
        }
        if (!definition3 && events[index2][1].type === "definition") {
          definition3 = index2;
        }
      }
    }
    const heading3 = {
      type: "setextHeading",
      start: {
        ...events[content3][1].start
      },
      end: {
        ...events[events.length - 1][1].end
      }
    };
    events[text9][1].type = "setextHeadingText";
    if (definition3) {
      events.splice(text9, 0, ["enter", heading3, context]);
      events.splice(definition3 + 1, 0, ["exit", events[content3][1], context]);
      events[content3][1].end = {
        ...events[definition3][1].end
      };
    } else {
      events[content3][1] = heading3;
    }
    events.push(["exit", heading3, context]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok3, nok) {
    const self2 = this;
    let marker;
    return start;
    function start(code4) {
      let index2 = self2.events.length;
      let paragraph3;
      while (index2--) {
        if (self2.events[index2][1].type !== "lineEnding" && self2.events[index2][1].type !== "linePrefix" && self2.events[index2][1].type !== "content") {
          paragraph3 = self2.events[index2][1].type === "paragraph";
          break;
        }
      }
      if (!self2.parser.lazy[self2.now().line] && (self2.interrupt || paragraph3)) {
        effects.enter("setextHeadingLine");
        marker = code4;
        return before(code4);
      }
      return nok(code4);
    }
    function before(code4) {
      effects.enter("setextHeadingLineSequence");
      return inside(code4);
    }
    function inside(code4) {
      if (code4 === marker) {
        effects.consume(code4);
        return inside;
      }
      effects.exit("setextHeadingLineSequence");
      return markdownSpace(code4) ? factorySpace(effects, after, "lineSuffix")(code4) : after(code4);
    }
    function after(code4) {
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("setextHeadingLine");
        return ok3(code4);
      }
      return nok(code4);
    }
  }
  var setextUnderline;
  var init_setext_underline = __esm({
    "node_modules/micromark-core-commonmark/lib/setext-underline.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      setextUnderline = {
        name: "setextUnderline",
        resolveTo: resolveToSetextUnderline,
        tokenize: tokenizeSetextUnderline
      };
    }
  });

  // node_modules/micromark-core-commonmark/index.js
  var init_micromark_core_commonmark = __esm({
    "node_modules/micromark-core-commonmark/index.js"() {
      init_attention();
      init_autolink();
      init_blank_line();
      init_block_quote();
      init_character_escape();
      init_character_reference();
      init_code_fenced();
      init_code_indented();
      init_code_text();
      init_content2();
      init_definition();
      init_hard_break_escape();
      init_heading_atx();
      init_html_flow();
      init_html_text();
      init_label_end();
      init_label_start_image();
      init_label_start_link();
      init_line_ending();
      init_list();
      init_setext_underline();
      init_thematic_break();
    }
  });

  // node_modules/micromark/lib/initialize/flow.js
  function initializeFlow(effects) {
    const self2 = this;
    const initial = effects.attempt(
      // Try to parse a blank line.
      blankLine,
      atBlankEnding,
      // Try to parse initial flow (essentially, only code).
      effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), "linePrefix"))
    );
    return initial;
    function atBlankEnding(code4) {
      if (code4 === null) {
        effects.consume(code4);
        return;
      }
      effects.enter("lineEndingBlank");
      effects.consume(code4);
      effects.exit("lineEndingBlank");
      self2.currentConstruct = void 0;
      return initial;
    }
    function afterConstruct(code4) {
      if (code4 === null) {
        effects.consume(code4);
        return;
      }
      effects.enter("lineEnding");
      effects.consume(code4);
      effects.exit("lineEnding");
      self2.currentConstruct = void 0;
      return initial;
    }
  }
  var flow;
  var init_flow = __esm({
    "node_modules/micromark/lib/initialize/flow.js"() {
      init_micromark_core_commonmark();
      init_micromark_factory_space();
      flow = {
        tokenize: initializeFlow
      };
    }
  });

  // node_modules/micromark/lib/initialize/text.js
  function initializeFactory(field) {
    return {
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : void 0),
      tokenize: initializeText
    };
    function initializeText(effects) {
      const self2 = this;
      const constructs2 = this.parser.constructs[field];
      const text9 = effects.attempt(constructs2, start, notText);
      return start;
      function start(code4) {
        return atBreak(code4) ? text9(code4) : notText(code4);
      }
      function notText(code4) {
        if (code4 === null) {
          effects.consume(code4);
          return;
        }
        effects.enter("data");
        effects.consume(code4);
        return data;
      }
      function data(code4) {
        if (atBreak(code4)) {
          effects.exit("data");
          return text9(code4);
        }
        effects.consume(code4);
        return data;
      }
      function atBreak(code4) {
        if (code4 === null) {
          return true;
        }
        const list4 = constructs2[code4];
        let index2 = -1;
        if (list4) {
          while (++index2 < list4.length) {
            const item = list4[index2];
            if (!item.previous || item.previous.call(self2, self2.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      let index2 = -1;
      let enter;
      while (++index2 <= events.length) {
        if (enter === void 0) {
          if (events[index2] && events[index2][1].type === "data") {
            enter = index2;
            index2++;
          }
        } else if (!events[index2] || events[index2][1].type !== "data") {
          if (index2 !== enter + 2) {
            events[enter][1].end = events[index2 - 1][1].end;
            events.splice(enter + 2, index2 - enter - 2);
            index2 = enter + 2;
          }
          enter = void 0;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index2 = chunks.length;
        let bufferIndex = -1;
        let size = 0;
        let tabs;
        while (index2--) {
          const chunk = chunks[index2];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === 32) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex) break;
            bufferIndex = -1;
          } else if (chunk === -2) {
            tabs = true;
            size++;
          } else if (chunk === -1) {
          } else {
            index2++;
            break;
          }
        }
        if (context._contentTypeTextTrailing && eventIndex === events.length) {
          size = 0;
        }
        if (size) {
          const token = {
            type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
            start: {
              _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex,
              _index: data.start._index + index2,
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size
            },
            end: {
              ...data.end
            }
          };
          data.end = {
            ...token.start
          };
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  var resolver, string, text;
  var init_text = __esm({
    "node_modules/micromark/lib/initialize/text.js"() {
      resolver = {
        resolveAll: createResolver()
      };
      string = initializeFactory("string");
      text = initializeFactory("text");
    }
  });

  // node_modules/micromark/lib/constructs.js
  var constructs_exports = {};
  __export(constructs_exports, {
    attentionMarkers: () => attentionMarkers,
    contentInitial: () => contentInitial,
    disable: () => disable,
    document: () => document3,
    flow: () => flow2,
    flowInitial: () => flowInitial,
    insideSpan: () => insideSpan,
    string: () => string2,
    text: () => text2
  });
  var document3, contentInitial, flowInitial, flow2, string2, text2, insideSpan, attentionMarkers, disable;
  var init_constructs = __esm({
    "node_modules/micromark/lib/constructs.js"() {
      init_micromark_core_commonmark();
      init_text();
      document3 = {
        [42]: list,
        [43]: list,
        [45]: list,
        [48]: list,
        [49]: list,
        [50]: list,
        [51]: list,
        [52]: list,
        [53]: list,
        [54]: list,
        [55]: list,
        [56]: list,
        [57]: list,
        [62]: blockQuote
      };
      contentInitial = {
        [91]: definition
      };
      flowInitial = {
        [-2]: codeIndented,
        [-1]: codeIndented,
        [32]: codeIndented
      };
      flow2 = {
        [35]: headingAtx,
        [42]: thematicBreak,
        [45]: [setextUnderline, thematicBreak],
        [60]: htmlFlow,
        [61]: setextUnderline,
        [95]: thematicBreak,
        [96]: codeFenced,
        [126]: codeFenced
      };
      string2 = {
        [38]: characterReference,
        [92]: characterEscape
      };
      text2 = {
        [-5]: lineEnding,
        [-4]: lineEnding,
        [-3]: lineEnding,
        [33]: labelStartImage,
        [38]: characterReference,
        [42]: attention,
        [60]: [autolink, htmlText],
        [91]: labelStartLink,
        [92]: [hardBreakEscape, characterEscape],
        [93]: labelEnd,
        [95]: attention,
        [96]: codeText
      };
      insideSpan = {
        null: [attention, resolver]
      };
      attentionMarkers = {
        null: [42, 95]
      };
      disable = {
        null: []
      };
    }
  });

  // node_modules/micromark/lib/create-tokenizer.js
  function createTokenizer(parser, initialize, from) {
    let point5 = {
      _bufferIndex: -1,
      _index: 0,
      line: from && from.line || 1,
      column: from && from.column || 1,
      offset: from && from.offset || 0
    };
    const columnStart = {};
    const resolveAllConstructs = [];
    let chunks = [];
    let stack = [];
    let consumed = true;
    const effects = {
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      consume,
      enter,
      exit: exit3,
      interrupt: constructFactory(onsuccessfulcheck, {
        interrupt: true
      })
    };
    const context = {
      code: null,
      containerState: {},
      defineSkip,
      events: [],
      now,
      parser,
      previous: null,
      sliceSerialize,
      sliceStream,
      write
    };
    let state = initialize.tokenize.call(context, effects);
    let expectedCode;
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;
    function write(slice) {
      chunks = push(chunks, slice);
      main();
      if (chunks[chunks.length - 1] !== null) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      const {
        _bufferIndex,
        _index,
        line,
        column,
        offset
      } = point5;
      return {
        _bufferIndex,
        _index,
        line,
        column,
        offset
      };
    }
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
    }
    function main() {
      let chunkIndex;
      while (point5._index < chunks.length) {
        const chunk = chunks[point5._index];
        if (typeof chunk === "string") {
          chunkIndex = point5._index;
          if (point5._bufferIndex < 0) {
            point5._bufferIndex = 0;
          }
          while (point5._index === chunkIndex && point5._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point5._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code4) {
      consumed = void 0;
      expectedCode = code4;
      state = state(code4);
    }
    function consume(code4) {
      if (markdownLineEnding(code4)) {
        point5.line++;
        point5.column = 1;
        point5.offset += code4 === -3 ? 2 : 1;
        accountForPotentialSkip();
      } else if (code4 !== -1) {
        point5.column++;
        point5.offset++;
      }
      if (point5._bufferIndex < 0) {
        point5._index++;
      } else {
        point5._bufferIndex++;
        if (point5._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
        // strings.
        /** @type {string} */
        chunks[point5._index].length) {
          point5._bufferIndex = -1;
          point5._index++;
        }
      }
      context.previous = code4;
      consumed = true;
    }
    function enter(type, fields) {
      const token = fields || {};
      token.type = type;
      token.start = now();
      context.events.push(["enter", token, context]);
      stack.push(token);
      return token;
    }
    function exit3(type) {
      const token = stack.pop();
      token.end = now();
      context.events.push(["exit", token, context]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(_, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs2, returnState, bogusState) {
        let listOfConstructs;
        let constructIndex;
        let currentConstruct;
        let info;
        return Array.isArray(constructs2) ? (
          /* c8 ignore next 1 */
          handleListOfConstructs(constructs2)
        ) : "tokenize" in constructs2 ? (
          // Looks like a construct.
          handleListOfConstructs([
            /** @type {Construct} */
            constructs2
          ])
        ) : handleMapOfConstructs(constructs2);
        function handleMapOfConstructs(map3) {
          return start;
          function start(code4) {
            const left = code4 !== null && map3[code4];
            const all6 = code4 !== null && map3.null;
            const list4 = [
              // To do: add more extension tests.
              /* c8 ignore next 2 */
              ...Array.isArray(left) ? left : left ? [left] : [],
              ...Array.isArray(all6) ? all6 : all6 ? [all6] : []
            ];
            return handleListOfConstructs(list4)(code4);
          }
        }
        function handleListOfConstructs(list4) {
          listOfConstructs = list4;
          constructIndex = 0;
          if (list4.length === 0) {
            return bogusState;
          }
          return handleConstruct(list4[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code4) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok(code4);
            }
            return construct.tokenize.call(
              // If we do have fields, create an object w/ `context` as its
              // prototype.
              // This allows a “live binding”, which is needed for `interrupt`.
              fields ? Object.assign(Object.create(context), fields) : context,
              effects,
              ok3,
              nok
            )(code4);
          }
        }
        function ok3(code4) {
          consumed = true;
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code4) {
          consumed = true;
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
    }
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return {
        from: startEventsIndex,
        restore
      };
      function restore() {
        point5 = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
      }
    }
    function accountForPotentialSkip() {
      if (point5.line in columnStart && point5.column < 2) {
        point5.column = columnStart[point5.line];
        point5.offset += columnStart[point5.line] - 1;
      }
    }
  }
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    let view;
    if (startIndex === endIndex) {
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        const head2 = view[0];
        if (typeof head2 === "string") {
          view[0] = head2.slice(startBufferIndex);
        } else {
          view.shift();
        }
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  function serializeChunks(chunks, expandTabs) {
    let index2 = -1;
    const result = [];
    let atTab;
    while (++index2 < chunks.length) {
      const chunk = chunks[index2];
      let value;
      if (typeof chunk === "string") {
        value = chunk;
      } else switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab) continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
      atTab = chunk === -2;
      result.push(value);
    }
    return result.join("");
  }
  var init_create_tokenizer = __esm({
    "node_modules/micromark/lib/create-tokenizer.js"() {
      init_micromark_util_character();
      init_micromark_util_chunked();
      init_micromark_util_resolve_all();
    }
  });

  // node_modules/micromark/lib/parse.js
  function parse(options) {
    const settings = options || {};
    const constructs2 = (
      /** @type {FullNormalizedExtension} */
      combineExtensions([constructs_exports, ...settings.extensions || []])
    );
    const parser = {
      constructs: constructs2,
      content: create2(content),
      defined: [],
      document: create2(document2),
      flow: create2(flow),
      lazy: {},
      string: create2(string),
      text: create2(text)
    };
    return parser;
    function create2(initial) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }
  var init_parse = __esm({
    "node_modules/micromark/lib/parse.js"() {
      init_micromark_util_combine_extensions();
      init_content();
      init_document();
      init_flow();
      init_text();
      init_constructs();
      init_create_tokenizer();
    }
  });

  // node_modules/micromark/lib/postprocess.js
  function postprocess(events) {
    while (!subtokenize(events)) {
    }
    return events;
  }
  var init_postprocess = __esm({
    "node_modules/micromark/lib/postprocess.js"() {
      init_micromark_util_subtokenize();
    }
  });

  // node_modules/micromark/lib/preprocess.js
  function preprocess() {
    let column = 1;
    let buffer = "";
    let start = true;
    let atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      const chunks = [];
      let match;
      let next2;
      let startPosition;
      let endPosition;
      let code4;
      value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || void 0).decode(value));
      startPosition = 0;
      buffer = "";
      if (start) {
        if (value.charCodeAt(0) === 65279) {
          startPosition++;
        }
        start = void 0;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match && match.index !== void 0 ? match.index : value.length;
        code4 = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code4 === 10 && startPosition === endPosition && atCarriageReturn) {
          chunks.push(-3);
          atCarriageReturn = void 0;
        } else {
          if (atCarriageReturn) {
            chunks.push(-5);
            atCarriageReturn = void 0;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code4) {
            case 0: {
              chunks.push(65533);
              column++;
              break;
            }
            case 9: {
              next2 = Math.ceil(column / 4) * 4;
              chunks.push(-2);
              while (column++ < next2) chunks.push(-1);
              break;
            }
            case 10: {
              chunks.push(-4);
              column = 1;
              break;
            }
            default: {
              atCarriageReturn = true;
              column = 1;
            }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn) chunks.push(-5);
        if (buffer) chunks.push(buffer);
        chunks.push(null);
      }
      return chunks;
    }
  }
  var search;
  var init_preprocess = __esm({
    "node_modules/micromark/lib/preprocess.js"() {
      search = /[\0\t\n\r]/g;
    }
  });

  // node_modules/micromark/index.js
  var init_micromark = __esm({
    "node_modules/micromark/index.js"() {
      init_parse();
      init_postprocess();
      init_preprocess();
    }
  });

  // node_modules/micromark-util-decode-string/index.js
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }
  function decode($0, $1, $2) {
    if ($1) {
      return $1;
    }
    const head2 = $2.charCodeAt(0);
    if (head2 === 35) {
      const head3 = $2.charCodeAt(1);
      const hex = head3 === 120 || head3 === 88;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
    }
    return decodeNamedCharacterReference($2) || $0;
  }
  var characterEscapeOrReference;
  var init_micromark_util_decode_string = __esm({
    "node_modules/micromark-util-decode-string/index.js"() {
      init_index_dom();
      init_micromark_util_decode_numeric_character_reference();
      characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
    }
  });

  // node_modules/mdast-util-from-markdown/lib/index.js
  function fromMarkdown(value, encoding, options) {
    if (encoding && typeof encoding === "object") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
  }
  function compiler(options) {
    const config = {
      transforms: [],
      canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
      enter: {
        autolink: opener(link3),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading3),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText2, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition3),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis3),
        hardBreakEscape: opener(hardBreak3),
        hardBreakTrailing: opener(hardBreak3),
        htmlFlow: opener(html7, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html7, buffer),
        htmlTextData: onenterdata,
        image: opener(image3),
        label: buffer,
        link: opener(link3),
        listItem: opener(listItem3),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list4, onenterlistordered),
        listUnordered: opener(list4),
        paragraph: opener(paragraph3),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading3),
        strong: opener(strong3),
        thematicBreak: opener(thematicBreak4)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        characterReference: onexitcharacterreference,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    };
    configure(config, (options || {}).mdastExtensions || []);
    const data = {};
    return compile;
    function compile(events) {
      let tree = {
        type: "root",
        children: []
      };
      const context = {
        stack: [tree],
        tokenStack: [],
        config,
        enter,
        exit: exit3,
        buffer,
        resume,
        data
      };
      const listStack = [];
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
          if (events[index2][0] === "enter") {
            listStack.push(index2);
          } else {
            const tail = listStack.pop();
            index2 = prepareList(events, tail, index2);
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        const handler = config[events[index2][0]];
        if (own2.call(handler, events[index2][1].type)) {
          handler[events[index2][1].type].call(Object.assign({
            sliceSerialize: events[index2][2].sliceSerialize
          }, context), events[index2][1]);
        }
      }
      if (context.tokenStack.length > 0) {
        const tail = context.tokenStack[context.tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, void 0, tail[0]);
      }
      tree.position = {
        start: point2(events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }),
        end: point2(events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        })
      };
      index2 = -1;
      while (++index2 < config.transforms.length) {
        tree = config.transforms[index2](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      let index2 = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      let listItem4;
      let lineIndex;
      let firstBlankLineIndex;
      let atMarker;
      while (++index2 <= length) {
        const event = events[index2];
        switch (event[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote": {
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
            atMarker = void 0;
            break;
          }
          case "lineEndingBlank": {
            if (event[0] === "enter") {
              if (listItem4 && !atMarker && !containerBalance && !firstBlankLineIndex) {
                firstBlankLineIndex = index2;
              }
              atMarker = void 0;
            }
            break;
          }
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace": {
            break;
          }
          default: {
            atMarker = void 0;
          }
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
          if (listItem4) {
            let tailIndex = index2;
            lineIndex = void 0;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
                if (tailEvent[0] === "exit") continue;
                if (lineIndex) {
                  events[lineIndex][1].type = "lineEndingBlank";
                  listSpread = true;
                }
                tailEvent[1].type = "lineEnding";
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
              } else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem4._spread = true;
            }
            listItem4.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index2, 0, ["exit", listItem4, event[2]]);
            index2++;
            length++;
          }
          if (event[1].type === "listItemPrefix") {
            const item = {
              type: "listItem",
              _spread: false,
              start: Object.assign({}, event[1].start),
              // @ts-expect-error: we’ll add `end` in a second.
              end: void 0
            };
            listItem4 = item;
            events.splice(index2, 0, ["enter", item, event[2]]);
            index2++;
            length++;
            firstBlankLineIndex = void 0;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function opener(create2, and) {
      return open;
      function open(token) {
        enter.call(this, create2(token), token);
        if (and) and.call(this, token);
      }
    }
    function buffer() {
      this.stack.push({
        type: "fragment",
        children: []
      });
    }
    function enter(node2, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      const siblings2 = parent.children;
      siblings2.push(node2);
      this.stack.push(node2);
      this.tokenStack.push([token, errorHandler || void 0]);
      node2.position = {
        start: point2(token.start),
        // @ts-expect-error: `end` will be patched later.
        end: void 0
      };
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and) and.call(this, token);
        exit3.call(this, token);
      }
    }
    function exit3(token, onExitError) {
      const node2 = this.stack.pop();
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open");
      } else if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      node2.position.end = point2(token.end);
    }
    function resume() {
      return toString(this.stack.pop());
    }
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }
    function onenterlistitemvalue(token) {
      if (this.data.expectingFirstListItemValue) {
        const ancestor = this.stack[this.stack.length - 2];
        ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
        this.data.expectingFirstListItemValue = void 0;
      }
    }
    function onexitcodefencedfenceinfo() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.lang = data2;
    }
    function onexitcodefencedfencemeta() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.meta = data2;
    }
    function onexitcodefencedfence() {
      if (this.data.flowCodeInside) return;
      this.buffer();
      this.data.flowCodeInside = true;
    }
    function onexitcodefenced() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      this.data.flowCodeInside = void 0;
    }
    function onexitcodeindented() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitdefinitiondestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitatxheadingsequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      if (!node2.depth) {
        const depth = this.sliceSerialize(token).length;
        node2.depth = depth;
      }
    }
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }
    function onexitsetextheadinglinesequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      node2.depth = this.sliceSerialize(token).codePointAt(0) === 61 ? 1 : 2;
    }
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function onenterdata(token) {
      const node2 = this.stack[this.stack.length - 1];
      const siblings2 = node2.children;
      let tail = siblings2[siblings2.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text9();
        tail.position = {
          start: point2(token.start),
          // @ts-expect-error: we’ll add `end` later.
          end: void 0
        };
        siblings2.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      const tail = this.stack.pop();
      tail.value += this.sliceSerialize(token);
      tail.position.end = point2(token.end);
    }
    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      if (this.data.atHardBreak) {
        const tail = context.children[context.children.length - 1];
        tail.position.end = point2(token.end);
        this.data.atHardBreak = void 0;
        return;
      }
      if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      this.data.atHardBreak = true;
    }
    function onexithtmlflow() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexithtmltext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitcodetext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.value = data2;
    }
    function onexitlink() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitimage() {
      const node2 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = void 0;
    }
    function onexitlabeltext(token) {
      const string3 = this.sliceSerialize(token);
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.label = decodeString(string3);
      ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
    }
    function onexitlabel() {
      const fragment2 = this.stack[this.stack.length - 1];
      const value = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      this.data.inReference = true;
      if (node2.type === "link") {
        const children = fragment2.children;
        node2.children = children;
      } else {
        node2.alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.url = data2;
    }
    function onexitresourcetitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.title = data2;
    }
    function onexitresource() {
      this.data.inReference = void 0;
    }
    function onenterreference() {
      this.data.referenceType = "collapsed";
    }
    function onexitreferencestring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      this.data.referenceType = "full";
    }
    function onexitcharacterreferencemarker(token) {
      this.data.characterReferenceType = token.type;
    }
    function onexitcharacterreferencevalue(token) {
      const data2 = this.sliceSerialize(token);
      const type = this.data.characterReferenceType;
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data2, type === "characterReferenceMarkerNumeric" ? 10 : 16);
        this.data.characterReferenceType = void 0;
      } else {
        const result = decodeNamedCharacterReference(data2);
        value = result;
      }
      const tail = this.stack[this.stack.length - 1];
      tail.value += value;
    }
    function onexitcharacterreference(token) {
      const tail = this.stack.pop();
      tail.position.end = point2(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      node2.url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote2() {
      return {
        type: "blockquote",
        children: []
      };
    }
    function codeFlow() {
      return {
        type: "code",
        lang: null,
        meta: null,
        value: ""
      };
    }
    function codeText2() {
      return {
        type: "inlineCode",
        value: ""
      };
    }
    function definition3() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis3() {
      return {
        type: "emphasis",
        children: []
      };
    }
    function heading3() {
      return {
        type: "heading",
        // @ts-expect-error `depth` will be set later.
        depth: 0,
        children: []
      };
    }
    function hardBreak3() {
      return {
        type: "break"
      };
    }
    function html7() {
      return {
        type: "html",
        value: ""
      };
    }
    function image3() {
      return {
        type: "image",
        title: null,
        url: "",
        alt: null
      };
    }
    function link3() {
      return {
        type: "link",
        title: null,
        url: "",
        children: []
      };
    }
    function list4(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem3(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph3() {
      return {
        type: "paragraph",
        children: []
      };
    }
    function strong3() {
      return {
        type: "strong",
        children: []
      };
    }
    function text9() {
      return {
        type: "text",
        value: ""
      };
    }
    function thematicBreak4() {
      return {
        type: "thematicBreak"
      };
    }
  }
  function point2(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function configure(combined, extensions) {
    let index2 = -1;
    while (++index2 < extensions.length) {
      const value = extensions[index2];
      if (Array.isArray(value)) {
        configure(combined, value);
      } else {
        extension(combined, value);
      }
    }
  }
  function extension(combined, extension2) {
    let key2;
    for (key2 in extension2) {
      if (own2.call(extension2, key2)) {
        switch (key2) {
          case "canContainEols": {
            const right = extension2[key2];
            if (right) {
              combined[key2].push(...right);
            }
            break;
          }
          case "transforms": {
            const right = extension2[key2];
            if (right) {
              combined[key2].push(...right);
            }
            break;
          }
          case "enter":
          case "exit": {
            const right = extension2[key2];
            if (right) {
              Object.assign(combined[key2], right);
            }
            break;
          }
        }
      }
    }
  }
  function defaultOnError(left, right) {
    if (left) {
      throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open");
    } else {
      throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open");
    }
  }
  var own2;
  var init_lib7 = __esm({
    "node_modules/mdast-util-from-markdown/lib/index.js"() {
      init_mdast_util_to_string();
      init_micromark();
      init_micromark_util_decode_numeric_character_reference();
      init_micromark_util_decode_string();
      init_micromark_util_normalize_identifier();
      init_index_dom();
      init_unist_util_stringify_position();
      own2 = {}.hasOwnProperty;
    }
  });

  // node_modules/mdast-util-from-markdown/index.js
  var init_mdast_util_from_markdown = __esm({
    "node_modules/mdast-util-from-markdown/index.js"() {
      init_lib7();
    }
  });

  // node_modules/remark-parse/lib/index.js
  function remarkParse(options) {
    const self2 = this;
    self2.parser = parser;
    function parser(doc) {
      return fromMarkdown(doc, {
        ...self2.data("settings"),
        ...options,
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self2.data("micromarkExtensions") || [],
        mdastExtensions: self2.data("fromMarkdownExtensions") || []
      });
    }
  }
  var init_lib8 = __esm({
    "node_modules/remark-parse/lib/index.js"() {
      init_mdast_util_from_markdown();
    }
  });

  // node_modules/remark-parse/index.js
  var remark_parse_exports = {};
  __export(remark_parse_exports, {
    default: () => remarkParse
  });
  var init_remark_parse = __esm({
    "node_modules/remark-parse/index.js"() {
      init_lib8();
    }
  });

  // node_modules/ccount/index.js
  function ccount(value, character) {
    const source = String(value);
    if (typeof character !== "string") {
      throw new TypeError("Expected character");
    }
    let count = 0;
    let index2 = source.indexOf(character);
    while (index2 !== -1) {
      count++;
      index2 = source.indexOf(character, index2 + character.length);
    }
    return count;
  }
  var init_ccount = __esm({
    "node_modules/ccount/index.js"() {
    }
  });

  // node_modules/escape-string-regexp/index.js
  function escapeStringRegexp(string3) {
    if (typeof string3 !== "string") {
      throw new TypeError("Expected a string");
    }
    return string3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  var init_escape_string_regexp = __esm({
    "node_modules/escape-string-regexp/index.js"() {
    }
  });

  // node_modules/unist-util-is/lib/index.js
  function anyFactory(tests) {
    const checks2 = [];
    let index2 = -1;
    while (++index2 < tests.length) {
      checks2[index2] = convert(tests[index2]);
    }
    return castFactory(any);
    function any(...parameters) {
      let index3 = -1;
      while (++index3 < checks2.length) {
        if (checks2[index3].apply(this, parameters)) return true;
      }
      return false;
    }
  }
  function propertiesFactory(check) {
    const checkAsRecord = (
      /** @type {Record<string, unknown>} */
      check
    );
    return castFactory(all6);
    function all6(node2) {
      const nodeAsRecord = (
        /** @type {Record<string, unknown>} */
        /** @type {unknown} */
        node2
      );
      let key2;
      for (key2 in check) {
        if (nodeAsRecord[key2] !== checkAsRecord[key2]) return false;
      }
      return true;
    }
  }
  function typeFactory(check) {
    return castFactory(type);
    function type(node2) {
      return node2 && node2.type === check;
    }
  }
  function castFactory(testFunction) {
    return check;
    function check(value, index2, parent) {
      return Boolean(
        looksLikeANode(value) && testFunction.call(
          this,
          value,
          typeof index2 === "number" ? index2 : void 0,
          parent || void 0
        )
      );
    }
  }
  function ok2() {
    return true;
  }
  function looksLikeANode(value) {
    return value !== null && typeof value === "object" && "type" in value;
  }
  var convert;
  var init_lib9 = __esm({
    "node_modules/unist-util-is/lib/index.js"() {
      convert = // Note: overloads in JSDoc can’t yet use different `@template`s.
      /**
       * @type {(
       *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
       *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
       *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
       *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
       *   ((test?: Test) => Check)
       * )}
       */
      /**
       * @param {Test} [test]
       * @returns {Check}
       */
      (function(test) {
        if (test === null || test === void 0) {
          return ok2;
        }
        if (typeof test === "function") {
          return castFactory(test);
        }
        if (typeof test === "object") {
          return Array.isArray(test) ? anyFactory(test) : (
            // Cast because `ReadonlyArray` goes into the above but `isArray`
            // narrows to `Array`.
            propertiesFactory(
              /** @type {Props} */
              test
            )
          );
        }
        if (typeof test === "string") {
          return typeFactory(test);
        }
        throw new Error("Expected function, string, or object as test");
      });
    }
  });

  // node_modules/unist-util-is/index.js
  var init_unist_util_is = __esm({
    "node_modules/unist-util-is/index.js"() {
      init_lib9();
    }
  });

  // node_modules/unist-util-visit-parents/lib/color.js
  function color(d) {
    return d;
  }
  var init_color = __esm({
    "node_modules/unist-util-visit-parents/lib/color.js"() {
    }
  });

  // node_modules/unist-util-visit-parents/lib/index.js
  function visitParents(tree, test, visitor, reverse) {
    let check;
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
    } else {
      check = test;
    }
    const is2 = convert(check);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node2, index2, parents) {
      const value = (
        /** @type {Record<string, unknown>} */
        node2 && typeof node2 === "object" ? node2 : {}
      );
      if (typeof value.type === "string") {
        const name = (
          // `hast`
          typeof value.tagName === "string" ? value.tagName : (
            // `xast`
            typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = empty;
        let subresult;
        let offset;
        let grandparents;
        if (!test || is2(node2, index2, parents[parents.length - 1] || void 0)) {
          result = toResult(visitor(node2, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if ("children" in node2 && node2.children) {
          const nodeAsParent = (
            /** @type {UnistParent} */
            node2
          );
          if (nodeAsParent.children && result[0] !== SKIP) {
            offset = (reverse ? nodeAsParent.children.length : -1) + step;
            grandparents = parents.concat(nodeAsParent);
            while (offset > -1 && offset < nodeAsParent.children.length) {
              const child = nodeAsParent.children[offset];
              subresult = factory(child, offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
        }
        return result;
      }
    }
  }
  function toResult(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE, value];
    }
    return value === null || value === void 0 ? empty : [value];
  }
  var empty, CONTINUE, EXIT, SKIP;
  var init_lib10 = __esm({
    "node_modules/unist-util-visit-parents/lib/index.js"() {
      init_unist_util_is();
      init_color();
      empty = [];
      CONTINUE = true;
      EXIT = false;
      SKIP = "skip";
    }
  });

  // node_modules/unist-util-visit-parents/index.js
  var init_unist_util_visit_parents = __esm({
    "node_modules/unist-util-visit-parents/index.js"() {
      init_lib10();
    }
  });

  // node_modules/mdast-util-find-and-replace/lib/index.js
  function findAndReplace(tree, list4, options) {
    const settings = options || {};
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(list4);
    let pairIndex = -1;
    while (++pairIndex < pairs.length) {
      visitParents(tree, "text", visitor);
    }
    function visitor(node2, parents) {
      let index2 = -1;
      let grandparent;
      while (++index2 < parents.length) {
        const parent = parents[index2];
        const siblings2 = grandparent ? grandparent.children : void 0;
        if (ignored(
          parent,
          siblings2 ? siblings2.indexOf(parent) : void 0,
          grandparent
        )) {
          return;
        }
        grandparent = parent;
      }
      if (grandparent) {
        return handler(node2, parents);
      }
    }
    function handler(node2, parents) {
      const parent = parents[parents.length - 1];
      const find2 = pairs[pairIndex][0];
      const replace2 = pairs[pairIndex][1];
      let start = 0;
      const siblings2 = parent.children;
      const index2 = siblings2.indexOf(node2);
      let change = false;
      let nodes = [];
      find2.lastIndex = 0;
      let match = find2.exec(node2.value);
      while (match) {
        const position4 = match.index;
        const matchObject = {
          index: match.index,
          input: match.input,
          stack: [...parents, node2]
        };
        let value = replace2(...match, matchObject);
        if (typeof value === "string") {
          value = value.length > 0 ? { type: "text", value } : void 0;
        }
        if (value === false) {
          find2.lastIndex = position4 + 1;
        } else {
          if (start !== position4) {
            nodes.push({
              type: "text",
              value: node2.value.slice(start, position4)
            });
          }
          if (Array.isArray(value)) {
            nodes.push(...value);
          } else if (value) {
            nodes.push(value);
          }
          start = position4 + match[0].length;
          change = true;
        }
        if (!find2.global) {
          break;
        }
        match = find2.exec(node2.value);
      }
      if (change) {
        if (start < node2.value.length) {
          nodes.push({ type: "text", value: node2.value.slice(start) });
        }
        parent.children.splice(index2, 1, ...nodes);
      } else {
        nodes = [node2];
      }
      return index2 + nodes.length;
    }
  }
  function toPairs(tupleOrList) {
    const result = [];
    if (!Array.isArray(tupleOrList)) {
      throw new TypeError("Expected find and replace tuple or list of tuples");
    }
    const list4 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
    let index2 = -1;
    while (++index2 < list4.length) {
      const tuple = list4[index2];
      result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
    }
    return result;
  }
  function toExpression(find2) {
    return typeof find2 === "string" ? new RegExp(escapeStringRegexp(find2), "g") : find2;
  }
  function toFunction(replace2) {
    return typeof replace2 === "function" ? replace2 : function() {
      return replace2;
    };
  }
  var init_lib11 = __esm({
    "node_modules/mdast-util-find-and-replace/lib/index.js"() {
      init_escape_string_regexp();
      init_unist_util_visit_parents();
      init_unist_util_is();
    }
  });

  // node_modules/mdast-util-find-and-replace/index.js
  var init_mdast_util_find_and_replace = __esm({
    "node_modules/mdast-util-find-and-replace/index.js"() {
      init_lib11();
    }
  });

  // node_modules/mdast-util-gfm-autolink-literal/lib/index.js
  function gfmAutolinkLiteralFromMarkdown() {
    return {
      transforms: [transformGfmAutolinkLiterals],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    };
  }
  function gfmAutolinkLiteralToMarkdown() {
    return {
      unsafe: [
        {
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ":",
          before: "[ps]",
          after: "\\/",
          inConstruct,
          notInConstruct
        }
      ]
    };
  }
  function enterLiteralAutolink(token) {
    this.enter({ type: "link", title: null, url: "", children: [] }, token);
  }
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "link");
    node2.url = "http://" + this.sliceSerialize(token);
  }
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }
  function exitLiteralAutolink(token) {
    this.exit(token);
  }
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(
      tree,
      [
        [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
        [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
      ],
      { ignore: ["link", "linkReference"] }
    );
  }
  function findUrl(_, protocol, domain2, path2, match) {
    let prefix = "";
    if (!previous2(match)) {
      return false;
    }
    if (/^w/i.test(protocol)) {
      domain2 = protocol + domain2;
      protocol = "";
      prefix = "http://";
    }
    if (!isCorrectDomain(domain2)) {
      return false;
    }
    const parts = splitUrl(domain2 + path2);
    if (!parts[0]) return false;
    const result = {
      type: "link",
      title: null,
      url: prefix + protocol + parts[0],
      children: [{ type: "text", value: protocol + parts[0] }]
    };
    if (parts[1]) {
      return [result, { type: "text", value: parts[1] }];
    }
    return result;
  }
  function findEmail(_, atext, label, match) {
    if (
      // Not an expected previous character.
      !previous2(match, true) || // Label ends in not allowed character.
      /[-\d_]$/.test(label)
    ) {
      return false;
    }
    return {
      type: "link",
      title: null,
      url: "mailto:" + atext + "@" + label,
      children: [{ type: "text", value: atext + "@" + label }]
    };
  }
  function isCorrectDomain(domain2) {
    const parts = domain2.split(".");
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
      return false;
    }
    return true;
  }
  function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
    if (!trailExec) {
      return [url, void 0];
    }
    url = url.slice(0, trailExec.index);
    let trail2 = trailExec[0];
    let closingParenIndex = trail2.indexOf(")");
    const openingParens = ccount(url, "(");
    let closingParens = ccount(url, ")");
    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail2.slice(0, closingParenIndex + 1);
      trail2 = trail2.slice(closingParenIndex + 1);
      closingParenIndex = trail2.indexOf(")");
      closingParens++;
    }
    return [url, trail2];
  }
  function previous2(match, email) {
    const code4 = match.input.charCodeAt(match.index - 1);
    return (match.index === 0 || unicodeWhitespace(code4) || unicodePunctuation(code4)) && // If it’s an email, the previous character should not be a slash.
    (!email || code4 !== 47);
  }
  var inConstruct, notInConstruct;
  var init_lib12 = __esm({
    "node_modules/mdast-util-gfm-autolink-literal/lib/index.js"() {
      init_ccount();
      init_default();
      init_micromark_util_character();
      init_mdast_util_find_and_replace();
      inConstruct = "phrasing";
      notInConstruct = ["autolink", "link", "image", "label"];
    }
  });

  // node_modules/mdast-util-gfm-autolink-literal/index.js
  var init_mdast_util_gfm_autolink_literal = __esm({
    "node_modules/mdast-util-gfm-autolink-literal/index.js"() {
      init_lib12();
    }
  });

  // node_modules/mdast-util-gfm-footnote/lib/index.js
  function enterFootnoteCallString() {
    this.buffer();
  }
  function enterFootnoteCall(token) {
    this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
  }
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }
  function enterFootnoteDefinition(token) {
    this.enter(
      { type: "footnoteDefinition", identifier: "", label: "", children: [] },
      token
    );
  }
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteReference");
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteCall(token) {
    this.exit(token);
  }
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteDefinition");
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }
  function footnoteReferencePeek() {
    return "[";
  }
  function footnoteReference(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit3 = state.enter("footnoteReference");
    const subexit = state.enter("reference");
    value += tracker.move(
      state.safe(state.associationId(node2), { after: "]", before: value })
    );
    subexit();
    exit3();
    value += tracker.move("]");
    return value;
  }
  function gfmFootnoteFromMarkdown() {
    return {
      enter: {
        gfmFootnoteCallString: enterFootnoteCallString,
        gfmFootnoteCall: enterFootnoteCall,
        gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: enterFootnoteDefinition
      },
      exit: {
        gfmFootnoteCallString: exitFootnoteCallString,
        gfmFootnoteCall: exitFootnoteCall,
        gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: exitFootnoteDefinition
      }
    };
  }
  function gfmFootnoteToMarkdown(options) {
    let firstLineBlank = false;
    if (options && options.firstLineBlank) {
      firstLineBlank = true;
    }
    return {
      handlers: { footnoteDefinition, footnoteReference },
      // This is on by default already.
      unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
    };
    function footnoteDefinition(node2, _, state, info) {
      const tracker = state.createTracker(info);
      let value = tracker.move("[^");
      const exit3 = state.enter("footnoteDefinition");
      const subexit = state.enter("label");
      value += tracker.move(
        state.safe(state.associationId(node2), { before: value, after: "]" })
      );
      subexit();
      value += tracker.move("]:");
      if (node2.children && node2.children.length > 0) {
        tracker.shift(4);
        value += tracker.move(
          (firstLineBlank ? "\n" : " ") + state.indentLines(
            state.containerFlow(node2, tracker.current()),
            firstLineBlank ? mapAll : mapExceptFirst
          )
        );
      }
      exit3();
      return value;
    }
  }
  function mapExceptFirst(line, index2, blank) {
    return index2 === 0 ? line : mapAll(line, index2, blank);
  }
  function mapAll(line, index2, blank) {
    return (blank ? "" : "    ") + line;
  }
  var init_lib13 = __esm({
    "node_modules/mdast-util-gfm-footnote/lib/index.js"() {
      init_default();
      init_micromark_util_normalize_identifier();
      footnoteReference.peek = footnoteReferencePeek;
    }
  });

  // node_modules/mdast-util-gfm-footnote/index.js
  var init_mdast_util_gfm_footnote = __esm({
    "node_modules/mdast-util-gfm-footnote/index.js"() {
      init_lib13();
    }
  });

  // node_modules/mdast-util-gfm-strikethrough/lib/index.js
  function gfmStrikethroughFromMarkdown() {
    return {
      canContainEols: ["delete"],
      enter: { strikethrough: enterStrikethrough },
      exit: { strikethrough: exitStrikethrough }
    };
  }
  function gfmStrikethroughToMarkdown() {
    return {
      unsafe: [
        {
          character: "~",
          inConstruct: "phrasing",
          notInConstruct: constructsWithoutStrikethrough
        }
      ],
      handlers: { delete: handleDelete }
    };
  }
  function enterStrikethrough(token) {
    this.enter({ type: "delete", children: [] }, token);
  }
  function exitStrikethrough(token) {
    this.exit(token);
  }
  function handleDelete(node2, _, state, info) {
    const tracker = state.createTracker(info);
    const exit3 = state.enter("strikethrough");
    let value = tracker.move("~~");
    value += state.containerPhrasing(node2, {
      ...tracker.current(),
      before: value,
      after: "~"
    });
    value += tracker.move("~~");
    exit3();
    return value;
  }
  function peekDelete() {
    return "~";
  }
  var constructsWithoutStrikethrough;
  var init_lib14 = __esm({
    "node_modules/mdast-util-gfm-strikethrough/lib/index.js"() {
      constructsWithoutStrikethrough = [
        "autolink",
        "destinationLiteral",
        "destinationRaw",
        "reference",
        "titleQuote",
        "titleApostrophe"
      ];
      handleDelete.peek = peekDelete;
    }
  });

  // node_modules/mdast-util-gfm-strikethrough/index.js
  var init_mdast_util_gfm_strikethrough = __esm({
    "node_modules/mdast-util-gfm-strikethrough/index.js"() {
      init_lib14();
    }
  });

  // node_modules/markdown-table/index.js
  function defaultStringLength(value) {
    return value.length;
  }
  function markdownTable(table2, options) {
    const settings = options || {};
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    const alignments = [];
    const cellMatrix = [];
    const sizeMatrix = [];
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;
    while (++rowIndex < table2.length) {
      const row2 = [];
      const sizes2 = [];
      let columnIndex2 = -1;
      if (table2[rowIndex].length > mostCellsPerRow) {
        mostCellsPerRow = table2[rowIndex].length;
      }
      while (++columnIndex2 < table2[rowIndex].length) {
        const cell = serialize(table2[rowIndex][columnIndex2]);
        if (settings.alignDelimiters !== false) {
          const size = stringLength(cell);
          sizes2[columnIndex2] = size;
          if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
            longestCellByColumn[columnIndex2] = size;
          }
        }
        row2.push(cell);
      }
      cellMatrix[rowIndex] = row2;
      sizeMatrix[rowIndex] = sizes2;
    }
    let columnIndex = -1;
    if (typeof align === "object" && "length" in align) {
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      const code4 = toAlignment(align);
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = code4;
      }
    }
    columnIndex = -1;
    const row = [];
    const sizes = [];
    while (++columnIndex < mostCellsPerRow) {
      const code4 = alignments[columnIndex];
      let before = "";
      let after = "";
      if (code4 === 99) {
        before = ":";
        after = ":";
      } else if (code4 === 108) {
        before = ":";
      } else if (code4 === 114) {
        after = ":";
      }
      let size = settings.alignDelimiters === false ? 1 : Math.max(
        1,
        longestCellByColumn[columnIndex] - before.length - after.length
      );
      const cell = before + "-".repeat(size) + after;
      if (settings.alignDelimiters !== false) {
        size = before.length + size + after.length;
        if (size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }
        sizes[columnIndex] = size;
      }
      row[columnIndex] = cell;
    }
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    const lines = [];
    while (++rowIndex < cellMatrix.length) {
      const row2 = cellMatrix[rowIndex];
      const sizes2 = sizeMatrix[rowIndex];
      columnIndex = -1;
      const line = [];
      while (++columnIndex < mostCellsPerRow) {
        const cell = row2[columnIndex] || "";
        let before = "";
        let after = "";
        if (settings.alignDelimiters !== false) {
          const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
          const code4 = alignments[columnIndex];
          if (code4 === 114) {
            before = " ".repeat(size);
          } else if (code4 === 99) {
            if (size % 2) {
              before = " ".repeat(size / 2 + 0.5);
              after = " ".repeat(size / 2 - 0.5);
            } else {
              before = " ".repeat(size / 2);
              after = before;
            }
          } else {
            after = " ".repeat(size);
          }
        }
        if (settings.delimiterStart !== false && !columnIndex) {
          line.push("|");
        }
        if (settings.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
        // empty: there will be a closing space.
        !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
          line.push(" ");
        }
        if (settings.alignDelimiters !== false) {
          line.push(before);
        }
        line.push(cell);
        if (settings.alignDelimiters !== false) {
          line.push(after);
        }
        if (settings.padding !== false) {
          line.push(" ");
        }
        if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
          line.push("|");
        }
      }
      lines.push(
        settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
      );
    }
    return lines.join("\n");
  }
  function serialize(value) {
    return value === null || value === void 0 ? "" : String(value);
  }
  function toAlignment(value) {
    const code4 = typeof value === "string" ? value.codePointAt(0) : 0;
    return code4 === 67 || code4 === 99 ? 99 : code4 === 76 || code4 === 108 ? 108 : code4 === 82 || code4 === 114 ? 114 : 0;
  }
  var init_markdown_table = __esm({
    "node_modules/markdown-table/index.js"() {
    }
  });

  // node_modules/zwitch/index.js
  function zwitch(key2, options) {
    const settings = options || {};
    function one5(value, ...parameters) {
      let fn = one5.invalid;
      const handlers2 = one5.handlers;
      if (value && own3.call(value, key2)) {
        const id = String(value[key2]);
        fn = own3.call(handlers2, id) ? handlers2[id] : one5.unknown;
      }
      if (fn) {
        return fn.call(this, value, ...parameters);
      }
    }
    one5.handlers = settings.handlers || {};
    one5.invalid = settings.invalid;
    one5.unknown = settings.unknown;
    return one5;
  }
  var own3;
  var init_zwitch = __esm({
    "node_modules/zwitch/index.js"() {
      own3 = {}.hasOwnProperty;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
  function blockquote(node2, _, state, info) {
    const exit3 = state.enter("blockquote");
    const tracker = state.createTracker(info);
    tracker.move("> ");
    tracker.shift(2);
    const value = state.indentLines(
      state.containerFlow(node2, tracker.current()),
      map
    );
    exit3();
    return value;
  }
  function map(line, _, blank) {
    return ">" + (blank ? "" : " ") + line;
  }
  var init_blockquote = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/blockquote.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
  function patternInScope(stack, pattern) {
    return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
  }
  function listInScope(stack, list4, none) {
    if (typeof list4 === "string") {
      list4 = [list4];
    }
    if (!list4 || list4.length === 0) {
      return none;
    }
    let index2 = -1;
    while (++index2 < list4.length) {
      if (stack.includes(list4[index2])) {
        return true;
      }
    }
    return false;
  }
  var init_pattern_in_scope = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/break.js
  function hardBreak(_, _1, state, info) {
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      if (state.unsafe[index2].character === "\n" && patternInScope(state.stack, state.unsafe[index2])) {
        return /[ \t]/.test(info.before) ? "" : " ";
      }
    }
    return "\\\n";
  }
  var init_break = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/break.js"() {
      init_pattern_in_scope();
    }
  });

  // node_modules/longest-streak/index.js
  function longestStreak(value, substring) {
    const source = String(value);
    let index2 = source.indexOf(substring);
    let expected = index2;
    let count = 0;
    let max = 0;
    if (typeof substring !== "string") {
      throw new TypeError("Expected substring");
    }
    while (index2 !== -1) {
      if (index2 === expected) {
        if (++count > max) {
          max = count;
        }
      } else {
        count = 1;
      }
      expected = index2 + substring.length;
      index2 = source.indexOf(substring, expected);
    }
    return max;
  }
  var init_longest_streak = __esm({
    "node_modules/longest-streak/index.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
  function formatCodeAsIndented(node2, state) {
    return Boolean(
      state.options.fences === false && node2.value && // If there’s no info…
      !node2.lang && // And there’s a non-whitespace character…
      /[^ \r\n]/.test(node2.value) && // And the value doesn’t start or end in a blank…
      !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value)
    );
  }
  var init_format_code_as_indented = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-fence.js
  function checkFence(state) {
    const marker = state.options.fence || "`";
    if (marker !== "`" && marker !== "~") {
      throw new Error(
        "Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`"
      );
    }
    return marker;
  }
  var init_check_fence = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-fence.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/code.js
  function code(node2, _, state, info) {
    const marker = checkFence(state);
    const raw3 = node2.value || "";
    const suffix = marker === "`" ? "GraveAccent" : "Tilde";
    if (formatCodeAsIndented(node2, state)) {
      const exit4 = state.enter("codeIndented");
      const value2 = state.indentLines(raw3, map2);
      exit4();
      return value2;
    }
    const tracker = state.createTracker(info);
    const sequence = marker.repeat(Math.max(longestStreak(raw3, marker) + 1, 3));
    const exit3 = state.enter("codeFenced");
    let value = tracker.move(sequence);
    if (node2.lang) {
      const subexit = state.enter(`codeFencedLang${suffix}`);
      value += tracker.move(
        state.safe(node2.lang, {
          before: value,
          after: " ",
          encode: ["`"],
          ...tracker.current()
        })
      );
      subexit();
    }
    if (node2.lang && node2.meta) {
      const subexit = state.enter(`codeFencedMeta${suffix}`);
      value += tracker.move(" ");
      value += tracker.move(
        state.safe(node2.meta, {
          before: value,
          after: "\n",
          encode: ["`"],
          ...tracker.current()
        })
      );
      subexit();
    }
    value += tracker.move("\n");
    if (raw3) {
      value += tracker.move(raw3 + "\n");
    }
    value += tracker.move(sequence);
    exit3();
    return value;
  }
  function map2(line, _, blank) {
    return (blank ? "" : "    ") + line;
  }
  var init_code = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/code.js"() {
      init_longest_streak();
      init_format_code_as_indented();
      init_check_fence();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-quote.js
  function checkQuote(state) {
    const marker = state.options.quote || '"';
    if (marker !== '"' && marker !== "'") {
      throw new Error(
        "Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`"
      );
    }
    return marker;
  }
  var init_check_quote = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-quote.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/definition.js
  function definition2(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit3 = state.enter("definition");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    value += tracker.move(
      state.safe(state.associationId(node2), {
        before: value,
        after: "]",
        ...tracker.current()
      })
    );
    value += tracker.move("]: ");
    subexit();
    if (
      // If there’s no url, or…
      !node2.url || // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : "\n",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    exit3();
    return value;
  }
  var init_definition2 = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/definition.js"() {
      init_check_quote();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
  function checkEmphasis(state) {
    const marker = state.options.emphasis || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error(
        "Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`"
      );
    }
    return marker;
  }
  var init_check_emphasis = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
  function encodeCharacterReference(code4) {
    return "&#x" + code4.toString(16).toUpperCase() + ";";
  }
  var init_encode_character_reference = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/encode-info.js
  function encodeInfo(outside, inside, marker) {
    const outsideKind = classifyCharacter(outside);
    const insideKind = classifyCharacter(inside);
    if (outsideKind === void 0) {
      return insideKind === void 0 ? (
        // Letter inside:
        // we have to encode *both* letters for `_` as it is looser.
        // it already forms for `*` (and GFMs `~`).
        marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false }
      ) : insideKind === 1 ? (
        // Whitespace inside: encode both (letter, whitespace).
        { inside: true, outside: true }
      ) : (
        // Punctuation inside: encode outer (letter)
        { inside: false, outside: true }
      );
    }
    if (outsideKind === 1) {
      return insideKind === void 0 ? (
        // Letter inside: already forms.
        { inside: false, outside: false }
      ) : insideKind === 1 ? (
        // Whitespace inside: encode both (whitespace).
        { inside: true, outside: true }
      ) : (
        // Punctuation inside: already forms.
        { inside: false, outside: false }
      );
    }
    return insideKind === void 0 ? (
      // Letter inside: already forms.
      { inside: false, outside: false }
    ) : insideKind === 1 ? (
      // Whitespace inside: encode inner (whitespace).
      { inside: true, outside: false }
    ) : (
      // Punctuation inside: already forms.
      { inside: false, outside: false }
    );
  }
  var init_encode_info = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/encode-info.js"() {
      init_micromark_util_classify_character();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
  function emphasis(node2, _, state, info) {
    const marker = checkEmphasis(state);
    const exit3 = state.enter("emphasis");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker);
    let between = tracker.move(
      state.containerPhrasing(node2, {
        after: marker,
        before,
        ...tracker.current()
      })
    );
    const betweenHead = between.charCodeAt(0);
    const open = encodeInfo(
      info.before.charCodeAt(info.before.length - 1),
      betweenHead,
      marker
    );
    if (open.inside) {
      between = encodeCharacterReference(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker);
    exit3();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between + after;
  }
  function emphasisPeek(_, _1, state) {
    return state.options.emphasis || "*";
  }
  var init_emphasis = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/emphasis.js"() {
      init_check_emphasis();
      init_encode_character_reference();
      init_encode_info();
      emphasis.peek = emphasisPeek;
    }
  });

  // node_modules/unist-util-visit/lib/index.js
  function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    let reverse;
    let test;
    let visitor;
    if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
      test = void 0;
      visitor = testOrVisitor;
      reverse = visitorOrReverse;
    } else {
      test = testOrVisitor;
      visitor = visitorOrReverse;
      reverse = maybeReverse;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node2, parents) {
      const parent = parents[parents.length - 1];
      const index2 = parent ? parent.children.indexOf(node2) : void 0;
      return visitor(node2, index2, parent);
    }
  }
  var init_lib15 = __esm({
    "node_modules/unist-util-visit/lib/index.js"() {
      init_unist_util_visit_parents();
      init_unist_util_visit_parents();
    }
  });

  // node_modules/unist-util-visit/index.js
  var unist_util_visit_exports = {};
  __export(unist_util_visit_exports, {
    CONTINUE: () => CONTINUE,
    EXIT: () => EXIT,
    SKIP: () => SKIP,
    visit: () => visit
  });
  var init_unist_util_visit = __esm({
    "node_modules/unist-util-visit/index.js"() {
      init_lib15();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
  function formatHeadingAsSetext(node2, state) {
    let literalWithBreak = false;
    visit(node2, function(node3) {
      if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
        literalWithBreak = true;
        return EXIT;
      }
    });
    return Boolean(
      (!node2.depth || node2.depth < 3) && toString(node2) && (state.options.setext || literalWithBreak)
    );
  }
  var init_format_heading_as_setext = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js"() {
      init_unist_util_visit();
      init_mdast_util_to_string();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/heading.js
  function heading(node2, _, state, info) {
    const rank = Math.max(Math.min(6, node2.depth || 1), 1);
    const tracker = state.createTracker(info);
    if (formatHeadingAsSetext(node2, state)) {
      const exit4 = state.enter("headingSetext");
      const subexit2 = state.enter("phrasing");
      const value2 = state.containerPhrasing(node2, {
        ...tracker.current(),
        before: "\n",
        after: "\n"
      });
      subexit2();
      exit4();
      return value2 + "\n" + (rank === 1 ? "=" : "-").repeat(
        // The whole size…
        value2.length - // Minus the position of the character after the last EOL (or
        // 0 if there is none)…
        (Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf("\n")) + 1)
      );
    }
    const sequence = "#".repeat(rank);
    const exit3 = state.enter("headingAtx");
    const subexit = state.enter("phrasing");
    tracker.move(sequence + " ");
    let value = state.containerPhrasing(node2, {
      before: "# ",
      after: "\n",
      ...tracker.current()
    });
    if (/^[\t ]/.test(value)) {
      value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
    }
    value = value ? sequence + " " + value : sequence;
    if (state.options.closeAtx) {
      value += " " + sequence;
    }
    subexit();
    exit3();
    return value;
  }
  var init_heading = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/heading.js"() {
      init_encode_character_reference();
      init_format_heading_as_setext();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/html.js
  function html(node2) {
    return node2.value || "";
  }
  function htmlPeek() {
    return "<";
  }
  var init_html = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/html.js"() {
      html.peek = htmlPeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/image.js
  function image(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit3 = state.enter("image");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    value += tracker.move(
      state.safe(node2.alt, { before: value, after: "]", ...tracker.current() })
    );
    value += tracker.move("](");
    subexit();
    if (
      // If there’s no url but there is a title…
      !node2.url && node2.title || // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : ")",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit3();
    return value;
  }
  function imagePeek() {
    return "!";
  }
  var init_image = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/image.js"() {
      init_check_quote();
      image.peek = imagePeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
  function imageReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit3 = state.enter("imageReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    const alt = state.safe(node2.alt, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(alt + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit3();
    if (type === "full" || !alt || alt !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function imageReferencePeek() {
    return "!";
  }
  var init_image_reference = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/image-reference.js"() {
      imageReference.peek = imageReferencePeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
  function inlineCode(node2, _, state) {
    let value = node2.value || "";
    let sequence = "`";
    let index2 = -1;
    while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
      sequence += "`";
    }
    if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
      value = " " + value + " ";
    }
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      const expression = state.compilePattern(pattern);
      let match;
      if (!pattern.atBreak) continue;
      while (match = expression.exec(value)) {
        let position4 = match.index;
        if (value.charCodeAt(position4) === 10 && value.charCodeAt(position4 - 1) === 13) {
          position4--;
        }
        value = value.slice(0, position4) + " " + value.slice(match.index + 1);
      }
    }
    return sequence + value + sequence;
  }
  function inlineCodePeek() {
    return "`";
  }
  var init_inline_code = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/inline-code.js"() {
      inlineCode.peek = inlineCodePeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
  function formatLinkAsAutolink(node2, state) {
    const raw3 = toString(node2);
    return Boolean(
      !state.options.resourceLink && // If there’s a url…
      node2.url && // And there’s a no title…
      !node2.title && // And the content of `node` is a single text node…
      node2.children && node2.children.length === 1 && node2.children[0].type === "text" && // And if the url is the same as the content…
      (raw3 === node2.url || "mailto:" + raw3 === node2.url) && // And that starts w/ a protocol…
      /^[a-z][a-z+.-]+:/i.test(node2.url) && // And that doesn’t contain ASCII control codes (character escapes and
      // references don’t work), space, or angle brackets…
      !/[\0- <>\u007F]/.test(node2.url)
    );
  }
  var init_format_link_as_autolink = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js"() {
      init_mdast_util_to_string();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/link.js
  function link(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const tracker = state.createTracker(info);
    let exit3;
    let subexit;
    if (formatLinkAsAutolink(node2, state)) {
      const stack = state.stack;
      state.stack = [];
      exit3 = state.enter("autolink");
      let value2 = tracker.move("<");
      value2 += tracker.move(
        state.containerPhrasing(node2, {
          before: value2,
          after: ">",
          ...tracker.current()
        })
      );
      value2 += tracker.move(">");
      exit3();
      state.stack = stack;
      return value2;
    }
    exit3 = state.enter("link");
    subexit = state.enter("label");
    let value = tracker.move("[");
    value += tracker.move(
      state.containerPhrasing(node2, {
        before: value,
        after: "](",
        ...tracker.current()
      })
    );
    value += tracker.move("](");
    subexit();
    if (
      // If there’s no url but there is a title…
      !node2.url && node2.title || // If there are control characters or whitespace.
      /[\0- \u007F]/.test(node2.url)
    ) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(
        state.safe(node2.url, { before: value, after: ">", ...tracker.current() })
      );
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(
        state.safe(node2.url, {
          before: value,
          after: node2.title ? " " : ")",
          ...tracker.current()
        })
      );
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(
        state.safe(node2.title, {
          before: value,
          after: quote,
          ...tracker.current()
        })
      );
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit3();
    return value;
  }
  function linkPeek(node2, _, state) {
    return formatLinkAsAutolink(node2, state) ? "<" : "[";
  }
  var init_link = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/link.js"() {
      init_check_quote();
      init_format_link_as_autolink();
      link.peek = linkPeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
  function linkReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit3 = state.enter("linkReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    const text9 = state.containerPhrasing(node2, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(text9 + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit3();
    if (type === "full" || !text9 || text9 !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function linkReferencePeek() {
    return "[";
  }
  var init_link_reference = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/link-reference.js"() {
      linkReference.peek = linkReferencePeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
  function checkBullet(state) {
    const marker = state.options.bullet || "*";
    if (marker !== "*" && marker !== "+" && marker !== "-") {
      throw new Error(
        "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
      );
    }
    return marker;
  }
  var init_check_bullet = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-bullet.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
  function checkBulletOther(state) {
    const bullet = checkBullet(state);
    const bulletOther = state.options.bulletOther;
    if (!bulletOther) {
      return bullet === "*" ? "-" : "*";
    }
    if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
      throw new Error(
        "Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
      );
    }
    if (bulletOther === bullet) {
      throw new Error(
        "Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different"
      );
    }
    return bulletOther;
  }
  var init_check_bullet_other = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js"() {
      init_check_bullet();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
  function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || ".";
    if (marker !== "." && marker !== ")") {
      throw new Error(
        "Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`"
      );
    }
    return marker;
  }
  var init_check_bullet_ordered = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-rule.js
  function checkRule(state) {
    const marker = state.options.rule || "*";
    if (marker !== "*" && marker !== "-" && marker !== "_") {
      throw new Error(
        "Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`"
      );
    }
    return marker;
  }
  var init_check_rule = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-rule.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/list.js
  function list2(node2, parent, state, info) {
    const exit3 = state.enter("list");
    const bulletCurrent = state.bulletCurrent;
    let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
    const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
    let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
    if (!node2.ordered) {
      const firstListItem = node2.children ? node2.children[0] : void 0;
      if (
        // Bullet could be used as a thematic break marker:
        (bullet === "*" || bullet === "-") && // Empty first list item:
        firstListItem && (!firstListItem.children || !firstListItem.children[0]) && // Directly in two other list items:
        state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && // That are each the first child.
        state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0
      ) {
        useDifferentMarker = true;
      }
      if (checkRule(state) === bullet && firstListItem) {
        let index2 = -1;
        while (++index2 < node2.children.length) {
          const item = node2.children[index2];
          if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
            useDifferentMarker = true;
            break;
          }
        }
      }
    }
    if (useDifferentMarker) {
      bullet = bulletOther;
    }
    state.bulletCurrent = bullet;
    const value = state.containerFlow(node2, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit3();
    return value;
  }
  var init_list2 = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/list.js"() {
      init_check_bullet();
      init_check_bullet_other();
      init_check_bullet_ordered();
      init_check_rule();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
  function checkListItemIndent(state) {
    const style2 = state.options.listItemIndent || "one";
    if (style2 !== "tab" && style2 !== "one" && style2 !== "mixed") {
      throw new Error(
        "Cannot serialize items with `" + style2 + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
      );
    }
    return style2;
  }
  var init_check_list_item_indent = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/list-item.js
  function listItem(node2, parent, state, info) {
    const listItemIndent = checkListItemIndent(state);
    let bullet = state.bulletCurrent || checkBullet(state);
    if (parent && parent.type === "list" && parent.ordered) {
      bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
    }
    let size = bullet.length + 1;
    if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
      size = Math.ceil(size / 4) * 4;
    }
    const tracker = state.createTracker(info);
    tracker.move(bullet + " ".repeat(size - bullet.length));
    tracker.shift(size);
    const exit3 = state.enter("listItem");
    const value = state.indentLines(
      state.containerFlow(node2, tracker.current()),
      map3
    );
    exit3();
    return value;
    function map3(line, index2, blank) {
      if (index2) {
        return (blank ? "" : " ".repeat(size)) + line;
      }
      return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
    }
  }
  var init_list_item = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/list-item.js"() {
      init_check_bullet();
      init_check_list_item_indent();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
  function paragraph(node2, _, state, info) {
    const exit3 = state.enter("paragraph");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node2, info);
    subexit();
    exit3();
    return value;
  }
  var init_paragraph = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/paragraph.js"() {
    }
  });

  // node_modules/mdast-util-phrasing/lib/index.js
  var phrasing;
  var init_lib16 = __esm({
    "node_modules/mdast-util-phrasing/lib/index.js"() {
      init_unist_util_is();
      phrasing = /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
      convert([
        "break",
        "delete",
        "emphasis",
        // To do: next major: removed since footnotes were added to GFM.
        "footnote",
        "footnoteReference",
        "image",
        "imageReference",
        "inlineCode",
        // Enabled by `mdast-util-math`:
        "inlineMath",
        "link",
        "linkReference",
        // Enabled by `mdast-util-mdx`:
        "mdxJsxTextElement",
        // Enabled by `mdast-util-mdx`:
        "mdxTextExpression",
        "strong",
        "text",
        // Enabled by `mdast-util-directive`:
        "textDirective"
      ]);
    }
  });

  // node_modules/mdast-util-phrasing/index.js
  var init_mdast_util_phrasing = __esm({
    "node_modules/mdast-util-phrasing/index.js"() {
      init_lib16();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/root.js
  function root(node2, _, state, info) {
    const hasPhrasing = node2.children.some(function(d) {
      return phrasing(d);
    });
    const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
    return container.call(state, node2, info);
  }
  var init_root = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/root.js"() {
      init_mdast_util_phrasing();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-strong.js
  function checkStrong(state) {
    const marker = state.options.strong || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error(
        "Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`"
      );
    }
    return marker;
  }
  var init_check_strong = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-strong.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/strong.js
  function strong(node2, _, state, info) {
    const marker = checkStrong(state);
    const exit3 = state.enter("strong");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker + marker);
    let between = tracker.move(
      state.containerPhrasing(node2, {
        after: marker,
        before,
        ...tracker.current()
      })
    );
    const betweenHead = between.charCodeAt(0);
    const open = encodeInfo(
      info.before.charCodeAt(info.before.length - 1),
      betweenHead,
      marker
    );
    if (open.inside) {
      between = encodeCharacterReference(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker + marker);
    exit3();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between + after;
  }
  function strongPeek(_, _1, state) {
    return state.options.strong || "*";
  }
  var init_strong = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/strong.js"() {
      init_check_strong();
      init_encode_character_reference();
      init_encode_info();
      strong.peek = strongPeek;
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/text.js
  function text3(node2, _, state, info) {
    return state.safe(node2.value, info);
  }
  var init_text2 = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/text.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
  function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;
    if (repetition < 3) {
      throw new Error(
        "Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more"
      );
    }
    return repetition;
  }
  var init_check_rule_repetition = __esm({
    "node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js"() {
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
  function thematicBreak2(_, _1, state) {
    const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
    return state.options.ruleSpaces ? value.slice(0, -1) : value;
  }
  var init_thematic_break2 = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js"() {
      init_check_rule_repetition();
      init_check_rule();
    }
  });

  // node_modules/mdast-util-to-markdown/lib/handle/index.js
  var handle;
  var init_handle = __esm({
    "node_modules/mdast-util-to-markdown/lib/handle/index.js"() {
      init_blockquote();
      init_break();
      init_code();
      init_definition2();
      init_emphasis();
      init_heading();
      init_html();
      init_image();
      init_image_reference();
      init_inline_code();
      init_link();
      init_link_reference();
      init_list2();
      init_list_item();
      init_paragraph();
      init_root();
      init_strong();
      init_text2();
      init_thematic_break2();
      handle = {
        blockquote,
        break: hardBreak,
        code,
        definition: definition2,
        emphasis,
        hardBreak,
        heading,
        html,
        image,
        imageReference,
        inlineCode,
        link,
        linkReference,
        list: list2,
        listItem,
        paragraph,
        root,
        strong,
        text: text3,
        thematicBreak: thematicBreak2
      };
    }
  });

  // node_modules/mdast-util-to-markdown/index.js
  var init_mdast_util_to_markdown = __esm({
    "node_modules/mdast-util-to-markdown/index.js"() {
      init_handle();
    }
  });

  // node_modules/mdast-util-gfm-table/lib/index.js
  function gfmTableFromMarkdown() {
    return {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit2,
        tableHeader: exit2,
        tableRow: exit2
      }
    };
  }
  function enterTable(token) {
    const align = token._align;
    ok(align, "expected `_align` on table");
    this.enter(
      {
        type: "table",
        align: align.map(function(d) {
          return d === "none" ? null : d;
        }),
        children: []
      },
      token
    );
    this.data.inTable = true;
  }
  function exitTable(token) {
    this.exit(token);
    this.data.inTable = void 0;
  }
  function enterRow(token) {
    this.enter({ type: "tableRow", children: [] }, token);
  }
  function exit2(token) {
    this.exit(token);
  }
  function enterCell(token) {
    this.enter({ type: "tableCell", children: [] }, token);
  }
  function exitCodeText(token) {
    let value = this.resume();
    if (this.data.inTable) {
      value = value.replace(/\\([\\|])/g, replace);
    }
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "inlineCode");
    node2.value = value;
    this.exit(token);
  }
  function replace($0, $1) {
    return $1 === "|" ? $1 : $0;
  }
  function gfmTableToMarkdown(options) {
    const settings = options || {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? " " : "|";
    return {
      unsafe: [
        { character: "\r", inConstruct: "tableCell" },
        { character: "\n", inConstruct: "tableCell" },
        // A pipe, when followed by a tab or space (padding), or a dash or colon
        // (unpadded delimiter row), could result in a table.
        { atBreak: true, character: "|", after: "[	 :-]" },
        // A pipe in a cell must be encoded.
        { character: "|", inConstruct: "tableCell" },
        // A colon must be followed by a dash, in which case it could start a
        // delimiter row.
        { atBreak: true, character: ":", after: "-" },
        // A delimiter row can also start with a dash, when followed by more
        // dashes, a colon, or a pipe.
        // This is a stricter version than the built in check for lists, thematic
        // breaks, and setex heading underlines though:
        // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
        { atBreak: true, character: "-", after: "[:|-]" }
      ],
      handlers: {
        inlineCode: inlineCodeWithTable,
        table: handleTable,
        tableCell: handleTableCell,
        tableRow: handleTableRow
      }
    };
    function handleTable(node2, _, state, info) {
      return serializeData(handleTableAsData(node2, state, info), node2.align);
    }
    function handleTableRow(node2, _, state, info) {
      const row = handleTableRowAsData(node2, state, info);
      const value = serializeData([row]);
      return value.slice(0, value.indexOf("\n"));
    }
    function handleTableCell(node2, _, state, info) {
      const exit3 = state.enter("tableCell");
      const subexit = state.enter("phrasing");
      const value = state.containerPhrasing(node2, {
        ...info,
        before: around,
        after: around
      });
      subexit();
      exit3();
      return value;
    }
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
        // @ts-expect-error: `markdown-table` types should support `null`.
        alignDelimiters,
        // @ts-expect-error: `markdown-table` types should support `null`.
        padding,
        // @ts-expect-error: `markdown-table` types should support `null`.
        stringLength
      });
    }
    function handleTableAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("table");
      while (++index2 < children.length) {
        result[index2] = handleTableRowAsData(children[index2], state, info);
      }
      subexit();
      return result;
    }
    function handleTableRowAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("tableRow");
      while (++index2 < children.length) {
        result[index2] = handleTableCell(children[index2], node2, state, info);
      }
      subexit();
      return result;
    }
    function inlineCodeWithTable(node2, parent, state) {
      let value = handle.inlineCode(node2, parent, state);
      if (state.stack.includes("tableCell")) {
        value = value.replace(/\|/g, "\\$&");
      }
      return value;
    }
  }
  var init_lib17 = __esm({
    "node_modules/mdast-util-gfm-table/lib/index.js"() {
      init_default();
      init_markdown_table();
      init_mdast_util_to_markdown();
    }
  });

  // node_modules/mdast-util-gfm-table/index.js
  var init_mdast_util_gfm_table = __esm({
    "node_modules/mdast-util-gfm-table/index.js"() {
      init_lib17();
    }
  });

  // node_modules/mdast-util-gfm-task-list-item/lib/index.js
  function gfmTaskListItemFromMarkdown() {
    return {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    };
  }
  function gfmTaskListItemToMarkdown() {
    return {
      unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
      handlers: { listItem: listItemWithTaskListItem }
    };
  }
  function exitCheck(token) {
    const node2 = this.stack[this.stack.length - 2];
    ok(node2.type === "listItem");
    node2.checked = token.type === "taskListCheckValueChecked";
  }
  function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];
    if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2.type === "paragraph");
      const head2 = node2.children[0];
      if (head2 && head2.type === "text") {
        const siblings2 = parent.children;
        let index2 = -1;
        let firstParaghraph;
        while (++index2 < siblings2.length) {
          const sibling = siblings2[index2];
          if (sibling.type === "paragraph") {
            firstParaghraph = sibling;
            break;
          }
        }
        if (firstParaghraph === node2) {
          head2.value = head2.value.slice(1);
          if (head2.value.length === 0) {
            node2.children.shift();
          } else if (node2.position && head2.position && typeof head2.position.start.offset === "number") {
            head2.position.start.column++;
            head2.position.start.offset++;
            node2.position.start = Object.assign({}, head2.position.start);
          }
        }
      }
    }
    this.exit(token);
  }
  function listItemWithTaskListItem(node2, parent, state, info) {
    const head2 = node2.children[0];
    const checkable = typeof node2.checked === "boolean" && head2 && head2.type === "paragraph";
    const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
    const tracker = state.createTracker(info);
    if (checkable) {
      tracker.move(checkbox);
    }
    let value = handle.listItem(node2, parent, state, {
      ...info,
      ...tracker.current()
    });
    if (checkable) {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    function check($0) {
      return $0 + checkbox;
    }
  }
  var init_lib18 = __esm({
    "node_modules/mdast-util-gfm-task-list-item/lib/index.js"() {
      init_default();
      init_mdast_util_to_markdown();
    }
  });

  // node_modules/mdast-util-gfm-task-list-item/index.js
  var init_mdast_util_gfm_task_list_item = __esm({
    "node_modules/mdast-util-gfm-task-list-item/index.js"() {
      init_lib18();
    }
  });

  // node_modules/mdast-util-gfm/lib/index.js
  function gfmFromMarkdown() {
    return [
      gfmAutolinkLiteralFromMarkdown(),
      gfmFootnoteFromMarkdown(),
      gfmStrikethroughFromMarkdown(),
      gfmTableFromMarkdown(),
      gfmTaskListItemFromMarkdown()
    ];
  }
  function gfmToMarkdown(options) {
    return {
      extensions: [
        gfmAutolinkLiteralToMarkdown(),
        gfmFootnoteToMarkdown(options),
        gfmStrikethroughToMarkdown(),
        gfmTableToMarkdown(options),
        gfmTaskListItemToMarkdown()
      ]
    };
  }
  var init_lib19 = __esm({
    "node_modules/mdast-util-gfm/lib/index.js"() {
      init_mdast_util_gfm_autolink_literal();
      init_mdast_util_gfm_footnote();
      init_mdast_util_gfm_strikethrough();
      init_mdast_util_gfm_table();
      init_mdast_util_gfm_task_list_item();
    }
  });

  // node_modules/mdast-util-gfm/index.js
  var init_mdast_util_gfm = __esm({
    "node_modules/mdast-util-gfm/index.js"() {
      init_lib19();
    }
  });

  // node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
  function gfmAutolinkLiteral() {
    return {
      text: text4
    };
  }
  function tokenizeEmailAutolink(effects, ok3, nok) {
    const self2 = this;
    let dot;
    let data;
    return start;
    function start(code4) {
      if (!gfmAtext(code4) || !previousEmail.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
        return nok(code4);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkEmail");
      return atext(code4);
    }
    function atext(code4) {
      if (gfmAtext(code4)) {
        effects.consume(code4);
        return atext;
      }
      if (code4 === 64) {
        effects.consume(code4);
        return emailDomain;
      }
      return nok(code4);
    }
    function emailDomain(code4) {
      if (code4 === 46) {
        return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code4);
      }
      if (code4 === 45 || code4 === 95 || asciiAlphanumeric(code4)) {
        data = true;
        effects.consume(code4);
        return emailDomain;
      }
      return emailDomainAfter(code4);
    }
    function emailDomainDot(code4) {
      effects.consume(code4);
      dot = true;
      return emailDomain;
    }
    function emailDomainAfter(code4) {
      if (data && dot && asciiAlpha(self2.previous)) {
        effects.exit("literalAutolinkEmail");
        effects.exit("literalAutolink");
        return ok3(code4);
      }
      return nok(code4);
    }
  }
  function tokenizeWwwAutolink(effects, ok3, nok) {
    const self2 = this;
    return wwwStart;
    function wwwStart(code4) {
      if (code4 !== 87 && code4 !== 119 || !previousWww.call(self2, self2.previous) || previousUnbalanced(self2.events)) {
        return nok(code4);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkWww");
      return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code4);
    }
    function wwwAfter(code4) {
      effects.exit("literalAutolinkWww");
      effects.exit("literalAutolink");
      return ok3(code4);
    }
  }
  function tokenizeProtocolAutolink(effects, ok3, nok) {
    const self2 = this;
    let buffer = "";
    let seen = false;
    return protocolStart;
    function protocolStart(code4) {
      if ((code4 === 72 || code4 === 104) && previousProtocol.call(self2, self2.previous) && !previousUnbalanced(self2.events)) {
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkHttp");
        buffer += String.fromCodePoint(code4);
        effects.consume(code4);
        return protocolPrefixInside;
      }
      return nok(code4);
    }
    function protocolPrefixInside(code4) {
      if (asciiAlpha(code4) && buffer.length < 5) {
        buffer += String.fromCodePoint(code4);
        effects.consume(code4);
        return protocolPrefixInside;
      }
      if (code4 === 58) {
        const protocol = buffer.toLowerCase();
        if (protocol === "http" || protocol === "https") {
          effects.consume(code4);
          return protocolSlashesInside;
        }
      }
      return nok(code4);
    }
    function protocolSlashesInside(code4) {
      if (code4 === 47) {
        effects.consume(code4);
        if (seen) {
          return afterProtocol;
        }
        seen = true;
        return protocolSlashesInside;
      }
      return nok(code4);
    }
    function afterProtocol(code4) {
      return code4 === null || asciiControl(code4) || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4) || unicodePunctuation(code4) ? nok(code4) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code4);
    }
    function protocolAfter(code4) {
      effects.exit("literalAutolinkHttp");
      effects.exit("literalAutolink");
      return ok3(code4);
    }
  }
  function tokenizeWwwPrefix(effects, ok3, nok) {
    let size = 0;
    return wwwPrefixInside;
    function wwwPrefixInside(code4) {
      if ((code4 === 87 || code4 === 119) && size < 3) {
        size++;
        effects.consume(code4);
        return wwwPrefixInside;
      }
      if (code4 === 46 && size === 3) {
        effects.consume(code4);
        return wwwPrefixAfter;
      }
      return nok(code4);
    }
    function wwwPrefixAfter(code4) {
      return code4 === null ? nok(code4) : ok3(code4);
    }
  }
  function tokenizeDomain(effects, ok3, nok) {
    let underscoreInLastSegment;
    let underscoreInLastLastSegment;
    let seen;
    return domainInside;
    function domainInside(code4) {
      if (code4 === 46 || code4 === 95) {
        return effects.check(trail, domainAfter, domainAtPunctuation)(code4);
      }
      if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4) || code4 !== 45 && unicodePunctuation(code4)) {
        return domainAfter(code4);
      }
      seen = true;
      effects.consume(code4);
      return domainInside;
    }
    function domainAtPunctuation(code4) {
      if (code4 === 95) {
        underscoreInLastSegment = true;
      } else {
        underscoreInLastLastSegment = underscoreInLastSegment;
        underscoreInLastSegment = void 0;
      }
      effects.consume(code4);
      return domainInside;
    }
    function domainAfter(code4) {
      if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
        return nok(code4);
      }
      return ok3(code4);
    }
  }
  function tokenizePath(effects, ok3) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;
    function pathInside(code4) {
      if (code4 === 40) {
        sizeOpen++;
        effects.consume(code4);
        return pathInside;
      }
      if (code4 === 41 && sizeClose < sizeOpen) {
        return pathAtPunctuation(code4);
      }
      if (code4 === 33 || code4 === 34 || code4 === 38 || code4 === 39 || code4 === 41 || code4 === 42 || code4 === 44 || code4 === 46 || code4 === 58 || code4 === 59 || code4 === 60 || code4 === 63 || code4 === 93 || code4 === 95 || code4 === 126) {
        return effects.check(trail, ok3, pathAtPunctuation)(code4);
      }
      if (code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
        return ok3(code4);
      }
      effects.consume(code4);
      return pathInside;
    }
    function pathAtPunctuation(code4) {
      if (code4 === 41) {
        sizeClose++;
      }
      effects.consume(code4);
      return pathInside;
    }
  }
  function tokenizeTrail(effects, ok3, nok) {
    return trail2;
    function trail2(code4) {
      if (code4 === 33 || code4 === 34 || code4 === 39 || code4 === 41 || code4 === 42 || code4 === 44 || code4 === 46 || code4 === 58 || code4 === 59 || code4 === 63 || code4 === 95 || code4 === 126) {
        effects.consume(code4);
        return trail2;
      }
      if (code4 === 38) {
        effects.consume(code4);
        return trailCharacterReferenceStart;
      }
      if (code4 === 93) {
        effects.consume(code4);
        return trailBracketAfter;
      }
      if (
        // `<` is an end.
        code4 === 60 || // So is whitespace.
        code4 === null || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)
      ) {
        return ok3(code4);
      }
      return nok(code4);
    }
    function trailBracketAfter(code4) {
      if (code4 === null || code4 === 40 || code4 === 91 || markdownLineEndingOrSpace(code4) || unicodeWhitespace(code4)) {
        return ok3(code4);
      }
      return trail2(code4);
    }
    function trailCharacterReferenceStart(code4) {
      return asciiAlpha(code4) ? trailCharacterReferenceInside(code4) : nok(code4);
    }
    function trailCharacterReferenceInside(code4) {
      if (code4 === 59) {
        effects.consume(code4);
        return trail2;
      }
      if (asciiAlpha(code4)) {
        effects.consume(code4);
        return trailCharacterReferenceInside;
      }
      return nok(code4);
    }
  }
  function tokenizeEmailDomainDotTrail(effects, ok3, nok) {
    return start;
    function start(code4) {
      effects.consume(code4);
      return after;
    }
    function after(code4) {
      return asciiAlphanumeric(code4) ? nok(code4) : ok3(code4);
    }
  }
  function previousWww(code4) {
    return code4 === null || code4 === 40 || code4 === 42 || code4 === 95 || code4 === 91 || code4 === 93 || code4 === 126 || markdownLineEndingOrSpace(code4);
  }
  function previousProtocol(code4) {
    return !asciiAlpha(code4);
  }
  function previousEmail(code4) {
    return !(code4 === 47 || gfmAtext(code4));
  }
  function gfmAtext(code4) {
    return code4 === 43 || code4 === 45 || code4 === 46 || code4 === 95 || asciiAlphanumeric(code4);
  }
  function previousUnbalanced(events) {
    let index2 = events.length;
    let result = false;
    while (index2--) {
      const token = events[index2][1];
      if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
        result = true;
        break;
      }
      if (token._gfmAutolinkLiteralWalkedInto) {
        result = false;
        break;
      }
    }
    if (events.length > 0 && !result) {
      events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
  }
  var wwwPrefix, domain, path, trail, emailDomainDotTrail, wwwAutolink, protocolAutolink, emailAutolink, text4, code2;
  var init_syntax = __esm({
    "node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js"() {
      init_micromark_util_character();
      wwwPrefix = {
        tokenize: tokenizeWwwPrefix,
        partial: true
      };
      domain = {
        tokenize: tokenizeDomain,
        partial: true
      };
      path = {
        tokenize: tokenizePath,
        partial: true
      };
      trail = {
        tokenize: tokenizeTrail,
        partial: true
      };
      emailDomainDotTrail = {
        tokenize: tokenizeEmailDomainDotTrail,
        partial: true
      };
      wwwAutolink = {
        name: "wwwAutolink",
        tokenize: tokenizeWwwAutolink,
        previous: previousWww
      };
      protocolAutolink = {
        name: "protocolAutolink",
        tokenize: tokenizeProtocolAutolink,
        previous: previousProtocol
      };
      emailAutolink = {
        name: "emailAutolink",
        tokenize: tokenizeEmailAutolink,
        previous: previousEmail
      };
      text4 = {};
      code2 = 48;
      while (code2 < 123) {
        text4[code2] = emailAutolink;
        code2++;
        if (code2 === 58) code2 = 65;
        else if (code2 === 91) code2 = 97;
      }
      text4[43] = emailAutolink;
      text4[45] = emailAutolink;
      text4[46] = emailAutolink;
      text4[95] = emailAutolink;
      text4[72] = [emailAutolink, protocolAutolink];
      text4[104] = [emailAutolink, protocolAutolink];
      text4[87] = [emailAutolink, wwwAutolink];
      text4[119] = [emailAutolink, wwwAutolink];
    }
  });

  // node_modules/micromark-extension-gfm-autolink-literal/index.js
  var init_micromark_extension_gfm_autolink_literal = __esm({
    "node_modules/micromark-extension-gfm-autolink-literal/index.js"() {
      init_syntax();
    }
  });

  // node_modules/micromark-extension-gfm-footnote/lib/syntax.js
  function gfmFootnote() {
    return {
      document: {
        [91]: {
          name: "gfmFootnoteDefinition",
          tokenize: tokenizeDefinitionStart,
          continuation: {
            tokenize: tokenizeDefinitionContinuation
          },
          exit: gfmFootnoteDefinitionEnd
        }
      },
      text: {
        [91]: {
          name: "gfmFootnoteCall",
          tokenize: tokenizeGfmFootnoteCall
        },
        [93]: {
          name: "gfmPotentialFootnoteCall",
          add: "after",
          tokenize: tokenizePotentialGfmFootnoteCall,
          resolveTo: resolveToPotentialGfmFootnoteCall
        }
      }
    };
  }
  function tokenizePotentialGfmFootnoteCall(effects, ok3, nok) {
    const self2 = this;
    let index2 = self2.events.length;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let labelStart;
    while (index2--) {
      const token = self2.events[index2][1];
      if (token.type === "labelImage") {
        labelStart = token;
        break;
      }
      if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
        break;
      }
    }
    return start;
    function start(code4) {
      if (!labelStart || !labelStart._balanced) {
        return nok(code4);
      }
      const id = normalizeIdentifier(self2.sliceSerialize({
        start: labelStart.end,
        end: self2.now()
      }));
      if (id.codePointAt(0) !== 94 || !defined.includes(id.slice(1))) {
        return nok(code4);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteCallLabelMarker");
      return ok3(code4);
    }
  }
  function resolveToPotentialGfmFootnoteCall(events, context) {
    let index2 = events.length;
    let labelStart;
    while (index2--) {
      if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
        labelStart = events[index2][1];
        break;
      }
    }
    events[index2 + 1][1].type = "data";
    events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
    const call = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, events[index2 + 3][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const marker = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, events[index2 + 3][1].end),
      end: Object.assign({}, events[index2 + 3][1].end)
    };
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    const string3 = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, marker.end),
      end: Object.assign({}, events[events.length - 1][1].start)
    };
    const chunk = {
      type: "chunkString",
      contentType: "string",
      start: Object.assign({}, string3.start),
      end: Object.assign({}, string3.end)
    };
    const replacement = [
      // Take the `labelImageMarker` (now `data`, the `!`)
      events[index2 + 1],
      events[index2 + 2],
      ["enter", call, context],
      // The `[`
      events[index2 + 3],
      events[index2 + 4],
      // The `^`.
      ["enter", marker, context],
      ["exit", marker, context],
      // Everything in between.
      ["enter", string3, context],
      ["enter", chunk, context],
      ["exit", chunk, context],
      ["exit", string3, context],
      // The ending (`]`, properly parsed and labelled).
      events[events.length - 2],
      events[events.length - 1],
      ["exit", call, context]
    ];
    events.splice(index2, events.length - index2 + 1, ...replacement);
    return events;
  }
  function tokenizeGfmFootnoteCall(effects, ok3, nok) {
    const self2 = this;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let size = 0;
    let data;
    return start;
    function start(code4) {
      effects.enter("gfmFootnoteCall");
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteCallLabelMarker");
      return callStart;
    }
    function callStart(code4) {
      if (code4 !== 94) return nok(code4);
      effects.enter("gfmFootnoteCallMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteCallMarker");
      effects.enter("gfmFootnoteCallString");
      effects.enter("chunkString").contentType = "string";
      return callData;
    }
    function callData(code4) {
      if (
        // Too long.
        size > 999 || // Closing brace with nothing.
        code4 === 93 && !data || // Space or tab is not supported by GFM for some reason.
        // `\n` and `[` not being supported makes sense.
        code4 === null || code4 === 91 || markdownLineEndingOrSpace(code4)
      ) {
        return nok(code4);
      }
      if (code4 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteCallString");
        if (!defined.includes(normalizeIdentifier(self2.sliceSerialize(token)))) {
          return nok(code4);
        }
        effects.enter("gfmFootnoteCallLabelMarker");
        effects.consume(code4);
        effects.exit("gfmFootnoteCallLabelMarker");
        effects.exit("gfmFootnoteCall");
        return ok3;
      }
      if (!markdownLineEndingOrSpace(code4)) {
        data = true;
      }
      size++;
      effects.consume(code4);
      return code4 === 92 ? callEscape : callData;
    }
    function callEscape(code4) {
      if (code4 === 91 || code4 === 92 || code4 === 93) {
        effects.consume(code4);
        size++;
        return callData;
      }
      return callData(code4);
    }
  }
  function tokenizeDefinitionStart(effects, ok3, nok) {
    const self2 = this;
    const defined = self2.parser.gfmFootnotes || (self2.parser.gfmFootnotes = []);
    let identifier;
    let size = 0;
    let data;
    return start;
    function start(code4) {
      effects.enter("gfmFootnoteDefinition")._container = true;
      effects.enter("gfmFootnoteDefinitionLabel");
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code4);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      return labelAtMarker;
    }
    function labelAtMarker(code4) {
      if (code4 === 94) {
        effects.enter("gfmFootnoteDefinitionMarker");
        effects.consume(code4);
        effects.exit("gfmFootnoteDefinitionMarker");
        effects.enter("gfmFootnoteDefinitionLabelString");
        effects.enter("chunkString").contentType = "string";
        return labelInside;
      }
      return nok(code4);
    }
    function labelInside(code4) {
      if (
        // Too long.
        size > 999 || // Closing brace with nothing.
        code4 === 93 && !data || // Space or tab is not supported by GFM for some reason.
        // `\n` and `[` not being supported makes sense.
        code4 === null || code4 === 91 || markdownLineEndingOrSpace(code4)
      ) {
        return nok(code4);
      }
      if (code4 === 93) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteDefinitionLabelString");
        identifier = normalizeIdentifier(self2.sliceSerialize(token));
        effects.enter("gfmFootnoteDefinitionLabelMarker");
        effects.consume(code4);
        effects.exit("gfmFootnoteDefinitionLabelMarker");
        effects.exit("gfmFootnoteDefinitionLabel");
        return labelAfter;
      }
      if (!markdownLineEndingOrSpace(code4)) {
        data = true;
      }
      size++;
      effects.consume(code4);
      return code4 === 92 ? labelEscape : labelInside;
    }
    function labelEscape(code4) {
      if (code4 === 91 || code4 === 92 || code4 === 93) {
        effects.consume(code4);
        size++;
        return labelInside;
      }
      return labelInside(code4);
    }
    function labelAfter(code4) {
      if (code4 === 58) {
        effects.enter("definitionMarker");
        effects.consume(code4);
        effects.exit("definitionMarker");
        if (!defined.includes(identifier)) {
          defined.push(identifier);
        }
        return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
      }
      return nok(code4);
    }
    function whitespaceAfter(code4) {
      return ok3(code4);
    }
  }
  function tokenizeDefinitionContinuation(effects, ok3, nok) {
    return effects.check(blankLine, ok3, effects.attempt(indent, ok3, nok));
  }
  function gfmFootnoteDefinitionEnd(effects) {
    effects.exit("gfmFootnoteDefinition");
  }
  function tokenizeIndent2(effects, ok3, nok) {
    const self2 = this;
    return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", 4 + 1);
    function afterPrefix(code4) {
      const tail = self2.events[self2.events.length - 1];
      return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok3(code4) : nok(code4);
    }
  }
  var indent;
  var init_syntax2 = __esm({
    "node_modules/micromark-extension-gfm-footnote/lib/syntax.js"() {
      init_micromark_core_commonmark();
      init_micromark_factory_space();
      init_micromark_util_character();
      init_micromark_util_normalize_identifier();
      indent = {
        tokenize: tokenizeIndent2,
        partial: true
      };
    }
  });

  // node_modules/micromark-extension-gfm-footnote/index.js
  var init_micromark_extension_gfm_footnote = __esm({
    "node_modules/micromark-extension-gfm-footnote/index.js"() {
      init_syntax2();
    }
  });

  // node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
  function gfmStrikethrough(options) {
    const options_ = options || {};
    let single = options_.singleTilde;
    const tokenizer = {
      name: "strikethrough",
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === void 0) {
      single = true;
    }
    return {
      text: {
        [126]: tokenizer
      },
      insideSpan: {
        null: [tokenizer]
      },
      attentionMarkers: {
        null: [126]
      }
    };
    function resolveAllStrikethrough(events, context) {
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
          let open = index2;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && // If the sizes are the same:
            events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index2][1].type = "strikethroughSequence";
              events[open][1].type = "strikethroughSequence";
              const strikethrough2 = {
                type: "strikethrough",
                start: Object.assign({}, events[open][1].start),
                end: Object.assign({}, events[index2][1].end)
              };
              const text9 = {
                type: "strikethroughText",
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index2][1].start)
              };
              const nextEvents = [["enter", strikethrough2, context], ["enter", events[open][1], context], ["exit", events[open][1], context], ["enter", text9, context]];
              const insideSpan2 = context.parser.constructs.insideSpan.null;
              if (insideSpan2) {
                splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open + 1, index2), context));
              }
              splice(nextEvents, nextEvents.length, 0, [["exit", text9, context], ["enter", events[index2][1], context], ["exit", events[index2][1], context], ["exit", strikethrough2, context]]);
              splice(events, open - 1, index2 - open + 3, nextEvents);
              index2 = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "strikethroughSequenceTemporary") {
          events[index2][1].type = "data";
        }
      }
      return events;
    }
    function tokenizeStrikethrough(effects, ok3, nok) {
      const previous3 = this.previous;
      const events = this.events;
      let size = 0;
      return start;
      function start(code4) {
        if (previous3 === 126 && events[events.length - 1][1].type !== "characterEscape") {
          return nok(code4);
        }
        effects.enter("strikethroughSequenceTemporary");
        return more(code4);
      }
      function more(code4) {
        const before = classifyCharacter(previous3);
        if (code4 === 126) {
          if (size > 1) return nok(code4);
          effects.consume(code4);
          size++;
          return more;
        }
        if (size < 2 && !single) return nok(code4);
        const token = effects.exit("strikethroughSequenceTemporary");
        const after = classifyCharacter(code4);
        token._open = !after || after === 2 && Boolean(before);
        token._close = !before || before === 2 && Boolean(after);
        return ok3(code4);
      }
    }
  }
  var init_syntax3 = __esm({
    "node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js"() {
      init_micromark_util_chunked();
      init_micromark_util_classify_character();
      init_micromark_util_resolve_all();
    }
  });

  // node_modules/micromark-extension-gfm-strikethrough/index.js
  var init_micromark_extension_gfm_strikethrough = __esm({
    "node_modules/micromark-extension-gfm-strikethrough/index.js"() {
      init_syntax3();
    }
  });

  // node_modules/micromark-extension-gfm-table/lib/edit-map.js
  function addImplementation(editMap, at, remove, add) {
    let index2 = 0;
    if (remove === 0 && add.length === 0) {
      return;
    }
    while (index2 < editMap.map.length) {
      if (editMap.map[index2][0] === at) {
        editMap.map[index2][1] += remove;
        editMap.map[index2][2].push(...add);
        return;
      }
      index2 += 1;
    }
    editMap.map.push([at, remove, add]);
  }
  var EditMap;
  var init_edit_map = __esm({
    "node_modules/micromark-extension-gfm-table/lib/edit-map.js"() {
      EditMap = class {
        /**
         * Create a new edit map.
         */
        constructor() {
          this.map = [];
        }
        /**
         * Create an edit: a remove and/or add at a certain place.
         *
         * @param {number} index
         * @param {number} remove
         * @param {Array<Event>} add
         * @returns {undefined}
         */
        add(index2, remove, add) {
          addImplementation(this, index2, remove, add);
        }
        // To do: add this when moving to `micromark`.
        // /**
        //  * Create an edit: but insert `add` before existing additions.
        //  *
        //  * @param {number} index
        //  * @param {number} remove
        //  * @param {Array<Event>} add
        //  * @returns {undefined}
        //  */
        // addBefore(index, remove, add) {
        //   addImplementation(this, index, remove, add, true)
        // }
        /**
         * Done, change the events.
         *
         * @param {Array<Event>} events
         * @returns {undefined}
         */
        consume(events) {
          this.map.sort(function(a, b) {
            return a[0] - b[0];
          });
          if (this.map.length === 0) {
            return;
          }
          let index2 = this.map.length;
          const vecs = [];
          while (index2 > 0) {
            index2 -= 1;
            vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
            events.length = this.map[index2][0];
          }
          vecs.push(events.slice());
          events.length = 0;
          let slice = vecs.pop();
          while (slice) {
            for (const element6 of slice) {
              events.push(element6);
            }
            slice = vecs.pop();
          }
          this.map.length = 0;
        }
      };
    }
  });

  // node_modules/micromark-extension-gfm-table/lib/infer.js
  function gfmTableAlign(events, index2) {
    let inDelimiterRow = false;
    const align = [];
    while (index2 < events.length) {
      const event = events[index2];
      if (inDelimiterRow) {
        if (event[0] === "enter") {
          if (event[1].type === "tableContent") {
            align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
          }
        } else if (event[1].type === "tableContent") {
          if (events[index2 - 1][1].type === "tableDelimiterMarker") {
            const alignIndex = align.length - 1;
            align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
          }
        } else if (event[1].type === "tableDelimiterRow") {
          break;
        }
      } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
        inDelimiterRow = true;
      }
      index2 += 1;
    }
    return align;
  }
  var init_infer = __esm({
    "node_modules/micromark-extension-gfm-table/lib/infer.js"() {
    }
  });

  // node_modules/micromark-extension-gfm-table/lib/syntax.js
  function gfmTable() {
    return {
      flow: {
        null: {
          name: "table",
          tokenize: tokenizeTable,
          resolveAll: resolveTable
        }
      }
    };
  }
  function tokenizeTable(effects, ok3, nok) {
    const self2 = this;
    let size = 0;
    let sizeB = 0;
    let seen;
    return start;
    function start(code4) {
      let index2 = self2.events.length - 1;
      while (index2 > -1) {
        const type = self2.events[index2][1].type;
        if (type === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
        type === "linePrefix") index2--;
        else break;
      }
      const tail = index2 > -1 ? self2.events[index2][1].type : null;
      const next2 = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
      if (next2 === bodyRowStart && self2.parser.lazy[self2.now().line]) {
        return nok(code4);
      }
      return next2(code4);
    }
    function headRowBefore(code4) {
      effects.enter("tableHead");
      effects.enter("tableRow");
      return headRowStart(code4);
    }
    function headRowStart(code4) {
      if (code4 === 124) {
        return headRowBreak(code4);
      }
      seen = true;
      sizeB += 1;
      return headRowBreak(code4);
    }
    function headRowBreak(code4) {
      if (code4 === null) {
        return nok(code4);
      }
      if (markdownLineEnding(code4)) {
        if (sizeB > 1) {
          sizeB = 0;
          self2.interrupt = true;
          effects.exit("tableRow");
          effects.enter("lineEnding");
          effects.consume(code4);
          effects.exit("lineEnding");
          return headDelimiterStart;
        }
        return nok(code4);
      }
      if (markdownSpace(code4)) {
        return factorySpace(effects, headRowBreak, "whitespace")(code4);
      }
      sizeB += 1;
      if (seen) {
        seen = false;
        size += 1;
      }
      if (code4 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code4);
        effects.exit("tableCellDivider");
        seen = true;
        return headRowBreak;
      }
      effects.enter("data");
      return headRowData(code4);
    }
    function headRowData(code4) {
      if (code4 === null || code4 === 124 || markdownLineEndingOrSpace(code4)) {
        effects.exit("data");
        return headRowBreak(code4);
      }
      effects.consume(code4);
      return code4 === 92 ? headRowEscape : headRowData;
    }
    function headRowEscape(code4) {
      if (code4 === 92 || code4 === 124) {
        effects.consume(code4);
        return headRowData;
      }
      return headRowData(code4);
    }
    function headDelimiterStart(code4) {
      self2.interrupt = false;
      if (self2.parser.lazy[self2.now().line]) {
        return nok(code4);
      }
      effects.enter("tableDelimiterRow");
      seen = false;
      if (markdownSpace(code4)) {
        return factorySpace(effects, headDelimiterBefore, "linePrefix", self2.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(code4);
      }
      return headDelimiterBefore(code4);
    }
    function headDelimiterBefore(code4) {
      if (code4 === 45 || code4 === 58) {
        return headDelimiterValueBefore(code4);
      }
      if (code4 === 124) {
        seen = true;
        effects.enter("tableCellDivider");
        effects.consume(code4);
        effects.exit("tableCellDivider");
        return headDelimiterCellBefore;
      }
      return headDelimiterNok(code4);
    }
    function headDelimiterCellBefore(code4) {
      if (markdownSpace(code4)) {
        return factorySpace(effects, headDelimiterValueBefore, "whitespace")(code4);
      }
      return headDelimiterValueBefore(code4);
    }
    function headDelimiterValueBefore(code4) {
      if (code4 === 58) {
        sizeB += 1;
        seen = true;
        effects.enter("tableDelimiterMarker");
        effects.consume(code4);
        effects.exit("tableDelimiterMarker");
        return headDelimiterLeftAlignmentAfter;
      }
      if (code4 === 45) {
        sizeB += 1;
        return headDelimiterLeftAlignmentAfter(code4);
      }
      if (code4 === null || markdownLineEnding(code4)) {
        return headDelimiterCellAfter(code4);
      }
      return headDelimiterNok(code4);
    }
    function headDelimiterLeftAlignmentAfter(code4) {
      if (code4 === 45) {
        effects.enter("tableDelimiterFiller");
        return headDelimiterFiller(code4);
      }
      return headDelimiterNok(code4);
    }
    function headDelimiterFiller(code4) {
      if (code4 === 45) {
        effects.consume(code4);
        return headDelimiterFiller;
      }
      if (code4 === 58) {
        seen = true;
        effects.exit("tableDelimiterFiller");
        effects.enter("tableDelimiterMarker");
        effects.consume(code4);
        effects.exit("tableDelimiterMarker");
        return headDelimiterRightAlignmentAfter;
      }
      effects.exit("tableDelimiterFiller");
      return headDelimiterRightAlignmentAfter(code4);
    }
    function headDelimiterRightAlignmentAfter(code4) {
      if (markdownSpace(code4)) {
        return factorySpace(effects, headDelimiterCellAfter, "whitespace")(code4);
      }
      return headDelimiterCellAfter(code4);
    }
    function headDelimiterCellAfter(code4) {
      if (code4 === 124) {
        return headDelimiterBefore(code4);
      }
      if (code4 === null || markdownLineEnding(code4)) {
        if (!seen || size !== sizeB) {
          return headDelimiterNok(code4);
        }
        effects.exit("tableDelimiterRow");
        effects.exit("tableHead");
        return ok3(code4);
      }
      return headDelimiterNok(code4);
    }
    function headDelimiterNok(code4) {
      return nok(code4);
    }
    function bodyRowStart(code4) {
      effects.enter("tableRow");
      return bodyRowBreak(code4);
    }
    function bodyRowBreak(code4) {
      if (code4 === 124) {
        effects.enter("tableCellDivider");
        effects.consume(code4);
        effects.exit("tableCellDivider");
        return bodyRowBreak;
      }
      if (code4 === null || markdownLineEnding(code4)) {
        effects.exit("tableRow");
        return ok3(code4);
      }
      if (markdownSpace(code4)) {
        return factorySpace(effects, bodyRowBreak, "whitespace")(code4);
      }
      effects.enter("data");
      return bodyRowData(code4);
    }
    function bodyRowData(code4) {
      if (code4 === null || code4 === 124 || markdownLineEndingOrSpace(code4)) {
        effects.exit("data");
        return bodyRowBreak(code4);
      }
      effects.consume(code4);
      return code4 === 92 ? bodyRowEscape : bodyRowData;
    }
    function bodyRowEscape(code4) {
      if (code4 === 92 || code4 === 124) {
        effects.consume(code4);
        return bodyRowData;
      }
      return bodyRowData(code4);
    }
  }
  function resolveTable(events, context) {
    let index2 = -1;
    let inFirstCellAwaitingPipe = true;
    let rowKind = 0;
    let lastCell = [0, 0, 0, 0];
    let cell = [0, 0, 0, 0];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    let currentTable;
    let currentBody;
    let currentCell;
    const map3 = new EditMap();
    while (++index2 < events.length) {
      const event = events[index2];
      const token = event[1];
      if (event[0] === "enter") {
        if (token.type === "tableHead") {
          afterHeadAwaitingFirstBodyRow = false;
          if (lastTableEnd !== 0) {
            flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
            currentBody = void 0;
            lastTableEnd = 0;
          }
          currentTable = {
            type: "table",
            start: Object.assign({}, token.start),
            // Note: correct end is set later.
            end: Object.assign({}, token.end)
          };
          map3.add(index2, 0, [["enter", currentTable, context]]);
        } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
          inFirstCellAwaitingPipe = true;
          currentCell = void 0;
          lastCell = [0, 0, 0, 0];
          cell = [0, index2 + 1, 0, 0];
          if (afterHeadAwaitingFirstBodyRow) {
            afterHeadAwaitingFirstBodyRow = false;
            currentBody = {
              type: "tableBody",
              start: Object.assign({}, token.start),
              // Note: correct end is set later.
              end: Object.assign({}, token.end)
            };
            map3.add(index2, 0, [["enter", currentBody, context]]);
          }
          rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
        } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
          inFirstCellAwaitingPipe = false;
          if (cell[2] === 0) {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
              lastCell = [0, 0, 0, 0];
            }
            cell[2] = index2;
          }
        } else if (token.type === "tableCellDivider") {
          if (inFirstCellAwaitingPipe) {
            inFirstCellAwaitingPipe = false;
          } else {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map3, context, lastCell, rowKind, void 0, currentCell);
            }
            lastCell = cell;
            cell = [lastCell[1], index2, 0, 0];
          }
        }
      } else if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = true;
        lastTableEnd = index2;
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        lastTableEnd = index2;
        if (lastCell[1] !== 0) {
          cell[0] = cell[1];
          currentCell = flushCell(map3, context, lastCell, rowKind, index2, currentCell);
        } else if (cell[1] !== 0) {
          currentCell = flushCell(map3, context, cell, rowKind, index2, currentCell);
        }
        rowKind = 0;
      } else if (rowKind && (token.type === "data" || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        cell[3] = index2;
      }
    }
    if (lastTableEnd !== 0) {
      flushTableEnd(map3, context, lastTableEnd, currentTable, currentBody);
    }
    map3.consume(context.events);
    index2 = -1;
    while (++index2 < context.events.length) {
      const event = context.events[index2];
      if (event[0] === "enter" && event[1].type === "table") {
        event[1]._align = gfmTableAlign(context.events, index2);
      }
    }
    return events;
  }
  function flushCell(map3, context, range, rowKind, rowEnd, previousCell) {
    const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
    const valueName = "tableContent";
    if (range[0] !== 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
      map3.add(range[0], 0, [["exit", previousCell, context]]);
    }
    const now = getPoint(context.events, range[1]);
    previousCell = {
      type: groupName,
      start: Object.assign({}, now),
      // Note: correct end is set later.
      end: Object.assign({}, now)
    };
    map3.add(range[1], 0, [["enter", previousCell, context]]);
    if (range[2] !== 0) {
      const relatedStart = getPoint(context.events, range[2]);
      const relatedEnd = getPoint(context.events, range[3]);
      const valueToken = {
        type: valueName,
        start: Object.assign({}, relatedStart),
        end: Object.assign({}, relatedEnd)
      };
      map3.add(range[2], 0, [["enter", valueToken, context]]);
      if (rowKind !== 2) {
        const start = context.events[range[2]];
        const end = context.events[range[3]];
        start[1].end = Object.assign({}, end[1].end);
        start[1].type = "chunkText";
        start[1].contentType = "text";
        if (range[3] > range[2] + 1) {
          const a = range[2] + 1;
          const b = range[3] - range[2] - 1;
          map3.add(a, b, []);
        }
      }
      map3.add(range[3] + 1, 0, [["exit", valueToken, context]]);
    }
    if (rowEnd !== void 0) {
      previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
      map3.add(rowEnd, 0, [["exit", previousCell, context]]);
      previousCell = void 0;
    }
    return previousCell;
  }
  function flushTableEnd(map3, context, index2, table2, tableBody) {
    const exits = [];
    const related = getPoint(context.events, index2);
    if (tableBody) {
      tableBody.end = Object.assign({}, related);
      exits.push(["exit", tableBody, context]);
    }
    table2.end = Object.assign({}, related);
    exits.push(["exit", table2, context]);
    map3.add(index2 + 1, 0, exits);
  }
  function getPoint(events, index2) {
    const event = events[index2];
    const side = event[0] === "enter" ? "start" : "end";
    return event[1][side];
  }
  var init_syntax4 = __esm({
    "node_modules/micromark-extension-gfm-table/lib/syntax.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      init_edit_map();
      init_infer();
    }
  });

  // node_modules/micromark-extension-gfm-table/index.js
  var init_micromark_extension_gfm_table = __esm({
    "node_modules/micromark-extension-gfm-table/index.js"() {
      init_syntax4();
    }
  });

  // node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
  function gfmTaskListItem() {
    return {
      text: {
        [91]: tasklistCheck
      }
    };
  }
  function tokenizeTasklistCheck(effects, ok3, nok) {
    const self2 = this;
    return open;
    function open(code4) {
      if (
        // Exit if there’s stuff before.
        self2.previous !== null || // Exit if not in the first content that is the first child of a list
        // item.
        !self2._gfmTasklistFirstContentOfListItem
      ) {
        return nok(code4);
      }
      effects.enter("taskListCheck");
      effects.enter("taskListCheckMarker");
      effects.consume(code4);
      effects.exit("taskListCheckMarker");
      return inside;
    }
    function inside(code4) {
      if (markdownLineEndingOrSpace(code4)) {
        effects.enter("taskListCheckValueUnchecked");
        effects.consume(code4);
        effects.exit("taskListCheckValueUnchecked");
        return close;
      }
      if (code4 === 88 || code4 === 120) {
        effects.enter("taskListCheckValueChecked");
        effects.consume(code4);
        effects.exit("taskListCheckValueChecked");
        return close;
      }
      return nok(code4);
    }
    function close(code4) {
      if (code4 === 93) {
        effects.enter("taskListCheckMarker");
        effects.consume(code4);
        effects.exit("taskListCheckMarker");
        effects.exit("taskListCheck");
        return after;
      }
      return nok(code4);
    }
    function after(code4) {
      if (markdownLineEnding(code4)) {
        return ok3(code4);
      }
      if (markdownSpace(code4)) {
        return effects.check({
          tokenize: spaceThenNonSpace
        }, ok3, nok)(code4);
      }
      return nok(code4);
    }
  }
  function spaceThenNonSpace(effects, ok3, nok) {
    return factorySpace(effects, after, "whitespace");
    function after(code4) {
      return code4 === null ? nok(code4) : ok3(code4);
    }
  }
  var tasklistCheck;
  var init_syntax5 = __esm({
    "node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js"() {
      init_micromark_factory_space();
      init_micromark_util_character();
      tasklistCheck = {
        name: "tasklistCheck",
        tokenize: tokenizeTasklistCheck
      };
    }
  });

  // node_modules/micromark-extension-gfm-task-list-item/index.js
  var init_micromark_extension_gfm_task_list_item = __esm({
    "node_modules/micromark-extension-gfm-task-list-item/index.js"() {
      init_syntax5();
    }
  });

  // node_modules/micromark-extension-gfm/index.js
  function gfm(options) {
    return combineExtensions([
      gfmAutolinkLiteral(),
      gfmFootnote(),
      gfmStrikethrough(options),
      gfmTable(),
      gfmTaskListItem()
    ]);
  }
  var init_micromark_extension_gfm = __esm({
    "node_modules/micromark-extension-gfm/index.js"() {
      init_micromark_util_combine_extensions();
      init_micromark_extension_gfm_autolink_literal();
      init_micromark_extension_gfm_footnote();
      init_micromark_extension_gfm_strikethrough();
      init_micromark_extension_gfm_table();
      init_micromark_extension_gfm_task_list_item();
    }
  });

  // node_modules/remark-gfm/lib/index.js
  function remarkGfm(options) {
    const self2 = (
      /** @type {Processor<Root>} */
      this
    );
    const settings = options || emptyOptions2;
    const data = self2.data();
    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
    micromarkExtensions.push(gfm(settings));
    fromMarkdownExtensions.push(gfmFromMarkdown());
    toMarkdownExtensions.push(gfmToMarkdown(settings));
  }
  var emptyOptions2;
  var init_lib20 = __esm({
    "node_modules/remark-gfm/lib/index.js"() {
      init_mdast_util_gfm();
      init_micromark_extension_gfm();
      emptyOptions2 = {};
    }
  });

  // node_modules/remark-gfm/index.js
  var remark_gfm_exports = {};
  __export(remark_gfm_exports, {
    default: () => remarkGfm
  });
  var init_remark_gfm = __esm({
    "node_modules/remark-gfm/index.js"() {
      init_lib20();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
  function blockquote2(state, node2) {
    const result = {
      type: "element",
      tagName: "blockquote",
      properties: {},
      children: state.wrap(state.all(node2), true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_blockquote2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/blockquote.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/break.js
  function hardBreak2(state, node2) {
    const result = { type: "element", tagName: "br", properties: {}, children: [] };
    state.patch(node2, result);
    return [state.applyData(node2, result), { type: "text", value: "\n" }];
  }
  var init_break2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/break.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/code.js
  function code3(state, node2) {
    const value = node2.value ? node2.value + "\n" : "";
    const properties = {};
    const language = node2.lang ? node2.lang.split(/\s+/) : [];
    if (language.length > 0) {
      properties.className = ["language-" + language[0]];
    }
    let result = {
      type: "element",
      tagName: "code",
      properties,
      children: [{ type: "text", value }]
    };
    if (node2.meta) {
      result.data = { meta: node2.meta };
    }
    state.patch(node2, result);
    result = state.applyData(node2, result);
    result = { type: "element", tagName: "pre", properties: {}, children: [result] };
    state.patch(node2, result);
    return result;
  }
  var init_code2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/code.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/delete.js
  function strikethrough(state, node2) {
    const result = {
      type: "element",
      tagName: "del",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_delete = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/delete.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
  function emphasis2(state, node2) {
    const result = {
      type: "element",
      tagName: "em",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_emphasis2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/emphasis.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
  function footnoteReference2(state, node2) {
    const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
    const id = String(node2.identifier).toUpperCase();
    const safeId = normalizeUri(id.toLowerCase());
    const index2 = state.footnoteOrder.indexOf(id);
    let counter;
    let reuseCounter = state.footnoteCounts.get(id);
    if (reuseCounter === void 0) {
      reuseCounter = 0;
      state.footnoteOrder.push(id);
      counter = state.footnoteOrder.length;
    } else {
      counter = index2 + 1;
    }
    reuseCounter += 1;
    state.footnoteCounts.set(id, reuseCounter);
    const link3 = {
      type: "element",
      tagName: "a",
      properties: {
        href: "#" + clobberPrefix + "fn-" + safeId,
        id: clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
        dataFootnoteRef: true,
        ariaDescribedBy: ["footnote-label"]
      },
      children: [{ type: "text", value: String(counter) }]
    };
    state.patch(node2, link3);
    const sup = {
      type: "element",
      tagName: "sup",
      properties: {},
      children: [link3]
    };
    state.patch(node2, sup);
    return state.applyData(node2, sup);
  }
  var init_footnote_reference = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js"() {
      init_micromark_util_sanitize_uri();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/heading.js
  function heading2(state, node2) {
    const result = {
      type: "element",
      tagName: "h" + node2.depth,
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_heading2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/heading.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/html.js
  function html2(state, node2) {
    if (state.options.allowDangerousHtml) {
      const result = { type: "raw", value: node2.value };
      state.patch(node2, result);
      return state.applyData(node2, result);
    }
    return void 0;
  }
  var init_html2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/html.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/revert.js
  function revert(state, node2) {
    const subtype = node2.referenceType;
    let suffix = "]";
    if (subtype === "collapsed") {
      suffix += "[]";
    } else if (subtype === "full") {
      suffix += "[" + (node2.label || node2.identifier) + "]";
    }
    if (node2.type === "imageReference") {
      return [{ type: "text", value: "![" + node2.alt + suffix }];
    }
    const contents = state.all(node2);
    const head2 = contents[0];
    if (head2 && head2.type === "text") {
      head2.value = "[" + head2.value;
    } else {
      contents.unshift({ type: "text", value: "[" });
    }
    const tail = contents[contents.length - 1];
    if (tail && tail.type === "text") {
      tail.value += suffix;
    } else {
      contents.push({ type: "text", value: suffix });
    }
    return contents;
  }
  var init_revert = __esm({
    "node_modules/mdast-util-to-hast/lib/revert.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
  function imageReference2(state, node2) {
    const id = String(node2.identifier).toUpperCase();
    const definition3 = state.definitionById.get(id);
    if (!definition3) {
      return revert(state, node2);
    }
    const properties = { src: normalizeUri(definition3.url || ""), alt: node2.alt };
    if (definition3.title !== null && definition3.title !== void 0) {
      properties.title = definition3.title;
    }
    const result = { type: "element", tagName: "img", properties, children: [] };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_image_reference2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/image-reference.js"() {
      init_micromark_util_sanitize_uri();
      init_revert();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/image.js
  function image2(state, node2) {
    const properties = { src: normalizeUri(node2.url) };
    if (node2.alt !== null && node2.alt !== void 0) {
      properties.alt = node2.alt;
    }
    if (node2.title !== null && node2.title !== void 0) {
      properties.title = node2.title;
    }
    const result = { type: "element", tagName: "img", properties, children: [] };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_image2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/image.js"() {
      init_micromark_util_sanitize_uri();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
  function inlineCode2(state, node2) {
    const text9 = { type: "text", value: node2.value.replace(/\r?\n|\r/g, " ") };
    state.patch(node2, text9);
    const result = {
      type: "element",
      tagName: "code",
      properties: {},
      children: [text9]
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_inline_code2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/inline-code.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
  function linkReference2(state, node2) {
    const id = String(node2.identifier).toUpperCase();
    const definition3 = state.definitionById.get(id);
    if (!definition3) {
      return revert(state, node2);
    }
    const properties = { href: normalizeUri(definition3.url || "") };
    if (definition3.title !== null && definition3.title !== void 0) {
      properties.title = definition3.title;
    }
    const result = {
      type: "element",
      tagName: "a",
      properties,
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_link_reference2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/link-reference.js"() {
      init_micromark_util_sanitize_uri();
      init_revert();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/link.js
  function link2(state, node2) {
    const properties = { href: normalizeUri(node2.url) };
    if (node2.title !== null && node2.title !== void 0) {
      properties.title = node2.title;
    }
    const result = {
      type: "element",
      tagName: "a",
      properties,
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_link2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/link.js"() {
      init_micromark_util_sanitize_uri();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/list-item.js
  function listItem2(state, node2, parent) {
    const results = state.all(node2);
    const loose = parent ? listLoose(parent) : listItemLoose(node2);
    const properties = {};
    const children = [];
    if (typeof node2.checked === "boolean") {
      const head2 = results[0];
      let paragraph3;
      if (head2 && head2.type === "element" && head2.tagName === "p") {
        paragraph3 = head2;
      } else {
        paragraph3 = { type: "element", tagName: "p", properties: {}, children: [] };
        results.unshift(paragraph3);
      }
      if (paragraph3.children.length > 0) {
        paragraph3.children.unshift({ type: "text", value: " " });
      }
      paragraph3.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: node2.checked, disabled: true },
        children: []
      });
      properties.className = ["task-list-item"];
    }
    let index2 = -1;
    while (++index2 < results.length) {
      const child = results[index2];
      if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
        children.push({ type: "text", value: "\n" });
      }
      if (child.type === "element" && child.tagName === "p" && !loose) {
        children.push(...child.children);
      } else {
        children.push(child);
      }
    }
    const tail = results[results.length - 1];
    if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) {
      children.push({ type: "text", value: "\n" });
    }
    const result = { type: "element", tagName: "li", properties, children };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function listLoose(node2) {
    let loose = false;
    if (node2.type === "list") {
      loose = node2.spread || false;
      const children = node2.children;
      let index2 = -1;
      while (!loose && ++index2 < children.length) {
        loose = listItemLoose(children[index2]);
      }
    }
    return loose;
  }
  function listItemLoose(node2) {
    const spread = node2.spread;
    return spread === null || spread === void 0 ? node2.children.length > 1 : spread;
  }
  var init_list_item2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/list-item.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/list.js
  function list3(state, node2) {
    const properties = {};
    const results = state.all(node2);
    let index2 = -1;
    if (typeof node2.start === "number" && node2.start !== 1) {
      properties.start = node2.start;
    }
    while (++index2 < results.length) {
      const child = results[index2];
      if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
        properties.className = ["contains-task-list"];
        break;
      }
    }
    const result = {
      type: "element",
      tagName: node2.ordered ? "ol" : "ul",
      properties,
      children: state.wrap(results, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_list3 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/list.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
  function paragraph2(state, node2) {
    const result = {
      type: "element",
      tagName: "p",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_paragraph2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/paragraph.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/root.js
  function root2(state, node2) {
    const result = { type: "root", children: state.wrap(state.all(node2)) };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_root2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/root.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/strong.js
  function strong2(state, node2) {
    const result = {
      type: "element",
      tagName: "strong",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_strong2 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/strong.js"() {
    }
  });

  // node_modules/unist-util-position/lib/index.js
  function point3(type) {
    return point5;
    function point5(node2) {
      const point6 = node2 && node2.position && node2.position[type] || {};
      if (typeof point6.line === "number" && point6.line > 0 && typeof point6.column === "number" && point6.column > 0) {
        return {
          line: point6.line,
          column: point6.column,
          offset: typeof point6.offset === "number" && point6.offset > -1 ? point6.offset : void 0
        };
      }
    }
  }
  function position2(node2) {
    const start = pointStart(node2);
    const end = pointEnd(node2);
    if (start && end) {
      return { start, end };
    }
  }
  var pointEnd, pointStart;
  var init_lib21 = __esm({
    "node_modules/unist-util-position/lib/index.js"() {
      pointEnd = point3("end");
      pointStart = point3("start");
    }
  });

  // node_modules/unist-util-position/index.js
  var init_unist_util_position = __esm({
    "node_modules/unist-util-position/index.js"() {
      init_lib21();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/table.js
  function table(state, node2) {
    const rows = state.all(node2);
    const firstRow = rows.shift();
    const tableContent = [];
    if (firstRow) {
      const head2 = {
        type: "element",
        tagName: "thead",
        properties: {},
        children: state.wrap([firstRow], true)
      };
      state.patch(node2.children[0], head2);
      tableContent.push(head2);
    }
    if (rows.length > 0) {
      const body3 = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: state.wrap(rows, true)
      };
      const start = pointStart(node2.children[1]);
      const end = pointEnd(node2.children[node2.children.length - 1]);
      if (start && end) body3.position = { start, end };
      tableContent.push(body3);
    }
    const result = {
      type: "element",
      tagName: "table",
      properties: {},
      children: state.wrap(tableContent, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_table = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/table.js"() {
      init_unist_util_position();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/table-row.js
  function tableRow(state, node2, parent) {
    const siblings2 = parent ? parent.children : void 0;
    const rowIndex = siblings2 ? siblings2.indexOf(node2) : 1;
    const tagName = rowIndex === 0 ? "th" : "td";
    const align = parent && parent.type === "table" ? parent.align : void 0;
    const length = align ? align.length : node2.children.length;
    let cellIndex = -1;
    const cells2 = [];
    while (++cellIndex < length) {
      const cell = node2.children[cellIndex];
      const properties = {};
      const alignValue = align ? align[cellIndex] : void 0;
      if (alignValue) {
        properties.align = alignValue;
      }
      let result2 = { type: "element", tagName, properties, children: [] };
      if (cell) {
        result2.children = state.all(cell);
        state.patch(cell, result2);
        result2 = state.applyData(cell, result2);
      }
      cells2.push(result2);
    }
    const result = {
      type: "element",
      tagName: "tr",
      properties: {},
      children: state.wrap(cells2, true)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_table_row = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/table-row.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
  function tableCell(state, node2) {
    const result = {
      type: "element",
      tagName: "td",
      // Assume body cell.
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_table_cell = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/table-cell.js"() {
    }
  });

  // node_modules/trim-lines/index.js
  function trimLines(value) {
    const source = String(value);
    const search3 = /\r?\n|\r/g;
    let match = search3.exec(source);
    let last = 0;
    const lines = [];
    while (match) {
      lines.push(
        trimLine(source.slice(last, match.index), last > 0, true),
        match[0]
      );
      last = match.index + match[0].length;
      match = search3.exec(source);
    }
    lines.push(trimLine(source.slice(last), last > 0, false));
    return lines.join("");
  }
  function trimLine(value, start, end) {
    let startIndex = 0;
    let endIndex = value.length;
    if (start) {
      let code4 = value.codePointAt(startIndex);
      while (code4 === tab || code4 === space) {
        startIndex++;
        code4 = value.codePointAt(startIndex);
      }
    }
    if (end) {
      let code4 = value.codePointAt(endIndex - 1);
      while (code4 === tab || code4 === space) {
        endIndex--;
        code4 = value.codePointAt(endIndex - 1);
      }
    }
    return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
  }
  var tab, space;
  var init_trim_lines = __esm({
    "node_modules/trim-lines/index.js"() {
      tab = 9;
      space = 32;
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/text.js
  function text5(state, node2) {
    const result = { type: "text", value: trimLines(String(node2.value)) };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_text3 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/text.js"() {
      init_trim_lines();
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
  function thematicBreak3(state, node2) {
    const result = {
      type: "element",
      tagName: "hr",
      properties: {},
      children: []
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  var init_thematic_break3 = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js"() {
    }
  });

  // node_modules/mdast-util-to-hast/lib/handlers/index.js
  function ignore() {
    return void 0;
  }
  var handlers;
  var init_handlers = __esm({
    "node_modules/mdast-util-to-hast/lib/handlers/index.js"() {
      init_blockquote2();
      init_break2();
      init_code2();
      init_delete();
      init_emphasis2();
      init_footnote_reference();
      init_heading2();
      init_html2();
      init_image_reference2();
      init_image2();
      init_inline_code2();
      init_link_reference2();
      init_link2();
      init_list_item2();
      init_list3();
      init_paragraph2();
      init_root2();
      init_strong2();
      init_table();
      init_table_row();
      init_table_cell();
      init_text3();
      init_thematic_break3();
      handlers = {
        blockquote: blockquote2,
        break: hardBreak2,
        code: code3,
        delete: strikethrough,
        emphasis: emphasis2,
        footnoteReference: footnoteReference2,
        heading: heading2,
        html: html2,
        imageReference: imageReference2,
        image: image2,
        inlineCode: inlineCode2,
        linkReference: linkReference2,
        link: link2,
        listItem: listItem2,
        list: list3,
        paragraph: paragraph2,
        // @ts-expect-error: root is different, but hard to type.
        root: root2,
        strong: strong2,
        table,
        tableCell,
        tableRow,
        text: text5,
        thematicBreak: thematicBreak3,
        toml: ignore,
        yaml: ignore,
        definition: ignore,
        footnoteDefinition: ignore
      };
    }
  });

  // node_modules/@ungap/structured-clone/esm/types.js
  var VOID, PRIMITIVE, ARRAY, OBJECT, DATE, REGEXP, MAP, SET, ERROR, BIGINT;
  var init_types = __esm({
    "node_modules/@ungap/structured-clone/esm/types.js"() {
      VOID = -1;
      PRIMITIVE = 0;
      ARRAY = 1;
      OBJECT = 2;
      DATE = 3;
      REGEXP = 4;
      MAP = 5;
      SET = 6;
      ERROR = 7;
      BIGINT = 8;
    }
  });

  // node_modules/@ungap/structured-clone/esm/deserialize.js
  var env, guard, deserializer, deserialize;
  var init_deserialize = __esm({
    "node_modules/@ungap/structured-clone/esm/deserialize.js"() {
      init_types();
      env = typeof self === "object" ? self : globalThis;
      guard = (name, init) => {
        switch (name) {
          case "Function":
          case "SharedWorker":
          case "Worker":
          case "eval":
          case "setInterval":
          case "setTimeout":
            throw new TypeError("unable to deserialize " + name);
        }
        return new env[name](init);
      };
      deserializer = ($2, _) => {
        const as = (out, index2) => {
          $2.set(index2, out);
          return out;
        };
        const unpair = (index2) => {
          if ($2.has(index2))
            return $2.get(index2);
          const [type, value] = _[index2];
          switch (type) {
            case PRIMITIVE:
            case VOID:
              return as(value, index2);
            case ARRAY: {
              const arr = as([], index2);
              for (const index3 of value)
                arr.push(unpair(index3));
              return arr;
            }
            case OBJECT: {
              const object = as({}, index2);
              for (const [key2, index3] of value)
                object[unpair(key2)] = unpair(index3);
              return object;
            }
            case DATE:
              return as(new Date(value), index2);
            case REGEXP: {
              const { source, flags } = value;
              return as(new RegExp(source, flags), index2);
            }
            case MAP: {
              const map3 = as(/* @__PURE__ */ new Map(), index2);
              for (const [key2, index3] of value)
                map3.set(unpair(key2), unpair(index3));
              return map3;
            }
            case SET: {
              const set = as(/* @__PURE__ */ new Set(), index2);
              for (const index3 of value)
                set.add(unpair(index3));
              return set;
            }
            case ERROR: {
              const { name, message } = value;
              return as(guard(name, message), index2);
            }
            case BIGINT:
              return as(BigInt(value), index2);
            case "BigInt":
              return as(Object(BigInt(value)), index2);
            case "ArrayBuffer":
              return as(new Uint8Array(value).buffer, value);
            case "DataView": {
              const { buffer } = new Uint8Array(value);
              return as(new DataView(buffer), value);
            }
          }
          return as(guard(type, value), index2);
        };
        return unpair;
      };
      deserialize = (serialized) => deserializer(/* @__PURE__ */ new Map(), serialized)(0);
    }
  });

  // node_modules/@ungap/structured-clone/esm/serialize.js
  var EMPTY, toString2, keys, typeOf, shouldSkip, serializer, serialize2;
  var init_serialize = __esm({
    "node_modules/@ungap/structured-clone/esm/serialize.js"() {
      init_types();
      EMPTY = "";
      ({ toString: toString2 } = {});
      ({ keys } = Object);
      typeOf = (value) => {
        const type = typeof value;
        if (type !== "object" || !value)
          return [PRIMITIVE, type];
        const asString = toString2.call(value).slice(8, -1);
        switch (asString) {
          case "Array":
            return [ARRAY, EMPTY];
          case "Object":
            return [OBJECT, EMPTY];
          case "Date":
            return [DATE, EMPTY];
          case "RegExp":
            return [REGEXP, EMPTY];
          case "Map":
            return [MAP, EMPTY];
          case "Set":
            return [SET, EMPTY];
          case "DataView":
            return [ARRAY, asString];
        }
        if (asString.includes("Array"))
          return [ARRAY, asString];
        if (asString.includes("Error"))
          return [ERROR, asString];
        return [OBJECT, asString];
      };
      shouldSkip = ([TYPE, type]) => TYPE === PRIMITIVE && (type === "function" || type === "symbol");
      serializer = (strict, json, $2, _) => {
        const as = (out, value) => {
          const index2 = _.push(out) - 1;
          $2.set(value, index2);
          return index2;
        };
        const pair = (value) => {
          if ($2.has(value))
            return $2.get(value);
          let [TYPE, type] = typeOf(value);
          switch (TYPE) {
            case PRIMITIVE: {
              let entry = value;
              switch (type) {
                case "bigint":
                  TYPE = BIGINT;
                  entry = value.toString();
                  break;
                case "function":
                case "symbol":
                  if (strict)
                    throw new TypeError("unable to serialize " + type);
                  entry = null;
                  break;
                case "undefined":
                  return as([VOID], value);
              }
              return as([TYPE, entry], value);
            }
            case ARRAY: {
              if (type) {
                let spread = value;
                if (type === "DataView") {
                  spread = new Uint8Array(value.buffer);
                } else if (type === "ArrayBuffer") {
                  spread = new Uint8Array(value);
                }
                return as([type, [...spread]], value);
              }
              const arr = [];
              const index2 = as([TYPE, arr], value);
              for (const entry of value)
                arr.push(pair(entry));
              return index2;
            }
            case OBJECT: {
              if (type) {
                switch (type) {
                  case "BigInt":
                    return as([type, value.toString()], value);
                  case "Boolean":
                  case "Number":
                  case "String":
                    return as([type, value.valueOf()], value);
                }
              }
              if (json && "toJSON" in value)
                return pair(value.toJSON());
              const entries = [];
              const index2 = as([TYPE, entries], value);
              for (const key2 of keys(value)) {
                if (strict || !shouldSkip(typeOf(value[key2])))
                  entries.push([pair(key2), pair(value[key2])]);
              }
              return index2;
            }
            case DATE:
              return as([TYPE, isNaN(value.getTime()) ? EMPTY : value.toISOString()], value);
            case REGEXP: {
              const { source, flags } = value;
              return as([TYPE, { source, flags }], value);
            }
            case MAP: {
              const entries = [];
              const index2 = as([TYPE, entries], value);
              for (const [key2, entry] of value) {
                if (strict || !(shouldSkip(typeOf(key2)) || shouldSkip(typeOf(entry))))
                  entries.push([pair(key2), pair(entry)]);
              }
              return index2;
            }
            case SET: {
              const entries = [];
              const index2 = as([TYPE, entries], value);
              for (const entry of value) {
                if (strict || !shouldSkip(typeOf(entry)))
                  entries.push(pair(entry));
              }
              return index2;
            }
          }
          const { message } = value;
          return as([TYPE, { name: type, message }], value);
        };
        return pair;
      };
      serialize2 = (value, { json, lossy } = {}) => {
        const _ = [];
        return serializer(!(json || lossy), !!json, /* @__PURE__ */ new Map(), _)(value), _;
      };
    }
  });

  // node_modules/@ungap/structured-clone/esm/index.js
  var esm_default;
  var init_esm = __esm({
    "node_modules/@ungap/structured-clone/esm/index.js"() {
      init_deserialize();
      init_serialize();
      esm_default = typeof structuredClone === "function" ? (
        /* c8 ignore start */
        (any, options) => options && ("json" in options || "lossy" in options) ? deserialize(serialize2(any, options)) : structuredClone(any)
      ) : (any, options) => deserialize(serialize2(any, options));
    }
  });

  // node_modules/mdast-util-to-hast/lib/footer.js
  function defaultFootnoteBackContent(_, rereferenceIndex) {
    const result = [{ type: "text", value: "\u21A9" }];
    if (rereferenceIndex > 1) {
      result.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(rereferenceIndex) }]
      });
    }
    return result;
  }
  function defaultFootnoteBackLabel(referenceIndex, rereferenceIndex) {
    return "Back to reference " + (referenceIndex + 1) + (rereferenceIndex > 1 ? "-" + rereferenceIndex : "");
  }
  function footer(state) {
    const clobberPrefix = typeof state.options.clobberPrefix === "string" ? state.options.clobberPrefix : "user-content-";
    const footnoteBackContent = state.options.footnoteBackContent || defaultFootnoteBackContent;
    const footnoteBackLabel = state.options.footnoteBackLabel || defaultFootnoteBackLabel;
    const footnoteLabel = state.options.footnoteLabel || "Footnotes";
    const footnoteLabelTagName = state.options.footnoteLabelTagName || "h2";
    const footnoteLabelProperties = state.options.footnoteLabelProperties || {
      className: ["sr-only"]
    };
    const listItems = [];
    let referenceIndex = -1;
    while (++referenceIndex < state.footnoteOrder.length) {
      const definition3 = state.footnoteById.get(
        state.footnoteOrder[referenceIndex]
      );
      if (!definition3) {
        continue;
      }
      const content3 = state.all(definition3);
      const id = String(definition3.identifier).toUpperCase();
      const safeId = normalizeUri(id.toLowerCase());
      let rereferenceIndex = 0;
      const backReferences = [];
      const counts = state.footnoteCounts.get(id);
      while (counts !== void 0 && ++rereferenceIndex <= counts) {
        if (backReferences.length > 0) {
          backReferences.push({ type: "text", value: " " });
        }
        let children = typeof footnoteBackContent === "string" ? footnoteBackContent : footnoteBackContent(referenceIndex, rereferenceIndex);
        if (typeof children === "string") {
          children = { type: "text", value: children };
        }
        backReferences.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + clobberPrefix + "fnref-" + safeId + (rereferenceIndex > 1 ? "-" + rereferenceIndex : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof footnoteBackLabel === "string" ? footnoteBackLabel : footnoteBackLabel(referenceIndex, rereferenceIndex),
            className: ["data-footnote-backref"]
          },
          children: Array.isArray(children) ? children : [children]
        });
      }
      const tail = content3[content3.length - 1];
      if (tail && tail.type === "element" && tail.tagName === "p") {
        const tailTail = tail.children[tail.children.length - 1];
        if (tailTail && tailTail.type === "text") {
          tailTail.value += " ";
        } else {
          tail.children.push({ type: "text", value: " " });
        }
        tail.children.push(...backReferences);
      } else {
        content3.push(...backReferences);
      }
      const listItem3 = {
        type: "element",
        tagName: "li",
        properties: { id: clobberPrefix + "fn-" + safeId },
        children: state.wrap(content3, true)
      };
      state.patch(definition3, listItem3);
      listItems.push(listItem3);
    }
    if (listItems.length === 0) {
      return;
    }
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: true, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: footnoteLabelTagName,
          properties: {
            ...esm_default(footnoteLabelProperties),
            id: "footnote-label"
          },
          children: [{ type: "text", value: footnoteLabel }]
        },
        { type: "text", value: "\n" },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: state.wrap(listItems, true)
        },
        { type: "text", value: "\n" }
      ]
    };
  }
  var init_footer = __esm({
    "node_modules/mdast-util-to-hast/lib/footer.js"() {
      init_esm();
      init_micromark_util_sanitize_uri();
    }
  });

  // node_modules/mdast-util-to-hast/lib/state.js
  function createState(tree, options) {
    const settings = options || emptyOptions3;
    const definitionById = /* @__PURE__ */ new Map();
    const footnoteById = /* @__PURE__ */ new Map();
    const footnoteCounts = /* @__PURE__ */ new Map();
    const handlers2 = { ...handlers, ...settings.handlers };
    const state = {
      all: all6,
      applyData,
      definitionById,
      footnoteById,
      footnoteCounts,
      footnoteOrder: [],
      handlers: handlers2,
      one: one5,
      options: settings,
      patch,
      wrap: wrap2
    };
    visit(tree, function(node2) {
      if (node2.type === "definition" || node2.type === "footnoteDefinition") {
        const map3 = node2.type === "definition" ? definitionById : footnoteById;
        const id = String(node2.identifier).toUpperCase();
        if (!map3.has(id)) {
          map3.set(id, node2);
        }
      }
    });
    return state;
    function one5(node2, parent) {
      const type = node2.type;
      const handle3 = state.handlers[type];
      if (own4.call(state.handlers, type) && handle3) {
        return handle3(state, node2, parent);
      }
      if (state.options.passThrough && state.options.passThrough.includes(type)) {
        if ("children" in node2) {
          const { children, ...shallow } = node2;
          const result = esm_default(shallow);
          result.children = state.all(node2);
          return result;
        }
        return esm_default(node2);
      }
      const unknown3 = state.options.unknownHandler || defaultUnknownHandler;
      return unknown3(state, node2, parent);
    }
    function all6(parent) {
      const values = [];
      if ("children" in parent) {
        const nodes = parent.children;
        let index2 = -1;
        while (++index2 < nodes.length) {
          const result = state.one(nodes[index2], parent);
          if (result) {
            if (index2 && nodes[index2 - 1].type === "break") {
              if (!Array.isArray(result) && result.type === "text") {
                result.value = trimMarkdownSpaceStart(result.value);
              }
              if (!Array.isArray(result) && result.type === "element") {
                const head2 = result.children[0];
                if (head2 && head2.type === "text") {
                  head2.value = trimMarkdownSpaceStart(head2.value);
                }
              }
            }
            if (Array.isArray(result)) {
              values.push(...result);
            } else {
              values.push(result);
            }
          }
        }
      }
      return values;
    }
  }
  function patch(from, to) {
    if (from.position) to.position = position2(from);
  }
  function applyData(from, to) {
    let result = to;
    if (from && from.data) {
      const hName = from.data.hName;
      const hChildren = from.data.hChildren;
      const hProperties = from.data.hProperties;
      if (typeof hName === "string") {
        if (result.type === "element") {
          result.tagName = hName;
        } else {
          const children = "children" in result ? result.children : [result];
          result = { type: "element", tagName: hName, properties: {}, children };
        }
      }
      if (result.type === "element" && hProperties) {
        Object.assign(result.properties, esm_default(hProperties));
      }
      if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) {
        result.children = hChildren;
      }
    }
    return result;
  }
  function defaultUnknownHandler(state, node2) {
    const data = node2.data || {};
    const result = "value" in node2 && !(own4.call(data, "hProperties") || own4.call(data, "hChildren")) ? { type: "text", value: node2.value } : {
      type: "element",
      tagName: "div",
      properties: {},
      children: state.all(node2)
    };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  function wrap2(nodes, loose) {
    const result = [];
    let index2 = -1;
    if (loose) {
      result.push({ type: "text", value: "\n" });
    }
    while (++index2 < nodes.length) {
      if (index2) result.push({ type: "text", value: "\n" });
      result.push(nodes[index2]);
    }
    if (loose && nodes.length > 0) {
      result.push({ type: "text", value: "\n" });
    }
    return result;
  }
  function trimMarkdownSpaceStart(value) {
    let index2 = 0;
    let code4 = value.charCodeAt(index2);
    while (code4 === 9 || code4 === 32) {
      index2++;
      code4 = value.charCodeAt(index2);
    }
    return value.slice(index2);
  }
  var own4, emptyOptions3;
  var init_state = __esm({
    "node_modules/mdast-util-to-hast/lib/state.js"() {
      init_esm();
      init_unist_util_visit();
      init_unist_util_position();
      init_handlers();
      own4 = {}.hasOwnProperty;
      emptyOptions3 = {};
    }
  });

  // node_modules/mdast-util-to-hast/lib/index.js
  function toHast(tree, options) {
    const state = createState(tree, options);
    const node2 = state.one(tree, void 0);
    const foot = footer(state);
    const result = Array.isArray(node2) ? { type: "root", children: node2 } : node2 || { type: "root", children: [] };
    if (foot) {
      ok("children" in result);
      result.children.push({ type: "text", value: "\n" }, foot);
    }
    return result;
  }
  var init_lib22 = __esm({
    "node_modules/mdast-util-to-hast/lib/index.js"() {
      init_default();
      init_footer();
      init_state();
    }
  });

  // node_modules/mdast-util-to-hast/index.js
  var init_mdast_util_to_hast = __esm({
    "node_modules/mdast-util-to-hast/index.js"() {
      init_handlers();
      init_lib22();
      init_footer();
    }
  });

  // node_modules/remark-rehype/lib/index.js
  function remarkRehype(destination, options) {
    if (destination && "run" in destination) {
      return async function(tree, file) {
        const hastTree = (
          /** @type {HastRoot} */
          toHast(tree, { file, ...options })
        );
        await destination.run(hastTree, file);
      };
    }
    return function(tree, file) {
      return (
        /** @type {HastRoot} */
        toHast(tree, { file, ...destination || options })
      );
    };
  }
  var init_lib23 = __esm({
    "node_modules/remark-rehype/lib/index.js"() {
      init_mdast_util_to_hast();
    }
  });

  // node_modules/remark-rehype/index.js
  var remark_rehype_exports = {};
  __export(remark_rehype_exports, {
    default: () => remarkRehype,
    defaultFootnoteBackContent: () => defaultFootnoteBackContent,
    defaultFootnoteBackLabel: () => defaultFootnoteBackLabel,
    defaultHandlers: () => handlers
  });
  var init_remark_rehype = __esm({
    "node_modules/remark-rehype/index.js"() {
      init_mdast_util_to_hast();
      init_lib23();
    }
  });

  // node_modules/property-information/lib/util/schema.js
  var Schema;
  var init_schema = __esm({
    "node_modules/property-information/lib/util/schema.js"() {
      Schema = class {
        /**
         * @param {SchemaType['property']} property
         *   Property.
         * @param {SchemaType['normal']} normal
         *   Normal.
         * @param {Space | undefined} [space]
         *   Space.
         * @returns
         *   Schema.
         */
        constructor(property, normal, space2) {
          this.normal = normal;
          this.property = property;
          if (space2) {
            this.space = space2;
          }
        }
      };
      Schema.prototype.normal = {};
      Schema.prototype.property = {};
      Schema.prototype.space = void 0;
    }
  });

  // node_modules/property-information/lib/util/merge.js
  function merge(definitions, space2) {
    const property = {};
    const normal = {};
    for (const definition3 of definitions) {
      Object.assign(property, definition3.property);
      Object.assign(normal, definition3.normal);
    }
    return new Schema(property, normal, space2);
  }
  var init_merge = __esm({
    "node_modules/property-information/lib/util/merge.js"() {
      init_schema();
    }
  });

  // node_modules/property-information/lib/normalize.js
  function normalize2(value) {
    return value.toLowerCase();
  }
  var init_normalize = __esm({
    "node_modules/property-information/lib/normalize.js"() {
    }
  });

  // node_modules/property-information/lib/util/info.js
  var Info;
  var init_info = __esm({
    "node_modules/property-information/lib/util/info.js"() {
      Info = class {
        /**
         * @param {string} property
         *   Property.
         * @param {string} attribute
         *   Attribute.
         * @returns
         *   Info.
         */
        constructor(property, attribute) {
          this.attribute = attribute;
          this.property = property;
        }
      };
      Info.prototype.attribute = "";
      Info.prototype.booleanish = false;
      Info.prototype.boolean = false;
      Info.prototype.commaOrSpaceSeparated = false;
      Info.prototype.commaSeparated = false;
      Info.prototype.defined = false;
      Info.prototype.mustUseProperty = false;
      Info.prototype.number = false;
      Info.prototype.overloadedBoolean = false;
      Info.prototype.property = "";
      Info.prototype.spaceSeparated = false;
      Info.prototype.space = void 0;
    }
  });

  // node_modules/property-information/lib/util/types.js
  var types_exports = {};
  __export(types_exports, {
    boolean: () => boolean,
    booleanish: () => booleanish,
    commaOrSpaceSeparated: () => commaOrSpaceSeparated,
    commaSeparated: () => commaSeparated,
    number: () => number,
    overloadedBoolean: () => overloadedBoolean,
    spaceSeparated: () => spaceSeparated
  });
  function increment() {
    return 2 ** ++powers;
  }
  var powers, boolean, booleanish, overloadedBoolean, number, spaceSeparated, commaSeparated, commaOrSpaceSeparated;
  var init_types2 = __esm({
    "node_modules/property-information/lib/util/types.js"() {
      powers = 0;
      boolean = increment();
      booleanish = increment();
      overloadedBoolean = increment();
      number = increment();
      spaceSeparated = increment();
      commaSeparated = increment();
      commaOrSpaceSeparated = increment();
    }
  });

  // node_modules/property-information/lib/util/defined-info.js
  function mark(values, key2, value) {
    if (value) {
      values[key2] = value;
    }
  }
  var checks, DefinedInfo;
  var init_defined_info = __esm({
    "node_modules/property-information/lib/util/defined-info.js"() {
      init_info();
      init_types2();
      checks = /** @type {ReadonlyArray<keyof typeof types>} */
      Object.keys(types_exports);
      DefinedInfo = class extends Info {
        /**
         * @constructor
         * @param {string} property
         *   Property.
         * @param {string} attribute
         *   Attribute.
         * @param {number | null | undefined} [mask]
         *   Mask.
         * @param {Space | undefined} [space]
         *   Space.
         * @returns
         *   Info.
         */
        constructor(property, attribute, mask, space2) {
          let index2 = -1;
          super(property, attribute);
          mark(this, "space", space2);
          if (typeof mask === "number") {
            while (++index2 < checks.length) {
              const check = checks[index2];
              mark(this, checks[index2], (mask & types_exports[check]) === types_exports[check]);
            }
          }
        }
      };
      DefinedInfo.prototype.defined = true;
    }
  });

  // node_modules/property-information/lib/util/create.js
  function create(definition3) {
    const properties = {};
    const normals = {};
    for (const [property, value] of Object.entries(definition3.properties)) {
      const info = new DefinedInfo(
        property,
        definition3.transform(definition3.attributes || {}, property),
        value,
        definition3.space
      );
      if (definition3.mustUseProperty && definition3.mustUseProperty.includes(property)) {
        info.mustUseProperty = true;
      }
      properties[property] = info;
      normals[normalize2(property)] = property;
      normals[normalize2(info.attribute)] = property;
    }
    return new Schema(properties, normals, definition3.space);
  }
  var init_create = __esm({
    "node_modules/property-information/lib/util/create.js"() {
      init_normalize();
      init_defined_info();
      init_schema();
    }
  });

  // node_modules/property-information/lib/aria.js
  var aria;
  var init_aria = __esm({
    "node_modules/property-information/lib/aria.js"() {
      init_create();
      init_types2();
      aria = create({
        properties: {
          ariaActiveDescendant: null,
          ariaAtomic: booleanish,
          ariaAutoComplete: null,
          ariaBusy: booleanish,
          ariaChecked: booleanish,
          ariaColCount: number,
          ariaColIndex: number,
          ariaColSpan: number,
          ariaControls: spaceSeparated,
          ariaCurrent: null,
          ariaDescribedBy: spaceSeparated,
          ariaDetails: null,
          ariaDisabled: booleanish,
          ariaDropEffect: spaceSeparated,
          ariaErrorMessage: null,
          ariaExpanded: booleanish,
          ariaFlowTo: spaceSeparated,
          ariaGrabbed: booleanish,
          ariaHasPopup: null,
          ariaHidden: booleanish,
          ariaInvalid: null,
          ariaKeyShortcuts: null,
          ariaLabel: null,
          ariaLabelledBy: spaceSeparated,
          ariaLevel: number,
          ariaLive: null,
          ariaModal: booleanish,
          ariaMultiLine: booleanish,
          ariaMultiSelectable: booleanish,
          ariaOrientation: null,
          ariaOwns: spaceSeparated,
          ariaPlaceholder: null,
          ariaPosInSet: number,
          ariaPressed: booleanish,
          ariaReadOnly: booleanish,
          ariaRelevant: null,
          ariaRequired: booleanish,
          ariaRoleDescription: spaceSeparated,
          ariaRowCount: number,
          ariaRowIndex: number,
          ariaRowSpan: number,
          ariaSelected: booleanish,
          ariaSetSize: number,
          ariaSort: null,
          ariaValueMax: number,
          ariaValueMin: number,
          ariaValueNow: number,
          ariaValueText: null,
          role: null
        },
        transform(_, property) {
          return property === "role" ? property : "aria-" + property.slice(4).toLowerCase();
        }
      });
    }
  });

  // node_modules/property-information/lib/util/case-sensitive-transform.js
  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
  }
  var init_case_sensitive_transform = __esm({
    "node_modules/property-information/lib/util/case-sensitive-transform.js"() {
    }
  });

  // node_modules/property-information/lib/util/case-insensitive-transform.js
  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase());
  }
  var init_case_insensitive_transform = __esm({
    "node_modules/property-information/lib/util/case-insensitive-transform.js"() {
      init_case_sensitive_transform();
    }
  });

  // node_modules/property-information/lib/html.js
  var html3;
  var init_html3 = __esm({
    "node_modules/property-information/lib/html.js"() {
      init_case_insensitive_transform();
      init_create();
      init_types2();
      html3 = create({
        attributes: {
          acceptcharset: "accept-charset",
          classname: "class",
          htmlfor: "for",
          httpequiv: "http-equiv"
        },
        mustUseProperty: ["checked", "multiple", "muted", "selected"],
        properties: {
          // Standard Properties.
          abbr: null,
          accept: commaSeparated,
          acceptCharset: spaceSeparated,
          accessKey: spaceSeparated,
          action: null,
          allow: null,
          allowFullScreen: boolean,
          allowPaymentRequest: boolean,
          allowUserMedia: boolean,
          alpha: boolean,
          alt: null,
          as: null,
          async: boolean,
          autoCapitalize: null,
          autoComplete: spaceSeparated,
          autoFocus: boolean,
          autoPlay: boolean,
          blocking: spaceSeparated,
          capture: null,
          charSet: null,
          checked: boolean,
          cite: null,
          className: spaceSeparated,
          closedBy: null,
          colorSpace: null,
          cols: number,
          colSpan: number,
          command: null,
          commandFor: null,
          content: null,
          contentEditable: booleanish,
          controls: boolean,
          controlsList: spaceSeparated,
          coords: number | commaSeparated,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: boolean,
          defer: boolean,
          dir: null,
          dirName: null,
          disabled: boolean,
          download: overloadedBoolean,
          draggable: booleanish,
          encType: null,
          enterKeyHint: null,
          fetchPriority: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: boolean,
          formTarget: null,
          headers: spaceSeparated,
          height: number,
          hidden: overloadedBoolean,
          high: number,
          href: null,
          hrefLang: null,
          htmlFor: spaceSeparated,
          httpEquiv: spaceSeparated,
          id: null,
          imageSizes: null,
          imageSrcSet: null,
          inert: boolean,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: boolean,
          itemId: null,
          itemProp: spaceSeparated,
          itemRef: spaceSeparated,
          itemScope: boolean,
          itemType: spaceSeparated,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loading: null,
          loop: boolean,
          low: number,
          manifest: null,
          max: null,
          maxLength: number,
          media: null,
          method: null,
          min: null,
          minLength: number,
          multiple: boolean,
          muted: boolean,
          name: null,
          nonce: null,
          noModule: boolean,
          noValidate: boolean,
          onAbort: null,
          onAfterPrint: null,
          onAuxClick: null,
          onBeforeMatch: null,
          onBeforePrint: null,
          onBeforeToggle: null,
          onBeforeUnload: null,
          onBlur: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onContextLost: null,
          onContextMenu: null,
          onContextRestored: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFormData: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLanguageChange: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadEnd: null,
          onLoadStart: null,
          onMessage: null,
          onMessageError: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRejectionHandled: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onScrollEnd: null,
          onSecurityPolicyViolation: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onSlotChange: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnhandledRejection: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onWheel: null,
          open: boolean,
          optimum: number,
          pattern: null,
          ping: spaceSeparated,
          placeholder: null,
          playsInline: boolean,
          popover: null,
          popoverTarget: null,
          popoverTargetAction: null,
          poster: null,
          preload: null,
          readOnly: boolean,
          referrerPolicy: null,
          rel: spaceSeparated,
          required: boolean,
          reversed: boolean,
          rows: number,
          rowSpan: number,
          sandbox: spaceSeparated,
          scope: null,
          scoped: boolean,
          seamless: boolean,
          selected: boolean,
          shadowRootClonable: boolean,
          shadowRootCustomElementRegistry: boolean,
          shadowRootDelegatesFocus: boolean,
          shadowRootMode: null,
          shadowRootSerializable: boolean,
          shape: null,
          size: number,
          sizes: null,
          slot: null,
          span: number,
          spellCheck: booleanish,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: null,
          start: number,
          step: null,
          style: null,
          tabIndex: number,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: boolean,
          useMap: null,
          value: booleanish,
          width: number,
          wrap: null,
          writingSuggestions: null,
          // Legacy.
          // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
          align: null,
          // Several. Use CSS `text-align` instead,
          aLink: null,
          // `<body>`. Use CSS `a:active {color}` instead
          archive: spaceSeparated,
          // `<object>`. List of URIs to archives
          axis: null,
          // `<td>` and `<th>`. Use `scope` on `<th>`
          background: null,
          // `<body>`. Use CSS `background-image` instead
          bgColor: null,
          // `<body>` and table elements. Use CSS `background-color` instead
          border: number,
          // `<table>`. Use CSS `border-width` instead,
          borderColor: null,
          // `<table>`. Use CSS `border-color` instead,
          bottomMargin: number,
          // `<body>`
          cellPadding: null,
          // `<table>`
          cellSpacing: null,
          // `<table>`
          char: null,
          // Several table elements. When `align=char`, sets the character to align on
          charOff: null,
          // Several table elements. When `char`, offsets the alignment
          classId: null,
          // `<object>`
          clear: null,
          // `<br>`. Use CSS `clear` instead
          code: null,
          // `<object>`
          codeBase: null,
          // `<object>`
          codeType: null,
          // `<object>`
          color: null,
          // `<font>` and `<hr>`. Use CSS instead
          compact: boolean,
          // Lists. Use CSS to reduce space between items instead
          declare: boolean,
          // `<object>`
          event: null,
          // `<script>`
          face: null,
          // `<font>`. Use CSS instead
          frame: null,
          // `<table>`
          frameBorder: null,
          // `<iframe>`. Use CSS `border` instead
          hSpace: number,
          // `<img>` and `<object>`
          leftMargin: number,
          // `<body>`
          link: null,
          // `<body>`. Use CSS `a:link {color: *}` instead
          longDesc: null,
          // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
          lowSrc: null,
          // `<img>`. Use a `<picture>`
          marginHeight: number,
          // `<body>`
          marginWidth: number,
          // `<body>`
          noResize: boolean,
          // `<frame>`
          noHref: boolean,
          // `<area>`. Use no href instead of an explicit `nohref`
          noShade: boolean,
          // `<hr>`. Use background-color and height instead of borders
          noWrap: boolean,
          // `<td>` and `<th>`
          object: null,
          // `<applet>`
          profile: null,
          // `<head>`
          prompt: null,
          // `<isindex>`
          rev: null,
          // `<link>`
          rightMargin: number,
          // `<body>`
          rules: null,
          // `<table>`
          scheme: null,
          // `<meta>`
          scrolling: booleanish,
          // `<frame>`. Use overflow in the child context
          standby: null,
          // `<object>`
          summary: null,
          // `<table>`
          text: null,
          // `<body>`. Use CSS `color` instead
          topMargin: number,
          // `<body>`
          valueType: null,
          // `<param>`
          version: null,
          // `<html>`. Use a doctype.
          vAlign: null,
          // Several. Use CSS `vertical-align` instead
          vLink: null,
          // `<body>`. Use CSS `a:visited {color}` instead
          vSpace: number,
          // `<img>` and `<object>`
          // Non-standard Properties.
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          credentialless: boolean,
          disablePictureInPicture: boolean,
          disableRemotePlayback: boolean,
          exportParts: commaSeparated,
          part: spaceSeparated,
          prefix: null,
          property: null,
          results: number,
          security: null,
          unselectable: null
        },
        space: "html",
        transform: caseInsensitiveTransform
      });
    }
  });

  // node_modules/property-information/lib/svg.js
  var svg;
  var init_svg = __esm({
    "node_modules/property-information/lib/svg.js"() {
      init_case_sensitive_transform();
      init_create();
      init_types2();
      svg = create({
        attributes: {
          accentHeight: "accent-height",
          alignmentBaseline: "alignment-baseline",
          arabicForm: "arabic-form",
          baselineShift: "baseline-shift",
          capHeight: "cap-height",
          className: "class",
          clipPath: "clip-path",
          clipRule: "clip-rule",
          colorInterpolation: "color-interpolation",
          colorInterpolationFilters: "color-interpolation-filters",
          colorProfile: "color-profile",
          colorRendering: "color-rendering",
          crossOrigin: "crossorigin",
          dataType: "datatype",
          dominantBaseline: "dominant-baseline",
          enableBackground: "enable-background",
          fillOpacity: "fill-opacity",
          fillRule: "fill-rule",
          floodColor: "flood-color",
          floodOpacity: "flood-opacity",
          fontFamily: "font-family",
          fontSize: "font-size",
          fontSizeAdjust: "font-size-adjust",
          fontStretch: "font-stretch",
          fontStyle: "font-style",
          fontVariant: "font-variant",
          fontWeight: "font-weight",
          glyphName: "glyph-name",
          glyphOrientationHorizontal: "glyph-orientation-horizontal",
          glyphOrientationVertical: "glyph-orientation-vertical",
          hrefLang: "hreflang",
          horizAdvX: "horiz-adv-x",
          horizOriginX: "horiz-origin-x",
          horizOriginY: "horiz-origin-y",
          imageRendering: "image-rendering",
          letterSpacing: "letter-spacing",
          lightingColor: "lighting-color",
          markerEnd: "marker-end",
          markerMid: "marker-mid",
          markerStart: "marker-start",
          maskType: "mask-type",
          navDown: "nav-down",
          navDownLeft: "nav-down-left",
          navDownRight: "nav-down-right",
          navLeft: "nav-left",
          navNext: "nav-next",
          navPrev: "nav-prev",
          navRight: "nav-right",
          navUp: "nav-up",
          navUpLeft: "nav-up-left",
          navUpRight: "nav-up-right",
          onAbort: "onabort",
          onActivate: "onactivate",
          onAfterPrint: "onafterprint",
          onBeforePrint: "onbeforeprint",
          onBegin: "onbegin",
          onCancel: "oncancel",
          onCanPlay: "oncanplay",
          onCanPlayThrough: "oncanplaythrough",
          onChange: "onchange",
          onClick: "onclick",
          onClose: "onclose",
          onCopy: "oncopy",
          onCueChange: "oncuechange",
          onCut: "oncut",
          onDblClick: "ondblclick",
          onDrag: "ondrag",
          onDragEnd: "ondragend",
          onDragEnter: "ondragenter",
          onDragExit: "ondragexit",
          onDragLeave: "ondragleave",
          onDragOver: "ondragover",
          onDragStart: "ondragstart",
          onDrop: "ondrop",
          onDurationChange: "ondurationchange",
          onEmptied: "onemptied",
          onEnd: "onend",
          onEnded: "onended",
          onError: "onerror",
          onFocus: "onfocus",
          onFocusIn: "onfocusin",
          onFocusOut: "onfocusout",
          onHashChange: "onhashchange",
          onInput: "oninput",
          onInvalid: "oninvalid",
          onKeyDown: "onkeydown",
          onKeyPress: "onkeypress",
          onKeyUp: "onkeyup",
          onLoad: "onload",
          onLoadedData: "onloadeddata",
          onLoadedMetadata: "onloadedmetadata",
          onLoadStart: "onloadstart",
          onMessage: "onmessage",
          onMouseDown: "onmousedown",
          onMouseEnter: "onmouseenter",
          onMouseLeave: "onmouseleave",
          onMouseMove: "onmousemove",
          onMouseOut: "onmouseout",
          onMouseOver: "onmouseover",
          onMouseUp: "onmouseup",
          onMouseWheel: "onmousewheel",
          onOffline: "onoffline",
          onOnline: "ononline",
          onPageHide: "onpagehide",
          onPageShow: "onpageshow",
          onPaste: "onpaste",
          onPause: "onpause",
          onPlay: "onplay",
          onPlaying: "onplaying",
          onPopState: "onpopstate",
          onProgress: "onprogress",
          onRateChange: "onratechange",
          onRepeat: "onrepeat",
          onReset: "onreset",
          onResize: "onresize",
          onScroll: "onscroll",
          onSeeked: "onseeked",
          onSeeking: "onseeking",
          onSelect: "onselect",
          onShow: "onshow",
          onStalled: "onstalled",
          onStorage: "onstorage",
          onSubmit: "onsubmit",
          onSuspend: "onsuspend",
          onTimeUpdate: "ontimeupdate",
          onToggle: "ontoggle",
          onUnload: "onunload",
          onVolumeChange: "onvolumechange",
          onWaiting: "onwaiting",
          onZoom: "onzoom",
          overlinePosition: "overline-position",
          overlineThickness: "overline-thickness",
          paintOrder: "paint-order",
          panose1: "panose-1",
          pointerEvents: "pointer-events",
          referrerPolicy: "referrerpolicy",
          renderingIntent: "rendering-intent",
          shapeRendering: "shape-rendering",
          stopColor: "stop-color",
          stopOpacity: "stop-opacity",
          strikethroughPosition: "strikethrough-position",
          strikethroughThickness: "strikethrough-thickness",
          strokeDashArray: "stroke-dasharray",
          strokeDashOffset: "stroke-dashoffset",
          strokeLineCap: "stroke-linecap",
          strokeLineJoin: "stroke-linejoin",
          strokeMiterLimit: "stroke-miterlimit",
          strokeOpacity: "stroke-opacity",
          strokeWidth: "stroke-width",
          tabIndex: "tabindex",
          textAnchor: "text-anchor",
          textDecoration: "text-decoration",
          textRendering: "text-rendering",
          transformOrigin: "transform-origin",
          typeOf: "typeof",
          underlinePosition: "underline-position",
          underlineThickness: "underline-thickness",
          unicodeBidi: "unicode-bidi",
          unicodeRange: "unicode-range",
          unitsPerEm: "units-per-em",
          vAlphabetic: "v-alphabetic",
          vHanging: "v-hanging",
          vIdeographic: "v-ideographic",
          vMathematical: "v-mathematical",
          vectorEffect: "vector-effect",
          vertAdvY: "vert-adv-y",
          vertOriginX: "vert-origin-x",
          vertOriginY: "vert-origin-y",
          wordSpacing: "word-spacing",
          writingMode: "writing-mode",
          xHeight: "x-height",
          // These were camelcased in Tiny. Now lowercased in SVG 2
          playbackOrder: "playbackorder",
          timelineBegin: "timelinebegin"
        },
        properties: {
          about: commaOrSpaceSeparated,
          accentHeight: number,
          accumulate: null,
          additive: null,
          alignmentBaseline: null,
          alphabetic: number,
          amplitude: number,
          arabicForm: null,
          ascent: number,
          attributeName: null,
          attributeType: null,
          azimuth: number,
          bandwidth: null,
          baselineShift: null,
          baseFrequency: null,
          baseProfile: null,
          bbox: null,
          begin: null,
          bias: number,
          by: null,
          calcMode: null,
          capHeight: number,
          className: spaceSeparated,
          clip: null,
          clipPath: null,
          clipPathUnits: null,
          clipRule: null,
          color: null,
          colorInterpolation: null,
          colorInterpolationFilters: null,
          colorProfile: null,
          colorRendering: null,
          content: null,
          contentScriptType: null,
          contentStyleType: null,
          crossOrigin: null,
          cursor: null,
          cx: null,
          cy: null,
          d: null,
          dataType: null,
          defaultAction: null,
          descent: number,
          diffuseConstant: number,
          direction: null,
          display: null,
          dur: null,
          divisor: number,
          dominantBaseline: null,
          download: boolean,
          dx: null,
          dy: null,
          edgeMode: null,
          editable: null,
          elevation: number,
          enableBackground: null,
          end: null,
          event: null,
          exponent: number,
          externalResourcesRequired: null,
          fill: null,
          fillOpacity: number,
          fillRule: null,
          filter: null,
          filterRes: null,
          filterUnits: null,
          floodColor: null,
          floodOpacity: null,
          focusable: null,
          focusHighlight: null,
          fontFamily: null,
          fontSize: null,
          fontSizeAdjust: null,
          fontStretch: null,
          fontStyle: null,
          fontVariant: null,
          fontWeight: null,
          format: null,
          fr: null,
          from: null,
          fx: null,
          fy: null,
          g1: commaSeparated,
          g2: commaSeparated,
          glyphName: commaSeparated,
          glyphOrientationHorizontal: null,
          glyphOrientationVertical: null,
          glyphRef: null,
          gradientTransform: null,
          gradientUnits: null,
          handler: null,
          hanging: number,
          hatchContentUnits: null,
          hatchUnits: null,
          height: null,
          href: null,
          hrefLang: null,
          horizAdvX: number,
          horizOriginX: number,
          horizOriginY: number,
          id: null,
          ideographic: number,
          imageRendering: null,
          initialVisibility: null,
          in: null,
          in2: null,
          intercept: number,
          k: number,
          k1: number,
          k2: number,
          k3: number,
          k4: number,
          kernelMatrix: commaOrSpaceSeparated,
          kernelUnitLength: null,
          keyPoints: null,
          // SEMI_COLON_SEPARATED
          keySplines: null,
          // SEMI_COLON_SEPARATED
          keyTimes: null,
          // SEMI_COLON_SEPARATED
          kerning: null,
          lang: null,
          lengthAdjust: null,
          letterSpacing: null,
          lightingColor: null,
          limitingConeAngle: number,
          local: null,
          markerEnd: null,
          markerMid: null,
          markerStart: null,
          markerHeight: null,
          markerUnits: null,
          markerWidth: null,
          mask: null,
          maskContentUnits: null,
          maskType: null,
          maskUnits: null,
          mathematical: null,
          max: null,
          media: null,
          mediaCharacterEncoding: null,
          mediaContentEncodings: null,
          mediaSize: number,
          mediaTime: null,
          method: null,
          min: null,
          mode: null,
          name: null,
          navDown: null,
          navDownLeft: null,
          navDownRight: null,
          navLeft: null,
          navNext: null,
          navPrev: null,
          navRight: null,
          navUp: null,
          navUpLeft: null,
          navUpRight: null,
          numOctaves: null,
          observer: null,
          offset: null,
          onAbort: null,
          onActivate: null,
          onAfterPrint: null,
          onBeforePrint: null,
          onBegin: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnd: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFocusIn: null,
          onFocusOut: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadStart: null,
          onMessage: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onMouseWheel: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRepeat: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onShow: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onZoom: null,
          opacity: null,
          operator: null,
          order: null,
          orient: null,
          orientation: null,
          origin: null,
          overflow: null,
          overlay: null,
          overlinePosition: number,
          overlineThickness: number,
          paintOrder: null,
          panose1: null,
          path: null,
          pathLength: number,
          patternContentUnits: null,
          patternTransform: null,
          patternUnits: null,
          phase: null,
          ping: spaceSeparated,
          pitch: null,
          playbackOrder: null,
          pointerEvents: null,
          points: null,
          pointsAtX: number,
          pointsAtY: number,
          pointsAtZ: number,
          preserveAlpha: null,
          preserveAspectRatio: null,
          primitiveUnits: null,
          propagate: null,
          property: commaOrSpaceSeparated,
          r: null,
          radius: null,
          referrerPolicy: null,
          refX: null,
          refY: null,
          rel: commaOrSpaceSeparated,
          rev: commaOrSpaceSeparated,
          renderingIntent: null,
          repeatCount: null,
          repeatDur: null,
          requiredExtensions: commaOrSpaceSeparated,
          requiredFeatures: commaOrSpaceSeparated,
          requiredFonts: commaOrSpaceSeparated,
          requiredFormats: commaOrSpaceSeparated,
          resource: null,
          restart: null,
          result: null,
          rotate: null,
          rx: null,
          ry: null,
          scale: null,
          seed: null,
          shapeRendering: null,
          side: null,
          slope: null,
          snapshotTime: null,
          specularConstant: number,
          specularExponent: number,
          spreadMethod: null,
          spacing: null,
          startOffset: null,
          stdDeviation: null,
          stemh: null,
          stemv: null,
          stitchTiles: null,
          stopColor: null,
          stopOpacity: null,
          strikethroughPosition: number,
          strikethroughThickness: number,
          string: null,
          stroke: null,
          strokeDashArray: commaOrSpaceSeparated,
          strokeDashOffset: null,
          strokeLineCap: null,
          strokeLineJoin: null,
          strokeMiterLimit: number,
          strokeOpacity: number,
          strokeWidth: null,
          style: null,
          surfaceScale: number,
          syncBehavior: null,
          syncBehaviorDefault: null,
          syncMaster: null,
          syncTolerance: null,
          syncToleranceDefault: null,
          systemLanguage: commaOrSpaceSeparated,
          tabIndex: number,
          tableValues: null,
          target: null,
          targetX: number,
          targetY: number,
          textAnchor: null,
          textDecoration: null,
          textRendering: null,
          textLength: null,
          timelineBegin: null,
          title: null,
          transformBehavior: null,
          type: null,
          typeOf: commaOrSpaceSeparated,
          to: null,
          transform: null,
          transformOrigin: null,
          u1: null,
          u2: null,
          underlinePosition: number,
          underlineThickness: number,
          unicode: null,
          unicodeBidi: null,
          unicodeRange: null,
          unitsPerEm: number,
          values: null,
          vAlphabetic: number,
          vMathematical: number,
          vectorEffect: null,
          vHanging: number,
          vIdeographic: number,
          version: null,
          vertAdvY: number,
          vertOriginX: number,
          vertOriginY: number,
          viewBox: null,
          viewTarget: null,
          visibility: null,
          width: null,
          widths: null,
          wordSpacing: null,
          writingMode: null,
          x: null,
          x1: null,
          x2: null,
          xChannelSelector: null,
          xHeight: number,
          y: null,
          y1: null,
          y2: null,
          yChannelSelector: null,
          z: null,
          zoomAndPan: null
        },
        space: "svg",
        transform: caseSensitiveTransform
      });
    }
  });

  // node_modules/property-information/lib/xlink.js
  var xlink;
  var init_xlink = __esm({
    "node_modules/property-information/lib/xlink.js"() {
      init_create();
      xlink = create({
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null
        },
        space: "xlink",
        transform(_, property) {
          return "xlink:" + property.slice(5).toLowerCase();
        }
      });
    }
  });

  // node_modules/property-information/lib/xmlns.js
  var xmlns;
  var init_xmlns = __esm({
    "node_modules/property-information/lib/xmlns.js"() {
      init_create();
      init_case_insensitive_transform();
      xmlns = create({
        attributes: { xmlnsxlink: "xmlns:xlink" },
        properties: { xmlnsXLink: null, xmlns: null },
        space: "xmlns",
        transform: caseInsensitiveTransform
      });
    }
  });

  // node_modules/property-information/lib/xml.js
  var xml;
  var init_xml = __esm({
    "node_modules/property-information/lib/xml.js"() {
      init_create();
      xml = create({
        properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
        space: "xml",
        transform(_, property) {
          return "xml:" + property.slice(3).toLowerCase();
        }
      });
    }
  });

  // node_modules/property-information/lib/find.js
  function find(schema, value) {
    const normal = normalize2(value);
    let property = value;
    let Type = Info;
    if (normal in schema.normal) {
      return schema.property[schema.normal[normal]];
    }
    if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
      if (value.charAt(4) === "-") {
        const rest = value.slice(5).replace(dash, camelcase);
        property = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
      } else {
        const rest = value.slice(4);
        if (!dash.test(rest)) {
          let dashes = rest.replace(cap, kebab);
          if (dashes.charAt(0) !== "-") {
            dashes = "-" + dashes;
          }
          value = "data" + dashes;
        }
      }
      Type = DefinedInfo;
    }
    return new Type(property, value);
  }
  function kebab($0) {
    return "-" + $0.toLowerCase();
  }
  function camelcase($0) {
    return $0.charAt(1).toUpperCase();
  }
  var cap, dash, valid;
  var init_find = __esm({
    "node_modules/property-information/lib/find.js"() {
      init_defined_info();
      init_info();
      init_normalize();
      cap = /[A-Z]/g;
      dash = /-[a-z]/g;
      valid = /^data[-\w.:]+$/i;
    }
  });

  // node_modules/property-information/index.js
  var html4, svg2;
  var init_property_information = __esm({
    "node_modules/property-information/index.js"() {
      init_merge();
      init_aria();
      init_html3();
      init_svg();
      init_xlink();
      init_xmlns();
      init_xml();
      init_find();
      init_normalize();
      html4 = merge([aria, html3, xlink, xmlns, xml], "html");
      svg2 = merge([aria, svg, xlink, xmlns, xml], "svg");
    }
  });

  // node_modules/comma-separated-tokens/index.js
  function parse2(value) {
    const tokens = [];
    const input = String(value || "");
    let index2 = input.indexOf(",");
    let start = 0;
    let end = false;
    while (!end) {
      if (index2 === -1) {
        index2 = input.length;
        end = true;
      }
      const token = input.slice(start, index2).trim();
      if (token || !end) {
        tokens.push(token);
      }
      start = index2 + 1;
      index2 = input.indexOf(",", start);
    }
    return tokens;
  }
  function stringify(values, options) {
    const settings = options || {};
    const input = values[values.length - 1] === "" ? [...values, ""] : values;
    return input.join(
      (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
    ).trim();
  }
  var init_comma_separated_tokens = __esm({
    "node_modules/comma-separated-tokens/index.js"() {
    }
  });

  // node_modules/hast-util-parse-selector/lib/index.js
  function parseSelector(selector, defaultTagName) {
    const value = selector || "";
    const props = {};
    let start = 0;
    let previous3;
    let tagName;
    while (start < value.length) {
      search2.lastIndex = start;
      const match = search2.exec(value);
      const subvalue = value.slice(start, match ? match.index : value.length);
      if (subvalue) {
        if (!previous3) {
          tagName = subvalue;
        } else if (previous3 === "#") {
          props.id = subvalue;
        } else if (Array.isArray(props.className)) {
          props.className.push(subvalue);
        } else {
          props.className = [subvalue];
        }
        start += subvalue.length;
      }
      if (match) {
        previous3 = match[0];
        start++;
      }
    }
    return {
      type: "element",
      // @ts-expect-error: tag name is parsed.
      tagName: tagName || defaultTagName || "div",
      properties: props,
      children: []
    };
  }
  var search2;
  var init_lib24 = __esm({
    "node_modules/hast-util-parse-selector/lib/index.js"() {
      search2 = /[#.]/g;
    }
  });

  // node_modules/hast-util-parse-selector/index.js
  var init_hast_util_parse_selector = __esm({
    "node_modules/hast-util-parse-selector/index.js"() {
      init_lib24();
    }
  });

  // node_modules/space-separated-tokens/index.js
  function parse3(value) {
    const input = String(value || "").trim();
    return input ? input.split(/[ \t\n\r\f]+/g) : [];
  }
  function stringify2(values) {
    return values.join(" ").trim();
  }
  var init_space_separated_tokens = __esm({
    "node_modules/space-separated-tokens/index.js"() {
    }
  });

  // node_modules/hastscript/lib/create-h.js
  function createH(schema, defaultTagName, caseSensitive) {
    const adjust = caseSensitive ? createAdjustMap(caseSensitive) : void 0;
    function h2(selector, properties, ...children) {
      let node2;
      if (selector === null || selector === void 0) {
        node2 = { type: "root", children: [] };
        const child = (
          /** @type {Child} */
          properties
        );
        children.unshift(child);
      } else {
        node2 = parseSelector(selector, defaultTagName);
        const lower = node2.tagName.toLowerCase();
        const adjusted = adjust ? adjust.get(lower) : void 0;
        node2.tagName = adjusted || lower;
        if (isChild(properties)) {
          children.unshift(properties);
        } else {
          for (const [key2, value] of Object.entries(properties)) {
            addProperty(schema, node2.properties, key2, value);
          }
        }
      }
      for (const child of children) {
        addChild(node2.children, child);
      }
      if (node2.type === "element" && node2.tagName === "template") {
        node2.content = { type: "root", children: node2.children };
        node2.children = [];
      }
      return node2;
    }
    return h2;
  }
  function isChild(value) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return true;
    }
    if (typeof value.type !== "string") return false;
    const record = (
      /** @type {Record<string, unknown>} */
      value
    );
    const keys2 = Object.keys(value);
    for (const key2 of keys2) {
      const value2 = record[key2];
      if (value2 && typeof value2 === "object") {
        if (!Array.isArray(value2)) return true;
        const list4 = (
          /** @type {ReadonlyArray<unknown>} */
          value2
        );
        for (const item of list4) {
          if (typeof item !== "number" && typeof item !== "string") {
            return true;
          }
        }
      }
    }
    if ("children" in value && Array.isArray(value.children)) {
      return true;
    }
    return false;
  }
  function addProperty(schema, properties, key2, value) {
    const info = find(schema, key2);
    let result;
    if (value === null || value === void 0) return;
    if (typeof value === "number") {
      if (Number.isNaN(value)) return;
      result = value;
    } else if (typeof value === "boolean") {
      result = value;
    } else if (typeof value === "string") {
      if (info.spaceSeparated) {
        result = parse3(value);
      } else if (info.commaSeparated) {
        result = parse2(value);
      } else if (info.commaOrSpaceSeparated) {
        result = parse3(parse2(value).join(" "));
      } else {
        result = parsePrimitive(info, info.property, value);
      }
    } else if (Array.isArray(value)) {
      result = [...value];
    } else {
      result = info.property === "style" ? style(value) : String(value);
    }
    if (Array.isArray(result)) {
      const finalResult = [];
      for (const item of result) {
        finalResult.push(
          /** @type {number | string} */
          parsePrimitive(info, info.property, item)
        );
      }
      result = finalResult;
    }
    if (info.property === "className" && Array.isArray(properties.className)) {
      result = properties.className.concat(
        /** @type {Array<number | string> | number | string} */
        result
      );
    }
    properties[info.property] = result;
  }
  function addChild(nodes, value) {
    if (value === null || value === void 0) {
    } else if (typeof value === "number" || typeof value === "string") {
      nodes.push({ type: "text", value: String(value) });
    } else if (Array.isArray(value)) {
      for (const child of value) {
        addChild(nodes, child);
      }
    } else if (typeof value === "object" && "type" in value) {
      if (value.type === "root") {
        addChild(nodes, value.children);
      } else {
        nodes.push(value);
      }
    } else {
      throw new Error("Expected node, nodes, or string, got `" + value + "`");
    }
  }
  function parsePrimitive(info, name, value) {
    if (typeof value === "string") {
      if (info.number && value && !Number.isNaN(Number(value))) {
        return Number(value);
      }
      if ((info.boolean || info.overloadedBoolean) && (value === "" || normalize2(value) === normalize2(name))) {
        return true;
      }
    }
    return value;
  }
  function style(styles) {
    const result = [];
    for (const [key2, value] of Object.entries(styles)) {
      result.push([key2, value].join(": "));
    }
    return result.join("; ");
  }
  function createAdjustMap(values) {
    const result = /* @__PURE__ */ new Map();
    for (const value of values) {
      result.set(value.toLowerCase(), value);
    }
    return result;
  }
  var init_create_h = __esm({
    "node_modules/hastscript/lib/create-h.js"() {
      init_comma_separated_tokens();
      init_hast_util_parse_selector();
      init_property_information();
      init_space_separated_tokens();
    }
  });

  // node_modules/hastscript/lib/svg-case-sensitive-tag-names.js
  var svgCaseSensitiveTagNames;
  var init_svg_case_sensitive_tag_names = __esm({
    "node_modules/hastscript/lib/svg-case-sensitive-tag-names.js"() {
      svgCaseSensitiveTagNames = [
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "clipPath",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feDropShadow",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "foreignObject",
        "glyphRef",
        "linearGradient",
        "radialGradient",
        "solidColor",
        "textArea",
        "textPath"
      ];
    }
  });

  // node_modules/hastscript/lib/index.js
  var h, s;
  var init_lib25 = __esm({
    "node_modules/hastscript/lib/index.js"() {
      init_property_information();
      init_create_h();
      init_svg_case_sensitive_tag_names();
      h = createH(html4, "div");
      s = createH(svg2, "g", svgCaseSensitiveTagNames);
    }
  });

  // node_modules/hastscript/index.js
  var init_hastscript = __esm({
    "node_modules/hastscript/index.js"() {
      init_lib25();
    }
  });

  // node_modules/vfile-location/lib/index.js
  function location(file) {
    const value = String(file);
    const indices = [];
    return { toOffset, toPoint };
    function toPoint(offset) {
      if (typeof offset === "number" && offset > -1 && offset <= value.length) {
        let index2 = 0;
        while (true) {
          let end = indices[index2];
          if (end === void 0) {
            const eol = next(value, indices[index2 - 1]);
            end = eol === -1 ? value.length + 1 : eol + 1;
            indices[index2] = end;
          }
          if (end > offset) {
            return {
              line: index2 + 1,
              column: offset - (index2 > 0 ? indices[index2 - 1] : 0) + 1,
              offset
            };
          }
          index2++;
        }
      }
    }
    function toOffset(point5) {
      if (point5 && typeof point5.line === "number" && typeof point5.column === "number" && !Number.isNaN(point5.line) && !Number.isNaN(point5.column)) {
        while (indices.length < point5.line) {
          const from = indices[indices.length - 1];
          const eol = next(value, from);
          const end = eol === -1 ? value.length + 1 : eol + 1;
          if (from === end) break;
          indices.push(end);
        }
        const offset = (point5.line > 1 ? indices[point5.line - 2] : 0) + point5.column - 1;
        if (offset < indices[point5.line - 1]) return offset;
      }
    }
  }
  function next(value, from) {
    const cr = value.indexOf("\r", from);
    const lf = value.indexOf("\n", from);
    if (lf === -1) return cr;
    if (cr === -1 || cr + 1 === lf) return lf;
    return cr < lf ? cr : lf;
  }
  var init_lib26 = __esm({
    "node_modules/vfile-location/lib/index.js"() {
    }
  });

  // node_modules/vfile-location/index.js
  var init_vfile_location = __esm({
    "node_modules/vfile-location/index.js"() {
      init_lib26();
    }
  });

  // node_modules/web-namespaces/index.js
  var webNamespaces;
  var init_web_namespaces = __esm({
    "node_modules/web-namespaces/index.js"() {
      webNamespaces = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
      };
    }
  });

  // node_modules/hast-util-from-parse5/lib/index.js
  function fromParse5(tree, options) {
    const settings = options || {};
    return one2(
      {
        file: settings.file || void 0,
        location: false,
        schema: settings.space === "svg" ? svg2 : html4,
        verbose: settings.verbose || false
      },
      tree
    );
  }
  function one2(state, node2) {
    let result;
    switch (node2.nodeName) {
      case "#comment": {
        const reference = (
          /** @type {DefaultTreeAdapterMap['commentNode']} */
          node2
        );
        result = { type: "comment", value: reference.data };
        patch2(state, reference, result);
        return result;
      }
      case "#document":
      case "#document-fragment": {
        const reference = (
          /** @type {DefaultTreeAdapterMap['document'] | DefaultTreeAdapterMap['documentFragment']} */
          node2
        );
        const quirksMode = "mode" in reference ? reference.mode === "quirks" || reference.mode === "limited-quirks" : false;
        result = {
          type: "root",
          children: all2(state, node2.childNodes),
          data: { quirksMode }
        };
        if (state.file && state.location) {
          const document4 = String(state.file);
          const loc = location(document4);
          const start = loc.toPoint(0);
          const end = loc.toPoint(document4.length);
          ok(start, "expected `start`");
          ok(end, "expected `end`");
          result.position = { start, end };
        }
        return result;
      }
      case "#documentType": {
        const reference = (
          /** @type {DefaultTreeAdapterMap['documentType']} */
          node2
        );
        result = { type: "doctype" };
        patch2(state, reference, result);
        return result;
      }
      case "#text": {
        const reference = (
          /** @type {DefaultTreeAdapterMap['textNode']} */
          node2
        );
        result = { type: "text", value: reference.value };
        patch2(state, reference, result);
        return result;
      }
      // Element.
      default: {
        const reference = (
          /** @type {DefaultTreeAdapterMap['element']} */
          node2
        );
        result = element2(state, reference);
        return result;
      }
    }
  }
  function all2(state, nodes) {
    let index2 = -1;
    const results = [];
    while (++index2 < nodes.length) {
      const result = (
        /** @type {RootContent} */
        one2(state, nodes[index2])
      );
      results.push(result);
    }
    return results;
  }
  function element2(state, node2) {
    const schema = state.schema;
    state.schema = node2.namespaceURI === webNamespaces.svg ? svg2 : html4;
    let index2 = -1;
    const properties = {};
    while (++index2 < node2.attrs.length) {
      const attribute = node2.attrs[index2];
      const name = (attribute.prefix ? attribute.prefix + ":" : "") + attribute.name;
      if (!own5.call(proto, name)) {
        properties[name] = attribute.value;
      }
    }
    const x = state.schema.space === "svg" ? s : h;
    const result = x(node2.tagName, properties, all2(state, node2.childNodes));
    patch2(state, node2, result);
    if (result.tagName === "template") {
      const reference = (
        /** @type {DefaultTreeAdapterMap['template']} */
        node2
      );
      const pos = reference.sourceCodeLocation;
      const startTag2 = pos && pos.startTag && position3(pos.startTag);
      const endTag2 = pos && pos.endTag && position3(pos.endTag);
      const content3 = (
        /** @type {Root} */
        one2(state, reference.content)
      );
      if (startTag2 && endTag2 && state.file) {
        content3.position = { start: startTag2.end, end: endTag2.start };
      }
      result.content = content3;
    }
    state.schema = schema;
    return result;
  }
  function patch2(state, from, to) {
    if ("sourceCodeLocation" in from && from.sourceCodeLocation && state.file) {
      const position4 = createLocation(state, to, from.sourceCodeLocation);
      if (position4) {
        state.location = true;
        to.position = position4;
      }
    }
  }
  function createLocation(state, node2, location2) {
    const result = position3(location2);
    if (node2.type === "element") {
      const tail = node2.children[node2.children.length - 1];
      if (result && !location2.endTag && tail && tail.position && tail.position.end) {
        result.end = Object.assign({}, tail.position.end);
      }
      if (state.verbose) {
        const properties = {};
        let key2;
        if (location2.attrs) {
          for (key2 in location2.attrs) {
            if (own5.call(location2.attrs, key2)) {
              properties[find(state.schema, key2).property] = position3(
                location2.attrs[key2]
              );
            }
          }
        }
        ok(location2.startTag, "a start tag should exist");
        const opening2 = position3(location2.startTag);
        const closing2 = location2.endTag ? position3(location2.endTag) : void 0;
        const data = { opening: opening2 };
        if (closing2) data.closing = closing2;
        data.properties = properties;
        node2.data = { position: data };
      }
    }
    return result;
  }
  function position3(loc) {
    const start = point4({
      line: loc.startLine,
      column: loc.startCol,
      offset: loc.startOffset
    });
    const end = point4({
      line: loc.endLine,
      column: loc.endCol,
      offset: loc.endOffset
    });
    return start || end ? { start, end } : void 0;
  }
  function point4(point5) {
    return point5.line && point5.column ? point5 : void 0;
  }
  var own5, proto;
  var init_lib27 = __esm({
    "node_modules/hast-util-from-parse5/lib/index.js"() {
      init_default();
      init_hastscript();
      init_property_information();
      init_vfile_location();
      init_web_namespaces();
      own5 = {}.hasOwnProperty;
      proto = Object.prototype;
    }
  });

  // node_modules/hast-util-from-parse5/index.js
  var init_hast_util_from_parse5 = __esm({
    "node_modules/hast-util-from-parse5/index.js"() {
      init_lib27();
    }
  });

  // node_modules/hast-util-to-parse5/lib/index.js
  function toParse5(tree, options) {
    const settings = options || emptyOptions4;
    const space2 = settings.space;
    return one3(tree, space2 === "svg" ? svg2 : html4);
  }
  function root3(node2, schema) {
    const result = {
      nodeName: "#document",
      // @ts-expect-error: `parse5` uses enums, which are actually strings.
      mode: (node2.data || {}).quirksMode ? "quirks" : "no-quirks",
      childNodes: []
    };
    result.childNodes = all3(node2.children, result, schema);
    patch3(node2, result);
    return result;
  }
  function fragment(node2, schema) {
    const result = { nodeName: "#document-fragment", childNodes: [] };
    result.childNodes = all3(node2.children, result, schema);
    patch3(node2, result);
    return result;
  }
  function doctype(node2) {
    const result = {
      nodeName: "#documentType",
      name: "html",
      publicId: "",
      systemId: "",
      parentNode: null
    };
    patch3(node2, result);
    return result;
  }
  function text6(node2) {
    const result = {
      nodeName: "#text",
      value: node2.value,
      parentNode: null
    };
    patch3(node2, result);
    return result;
  }
  function comment(node2) {
    const result = {
      nodeName: "#comment",
      data: node2.value,
      parentNode: null
    };
    patch3(node2, result);
    return result;
  }
  function element3(node2, schema) {
    const parentSchema = schema;
    let currentSchema = parentSchema;
    if (node2.type === "element" && node2.tagName.toLowerCase() === "svg" && parentSchema.space === "html") {
      currentSchema = svg2;
    }
    const attrs = [];
    let prop;
    if (node2.properties) {
      for (prop in node2.properties) {
        if (prop !== "children" && own6.call(node2.properties, prop)) {
          const result2 = createProperty(
            currentSchema,
            prop,
            node2.properties[prop]
          );
          if (result2) {
            attrs.push(result2);
          }
        }
      }
    }
    const space2 = currentSchema.space;
    ok(space2);
    const result = {
      nodeName: node2.tagName,
      tagName: node2.tagName,
      attrs,
      // @ts-expect-error: `parse5` types are wrong.
      namespaceURI: webNamespaces[space2],
      childNodes: [],
      parentNode: null
    };
    result.childNodes = all3(node2.children, result, currentSchema);
    patch3(node2, result);
    if (node2.tagName === "template" && node2.content) {
      result.content = fragment(node2.content, currentSchema);
    }
    return result;
  }
  function createProperty(schema, prop, value) {
    const info = find(schema, prop);
    if (value === false || value === null || value === void 0 || typeof value === "number" && Number.isNaN(value) || !value && info.boolean) {
      return;
    }
    if (Array.isArray(value)) {
      value = info.commaSeparated ? stringify(value) : stringify2(value);
    }
    const attribute = {
      name: info.attribute,
      value: value === true ? "" : String(value)
    };
    if (info.space && info.space !== "html" && info.space !== "svg") {
      const index2 = attribute.name.indexOf(":");
      if (index2 < 0) {
        attribute.prefix = "";
      } else {
        attribute.name = attribute.name.slice(index2 + 1);
        attribute.prefix = info.attribute.slice(0, index2);
      }
      attribute.namespace = webNamespaces[info.space];
    }
    return attribute;
  }
  function all3(children, parentNode, schema) {
    let index2 = -1;
    const results = [];
    if (children) {
      while (++index2 < children.length) {
        const child = one3(children[index2], schema);
        child.parentNode = parentNode;
        results.push(child);
      }
    }
    return results;
  }
  function patch3(from, to) {
    const position4 = from.position;
    if (position4 && position4.start && position4.end) {
      ok(typeof position4.start.offset === "number");
      ok(typeof position4.end.offset === "number");
      to.sourceCodeLocation = {
        startLine: position4.start.line,
        startCol: position4.start.column,
        startOffset: position4.start.offset,
        endLine: position4.end.line,
        endCol: position4.end.column,
        endOffset: position4.end.offset
      };
    }
  }
  var emptyOptions4, own6, one3;
  var init_lib28 = __esm({
    "node_modules/hast-util-to-parse5/lib/index.js"() {
      init_comma_separated_tokens();
      init_default();
      init_property_information();
      init_space_separated_tokens();
      init_web_namespaces();
      init_zwitch();
      emptyOptions4 = {};
      own6 = {}.hasOwnProperty;
      one3 = zwitch("type", { handlers: { root: root3, element: element3, text: text6, comment, doctype } });
    }
  });

  // node_modules/hast-util-to-parse5/index.js
  var init_hast_util_to_parse5 = __esm({
    "node_modules/hast-util-to-parse5/index.js"() {
      init_lib28();
    }
  });

  // node_modules/html-void-elements/index.js
  var htmlVoidElements;
  var init_html_void_elements = __esm({
    "node_modules/html-void-elements/index.js"() {
      htmlVoidElements = [
        "area",
        "base",
        "basefont",
        "bgsound",
        "br",
        "col",
        "command",
        "embed",
        "frame",
        "hr",
        "image",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ];
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/unicode.js
  function isSurrogate(cp) {
    return cp >= 55296 && cp <= 57343;
  }
  function isSurrogatePair(cp) {
    return cp >= 56320 && cp <= 57343;
  }
  function getSurrogatePairCodePoint(cp1, cp2) {
    return (cp1 - 55296) * 1024 + 9216 + cp2;
  }
  function isControlCodePoint(cp) {
    return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
  }
  function isUndefinedCodePoint(cp) {
    return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
  }
  var UNDEFINED_CODE_POINTS, REPLACEMENT_CHARACTER, CODE_POINTS, SEQUENCES;
  var init_unicode = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/unicode.js"() {
      UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
        65534,
        65535,
        131070,
        131071,
        196606,
        196607,
        262142,
        262143,
        327678,
        327679,
        393214,
        393215,
        458750,
        458751,
        524286,
        524287,
        589822,
        589823,
        655358,
        655359,
        720894,
        720895,
        786430,
        786431,
        851966,
        851967,
        917502,
        917503,
        983038,
        983039,
        1048574,
        1048575,
        1114110,
        1114111
      ]);
      REPLACEMENT_CHARACTER = "\uFFFD";
      (function(CODE_POINTS2) {
        CODE_POINTS2[CODE_POINTS2["EOF"] = -1] = "EOF";
        CODE_POINTS2[CODE_POINTS2["NULL"] = 0] = "NULL";
        CODE_POINTS2[CODE_POINTS2["TABULATION"] = 9] = "TABULATION";
        CODE_POINTS2[CODE_POINTS2["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
        CODE_POINTS2[CODE_POINTS2["LINE_FEED"] = 10] = "LINE_FEED";
        CODE_POINTS2[CODE_POINTS2["FORM_FEED"] = 12] = "FORM_FEED";
        CODE_POINTS2[CODE_POINTS2["SPACE"] = 32] = "SPACE";
        CODE_POINTS2[CODE_POINTS2["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
        CODE_POINTS2[CODE_POINTS2["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
        CODE_POINTS2[CODE_POINTS2["AMPERSAND"] = 38] = "AMPERSAND";
        CODE_POINTS2[CODE_POINTS2["APOSTROPHE"] = 39] = "APOSTROPHE";
        CODE_POINTS2[CODE_POINTS2["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
        CODE_POINTS2[CODE_POINTS2["SOLIDUS"] = 47] = "SOLIDUS";
        CODE_POINTS2[CODE_POINTS2["DIGIT_0"] = 48] = "DIGIT_0";
        CODE_POINTS2[CODE_POINTS2["DIGIT_9"] = 57] = "DIGIT_9";
        CODE_POINTS2[CODE_POINTS2["SEMICOLON"] = 59] = "SEMICOLON";
        CODE_POINTS2[CODE_POINTS2["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
        CODE_POINTS2[CODE_POINTS2["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
        CODE_POINTS2[CODE_POINTS2["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
        CODE_POINTS2[CODE_POINTS2["QUESTION_MARK"] = 63] = "QUESTION_MARK";
        CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
        CODE_POINTS2[CODE_POINTS2["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
        CODE_POINTS2[CODE_POINTS2["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
        CODE_POINTS2[CODE_POINTS2["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
        CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
        CODE_POINTS2[CODE_POINTS2["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
      })(CODE_POINTS || (CODE_POINTS = {}));
      SEQUENCES = {
        DASH_DASH: "--",
        CDATA_START: "[CDATA[",
        DOCTYPE: "doctype",
        SCRIPT: "script",
        PUBLIC: "public",
        SYSTEM: "system"
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/error-codes.js
  var ERR;
  var init_error_codes = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/error-codes.js"() {
      (function(ERR2) {
        ERR2["controlCharacterInInputStream"] = "control-character-in-input-stream";
        ERR2["noncharacterInInputStream"] = "noncharacter-in-input-stream";
        ERR2["surrogateInInputStream"] = "surrogate-in-input-stream";
        ERR2["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
        ERR2["endTagWithAttributes"] = "end-tag-with-attributes";
        ERR2["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
        ERR2["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
        ERR2["unexpectedNullCharacter"] = "unexpected-null-character";
        ERR2["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
        ERR2["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
        ERR2["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
        ERR2["missingEndTagName"] = "missing-end-tag-name";
        ERR2["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
        ERR2["unknownNamedCharacterReference"] = "unknown-named-character-reference";
        ERR2["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
        ERR2["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
        ERR2["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
        ERR2["eofBeforeTagName"] = "eof-before-tag-name";
        ERR2["eofInTag"] = "eof-in-tag";
        ERR2["missingAttributeValue"] = "missing-attribute-value";
        ERR2["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
        ERR2["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
        ERR2["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
        ERR2["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
        ERR2["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
        ERR2["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
        ERR2["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
        ERR2["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
        ERR2["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
        ERR2["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
        ERR2["cdataInHtmlContent"] = "cdata-in-html-content";
        ERR2["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
        ERR2["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
        ERR2["eofInDoctype"] = "eof-in-doctype";
        ERR2["nestedComment"] = "nested-comment";
        ERR2["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
        ERR2["eofInComment"] = "eof-in-comment";
        ERR2["incorrectlyClosedComment"] = "incorrectly-closed-comment";
        ERR2["eofInCdata"] = "eof-in-cdata";
        ERR2["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
        ERR2["nullCharacterReference"] = "null-character-reference";
        ERR2["surrogateCharacterReference"] = "surrogate-character-reference";
        ERR2["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
        ERR2["controlCharacterReference"] = "control-character-reference";
        ERR2["noncharacterCharacterReference"] = "noncharacter-character-reference";
        ERR2["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
        ERR2["missingDoctypeName"] = "missing-doctype-name";
        ERR2["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
        ERR2["duplicateAttribute"] = "duplicate-attribute";
        ERR2["nonConformingDoctype"] = "non-conforming-doctype";
        ERR2["missingDoctype"] = "missing-doctype";
        ERR2["misplacedDoctype"] = "misplaced-doctype";
        ERR2["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
        ERR2["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
        ERR2["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
        ERR2["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
        ERR2["abandonedHeadElementChild"] = "abandoned-head-element-child";
        ERR2["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
        ERR2["nestedNoscriptInHead"] = "nested-noscript-in-head";
        ERR2["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
      })(ERR || (ERR = {}));
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/tokenizer/preprocessor.js
  var DEFAULT_BUFFER_WATERLINE, Preprocessor;
  var init_preprocessor = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/tokenizer/preprocessor.js"() {
      init_unicode();
      init_error_codes();
      DEFAULT_BUFFER_WATERLINE = 1 << 16;
      Preprocessor = class {
        constructor(handler) {
          this.handler = handler;
          this.html = "";
          this.pos = -1;
          this.lastGapPos = -2;
          this.gapStack = [];
          this.skipNextNewLine = false;
          this.lastChunkWritten = false;
          this.endOfChunkHit = false;
          this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
          this.isEol = false;
          this.lineStartPos = 0;
          this.droppedBufferSize = 0;
          this.line = 1;
          this.lastErrOffset = -1;
        }
        /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
        get col() {
          return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
        }
        get offset() {
          return this.droppedBufferSize + this.pos;
        }
        getError(code4, cpOffset) {
          const { line, col, offset } = this;
          const startCol = col + cpOffset;
          const startOffset = offset + cpOffset;
          return {
            code: code4,
            startLine: line,
            endLine: line,
            startCol,
            endCol: startCol,
            startOffset,
            endOffset: startOffset
          };
        }
        _err(code4) {
          if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
            this.lastErrOffset = this.offset;
            this.handler.onParseError(this.getError(code4, 0));
          }
        }
        _addGap() {
          this.gapStack.push(this.lastGapPos);
          this.lastGapPos = this.pos;
        }
        _processSurrogate(cp) {
          if (this.pos !== this.html.length - 1) {
            const nextCp = this.html.charCodeAt(this.pos + 1);
            if (isSurrogatePair(nextCp)) {
              this.pos++;
              this._addGap();
              return getSurrogatePairCodePoint(cp, nextCp);
            }
          } else if (!this.lastChunkWritten) {
            this.endOfChunkHit = true;
            return CODE_POINTS.EOF;
          }
          this._err(ERR.surrogateInInputStream);
          return cp;
        }
        willDropParsedChunk() {
          return this.pos > this.bufferWaterline;
        }
        dropParsedChunk() {
          if (this.willDropParsedChunk()) {
            this.html = this.html.substring(this.pos);
            this.lineStartPos -= this.pos;
            this.droppedBufferSize += this.pos;
            this.pos = 0;
            this.lastGapPos = -2;
            this.gapStack.length = 0;
          }
        }
        write(chunk, isLastChunk) {
          if (this.html.length > 0) {
            this.html += chunk;
          } else {
            this.html = chunk;
          }
          this.endOfChunkHit = false;
          this.lastChunkWritten = isLastChunk;
        }
        insertHtmlAtCurrentPos(chunk) {
          this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
          this.endOfChunkHit = false;
        }
        startsWith(pattern, caseSensitive) {
          if (this.pos + pattern.length > this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return false;
          }
          if (caseSensitive) {
            return this.html.startsWith(pattern, this.pos);
          }
          for (let i = 0; i < pattern.length; i++) {
            const cp = this.html.charCodeAt(this.pos + i) | 32;
            if (cp !== pattern.charCodeAt(i)) {
              return false;
            }
          }
          return true;
        }
        peek(offset) {
          const pos = this.pos + offset;
          if (pos >= this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return CODE_POINTS.EOF;
          }
          const code4 = this.html.charCodeAt(pos);
          return code4 === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code4;
        }
        advance() {
          this.pos++;
          if (this.isEol) {
            this.isEol = false;
            this.line++;
            this.lineStartPos = this.pos;
          }
          if (this.pos >= this.html.length) {
            this.endOfChunkHit = !this.lastChunkWritten;
            return CODE_POINTS.EOF;
          }
          let cp = this.html.charCodeAt(this.pos);
          if (cp === CODE_POINTS.CARRIAGE_RETURN) {
            this.isEol = true;
            this.skipNextNewLine = true;
            return CODE_POINTS.LINE_FEED;
          }
          if (cp === CODE_POINTS.LINE_FEED) {
            this.isEol = true;
            if (this.skipNextNewLine) {
              this.line--;
              this.skipNextNewLine = false;
              this._addGap();
              return this.advance();
            }
          }
          this.skipNextNewLine = false;
          if (isSurrogate(cp)) {
            cp = this._processSurrogate(cp);
          }
          const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
          if (!isCommonValidRange) {
            this._checkForProblematicCharacters(cp);
          }
          return cp;
        }
        _checkForProblematicCharacters(cp) {
          if (isControlCodePoint(cp)) {
            this._err(ERR.controlCharacterInInputStream);
          } else if (isUndefinedCodePoint(cp)) {
            this._err(ERR.noncharacterInInputStream);
          }
        }
        retreat(count) {
          this.pos -= count;
          while (this.pos < this.lastGapPos) {
            this.lastGapPos = this.gapStack.pop();
            this.pos--;
          }
          this.isEol = false;
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/token.js
  var token_exports = {};
  __export(token_exports, {
    TokenType: () => TokenType,
    getTokenAttr: () => getTokenAttr
  });
  function getTokenAttr(token, attrName) {
    for (let i = token.attrs.length - 1; i >= 0; i--) {
      if (token.attrs[i].name === attrName) {
        return token.attrs[i].value;
      }
    }
    return null;
  }
  var TokenType;
  var init_token = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/token.js"() {
      (function(TokenType2) {
        TokenType2[TokenType2["CHARACTER"] = 0] = "CHARACTER";
        TokenType2[TokenType2["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
        TokenType2[TokenType2["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
        TokenType2[TokenType2["START_TAG"] = 3] = "START_TAG";
        TokenType2[TokenType2["END_TAG"] = 4] = "END_TAG";
        TokenType2[TokenType2["COMMENT"] = 5] = "COMMENT";
        TokenType2[TokenType2["DOCTYPE"] = 6] = "DOCTYPE";
        TokenType2[TokenType2["EOF"] = 7] = "EOF";
        TokenType2[TokenType2["HIBERNATION"] = 8] = "HIBERNATION";
      })(TokenType || (TokenType = {}));
    }
  });

  // node_modules/hast-util-raw/node_modules/entities/dist/esm/generated/decode-data-html.js
  var htmlDecodeTree;
  var init_decode_data_html = __esm({
    "node_modules/hast-util-raw/node_modules/entities/dist/esm/generated/decode-data-html.js"() {
      htmlDecodeTree = /* @__PURE__ */ new Uint16Array(
        // prettier-ignore
        /* @__PURE__ */ '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c) => c.charCodeAt(0))
      );
    }
  });

  // node_modules/hast-util-raw/node_modules/entities/dist/esm/generated/decode-data-xml.js
  var init_decode_data_xml = __esm({
    "node_modules/hast-util-raw/node_modules/entities/dist/esm/generated/decode-data-xml.js"() {
    }
  });

  // node_modules/hast-util-raw/node_modules/entities/dist/esm/decode-codepoint.js
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== void 0 ? _a2 : codePoint;
  }
  var _a, decodeMap, fromCodePoint;
  var init_decode_codepoint = __esm({
    "node_modules/hast-util-raw/node_modules/entities/dist/esm/decode-codepoint.js"() {
      decodeMap = /* @__PURE__ */ new Map([
        [0, 65533],
        // C1 Unicode control character reference replacements
        [128, 8364],
        [130, 8218],
        [131, 402],
        [132, 8222],
        [133, 8230],
        [134, 8224],
        [135, 8225],
        [136, 710],
        [137, 8240],
        [138, 352],
        [139, 8249],
        [140, 338],
        [142, 381],
        [145, 8216],
        [146, 8217],
        [147, 8220],
        [148, 8221],
        [149, 8226],
        [150, 8211],
        [151, 8212],
        [152, 732],
        [153, 8482],
        [154, 353],
        [155, 8250],
        [156, 339],
        [158, 382],
        [159, 376]
      ]);
      fromCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
      (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
        let output = "";
        if (codePoint > 65535) {
          codePoint -= 65536;
          output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        output += String.fromCharCode(codePoint);
        return output;
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/entities/dist/esm/decode.js
  function isNumber(code4) {
    return code4 >= CharCodes.ZERO && code4 <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code4) {
    return code4 >= CharCodes.UPPER_A && code4 <= CharCodes.UPPER_F || code4 >= CharCodes.LOWER_A && code4 <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code4) {
    return code4 >= CharCodes.UPPER_A && code4 <= CharCodes.UPPER_Z || code4 >= CharCodes.LOWER_A && code4 <= CharCodes.LOWER_Z || isNumber(code4);
  }
  function isEntityInAttributeInvalidEnd(code4) {
    return code4 === CharCodes.EQUALS || isAsciiAlphaNumeric(code4);
  }
  function determineBranch(decodeTree, current, nodeIndex, char) {
    const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
    }
    if (jumpOffset) {
      const value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
    }
    let lo = nodeIndex;
    let hi = lo + branchCount - 1;
    while (lo <= hi) {
      const mid = lo + hi >>> 1;
      const midValue = decodeTree[mid];
      if (midValue < char) {
        lo = mid + 1;
      } else if (midValue > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  var CharCodes, TO_LOWER_BIT, BinTrieFlags, EntityDecoderState, DecodingMode, EntityDecoder;
  var init_decode = __esm({
    "node_modules/hast-util-raw/node_modules/entities/dist/esm/decode.js"() {
      init_decode_data_html();
      init_decode_data_xml();
      init_decode_codepoint();
      init_decode_data_html();
      init_decode_data_xml();
      init_decode_codepoint();
      (function(CharCodes2) {
        CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
        CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
        CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
        CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
        CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
        CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
        CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
        CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
        CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
        CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
        CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
        CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
      })(CharCodes || (CharCodes = {}));
      TO_LOWER_BIT = 32;
      (function(BinTrieFlags2) {
        BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
        BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
        BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
      })(BinTrieFlags || (BinTrieFlags = {}));
      (function(EntityDecoderState2) {
        EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
        EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
        EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
        EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
        EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
      })(EntityDecoderState || (EntityDecoderState = {}));
      (function(DecodingMode2) {
        DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
        DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
        DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
      })(DecodingMode || (DecodingMode = {}));
      EntityDecoder = class {
        constructor(decodeTree, emitCodePoint, errors) {
          this.decodeTree = decodeTree;
          this.emitCodePoint = emitCodePoint;
          this.errors = errors;
          this.state = EntityDecoderState.EntityStart;
          this.consumed = 1;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.decodeMode = DecodingMode.Strict;
        }
        /** Resets the instance to make it reusable. */
        startEntity(decodeMode) {
          this.decodeMode = decodeMode;
          this.state = EntityDecoderState.EntityStart;
          this.result = 0;
          this.treeIndex = 0;
          this.excess = 1;
          this.consumed = 1;
        }
        /**
         * Write an entity to the decoder. This can be called multiple times with partial entities.
         * If the entity is incomplete, the decoder will return -1.
         *
         * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
         * entity is incomplete, and resume when the next string is written.
         *
         * @param input The string containing the entity (or a continuation of the entity).
         * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
         * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
         */
        write(input, offset) {
          switch (this.state) {
            case EntityDecoderState.EntityStart: {
              if (input.charCodeAt(offset) === CharCodes.NUM) {
                this.state = EntityDecoderState.NumericStart;
                this.consumed += 1;
                return this.stateNumericStart(input, offset + 1);
              }
              this.state = EntityDecoderState.NamedEntity;
              return this.stateNamedEntity(input, offset);
            }
            case EntityDecoderState.NumericStart: {
              return this.stateNumericStart(input, offset);
            }
            case EntityDecoderState.NumericDecimal: {
              return this.stateNumericDecimal(input, offset);
            }
            case EntityDecoderState.NumericHex: {
              return this.stateNumericHex(input, offset);
            }
            case EntityDecoderState.NamedEntity: {
              return this.stateNamedEntity(input, offset);
            }
          }
        }
        /**
         * Switches between the numeric decimal and hexadecimal states.
         *
         * Equivalent to the `Numeric character reference state` in the HTML spec.
         *
         * @param input The string containing the entity (or a continuation of the entity).
         * @param offset The current offset.
         * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
         */
        stateNumericStart(input, offset) {
          if (offset >= input.length) {
            return -1;
          }
          if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
            this.state = EntityDecoderState.NumericHex;
            this.consumed += 1;
            return this.stateNumericHex(input, offset + 1);
          }
          this.state = EntityDecoderState.NumericDecimal;
          return this.stateNumericDecimal(input, offset);
        }
        addToNumericResult(input, start, end, base) {
          if (start !== end) {
            const digitCount = end - start;
            this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input.substr(start, digitCount), base);
            this.consumed += digitCount;
          }
        }
        /**
         * Parses a hexadecimal numeric entity.
         *
         * Equivalent to the `Hexademical character reference state` in the HTML spec.
         *
         * @param input The string containing the entity (or a continuation of the entity).
         * @param offset The current offset.
         * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
         */
        stateNumericHex(input, offset) {
          const startIndex = offset;
          while (offset < input.length) {
            const char = input.charCodeAt(offset);
            if (isNumber(char) || isHexadecimalCharacter(char)) {
              offset += 1;
            } else {
              this.addToNumericResult(input, startIndex, offset, 16);
              return this.emitNumericEntity(char, 3);
            }
          }
          this.addToNumericResult(input, startIndex, offset, 16);
          return -1;
        }
        /**
         * Parses a decimal numeric entity.
         *
         * Equivalent to the `Decimal character reference state` in the HTML spec.
         *
         * @param input The string containing the entity (or a continuation of the entity).
         * @param offset The current offset.
         * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
         */
        stateNumericDecimal(input, offset) {
          const startIndex = offset;
          while (offset < input.length) {
            const char = input.charCodeAt(offset);
            if (isNumber(char)) {
              offset += 1;
            } else {
              this.addToNumericResult(input, startIndex, offset, 10);
              return this.emitNumericEntity(char, 2);
            }
          }
          this.addToNumericResult(input, startIndex, offset, 10);
          return -1;
        }
        /**
         * Validate and emit a numeric entity.
         *
         * Implements the logic from the `Hexademical character reference start
         * state` and `Numeric character reference end state` in the HTML spec.
         *
         * @param lastCp The last code point of the entity. Used to see if the
         *               entity was terminated with a semicolon.
         * @param expectedLength The minimum number of characters that should be
         *                       consumed. Used to validate that at least one digit
         *                       was consumed.
         * @returns The number of characters that were consumed.
         */
        emitNumericEntity(lastCp, expectedLength) {
          var _a2;
          if (this.consumed <= expectedLength) {
            (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
            return 0;
          }
          if (lastCp === CharCodes.SEMI) {
            this.consumed += 1;
          } else if (this.decodeMode === DecodingMode.Strict) {
            return 0;
          }
          this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
          if (this.errors) {
            if (lastCp !== CharCodes.SEMI) {
              this.errors.missingSemicolonAfterCharacterReference();
            }
            this.errors.validateNumericCharacterReference(this.result);
          }
          return this.consumed;
        }
        /**
         * Parses a named entity.
         *
         * Equivalent to the `Named character reference state` in the HTML spec.
         *
         * @param input The string containing the entity (or a continuation of the entity).
         * @param offset The current offset.
         * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
         */
        stateNamedEntity(input, offset) {
          const { decodeTree } = this;
          let current = decodeTree[this.treeIndex];
          let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
          for (; offset < input.length; offset++, this.excess++) {
            const char = input.charCodeAt(offset);
            this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
            if (this.treeIndex < 0) {
              return this.result === 0 || // If we are parsing an attribute
              this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
              (valueLength === 0 || // And there should be no invalid characters.
              isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
            }
            current = decodeTree[this.treeIndex];
            valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
            if (valueLength !== 0) {
              if (char === CharCodes.SEMI) {
                return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
              }
              if (this.decodeMode !== DecodingMode.Strict) {
                this.result = this.treeIndex;
                this.consumed += this.excess;
                this.excess = 0;
              }
            }
          }
          return -1;
        }
        /**
         * Emit a named entity that was not terminated with a semicolon.
         *
         * @returns The number of characters consumed.
         */
        emitNotTerminatedNamedEntity() {
          var _a2;
          const { result, decodeTree } = this;
          const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
          this.emitNamedEntityData(result, valueLength, this.consumed);
          (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.missingSemicolonAfterCharacterReference();
          return this.consumed;
        }
        /**
         * Emit a named entity.
         *
         * @param result The index of the entity in the decode tree.
         * @param valueLength The number of bytes in the entity.
         * @param consumed The number of characters consumed.
         *
         * @returns The number of characters consumed.
         */
        emitNamedEntityData(result, valueLength, consumed) {
          const { decodeTree } = this;
          this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
          if (valueLength === 3) {
            this.emitCodePoint(decodeTree[result + 2], consumed);
          }
          return consumed;
        }
        /**
         * Signal to the parser that the end of the input was reached.
         *
         * Remaining data will be emitted and relevant errors will be produced.
         *
         * @returns The number of characters consumed.
         */
        end() {
          var _a2;
          switch (this.state) {
            case EntityDecoderState.NamedEntity: {
              return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
            }
            // Otherwise, emit a numeric entity if we have one.
            case EntityDecoderState.NumericDecimal: {
              return this.emitNumericEntity(0, 2);
            }
            case EntityDecoderState.NumericHex: {
              return this.emitNumericEntity(0, 3);
            }
            case EntityDecoderState.NumericStart: {
              (_a2 = this.errors) === null || _a2 === void 0 ? void 0 : _a2.absenceOfDigitsInNumericCharacterReference(this.consumed);
              return 0;
            }
            case EntityDecoderState.EntityStart: {
              return 0;
            }
          }
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/html.js
  var html_exports = {};
  __export(html_exports, {
    ATTRS: () => ATTRS,
    DOCUMENT_MODE: () => DOCUMENT_MODE,
    NS: () => NS,
    NUMBERED_HEADERS: () => NUMBERED_HEADERS,
    SPECIAL_ELEMENTS: () => SPECIAL_ELEMENTS,
    TAG_ID: () => TAG_ID,
    TAG_NAMES: () => TAG_NAMES,
    getTagID: () => getTagID,
    hasUnescapedText: () => hasUnescapedText
  });
  function getTagID(tagName) {
    var _a2;
    return (_a2 = TAG_NAME_TO_ID.get(tagName)) !== null && _a2 !== void 0 ? _a2 : TAG_ID.UNKNOWN;
  }
  function hasUnescapedText(tn, scriptingEnabled) {
    return UNESCAPED_TEXT.has(tn) || scriptingEnabled && tn === TAG_NAMES.NOSCRIPT;
  }
  var NS, ATTRS, DOCUMENT_MODE, TAG_NAMES, TAG_ID, TAG_NAME_TO_ID, $, SPECIAL_ELEMENTS, NUMBERED_HEADERS, UNESCAPED_TEXT;
  var init_html4 = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/html.js"() {
      (function(NS2) {
        NS2["HTML"] = "http://www.w3.org/1999/xhtml";
        NS2["MATHML"] = "http://www.w3.org/1998/Math/MathML";
        NS2["SVG"] = "http://www.w3.org/2000/svg";
        NS2["XLINK"] = "http://www.w3.org/1999/xlink";
        NS2["XML"] = "http://www.w3.org/XML/1998/namespace";
        NS2["XMLNS"] = "http://www.w3.org/2000/xmlns/";
      })(NS || (NS = {}));
      (function(ATTRS2) {
        ATTRS2["TYPE"] = "type";
        ATTRS2["ACTION"] = "action";
        ATTRS2["ENCODING"] = "encoding";
        ATTRS2["PROMPT"] = "prompt";
        ATTRS2["NAME"] = "name";
        ATTRS2["COLOR"] = "color";
        ATTRS2["FACE"] = "face";
        ATTRS2["SIZE"] = "size";
      })(ATTRS || (ATTRS = {}));
      (function(DOCUMENT_MODE2) {
        DOCUMENT_MODE2["NO_QUIRKS"] = "no-quirks";
        DOCUMENT_MODE2["QUIRKS"] = "quirks";
        DOCUMENT_MODE2["LIMITED_QUIRKS"] = "limited-quirks";
      })(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
      (function(TAG_NAMES2) {
        TAG_NAMES2["A"] = "a";
        TAG_NAMES2["ADDRESS"] = "address";
        TAG_NAMES2["ANNOTATION_XML"] = "annotation-xml";
        TAG_NAMES2["APPLET"] = "applet";
        TAG_NAMES2["AREA"] = "area";
        TAG_NAMES2["ARTICLE"] = "article";
        TAG_NAMES2["ASIDE"] = "aside";
        TAG_NAMES2["B"] = "b";
        TAG_NAMES2["BASE"] = "base";
        TAG_NAMES2["BASEFONT"] = "basefont";
        TAG_NAMES2["BGSOUND"] = "bgsound";
        TAG_NAMES2["BIG"] = "big";
        TAG_NAMES2["BLOCKQUOTE"] = "blockquote";
        TAG_NAMES2["BODY"] = "body";
        TAG_NAMES2["BR"] = "br";
        TAG_NAMES2["BUTTON"] = "button";
        TAG_NAMES2["CAPTION"] = "caption";
        TAG_NAMES2["CENTER"] = "center";
        TAG_NAMES2["CODE"] = "code";
        TAG_NAMES2["COL"] = "col";
        TAG_NAMES2["COLGROUP"] = "colgroup";
        TAG_NAMES2["DD"] = "dd";
        TAG_NAMES2["DESC"] = "desc";
        TAG_NAMES2["DETAILS"] = "details";
        TAG_NAMES2["DIALOG"] = "dialog";
        TAG_NAMES2["DIR"] = "dir";
        TAG_NAMES2["DIV"] = "div";
        TAG_NAMES2["DL"] = "dl";
        TAG_NAMES2["DT"] = "dt";
        TAG_NAMES2["EM"] = "em";
        TAG_NAMES2["EMBED"] = "embed";
        TAG_NAMES2["FIELDSET"] = "fieldset";
        TAG_NAMES2["FIGCAPTION"] = "figcaption";
        TAG_NAMES2["FIGURE"] = "figure";
        TAG_NAMES2["FONT"] = "font";
        TAG_NAMES2["FOOTER"] = "footer";
        TAG_NAMES2["FOREIGN_OBJECT"] = "foreignObject";
        TAG_NAMES2["FORM"] = "form";
        TAG_NAMES2["FRAME"] = "frame";
        TAG_NAMES2["FRAMESET"] = "frameset";
        TAG_NAMES2["H1"] = "h1";
        TAG_NAMES2["H2"] = "h2";
        TAG_NAMES2["H3"] = "h3";
        TAG_NAMES2["H4"] = "h4";
        TAG_NAMES2["H5"] = "h5";
        TAG_NAMES2["H6"] = "h6";
        TAG_NAMES2["HEAD"] = "head";
        TAG_NAMES2["HEADER"] = "header";
        TAG_NAMES2["HGROUP"] = "hgroup";
        TAG_NAMES2["HR"] = "hr";
        TAG_NAMES2["HTML"] = "html";
        TAG_NAMES2["I"] = "i";
        TAG_NAMES2["IMG"] = "img";
        TAG_NAMES2["IMAGE"] = "image";
        TAG_NAMES2["INPUT"] = "input";
        TAG_NAMES2["IFRAME"] = "iframe";
        TAG_NAMES2["KEYGEN"] = "keygen";
        TAG_NAMES2["LABEL"] = "label";
        TAG_NAMES2["LI"] = "li";
        TAG_NAMES2["LINK"] = "link";
        TAG_NAMES2["LISTING"] = "listing";
        TAG_NAMES2["MAIN"] = "main";
        TAG_NAMES2["MALIGNMARK"] = "malignmark";
        TAG_NAMES2["MARQUEE"] = "marquee";
        TAG_NAMES2["MATH"] = "math";
        TAG_NAMES2["MENU"] = "menu";
        TAG_NAMES2["META"] = "meta";
        TAG_NAMES2["MGLYPH"] = "mglyph";
        TAG_NAMES2["MI"] = "mi";
        TAG_NAMES2["MO"] = "mo";
        TAG_NAMES2["MN"] = "mn";
        TAG_NAMES2["MS"] = "ms";
        TAG_NAMES2["MTEXT"] = "mtext";
        TAG_NAMES2["NAV"] = "nav";
        TAG_NAMES2["NOBR"] = "nobr";
        TAG_NAMES2["NOFRAMES"] = "noframes";
        TAG_NAMES2["NOEMBED"] = "noembed";
        TAG_NAMES2["NOSCRIPT"] = "noscript";
        TAG_NAMES2["OBJECT"] = "object";
        TAG_NAMES2["OL"] = "ol";
        TAG_NAMES2["OPTGROUP"] = "optgroup";
        TAG_NAMES2["OPTION"] = "option";
        TAG_NAMES2["P"] = "p";
        TAG_NAMES2["PARAM"] = "param";
        TAG_NAMES2["PLAINTEXT"] = "plaintext";
        TAG_NAMES2["PRE"] = "pre";
        TAG_NAMES2["RB"] = "rb";
        TAG_NAMES2["RP"] = "rp";
        TAG_NAMES2["RT"] = "rt";
        TAG_NAMES2["RTC"] = "rtc";
        TAG_NAMES2["RUBY"] = "ruby";
        TAG_NAMES2["S"] = "s";
        TAG_NAMES2["SCRIPT"] = "script";
        TAG_NAMES2["SEARCH"] = "search";
        TAG_NAMES2["SECTION"] = "section";
        TAG_NAMES2["SELECT"] = "select";
        TAG_NAMES2["SOURCE"] = "source";
        TAG_NAMES2["SMALL"] = "small";
        TAG_NAMES2["SPAN"] = "span";
        TAG_NAMES2["STRIKE"] = "strike";
        TAG_NAMES2["STRONG"] = "strong";
        TAG_NAMES2["STYLE"] = "style";
        TAG_NAMES2["SUB"] = "sub";
        TAG_NAMES2["SUMMARY"] = "summary";
        TAG_NAMES2["SUP"] = "sup";
        TAG_NAMES2["TABLE"] = "table";
        TAG_NAMES2["TBODY"] = "tbody";
        TAG_NAMES2["TEMPLATE"] = "template";
        TAG_NAMES2["TEXTAREA"] = "textarea";
        TAG_NAMES2["TFOOT"] = "tfoot";
        TAG_NAMES2["TD"] = "td";
        TAG_NAMES2["TH"] = "th";
        TAG_NAMES2["THEAD"] = "thead";
        TAG_NAMES2["TITLE"] = "title";
        TAG_NAMES2["TR"] = "tr";
        TAG_NAMES2["TRACK"] = "track";
        TAG_NAMES2["TT"] = "tt";
        TAG_NAMES2["U"] = "u";
        TAG_NAMES2["UL"] = "ul";
        TAG_NAMES2["SVG"] = "svg";
        TAG_NAMES2["VAR"] = "var";
        TAG_NAMES2["WBR"] = "wbr";
        TAG_NAMES2["XMP"] = "xmp";
      })(TAG_NAMES || (TAG_NAMES = {}));
      (function(TAG_ID2) {
        TAG_ID2[TAG_ID2["UNKNOWN"] = 0] = "UNKNOWN";
        TAG_ID2[TAG_ID2["A"] = 1] = "A";
        TAG_ID2[TAG_ID2["ADDRESS"] = 2] = "ADDRESS";
        TAG_ID2[TAG_ID2["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
        TAG_ID2[TAG_ID2["APPLET"] = 4] = "APPLET";
        TAG_ID2[TAG_ID2["AREA"] = 5] = "AREA";
        TAG_ID2[TAG_ID2["ARTICLE"] = 6] = "ARTICLE";
        TAG_ID2[TAG_ID2["ASIDE"] = 7] = "ASIDE";
        TAG_ID2[TAG_ID2["B"] = 8] = "B";
        TAG_ID2[TAG_ID2["BASE"] = 9] = "BASE";
        TAG_ID2[TAG_ID2["BASEFONT"] = 10] = "BASEFONT";
        TAG_ID2[TAG_ID2["BGSOUND"] = 11] = "BGSOUND";
        TAG_ID2[TAG_ID2["BIG"] = 12] = "BIG";
        TAG_ID2[TAG_ID2["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
        TAG_ID2[TAG_ID2["BODY"] = 14] = "BODY";
        TAG_ID2[TAG_ID2["BR"] = 15] = "BR";
        TAG_ID2[TAG_ID2["BUTTON"] = 16] = "BUTTON";
        TAG_ID2[TAG_ID2["CAPTION"] = 17] = "CAPTION";
        TAG_ID2[TAG_ID2["CENTER"] = 18] = "CENTER";
        TAG_ID2[TAG_ID2["CODE"] = 19] = "CODE";
        TAG_ID2[TAG_ID2["COL"] = 20] = "COL";
        TAG_ID2[TAG_ID2["COLGROUP"] = 21] = "COLGROUP";
        TAG_ID2[TAG_ID2["DD"] = 22] = "DD";
        TAG_ID2[TAG_ID2["DESC"] = 23] = "DESC";
        TAG_ID2[TAG_ID2["DETAILS"] = 24] = "DETAILS";
        TAG_ID2[TAG_ID2["DIALOG"] = 25] = "DIALOG";
        TAG_ID2[TAG_ID2["DIR"] = 26] = "DIR";
        TAG_ID2[TAG_ID2["DIV"] = 27] = "DIV";
        TAG_ID2[TAG_ID2["DL"] = 28] = "DL";
        TAG_ID2[TAG_ID2["DT"] = 29] = "DT";
        TAG_ID2[TAG_ID2["EM"] = 30] = "EM";
        TAG_ID2[TAG_ID2["EMBED"] = 31] = "EMBED";
        TAG_ID2[TAG_ID2["FIELDSET"] = 32] = "FIELDSET";
        TAG_ID2[TAG_ID2["FIGCAPTION"] = 33] = "FIGCAPTION";
        TAG_ID2[TAG_ID2["FIGURE"] = 34] = "FIGURE";
        TAG_ID2[TAG_ID2["FONT"] = 35] = "FONT";
        TAG_ID2[TAG_ID2["FOOTER"] = 36] = "FOOTER";
        TAG_ID2[TAG_ID2["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
        TAG_ID2[TAG_ID2["FORM"] = 38] = "FORM";
        TAG_ID2[TAG_ID2["FRAME"] = 39] = "FRAME";
        TAG_ID2[TAG_ID2["FRAMESET"] = 40] = "FRAMESET";
        TAG_ID2[TAG_ID2["H1"] = 41] = "H1";
        TAG_ID2[TAG_ID2["H2"] = 42] = "H2";
        TAG_ID2[TAG_ID2["H3"] = 43] = "H3";
        TAG_ID2[TAG_ID2["H4"] = 44] = "H4";
        TAG_ID2[TAG_ID2["H5"] = 45] = "H5";
        TAG_ID2[TAG_ID2["H6"] = 46] = "H6";
        TAG_ID2[TAG_ID2["HEAD"] = 47] = "HEAD";
        TAG_ID2[TAG_ID2["HEADER"] = 48] = "HEADER";
        TAG_ID2[TAG_ID2["HGROUP"] = 49] = "HGROUP";
        TAG_ID2[TAG_ID2["HR"] = 50] = "HR";
        TAG_ID2[TAG_ID2["HTML"] = 51] = "HTML";
        TAG_ID2[TAG_ID2["I"] = 52] = "I";
        TAG_ID2[TAG_ID2["IMG"] = 53] = "IMG";
        TAG_ID2[TAG_ID2["IMAGE"] = 54] = "IMAGE";
        TAG_ID2[TAG_ID2["INPUT"] = 55] = "INPUT";
        TAG_ID2[TAG_ID2["IFRAME"] = 56] = "IFRAME";
        TAG_ID2[TAG_ID2["KEYGEN"] = 57] = "KEYGEN";
        TAG_ID2[TAG_ID2["LABEL"] = 58] = "LABEL";
        TAG_ID2[TAG_ID2["LI"] = 59] = "LI";
        TAG_ID2[TAG_ID2["LINK"] = 60] = "LINK";
        TAG_ID2[TAG_ID2["LISTING"] = 61] = "LISTING";
        TAG_ID2[TAG_ID2["MAIN"] = 62] = "MAIN";
        TAG_ID2[TAG_ID2["MALIGNMARK"] = 63] = "MALIGNMARK";
        TAG_ID2[TAG_ID2["MARQUEE"] = 64] = "MARQUEE";
        TAG_ID2[TAG_ID2["MATH"] = 65] = "MATH";
        TAG_ID2[TAG_ID2["MENU"] = 66] = "MENU";
        TAG_ID2[TAG_ID2["META"] = 67] = "META";
        TAG_ID2[TAG_ID2["MGLYPH"] = 68] = "MGLYPH";
        TAG_ID2[TAG_ID2["MI"] = 69] = "MI";
        TAG_ID2[TAG_ID2["MO"] = 70] = "MO";
        TAG_ID2[TAG_ID2["MN"] = 71] = "MN";
        TAG_ID2[TAG_ID2["MS"] = 72] = "MS";
        TAG_ID2[TAG_ID2["MTEXT"] = 73] = "MTEXT";
        TAG_ID2[TAG_ID2["NAV"] = 74] = "NAV";
        TAG_ID2[TAG_ID2["NOBR"] = 75] = "NOBR";
        TAG_ID2[TAG_ID2["NOFRAMES"] = 76] = "NOFRAMES";
        TAG_ID2[TAG_ID2["NOEMBED"] = 77] = "NOEMBED";
        TAG_ID2[TAG_ID2["NOSCRIPT"] = 78] = "NOSCRIPT";
        TAG_ID2[TAG_ID2["OBJECT"] = 79] = "OBJECT";
        TAG_ID2[TAG_ID2["OL"] = 80] = "OL";
        TAG_ID2[TAG_ID2["OPTGROUP"] = 81] = "OPTGROUP";
        TAG_ID2[TAG_ID2["OPTION"] = 82] = "OPTION";
        TAG_ID2[TAG_ID2["P"] = 83] = "P";
        TAG_ID2[TAG_ID2["PARAM"] = 84] = "PARAM";
        TAG_ID2[TAG_ID2["PLAINTEXT"] = 85] = "PLAINTEXT";
        TAG_ID2[TAG_ID2["PRE"] = 86] = "PRE";
        TAG_ID2[TAG_ID2["RB"] = 87] = "RB";
        TAG_ID2[TAG_ID2["RP"] = 88] = "RP";
        TAG_ID2[TAG_ID2["RT"] = 89] = "RT";
        TAG_ID2[TAG_ID2["RTC"] = 90] = "RTC";
        TAG_ID2[TAG_ID2["RUBY"] = 91] = "RUBY";
        TAG_ID2[TAG_ID2["S"] = 92] = "S";
        TAG_ID2[TAG_ID2["SCRIPT"] = 93] = "SCRIPT";
        TAG_ID2[TAG_ID2["SEARCH"] = 94] = "SEARCH";
        TAG_ID2[TAG_ID2["SECTION"] = 95] = "SECTION";
        TAG_ID2[TAG_ID2["SELECT"] = 96] = "SELECT";
        TAG_ID2[TAG_ID2["SOURCE"] = 97] = "SOURCE";
        TAG_ID2[TAG_ID2["SMALL"] = 98] = "SMALL";
        TAG_ID2[TAG_ID2["SPAN"] = 99] = "SPAN";
        TAG_ID2[TAG_ID2["STRIKE"] = 100] = "STRIKE";
        TAG_ID2[TAG_ID2["STRONG"] = 101] = "STRONG";
        TAG_ID2[TAG_ID2["STYLE"] = 102] = "STYLE";
        TAG_ID2[TAG_ID2["SUB"] = 103] = "SUB";
        TAG_ID2[TAG_ID2["SUMMARY"] = 104] = "SUMMARY";
        TAG_ID2[TAG_ID2["SUP"] = 105] = "SUP";
        TAG_ID2[TAG_ID2["TABLE"] = 106] = "TABLE";
        TAG_ID2[TAG_ID2["TBODY"] = 107] = "TBODY";
        TAG_ID2[TAG_ID2["TEMPLATE"] = 108] = "TEMPLATE";
        TAG_ID2[TAG_ID2["TEXTAREA"] = 109] = "TEXTAREA";
        TAG_ID2[TAG_ID2["TFOOT"] = 110] = "TFOOT";
        TAG_ID2[TAG_ID2["TD"] = 111] = "TD";
        TAG_ID2[TAG_ID2["TH"] = 112] = "TH";
        TAG_ID2[TAG_ID2["THEAD"] = 113] = "THEAD";
        TAG_ID2[TAG_ID2["TITLE"] = 114] = "TITLE";
        TAG_ID2[TAG_ID2["TR"] = 115] = "TR";
        TAG_ID2[TAG_ID2["TRACK"] = 116] = "TRACK";
        TAG_ID2[TAG_ID2["TT"] = 117] = "TT";
        TAG_ID2[TAG_ID2["U"] = 118] = "U";
        TAG_ID2[TAG_ID2["UL"] = 119] = "UL";
        TAG_ID2[TAG_ID2["SVG"] = 120] = "SVG";
        TAG_ID2[TAG_ID2["VAR"] = 121] = "VAR";
        TAG_ID2[TAG_ID2["WBR"] = 122] = "WBR";
        TAG_ID2[TAG_ID2["XMP"] = 123] = "XMP";
      })(TAG_ID || (TAG_ID = {}));
      TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
        [TAG_NAMES.A, TAG_ID.A],
        [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
        [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
        [TAG_NAMES.APPLET, TAG_ID.APPLET],
        [TAG_NAMES.AREA, TAG_ID.AREA],
        [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
        [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
        [TAG_NAMES.B, TAG_ID.B],
        [TAG_NAMES.BASE, TAG_ID.BASE],
        [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
        [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
        [TAG_NAMES.BIG, TAG_ID.BIG],
        [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
        [TAG_NAMES.BODY, TAG_ID.BODY],
        [TAG_NAMES.BR, TAG_ID.BR],
        [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
        [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
        [TAG_NAMES.CENTER, TAG_ID.CENTER],
        [TAG_NAMES.CODE, TAG_ID.CODE],
        [TAG_NAMES.COL, TAG_ID.COL],
        [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
        [TAG_NAMES.DD, TAG_ID.DD],
        [TAG_NAMES.DESC, TAG_ID.DESC],
        [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
        [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
        [TAG_NAMES.DIR, TAG_ID.DIR],
        [TAG_NAMES.DIV, TAG_ID.DIV],
        [TAG_NAMES.DL, TAG_ID.DL],
        [TAG_NAMES.DT, TAG_ID.DT],
        [TAG_NAMES.EM, TAG_ID.EM],
        [TAG_NAMES.EMBED, TAG_ID.EMBED],
        [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
        [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
        [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
        [TAG_NAMES.FONT, TAG_ID.FONT],
        [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
        [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
        [TAG_NAMES.FORM, TAG_ID.FORM],
        [TAG_NAMES.FRAME, TAG_ID.FRAME],
        [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
        [TAG_NAMES.H1, TAG_ID.H1],
        [TAG_NAMES.H2, TAG_ID.H2],
        [TAG_NAMES.H3, TAG_ID.H3],
        [TAG_NAMES.H4, TAG_ID.H4],
        [TAG_NAMES.H5, TAG_ID.H5],
        [TAG_NAMES.H6, TAG_ID.H6],
        [TAG_NAMES.HEAD, TAG_ID.HEAD],
        [TAG_NAMES.HEADER, TAG_ID.HEADER],
        [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
        [TAG_NAMES.HR, TAG_ID.HR],
        [TAG_NAMES.HTML, TAG_ID.HTML],
        [TAG_NAMES.I, TAG_ID.I],
        [TAG_NAMES.IMG, TAG_ID.IMG],
        [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
        [TAG_NAMES.INPUT, TAG_ID.INPUT],
        [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
        [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
        [TAG_NAMES.LABEL, TAG_ID.LABEL],
        [TAG_NAMES.LI, TAG_ID.LI],
        [TAG_NAMES.LINK, TAG_ID.LINK],
        [TAG_NAMES.LISTING, TAG_ID.LISTING],
        [TAG_NAMES.MAIN, TAG_ID.MAIN],
        [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
        [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
        [TAG_NAMES.MATH, TAG_ID.MATH],
        [TAG_NAMES.MENU, TAG_ID.MENU],
        [TAG_NAMES.META, TAG_ID.META],
        [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
        [TAG_NAMES.MI, TAG_ID.MI],
        [TAG_NAMES.MO, TAG_ID.MO],
        [TAG_NAMES.MN, TAG_ID.MN],
        [TAG_NAMES.MS, TAG_ID.MS],
        [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
        [TAG_NAMES.NAV, TAG_ID.NAV],
        [TAG_NAMES.NOBR, TAG_ID.NOBR],
        [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
        [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
        [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
        [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
        [TAG_NAMES.OL, TAG_ID.OL],
        [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
        [TAG_NAMES.OPTION, TAG_ID.OPTION],
        [TAG_NAMES.P, TAG_ID.P],
        [TAG_NAMES.PARAM, TAG_ID.PARAM],
        [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
        [TAG_NAMES.PRE, TAG_ID.PRE],
        [TAG_NAMES.RB, TAG_ID.RB],
        [TAG_NAMES.RP, TAG_ID.RP],
        [TAG_NAMES.RT, TAG_ID.RT],
        [TAG_NAMES.RTC, TAG_ID.RTC],
        [TAG_NAMES.RUBY, TAG_ID.RUBY],
        [TAG_NAMES.S, TAG_ID.S],
        [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
        [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
        [TAG_NAMES.SECTION, TAG_ID.SECTION],
        [TAG_NAMES.SELECT, TAG_ID.SELECT],
        [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
        [TAG_NAMES.SMALL, TAG_ID.SMALL],
        [TAG_NAMES.SPAN, TAG_ID.SPAN],
        [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
        [TAG_NAMES.STRONG, TAG_ID.STRONG],
        [TAG_NAMES.STYLE, TAG_ID.STYLE],
        [TAG_NAMES.SUB, TAG_ID.SUB],
        [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
        [TAG_NAMES.SUP, TAG_ID.SUP],
        [TAG_NAMES.TABLE, TAG_ID.TABLE],
        [TAG_NAMES.TBODY, TAG_ID.TBODY],
        [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
        [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
        [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
        [TAG_NAMES.TD, TAG_ID.TD],
        [TAG_NAMES.TH, TAG_ID.TH],
        [TAG_NAMES.THEAD, TAG_ID.THEAD],
        [TAG_NAMES.TITLE, TAG_ID.TITLE],
        [TAG_NAMES.TR, TAG_ID.TR],
        [TAG_NAMES.TRACK, TAG_ID.TRACK],
        [TAG_NAMES.TT, TAG_ID.TT],
        [TAG_NAMES.U, TAG_ID.U],
        [TAG_NAMES.UL, TAG_ID.UL],
        [TAG_NAMES.SVG, TAG_ID.SVG],
        [TAG_NAMES.VAR, TAG_ID.VAR],
        [TAG_NAMES.WBR, TAG_ID.WBR],
        [TAG_NAMES.XMP, TAG_ID.XMP]
      ]);
      $ = TAG_ID;
      SPECIAL_ELEMENTS = {
        [NS.HTML]: /* @__PURE__ */ new Set([
          $.ADDRESS,
          $.APPLET,
          $.AREA,
          $.ARTICLE,
          $.ASIDE,
          $.BASE,
          $.BASEFONT,
          $.BGSOUND,
          $.BLOCKQUOTE,
          $.BODY,
          $.BR,
          $.BUTTON,
          $.CAPTION,
          $.CENTER,
          $.COL,
          $.COLGROUP,
          $.DD,
          $.DETAILS,
          $.DIR,
          $.DIV,
          $.DL,
          $.DT,
          $.EMBED,
          $.FIELDSET,
          $.FIGCAPTION,
          $.FIGURE,
          $.FOOTER,
          $.FORM,
          $.FRAME,
          $.FRAMESET,
          $.H1,
          $.H2,
          $.H3,
          $.H4,
          $.H5,
          $.H6,
          $.HEAD,
          $.HEADER,
          $.HGROUP,
          $.HR,
          $.HTML,
          $.IFRAME,
          $.IMG,
          $.INPUT,
          $.LI,
          $.LINK,
          $.LISTING,
          $.MAIN,
          $.MARQUEE,
          $.MENU,
          $.META,
          $.NAV,
          $.NOEMBED,
          $.NOFRAMES,
          $.NOSCRIPT,
          $.OBJECT,
          $.OL,
          $.P,
          $.PARAM,
          $.PLAINTEXT,
          $.PRE,
          $.SCRIPT,
          $.SECTION,
          $.SELECT,
          $.SOURCE,
          $.STYLE,
          $.SUMMARY,
          $.TABLE,
          $.TBODY,
          $.TD,
          $.TEMPLATE,
          $.TEXTAREA,
          $.TFOOT,
          $.TH,
          $.THEAD,
          $.TITLE,
          $.TR,
          $.TRACK,
          $.UL,
          $.WBR,
          $.XMP
        ]),
        [NS.MATHML]: /* @__PURE__ */ new Set([$.MI, $.MO, $.MN, $.MS, $.MTEXT, $.ANNOTATION_XML]),
        [NS.SVG]: /* @__PURE__ */ new Set([$.TITLE, $.FOREIGN_OBJECT, $.DESC]),
        [NS.XLINK]: /* @__PURE__ */ new Set(),
        [NS.XML]: /* @__PURE__ */ new Set(),
        [NS.XMLNS]: /* @__PURE__ */ new Set()
      };
      NUMBERED_HEADERS = /* @__PURE__ */ new Set([$.H1, $.H2, $.H3, $.H4, $.H5, $.H6]);
      UNESCAPED_TEXT = /* @__PURE__ */ new Set([
        TAG_NAMES.STYLE,
        TAG_NAMES.SCRIPT,
        TAG_NAMES.XMP,
        TAG_NAMES.IFRAME,
        TAG_NAMES.NOEMBED,
        TAG_NAMES.NOFRAMES,
        TAG_NAMES.PLAINTEXT
      ]);
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/tokenizer/index.js
  function isAsciiDigit(cp) {
    return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
  }
  function isAsciiUpper(cp) {
    return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
  }
  function isAsciiLower(cp) {
    return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
  }
  function isAsciiLetter(cp) {
    return isAsciiLower(cp) || isAsciiUpper(cp);
  }
  function isAsciiAlphaNumeric2(cp) {
    return isAsciiLetter(cp) || isAsciiDigit(cp);
  }
  function toAsciiLower(cp) {
    return cp + 32;
  }
  function isWhitespace(cp) {
    return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
  }
  function isScriptDataDoubleEscapeSequenceEnd(cp) {
    return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
  }
  function getErrorForNumericCharacterReference(code4) {
    if (code4 === CODE_POINTS.NULL) {
      return ERR.nullCharacterReference;
    } else if (code4 > 1114111) {
      return ERR.characterReferenceOutsideUnicodeRange;
    } else if (isSurrogate(code4)) {
      return ERR.surrogateCharacterReference;
    } else if (isUndefinedCodePoint(code4)) {
      return ERR.noncharacterCharacterReference;
    } else if (isControlCodePoint(code4) || code4 === CODE_POINTS.CARRIAGE_RETURN) {
      return ERR.controlCharacterReference;
    }
    return null;
  }
  var State, TokenizerMode, Tokenizer;
  var init_tokenizer = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/tokenizer/index.js"() {
      init_preprocessor();
      init_unicode();
      init_token();
      init_decode();
      init_error_codes();
      init_html4();
      (function(State2) {
        State2[State2["DATA"] = 0] = "DATA";
        State2[State2["RCDATA"] = 1] = "RCDATA";
        State2[State2["RAWTEXT"] = 2] = "RAWTEXT";
        State2[State2["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
        State2[State2["PLAINTEXT"] = 4] = "PLAINTEXT";
        State2[State2["TAG_OPEN"] = 5] = "TAG_OPEN";
        State2[State2["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
        State2[State2["TAG_NAME"] = 7] = "TAG_NAME";
        State2[State2["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
        State2[State2["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
        State2[State2["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
        State2[State2["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
        State2[State2["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
        State2[State2["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
        State2[State2["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
        State2[State2["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
        State2[State2["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
        State2[State2["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
        State2[State2["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
        State2[State2["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
        State2[State2["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
        State2[State2["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
        State2[State2["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
        State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
        State2[State2["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
        State2[State2["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
        State2[State2["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
        State2[State2["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
        State2[State2["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
        State2[State2["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
        State2[State2["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
        State2[State2["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
        State2[State2["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
        State2[State2["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
        State2[State2["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
        State2[State2["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
        State2[State2["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
        State2[State2["COMMENT_START"] = 42] = "COMMENT_START";
        State2[State2["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
        State2[State2["COMMENT"] = 44] = "COMMENT";
        State2[State2["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
        State2[State2["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
        State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
        State2[State2["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
        State2[State2["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
        State2[State2["COMMENT_END"] = 50] = "COMMENT_END";
        State2[State2["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
        State2[State2["DOCTYPE"] = 52] = "DOCTYPE";
        State2[State2["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
        State2[State2["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
        State2[State2["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
        State2[State2["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
        State2[State2["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
        State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
        State2[State2["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
        State2[State2["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
        State2[State2["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
        State2[State2["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
        State2[State2["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
        State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
        State2[State2["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
        State2[State2["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
        State2[State2["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
        State2[State2["CDATA_SECTION"] = 68] = "CDATA_SECTION";
        State2[State2["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
        State2[State2["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
        State2[State2["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
        State2[State2["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
      })(State || (State = {}));
      TokenizerMode = {
        DATA: State.DATA,
        RCDATA: State.RCDATA,
        RAWTEXT: State.RAWTEXT,
        SCRIPT_DATA: State.SCRIPT_DATA,
        PLAINTEXT: State.PLAINTEXT,
        CDATA_SECTION: State.CDATA_SECTION
      };
      Tokenizer = class {
        constructor(options, handler) {
          this.options = options;
          this.handler = handler;
          this.paused = false;
          this.inLoop = false;
          this.inForeignNode = false;
          this.lastStartTagName = "";
          this.active = false;
          this.state = State.DATA;
          this.returnState = State.DATA;
          this.entityStartPos = 0;
          this.consumedAfterSnapshot = -1;
          this.currentCharacterToken = null;
          this.currentToken = null;
          this.currentAttr = { name: "", value: "" };
          this.preprocessor = new Preprocessor(handler);
          this.currentLocation = this.getCurrentLocation(-1);
          this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
            this.preprocessor.pos = this.entityStartPos + consumed - 1;
            this._flushCodePointConsumedAsCharacterReference(cp);
          }, handler.onParseError ? {
            missingSemicolonAfterCharacterReference: () => {
              this._err(ERR.missingSemicolonAfterCharacterReference, 1);
            },
            absenceOfDigitsInNumericCharacterReference: (consumed) => {
              this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
            },
            validateNumericCharacterReference: (code4) => {
              const error = getErrorForNumericCharacterReference(code4);
              if (error)
                this._err(error, 1);
            }
          } : void 0);
        }
        //Errors
        _err(code4, cpOffset = 0) {
          var _a2, _b;
          (_b = (_a2 = this.handler).onParseError) === null || _b === void 0 ? void 0 : _b.call(_a2, this.preprocessor.getError(code4, cpOffset));
        }
        // NOTE: `offset` may never run across line boundaries.
        getCurrentLocation(offset) {
          if (!this.options.sourceCodeLocationInfo) {
            return null;
          }
          return {
            startLine: this.preprocessor.line,
            startCol: this.preprocessor.col - offset,
            startOffset: this.preprocessor.offset - offset,
            endLine: -1,
            endCol: -1,
            endOffset: -1
          };
        }
        _runParsingLoop() {
          if (this.inLoop)
            return;
          this.inLoop = true;
          while (this.active && !this.paused) {
            this.consumedAfterSnapshot = 0;
            const cp = this._consume();
            if (!this._ensureHibernation()) {
              this._callState(cp);
            }
          }
          this.inLoop = false;
        }
        //API
        pause() {
          this.paused = true;
        }
        resume(writeCallback) {
          if (!this.paused) {
            throw new Error("Parser was already resumed");
          }
          this.paused = false;
          if (this.inLoop)
            return;
          this._runParsingLoop();
          if (!this.paused) {
            writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
          }
        }
        write(chunk, isLastChunk, writeCallback) {
          this.active = true;
          this.preprocessor.write(chunk, isLastChunk);
          this._runParsingLoop();
          if (!this.paused) {
            writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
          }
        }
        insertHtmlAtCurrentPos(chunk) {
          this.active = true;
          this.preprocessor.insertHtmlAtCurrentPos(chunk);
          this._runParsingLoop();
        }
        //Hibernation
        _ensureHibernation() {
          if (this.preprocessor.endOfChunkHit) {
            this.preprocessor.retreat(this.consumedAfterSnapshot);
            this.consumedAfterSnapshot = 0;
            this.active = false;
            return true;
          }
          return false;
        }
        //Consumption
        _consume() {
          this.consumedAfterSnapshot++;
          return this.preprocessor.advance();
        }
        _advanceBy(count) {
          this.consumedAfterSnapshot += count;
          for (let i = 0; i < count; i++) {
            this.preprocessor.advance();
          }
        }
        _consumeSequenceIfMatch(pattern, caseSensitive) {
          if (this.preprocessor.startsWith(pattern, caseSensitive)) {
            this._advanceBy(pattern.length - 1);
            return true;
          }
          return false;
        }
        //Token creation
        _createStartTagToken() {
          this.currentToken = {
            type: TokenType.START_TAG,
            tagName: "",
            tagID: TAG_ID.UNKNOWN,
            selfClosing: false,
            ackSelfClosing: false,
            attrs: [],
            location: this.getCurrentLocation(1)
          };
        }
        _createEndTagToken() {
          this.currentToken = {
            type: TokenType.END_TAG,
            tagName: "",
            tagID: TAG_ID.UNKNOWN,
            selfClosing: false,
            ackSelfClosing: false,
            attrs: [],
            location: this.getCurrentLocation(2)
          };
        }
        _createCommentToken(offset) {
          this.currentToken = {
            type: TokenType.COMMENT,
            data: "",
            location: this.getCurrentLocation(offset)
          };
        }
        _createDoctypeToken(initialName) {
          this.currentToken = {
            type: TokenType.DOCTYPE,
            name: initialName,
            forceQuirks: false,
            publicId: null,
            systemId: null,
            location: this.currentLocation
          };
        }
        _createCharacterToken(type, chars) {
          this.currentCharacterToken = {
            type,
            chars,
            location: this.currentLocation
          };
        }
        //Tag attributes
        _createAttr(attrNameFirstCh) {
          this.currentAttr = {
            name: attrNameFirstCh,
            value: ""
          };
          this.currentLocation = this.getCurrentLocation(0);
        }
        _leaveAttrName() {
          var _a2;
          var _b;
          const token = this.currentToken;
          if (getTokenAttr(token, this.currentAttr.name) === null) {
            token.attrs.push(this.currentAttr);
            if (token.location && this.currentLocation) {
              const attrLocations = (_a2 = (_b = token.location).attrs) !== null && _a2 !== void 0 ? _a2 : _b.attrs = /* @__PURE__ */ Object.create(null);
              attrLocations[this.currentAttr.name] = this.currentLocation;
              this._leaveAttrValue();
            }
          } else {
            this._err(ERR.duplicateAttribute);
          }
        }
        _leaveAttrValue() {
          if (this.currentLocation) {
            this.currentLocation.endLine = this.preprocessor.line;
            this.currentLocation.endCol = this.preprocessor.col;
            this.currentLocation.endOffset = this.preprocessor.offset;
          }
        }
        //Token emission
        prepareToken(ct) {
          this._emitCurrentCharacterToken(ct.location);
          this.currentToken = null;
          if (ct.location) {
            ct.location.endLine = this.preprocessor.line;
            ct.location.endCol = this.preprocessor.col + 1;
            ct.location.endOffset = this.preprocessor.offset + 1;
          }
          this.currentLocation = this.getCurrentLocation(-1);
        }
        emitCurrentTagToken() {
          const ct = this.currentToken;
          this.prepareToken(ct);
          ct.tagID = getTagID(ct.tagName);
          if (ct.type === TokenType.START_TAG) {
            this.lastStartTagName = ct.tagName;
            this.handler.onStartTag(ct);
          } else {
            if (ct.attrs.length > 0) {
              this._err(ERR.endTagWithAttributes);
            }
            if (ct.selfClosing) {
              this._err(ERR.endTagWithTrailingSolidus);
            }
            this.handler.onEndTag(ct);
          }
          this.preprocessor.dropParsedChunk();
        }
        emitCurrentComment(ct) {
          this.prepareToken(ct);
          this.handler.onComment(ct);
          this.preprocessor.dropParsedChunk();
        }
        emitCurrentDoctype(ct) {
          this.prepareToken(ct);
          this.handler.onDoctype(ct);
          this.preprocessor.dropParsedChunk();
        }
        _emitCurrentCharacterToken(nextLocation) {
          if (this.currentCharacterToken) {
            if (nextLocation && this.currentCharacterToken.location) {
              this.currentCharacterToken.location.endLine = nextLocation.startLine;
              this.currentCharacterToken.location.endCol = nextLocation.startCol;
              this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
            }
            switch (this.currentCharacterToken.type) {
              case TokenType.CHARACTER: {
                this.handler.onCharacter(this.currentCharacterToken);
                break;
              }
              case TokenType.NULL_CHARACTER: {
                this.handler.onNullCharacter(this.currentCharacterToken);
                break;
              }
              case TokenType.WHITESPACE_CHARACTER: {
                this.handler.onWhitespaceCharacter(this.currentCharacterToken);
                break;
              }
            }
            this.currentCharacterToken = null;
          }
        }
        _emitEOFToken() {
          const location2 = this.getCurrentLocation(0);
          if (location2) {
            location2.endLine = location2.startLine;
            location2.endCol = location2.startCol;
            location2.endOffset = location2.startOffset;
          }
          this._emitCurrentCharacterToken(location2);
          this.handler.onEof({ type: TokenType.EOF, location: location2 });
          this.active = false;
        }
        //Characters emission
        //OPTIMIZATION: The specification uses only one type of character token (one token per character).
        //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
        //If we have a sequence of characters that belong to the same group, the parser can process it
        //as a single solid character token.
        //So, there are 3 types of character tokens in parse5:
        //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
        //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
        //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
        _appendCharToCurrentCharacterToken(type, ch) {
          if (this.currentCharacterToken) {
            if (this.currentCharacterToken.type === type) {
              this.currentCharacterToken.chars += ch;
              return;
            } else {
              this.currentLocation = this.getCurrentLocation(0);
              this._emitCurrentCharacterToken(this.currentLocation);
              this.preprocessor.dropParsedChunk();
            }
          }
          this._createCharacterToken(type, ch);
        }
        _emitCodePoint(cp) {
          const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
          this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
        }
        //NOTE: used when we emit characters explicitly.
        //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
        _emitChars(ch) {
          this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
        }
        // Character reference helpers
        _startCharacterReference() {
          this.returnState = this.state;
          this.state = State.CHARACTER_REFERENCE;
          this.entityStartPos = this.preprocessor.pos;
          this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
        }
        _isCharacterReferenceInAttribute() {
          return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
        }
        _flushCodePointConsumedAsCharacterReference(cp) {
          if (this._isCharacterReferenceInAttribute()) {
            this.currentAttr.value += String.fromCodePoint(cp);
          } else {
            this._emitCodePoint(cp);
          }
        }
        // Calling states this way turns out to be much faster than any other approach.
        _callState(cp) {
          switch (this.state) {
            case State.DATA: {
              this._stateData(cp);
              break;
            }
            case State.RCDATA: {
              this._stateRcdata(cp);
              break;
            }
            case State.RAWTEXT: {
              this._stateRawtext(cp);
              break;
            }
            case State.SCRIPT_DATA: {
              this._stateScriptData(cp);
              break;
            }
            case State.PLAINTEXT: {
              this._statePlaintext(cp);
              break;
            }
            case State.TAG_OPEN: {
              this._stateTagOpen(cp);
              break;
            }
            case State.END_TAG_OPEN: {
              this._stateEndTagOpen(cp);
              break;
            }
            case State.TAG_NAME: {
              this._stateTagName(cp);
              break;
            }
            case State.RCDATA_LESS_THAN_SIGN: {
              this._stateRcdataLessThanSign(cp);
              break;
            }
            case State.RCDATA_END_TAG_OPEN: {
              this._stateRcdataEndTagOpen(cp);
              break;
            }
            case State.RCDATA_END_TAG_NAME: {
              this._stateRcdataEndTagName(cp);
              break;
            }
            case State.RAWTEXT_LESS_THAN_SIGN: {
              this._stateRawtextLessThanSign(cp);
              break;
            }
            case State.RAWTEXT_END_TAG_OPEN: {
              this._stateRawtextEndTagOpen(cp);
              break;
            }
            case State.RAWTEXT_END_TAG_NAME: {
              this._stateRawtextEndTagName(cp);
              break;
            }
            case State.SCRIPT_DATA_LESS_THAN_SIGN: {
              this._stateScriptDataLessThanSign(cp);
              break;
            }
            case State.SCRIPT_DATA_END_TAG_OPEN: {
              this._stateScriptDataEndTagOpen(cp);
              break;
            }
            case State.SCRIPT_DATA_END_TAG_NAME: {
              this._stateScriptDataEndTagName(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPE_START: {
              this._stateScriptDataEscapeStart(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPE_START_DASH: {
              this._stateScriptDataEscapeStartDash(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED: {
              this._stateScriptDataEscaped(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED_DASH: {
              this._stateScriptDataEscapedDash(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
              this._stateScriptDataEscapedDashDash(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
              this._stateScriptDataEscapedLessThanSign(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
              this._stateScriptDataEscapedEndTagOpen(cp);
              break;
            }
            case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
              this._stateScriptDataEscapedEndTagName(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
              this._stateScriptDataDoubleEscapeStart(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
              this._stateScriptDataDoubleEscaped(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
              this._stateScriptDataDoubleEscapedDash(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
              this._stateScriptDataDoubleEscapedDashDash(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
              this._stateScriptDataDoubleEscapedLessThanSign(cp);
              break;
            }
            case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
              this._stateScriptDataDoubleEscapeEnd(cp);
              break;
            }
            case State.BEFORE_ATTRIBUTE_NAME: {
              this._stateBeforeAttributeName(cp);
              break;
            }
            case State.ATTRIBUTE_NAME: {
              this._stateAttributeName(cp);
              break;
            }
            case State.AFTER_ATTRIBUTE_NAME: {
              this._stateAfterAttributeName(cp);
              break;
            }
            case State.BEFORE_ATTRIBUTE_VALUE: {
              this._stateBeforeAttributeValue(cp);
              break;
            }
            case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
              this._stateAttributeValueDoubleQuoted(cp);
              break;
            }
            case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
              this._stateAttributeValueSingleQuoted(cp);
              break;
            }
            case State.ATTRIBUTE_VALUE_UNQUOTED: {
              this._stateAttributeValueUnquoted(cp);
              break;
            }
            case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
              this._stateAfterAttributeValueQuoted(cp);
              break;
            }
            case State.SELF_CLOSING_START_TAG: {
              this._stateSelfClosingStartTag(cp);
              break;
            }
            case State.BOGUS_COMMENT: {
              this._stateBogusComment(cp);
              break;
            }
            case State.MARKUP_DECLARATION_OPEN: {
              this._stateMarkupDeclarationOpen(cp);
              break;
            }
            case State.COMMENT_START: {
              this._stateCommentStart(cp);
              break;
            }
            case State.COMMENT_START_DASH: {
              this._stateCommentStartDash(cp);
              break;
            }
            case State.COMMENT: {
              this._stateComment(cp);
              break;
            }
            case State.COMMENT_LESS_THAN_SIGN: {
              this._stateCommentLessThanSign(cp);
              break;
            }
            case State.COMMENT_LESS_THAN_SIGN_BANG: {
              this._stateCommentLessThanSignBang(cp);
              break;
            }
            case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
              this._stateCommentLessThanSignBangDash(cp);
              break;
            }
            case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
              this._stateCommentLessThanSignBangDashDash(cp);
              break;
            }
            case State.COMMENT_END_DASH: {
              this._stateCommentEndDash(cp);
              break;
            }
            case State.COMMENT_END: {
              this._stateCommentEnd(cp);
              break;
            }
            case State.COMMENT_END_BANG: {
              this._stateCommentEndBang(cp);
              break;
            }
            case State.DOCTYPE: {
              this._stateDoctype(cp);
              break;
            }
            case State.BEFORE_DOCTYPE_NAME: {
              this._stateBeforeDoctypeName(cp);
              break;
            }
            case State.DOCTYPE_NAME: {
              this._stateDoctypeName(cp);
              break;
            }
            case State.AFTER_DOCTYPE_NAME: {
              this._stateAfterDoctypeName(cp);
              break;
            }
            case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
              this._stateAfterDoctypePublicKeyword(cp);
              break;
            }
            case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
              this._stateBeforeDoctypePublicIdentifier(cp);
              break;
            }
            case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
              this._stateDoctypePublicIdentifierDoubleQuoted(cp);
              break;
            }
            case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
              this._stateDoctypePublicIdentifierSingleQuoted(cp);
              break;
            }
            case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
              this._stateAfterDoctypePublicIdentifier(cp);
              break;
            }
            case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
              this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
              break;
            }
            case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
              this._stateAfterDoctypeSystemKeyword(cp);
              break;
            }
            case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
              this._stateBeforeDoctypeSystemIdentifier(cp);
              break;
            }
            case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
              this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
              break;
            }
            case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
              this._stateDoctypeSystemIdentifierSingleQuoted(cp);
              break;
            }
            case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
              this._stateAfterDoctypeSystemIdentifier(cp);
              break;
            }
            case State.BOGUS_DOCTYPE: {
              this._stateBogusDoctype(cp);
              break;
            }
            case State.CDATA_SECTION: {
              this._stateCdataSection(cp);
              break;
            }
            case State.CDATA_SECTION_BRACKET: {
              this._stateCdataSectionBracket(cp);
              break;
            }
            case State.CDATA_SECTION_END: {
              this._stateCdataSectionEnd(cp);
              break;
            }
            case State.CHARACTER_REFERENCE: {
              this._stateCharacterReference();
              break;
            }
            case State.AMBIGUOUS_AMPERSAND: {
              this._stateAmbiguousAmpersand(cp);
              break;
            }
            default: {
              throw new Error("Unknown state");
            }
          }
        }
        // State machine
        // Data state
        //------------------------------------------------------------------
        _stateData(cp) {
          switch (cp) {
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.TAG_OPEN;
              break;
            }
            case CODE_POINTS.AMPERSAND: {
              this._startCharacterReference();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitCodePoint(cp);
              break;
            }
            case CODE_POINTS.EOF: {
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        //  RCDATA state
        //------------------------------------------------------------------
        _stateRcdata(cp) {
          switch (cp) {
            case CODE_POINTS.AMPERSAND: {
              this._startCharacterReference();
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.RCDATA_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // RAWTEXT state
        //------------------------------------------------------------------
        _stateRawtext(cp) {
          switch (cp) {
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.RAWTEXT_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data state
        //------------------------------------------------------------------
        _stateScriptData(cp) {
          switch (cp) {
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // PLAINTEXT state
        //------------------------------------------------------------------
        _statePlaintext(cp) {
          switch (cp) {
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // Tag open state
        //------------------------------------------------------------------
        _stateTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this._createStartTagToken();
            this.state = State.TAG_NAME;
            this._stateTagName(cp);
          } else
            switch (cp) {
              case CODE_POINTS.EXCLAMATION_MARK: {
                this.state = State.MARKUP_DECLARATION_OPEN;
                break;
              }
              case CODE_POINTS.SOLIDUS: {
                this.state = State.END_TAG_OPEN;
                break;
              }
              case CODE_POINTS.QUESTION_MARK: {
                this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
                this._createCommentToken(1);
                this.state = State.BOGUS_COMMENT;
                this._stateBogusComment(cp);
                break;
              }
              case CODE_POINTS.EOF: {
                this._err(ERR.eofBeforeTagName);
                this._emitChars("<");
                this._emitEOFToken();
                break;
              }
              default: {
                this._err(ERR.invalidFirstCharacterOfTagName);
                this._emitChars("<");
                this.state = State.DATA;
                this._stateData(cp);
              }
            }
        }
        // End tag open state
        //------------------------------------------------------------------
        _stateEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this._createEndTagToken();
            this.state = State.TAG_NAME;
            this._stateTagName(cp);
          } else
            switch (cp) {
              case CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(ERR.missingEndTagName);
                this.state = State.DATA;
                break;
              }
              case CODE_POINTS.EOF: {
                this._err(ERR.eofBeforeTagName);
                this._emitChars("</");
                this._emitEOFToken();
                break;
              }
              default: {
                this._err(ERR.invalidFirstCharacterOfTagName);
                this._createCommentToken(2);
                this.state = State.BOGUS_COMMENT;
                this._stateBogusComment(cp);
              }
            }
        }
        // Tag name state
        //------------------------------------------------------------------
        _stateTagName(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              break;
            }
            case CODE_POINTS.SOLIDUS: {
              this.state = State.SELF_CLOSING_START_TAG;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.tagName += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
            }
          }
        }
        // RCDATA less-than sign state
        //------------------------------------------------------------------
        _stateRcdataLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
            this.state = State.RCDATA_END_TAG_OPEN;
          } else {
            this._emitChars("<");
            this.state = State.RCDATA;
            this._stateRcdata(cp);
          }
        }
        // RCDATA end tag open state
        //------------------------------------------------------------------
        _stateRcdataEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this.state = State.RCDATA_END_TAG_NAME;
            this._stateRcdataEndTagName(cp);
          } else {
            this._emitChars("</");
            this.state = State.RCDATA;
            this._stateRcdata(cp);
          }
        }
        handleSpecialEndTag(_cp) {
          if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
            return !this._ensureHibernation();
          }
          this._createEndTagToken();
          const token = this.currentToken;
          token.tagName = this.lastStartTagName;
          const cp = this.preprocessor.peek(this.lastStartTagName.length);
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this._advanceBy(this.lastStartTagName.length);
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              return false;
            }
            case CODE_POINTS.SOLIDUS: {
              this._advanceBy(this.lastStartTagName.length);
              this.state = State.SELF_CLOSING_START_TAG;
              return false;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._advanceBy(this.lastStartTagName.length);
              this.emitCurrentTagToken();
              this.state = State.DATA;
              return false;
            }
            default: {
              return !this._ensureHibernation();
            }
          }
        }
        // RCDATA end tag name state
        //------------------------------------------------------------------
        _stateRcdataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
            this._emitChars("</");
            this.state = State.RCDATA;
            this._stateRcdata(cp);
          }
        }
        // RAWTEXT less-than sign state
        //------------------------------------------------------------------
        _stateRawtextLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
            this.state = State.RAWTEXT_END_TAG_OPEN;
          } else {
            this._emitChars("<");
            this.state = State.RAWTEXT;
            this._stateRawtext(cp);
          }
        }
        // RAWTEXT end tag open state
        //------------------------------------------------------------------
        _stateRawtextEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this.state = State.RAWTEXT_END_TAG_NAME;
            this._stateRawtextEndTagName(cp);
          } else {
            this._emitChars("</");
            this.state = State.RAWTEXT;
            this._stateRawtext(cp);
          }
        }
        // RAWTEXT end tag name state
        //------------------------------------------------------------------
        _stateRawtextEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
            this._emitChars("</");
            this.state = State.RAWTEXT;
            this._stateRawtext(cp);
          }
        }
        // Script data less-than sign state
        //------------------------------------------------------------------
        _stateScriptDataLessThanSign(cp) {
          switch (cp) {
            case CODE_POINTS.SOLIDUS: {
              this.state = State.SCRIPT_DATA_END_TAG_OPEN;
              break;
            }
            case CODE_POINTS.EXCLAMATION_MARK: {
              this.state = State.SCRIPT_DATA_ESCAPE_START;
              this._emitChars("<!");
              break;
            }
            default: {
              this._emitChars("<");
              this.state = State.SCRIPT_DATA;
              this._stateScriptData(cp);
            }
          }
        }
        // Script data end tag open state
        //------------------------------------------------------------------
        _stateScriptDataEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this.state = State.SCRIPT_DATA_END_TAG_NAME;
            this._stateScriptDataEndTagName(cp);
          } else {
            this._emitChars("</");
            this.state = State.SCRIPT_DATA;
            this._stateScriptData(cp);
          }
        }
        // Script data end tag name state
        //------------------------------------------------------------------
        _stateScriptDataEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
            this._emitChars("</");
            this.state = State.SCRIPT_DATA;
            this._stateScriptData(cp);
          }
        }
        // Script data escape start state
        //------------------------------------------------------------------
        _stateScriptDataEscapeStart(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
            this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
            this._emitChars("-");
          } else {
            this.state = State.SCRIPT_DATA;
            this._stateScriptData(cp);
          }
        }
        // Script data escape start dash state
        //------------------------------------------------------------------
        _stateScriptDataEscapeStartDash(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
            this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
            this._emitChars("-");
          } else {
            this.state = State.SCRIPT_DATA;
            this._stateScriptData(cp);
          }
        }
        // Script data escaped state
        //------------------------------------------------------------------
        _stateScriptDataEscaped(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.SCRIPT_DATA_ESCAPED_DASH;
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data escaped dash state
        //------------------------------------------------------------------
        _stateScriptDataEscapedDash(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data escaped dash dash state
        //------------------------------------------------------------------
        _stateScriptDataEscapedDashDash(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.SCRIPT_DATA;
              this._emitChars(">");
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this.state = State.SCRIPT_DATA_ESCAPED;
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data escaped less-than sign state
        //------------------------------------------------------------------
        _stateScriptDataEscapedLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
            this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
          } else if (isAsciiLetter(cp)) {
            this._emitChars("<");
            this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
            this._stateScriptDataDoubleEscapeStart(cp);
          } else {
            this._emitChars("<");
            this.state = State.SCRIPT_DATA_ESCAPED;
            this._stateScriptDataEscaped(cp);
          }
        }
        // Script data escaped end tag open state
        //------------------------------------------------------------------
        _stateScriptDataEscapedEndTagOpen(cp) {
          if (isAsciiLetter(cp)) {
            this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
            this._stateScriptDataEscapedEndTagName(cp);
          } else {
            this._emitChars("</");
            this.state = State.SCRIPT_DATA_ESCAPED;
            this._stateScriptDataEscaped(cp);
          }
        }
        // Script data escaped end tag name state
        //------------------------------------------------------------------
        _stateScriptDataEscapedEndTagName(cp) {
          if (this.handleSpecialEndTag(cp)) {
            this._emitChars("</");
            this.state = State.SCRIPT_DATA_ESCAPED;
            this._stateScriptDataEscaped(cp);
          }
        }
        // Script data double escape start state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscapeStart(cp) {
          if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
            this._emitCodePoint(cp);
            for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
              this._emitCodePoint(this._consume());
            }
            this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
          } else if (!this._ensureHibernation()) {
            this.state = State.SCRIPT_DATA_ESCAPED;
            this._stateScriptDataEscaped(cp);
          }
        }
        // Script data double escaped state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscaped(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
              this._emitChars("<");
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data double escaped dash state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscapedDash(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
              this._emitChars("<");
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data double escaped dash dash state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscapedDashDash(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this._emitChars("-");
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
              this._emitChars("<");
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.SCRIPT_DATA;
              this._emitChars(">");
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._emitChars(REPLACEMENT_CHARACTER);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInScriptHtmlCommentLikeText);
              this._emitEOFToken();
              break;
            }
            default: {
              this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
              this._emitCodePoint(cp);
            }
          }
        }
        // Script data double escaped less-than sign state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscapedLessThanSign(cp) {
          if (cp === CODE_POINTS.SOLIDUS) {
            this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
            this._emitChars("/");
          } else {
            this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
            this._stateScriptDataDoubleEscaped(cp);
          }
        }
        // Script data double escape end state
        //------------------------------------------------------------------
        _stateScriptDataDoubleEscapeEnd(cp) {
          if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
            this._emitCodePoint(cp);
            for (let i = 0; i < SEQUENCES.SCRIPT.length; i++) {
              this._emitCodePoint(this._consume());
            }
            this.state = State.SCRIPT_DATA_ESCAPED;
          } else if (!this._ensureHibernation()) {
            this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
            this._stateScriptDataDoubleEscaped(cp);
          }
        }
        // Before attribute name state
        //------------------------------------------------------------------
        _stateBeforeAttributeName(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.SOLIDUS:
            case CODE_POINTS.GREATER_THAN_SIGN:
            case CODE_POINTS.EOF: {
              this.state = State.AFTER_ATTRIBUTE_NAME;
              this._stateAfterAttributeName(cp);
              break;
            }
            case CODE_POINTS.EQUALS_SIGN: {
              this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
              this._createAttr("=");
              this.state = State.ATTRIBUTE_NAME;
              break;
            }
            default: {
              this._createAttr("");
              this.state = State.ATTRIBUTE_NAME;
              this._stateAttributeName(cp);
            }
          }
        }
        // Attribute name state
        //------------------------------------------------------------------
        _stateAttributeName(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED:
            case CODE_POINTS.SOLIDUS:
            case CODE_POINTS.GREATER_THAN_SIGN:
            case CODE_POINTS.EOF: {
              this._leaveAttrName();
              this.state = State.AFTER_ATTRIBUTE_NAME;
              this._stateAfterAttributeName(cp);
              break;
            }
            case CODE_POINTS.EQUALS_SIGN: {
              this._leaveAttrName();
              this.state = State.BEFORE_ATTRIBUTE_VALUE;
              break;
            }
            case CODE_POINTS.QUOTATION_MARK:
            case CODE_POINTS.APOSTROPHE:
            case CODE_POINTS.LESS_THAN_SIGN: {
              this._err(ERR.unexpectedCharacterInAttributeName);
              this.currentAttr.name += String.fromCodePoint(cp);
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.currentAttr.name += REPLACEMENT_CHARACTER;
              break;
            }
            default: {
              this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
            }
          }
        }
        // After attribute name state
        //------------------------------------------------------------------
        _stateAfterAttributeName(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.SOLIDUS: {
              this.state = State.SELF_CLOSING_START_TAG;
              break;
            }
            case CODE_POINTS.EQUALS_SIGN: {
              this.state = State.BEFORE_ATTRIBUTE_VALUE;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this._createAttr("");
              this.state = State.ATTRIBUTE_NAME;
              this._stateAttributeName(cp);
            }
          }
        }
        // Before attribute value state
        //------------------------------------------------------------------
        _stateBeforeAttributeValue(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.missingAttributeValue);
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            default: {
              this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
              this._stateAttributeValueUnquoted(cp);
            }
          }
        }
        // Attribute value (double-quoted) state
        //------------------------------------------------------------------
        _stateAttributeValueDoubleQuoted(cp) {
          switch (cp) {
            case CODE_POINTS.QUOTATION_MARK: {
              this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
              break;
            }
            case CODE_POINTS.AMPERSAND: {
              this._startCharacterReference();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.currentAttr.value += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this.currentAttr.value += String.fromCodePoint(cp);
            }
          }
        }
        // Attribute value (single-quoted) state
        //------------------------------------------------------------------
        _stateAttributeValueSingleQuoted(cp) {
          switch (cp) {
            case CODE_POINTS.APOSTROPHE: {
              this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
              break;
            }
            case CODE_POINTS.AMPERSAND: {
              this._startCharacterReference();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.currentAttr.value += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this.currentAttr.value += String.fromCodePoint(cp);
            }
          }
        }
        // Attribute value (unquoted) state
        //------------------------------------------------------------------
        _stateAttributeValueUnquoted(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this._leaveAttrValue();
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              break;
            }
            case CODE_POINTS.AMPERSAND: {
              this._startCharacterReference();
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._leaveAttrValue();
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              this.currentAttr.value += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.QUOTATION_MARK:
            case CODE_POINTS.APOSTROPHE:
            case CODE_POINTS.LESS_THAN_SIGN:
            case CODE_POINTS.EQUALS_SIGN:
            case CODE_POINTS.GRAVE_ACCENT: {
              this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
              this.currentAttr.value += String.fromCodePoint(cp);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this.currentAttr.value += String.fromCodePoint(cp);
            }
          }
        }
        // After attribute value (quoted) state
        //------------------------------------------------------------------
        _stateAfterAttributeValueQuoted(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this._leaveAttrValue();
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              break;
            }
            case CODE_POINTS.SOLIDUS: {
              this._leaveAttrValue();
              this.state = State.SELF_CLOSING_START_TAG;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._leaveAttrValue();
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingWhitespaceBetweenAttributes);
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              this._stateBeforeAttributeName(cp);
            }
          }
        }
        // Self-closing start tag state
        //------------------------------------------------------------------
        _stateSelfClosingStartTag(cp) {
          switch (cp) {
            case CODE_POINTS.GREATER_THAN_SIGN: {
              const token = this.currentToken;
              token.selfClosing = true;
              this.state = State.DATA;
              this.emitCurrentTagToken();
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInTag);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.unexpectedSolidusInTag);
              this.state = State.BEFORE_ATTRIBUTE_NAME;
              this._stateBeforeAttributeName(cp);
            }
          }
        }
        // Bogus comment state
        //------------------------------------------------------------------
        _stateBogusComment(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentComment(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.data += REPLACEMENT_CHARACTER;
              break;
            }
            default: {
              token.data += String.fromCodePoint(cp);
            }
          }
        }
        // Markup declaration open state
        //------------------------------------------------------------------
        _stateMarkupDeclarationOpen(cp) {
          if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
            this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
            this.state = State.COMMENT_START;
          } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
            this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
            this.state = State.DOCTYPE;
          } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
            if (this.inForeignNode) {
              this.state = State.CDATA_SECTION;
            } else {
              this._err(ERR.cdataInHtmlContent);
              this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
              this.currentToken.data = "[CDATA[";
              this.state = State.BOGUS_COMMENT;
            }
          } else if (!this._ensureHibernation()) {
            this._err(ERR.incorrectlyOpenedComment);
            this._createCommentToken(2);
            this.state = State.BOGUS_COMMENT;
            this._stateBogusComment(cp);
          }
        }
        // Comment start state
        //------------------------------------------------------------------
        _stateCommentStart(cp) {
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.COMMENT_START_DASH;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptClosingOfEmptyComment);
              this.state = State.DATA;
              const token = this.currentToken;
              this.emitCurrentComment(token);
              break;
            }
            default: {
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // Comment start dash state
        //------------------------------------------------------------------
        _stateCommentStartDash(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.COMMENT_END;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptClosingOfEmptyComment);
              this.state = State.DATA;
              this.emitCurrentComment(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInComment);
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.data += "-";
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // Comment state
        //------------------------------------------------------------------
        _stateComment(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.COMMENT_END_DASH;
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              token.data += "<";
              this.state = State.COMMENT_LESS_THAN_SIGN;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.data += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInComment);
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.data += String.fromCodePoint(cp);
            }
          }
        }
        // Comment less-than sign state
        //------------------------------------------------------------------
        _stateCommentLessThanSign(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.EXCLAMATION_MARK: {
              token.data += "!";
              this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
              break;
            }
            case CODE_POINTS.LESS_THAN_SIGN: {
              token.data += "<";
              break;
            }
            default: {
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // Comment less-than sign bang state
        //------------------------------------------------------------------
        _stateCommentLessThanSignBang(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
            this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
          } else {
            this.state = State.COMMENT;
            this._stateComment(cp);
          }
        }
        // Comment less-than sign bang dash state
        //------------------------------------------------------------------
        _stateCommentLessThanSignBangDash(cp) {
          if (cp === CODE_POINTS.HYPHEN_MINUS) {
            this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
          } else {
            this.state = State.COMMENT_END_DASH;
            this._stateCommentEndDash(cp);
          }
        }
        // Comment less-than sign bang dash dash state
        //------------------------------------------------------------------
        _stateCommentLessThanSignBangDashDash(cp) {
          if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
            this._err(ERR.nestedComment);
          }
          this.state = State.COMMENT_END;
          this._stateCommentEnd(cp);
        }
        // Comment end dash state
        //------------------------------------------------------------------
        _stateCommentEndDash(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              this.state = State.COMMENT_END;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInComment);
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.data += "-";
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // Comment end state
        //------------------------------------------------------------------
        _stateCommentEnd(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentComment(token);
              break;
            }
            case CODE_POINTS.EXCLAMATION_MARK: {
              this.state = State.COMMENT_END_BANG;
              break;
            }
            case CODE_POINTS.HYPHEN_MINUS: {
              token.data += "-";
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInComment);
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.data += "--";
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // Comment end bang state
        //------------------------------------------------------------------
        _stateCommentEndBang(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.HYPHEN_MINUS: {
              token.data += "--!";
              this.state = State.COMMENT_END_DASH;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.incorrectlyClosedComment);
              this.state = State.DATA;
              this.emitCurrentComment(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInComment);
              this.emitCurrentComment(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.data += "--!";
              this.state = State.COMMENT;
              this._stateComment(cp);
            }
          }
        }
        // DOCTYPE state
        //------------------------------------------------------------------
        _stateDoctype(cp) {
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.BEFORE_DOCTYPE_NAME;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.BEFORE_DOCTYPE_NAME;
              this._stateBeforeDoctypeName(cp);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              this._createDoctypeToken(null);
              const token = this.currentToken;
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingWhitespaceBeforeDoctypeName);
              this.state = State.BEFORE_DOCTYPE_NAME;
              this._stateBeforeDoctypeName(cp);
            }
          }
        }
        // Before DOCTYPE name state
        //------------------------------------------------------------------
        _stateBeforeDoctypeName(cp) {
          if (isAsciiUpper(cp)) {
            this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
            this.state = State.DOCTYPE_NAME;
          } else
            switch (cp) {
              case CODE_POINTS.SPACE:
              case CODE_POINTS.LINE_FEED:
              case CODE_POINTS.TABULATION:
              case CODE_POINTS.FORM_FEED: {
                break;
              }
              case CODE_POINTS.NULL: {
                this._err(ERR.unexpectedNullCharacter);
                this._createDoctypeToken(REPLACEMENT_CHARACTER);
                this.state = State.DOCTYPE_NAME;
                break;
              }
              case CODE_POINTS.GREATER_THAN_SIGN: {
                this._err(ERR.missingDoctypeName);
                this._createDoctypeToken(null);
                const token = this.currentToken;
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this.state = State.DATA;
                break;
              }
              case CODE_POINTS.EOF: {
                this._err(ERR.eofInDoctype);
                this._createDoctypeToken(null);
                const token = this.currentToken;
                token.forceQuirks = true;
                this.emitCurrentDoctype(token);
                this._emitEOFToken();
                break;
              }
              default: {
                this._createDoctypeToken(String.fromCodePoint(cp));
                this.state = State.DOCTYPE_NAME;
              }
            }
        }
        // DOCTYPE name state
        //------------------------------------------------------------------
        _stateDoctypeName(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.AFTER_DOCTYPE_NAME;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.name += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
            }
          }
        }
        // After DOCTYPE name state
        //------------------------------------------------------------------
        _stateAfterDoctypeName(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
                this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
              } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
                this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
              } else if (!this._ensureHibernation()) {
                this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
                token.forceQuirks = true;
                this.state = State.BOGUS_DOCTYPE;
                this._stateBogusDoctype(cp);
              }
            }
          }
        }
        // After DOCTYPE public keyword state
        //------------------------------------------------------------------
        _stateAfterDoctypePublicKeyword(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
              token.publicId = "";
              this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
              token.publicId = "";
              this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.missingDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // Before DOCTYPE public identifier state
        //------------------------------------------------------------------
        _stateBeforeDoctypePublicIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              token.publicId = "";
              this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              token.publicId = "";
              this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.missingDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // DOCTYPE public identifier (double-quoted) state
        //------------------------------------------------------------------
        _stateDoctypePublicIdentifierDoubleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.QUOTATION_MARK: {
              this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.publicId += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.publicId += String.fromCodePoint(cp);
            }
          }
        }
        // DOCTYPE public identifier (single-quoted) state
        //------------------------------------------------------------------
        _stateDoctypePublicIdentifierSingleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.APOSTROPHE: {
              this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.publicId += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptDoctypePublicIdentifier);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.publicId += String.fromCodePoint(cp);
            }
          }
        }
        // After DOCTYPE public identifier state
        //------------------------------------------------------------------
        _stateAfterDoctypePublicIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // Between DOCTYPE public and system identifiers state
        //------------------------------------------------------------------
        _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // After DOCTYPE system keyword state
        //------------------------------------------------------------------
        _stateAfterDoctypeSystemKeyword(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.missingDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // Before DOCTYPE system identifier state
        //------------------------------------------------------------------
        _stateBeforeDoctypeSystemIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.QUOTATION_MARK: {
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
              break;
            }
            case CODE_POINTS.APOSTROPHE: {
              token.systemId = "";
              this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.missingDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.DATA;
              this.emitCurrentDoctype(token);
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // DOCTYPE system identifier (double-quoted) state
        //------------------------------------------------------------------
        _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.QUOTATION_MARK: {
              this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.systemId += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.systemId += String.fromCodePoint(cp);
            }
          }
        }
        // DOCTYPE system identifier (single-quoted) state
        //------------------------------------------------------------------
        _stateDoctypeSystemIdentifierSingleQuoted(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.APOSTROPHE: {
              this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              token.systemId += REPLACEMENT_CHARACTER;
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this._err(ERR.abruptDoctypeSystemIdentifier);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              token.systemId += String.fromCodePoint(cp);
            }
          }
        }
        // After DOCTYPE system identifier state
        //------------------------------------------------------------------
        _stateAfterDoctypeSystemIdentifier(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.SPACE:
            case CODE_POINTS.LINE_FEED:
            case CODE_POINTS.TABULATION:
            case CODE_POINTS.FORM_FEED: {
              break;
            }
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInDoctype);
              token.forceQuirks = true;
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default: {
              this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
              this.state = State.BOGUS_DOCTYPE;
              this._stateBogusDoctype(cp);
            }
          }
        }
        // Bogus DOCTYPE state
        //------------------------------------------------------------------
        _stateBogusDoctype(cp) {
          const token = this.currentToken;
          switch (cp) {
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.emitCurrentDoctype(token);
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.NULL: {
              this._err(ERR.unexpectedNullCharacter);
              break;
            }
            case CODE_POINTS.EOF: {
              this.emitCurrentDoctype(token);
              this._emitEOFToken();
              break;
            }
            default:
          }
        }
        // CDATA section state
        //------------------------------------------------------------------
        _stateCdataSection(cp) {
          switch (cp) {
            case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
              this.state = State.CDATA_SECTION_BRACKET;
              break;
            }
            case CODE_POINTS.EOF: {
              this._err(ERR.eofInCdata);
              this._emitEOFToken();
              break;
            }
            default: {
              this._emitCodePoint(cp);
            }
          }
        }
        // CDATA section bracket state
        //------------------------------------------------------------------
        _stateCdataSectionBracket(cp) {
          if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
            this.state = State.CDATA_SECTION_END;
          } else {
            this._emitChars("]");
            this.state = State.CDATA_SECTION;
            this._stateCdataSection(cp);
          }
        }
        // CDATA section end state
        //------------------------------------------------------------------
        _stateCdataSectionEnd(cp) {
          switch (cp) {
            case CODE_POINTS.GREATER_THAN_SIGN: {
              this.state = State.DATA;
              break;
            }
            case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
              this._emitChars("]");
              break;
            }
            default: {
              this._emitChars("]]");
              this.state = State.CDATA_SECTION;
              this._stateCdataSection(cp);
            }
          }
        }
        // Character reference state
        //------------------------------------------------------------------
        _stateCharacterReference() {
          let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
          if (length < 0) {
            if (this.preprocessor.lastChunkWritten) {
              length = this.entityDecoder.end();
            } else {
              this.active = false;
              this.preprocessor.pos = this.preprocessor.html.length - 1;
              this.consumedAfterSnapshot = 0;
              this.preprocessor.endOfChunkHit = true;
              return;
            }
          }
          if (length === 0) {
            this.preprocessor.pos = this.entityStartPos;
            this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
            this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
          } else {
            this.state = this.returnState;
          }
        }
        // Ambiguos ampersand state
        //------------------------------------------------------------------
        _stateAmbiguousAmpersand(cp) {
          if (isAsciiAlphaNumeric2(cp)) {
            this._flushCodePointConsumedAsCharacterReference(cp);
          } else {
            if (cp === CODE_POINTS.SEMICOLON) {
              this._err(ERR.unknownNamedCharacterReference);
            }
            this.state = this.returnState;
            this._callState(cp);
          }
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/parser/open-element-stack.js
  var IMPLICIT_END_TAG_REQUIRED, IMPLICIT_END_TAG_REQUIRED_THOROUGHLY, SCOPING_ELEMENTS_HTML, SCOPING_ELEMENTS_HTML_LIST, SCOPING_ELEMENTS_HTML_BUTTON, SCOPING_ELEMENTS_MATHML, SCOPING_ELEMENTS_SVG, TABLE_ROW_CONTEXT, TABLE_BODY_CONTEXT, TABLE_CONTEXT, TABLE_CELLS, OpenElementStack;
  var init_open_element_stack = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/parser/open-element-stack.js"() {
      init_html4();
      IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
      IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
        ...IMPLICIT_END_TAG_REQUIRED,
        TAG_ID.CAPTION,
        TAG_ID.COLGROUP,
        TAG_ID.TBODY,
        TAG_ID.TD,
        TAG_ID.TFOOT,
        TAG_ID.TH,
        TAG_ID.THEAD,
        TAG_ID.TR
      ]);
      SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
        TAG_ID.APPLET,
        TAG_ID.CAPTION,
        TAG_ID.HTML,
        TAG_ID.MARQUEE,
        TAG_ID.OBJECT,
        TAG_ID.TABLE,
        TAG_ID.TD,
        TAG_ID.TEMPLATE,
        TAG_ID.TH
      ]);
      SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
      SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
      SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
      SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
      TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
      TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
      TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
      TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
      OpenElementStack = class {
        get currentTmplContentOrNode() {
          return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
        }
        constructor(document4, treeAdapter, handler) {
          this.treeAdapter = treeAdapter;
          this.handler = handler;
          this.items = [];
          this.tagIDs = [];
          this.stackTop = -1;
          this.tmplCount = 0;
          this.currentTagId = TAG_ID.UNKNOWN;
          this.current = document4;
        }
        //Index of element
        _indexOf(element6) {
          return this.items.lastIndexOf(element6, this.stackTop);
        }
        //Update current element
        _isInTemplate() {
          return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
        }
        _updateCurrentElement() {
          this.current = this.items[this.stackTop];
          this.currentTagId = this.tagIDs[this.stackTop];
        }
        //Mutations
        push(element6, tagID) {
          this.stackTop++;
          this.items[this.stackTop] = element6;
          this.current = element6;
          this.tagIDs[this.stackTop] = tagID;
          this.currentTagId = tagID;
          if (this._isInTemplate()) {
            this.tmplCount++;
          }
          this.handler.onItemPush(element6, tagID, true);
        }
        pop() {
          const popped = this.current;
          if (this.tmplCount > 0 && this._isInTemplate()) {
            this.tmplCount--;
          }
          this.stackTop--;
          this._updateCurrentElement();
          this.handler.onItemPop(popped, true);
        }
        replace(oldElement, newElement) {
          const idx = this._indexOf(oldElement);
          this.items[idx] = newElement;
          if (idx === this.stackTop) {
            this.current = newElement;
          }
        }
        insertAfter(referenceElement, newElement, newElementID) {
          const insertionIdx = this._indexOf(referenceElement) + 1;
          this.items.splice(insertionIdx, 0, newElement);
          this.tagIDs.splice(insertionIdx, 0, newElementID);
          this.stackTop++;
          if (insertionIdx === this.stackTop) {
            this._updateCurrentElement();
          }
          if (this.current && this.currentTagId !== void 0) {
            this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
          }
        }
        popUntilTagNamePopped(tagName) {
          let targetIdx = this.stackTop + 1;
          do {
            targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
          } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
          this.shortenToLength(Math.max(targetIdx, 0));
        }
        shortenToLength(idx) {
          while (this.stackTop >= idx) {
            const popped = this.current;
            if (this.tmplCount > 0 && this._isInTemplate()) {
              this.tmplCount -= 1;
            }
            this.stackTop--;
            this._updateCurrentElement();
            this.handler.onItemPop(popped, this.stackTop < idx);
          }
        }
        popUntilElementPopped(element6) {
          const idx = this._indexOf(element6);
          this.shortenToLength(Math.max(idx, 0));
        }
        popUntilPopped(tagNames, targetNS) {
          const idx = this._indexOfTagNames(tagNames, targetNS);
          this.shortenToLength(Math.max(idx, 0));
        }
        popUntilNumberedHeaderPopped() {
          this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
        }
        popUntilTableCellPopped() {
          this.popUntilPopped(TABLE_CELLS, NS.HTML);
        }
        popAllUpToHtmlElement() {
          this.tmplCount = 0;
          this.shortenToLength(1);
        }
        _indexOfTagNames(tagNames, namespace) {
          for (let i = this.stackTop; i >= 0; i--) {
            if (tagNames.has(this.tagIDs[i]) && this.treeAdapter.getNamespaceURI(this.items[i]) === namespace) {
              return i;
            }
          }
          return -1;
        }
        clearBackTo(tagNames, targetNS) {
          const idx = this._indexOfTagNames(tagNames, targetNS);
          this.shortenToLength(idx + 1);
        }
        clearBackToTableContext() {
          this.clearBackTo(TABLE_CONTEXT, NS.HTML);
        }
        clearBackToTableBodyContext() {
          this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
        }
        clearBackToTableRowContext() {
          this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
        }
        remove(element6) {
          const idx = this._indexOf(element6);
          if (idx >= 0) {
            if (idx === this.stackTop) {
              this.pop();
            } else {
              this.items.splice(idx, 1);
              this.tagIDs.splice(idx, 1);
              this.stackTop--;
              this._updateCurrentElement();
              this.handler.onItemPop(element6, false);
            }
          }
        }
        //Search
        tryPeekProperlyNestedBodyElement() {
          return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
        }
        contains(element6) {
          return this._indexOf(element6) > -1;
        }
        getCommonAncestor(element6) {
          const elementIdx = this._indexOf(element6) - 1;
          return elementIdx >= 0 ? this.items[elementIdx] : null;
        }
        isRootHtmlElementCurrent() {
          return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
        }
        //Element in scope
        hasInDynamicScope(tagName, htmlScope) {
          for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
              case NS.HTML: {
                if (tn === tagName)
                  return true;
                if (htmlScope.has(tn))
                  return false;
                break;
              }
              case NS.SVG: {
                if (SCOPING_ELEMENTS_SVG.has(tn))
                  return false;
                break;
              }
              case NS.MATHML: {
                if (SCOPING_ELEMENTS_MATHML.has(tn))
                  return false;
                break;
              }
            }
          }
          return true;
        }
        hasInScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
        }
        hasInListItemScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
        }
        hasInButtonScope(tagName) {
          return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
        }
        hasNumberedHeaderInScope() {
          for (let i = this.stackTop; i >= 0; i--) {
            const tn = this.tagIDs[i];
            switch (this.treeAdapter.getNamespaceURI(this.items[i])) {
              case NS.HTML: {
                if (NUMBERED_HEADERS.has(tn))
                  return true;
                if (SCOPING_ELEMENTS_HTML.has(tn))
                  return false;
                break;
              }
              case NS.SVG: {
                if (SCOPING_ELEMENTS_SVG.has(tn))
                  return false;
                break;
              }
              case NS.MATHML: {
                if (SCOPING_ELEMENTS_MATHML.has(tn))
                  return false;
                break;
              }
            }
          }
          return true;
        }
        hasInTableScope(tagName) {
          for (let i = this.stackTop; i >= 0; i--) {
            if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
              continue;
            }
            switch (this.tagIDs[i]) {
              case tagName: {
                return true;
              }
              case TAG_ID.TABLE:
              case TAG_ID.HTML: {
                return false;
              }
            }
          }
          return true;
        }
        hasTableBodyContextInTableScope() {
          for (let i = this.stackTop; i >= 0; i--) {
            if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
              continue;
            }
            switch (this.tagIDs[i]) {
              case TAG_ID.TBODY:
              case TAG_ID.THEAD:
              case TAG_ID.TFOOT: {
                return true;
              }
              case TAG_ID.TABLE:
              case TAG_ID.HTML: {
                return false;
              }
            }
          }
          return true;
        }
        hasInSelectScope(tagName) {
          for (let i = this.stackTop; i >= 0; i--) {
            if (this.treeAdapter.getNamespaceURI(this.items[i]) !== NS.HTML) {
              continue;
            }
            switch (this.tagIDs[i]) {
              case tagName: {
                return true;
              }
              case TAG_ID.OPTION:
              case TAG_ID.OPTGROUP: {
                break;
              }
              default: {
                return false;
              }
            }
          }
          return true;
        }
        //Implied end tags
        generateImpliedEndTags() {
          while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
            this.pop();
          }
        }
        generateImpliedEndTagsThoroughly() {
          while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
            this.pop();
          }
        }
        generateImpliedEndTagsWithExclusion(exclusionId) {
          while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
            this.pop();
          }
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/parser/formatting-element-list.js
  var NOAH_ARK_CAPACITY, EntryType, MARKER, FormattingElementList;
  var init_formatting_element_list = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/parser/formatting-element-list.js"() {
      NOAH_ARK_CAPACITY = 3;
      (function(EntryType2) {
        EntryType2[EntryType2["Marker"] = 0] = "Marker";
        EntryType2[EntryType2["Element"] = 1] = "Element";
      })(EntryType || (EntryType = {}));
      MARKER = { type: EntryType.Marker };
      FormattingElementList = class {
        constructor(treeAdapter) {
          this.treeAdapter = treeAdapter;
          this.entries = [];
          this.bookmark = null;
        }
        //Noah Ark's condition
        //OPTIMIZATION: at first we try to find possible candidates for exclusion using
        //lightweight heuristics without thorough attributes check.
        _getNoahArkConditionCandidates(newElement, neAttrs) {
          const candidates = [];
          const neAttrsLength = neAttrs.length;
          const neTagName = this.treeAdapter.getTagName(newElement);
          const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
          for (let i = 0; i < this.entries.length; i++) {
            const entry = this.entries[i];
            if (entry.type === EntryType.Marker) {
              break;
            }
            const { element: element6 } = entry;
            if (this.treeAdapter.getTagName(element6) === neTagName && this.treeAdapter.getNamespaceURI(element6) === neNamespaceURI) {
              const elementAttrs = this.treeAdapter.getAttrList(element6);
              if (elementAttrs.length === neAttrsLength) {
                candidates.push({ idx: i, attrs: elementAttrs });
              }
            }
          }
          return candidates;
        }
        _ensureNoahArkCondition(newElement) {
          if (this.entries.length < NOAH_ARK_CAPACITY)
            return;
          const neAttrs = this.treeAdapter.getAttrList(newElement);
          const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
          if (candidates.length < NOAH_ARK_CAPACITY)
            return;
          const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
          let validCandidates = 0;
          for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i];
            if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
              validCandidates += 1;
              if (validCandidates >= NOAH_ARK_CAPACITY) {
                this.entries.splice(candidate.idx, 1);
              }
            }
          }
        }
        //Mutations
        insertMarker() {
          this.entries.unshift(MARKER);
        }
        pushElement(element6, token) {
          this._ensureNoahArkCondition(element6);
          this.entries.unshift({
            type: EntryType.Element,
            element: element6,
            token
          });
        }
        insertElementAfterBookmark(element6, token) {
          const bookmarkIdx = this.entries.indexOf(this.bookmark);
          this.entries.splice(bookmarkIdx, 0, {
            type: EntryType.Element,
            element: element6,
            token
          });
        }
        removeEntry(entry) {
          const entryIndex = this.entries.indexOf(entry);
          if (entryIndex !== -1) {
            this.entries.splice(entryIndex, 1);
          }
        }
        /**
         * Clears the list of formatting elements up to the last marker.
         *
         * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
         */
        clearToLastMarker() {
          const markerIdx = this.entries.indexOf(MARKER);
          if (markerIdx === -1) {
            this.entries.length = 0;
          } else {
            this.entries.splice(0, markerIdx + 1);
          }
        }
        //Search
        getElementEntryInScopeWithTagName(tagName) {
          const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
          return entry && entry.type === EntryType.Element ? entry : null;
        }
        getElementEntry(element6) {
          return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element6);
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/tree-adapters/default.js
  var defaultTreeAdapter;
  var init_default2 = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/tree-adapters/default.js"() {
      init_html4();
      defaultTreeAdapter = {
        //Node construction
        createDocument() {
          return {
            nodeName: "#document",
            mode: DOCUMENT_MODE.NO_QUIRKS,
            childNodes: []
          };
        },
        createDocumentFragment() {
          return {
            nodeName: "#document-fragment",
            childNodes: []
          };
        },
        createElement(tagName, namespaceURI, attrs) {
          return {
            nodeName: tagName,
            tagName,
            attrs,
            namespaceURI,
            childNodes: [],
            parentNode: null
          };
        },
        createCommentNode(data) {
          return {
            nodeName: "#comment",
            data,
            parentNode: null
          };
        },
        createTextNode(value) {
          return {
            nodeName: "#text",
            value,
            parentNode: null
          };
        },
        //Tree mutation
        appendChild(parentNode, newNode) {
          parentNode.childNodes.push(newNode);
          newNode.parentNode = parentNode;
        },
        insertBefore(parentNode, newNode, referenceNode) {
          const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
          parentNode.childNodes.splice(insertionIdx, 0, newNode);
          newNode.parentNode = parentNode;
        },
        setTemplateContent(templateElement, contentElement) {
          templateElement.content = contentElement;
        },
        getTemplateContent(templateElement) {
          return templateElement.content;
        },
        setDocumentType(document4, name, publicId, systemId) {
          const doctypeNode = document4.childNodes.find((node2) => node2.nodeName === "#documentType");
          if (doctypeNode) {
            doctypeNode.name = name;
            doctypeNode.publicId = publicId;
            doctypeNode.systemId = systemId;
          } else {
            const node2 = {
              nodeName: "#documentType",
              name,
              publicId,
              systemId,
              parentNode: null
            };
            defaultTreeAdapter.appendChild(document4, node2);
          }
        },
        setDocumentMode(document4, mode) {
          document4.mode = mode;
        },
        getDocumentMode(document4) {
          return document4.mode;
        },
        detachNode(node2) {
          if (node2.parentNode) {
            const idx = node2.parentNode.childNodes.indexOf(node2);
            node2.parentNode.childNodes.splice(idx, 1);
            node2.parentNode = null;
          }
        },
        insertText(parentNode, text9) {
          if (parentNode.childNodes.length > 0) {
            const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
            if (defaultTreeAdapter.isTextNode(prevNode)) {
              prevNode.value += text9;
              return;
            }
          }
          defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text9));
        },
        insertTextBefore(parentNode, text9, referenceNode) {
          const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
          if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
            prevNode.value += text9;
          } else {
            defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text9), referenceNode);
          }
        },
        adoptAttributes(recipient, attrs) {
          const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
          for (let j = 0; j < attrs.length; j++) {
            if (!recipientAttrsMap.has(attrs[j].name)) {
              recipient.attrs.push(attrs[j]);
            }
          }
        },
        //Tree traversing
        getFirstChild(node2) {
          return node2.childNodes[0];
        },
        getChildNodes(node2) {
          return node2.childNodes;
        },
        getParentNode(node2) {
          return node2.parentNode;
        },
        getAttrList(element6) {
          return element6.attrs;
        },
        //Node data
        getTagName(element6) {
          return element6.tagName;
        },
        getNamespaceURI(element6) {
          return element6.namespaceURI;
        },
        getTextNodeContent(textNode) {
          return textNode.value;
        },
        getCommentNodeContent(commentNode) {
          return commentNode.data;
        },
        getDocumentTypeNodeName(doctypeNode) {
          return doctypeNode.name;
        },
        getDocumentTypeNodePublicId(doctypeNode) {
          return doctypeNode.publicId;
        },
        getDocumentTypeNodeSystemId(doctypeNode) {
          return doctypeNode.systemId;
        },
        //Node types
        isTextNode(node2) {
          return node2.nodeName === "#text";
        },
        isCommentNode(node2) {
          return node2.nodeName === "#comment";
        },
        isDocumentTypeNode(node2) {
          return node2.nodeName === "#documentType";
        },
        isElementNode(node2) {
          return Object.prototype.hasOwnProperty.call(node2, "tagName");
        },
        // Source code location
        setNodeSourceCodeLocation(node2, location2) {
          node2.sourceCodeLocation = location2;
        },
        getNodeSourceCodeLocation(node2) {
          return node2.sourceCodeLocation;
        },
        updateNodeSourceCodeLocation(node2, endLocation) {
          node2.sourceCodeLocation = { ...node2.sourceCodeLocation, ...endLocation };
        }
      };
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/doctype.js
  function hasPrefix(publicId, prefixes) {
    return prefixes.some((prefix) => publicId.startsWith(prefix));
  }
  function isConforming(token) {
    return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
  }
  function getDocumentMode(token) {
    if (token.name !== VALID_DOCTYPE_NAME) {
      return DOCUMENT_MODE.QUIRKS;
    }
    const { systemId } = token;
    if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let { publicId } = token;
    if (publicId !== null) {
      publicId = publicId.toLowerCase();
      if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.QUIRKS;
      }
      prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
      if (hasPrefix(publicId, prefixes)) {
        return DOCUMENT_MODE.LIMITED_QUIRKS;
      }
    }
    return DOCUMENT_MODE.NO_QUIRKS;
  }
  var VALID_DOCTYPE_NAME, VALID_SYSTEM_ID, QUIRKS_MODE_SYSTEM_ID, QUIRKS_MODE_PUBLIC_ID_PREFIXES, QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES, QUIRKS_MODE_PUBLIC_IDS, LIMITED_QUIRKS_PUBLIC_ID_PREFIXES, LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
  var init_doctype = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/doctype.js"() {
      init_html4();
      VALID_DOCTYPE_NAME = "html";
      VALID_SYSTEM_ID = "about:legacy-compat";
      QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
      QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
        "+//silmaril//dtd html pro v0r11 19970101//",
        "-//as//dtd html 3.0 aswedit + extensions//",
        "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
        "-//ietf//dtd html 2.0 level 1//",
        "-//ietf//dtd html 2.0 level 2//",
        "-//ietf//dtd html 2.0 strict level 1//",
        "-//ietf//dtd html 2.0 strict level 2//",
        "-//ietf//dtd html 2.0 strict//",
        "-//ietf//dtd html 2.0//",
        "-//ietf//dtd html 2.1e//",
        "-//ietf//dtd html 3.0//",
        "-//ietf//dtd html 3.2 final//",
        "-//ietf//dtd html 3.2//",
        "-//ietf//dtd html 3//",
        "-//ietf//dtd html level 0//",
        "-//ietf//dtd html level 1//",
        "-//ietf//dtd html level 2//",
        "-//ietf//dtd html level 3//",
        "-//ietf//dtd html strict level 0//",
        "-//ietf//dtd html strict level 1//",
        "-//ietf//dtd html strict level 2//",
        "-//ietf//dtd html strict level 3//",
        "-//ietf//dtd html strict//",
        "-//ietf//dtd html//",
        "-//metrius//dtd metrius presentational//",
        "-//microsoft//dtd internet explorer 2.0 html strict//",
        "-//microsoft//dtd internet explorer 2.0 html//",
        "-//microsoft//dtd internet explorer 2.0 tables//",
        "-//microsoft//dtd internet explorer 3.0 html strict//",
        "-//microsoft//dtd internet explorer 3.0 html//",
        "-//microsoft//dtd internet explorer 3.0 tables//",
        "-//netscape comm. corp.//dtd html//",
        "-//netscape comm. corp.//dtd strict html//",
        "-//o'reilly and associates//dtd html 2.0//",
        "-//o'reilly and associates//dtd html extended 1.0//",
        "-//o'reilly and associates//dtd html extended relaxed 1.0//",
        "-//sq//dtd html 2.0 hotmetal + extensions//",
        "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
        "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
        "-//spyglass//dtd html 2.0 extended//",
        "-//sun microsystems corp.//dtd hotjava html//",
        "-//sun microsystems corp.//dtd hotjava strict html//",
        "-//w3c//dtd html 3 1995-03-24//",
        "-//w3c//dtd html 3.2 draft//",
        "-//w3c//dtd html 3.2 final//",
        "-//w3c//dtd html 3.2//",
        "-//w3c//dtd html 3.2s draft//",
        "-//w3c//dtd html 4.0 frameset//",
        "-//w3c//dtd html 4.0 transitional//",
        "-//w3c//dtd html experimental 19960712//",
        "-//w3c//dtd html experimental 970421//",
        "-//w3c//dtd w3 html//",
        "-//w3o//dtd w3 html 3.0//",
        "-//webtechs//dtd mozilla html 2.0//",
        "-//webtechs//dtd mozilla html//"
      ];
      QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
        ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//"
      ];
      QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
        "-//w3o//dtd w3 html strict 3.0//en//",
        "-/w3c/dtd html 4.0 transitional/en",
        "html"
      ]);
      LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
      LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
        ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
        "-//w3c//dtd html 4.01 frameset//",
        "-//w3c//dtd html 4.01 transitional//"
      ];
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/common/foreign-content.js
  function causesExit(startTagToken) {
    const tn = startTagToken.tagID;
    const isFontWithAttrs = tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
    return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
  }
  function adjustTokenMathMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      if (token.attrs[i].name === DEFINITION_URL_ATTR) {
        token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
        break;
      }
    }
  }
  function adjustTokenSVGAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
      if (adjustedAttrName != null) {
        token.attrs[i].name = adjustedAttrName;
      }
    }
  }
  function adjustTokenXMLAttrs(token) {
    for (let i = 0; i < token.attrs.length; i++) {
      const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i].name);
      if (adjustedAttrEntry) {
        token.attrs[i].prefix = adjustedAttrEntry.prefix;
        token.attrs[i].name = adjustedAttrEntry.name;
        token.attrs[i].namespace = adjustedAttrEntry.namespace;
      }
    }
  }
  function adjustTokenSVGTagName(token) {
    const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
    if (adjustedTagName != null) {
      token.tagName = adjustedTagName;
      token.tagID = getTagID(token.tagName);
    }
  }
  function isMathMLTextIntegrationPoint(tn, ns) {
    return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
  }
  function isHtmlIntegrationPoint(tn, ns, attrs) {
    if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
      for (let i = 0; i < attrs.length; i++) {
        if (attrs[i].name === ATTRS.ENCODING) {
          const value = attrs[i].value.toLowerCase();
          return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
        }
      }
    }
    return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
  }
  function isIntegrationPoint(tn, ns, attrs, foreignNS) {
    return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
  }
  var MIME_TYPES, DEFINITION_URL_ATTR, ADJUSTED_DEFINITION_URL_ATTR, SVG_ATTRS_ADJUSTMENT_MAP, XML_ATTRS_ADJUSTMENT_MAP, SVG_TAG_NAMES_ADJUSTMENT_MAP, EXITS_FOREIGN_CONTENT;
  var init_foreign_content = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/common/foreign-content.js"() {
      init_html4();
      MIME_TYPES = {
        TEXT_HTML: "text/html",
        APPLICATION_XML: "application/xhtml+xml"
      };
      DEFINITION_URL_ATTR = "definitionurl";
      ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
      SVG_ATTRS_ADJUSTMENT_MAP = new Map([
        "attributeName",
        "attributeType",
        "baseFrequency",
        "baseProfile",
        "calcMode",
        "clipPathUnits",
        "diffuseConstant",
        "edgeMode",
        "filterUnits",
        "glyphRef",
        "gradientTransform",
        "gradientUnits",
        "kernelMatrix",
        "kernelUnitLength",
        "keyPoints",
        "keySplines",
        "keyTimes",
        "lengthAdjust",
        "limitingConeAngle",
        "markerHeight",
        "markerUnits",
        "markerWidth",
        "maskContentUnits",
        "maskUnits",
        "numOctaves",
        "pathLength",
        "patternContentUnits",
        "patternTransform",
        "patternUnits",
        "pointsAtX",
        "pointsAtY",
        "pointsAtZ",
        "preserveAlpha",
        "preserveAspectRatio",
        "primitiveUnits",
        "refX",
        "refY",
        "repeatCount",
        "repeatDur",
        "requiredExtensions",
        "requiredFeatures",
        "specularConstant",
        "specularExponent",
        "spreadMethod",
        "startOffset",
        "stdDeviation",
        "stitchTiles",
        "surfaceScale",
        "systemLanguage",
        "tableValues",
        "targetX",
        "targetY",
        "textLength",
        "viewBox",
        "viewTarget",
        "xChannelSelector",
        "yChannelSelector",
        "zoomAndPan"
      ].map((attr) => [attr.toLowerCase(), attr]));
      XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
        ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
        ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
        ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
        ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
        ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
        ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
        ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
        ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
        ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
        ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
        ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
      ]);
      SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
        "altGlyph",
        "altGlyphDef",
        "altGlyphItem",
        "animateColor",
        "animateMotion",
        "animateTransform",
        "clipPath",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "foreignObject",
        "glyphRef",
        "linearGradient",
        "radialGradient",
        "textPath"
      ].map((tn) => [tn.toLowerCase(), tn]));
      EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
        TAG_ID.B,
        TAG_ID.BIG,
        TAG_ID.BLOCKQUOTE,
        TAG_ID.BODY,
        TAG_ID.BR,
        TAG_ID.CENTER,
        TAG_ID.CODE,
        TAG_ID.DD,
        TAG_ID.DIV,
        TAG_ID.DL,
        TAG_ID.DT,
        TAG_ID.EM,
        TAG_ID.EMBED,
        TAG_ID.H1,
        TAG_ID.H2,
        TAG_ID.H3,
        TAG_ID.H4,
        TAG_ID.H5,
        TAG_ID.H6,
        TAG_ID.HEAD,
        TAG_ID.HR,
        TAG_ID.I,
        TAG_ID.IMG,
        TAG_ID.LI,
        TAG_ID.LISTING,
        TAG_ID.MENU,
        TAG_ID.META,
        TAG_ID.NOBR,
        TAG_ID.OL,
        TAG_ID.P,
        TAG_ID.PRE,
        TAG_ID.RUBY,
        TAG_ID.S,
        TAG_ID.SMALL,
        TAG_ID.SPAN,
        TAG_ID.STRONG,
        TAG_ID.STRIKE,
        TAG_ID.SUB,
        TAG_ID.SUP,
        TAG_ID.TABLE,
        TAG_ID.TT,
        TAG_ID.U,
        TAG_ID.UL,
        TAG_ID.VAR
      ]);
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/parser/index.js
  function aaObtainFormattingElementEntry(p2, token) {
    let formattingElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
    if (formattingElementEntry) {
      if (!p2.openElements.contains(formattingElementEntry.element)) {
        p2.activeFormattingElements.removeEntry(formattingElementEntry);
        formattingElementEntry = null;
      } else if (!p2.openElements.hasInScope(token.tagID)) {
        formattingElementEntry = null;
      }
    } else {
      genericEndTagInBody(p2, token);
    }
    return formattingElementEntry;
  }
  function aaObtainFurthestBlock(p2, formattingElementEntry) {
    let furthestBlock = null;
    let idx = p2.openElements.stackTop;
    for (; idx >= 0; idx--) {
      const element6 = p2.openElements.items[idx];
      if (element6 === formattingElementEntry.element) {
        break;
      }
      if (p2._isSpecialElement(element6, p2.openElements.tagIDs[idx])) {
        furthestBlock = element6;
      }
    }
    if (!furthestBlock) {
      p2.openElements.shortenToLength(Math.max(idx, 0));
      p2.activeFormattingElements.removeEntry(formattingElementEntry);
    }
    return furthestBlock;
  }
  function aaInnerLoop(p2, furthestBlock, formattingElement) {
    let lastElement = furthestBlock;
    let nextElement = p2.openElements.getCommonAncestor(furthestBlock);
    for (let i = 0, element6 = nextElement; element6 !== formattingElement; i++, element6 = nextElement) {
      nextElement = p2.openElements.getCommonAncestor(element6);
      const elementEntry = p2.activeFormattingElements.getElementEntry(element6);
      const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
      const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
      if (shouldRemoveFromOpenElements) {
        if (counterOverflow) {
          p2.activeFormattingElements.removeEntry(elementEntry);
        }
        p2.openElements.remove(element6);
      } else {
        element6 = aaRecreateElementFromEntry(p2, elementEntry);
        if (lastElement === furthestBlock) {
          p2.activeFormattingElements.bookmark = elementEntry;
        }
        p2.treeAdapter.detachNode(lastElement);
        p2.treeAdapter.appendChild(element6, lastElement);
        lastElement = element6;
      }
    }
    return lastElement;
  }
  function aaRecreateElementFromEntry(p2, elementEntry) {
    const ns = p2.treeAdapter.getNamespaceURI(elementEntry.element);
    const newElement = p2.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
    p2.openElements.replace(elementEntry.element, newElement);
    elementEntry.element = newElement;
    return newElement;
  }
  function aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement) {
    const tn = p2.treeAdapter.getTagName(commonAncestor);
    const tid = getTagID(tn);
    if (p2._isElementCausesFosterParenting(tid)) {
      p2._fosterParentElement(lastElement);
    } else {
      const ns = p2.treeAdapter.getNamespaceURI(commonAncestor);
      if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
        commonAncestor = p2.treeAdapter.getTemplateContent(commonAncestor);
      }
      p2.treeAdapter.appendChild(commonAncestor, lastElement);
    }
  }
  function aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry) {
    const ns = p2.treeAdapter.getNamespaceURI(formattingElementEntry.element);
    const { token } = formattingElementEntry;
    const newElement = p2.treeAdapter.createElement(token.tagName, ns, token.attrs);
    p2._adoptNodes(furthestBlock, newElement);
    p2.treeAdapter.appendChild(furthestBlock, newElement);
    p2.activeFormattingElements.insertElementAfterBookmark(newElement, token);
    p2.activeFormattingElements.removeEntry(formattingElementEntry);
    p2.openElements.remove(formattingElementEntry.element);
    p2.openElements.insertAfter(furthestBlock, newElement, token.tagID);
  }
  function callAdoptionAgency(p2, token) {
    for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
      const formattingElementEntry = aaObtainFormattingElementEntry(p2, token);
      if (!formattingElementEntry) {
        break;
      }
      const furthestBlock = aaObtainFurthestBlock(p2, formattingElementEntry);
      if (!furthestBlock) {
        break;
      }
      p2.activeFormattingElements.bookmark = formattingElementEntry;
      const lastElement = aaInnerLoop(p2, furthestBlock, formattingElementEntry.element);
      const commonAncestor = p2.openElements.getCommonAncestor(formattingElementEntry.element);
      p2.treeAdapter.detachNode(lastElement);
      if (commonAncestor)
        aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement);
      aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry);
    }
  }
  function appendComment(p2, token) {
    p2._appendCommentNode(token, p2.openElements.currentTmplContentOrNode);
  }
  function appendCommentToRootHtmlElement(p2, token) {
    p2._appendCommentNode(token, p2.openElements.items[0]);
  }
  function appendCommentToDocument(p2, token) {
    p2._appendCommentNode(token, p2.document);
  }
  function stopParsing(p2, token) {
    p2.stopped = true;
    if (token.location) {
      const target = p2.fragmentContext ? 0 : 2;
      for (let i = p2.openElements.stackTop; i >= target; i--) {
        p2._setEndLocation(p2.openElements.items[i], token);
      }
      if (!p2.fragmentContext && p2.openElements.stackTop >= 0) {
        const htmlElement = p2.openElements.items[0];
        const htmlLocation = p2.treeAdapter.getNodeSourceCodeLocation(htmlElement);
        if (htmlLocation && !htmlLocation.endTag) {
          p2._setEndLocation(htmlElement, token);
          if (p2.openElements.stackTop >= 1) {
            const bodyElement = p2.openElements.items[1];
            const bodyLocation = p2.treeAdapter.getNodeSourceCodeLocation(bodyElement);
            if (bodyLocation && !bodyLocation.endTag) {
              p2._setEndLocation(bodyElement, token);
            }
          }
        }
      }
    }
  }
  function doctypeInInitialMode(p2, token) {
    p2._setDocumentType(token);
    const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
    if (!isConforming(token)) {
      p2._err(token, ERR.nonConformingDoctype);
    }
    p2.treeAdapter.setDocumentMode(p2.document, mode);
    p2.insertionMode = InsertionMode.BEFORE_HTML;
  }
  function tokenInInitialMode(p2, token) {
    p2._err(token, ERR.missingDoctype, true);
    p2.treeAdapter.setDocumentMode(p2.document, DOCUMENT_MODE.QUIRKS);
    p2.insertionMode = InsertionMode.BEFORE_HTML;
    p2._processToken(token);
  }
  function startTagBeforeHtml(p2, token) {
    if (token.tagID === TAG_ID.HTML) {
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = InsertionMode.BEFORE_HEAD;
    } else {
      tokenBeforeHtml(p2, token);
    }
  }
  function endTagBeforeHtml(p2, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
      tokenBeforeHtml(p2, token);
    }
  }
  function tokenBeforeHtml(p2, token) {
    p2._insertFakeRootElement();
    p2.insertionMode = InsertionMode.BEFORE_HEAD;
    p2._processToken(token);
  }
  function startTagBeforeHead(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.HEAD: {
        p2._insertElement(token, NS.HTML);
        p2.headElement = p2.openElements.current;
        p2.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      default: {
        tokenBeforeHead(p2, token);
      }
    }
  }
  function endTagBeforeHead(p2, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
      tokenBeforeHead(p2, token);
    } else {
      p2._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenBeforeHead(p2, token) {
    p2._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
    p2.headElement = p2.openElements.current;
    p2.insertionMode = InsertionMode.IN_HEAD;
    p2._processToken(token);
  }
  function startTagInHead(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META: {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TITLE: {
        p2._switchToTextParsing(token, TokenizerMode.RCDATA);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p2.options.scriptingEnabled) {
          p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        } else {
          p2._insertElement(token, NS.HTML);
          p2.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
        }
        break;
      }
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
        break;
      }
      case TAG_ID.SCRIPT: {
        p2._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
        break;
      }
      case TAG_ID.TEMPLATE: {
        p2._insertTemplate(token);
        p2.activeFormattingElements.insertMarker();
        p2.framesetOk = false;
        p2.insertionMode = InsertionMode.IN_TEMPLATE;
        p2.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
        break;
      }
      case TAG_ID.HEAD: {
        p2._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenInHead(p2, token);
      }
    }
  }
  function endTagInHead(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HEAD: {
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.AFTER_HEAD;
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.BR:
      case TAG_ID.HTML: {
        tokenInHead(p2, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      default: {
        p2._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function templateEndTagInHead(p2, token) {
    if (p2.openElements.tmplCount > 0) {
      p2.openElements.generateImpliedEndTagsThoroughly();
      if (p2.openElements.currentTagId !== TAG_ID.TEMPLATE) {
        p2._err(token, ERR.closingOfElementWithOpenChildElements);
      }
      p2.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p2.activeFormattingElements.clearToLastMarker();
      p2.tmplInsertionModeStack.shift();
      p2._resetInsertionMode();
    } else {
      p2._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
  function tokenInHead(p2, token) {
    p2.openElements.pop();
    p2.insertionMode = InsertionMode.AFTER_HEAD;
    p2._processToken(token);
  }
  function startTagInHeadNoScript(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.HEAD:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.STYLE: {
        startTagInHead(p2, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        p2._err(token, ERR.nestedNoscriptInHead);
        break;
      }
      default: {
        tokenInHeadNoScript(p2, token);
      }
    }
  }
  function endTagInHeadNoScript(p2, token) {
    switch (token.tagID) {
      case TAG_ID.NOSCRIPT: {
        p2.openElements.pop();
        p2.insertionMode = InsertionMode.IN_HEAD;
        break;
      }
      case TAG_ID.BR: {
        tokenInHeadNoScript(p2, token);
        break;
      }
      default: {
        p2._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenInHeadNoScript(p2, token) {
    const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
    p2._err(token, errCode);
    p2.openElements.pop();
    p2.insertionMode = InsertionMode.IN_HEAD;
    p2._processToken(token);
  }
  function startTagAfterHead(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.BODY: {
        p2._insertElement(token, NS.HTML);
        p2.framesetOk = false;
        p2.insertionMode = InsertionMode.IN_BODY;
        break;
      }
      case TAG_ID.FRAMESET: {
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = InsertionMode.IN_FRAMESET;
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        p2._err(token, ERR.abandonedHeadElementChild);
        p2.openElements.push(p2.headElement, TAG_ID.HEAD);
        startTagInHead(p2, token);
        p2.openElements.remove(p2.headElement);
        break;
      }
      case TAG_ID.HEAD: {
        p2._err(token, ERR.misplacedStartTagForHeadElement);
        break;
      }
      default: {
        tokenAfterHead(p2, token);
      }
    }
  }
  function endTagAfterHead(p2, token) {
    switch (token.tagID) {
      case TAG_ID.BODY:
      case TAG_ID.HTML:
      case TAG_ID.BR: {
        tokenAfterHead(p2, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      default: {
        p2._err(token, ERR.endTagWithoutMatchingOpenElement);
      }
    }
  }
  function tokenAfterHead(p2, token) {
    p2._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
    p2.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p2, token);
  }
  function modeInBody(p2, token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInBody(p2, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInBody(p2, token);
        break;
      }
      case TokenType.COMMENT: {
        appendComment(p2, token);
        break;
      }
      case TokenType.START_TAG: {
        startTagInBody(p2, token);
        break;
      }
      case TokenType.END_TAG: {
        endTagInBody(p2, token);
        break;
      }
      case TokenType.EOF: {
        eofInBody(p2, token);
        break;
      }
      default:
    }
  }
  function whitespaceCharacterInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertCharacters(token);
  }
  function characterInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertCharacters(token);
    p2.framesetOk = false;
  }
  function htmlStartTagInBody(p2, token) {
    if (p2.openElements.tmplCount === 0) {
      p2.treeAdapter.adoptAttributes(p2.openElements.items[0], token.attrs);
    }
  }
  function bodyStartTagInBody(p2, token) {
    const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
    if (bodyElement && p2.openElements.tmplCount === 0) {
      p2.framesetOk = false;
      p2.treeAdapter.adoptAttributes(bodyElement, token.attrs);
    }
  }
  function framesetStartTagInBody(p2, token) {
    const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
    if (p2.framesetOk && bodyElement) {
      p2.treeAdapter.detachNode(bodyElement);
      p2.openElements.popAllUpToHtmlElement();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = InsertionMode.IN_FRAMESET;
    }
  }
  function addressStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
  }
  function numberedHeaderStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    if (p2.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p2.openElements.currentTagId)) {
      p2.openElements.pop();
    }
    p2._insertElement(token, NS.HTML);
  }
  function preStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
    p2.skipNextNewLine = true;
    p2.framesetOk = false;
  }
  function formStartTagInBody(p2, token) {
    const inTemplate = p2.openElements.tmplCount > 0;
    if (!p2.formElement || inTemplate) {
      if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
      if (!inTemplate) {
        p2.formElement = p2.openElements.current;
      }
    }
  }
  function listItemStartTagInBody(p2, token) {
    p2.framesetOk = false;
    const tn = token.tagID;
    for (let i = p2.openElements.stackTop; i >= 0; i--) {
      const elementId = p2.openElements.tagIDs[i];
      if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
        p2.openElements.generateImpliedEndTagsWithExclusion(elementId);
        p2.openElements.popUntilTagNamePopped(elementId);
        break;
      }
      if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p2._isSpecialElement(p2.openElements.items[i], elementId)) {
        break;
      }
    }
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
  }
  function plaintextStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
    p2.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  function buttonStartTagInBody(p2, token) {
    if (p2.openElements.hasInScope(TAG_ID.BUTTON)) {
      p2.openElements.generateImpliedEndTags();
      p2.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
    }
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
    p2.framesetOk = false;
  }
  function aStartTagInBody(p2, token) {
    const activeElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
    if (activeElementEntry) {
      callAdoptionAgency(p2, token);
      p2.openElements.remove(activeElementEntry.element);
      p2.activeFormattingElements.removeEntry(activeElementEntry);
    }
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
    p2.activeFormattingElements.pushElement(p2.openElements.current, token);
  }
  function bStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
    p2.activeFormattingElements.pushElement(p2.openElements.current, token);
  }
  function nobrStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    if (p2.openElements.hasInScope(TAG_ID.NOBR)) {
      callAdoptionAgency(p2, token);
      p2._reconstructActiveFormattingElements();
    }
    p2._insertElement(token, NS.HTML);
    p2.activeFormattingElements.pushElement(p2.openElements.current, token);
  }
  function appletStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
    p2.activeFormattingElements.insertMarker();
    p2.framesetOk = false;
  }
  function tableStartTagInBody(p2, token) {
    if (p2.treeAdapter.getDocumentMode(p2.document) !== DOCUMENT_MODE.QUIRKS && p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._insertElement(token, NS.HTML);
    p2.framesetOk = false;
    p2.insertionMode = InsertionMode.IN_TABLE;
  }
  function areaStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._appendElement(token, NS.HTML);
    p2.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function isHiddenInput(token) {
    const inputType = getTokenAttr(token, ATTRS.TYPE);
    return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
  }
  function inputStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._appendElement(token, NS.HTML);
    if (!isHiddenInput(token)) {
      p2.framesetOk = false;
    }
    token.ackSelfClosing = true;
  }
  function paramStartTagInBody(p2, token) {
    p2._appendElement(token, NS.HTML);
    token.ackSelfClosing = true;
  }
  function hrStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._appendElement(token, NS.HTML);
    p2.framesetOk = false;
    token.ackSelfClosing = true;
  }
  function imageStartTagInBody(p2, token) {
    token.tagName = TAG_NAMES.IMG;
    token.tagID = TAG_ID.IMG;
    areaStartTagInBody(p2, token);
  }
  function textareaStartTagInBody(p2, token) {
    p2._insertElement(token, NS.HTML);
    p2.skipNextNewLine = true;
    p2.tokenizer.state = TokenizerMode.RCDATA;
    p2.originalInsertionMode = p2.insertionMode;
    p2.framesetOk = false;
    p2.insertionMode = InsertionMode.TEXT;
  }
  function xmpStartTagInBody(p2, token) {
    if (p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._closePElement();
    }
    p2._reconstructActiveFormattingElements();
    p2.framesetOk = false;
    p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function iframeStartTagInBody(p2, token) {
    p2.framesetOk = false;
    p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function rawTextStartTagInBody(p2, token) {
    p2._switchToTextParsing(token, TokenizerMode.RAWTEXT);
  }
  function selectStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
    p2.framesetOk = false;
    p2.insertionMode = p2.insertionMode === InsertionMode.IN_TABLE || p2.insertionMode === InsertionMode.IN_CAPTION || p2.insertionMode === InsertionMode.IN_TABLE_BODY || p2.insertionMode === InsertionMode.IN_ROW || p2.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
  }
  function optgroupStartTagInBody(p2, token) {
    if (p2.openElements.currentTagId === TAG_ID.OPTION) {
      p2.openElements.pop();
    }
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
  }
  function rbStartTagInBody(p2, token) {
    if (p2.openElements.hasInScope(TAG_ID.RUBY)) {
      p2.openElements.generateImpliedEndTags();
    }
    p2._insertElement(token, NS.HTML);
  }
  function rtStartTagInBody(p2, token) {
    if (p2.openElements.hasInScope(TAG_ID.RUBY)) {
      p2.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
    }
    p2._insertElement(token, NS.HTML);
  }
  function mathStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    adjustTokenMathMLAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p2._appendElement(token, NS.MATHML);
    } else {
      p2._insertElement(token, NS.MATHML);
    }
    token.ackSelfClosing = true;
  }
  function svgStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    adjustTokenSVGAttrs(token);
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p2._appendElement(token, NS.SVG);
    } else {
      p2._insertElement(token, NS.SVG);
    }
    token.ackSelfClosing = true;
  }
  function genericStartTagInBody(p2, token) {
    p2._reconstructActiveFormattingElements();
    p2._insertElement(token, NS.HTML);
  }
  function startTagInBody(p2, token) {
    switch (token.tagID) {
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.B:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        bStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.A: {
        aStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.P:
      case TAG_ID.DL:
      case TAG_ID.OL:
      case TAG_ID.UL:
      case TAG_ID.DIV:
      case TAG_ID.DIR:
      case TAG_ID.NAV:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.DETAILS:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.LI:
      case TAG_ID.DD:
      case TAG_ID.DT: {
        listItemStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.BR:
      case TAG_ID.IMG:
      case TAG_ID.WBR:
      case TAG_ID.AREA:
      case TAG_ID.EMBED:
      case TAG_ID.KEYGEN: {
        areaStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.HR: {
        hrStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.RB:
      case TAG_ID.RTC: {
        rbStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.RT:
      case TAG_ID.RP: {
        rtStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.PRE:
      case TAG_ID.LISTING: {
        preStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.XMP: {
        xmpStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.SVG: {
        svgStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.BASE:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.STYLE:
      case TAG_ID.TITLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.BGSOUND:
      case TAG_ID.BASEFONT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p2, token);
        break;
      }
      case TAG_ID.BODY: {
        bodyStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.NOBR: {
        nobrStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.MATH: {
        mathStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.PARAM:
      case TAG_ID.TRACK:
      case TAG_ID.SOURCE: {
        paramStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.IMAGE: {
        imageStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.BUTTON: {
        buttonStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.IFRAME: {
        iframeStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.SELECT: {
        selectStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.OPTION:
      case TAG_ID.OPTGROUP: {
        optgroupStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES: {
        rawTextStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        framesetStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.TEXTAREA: {
        textareaStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.NOSCRIPT: {
        if (p2.options.scriptingEnabled) {
          rawTextStartTagInBody(p2, token);
        } else {
          genericStartTagInBody(p2, token);
        }
        break;
      }
      case TAG_ID.PLAINTEXT: {
        plaintextStartTagInBody(p2, token);
        break;
      }
      case TAG_ID.COL:
      case TAG_ID.TH:
      case TAG_ID.TD:
      case TAG_ID.TR:
      case TAG_ID.HEAD:
      case TAG_ID.FRAME:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP: {
        break;
      }
      default: {
        genericStartTagInBody(p2, token);
      }
    }
  }
  function bodyEndTagInBody(p2, token) {
    if (p2.openElements.hasInScope(TAG_ID.BODY)) {
      p2.insertionMode = InsertionMode.AFTER_BODY;
      if (p2.options.sourceCodeLocationInfo) {
        const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
        if (bodyElement) {
          p2._setEndLocation(bodyElement, token);
        }
      }
    }
  }
  function htmlEndTagInBody(p2, token) {
    if (p2.openElements.hasInScope(TAG_ID.BODY)) {
      p2.insertionMode = InsertionMode.AFTER_BODY;
      endTagAfterBody(p2, token);
    }
  }
  function addressEndTagInBody(p2, token) {
    const tn = token.tagID;
    if (p2.openElements.hasInScope(tn)) {
      p2.openElements.generateImpliedEndTags();
      p2.openElements.popUntilTagNamePopped(tn);
    }
  }
  function formEndTagInBody(p2) {
    const inTemplate = p2.openElements.tmplCount > 0;
    const { formElement } = p2;
    if (!inTemplate) {
      p2.formElement = null;
    }
    if ((formElement || inTemplate) && p2.openElements.hasInScope(TAG_ID.FORM)) {
      p2.openElements.generateImpliedEndTags();
      if (inTemplate) {
        p2.openElements.popUntilTagNamePopped(TAG_ID.FORM);
      } else if (formElement) {
        p2.openElements.remove(formElement);
      }
    }
  }
  function pEndTagInBody(p2) {
    if (!p2.openElements.hasInButtonScope(TAG_ID.P)) {
      p2._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
    }
    p2._closePElement();
  }
  function liEndTagInBody(p2) {
    if (p2.openElements.hasInListItemScope(TAG_ID.LI)) {
      p2.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
      p2.openElements.popUntilTagNamePopped(TAG_ID.LI);
    }
  }
  function ddEndTagInBody(p2, token) {
    const tn = token.tagID;
    if (p2.openElements.hasInScope(tn)) {
      p2.openElements.generateImpliedEndTagsWithExclusion(tn);
      p2.openElements.popUntilTagNamePopped(tn);
    }
  }
  function numberedHeaderEndTagInBody(p2) {
    if (p2.openElements.hasNumberedHeaderInScope()) {
      p2.openElements.generateImpliedEndTags();
      p2.openElements.popUntilNumberedHeaderPopped();
    }
  }
  function appletEndTagInBody(p2, token) {
    const tn = token.tagID;
    if (p2.openElements.hasInScope(tn)) {
      p2.openElements.generateImpliedEndTags();
      p2.openElements.popUntilTagNamePopped(tn);
      p2.activeFormattingElements.clearToLastMarker();
    }
  }
  function brEndTagInBody(p2) {
    p2._reconstructActiveFormattingElements();
    p2._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
    p2.openElements.pop();
    p2.framesetOk = false;
  }
  function genericEndTagInBody(p2, token) {
    const tn = token.tagName;
    const tid = token.tagID;
    for (let i = p2.openElements.stackTop; i > 0; i--) {
      const element6 = p2.openElements.items[i];
      const elementId = p2.openElements.tagIDs[i];
      if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p2.treeAdapter.getTagName(element6) === tn)) {
        p2.openElements.generateImpliedEndTagsWithExclusion(tid);
        if (p2.openElements.stackTop >= i)
          p2.openElements.shortenToLength(i);
        break;
      }
      if (p2._isSpecialElement(element6, elementId)) {
        break;
      }
    }
  }
  function endTagInBody(p2, token) {
    switch (token.tagID) {
      case TAG_ID.A:
      case TAG_ID.B:
      case TAG_ID.I:
      case TAG_ID.S:
      case TAG_ID.U:
      case TAG_ID.EM:
      case TAG_ID.TT:
      case TAG_ID.BIG:
      case TAG_ID.CODE:
      case TAG_ID.FONT:
      case TAG_ID.NOBR:
      case TAG_ID.SMALL:
      case TAG_ID.STRIKE:
      case TAG_ID.STRONG: {
        callAdoptionAgency(p2, token);
        break;
      }
      case TAG_ID.P: {
        pEndTagInBody(p2);
        break;
      }
      case TAG_ID.DL:
      case TAG_ID.UL:
      case TAG_ID.OL:
      case TAG_ID.DIR:
      case TAG_ID.DIV:
      case TAG_ID.NAV:
      case TAG_ID.PRE:
      case TAG_ID.MAIN:
      case TAG_ID.MENU:
      case TAG_ID.ASIDE:
      case TAG_ID.BUTTON:
      case TAG_ID.CENTER:
      case TAG_ID.FIGURE:
      case TAG_ID.FOOTER:
      case TAG_ID.HEADER:
      case TAG_ID.HGROUP:
      case TAG_ID.DIALOG:
      case TAG_ID.ADDRESS:
      case TAG_ID.ARTICLE:
      case TAG_ID.DETAILS:
      case TAG_ID.SEARCH:
      case TAG_ID.SECTION:
      case TAG_ID.SUMMARY:
      case TAG_ID.LISTING:
      case TAG_ID.FIELDSET:
      case TAG_ID.BLOCKQUOTE:
      case TAG_ID.FIGCAPTION: {
        addressEndTagInBody(p2, token);
        break;
      }
      case TAG_ID.LI: {
        liEndTagInBody(p2);
        break;
      }
      case TAG_ID.DD:
      case TAG_ID.DT: {
        ddEndTagInBody(p2, token);
        break;
      }
      case TAG_ID.H1:
      case TAG_ID.H2:
      case TAG_ID.H3:
      case TAG_ID.H4:
      case TAG_ID.H5:
      case TAG_ID.H6: {
        numberedHeaderEndTagInBody(p2);
        break;
      }
      case TAG_ID.BR: {
        brEndTagInBody(p2);
        break;
      }
      case TAG_ID.BODY: {
        bodyEndTagInBody(p2, token);
        break;
      }
      case TAG_ID.HTML: {
        htmlEndTagInBody(p2, token);
        break;
      }
      case TAG_ID.FORM: {
        formEndTagInBody(p2);
        break;
      }
      case TAG_ID.APPLET:
      case TAG_ID.OBJECT:
      case TAG_ID.MARQUEE: {
        appletEndTagInBody(p2, token);
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      default: {
        genericEndTagInBody(p2, token);
      }
    }
  }
  function eofInBody(p2, token) {
    if (p2.tmplInsertionModeStack.length > 0) {
      eofInTemplate(p2, token);
    } else {
      stopParsing(p2, token);
    }
  }
  function endTagInText(p2, token) {
    var _a2;
    if (token.tagID === TAG_ID.SCRIPT) {
      (_a2 = p2.scriptHandler) === null || _a2 === void 0 ? void 0 : _a2.call(p2, p2.openElements.current);
    }
    p2.openElements.pop();
    p2.insertionMode = p2.originalInsertionMode;
  }
  function eofInText(p2, token) {
    p2._err(token, ERR.eofInElementThatCanContainOnlyText);
    p2.openElements.pop();
    p2.insertionMode = p2.originalInsertionMode;
    p2.onEof(token);
  }
  function characterInTable(p2, token) {
    if (p2.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p2.openElements.currentTagId)) {
      p2.pendingCharacterTokens.length = 0;
      p2.hasNonWhitespacePendingCharacterToken = false;
      p2.originalInsertionMode = p2.insertionMode;
      p2.insertionMode = InsertionMode.IN_TABLE_TEXT;
      switch (token.type) {
        case TokenType.CHARACTER: {
          characterInTableText(p2, token);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          whitespaceCharacterInTableText(p2, token);
          break;
        }
      }
    } else {
      tokenInTable(p2, token);
    }
  }
  function captionStartTagInTable(p2, token) {
    p2.openElements.clearBackToTableContext();
    p2.activeFormattingElements.insertMarker();
    p2._insertElement(token, NS.HTML);
    p2.insertionMode = InsertionMode.IN_CAPTION;
  }
  function colgroupStartTagInTable(p2, token) {
    p2.openElements.clearBackToTableContext();
    p2._insertElement(token, NS.HTML);
    p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  }
  function colStartTagInTable(p2, token) {
    p2.openElements.clearBackToTableContext();
    p2._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
    p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
    startTagInColumnGroup(p2, token);
  }
  function tbodyStartTagInTable(p2, token) {
    p2.openElements.clearBackToTableContext();
    p2._insertElement(token, NS.HTML);
    p2.insertionMode = InsertionMode.IN_TABLE_BODY;
  }
  function tdStartTagInTable(p2, token) {
    p2.openElements.clearBackToTableContext();
    p2._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
    p2.insertionMode = InsertionMode.IN_TABLE_BODY;
    startTagInTableBody(p2, token);
  }
  function tableStartTagInTable(p2, token) {
    if (p2.openElements.hasInTableScope(TAG_ID.TABLE)) {
      p2.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
      p2._resetInsertionMode();
      p2._processStartTag(token);
    }
  }
  function inputStartTagInTable(p2, token) {
    if (isHiddenInput(token)) {
      p2._appendElement(token, NS.HTML);
    } else {
      tokenInTable(p2, token);
    }
    token.ackSelfClosing = true;
  }
  function formStartTagInTable(p2, token) {
    if (!p2.formElement && p2.openElements.tmplCount === 0) {
      p2._insertElement(token, NS.HTML);
      p2.formElement = p2.openElements.current;
      p2.openElements.pop();
    }
  }
  function startTagInTable(p2, token) {
    switch (token.tagID) {
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        tdStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p2, token);
        break;
      }
      case TAG_ID.COL: {
        colStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.FORM: {
        formStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.TABLE: {
        tableStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        tbodyStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.INPUT: {
        inputStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.CAPTION: {
        captionStartTagInTable(p2, token);
        break;
      }
      case TAG_ID.COLGROUP: {
        colgroupStartTagInTable(p2, token);
        break;
      }
      default: {
        tokenInTable(p2, token);
      }
    }
  }
  function endTagInTable(p2, token) {
    switch (token.tagID) {
      case TAG_ID.TABLE: {
        if (p2.openElements.hasInTableScope(TAG_ID.TABLE)) {
          p2.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
          p2._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        tokenInTable(p2, token);
      }
    }
  }
  function tokenInTable(p2, token) {
    const savedFosterParentingState = p2.fosterParentingEnabled;
    p2.fosterParentingEnabled = true;
    modeInBody(p2, token);
    p2.fosterParentingEnabled = savedFosterParentingState;
  }
  function whitespaceCharacterInTableText(p2, token) {
    p2.pendingCharacterTokens.push(token);
  }
  function characterInTableText(p2, token) {
    p2.pendingCharacterTokens.push(token);
    p2.hasNonWhitespacePendingCharacterToken = true;
  }
  function tokenInTableText(p2, token) {
    let i = 0;
    if (p2.hasNonWhitespacePendingCharacterToken) {
      for (; i < p2.pendingCharacterTokens.length; i++) {
        tokenInTable(p2, p2.pendingCharacterTokens[i]);
      }
    } else {
      for (; i < p2.pendingCharacterTokens.length; i++) {
        p2._insertCharacters(p2.pendingCharacterTokens[i]);
      }
    }
    p2.insertionMode = p2.originalInsertionMode;
    p2._processToken(token);
  }
  function startTagInCaption(p2, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p2.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p2.activeFormattingElements.clearToLastMarker();
        p2.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p2, token);
      }
    } else {
      startTagInBody(p2, token);
    }
  }
  function endTagInCaption(p2, token) {
    const tn = token.tagID;
    switch (tn) {
      case TAG_ID.CAPTION:
      case TAG_ID.TABLE: {
        if (p2.openElements.hasInTableScope(TAG_ID.CAPTION)) {
          p2.openElements.generateImpliedEndTags();
          p2.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
          p2.activeFormattingElements.clearToLastMarker();
          p2.insertionMode = InsertionMode.IN_TABLE;
          if (tn === TAG_ID.TABLE) {
            endTagInTable(p2, token);
          }
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TBODY:
      case TAG_ID.TD:
      case TAG_ID.TFOOT:
      case TAG_ID.TH:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInBody(p2, token);
      }
    }
  }
  function startTagInColumnGroup(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.COL: {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.TEMPLATE: {
        startTagInHead(p2, token);
        break;
      }
      default: {
        tokenInColumnGroup(p2, token);
      }
    }
  }
  function endTagInColumnGroup(p2, token) {
    switch (token.tagID) {
      case TAG_ID.COLGROUP: {
        if (p2.openElements.currentTagId === TAG_ID.COLGROUP) {
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      case TAG_ID.COL: {
        break;
      }
      default: {
        tokenInColumnGroup(p2, token);
      }
    }
  }
  function tokenInColumnGroup(p2, token) {
    if (p2.openElements.currentTagId === TAG_ID.COLGROUP) {
      p2.openElements.pop();
      p2.insertionMode = InsertionMode.IN_TABLE;
      p2._processToken(token);
    }
  }
  function startTagInTableBody(p2, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        p2.openElements.clearBackToTableBodyContext();
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = InsertionMode.IN_ROW;
        break;
      }
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p2.openElements.clearBackToTableBodyContext();
        p2._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
        p2.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p2, token);
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p2.openElements.hasTableBodyContextInTableScope()) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE;
          startTagInTable(p2, token);
        }
        break;
      }
      default: {
        startTagInTable(p2, token);
      }
    }
  }
  function endTagInTableBody(p2, token) {
    const tn = token.tagID;
    switch (token.tagID) {
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p2.openElements.hasInTableScope(tn)) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p2.openElements.hasTableBodyContextInTableScope()) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE;
          endTagInTable(p2, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH:
      case TAG_ID.TR: {
        break;
      }
      default: {
        endTagInTable(p2, token);
      }
    }
  }
  function startTagInRow(p2, token) {
    switch (token.tagID) {
      case TAG_ID.TH:
      case TAG_ID.TD: {
        p2.openElements.clearBackToTableRowContext();
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = InsertionMode.IN_CELL;
        p2.activeFormattingElements.insertMarker();
        break;
      }
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE_BODY;
          startTagInTableBody(p2, token);
        }
        break;
      }
      default: {
        startTagInTable(p2, token);
      }
    }
  }
  function endTagInRow(p2, token) {
    switch (token.tagID) {
      case TAG_ID.TR: {
        if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE_BODY;
        }
        break;
      }
      case TAG_ID.TABLE: {
        if (p2.openElements.hasInTableScope(TAG_ID.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p2, token);
        }
        break;
      }
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        if (p2.openElements.hasInTableScope(token.tagID) || p2.openElements.hasInTableScope(TAG_ID.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = InsertionMode.IN_TABLE_BODY;
          endTagInTableBody(p2, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML:
      case TAG_ID.TD:
      case TAG_ID.TH: {
        break;
      }
      default: {
        endTagInTable(p2, token);
      }
    }
  }
  function startTagInCell(p2, token) {
    const tn = token.tagID;
    if (TABLE_VOID_ELEMENTS.has(tn)) {
      if (p2.openElements.hasInTableScope(TAG_ID.TD) || p2.openElements.hasInTableScope(TAG_ID.TH)) {
        p2._closeTableCell();
        startTagInRow(p2, token);
      }
    } else {
      startTagInBody(p2, token);
    }
  }
  function endTagInCell(p2, token) {
    const tn = token.tagID;
    switch (tn) {
      case TAG_ID.TD:
      case TAG_ID.TH: {
        if (p2.openElements.hasInTableScope(tn)) {
          p2.openElements.generateImpliedEndTags();
          p2.openElements.popUntilTagNamePopped(tn);
          p2.activeFormattingElements.clearToLastMarker();
          p2.insertionMode = InsertionMode.IN_ROW;
        }
        break;
      }
      case TAG_ID.TABLE:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD:
      case TAG_ID.TR: {
        if (p2.openElements.hasInTableScope(tn)) {
          p2._closeTableCell();
          endTagInRow(p2, token);
        }
        break;
      }
      case TAG_ID.BODY:
      case TAG_ID.CAPTION:
      case TAG_ID.COL:
      case TAG_ID.COLGROUP:
      case TAG_ID.HTML: {
        break;
      }
      default: {
        endTagInBody(p2, token);
      }
    }
  }
  function startTagInSelect(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.OPTION: {
        if (p2.openElements.currentTagId === TAG_ID.OPTION) {
          p2.openElements.pop();
        }
        p2._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.OPTGROUP: {
        if (p2.openElements.currentTagId === TAG_ID.OPTION) {
          p2.openElements.pop();
        }
        if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p2.openElements.pop();
        }
        p2._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.HR: {
        if (p2.openElements.currentTagId === TAG_ID.OPTION) {
          p2.openElements.pop();
        }
        if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p2.openElements.pop();
        }
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.INPUT:
      case TAG_ID.KEYGEN:
      case TAG_ID.TEXTAREA:
      case TAG_ID.SELECT: {
        if (p2.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p2._resetInsertionMode();
          if (token.tagID !== TAG_ID.SELECT) {
            p2._processStartTag(token);
          }
        }
        break;
      }
      case TAG_ID.SCRIPT:
      case TAG_ID.TEMPLATE: {
        startTagInHead(p2, token);
        break;
      }
      default:
    }
  }
  function endTagInSelect(p2, token) {
    switch (token.tagID) {
      case TAG_ID.OPTGROUP: {
        if (p2.openElements.stackTop > 0 && p2.openElements.currentTagId === TAG_ID.OPTION && p2.openElements.tagIDs[p2.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
          p2.openElements.pop();
        }
        if (p2.openElements.currentTagId === TAG_ID.OPTGROUP) {
          p2.openElements.pop();
        }
        break;
      }
      case TAG_ID.OPTION: {
        if (p2.openElements.currentTagId === TAG_ID.OPTION) {
          p2.openElements.pop();
        }
        break;
      }
      case TAG_ID.SELECT: {
        if (p2.openElements.hasInSelectScope(TAG_ID.SELECT)) {
          p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
          p2._resetInsertionMode();
        }
        break;
      }
      case TAG_ID.TEMPLATE: {
        templateEndTagInHead(p2, token);
        break;
      }
      default:
    }
  }
  function startTagInSelectInTable(p2, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
      p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p2._resetInsertionMode();
      p2._processStartTag(token);
    } else {
      startTagInSelect(p2, token);
    }
  }
  function endTagInSelectInTable(p2, token) {
    const tn = token.tagID;
    if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
      if (p2.openElements.hasInTableScope(tn)) {
        p2.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p2._resetInsertionMode();
        p2.onEndTag(token);
      }
    } else {
      endTagInSelect(p2, token);
    }
  }
  function startTagInTemplate(p2, token) {
    switch (token.tagID) {
      // First, handle tags that can start without a mode change
      case TAG_ID.BASE:
      case TAG_ID.BASEFONT:
      case TAG_ID.BGSOUND:
      case TAG_ID.LINK:
      case TAG_ID.META:
      case TAG_ID.NOFRAMES:
      case TAG_ID.SCRIPT:
      case TAG_ID.STYLE:
      case TAG_ID.TEMPLATE:
      case TAG_ID.TITLE: {
        startTagInHead(p2, token);
        break;
      }
      // Re-process the token in the appropriate mode
      case TAG_ID.CAPTION:
      case TAG_ID.COLGROUP:
      case TAG_ID.TBODY:
      case TAG_ID.TFOOT:
      case TAG_ID.THEAD: {
        p2.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
        p2.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p2, token);
        break;
      }
      case TAG_ID.COL: {
        p2.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
        p2.insertionMode = InsertionMode.IN_COLUMN_GROUP;
        startTagInColumnGroup(p2, token);
        break;
      }
      case TAG_ID.TR: {
        p2.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
        p2.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p2, token);
        break;
      }
      case TAG_ID.TD:
      case TAG_ID.TH: {
        p2.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
        p2.insertionMode = InsertionMode.IN_ROW;
        startTagInRow(p2, token);
        break;
      }
      default: {
        p2.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
        p2.insertionMode = InsertionMode.IN_BODY;
        startTagInBody(p2, token);
      }
    }
  }
  function endTagInTemplate(p2, token) {
    if (token.tagID === TAG_ID.TEMPLATE) {
      templateEndTagInHead(p2, token);
    }
  }
  function eofInTemplate(p2, token) {
    if (p2.openElements.tmplCount > 0) {
      p2.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
      p2.activeFormattingElements.clearToLastMarker();
      p2.tmplInsertionModeStack.shift();
      p2._resetInsertionMode();
      p2.onEof(token);
    } else {
      stopParsing(p2, token);
    }
  }
  function startTagAfterBody(p2, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p2, token);
    } else {
      tokenAfterBody(p2, token);
    }
  }
  function endTagAfterBody(p2, token) {
    var _a2;
    if (token.tagID === TAG_ID.HTML) {
      if (!p2.fragmentContext) {
        p2.insertionMode = InsertionMode.AFTER_AFTER_BODY;
      }
      if (p2.options.sourceCodeLocationInfo && p2.openElements.tagIDs[0] === TAG_ID.HTML) {
        p2._setEndLocation(p2.openElements.items[0], token);
        const bodyElement = p2.openElements.items[1];
        if (bodyElement && !((_a2 = p2.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a2 === void 0 ? void 0 : _a2.endTag)) {
          p2._setEndLocation(bodyElement, token);
        }
      }
    } else {
      tokenAfterBody(p2, token);
    }
  }
  function tokenAfterBody(p2, token) {
    p2.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p2, token);
  }
  function startTagInFrameset(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.FRAMESET: {
        p2._insertElement(token, NS.HTML);
        break;
      }
      case TAG_ID.FRAME: {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p2, token);
        break;
      }
      default:
    }
  }
  function endTagInFrameset(p2, token) {
    if (token.tagID === TAG_ID.FRAMESET && !p2.openElements.isRootHtmlElementCurrent()) {
      p2.openElements.pop();
      if (!p2.fragmentContext && p2.openElements.currentTagId !== TAG_ID.FRAMESET) {
        p2.insertionMode = InsertionMode.AFTER_FRAMESET;
      }
    }
  }
  function startTagAfterFrameset(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p2, token);
        break;
      }
      default:
    }
  }
  function endTagAfterFrameset(p2, token) {
    if (token.tagID === TAG_ID.HTML) {
      p2.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
    }
  }
  function startTagAfterAfterBody(p2, token) {
    if (token.tagID === TAG_ID.HTML) {
      startTagInBody(p2, token);
    } else {
      tokenAfterAfterBody(p2, token);
    }
  }
  function tokenAfterAfterBody(p2, token) {
    p2.insertionMode = InsertionMode.IN_BODY;
    modeInBody(p2, token);
  }
  function startTagAfterAfterFrameset(p2, token) {
    switch (token.tagID) {
      case TAG_ID.HTML: {
        startTagInBody(p2, token);
        break;
      }
      case TAG_ID.NOFRAMES: {
        startTagInHead(p2, token);
        break;
      }
      default:
    }
  }
  function nullCharacterInForeignContent(p2, token) {
    token.chars = REPLACEMENT_CHARACTER;
    p2._insertCharacters(token);
  }
  function characterInForeignContent(p2, token) {
    p2._insertCharacters(token);
    p2.framesetOk = false;
  }
  function popUntilHtmlOrIntegrationPoint(p2) {
    while (p2.treeAdapter.getNamespaceURI(p2.openElements.current) !== NS.HTML && p2.openElements.currentTagId !== void 0 && !p2._isIntegrationPoint(p2.openElements.currentTagId, p2.openElements.current)) {
      p2.openElements.pop();
    }
  }
  function startTagInForeignContent(p2, token) {
    if (causesExit(token)) {
      popUntilHtmlOrIntegrationPoint(p2);
      p2._startTagOutsideForeignContent(token);
    } else {
      const current = p2._getAdjustedCurrentElement();
      const currentNs = p2.treeAdapter.getNamespaceURI(current);
      if (currentNs === NS.MATHML) {
        adjustTokenMathMLAttrs(token);
      } else if (currentNs === NS.SVG) {
        adjustTokenSVGTagName(token);
        adjustTokenSVGAttrs(token);
      }
      adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
        p2._appendElement(token, currentNs);
      } else {
        p2._insertElement(token, currentNs);
      }
      token.ackSelfClosing = true;
    }
  }
  function endTagInForeignContent(p2, token) {
    if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
      popUntilHtmlOrIntegrationPoint(p2);
      p2._endTagOutsideForeignContent(token);
      return;
    }
    for (let i = p2.openElements.stackTop; i > 0; i--) {
      const element6 = p2.openElements.items[i];
      if (p2.treeAdapter.getNamespaceURI(element6) === NS.HTML) {
        p2._endTagOutsideForeignContent(token);
        break;
      }
      const tagName = p2.treeAdapter.getTagName(element6);
      if (tagName.toLowerCase() === token.tagName) {
        token.tagName = tagName;
        p2.openElements.shortenToLength(i);
        break;
      }
    }
  }
  var HIDDEN_INPUT_TYPE, AA_OUTER_LOOP_ITER, AA_INNER_LOOP_ITER, InsertionMode, BASE_LOC, TABLE_STRUCTURE_TAGS, defaultParserOptions, Parser, TABLE_VOID_ELEMENTS;
  var init_parser = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/parser/index.js"() {
      init_tokenizer();
      init_open_element_stack();
      init_formatting_element_list();
      init_default2();
      init_doctype();
      init_foreign_content();
      init_error_codes();
      init_unicode();
      init_html4();
      init_token();
      HIDDEN_INPUT_TYPE = "hidden";
      AA_OUTER_LOOP_ITER = 8;
      AA_INNER_LOOP_ITER = 3;
      (function(InsertionMode2) {
        InsertionMode2[InsertionMode2["INITIAL"] = 0] = "INITIAL";
        InsertionMode2[InsertionMode2["BEFORE_HTML"] = 1] = "BEFORE_HTML";
        InsertionMode2[InsertionMode2["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
        InsertionMode2[InsertionMode2["IN_HEAD"] = 3] = "IN_HEAD";
        InsertionMode2[InsertionMode2["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
        InsertionMode2[InsertionMode2["AFTER_HEAD"] = 5] = "AFTER_HEAD";
        InsertionMode2[InsertionMode2["IN_BODY"] = 6] = "IN_BODY";
        InsertionMode2[InsertionMode2["TEXT"] = 7] = "TEXT";
        InsertionMode2[InsertionMode2["IN_TABLE"] = 8] = "IN_TABLE";
        InsertionMode2[InsertionMode2["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
        InsertionMode2[InsertionMode2["IN_CAPTION"] = 10] = "IN_CAPTION";
        InsertionMode2[InsertionMode2["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
        InsertionMode2[InsertionMode2["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
        InsertionMode2[InsertionMode2["IN_ROW"] = 13] = "IN_ROW";
        InsertionMode2[InsertionMode2["IN_CELL"] = 14] = "IN_CELL";
        InsertionMode2[InsertionMode2["IN_SELECT"] = 15] = "IN_SELECT";
        InsertionMode2[InsertionMode2["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
        InsertionMode2[InsertionMode2["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
        InsertionMode2[InsertionMode2["AFTER_BODY"] = 18] = "AFTER_BODY";
        InsertionMode2[InsertionMode2["IN_FRAMESET"] = 19] = "IN_FRAMESET";
        InsertionMode2[InsertionMode2["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
        InsertionMode2[InsertionMode2["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
        InsertionMode2[InsertionMode2["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
      })(InsertionMode || (InsertionMode = {}));
      BASE_LOC = {
        startLine: -1,
        startCol: -1,
        startOffset: -1,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
      TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
      defaultParserOptions = {
        scriptingEnabled: true,
        sourceCodeLocationInfo: false,
        treeAdapter: defaultTreeAdapter,
        onParseError: null
      };
      Parser = class {
        constructor(options, document4, fragmentContext = null, scriptHandler = null) {
          this.fragmentContext = fragmentContext;
          this.scriptHandler = scriptHandler;
          this.currentToken = null;
          this.stopped = false;
          this.insertionMode = InsertionMode.INITIAL;
          this.originalInsertionMode = InsertionMode.INITIAL;
          this.headElement = null;
          this.formElement = null;
          this.currentNotInHTML = false;
          this.tmplInsertionModeStack = [];
          this.pendingCharacterTokens = [];
          this.hasNonWhitespacePendingCharacterToken = false;
          this.framesetOk = true;
          this.skipNextNewLine = false;
          this.fosterParentingEnabled = false;
          this.options = {
            ...defaultParserOptions,
            ...options
          };
          this.treeAdapter = this.options.treeAdapter;
          this.onParseError = this.options.onParseError;
          if (this.onParseError) {
            this.options.sourceCodeLocationInfo = true;
          }
          this.document = document4 !== null && document4 !== void 0 ? document4 : this.treeAdapter.createDocument();
          this.tokenizer = new Tokenizer(this.options, this);
          this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
          this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
          this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
          this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
        }
        // API
        static parse(html7, options) {
          const parser = new this(options);
          parser.tokenizer.write(html7, true);
          return parser.document;
        }
        static getFragmentParser(fragmentContext, options) {
          const opts = {
            ...defaultParserOptions,
            ...options
          };
          fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
          const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
          const parser = new this(opts, documentMock, fragmentContext);
          if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
            parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
          }
          parser._initTokenizerForFragmentParsing();
          parser._insertFakeRootElement();
          parser._resetInsertionMode();
          parser._findFormInFragmentContext();
          return parser;
        }
        getFragment() {
          const rootElement = this.treeAdapter.getFirstChild(this.document);
          const fragment2 = this.treeAdapter.createDocumentFragment();
          this._adoptNodes(rootElement, fragment2);
          return fragment2;
        }
        //Errors
        /** @internal */
        _err(token, code4, beforeToken) {
          var _a2;
          if (!this.onParseError)
            return;
          const loc = (_a2 = token.location) !== null && _a2 !== void 0 ? _a2 : BASE_LOC;
          const err = {
            code: code4,
            startLine: loc.startLine,
            startCol: loc.startCol,
            startOffset: loc.startOffset,
            endLine: beforeToken ? loc.startLine : loc.endLine,
            endCol: beforeToken ? loc.startCol : loc.endCol,
            endOffset: beforeToken ? loc.startOffset : loc.endOffset
          };
          this.onParseError(err);
        }
        //Stack events
        /** @internal */
        onItemPush(node2, tid, isTop) {
          var _a2, _b;
          (_b = (_a2 = this.treeAdapter).onItemPush) === null || _b === void 0 ? void 0 : _b.call(_a2, node2);
          if (isTop && this.openElements.stackTop > 0)
            this._setContextModes(node2, tid);
        }
        /** @internal */
        onItemPop(node2, isTop) {
          var _a2, _b;
          if (this.options.sourceCodeLocationInfo) {
            this._setEndLocation(node2, this.currentToken);
          }
          (_b = (_a2 = this.treeAdapter).onItemPop) === null || _b === void 0 ? void 0 : _b.call(_a2, node2, this.openElements.current);
          if (isTop) {
            let current;
            let currentTagId;
            if (this.openElements.stackTop === 0 && this.fragmentContext) {
              current = this.fragmentContext;
              currentTagId = this.fragmentContextID;
            } else {
              ({ current, currentTagId } = this.openElements);
            }
            this._setContextModes(current, currentTagId);
          }
        }
        _setContextModes(current, tid) {
          const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
          this.currentNotInHTML = !isHTML;
          this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
        }
        /** @protected */
        _switchToTextParsing(currentToken, nextTokenizerState) {
          this._insertElement(currentToken, NS.HTML);
          this.tokenizer.state = nextTokenizerState;
          this.originalInsertionMode = this.insertionMode;
          this.insertionMode = InsertionMode.TEXT;
        }
        switchToPlaintextParsing() {
          this.insertionMode = InsertionMode.TEXT;
          this.originalInsertionMode = InsertionMode.IN_BODY;
          this.tokenizer.state = TokenizerMode.PLAINTEXT;
        }
        //Fragment parsing
        /** @protected */
        _getAdjustedCurrentElement() {
          return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
        }
        /** @protected */
        _findFormInFragmentContext() {
          let node2 = this.fragmentContext;
          while (node2) {
            if (this.treeAdapter.getTagName(node2) === TAG_NAMES.FORM) {
              this.formElement = node2;
              break;
            }
            node2 = this.treeAdapter.getParentNode(node2);
          }
        }
        _initTokenizerForFragmentParsing() {
          if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
            return;
          }
          switch (this.fragmentContextID) {
            case TAG_ID.TITLE:
            case TAG_ID.TEXTAREA: {
              this.tokenizer.state = TokenizerMode.RCDATA;
              break;
            }
            case TAG_ID.STYLE:
            case TAG_ID.XMP:
            case TAG_ID.IFRAME:
            case TAG_ID.NOEMBED:
            case TAG_ID.NOFRAMES:
            case TAG_ID.NOSCRIPT: {
              this.tokenizer.state = TokenizerMode.RAWTEXT;
              break;
            }
            case TAG_ID.SCRIPT: {
              this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
              break;
            }
            case TAG_ID.PLAINTEXT: {
              this.tokenizer.state = TokenizerMode.PLAINTEXT;
              break;
            }
            default:
          }
        }
        //Tree mutation
        /** @protected */
        _setDocumentType(token) {
          const name = token.name || "";
          const publicId = token.publicId || "";
          const systemId = token.systemId || "";
          this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
          if (token.location) {
            const documentChildren = this.treeAdapter.getChildNodes(this.document);
            const docTypeNode = documentChildren.find((node2) => this.treeAdapter.isDocumentTypeNode(node2));
            if (docTypeNode) {
              this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
            }
          }
        }
        /** @protected */
        _attachElementToTree(element6, location2) {
          if (this.options.sourceCodeLocationInfo) {
            const loc = location2 && {
              ...location2,
              startTag: location2
            };
            this.treeAdapter.setNodeSourceCodeLocation(element6, loc);
          }
          if (this._shouldFosterParentOnInsertion()) {
            this._fosterParentElement(element6);
          } else {
            const parent = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element6);
          }
        }
        /**
         * For self-closing tags. Add an element to the tree, but skip adding it
         * to the stack.
         */
        /** @protected */
        _appendElement(token, namespaceURI) {
          const element6 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
          this._attachElementToTree(element6, token.location);
        }
        /** @protected */
        _insertElement(token, namespaceURI) {
          const element6 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
          this._attachElementToTree(element6, token.location);
          this.openElements.push(element6, token.tagID);
        }
        /** @protected */
        _insertFakeElement(tagName, tagID) {
          const element6 = this.treeAdapter.createElement(tagName, NS.HTML, []);
          this._attachElementToTree(element6, null);
          this.openElements.push(element6, tagID);
        }
        /** @protected */
        _insertTemplate(token) {
          const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
          const content3 = this.treeAdapter.createDocumentFragment();
          this.treeAdapter.setTemplateContent(tmpl, content3);
          this._attachElementToTree(tmpl, token.location);
          this.openElements.push(tmpl, token.tagID);
          if (this.options.sourceCodeLocationInfo)
            this.treeAdapter.setNodeSourceCodeLocation(content3, null);
        }
        /** @protected */
        _insertFakeRootElement() {
          const element6 = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
          if (this.options.sourceCodeLocationInfo)
            this.treeAdapter.setNodeSourceCodeLocation(element6, null);
          this.treeAdapter.appendChild(this.openElements.current, element6);
          this.openElements.push(element6, TAG_ID.HTML);
        }
        /** @protected */
        _appendCommentNode(token, parent) {
          const commentNode = this.treeAdapter.createCommentNode(token.data);
          this.treeAdapter.appendChild(parent, commentNode);
          if (this.options.sourceCodeLocationInfo) {
            this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
          }
        }
        /** @protected */
        _insertCharacters(token) {
          let parent;
          let beforeElement;
          if (this._shouldFosterParentOnInsertion()) {
            ({ parent, beforeElement } = this._findFosterParentingLocation());
            if (beforeElement) {
              this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
            } else {
              this.treeAdapter.insertText(parent, token.chars);
            }
          } else {
            parent = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.insertText(parent, token.chars);
          }
          if (!token.location)
            return;
          const siblings2 = this.treeAdapter.getChildNodes(parent);
          const textNodeIdx = beforeElement ? siblings2.lastIndexOf(beforeElement) : siblings2.length;
          const textNode = siblings2[textNodeIdx - 1];
          const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
          if (tnLoc) {
            const { endLine, endCol, endOffset } = token.location;
            this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
          } else if (this.options.sourceCodeLocationInfo) {
            this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
          }
        }
        /** @protected */
        _adoptNodes(donor, recipient) {
          for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
            this.treeAdapter.detachNode(child);
            this.treeAdapter.appendChild(recipient, child);
          }
        }
        /** @protected */
        _setEndLocation(element6, closingToken) {
          if (this.treeAdapter.getNodeSourceCodeLocation(element6) && closingToken.location) {
            const ctLoc = closingToken.location;
            const tn = this.treeAdapter.getTagName(element6);
            const endLoc = (
              // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
              // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
              closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
                endTag: { ...ctLoc },
                endLine: ctLoc.endLine,
                endCol: ctLoc.endCol,
                endOffset: ctLoc.endOffset
              } : {
                endLine: ctLoc.startLine,
                endCol: ctLoc.startCol,
                endOffset: ctLoc.startOffset
              }
            );
            this.treeAdapter.updateNodeSourceCodeLocation(element6, endLoc);
          }
        }
        //Token processing
        shouldProcessStartTagTokenInForeignContent(token) {
          if (!this.currentNotInHTML)
            return false;
          let current;
          let currentTagId;
          if (this.openElements.stackTop === 0 && this.fragmentContext) {
            current = this.fragmentContext;
            currentTagId = this.fragmentContextID;
          } else {
            ({ current, currentTagId } = this.openElements);
          }
          if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
            return false;
          }
          return (
            // Check that `current` is not an integration point for HTML or MathML elements.
            this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
            // integration point.
            (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
          );
        }
        /** @protected */
        _processToken(token) {
          switch (token.type) {
            case TokenType.CHARACTER: {
              this.onCharacter(token);
              break;
            }
            case TokenType.NULL_CHARACTER: {
              this.onNullCharacter(token);
              break;
            }
            case TokenType.COMMENT: {
              this.onComment(token);
              break;
            }
            case TokenType.DOCTYPE: {
              this.onDoctype(token);
              break;
            }
            case TokenType.START_TAG: {
              this._processStartTag(token);
              break;
            }
            case TokenType.END_TAG: {
              this.onEndTag(token);
              break;
            }
            case TokenType.EOF: {
              this.onEof(token);
              break;
            }
            case TokenType.WHITESPACE_CHARACTER: {
              this.onWhitespaceCharacter(token);
              break;
            }
          }
        }
        //Integration points
        /** @protected */
        _isIntegrationPoint(tid, element6, foreignNS) {
          const ns = this.treeAdapter.getNamespaceURI(element6);
          const attrs = this.treeAdapter.getAttrList(element6);
          return isIntegrationPoint(tid, ns, attrs, foreignNS);
        }
        //Active formatting elements reconstruction
        /** @protected */
        _reconstructActiveFormattingElements() {
          const listLength = this.activeFormattingElements.entries.length;
          if (listLength) {
            const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
            const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
            for (let i = unopenIdx; i >= 0; i--) {
              const entry = this.activeFormattingElements.entries[i];
              this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
              entry.element = this.openElements.current;
            }
          }
        }
        //Close elements
        /** @protected */
        _closeTableCell() {
          this.openElements.generateImpliedEndTags();
          this.openElements.popUntilTableCellPopped();
          this.activeFormattingElements.clearToLastMarker();
          this.insertionMode = InsertionMode.IN_ROW;
        }
        /** @protected */
        _closePElement() {
          this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
          this.openElements.popUntilTagNamePopped(TAG_ID.P);
        }
        //Insertion modes
        /** @protected */
        _resetInsertionMode() {
          for (let i = this.openElements.stackTop; i >= 0; i--) {
            switch (i === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i]) {
              case TAG_ID.TR: {
                this.insertionMode = InsertionMode.IN_ROW;
                return;
              }
              case TAG_ID.TBODY:
              case TAG_ID.THEAD:
              case TAG_ID.TFOOT: {
                this.insertionMode = InsertionMode.IN_TABLE_BODY;
                return;
              }
              case TAG_ID.CAPTION: {
                this.insertionMode = InsertionMode.IN_CAPTION;
                return;
              }
              case TAG_ID.COLGROUP: {
                this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
                return;
              }
              case TAG_ID.TABLE: {
                this.insertionMode = InsertionMode.IN_TABLE;
                return;
              }
              case TAG_ID.BODY: {
                this.insertionMode = InsertionMode.IN_BODY;
                return;
              }
              case TAG_ID.FRAMESET: {
                this.insertionMode = InsertionMode.IN_FRAMESET;
                return;
              }
              case TAG_ID.SELECT: {
                this._resetInsertionModeForSelect(i);
                return;
              }
              case TAG_ID.TEMPLATE: {
                this.insertionMode = this.tmplInsertionModeStack[0];
                return;
              }
              case TAG_ID.HTML: {
                this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
                return;
              }
              case TAG_ID.TD:
              case TAG_ID.TH: {
                if (i > 0) {
                  this.insertionMode = InsertionMode.IN_CELL;
                  return;
                }
                break;
              }
              case TAG_ID.HEAD: {
                if (i > 0) {
                  this.insertionMode = InsertionMode.IN_HEAD;
                  return;
                }
                break;
              }
            }
          }
          this.insertionMode = InsertionMode.IN_BODY;
        }
        /** @protected */
        _resetInsertionModeForSelect(selectIdx) {
          if (selectIdx > 0) {
            for (let i = selectIdx - 1; i > 0; i--) {
              const tn = this.openElements.tagIDs[i];
              if (tn === TAG_ID.TEMPLATE) {
                break;
              } else if (tn === TAG_ID.TABLE) {
                this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
                return;
              }
            }
          }
          this.insertionMode = InsertionMode.IN_SELECT;
        }
        //Foster parenting
        /** @protected */
        _isElementCausesFosterParenting(tn) {
          return TABLE_STRUCTURE_TAGS.has(tn);
        }
        /** @protected */
        _shouldFosterParentOnInsertion() {
          return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
        }
        /** @protected */
        _findFosterParentingLocation() {
          for (let i = this.openElements.stackTop; i >= 0; i--) {
            const openElement = this.openElements.items[i];
            switch (this.openElements.tagIDs[i]) {
              case TAG_ID.TEMPLATE: {
                if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
                  return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
                }
                break;
              }
              case TAG_ID.TABLE: {
                const parent = this.treeAdapter.getParentNode(openElement);
                if (parent) {
                  return { parent, beforeElement: openElement };
                }
                return { parent: this.openElements.items[i - 1], beforeElement: null };
              }
              default:
            }
          }
          return { parent: this.openElements.items[0], beforeElement: null };
        }
        /** @protected */
        _fosterParentElement(element6) {
          const location2 = this._findFosterParentingLocation();
          if (location2.beforeElement) {
            this.treeAdapter.insertBefore(location2.parent, element6, location2.beforeElement);
          } else {
            this.treeAdapter.appendChild(location2.parent, element6);
          }
        }
        //Special elements
        /** @protected */
        _isSpecialElement(element6, id) {
          const ns = this.treeAdapter.getNamespaceURI(element6);
          return SPECIAL_ELEMENTS[ns].has(id);
        }
        /** @internal */
        onCharacter(token) {
          this.skipNextNewLine = false;
          if (this.tokenizer.inForeignNode) {
            characterInForeignContent(this, token);
            return;
          }
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              tokenInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HTML: {
              tokenBeforeHtml(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD: {
              tokenBeforeHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD: {
              tokenInHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD_NO_SCRIPT: {
              tokenInHeadNoScript(this, token);
              break;
            }
            case InsertionMode.AFTER_HEAD: {
              tokenAfterHead(this, token);
              break;
            }
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_TEMPLATE: {
              characterInBody(this, token);
              break;
            }
            case InsertionMode.TEXT:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE: {
              this._insertCharacters(token);
              break;
            }
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW: {
              characterInTable(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              characterInTableText(this, token);
              break;
            }
            case InsertionMode.IN_COLUMN_GROUP: {
              tokenInColumnGroup(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY: {
              tokenAfterBody(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_BODY: {
              tokenAfterAfterBody(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onNullCharacter(token) {
          this.skipNextNewLine = false;
          if (this.tokenizer.inForeignNode) {
            nullCharacterInForeignContent(this, token);
            return;
          }
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              tokenInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HTML: {
              tokenBeforeHtml(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD: {
              tokenBeforeHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD: {
              tokenInHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD_NO_SCRIPT: {
              tokenInHeadNoScript(this, token);
              break;
            }
            case InsertionMode.AFTER_HEAD: {
              tokenAfterHead(this, token);
              break;
            }
            case InsertionMode.TEXT: {
              this._insertCharacters(token);
              break;
            }
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW: {
              characterInTable(this, token);
              break;
            }
            case InsertionMode.IN_COLUMN_GROUP: {
              tokenInColumnGroup(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY: {
              tokenAfterBody(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_BODY: {
              tokenAfterAfterBody(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onComment(token) {
          this.skipNextNewLine = false;
          if (this.currentNotInHTML) {
            appendComment(this, token);
            return;
          }
          switch (this.insertionMode) {
            case InsertionMode.INITIAL:
            case InsertionMode.BEFORE_HTML:
            case InsertionMode.BEFORE_HEAD:
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD:
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
            case InsertionMode.IN_TEMPLATE:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET: {
              appendComment(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              tokenInTableText(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY: {
              appendCommentToRootHtmlElement(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET: {
              appendCommentToDocument(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onDoctype(token) {
          this.skipNextNewLine = false;
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              doctypeInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD:
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD: {
              this._err(token, ERR.misplacedDoctype);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              tokenInTableText(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onStartTag(token) {
          this.skipNextNewLine = false;
          this.currentToken = token;
          this._processStartTag(token);
          if (token.selfClosing && !token.ackSelfClosing) {
            this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
          }
        }
        /**
         * Processes a given start tag.
         *
         * `onStartTag` checks if a self-closing tag was recognized. When a token
         * is moved inbetween multiple insertion modes, this check for self-closing
         * could lead to false positives. To avoid this, `_processStartTag` is used
         * for nested calls.
         *
         * @param token The token to process.
         * @protected
         */
        _processStartTag(token) {
          if (this.shouldProcessStartTagTokenInForeignContent(token)) {
            startTagInForeignContent(this, token);
          } else {
            this._startTagOutsideForeignContent(token);
          }
        }
        /** @protected */
        _startTagOutsideForeignContent(token) {
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              tokenInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HTML: {
              startTagBeforeHtml(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD: {
              startTagBeforeHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD: {
              startTagInHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD_NO_SCRIPT: {
              startTagInHeadNoScript(this, token);
              break;
            }
            case InsertionMode.AFTER_HEAD: {
              startTagAfterHead(this, token);
              break;
            }
            case InsertionMode.IN_BODY: {
              startTagInBody(this, token);
              break;
            }
            case InsertionMode.IN_TABLE: {
              startTagInTable(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              tokenInTableText(this, token);
              break;
            }
            case InsertionMode.IN_CAPTION: {
              startTagInCaption(this, token);
              break;
            }
            case InsertionMode.IN_COLUMN_GROUP: {
              startTagInColumnGroup(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_BODY: {
              startTagInTableBody(this, token);
              break;
            }
            case InsertionMode.IN_ROW: {
              startTagInRow(this, token);
              break;
            }
            case InsertionMode.IN_CELL: {
              startTagInCell(this, token);
              break;
            }
            case InsertionMode.IN_SELECT: {
              startTagInSelect(this, token);
              break;
            }
            case InsertionMode.IN_SELECT_IN_TABLE: {
              startTagInSelectInTable(this, token);
              break;
            }
            case InsertionMode.IN_TEMPLATE: {
              startTagInTemplate(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY: {
              startTagAfterBody(this, token);
              break;
            }
            case InsertionMode.IN_FRAMESET: {
              startTagInFrameset(this, token);
              break;
            }
            case InsertionMode.AFTER_FRAMESET: {
              startTagAfterFrameset(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_BODY: {
              startTagAfterAfterBody(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_FRAMESET: {
              startTagAfterAfterFrameset(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onEndTag(token) {
          this.skipNextNewLine = false;
          this.currentToken = token;
          if (this.currentNotInHTML) {
            endTagInForeignContent(this, token);
          } else {
            this._endTagOutsideForeignContent(token);
          }
        }
        /** @protected */
        _endTagOutsideForeignContent(token) {
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              tokenInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HTML: {
              endTagBeforeHtml(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD: {
              endTagBeforeHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD: {
              endTagInHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD_NO_SCRIPT: {
              endTagInHeadNoScript(this, token);
              break;
            }
            case InsertionMode.AFTER_HEAD: {
              endTagAfterHead(this, token);
              break;
            }
            case InsertionMode.IN_BODY: {
              endTagInBody(this, token);
              break;
            }
            case InsertionMode.TEXT: {
              endTagInText(this, token);
              break;
            }
            case InsertionMode.IN_TABLE: {
              endTagInTable(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              tokenInTableText(this, token);
              break;
            }
            case InsertionMode.IN_CAPTION: {
              endTagInCaption(this, token);
              break;
            }
            case InsertionMode.IN_COLUMN_GROUP: {
              endTagInColumnGroup(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_BODY: {
              endTagInTableBody(this, token);
              break;
            }
            case InsertionMode.IN_ROW: {
              endTagInRow(this, token);
              break;
            }
            case InsertionMode.IN_CELL: {
              endTagInCell(this, token);
              break;
            }
            case InsertionMode.IN_SELECT: {
              endTagInSelect(this, token);
              break;
            }
            case InsertionMode.IN_SELECT_IN_TABLE: {
              endTagInSelectInTable(this, token);
              break;
            }
            case InsertionMode.IN_TEMPLATE: {
              endTagInTemplate(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY: {
              endTagAfterBody(this, token);
              break;
            }
            case InsertionMode.IN_FRAMESET: {
              endTagInFrameset(this, token);
              break;
            }
            case InsertionMode.AFTER_FRAMESET: {
              endTagAfterFrameset(this, token);
              break;
            }
            case InsertionMode.AFTER_AFTER_BODY: {
              tokenAfterAfterBody(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onEof(token) {
          switch (this.insertionMode) {
            case InsertionMode.INITIAL: {
              tokenInInitialMode(this, token);
              break;
            }
            case InsertionMode.BEFORE_HTML: {
              tokenBeforeHtml(this, token);
              break;
            }
            case InsertionMode.BEFORE_HEAD: {
              tokenBeforeHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD: {
              tokenInHead(this, token);
              break;
            }
            case InsertionMode.IN_HEAD_NO_SCRIPT: {
              tokenInHeadNoScript(this, token);
              break;
            }
            case InsertionMode.AFTER_HEAD: {
              tokenAfterHead(this, token);
              break;
            }
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE: {
              eofInBody(this, token);
              break;
            }
            case InsertionMode.TEXT: {
              eofInText(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              tokenInTableText(this, token);
              break;
            }
            case InsertionMode.IN_TEMPLATE: {
              eofInTemplate(this, token);
              break;
            }
            case InsertionMode.AFTER_BODY:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET:
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET: {
              stopParsing(this, token);
              break;
            }
            default:
          }
        }
        /** @internal */
        onWhitespaceCharacter(token) {
          if (this.skipNextNewLine) {
            this.skipNextNewLine = false;
            if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
              if (token.chars.length === 1) {
                return;
              }
              token.chars = token.chars.substr(1);
            }
          }
          if (this.tokenizer.inForeignNode) {
            this._insertCharacters(token);
            return;
          }
          switch (this.insertionMode) {
            case InsertionMode.IN_HEAD:
            case InsertionMode.IN_HEAD_NO_SCRIPT:
            case InsertionMode.AFTER_HEAD:
            case InsertionMode.TEXT:
            case InsertionMode.IN_COLUMN_GROUP:
            case InsertionMode.IN_SELECT:
            case InsertionMode.IN_SELECT_IN_TABLE:
            case InsertionMode.IN_FRAMESET:
            case InsertionMode.AFTER_FRAMESET: {
              this._insertCharacters(token);
              break;
            }
            case InsertionMode.IN_BODY:
            case InsertionMode.IN_CAPTION:
            case InsertionMode.IN_CELL:
            case InsertionMode.IN_TEMPLATE:
            case InsertionMode.AFTER_BODY:
            case InsertionMode.AFTER_AFTER_BODY:
            case InsertionMode.AFTER_AFTER_FRAMESET: {
              whitespaceCharacterInBody(this, token);
              break;
            }
            case InsertionMode.IN_TABLE:
            case InsertionMode.IN_TABLE_BODY:
            case InsertionMode.IN_ROW: {
              characterInTable(this, token);
              break;
            }
            case InsertionMode.IN_TABLE_TEXT: {
              whitespaceCharacterInTableText(this, token);
              break;
            }
            default:
          }
        }
      };
      TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
    }
  });

  // node_modules/hast-util-raw/node_modules/entities/dist/esm/escape.js
  var getCodePoint;
  var init_escape = __esm({
    "node_modules/hast-util-raw/node_modules/entities/dist/esm/escape.js"() {
      getCodePoint = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      String.prototype.codePointAt == null ? (c, index2) => (c.charCodeAt(index2) & 64512) === 55296 ? (c.charCodeAt(index2) - 55296) * 1024 + c.charCodeAt(index2 + 1) - 56320 + 65536 : c.charCodeAt(index2) : (
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        (input, index2) => input.codePointAt(index2)
      );
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/serializer/index.js
  var VOID_ELEMENTS;
  var init_serializer = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/serializer/index.js"() {
      init_html4();
      init_escape();
      init_default2();
      VOID_ELEMENTS = /* @__PURE__ */ new Set([
        TAG_NAMES.AREA,
        TAG_NAMES.BASE,
        TAG_NAMES.BASEFONT,
        TAG_NAMES.BGSOUND,
        TAG_NAMES.BR,
        TAG_NAMES.COL,
        TAG_NAMES.EMBED,
        TAG_NAMES.FRAME,
        TAG_NAMES.HR,
        TAG_NAMES.IMG,
        TAG_NAMES.INPUT,
        TAG_NAMES.KEYGEN,
        TAG_NAMES.LINK,
        TAG_NAMES.META,
        TAG_NAMES.PARAM,
        TAG_NAMES.SOURCE,
        TAG_NAMES.TRACK,
        TAG_NAMES.WBR
      ]);
    }
  });

  // node_modules/hast-util-raw/node_modules/parse5/dist/index.js
  var init_dist = __esm({
    "node_modules/hast-util-raw/node_modules/parse5/dist/index.js"() {
      init_parser();
      init_default2();
      init_parser();
      init_serializer();
      init_error_codes();
      init_foreign_content();
      init_html4();
      init_token();
      init_tokenizer();
    }
  });

  // node_modules/hast-util-raw/lib/index.js
  function raw(tree, options) {
    const document4 = documentMode(tree);
    const one5 = zwitch("type", {
      handlers: { root: root4, element: element4, text: text7, comment: comment2, doctype: doctype2, raw: handleRaw },
      unknown
    });
    const state = {
      parser: document4 ? new Parser(parseOptions) : Parser.getFragmentParser(void 0, parseOptions),
      handle(node2) {
        one5(node2, state);
      },
      stitches: false,
      options: options || {}
    };
    one5(tree, state);
    resetTokenizer(state, pointStart());
    const p5 = document4 ? state.parser.document : state.parser.getFragment();
    const result = fromParse5(p5, {
      // To do: support `space`?
      file: state.options.file
    });
    if (state.stitches) {
      visit(result, "comment", function(node2, index2, parent) {
        const stitch2 = (
          /** @type {Stitch} */
          /** @type {unknown} */
          node2
        );
        if (stitch2.value.stitch && parent && index2 !== void 0) {
          const siblings2 = parent.children;
          siblings2[index2] = stitch2.value.stitch;
          return index2;
        }
      });
    }
    if (result.type === "root" && result.children.length === 1 && result.children[0].type === tree.type) {
      return result.children[0];
    }
    return result;
  }
  function all4(nodes, state) {
    let index2 = -1;
    if (nodes) {
      while (++index2 < nodes.length) {
        state.handle(nodes[index2]);
      }
    }
  }
  function root4(node2, state) {
    all4(node2.children, state);
  }
  function element4(node2, state) {
    startTag(node2, state);
    all4(node2.children, state);
    endTag(node2, state);
  }
  function text7(node2, state) {
    if (state.parser.tokenizer.state > 4) {
      state.parser.tokenizer.state = 0;
    }
    const token = {
      type: token_exports.TokenType.CHARACTER,
      chars: node2.value,
      location: createParse5Location(node2)
    };
    resetTokenizer(state, pointStart(node2));
    state.parser.currentToken = token;
    state.parser._processToken(state.parser.currentToken);
  }
  function doctype2(node2, state) {
    const token = {
      type: token_exports.TokenType.DOCTYPE,
      name: "html",
      forceQuirks: false,
      publicId: "",
      systemId: "",
      location: createParse5Location(node2)
    };
    resetTokenizer(state, pointStart(node2));
    state.parser.currentToken = token;
    state.parser._processToken(state.parser.currentToken);
  }
  function stitch(node2, state) {
    state.stitches = true;
    const clone = cloneWithoutChildren(node2);
    if ("children" in node2 && "children" in clone) {
      const fakeRoot = (
        /** @type {Root} */
        raw({ type: "root", children: node2.children }, state.options)
      );
      clone.children = fakeRoot.children;
    }
    comment2({ type: "comment", value: { stitch: clone } }, state);
  }
  function comment2(node2, state) {
    const data = node2.value;
    const token = {
      type: token_exports.TokenType.COMMENT,
      data,
      location: createParse5Location(node2)
    };
    resetTokenizer(state, pointStart(node2));
    state.parser.currentToken = token;
    state.parser._processToken(state.parser.currentToken);
  }
  function handleRaw(node2, state) {
    state.parser.tokenizer.preprocessor.html = "";
    state.parser.tokenizer.preprocessor.pos = -1;
    state.parser.tokenizer.preprocessor.lastGapPos = -2;
    state.parser.tokenizer.preprocessor.gapStack = [];
    state.parser.tokenizer.preprocessor.skipNextNewLine = false;
    state.parser.tokenizer.preprocessor.lastChunkWritten = false;
    state.parser.tokenizer.preprocessor.endOfChunkHit = false;
    state.parser.tokenizer.preprocessor.isEol = false;
    setPoint(state, pointStart(node2));
    state.parser.tokenizer.write(
      state.options.tagfilter ? node2.value.replace(gfmTagfilterExpression, "&lt;$1$2") : node2.value,
      false
    );
    state.parser.tokenizer._runParsingLoop();
    if (state.parser.tokenizer.state === 72 || // @ts-expect-error: removed.
    state.parser.tokenizer.state === 78) {
      state.parser.tokenizer.preprocessor.lastChunkWritten = true;
      const cp = state.parser.tokenizer._consume();
      state.parser.tokenizer._callState(cp);
    }
  }
  function unknown(node_, state) {
    const node2 = (
      /** @type {Nodes} */
      node_
    );
    if (state.options.passThrough && state.options.passThrough.includes(node2.type)) {
      stitch(node2, state);
    } else {
      let extra = "";
      if (knownMdxNames.has(node2.type)) {
        extra = ". It looks like you are using MDX nodes with `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its a bad and slow idea. If you use this because you are using markdown syntax, then you have to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs), but you can also migrate to use the MDX syntax";
      }
      throw new Error("Cannot compile `" + node2.type + "` node" + extra);
    }
  }
  function resetTokenizer(state, point5) {
    setPoint(state, point5);
    const token = state.parser.tokenizer.currentCharacterToken;
    if (token && token.location) {
      token.location.endLine = state.parser.tokenizer.preprocessor.line;
      token.location.endCol = state.parser.tokenizer.preprocessor.col + 1;
      token.location.endOffset = state.parser.tokenizer.preprocessor.offset + 1;
      state.parser.currentToken = token;
      state.parser._processToken(state.parser.currentToken);
    }
    state.parser.tokenizer.paused = false;
    state.parser.tokenizer.inLoop = false;
    state.parser.tokenizer.active = false;
    state.parser.tokenizer.returnState = TokenizerMode.DATA;
    state.parser.tokenizer.charRefCode = -1;
    state.parser.tokenizer.consumedAfterSnapshot = -1;
    state.parser.tokenizer.currentLocation = null;
    state.parser.tokenizer.currentCharacterToken = null;
    state.parser.tokenizer.currentToken = null;
    state.parser.tokenizer.currentAttr = { name: "", value: "" };
  }
  function setPoint(state, point5) {
    if (point5 && point5.offset !== void 0) {
      const location2 = {
        startLine: point5.line,
        startCol: point5.column,
        startOffset: point5.offset,
        endLine: -1,
        endCol: -1,
        endOffset: -1
      };
      state.parser.tokenizer.preprocessor.lineStartPos = -point5.column + 1;
      state.parser.tokenizer.preprocessor.droppedBufferSize = point5.offset;
      state.parser.tokenizer.preprocessor.line = point5.line;
      state.parser.tokenizer.currentLocation = location2;
    }
  }
  function startTag(node2, state) {
    const tagName = node2.tagName.toLowerCase();
    if (state.parser.tokenizer.state === TokenizerMode.PLAINTEXT) return;
    resetTokenizer(state, pointStart(node2));
    const current = state.parser.openElements.current;
    let ns = "namespaceURI" in current ? current.namespaceURI : webNamespaces.html;
    if (ns === webNamespaces.html && tagName === "svg") {
      ns = webNamespaces.svg;
    }
    const result = toParse5(
      // Shallow clone to not delve into `children`: we only need the attributes.
      { ...node2, children: [] },
      { space: ns === webNamespaces.svg ? "svg" : "html" }
    );
    const tag = {
      type: token_exports.TokenType.START_TAG,
      tagName,
      tagID: html_exports.getTagID(tagName),
      // We always send start and end tags.
      selfClosing: false,
      ackSelfClosing: false,
      // Always element.
      /* c8 ignore next */
      attrs: "attrs" in result ? result.attrs : [],
      location: createParse5Location(node2)
    };
    state.parser.currentToken = tag;
    state.parser._processToken(state.parser.currentToken);
    state.parser.tokenizer.lastStartTagName = tagName;
  }
  function endTag(node2, state) {
    const tagName = node2.tagName.toLowerCase();
    if (!state.parser.tokenizer.inForeignNode && htmlVoidElements.includes(tagName)) {
      return;
    }
    if (state.parser.tokenizer.state === TokenizerMode.PLAINTEXT) return;
    resetTokenizer(state, pointEnd(node2));
    const tag = {
      type: token_exports.TokenType.END_TAG,
      tagName,
      tagID: html_exports.getTagID(tagName),
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: createParse5Location(node2)
    };
    state.parser.currentToken = tag;
    state.parser._processToken(state.parser.currentToken);
    if (
      // Current element is closed.
      tagName === state.parser.tokenizer.lastStartTagName && // `<textarea>` and `<title>`
      (state.parser.tokenizer.state === TokenizerMode.RCDATA || // `<iframe>`, `<noembed>`, `<noframes>`, `<style>`, `<xmp>`
      state.parser.tokenizer.state === TokenizerMode.RAWTEXT || // `<script>`
      state.parser.tokenizer.state === TokenizerMode.SCRIPT_DATA)
    ) {
      state.parser.tokenizer.state = TokenizerMode.DATA;
    }
  }
  function documentMode(node2) {
    const head2 = node2.type === "root" ? node2.children[0] : node2;
    return Boolean(
      head2 && (head2.type === "doctype" || head2.type === "element" && head2.tagName.toLowerCase() === "html")
    );
  }
  function createParse5Location(node2) {
    const start = pointStart(node2) || {
      line: void 0,
      column: void 0,
      offset: void 0
    };
    const end = pointEnd(node2) || {
      line: void 0,
      column: void 0,
      offset: void 0
    };
    const location2 = {
      startLine: start.line,
      startCol: start.column,
      startOffset: start.offset,
      endLine: end.line,
      endCol: end.column,
      endOffset: end.offset
    };
    return location2;
  }
  function cloneWithoutChildren(node2) {
    return "children" in node2 ? esm_default({ ...node2, children: [] }) : esm_default(node2);
  }
  var gfmTagfilterExpression, knownMdxNames, parseOptions;
  var init_lib29 = __esm({
    "node_modules/hast-util-raw/lib/index.js"() {
      init_esm();
      init_hast_util_from_parse5();
      init_hast_util_to_parse5();
      init_html_void_elements();
      init_dist();
      init_unist_util_position();
      init_unist_util_visit();
      init_web_namespaces();
      init_zwitch();
      gfmTagfilterExpression = /<(\/?)(iframe|noembed|noframes|plaintext|script|style|textarea|title|xmp)(?=[\t\n\f\r />])/gi;
      knownMdxNames = /* @__PURE__ */ new Set([
        "mdxFlowExpression",
        "mdxJsxFlowElement",
        "mdxJsxTextElement",
        "mdxTextExpression",
        "mdxjsEsm"
      ]);
      parseOptions = { sourceCodeLocationInfo: true, scriptingEnabled: false };
    }
  });

  // node_modules/hast-util-raw/index.js
  var init_hast_util_raw = __esm({
    "node_modules/hast-util-raw/index.js"() {
      init_lib29();
    }
  });

  // node_modules/rehype-raw/lib/index.js
  function rehypeRaw(options) {
    return function(tree, file) {
      const result = (
        /** @type {Root} */
        raw(tree, { ...options, file })
      );
      return result;
    };
  }
  var init_lib30 = __esm({
    "node_modules/rehype-raw/lib/index.js"() {
      init_hast_util_raw();
    }
  });

  // node_modules/rehype-raw/index.js
  var rehype_raw_exports = {};
  __export(rehype_raw_exports, {
    default: () => rehypeRaw
  });
  var init_rehype_raw = __esm({
    "node_modules/rehype-raw/index.js"() {
      init_lib30();
    }
  });

  // node_modules/stringify-entities/lib/core.js
  function core(value, options) {
    value = value.replace(
      options.subset ? charactersToExpressionCached(options.subset) : defaultSubsetRegex,
      basic
    );
    if (options.subset || options.escapeOnly) {
      return value;
    }
    return value.replace(surrogatePairsRegex, surrogate).replace(controlCharactersRegex, basic);
    function surrogate(pair, index2, all6) {
      return options.format(
        (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
        all6.charCodeAt(index2 + 2),
        options
      );
    }
    function basic(character, index2, all6) {
      return options.format(
        character.charCodeAt(0),
        all6.charCodeAt(index2 + 1),
        options
      );
    }
  }
  function charactersToExpressionCached(subset) {
    let cached = subsetToRegexCache.get(subset);
    if (!cached) {
      cached = charactersToExpression(subset);
      subsetToRegexCache.set(subset, cached);
    }
    return cached;
  }
  function charactersToExpression(subset) {
    const groups = [];
    let index2 = -1;
    while (++index2 < subset.length) {
      groups.push(subset[index2].replace(regexEscapeRegex, "\\$&"));
    }
    return new RegExp("(?:" + groups.join("|") + ")", "g");
  }
  var defaultSubsetRegex, surrogatePairsRegex, controlCharactersRegex, regexEscapeRegex, subsetToRegexCache;
  var init_core = __esm({
    "node_modules/stringify-entities/lib/core.js"() {
      defaultSubsetRegex = /["&'<>`]/g;
      surrogatePairsRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      controlCharactersRegex = // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
      /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
      regexEscapeRegex = /[|\\{}()[\]^$+*?.]/g;
      subsetToRegexCache = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/stringify-entities/lib/util/to-hexadecimal.js
  function toHexadecimal(code4, next2, omit) {
    const value = "&#x" + code4.toString(16).toUpperCase();
    return omit && next2 && !hexadecimalRegex.test(String.fromCharCode(next2)) ? value : value + ";";
  }
  var hexadecimalRegex;
  var init_to_hexadecimal = __esm({
    "node_modules/stringify-entities/lib/util/to-hexadecimal.js"() {
      hexadecimalRegex = /[\dA-Fa-f]/;
    }
  });

  // node_modules/stringify-entities/lib/util/to-decimal.js
  function toDecimal(code4, next2, omit) {
    const value = "&#" + String(code4);
    return omit && next2 && !decimalRegex.test(String.fromCharCode(next2)) ? value : value + ";";
  }
  var decimalRegex;
  var init_to_decimal = __esm({
    "node_modules/stringify-entities/lib/util/to-decimal.js"() {
      decimalRegex = /\d/;
    }
  });

  // node_modules/character-entities-legacy/index.js
  var characterEntitiesLegacy;
  var init_character_entities_legacy = __esm({
    "node_modules/character-entities-legacy/index.js"() {
      characterEntitiesLegacy = [
        "AElig",
        "AMP",
        "Aacute",
        "Acirc",
        "Agrave",
        "Aring",
        "Atilde",
        "Auml",
        "COPY",
        "Ccedil",
        "ETH",
        "Eacute",
        "Ecirc",
        "Egrave",
        "Euml",
        "GT",
        "Iacute",
        "Icirc",
        "Igrave",
        "Iuml",
        "LT",
        "Ntilde",
        "Oacute",
        "Ocirc",
        "Ograve",
        "Oslash",
        "Otilde",
        "Ouml",
        "QUOT",
        "REG",
        "THORN",
        "Uacute",
        "Ucirc",
        "Ugrave",
        "Uuml",
        "Yacute",
        "aacute",
        "acirc",
        "acute",
        "aelig",
        "agrave",
        "amp",
        "aring",
        "atilde",
        "auml",
        "brvbar",
        "ccedil",
        "cedil",
        "cent",
        "copy",
        "curren",
        "deg",
        "divide",
        "eacute",
        "ecirc",
        "egrave",
        "eth",
        "euml",
        "frac12",
        "frac14",
        "frac34",
        "gt",
        "iacute",
        "icirc",
        "iexcl",
        "igrave",
        "iquest",
        "iuml",
        "laquo",
        "lt",
        "macr",
        "micro",
        "middot",
        "nbsp",
        "not",
        "ntilde",
        "oacute",
        "ocirc",
        "ograve",
        "ordf",
        "ordm",
        "oslash",
        "otilde",
        "ouml",
        "para",
        "plusmn",
        "pound",
        "quot",
        "raquo",
        "reg",
        "sect",
        "shy",
        "sup1",
        "sup2",
        "sup3",
        "szlig",
        "thorn",
        "times",
        "uacute",
        "ucirc",
        "ugrave",
        "uml",
        "uuml",
        "yacute",
        "yen",
        "yuml"
      ];
    }
  });

  // node_modules/character-entities-html4/index.js
  var characterEntitiesHtml4;
  var init_character_entities_html4 = __esm({
    "node_modules/character-entities-html4/index.js"() {
      characterEntitiesHtml4 = {
        nbsp: "\xA0",
        iexcl: "\xA1",
        cent: "\xA2",
        pound: "\xA3",
        curren: "\xA4",
        yen: "\xA5",
        brvbar: "\xA6",
        sect: "\xA7",
        uml: "\xA8",
        copy: "\xA9",
        ordf: "\xAA",
        laquo: "\xAB",
        not: "\xAC",
        shy: "\xAD",
        reg: "\xAE",
        macr: "\xAF",
        deg: "\xB0",
        plusmn: "\xB1",
        sup2: "\xB2",
        sup3: "\xB3",
        acute: "\xB4",
        micro: "\xB5",
        para: "\xB6",
        middot: "\xB7",
        cedil: "\xB8",
        sup1: "\xB9",
        ordm: "\xBA",
        raquo: "\xBB",
        frac14: "\xBC",
        frac12: "\xBD",
        frac34: "\xBE",
        iquest: "\xBF",
        Agrave: "\xC0",
        Aacute: "\xC1",
        Acirc: "\xC2",
        Atilde: "\xC3",
        Auml: "\xC4",
        Aring: "\xC5",
        AElig: "\xC6",
        Ccedil: "\xC7",
        Egrave: "\xC8",
        Eacute: "\xC9",
        Ecirc: "\xCA",
        Euml: "\xCB",
        Igrave: "\xCC",
        Iacute: "\xCD",
        Icirc: "\xCE",
        Iuml: "\xCF",
        ETH: "\xD0",
        Ntilde: "\xD1",
        Ograve: "\xD2",
        Oacute: "\xD3",
        Ocirc: "\xD4",
        Otilde: "\xD5",
        Ouml: "\xD6",
        times: "\xD7",
        Oslash: "\xD8",
        Ugrave: "\xD9",
        Uacute: "\xDA",
        Ucirc: "\xDB",
        Uuml: "\xDC",
        Yacute: "\xDD",
        THORN: "\xDE",
        szlig: "\xDF",
        agrave: "\xE0",
        aacute: "\xE1",
        acirc: "\xE2",
        atilde: "\xE3",
        auml: "\xE4",
        aring: "\xE5",
        aelig: "\xE6",
        ccedil: "\xE7",
        egrave: "\xE8",
        eacute: "\xE9",
        ecirc: "\xEA",
        euml: "\xEB",
        igrave: "\xEC",
        iacute: "\xED",
        icirc: "\xEE",
        iuml: "\xEF",
        eth: "\xF0",
        ntilde: "\xF1",
        ograve: "\xF2",
        oacute: "\xF3",
        ocirc: "\xF4",
        otilde: "\xF5",
        ouml: "\xF6",
        divide: "\xF7",
        oslash: "\xF8",
        ugrave: "\xF9",
        uacute: "\xFA",
        ucirc: "\xFB",
        uuml: "\xFC",
        yacute: "\xFD",
        thorn: "\xFE",
        yuml: "\xFF",
        fnof: "\u0192",
        Alpha: "\u0391",
        Beta: "\u0392",
        Gamma: "\u0393",
        Delta: "\u0394",
        Epsilon: "\u0395",
        Zeta: "\u0396",
        Eta: "\u0397",
        Theta: "\u0398",
        Iota: "\u0399",
        Kappa: "\u039A",
        Lambda: "\u039B",
        Mu: "\u039C",
        Nu: "\u039D",
        Xi: "\u039E",
        Omicron: "\u039F",
        Pi: "\u03A0",
        Rho: "\u03A1",
        Sigma: "\u03A3",
        Tau: "\u03A4",
        Upsilon: "\u03A5",
        Phi: "\u03A6",
        Chi: "\u03A7",
        Psi: "\u03A8",
        Omega: "\u03A9",
        alpha: "\u03B1",
        beta: "\u03B2",
        gamma: "\u03B3",
        delta: "\u03B4",
        epsilon: "\u03B5",
        zeta: "\u03B6",
        eta: "\u03B7",
        theta: "\u03B8",
        iota: "\u03B9",
        kappa: "\u03BA",
        lambda: "\u03BB",
        mu: "\u03BC",
        nu: "\u03BD",
        xi: "\u03BE",
        omicron: "\u03BF",
        pi: "\u03C0",
        rho: "\u03C1",
        sigmaf: "\u03C2",
        sigma: "\u03C3",
        tau: "\u03C4",
        upsilon: "\u03C5",
        phi: "\u03C6",
        chi: "\u03C7",
        psi: "\u03C8",
        omega: "\u03C9",
        thetasym: "\u03D1",
        upsih: "\u03D2",
        piv: "\u03D6",
        bull: "\u2022",
        hellip: "\u2026",
        prime: "\u2032",
        Prime: "\u2033",
        oline: "\u203E",
        frasl: "\u2044",
        weierp: "\u2118",
        image: "\u2111",
        real: "\u211C",
        trade: "\u2122",
        alefsym: "\u2135",
        larr: "\u2190",
        uarr: "\u2191",
        rarr: "\u2192",
        darr: "\u2193",
        harr: "\u2194",
        crarr: "\u21B5",
        lArr: "\u21D0",
        uArr: "\u21D1",
        rArr: "\u21D2",
        dArr: "\u21D3",
        hArr: "\u21D4",
        forall: "\u2200",
        part: "\u2202",
        exist: "\u2203",
        empty: "\u2205",
        nabla: "\u2207",
        isin: "\u2208",
        notin: "\u2209",
        ni: "\u220B",
        prod: "\u220F",
        sum: "\u2211",
        minus: "\u2212",
        lowast: "\u2217",
        radic: "\u221A",
        prop: "\u221D",
        infin: "\u221E",
        ang: "\u2220",
        and: "\u2227",
        or: "\u2228",
        cap: "\u2229",
        cup: "\u222A",
        int: "\u222B",
        there4: "\u2234",
        sim: "\u223C",
        cong: "\u2245",
        asymp: "\u2248",
        ne: "\u2260",
        equiv: "\u2261",
        le: "\u2264",
        ge: "\u2265",
        sub: "\u2282",
        sup: "\u2283",
        nsub: "\u2284",
        sube: "\u2286",
        supe: "\u2287",
        oplus: "\u2295",
        otimes: "\u2297",
        perp: "\u22A5",
        sdot: "\u22C5",
        lceil: "\u2308",
        rceil: "\u2309",
        lfloor: "\u230A",
        rfloor: "\u230B",
        lang: "\u2329",
        rang: "\u232A",
        loz: "\u25CA",
        spades: "\u2660",
        clubs: "\u2663",
        hearts: "\u2665",
        diams: "\u2666",
        quot: '"',
        amp: "&",
        lt: "<",
        gt: ">",
        OElig: "\u0152",
        oelig: "\u0153",
        Scaron: "\u0160",
        scaron: "\u0161",
        Yuml: "\u0178",
        circ: "\u02C6",
        tilde: "\u02DC",
        ensp: "\u2002",
        emsp: "\u2003",
        thinsp: "\u2009",
        zwnj: "\u200C",
        zwj: "\u200D",
        lrm: "\u200E",
        rlm: "\u200F",
        ndash: "\u2013",
        mdash: "\u2014",
        lsquo: "\u2018",
        rsquo: "\u2019",
        sbquo: "\u201A",
        ldquo: "\u201C",
        rdquo: "\u201D",
        bdquo: "\u201E",
        dagger: "\u2020",
        Dagger: "\u2021",
        permil: "\u2030",
        lsaquo: "\u2039",
        rsaquo: "\u203A",
        euro: "\u20AC"
      };
    }
  });

  // node_modules/stringify-entities/lib/constant/dangerous.js
  var dangerous;
  var init_dangerous = __esm({
    "node_modules/stringify-entities/lib/constant/dangerous.js"() {
      dangerous = [
        "cent",
        "copy",
        "divide",
        "gt",
        "lt",
        "not",
        "para",
        "times"
      ];
    }
  });

  // node_modules/stringify-entities/lib/util/to-named.js
  function toNamed(code4, next2, omit, attribute) {
    const character = String.fromCharCode(code4);
    if (own7.call(characters, character)) {
      const name = characters[character];
      const value = "&" + name;
      if (omit && characterEntitiesLegacy.includes(name) && !dangerous.includes(name) && (!attribute || next2 && next2 !== 61 && notAlphanumericRegex.test(String.fromCharCode(next2)))) {
        return value;
      }
      return value + ";";
    }
    return "";
  }
  var own7, characters, key, notAlphanumericRegex;
  var init_to_named = __esm({
    "node_modules/stringify-entities/lib/util/to-named.js"() {
      init_character_entities_legacy();
      init_character_entities_html4();
      init_dangerous();
      own7 = {}.hasOwnProperty;
      characters = {};
      for (key in characterEntitiesHtml4) {
        if (own7.call(characterEntitiesHtml4, key)) {
          characters[characterEntitiesHtml4[key]] = key;
        }
      }
      notAlphanumericRegex = /[^\dA-Za-z]/;
    }
  });

  // node_modules/stringify-entities/lib/util/format-smart.js
  function formatSmart(code4, next2, options) {
    let numeric = toHexadecimal(code4, next2, options.omitOptionalSemicolons);
    let named;
    if (options.useNamedReferences || options.useShortestReferences) {
      named = toNamed(
        code4,
        next2,
        options.omitOptionalSemicolons,
        options.attribute
      );
    }
    if ((options.useShortestReferences || !named) && options.useShortestReferences) {
      const decimal = toDecimal(code4, next2, options.omitOptionalSemicolons);
      if (decimal.length < numeric.length) {
        numeric = decimal;
      }
    }
    return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
  }
  var init_format_smart = __esm({
    "node_modules/stringify-entities/lib/util/format-smart.js"() {
      init_to_hexadecimal();
      init_to_decimal();
      init_to_named();
    }
  });

  // node_modules/stringify-entities/lib/index.js
  function stringifyEntities(value, options) {
    return core(value, Object.assign({ format: formatSmart }, options));
  }
  var init_lib31 = __esm({
    "node_modules/stringify-entities/lib/index.js"() {
      init_core();
      init_format_smart();
    }
  });

  // node_modules/stringify-entities/index.js
  var init_stringify_entities = __esm({
    "node_modules/stringify-entities/index.js"() {
      init_lib31();
    }
  });

  // node_modules/hast-util-to-html/lib/handle/comment.js
  function comment3(node2, _1, _2, state) {
    return state.settings.bogusComments ? "<?" + stringifyEntities(
      node2.value,
      Object.assign({}, state.settings.characterReferences, {
        subset: bogusCommentEntitySubset
      })
    ) + ">" : "<!--" + node2.value.replace(htmlCommentRegex, encode) + "-->";
    function encode($0) {
      return stringifyEntities(
        $0,
        Object.assign({}, state.settings.characterReferences, {
          subset: commentEntitySubset
        })
      );
    }
  }
  var htmlCommentRegex, bogusCommentEntitySubset, commentEntitySubset;
  var init_comment = __esm({
    "node_modules/hast-util-to-html/lib/handle/comment.js"() {
      init_stringify_entities();
      htmlCommentRegex = /^>|^->|<!--|-->|--!>|<!-$/g;
      bogusCommentEntitySubset = [">"];
      commentEntitySubset = ["<", ">"];
    }
  });

  // node_modules/hast-util-to-html/lib/handle/doctype.js
  function doctype3(_1, _2, _3, state) {
    return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
  }
  var init_doctype2 = __esm({
    "node_modules/hast-util-to-html/lib/handle/doctype.js"() {
    }
  });

  // node_modules/hast-util-whitespace/lib/index.js
  function whitespace(thing) {
    return typeof thing === "object" ? thing.type === "text" ? empty2(thing.value) : false : empty2(thing);
  }
  function empty2(value) {
    return value.replace(re, "") === "";
  }
  var re;
  var init_lib32 = __esm({
    "node_modules/hast-util-whitespace/lib/index.js"() {
      re = /[ \t\n\f\r]/g;
    }
  });

  // node_modules/hast-util-whitespace/index.js
  var init_hast_util_whitespace = __esm({
    "node_modules/hast-util-whitespace/index.js"() {
      init_lib32();
    }
  });

  // node_modules/hast-util-to-html/lib/omission/util/siblings.js
  function siblings(increment2) {
    return sibling;
    function sibling(parent, index2, includeWhitespace) {
      const siblings2 = parent ? parent.children : emptyChildren;
      let offset = (index2 || 0) + increment2;
      let next2 = siblings2[offset];
      if (!includeWhitespace) {
        while (next2 && whitespace(next2)) {
          offset += increment2;
          next2 = siblings2[offset];
        }
      }
      return next2;
    }
  }
  var siblingAfter, siblingBefore, emptyChildren;
  var init_siblings = __esm({
    "node_modules/hast-util-to-html/lib/omission/util/siblings.js"() {
      init_hast_util_whitespace();
      siblingAfter = siblings(1);
      siblingBefore = siblings(-1);
      emptyChildren = [];
    }
  });

  // node_modules/hast-util-to-html/lib/omission/omission.js
  function omission(handlers2) {
    return omit;
    function omit(node2, index2, parent) {
      return own8.call(handlers2, node2.tagName) && handlers2[node2.tagName](node2, index2, parent);
    }
  }
  var own8;
  var init_omission = __esm({
    "node_modules/hast-util-to-html/lib/omission/omission.js"() {
      own8 = {}.hasOwnProperty;
    }
  });

  // node_modules/hast-util-to-html/lib/omission/closing.js
  function headOrColgroupOrCaption(_, index2, parent) {
    const next2 = siblingAfter(parent, index2, true);
    return !next2 || next2.type !== "comment" && !(next2.type === "text" && whitespace(next2.value.charAt(0)));
  }
  function html5(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type !== "comment";
  }
  function body(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type !== "comment";
  }
  function p(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return next2 ? next2.type === "element" && (next2.tagName === "address" || next2.tagName === "article" || next2.tagName === "aside" || next2.tagName === "blockquote" || next2.tagName === "details" || next2.tagName === "div" || next2.tagName === "dl" || next2.tagName === "fieldset" || next2.tagName === "figcaption" || next2.tagName === "figure" || next2.tagName === "footer" || next2.tagName === "form" || next2.tagName === "h1" || next2.tagName === "h2" || next2.tagName === "h3" || next2.tagName === "h4" || next2.tagName === "h5" || next2.tagName === "h6" || next2.tagName === "header" || next2.tagName === "hgroup" || next2.tagName === "hr" || next2.tagName === "main" || next2.tagName === "menu" || next2.tagName === "nav" || next2.tagName === "ol" || next2.tagName === "p" || next2.tagName === "pre" || next2.tagName === "section" || next2.tagName === "table" || next2.tagName === "ul") : !parent || // Confusing parent.
    !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
  }
  function li(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && next2.tagName === "li";
  }
  function dt(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return Boolean(
      next2 && next2.type === "element" && (next2.tagName === "dt" || next2.tagName === "dd")
    );
  }
  function dd(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && (next2.tagName === "dt" || next2.tagName === "dd");
  }
  function rubyElement(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && (next2.tagName === "rp" || next2.tagName === "rt");
  }
  function optgroup(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && next2.tagName === "optgroup";
  }
  function option(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && (next2.tagName === "option" || next2.tagName === "optgroup");
  }
  function thead(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return Boolean(
      next2 && next2.type === "element" && (next2.tagName === "tbody" || next2.tagName === "tfoot")
    );
  }
  function tbody(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && (next2.tagName === "tbody" || next2.tagName === "tfoot");
  }
  function tfoot(_, index2, parent) {
    return !siblingAfter(parent, index2);
  }
  function tr(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && next2.tagName === "tr";
  }
  function cells(_, index2, parent) {
    const next2 = siblingAfter(parent, index2);
    return !next2 || next2.type === "element" && (next2.tagName === "td" || next2.tagName === "th");
  }
  var closing;
  var init_closing = __esm({
    "node_modules/hast-util-to-html/lib/omission/closing.js"() {
      init_hast_util_whitespace();
      init_siblings();
      init_omission();
      closing = omission({
        body,
        caption: headOrColgroupOrCaption,
        colgroup: headOrColgroupOrCaption,
        dd,
        dt,
        head: headOrColgroupOrCaption,
        html: html5,
        li,
        optgroup,
        option,
        p,
        rp: rubyElement,
        rt: rubyElement,
        tbody,
        td: cells,
        tfoot,
        th: cells,
        thead,
        tr
      });
    }
  });

  // node_modules/hast-util-to-html/lib/omission/opening.js
  function html6(node2) {
    const head2 = siblingAfter(node2, -1);
    return !head2 || head2.type !== "comment";
  }
  function head(node2) {
    const seen = /* @__PURE__ */ new Set();
    for (const child2 of node2.children) {
      if (child2.type === "element" && (child2.tagName === "base" || child2.tagName === "title")) {
        if (seen.has(child2.tagName)) return false;
        seen.add(child2.tagName);
      }
    }
    const child = node2.children[0];
    return !child || child.type === "element";
  }
  function body2(node2) {
    const head2 = siblingAfter(node2, -1, true);
    return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
  }
  function colgroup(node2, index2, parent) {
    const previous3 = siblingBefore(parent, index2);
    const head2 = siblingAfter(node2, -1, true);
    if (parent && previous3 && previous3.type === "element" && previous3.tagName === "colgroup" && closing(previous3, parent.children.indexOf(previous3), parent)) {
      return false;
    }
    return Boolean(head2 && head2.type === "element" && head2.tagName === "col");
  }
  function tbody2(node2, index2, parent) {
    const previous3 = siblingBefore(parent, index2);
    const head2 = siblingAfter(node2, -1);
    if (parent && previous3 && previous3.type === "element" && (previous3.tagName === "thead" || previous3.tagName === "tbody") && closing(previous3, parent.children.indexOf(previous3), parent)) {
      return false;
    }
    return Boolean(head2 && head2.type === "element" && head2.tagName === "tr");
  }
  var opening;
  var init_opening = __esm({
    "node_modules/hast-util-to-html/lib/omission/opening.js"() {
      init_hast_util_whitespace();
      init_siblings();
      init_closing();
      init_omission();
      opening = omission({
        body: body2,
        colgroup,
        head,
        html: html6,
        tbody: tbody2
      });
    }
  });

  // node_modules/hast-util-to-html/lib/handle/element.js
  function element5(node2, index2, parent, state) {
    const schema = state.schema;
    const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
    let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node2.tagName.toLowerCase());
    const parts = [];
    let last;
    if (schema.space === "html" && node2.tagName === "svg") {
      state.schema = svg2;
    }
    const attributes = serializeAttributes(state, node2.properties);
    const content3 = state.all(
      schema.space === "html" && node2.tagName === "template" ? node2.content : node2
    );
    state.schema = schema;
    if (content3) selfClosing = false;
    if (attributes || !omit || !opening(node2, index2, parent)) {
      parts.push("<", node2.tagName, attributes ? " " + attributes : "");
      if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
        last = attributes.charAt(attributes.length - 1);
        if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
          parts.push(" ");
        }
        parts.push("/");
      }
      parts.push(">");
    }
    parts.push(content3);
    if (!selfClosing && (!omit || !closing(node2, index2, parent))) {
      parts.push("</" + node2.tagName + ">");
    }
    return parts.join("");
  }
  function serializeAttributes(state, properties) {
    const values = [];
    let index2 = -1;
    let key2;
    if (properties) {
      for (key2 in properties) {
        if (properties[key2] !== null && properties[key2] !== void 0) {
          const value = serializeAttribute(state, key2, properties[key2]);
          if (value) values.push(value);
        }
      }
    }
    while (++index2 < values.length) {
      const last = state.settings.tightAttributes ? values[index2].charAt(values[index2].length - 1) : void 0;
      if (index2 !== values.length - 1 && last !== '"' && last !== "'") {
        values[index2] += " ";
      }
    }
    return values.join("");
  }
  function serializeAttribute(state, key2, value) {
    const info = find(state.schema, key2);
    const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
    const y = state.settings.allowDangerousCharacters ? 0 : 1;
    let quote = state.quote;
    let result;
    if (info.overloadedBoolean && (value === info.attribute || value === "")) {
      value = true;
    } else if ((info.boolean || info.overloadedBoolean) && (typeof value !== "string" || value === info.attribute || value === "")) {
      value = Boolean(value);
    }
    if (value === null || value === void 0 || value === false || typeof value === "number" && Number.isNaN(value)) {
      return "";
    }
    const name = stringifyEntities(
      info.attribute,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: constants.name[x][y]
      })
    );
    if (value === true) return name;
    value = Array.isArray(value) ? (info.commaSeparated ? stringify : stringify2)(value, {
      padLeft: !state.settings.tightCommaSeparatedLists
    }) : String(value);
    if (state.settings.collapseEmptyAttributes && !value) return name;
    if (state.settings.preferUnquoted) {
      result = stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
          attribute: true,
          subset: constants.unquoted[x][y]
        })
      );
    }
    if (result !== value) {
      if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
        quote = state.alternative;
      }
      result = quote + stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
          // Always encode without parse errors in non-HTML.
          subset: (quote === "'" ? constants.single : constants.double)[x][y],
          attribute: true
        })
      ) + quote;
    }
    return name + (result ? "=" + result : result);
  }
  var constants;
  var init_element = __esm({
    "node_modules/hast-util-to-html/lib/handle/element.js"() {
      init_ccount();
      init_comma_separated_tokens();
      init_property_information();
      init_space_separated_tokens();
      init_stringify_entities();
      init_closing();
      init_opening();
      constants = {
        // See: <https://html.spec.whatwg.org/#attribute-name-state>.
        name: [
          ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
          [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
        ],
        // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
        unquoted: [
          ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
          ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
        ],
        // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
        single: [
          ["&'".split(""), "\"&'`".split("")],
          ["\0&'".split(""), "\0\"&'`".split("")]
        ],
        // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
        double: [
          ['"&'.split(""), "\"&'`".split("")],
          ['\0"&'.split(""), "\0\"&'`".split("")]
        ]
      };
    }
  });

  // node_modules/hast-util-to-html/lib/handle/text.js
  function text8(node2, _, parent, state) {
    return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node2.value : stringifyEntities(
      node2.value,
      Object.assign({}, state.settings.characterReferences, {
        subset: textEntitySubset
      })
    );
  }
  var textEntitySubset;
  var init_text4 = __esm({
    "node_modules/hast-util-to-html/lib/handle/text.js"() {
      init_stringify_entities();
      textEntitySubset = ["<", "&"];
    }
  });

  // node_modules/hast-util-to-html/lib/handle/raw.js
  function raw2(node2, index2, parent, state) {
    return state.settings.allowDangerousHtml ? node2.value : text8(node2, index2, parent, state);
  }
  var init_raw = __esm({
    "node_modules/hast-util-to-html/lib/handle/raw.js"() {
      init_text4();
    }
  });

  // node_modules/hast-util-to-html/lib/handle/root.js
  function root5(node2, _1, _2, state) {
    return state.all(node2);
  }
  var init_root3 = __esm({
    "node_modules/hast-util-to-html/lib/handle/root.js"() {
    }
  });

  // node_modules/hast-util-to-html/lib/handle/index.js
  function invalid(node2) {
    throw new Error("Expected node, not `" + node2 + "`");
  }
  function unknown2(node_) {
    const node2 = (
      /** @type {Nodes} */
      node_
    );
    throw new Error("Cannot compile unknown node `" + node2.type + "`");
  }
  var handle2;
  var init_handle2 = __esm({
    "node_modules/hast-util-to-html/lib/handle/index.js"() {
      init_zwitch();
      init_comment();
      init_doctype2();
      init_element();
      init_raw();
      init_root3();
      init_text4();
      handle2 = zwitch("type", {
        invalid,
        unknown: unknown2,
        handlers: { comment: comment3, doctype: doctype3, element: element5, raw: raw2, root: root5, text: text8 }
      });
    }
  });

  // node_modules/hast-util-to-html/lib/index.js
  function toHtml(tree, options) {
    const options_ = options || emptyOptions5;
    const quote = options_.quote || '"';
    const alternative = quote === '"' ? "'" : '"';
    if (quote !== '"' && quote !== "'") {
      throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
    }
    const state = {
      one: one4,
      all: all5,
      settings: {
        omitOptionalTags: options_.omitOptionalTags || false,
        allowParseErrors: options_.allowParseErrors || false,
        allowDangerousCharacters: options_.allowDangerousCharacters || false,
        quoteSmart: options_.quoteSmart || false,
        preferUnquoted: options_.preferUnquoted || false,
        tightAttributes: options_.tightAttributes || false,
        upperDoctype: options_.upperDoctype || false,
        tightDoctype: options_.tightDoctype || false,
        bogusComments: options_.bogusComments || false,
        tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
        tightSelfClosing: options_.tightSelfClosing || false,
        collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
        allowDangerousHtml: options_.allowDangerousHtml || false,
        voids: options_.voids || htmlVoidElements,
        characterReferences: options_.characterReferences || emptyCharacterReferences,
        closeSelfClosing: options_.closeSelfClosing || false,
        closeEmptyElements: options_.closeEmptyElements || false
      },
      schema: options_.space === "svg" ? svg2 : html4,
      quote,
      alternative
    };
    return state.one(
      Array.isArray(tree) ? { type: "root", children: tree } : tree,
      void 0,
      void 0
    );
  }
  function one4(node2, index2, parent) {
    return handle2(node2, index2, parent, this);
  }
  function all5(parent) {
    const results = [];
    const children = parent && parent.children || emptyChildren2;
    let index2 = -1;
    while (++index2 < children.length) {
      results[index2] = this.one(children[index2], index2, parent);
    }
    return results.join("");
  }
  var emptyOptions5, emptyCharacterReferences, emptyChildren2;
  var init_lib33 = __esm({
    "node_modules/hast-util-to-html/lib/index.js"() {
      init_html_void_elements();
      init_property_information();
      init_handle2();
      emptyOptions5 = {};
      emptyCharacterReferences = {};
      emptyChildren2 = [];
    }
  });

  // node_modules/hast-util-to-html/index.js
  var init_hast_util_to_html = __esm({
    "node_modules/hast-util-to-html/index.js"() {
      init_lib33();
    }
  });

  // node_modules/rehype-stringify/lib/index.js
  function rehypeStringify(options) {
    const self2 = this;
    const settings = { ...self2.data("settings"), ...options };
    self2.compiler = compiler2;
    function compiler2(tree) {
      return toHtml(tree, settings);
    }
  }
  var init_lib34 = __esm({
    "node_modules/rehype-stringify/lib/index.js"() {
      init_hast_util_to_html();
    }
  });

  // node_modules/rehype-stringify/index.js
  var rehype_stringify_exports = {};
  __export(rehype_stringify_exports, {
    default: () => rehypeStringify
  });
  var init_rehype_stringify = __esm({
    "node_modules/rehype-stringify/index.js"() {
      init_lib34();
    }
  });

  // src/unified-renderer.js
  var require_unified_renderer = __commonJS({
    "src/unified-renderer.js"(exports, module) {
      var { unified: unified2 } = (init_unified(), __toCommonJS(unified_exports));
      var remarkParse2 = (init_remark_parse(), __toCommonJS(remark_parse_exports)).default || (init_remark_parse(), __toCommonJS(remark_parse_exports));
      var remarkGfm2 = (init_remark_gfm(), __toCommonJS(remark_gfm_exports)).default || (init_remark_gfm(), __toCommonJS(remark_gfm_exports));
      var remarkRehype2 = (init_remark_rehype(), __toCommonJS(remark_rehype_exports)).default || (init_remark_rehype(), __toCommonJS(remark_rehype_exports));
      var rehypeRaw2 = (init_rehype_raw(), __toCommonJS(rehype_raw_exports)).default || (init_rehype_raw(), __toCommonJS(rehype_raw_exports));
      var rehypeStringify2 = (init_rehype_stringify(), __toCommonJS(rehype_stringify_exports)).default || (init_rehype_stringify(), __toCommonJS(rehype_stringify_exports));
      var { visit: visit2 } = (init_unist_util_visit(), __toCommonJS(unist_util_visit_exports));
      function remarkSourceLine() {
        return (tree) => {
          visit2(tree, (node2) => {
            if (node2.position && node2.position.start && node2.data === void 0) {
              node2.data = {};
            }
            if (node2.position && node2.position.start) {
              node2.data.hProperties = node2.data.hProperties || {};
              node2.data.hProperties["data-source-line"] = String(node2.position.start.line);
            }
          });
        };
      }
      function guardMathBlocks(content3) {
        const placeholders = [];
        let result = "";
        let i = 0;
        const len = content3.length;
        let inBacktick = false;
        let inDoubleBacktick = false;
        let inCodeBlock = false;
        let codeFenceCount = 0;
        let inCodeTag = false;
        while (i < len) {
          if (content3[i] === "`") {
            let btCount = 1;
            while (i + btCount < len && content3[i + btCount] === "`") btCount++;
            if (btCount >= 3) {
              if (!inCodeBlock) {
                inCodeBlock = true;
                codeFenceCount = btCount;
                result += content3.substring(i, i + btCount);
                i += btCount;
                continue;
              } else if (btCount >= codeFenceCount) {
                inCodeBlock = false;
                result += content3.substring(i, i + btCount);
                i += btCount;
                continue;
              }
            }
          }
          if (inCodeBlock) {
            result += content3[i];
            i++;
            continue;
          }
          if (content3[i] === "`" && content3[i + 1] === "`" && (i + 2 >= len || content3[i + 2] !== "`")) {
            inDoubleBacktick = !inDoubleBacktick;
            result += "``";
            i += 2;
            continue;
          }
          const inAnyCode = inBacktick || inDoubleBacktick;
          if (!inAnyCode) {
            if (content3.substring(i, i + 6) === "<code>") {
              inCodeTag = true;
              result += "<code>";
              i += 6;
              continue;
            }
            if (content3.substring(i, i + 7) === "</code>") {
              inCodeTag = false;
              result += "</code>";
              i += 7;
              continue;
            }
          }
          if (inCodeTag) {
            result += content3[i];
            i++;
            continue;
          }
          if (inDoubleBacktick) {
            result += content3[i];
            i++;
            continue;
          }
          if (content3[i] === "`") {
            inBacktick = !inBacktick;
            result += content3[i];
            i++;
            continue;
          }
          if (content3[i] === "$" && i + 1 < len && content3[i + 1] === "$") {
            const atLineStart = i === 0 || content3[i - 1] === "\n" || content3[i - 1] === "\r";
            if (!atLineStart) {
              result += content3[i];
              i++;
              continue;
            }
            const start = i;
            const lineNum = content3.substring(0, start).split("\n").length;
            i += 2;
            let foundEnd = false;
            while (i + 1 < len) {
              if (content3[i] === "$" && content3[i + 1] === "$") {
                i += 2;
                const mathBlock = content3.substring(start, i);
                const idx = placeholders.length;
                placeholders.push({ text: mathBlock, line: lineNum, display: true });
                const mathContent = content3.substring(start, i);
                const newlineCount = (mathContent.match(/\n/g) || []).length;
                result += '<div class="math-placeholder" data-math-idx="' + idx + '" data-source-line="' + lineNum + '"></div>';
                for (let n = 0; n < newlineCount; n++) {
                  result += "\n";
                }
                foundEnd = true;
                break;
              }
              i++;
            }
            if (!foundEnd) {
              result += content3.substring(start, i);
            }
          } else if (!inBacktick && content3[i] === "$" && i + 1 < len && content3[i + 1] !== " " && content3[i + 1] !== "\n" && content3[i + 1] !== "$") {
            const start = i;
            i += 1;
            let foundEnd = false;
            while (i < len) {
              if (content3[i] === "$" && (i === start + 1 || content3[i - 1] !== " ")) {
                i += 1;
                const mathBlock = content3.substring(start, i);
                const idx = placeholders.length;
                placeholders.push({ text: mathBlock, display: false });
                result += "<!--MATHBLOCK_" + idx + "-->";
                foundEnd = true;
                break;
              }
              i++;
            }
            if (!foundEnd) {
              result += content3.substring(start, i);
            }
          } else {
            result += content3[i];
            i++;
          }
        }
        return { content: result, placeholders };
      }
      function getAlertType(line) {
        const lower = line.toLowerCase();
        if (lower.startsWith("> [!info]") || lower.startsWith("> [!note]")) return "note";
        if (lower.startsWith("> [!tip]")) return "tip";
        if (lower.startsWith("> [!important]")) return "important";
        if (lower.startsWith("> [!warning]")) return "warning";
        if (lower.startsWith("> [!caution]")) return "caution";
        return null;
      }
      function getAlertTitleHTML(type) {
        const icons = {
          note: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="8" y1="7" x2="8" y2="11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5" r="0.8" fill="currentColor"/></svg>',
          tip: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5c-2.5 0-4.5 2-4.5 4.5 0 1.8 1 3 2.2 3.8.3.2.3.5.3.8v1.4h4v-1.4c0-.3.1-.6.3-.8 1.2-.8 2.2-2 2.2-3.8 0-2.5-2-4.5-4.5-4.5z" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="6" y1="14" x2="10" y2="14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
          important: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6.5" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>',
          warning: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><path d="M8 1.5L1.5 13.5h13L8 1.5z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><line x1="8" y1="6" x2="8" y2="9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r="0.7" fill="currentColor"/></svg>',
          caution: '<svg class="alert-icon" viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.3"/><line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="10.5" r="0.8" fill="currentColor"/></svg>'
        };
        const titles = { note: "Note", tip: "Tip", important: "Important", warning: "Warning", caution: "Caution" };
        return '<div class="alert-title">' + (icons[type] || "") + (titles[type] || type) + "</div>";
      }
      function convertAlerts(content3) {
        const lines = content3.split("\n");
        const result = [];
        const alertBlocks = [];
        let i = 0;
        while (i < lines.length) {
          const line = lines[i];
          const alertType = getAlertType(line);
          if (alertType) {
            const contentLines = [];
            i++;
            while (i < lines.length && lines[i].startsWith(">")) {
              let stripped = lines[i];
              if (stripped.startsWith("> ")) stripped = stripped.substring(2);
              else if (stripped.startsWith(">")) stripped = stripped.substring(1);
              contentLines.push(stripped);
              i++;
            }
            const idx = alertBlocks.length;
            alertBlocks.push({ type: alertType, content: contentLines.join("\n") });
            if (contentLines.length > 0) {
              contentLines[contentLines.length - 1] += "<!--ALERTBLOCK_" + idx + "_END-->";
            }
            result.push("<!--ALERTBLOCK_" + idx + "-->");
            result.push(contentLines.join("\n"));
          } else {
            result.push(line);
            i++;
          }
        }
        return { content: result.join("\n"), alertBlocks };
      }
      function restoreAlerts(html7, alertBlocks) {
        if (alertBlocks.length === 0) return html7;
        let result = html7;
        for (let idx = alertBlocks.length - 1; idx >= 0; idx--) {
          const block = alertBlocks[idx];
          const startMarker = "<!--ALERTBLOCK_" + idx + "-->";
          const endMarker = "<!--ALERTBLOCK_" + idx + "_END-->";
          const startPos = result.indexOf(startMarker);
          const endPos = result.indexOf(endMarker);
          if (startPos !== -1 && endPos !== -1) {
            const before = result.substring(0, startPos);
            const inner = result.substring(startPos + startMarker.length, endPos);
            const after = result.substring(endPos + endMarker.length);
            const titleHTML = getAlertTitleHTML(block.type);
            result = before + '<div class="alert alert-' + block.type + '">' + titleHTML + '<div class="alert-content">' + inner + "</div></div>" + after;
          }
        }
        return result;
      }
      function convertDefLists(content3) {
        const lines = content3.split("\n");
        const result = [];
        let i = 0;
        while (i < lines.length) {
          const line = lines[i];
          const trimmed = line.trim();
          if (i + 1 < lines.length) {
            const next2 = lines[i + 1];
            if ((next2.startsWith(": ") || next2 === ":") && trimmed !== "" && !trimmed.startsWith("#") && !trimmed.startsWith("-") && !trimmed.startsWith("*") && !trimmed.startsWith(">") && !trimmed.startsWith("|") && !trimmed.startsWith("`") && !trimmed.startsWith("[") && !trimmed.startsWith("<") && !trimmed.startsWith("!")) {
              const dlLine = i + 1;
              const firstIdx = result.length;
              while (i < lines.length && !lines[i].trim().startsWith("#") && !lines[i].trim().startsWith(">") && lines[i].trim() !== "" && !lines[i].trim().startsWith("|") && !lines[i].trim().startsWith("`")) {
                const termLine = i + 1;
                const term = lines[i];
                result.push('<dt data-source-line="' + termLine + '">' + term + "</dt>");
                i++;
                while (i < lines.length && (lines[i].startsWith(": ") || lines[i] === ":")) {
                  const defLine = i + 1;
                  let def = lines[i];
                  if (def.startsWith(": ")) def = def.substring(2);
                  else if (def === ":") def = "";
                  result.push('<dd data-source-line="' + defLine + '">' + def + "</dd>");
                  i++;
                }
              }
              if (result.length > firstIdx) {
                result[firstIdx] = '<dl data-source-line="' + dlLine + '">' + result[firstIdx];
                result[result.length - 1] += "</dl>";
              }
              continue;
            }
          }
          result.push(line);
          i++;
        }
        return result.join("\n");
      }
      function extractAbbreviations(content3) {
        const abbrs = [];
        const lines = content3.split("\n");
        const result = [];
        for (const line of lines) {
          if (line.startsWith("*[")) {
            const bracketEnd = line.indexOf("]: ");
            if (bracketEnd !== -1) {
              const term = line.substring(2, bracketEnd);
              const def = line.substring(bracketEnd + 3);
              if (term.trim() !== "") {
                abbrs.push([term, def]);
              }
              result.push("");
              continue;
            }
          }
          result.push(line);
        }
        return { content: result.join("\n"), abbreviations: abbrs };
      }
      function escapeHTML(s2) {
        return s2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
      }
      function restoreMathBlocks(html7, placeholders) {
        let result = html7;
        for (let idx = 0; idx < placeholders.length; idx++) {
          const ph = placeholders[idx];
          const text9 = typeof ph === "string" ? ph : ph.text;
          const escaped = escapeHTML(text9);
          if (ph.display) {
            const marker = '<div class="math-placeholder" data-math-idx="' + idx + '" data-source-line="' + ph.line + '"></div>';
            const wrapped = '<span class="math-display" data-source-line="' + ph.line + '">' + escaped + "</span>";
            result = result.split(marker).join(wrapped);
          } else {
            const marker = "<!--MATHBLOCK_" + idx + "-->";
            result = result.split(marker).join(escaped);
          }
        }
        return result;
      }
      function sanitizeHTML(html7) {
        const dangerousTags = ["script", "style", "iframe", "object", "embed", "form", "textarea", "select", "button", "link", "meta", "base"];
        let result = "";
        let i = 0;
        const len = html7.length;
        while (i < len) {
          if (html7[i] === "<" && i + 1 < len) {
            if (html7[i + 1] === "/") {
              let end = html7.indexOf(">", i);
              if (end === -1) {
                result += html7[i];
                i++;
                continue;
              }
              let inner = html7.substring(i + 2, end);
              let tagName = inner.split(/\s/)[0].toLowerCase();
              if (dangerousTags.includes(tagName)) {
                i = end + 1;
                continue;
              }
              result += html7.substring(i, end + 1);
              i = end + 1;
            } else if (html7[i + 1] === "!") {
              if (html7.substring(i, i + 4) === "<!--" && html7.indexOf("-->", i) !== -1) {
                let end = html7.indexOf("-->", i) + 3;
                result += html7.substring(i, end);
                i = end;
              } else {
                let end = html7.indexOf(">", i);
                if (end === -1) {
                  result += html7[i];
                  i++;
                  continue;
                }
                result += html7.substring(i, end + 1);
                i = end + 1;
              }
            } else {
              let end = html7.indexOf(">", i);
              if (end === -1) {
                result += html7[i];
                i++;
                continue;
              }
              let inner = html7.substring(i + 1, end);
              let tagName = inner.split(/\s/)[0].toLowerCase();
              if (dangerousTags.includes(tagName)) {
                i = end + 1;
                continue;
              }
              let sanitizedTag = sanitizeTagAttributes(tagName, inner);
              result += "<" + sanitizedTag + ">";
              i = end + 1;
            }
          } else {
            result += html7[i];
            i++;
          }
        }
        return result;
      }
      function sanitizeTagAttributes(tagName, inner) {
        let attrs = inner.substring(tagName.length);
        let cleaned = "";
        let j = 0;
        while (j < attrs.length) {
          while (j < attrs.length && /\s/.test(attrs[j])) {
            cleaned += attrs[j];
            j++;
          }
          if (j >= attrs.length) break;
          let nameStart = j;
          while (j < attrs.length && attrs[j] !== "=" && !/\s/.test(attrs[j])) j++;
          let attrName = attrs.substring(nameStart, j).toLowerCase();
          if (j < attrs.length && attrs[j] === "=") {
            j++;
            let valueStart = j;
            if (j < attrs.length && (attrs[j] === '"' || attrs[j] === "'")) {
              let quote = attrs[j];
              j++;
              while (j < attrs.length && attrs[j] !== quote) j++;
              j++;
            } else {
              while (j < attrs.length && !/\s/.test(attrs[j])) j++;
            }
            let raw3 = attrs.substring(nameStart, j);
            if (attrName.startsWith("on") || /javascript:/i.test(raw3)) {
              continue;
            }
            cleaned += raw3;
          } else {
            let raw3 = attrs.substring(nameStart, j);
            if (attrName.startsWith("on") || /javascript:/i.test(raw3)) {
              continue;
            }
            cleaned += raw3;
          }
        }
        return tagName + cleaned;
      }
      function embedAbbrData(html7, abbreviations) {
        if (abbreviations.length === 0) return html7;
        const json = JSON.stringify(abbreviations).replace(/'/g, "&#x27;");
        return html7 + `<div id="abbr-data" style="display:none" data-abbrs='` + json + "'></div>";
      }
      function renderMarkdown(content3) {
        content3 = content3.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
        const abbrResult = extractAbbreviations(content3);
        const abbreviations = abbrResult.abbreviations;
        const mathResult = guardMathBlocks(abbrResult.content);
        const placeholders = mathResult.placeholders;
        const alertResult = convertAlerts(mathResult.content);
        const alertBlocks = alertResult.alertBlocks;
        let processed = convertDefLists(alertResult.content);
        let html7;
        try {
          html7 = unified2().use(remarkParse2).use(remarkGfm2).use(remarkSourceLine).use(remarkRehype2, { allowDangerousHtml: true }).use(rehypeRaw2).use(rehypeStringify2, { allowDangerousHtml: true }).processSync(processed).toString();
        } catch (e) {
          console.error("Unified rendering error:", e);
          return "<pre>" + escapeHTML(content3) + "</pre>";
        }
        html7 = restoreMathBlocks(html7, placeholders);
        html7 = restoreAlerts(html7, alertBlocks);
        html7 = sanitizeHTML(html7);
        html7 = embedAbbrData(html7, abbreviations);
        return html7;
      }
      if (typeof module !== "undefined" && module.exports) {
        module.exports = { renderMarkdown };
      }
      return { renderMarkdown };
    }
  });
  return require_unified_renderer();
})();
