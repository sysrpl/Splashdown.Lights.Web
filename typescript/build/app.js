var Key;
(function (Key) {
    Key[Key["Backspace"] = 8] = "Backspace";
    Key[Key["Tab"] = 9] = "Tab";
    Key[Key["Enter"] = 13] = "Enter";
    Key[Key["Shift"] = 16] = "Shift";
    Key[Key["Ctrl"] = 17] = "Ctrl";
    Key[Key["Alt"] = 18] = "Alt";
    Key[Key["Pause"] = 19] = "Pause";
    Key[Key["CapsLock"] = 20] = "CapsLock";
    Key[Key["Escape"] = 27] = "Escape";
    Key[Key["Space"] = 32] = "Space";
    Key[Key["PageUp"] = 33] = "PageUp";
    Key[Key["PageDown"] = 34] = "PageDown";
    Key[Key["Left"] = 37] = "Left";
    Key[Key["Up"] = 38] = "Up";
    Key[Key["Right"] = 39] = "Right";
    Key[Key["Down"] = 40] = "Down";
    Key[Key["Insert"] = 45] = "Insert";
    Key[Key["Delete"] = 46] = "Delete";
    Key[Key["F1"] = 112] = "F1";
    Key[Key["F2"] = 113] = "F2";
    Key[Key["F3"] = 114] = "F3";
    Key[Key["F4"] = 115] = "F4";
    Key[Key["F5"] = 116] = "F5";
    Key[Key["F7"] = 117] = "F7";
    Key[Key["F8"] = 118] = "F8";
    Key[Key["F9"] = 119] = "F9";
    Key[Key["F10"] = 120] = "F10";
    Key[Key["F11"] = 121] = "F11";
    Key[Key["F12"] = 122] = "F12";
})(Key || (Key = {}));
Array.prototype.contains = function (value) {
    return this.indexOf(value) > -1;
};
Array.prototype.shuffle = function () {
    var index = this.length, rand = 0;
    var temp;
    while (index != 0) {
        rand = Math.floor(Math.random() * index);
        index -= 1;
        temp = this[index];
        this[index] = this[rand];
        this[rand] = temp;
    }
};
Array.prototype.__defineGetter__("first", function () {
    return this[0];
});
Date.prototype.addMinutes = function (minutes) {
    return new Date(this.getTime() + minutes * 60000);
};
Date.prototype.addHours = function (hours) {
    return new Date(this.getTime() + hours * 60 * 60000);
};
Date.prototype.addDays = function (days) {
    return new Date(this.getTime() + days * 24 * 60 * 60000);
};
function isDefined(obj) {
    return obj !== undefined && obj !== null;
}
function isUndefined(obj) {
    return obj === undefined || obj === null;
}
function isMobile() {
    return isDefined(window.orientation);
}
function isDesktop() {
    return isUndefined(window.orientation);
}
function getDefault(obj, defaultValue) {
    return isDefined(obj) ? obj : defaultValue;
}
function isArray(obj) {
    return Array.isArray(obj);
}
function isBoolean(obj) {
    return typeof (obj) === "boolean" || obj instanceof Boolean;
}
function isString(obj) {
    return typeof (obj) === "string" || obj instanceof String;
}
function isNumber(obj) {
    var result = typeof obj === "number" || obj instanceof Number;
    if (result)
        result = obj != Number.NaN;
    return result;
}
function isTypeOf(obj, type) {
    var t = type;
    if (t.name === "String")
        return isString(obj);
    if (t.name === "Number")
        return isNumber(obj);
    if (t.name === "Boolean")
        return isBoolean(obj);
    return obj instanceof type;
}
function tryParseInt(value, defaultValue) {
    var n = parseInt(value);
    return isNumber(n) ? [true, n] : [false, isNumber(defaultValue) ? defaultValue : 0];
}
function navigate(url) {
    location.href = url;
}
function shortDelay(proc) {
    window.setTimeout(proc, 10);
}
function initTouch() {
    function translateTouchMove(event) {
        var touch = event.changedTouches[0];
        var mouseEvent = document.createEvent("MouseEvent");
        mouseEvent.initMouseEvent("mousemover", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(mouseEvent);
        mouseEvent.initMouseEvent("mousemove", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        touch.target.dispatchEvent(mouseEvent);
        event.preventDefault();
    }
    document.addEventListener("touchmove", translateTouchMove, true);
}
function baseUrl() {
    var proto = window.location.protocol || document.location.protocol;
    var port = location.port;
    if (port.length)
        port = ":" + port;
    return proto + "//" + document.domain + port;
}
function webPrefix() {
    var styles = window.getComputedStyle(document.documentElement, "");
    return (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1];
}
function addCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + (days * millisecondsPerDay));
        expires = "; expires=" + date.toUTCString();
    }
    else
        expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function removeCookie(name) {
    addCookie(name, "", -1);
}
function readCookie(name) {
    name += "=";
    var cookies = document.cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie = cookies_1[_i];
        cookie = cookie.trim();
        if (cookie.indexOf(name) == 0)
            return cookie.substring(name.length, cookie.length);
    }
    return undefined;
}
HTMLElement.prototype.clearChildren = function (keep) {
    var items = [];
    if (keep)
        items = this.getAll(keep);
    this.innerHTML = "";
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        this.appendChild(item);
    }
};
HTMLElement.prototype.nthElementChild = function (index) {
    var element = this.firstElementChild;
    while (index > 0) {
        index--;
        element = element.nextElementSibling;
        if (element == undefined)
            return element;
    }
    return element;
};
HTMLElement.prototype.hasClass = function (value) {
    return this.classList.contains(value);
};
HTMLElement.prototype.addClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    (_a = this.classList).add.apply(_a, value);
    return this;
    var _a;
};
HTMLElement.prototype.removeClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    (_a = this.classList).remove.apply(_a, value);
    return this;
    var _a;
};
HTMLElement.prototype.reapplyClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    (_a = this.classList).remove.apply(_a, value);
    var me = this;
    shortDelay(function () {
        return (_a = me.classList).add.apply(_a, value);
        var _a;
    });
    return this;
    var _a;
};
HTMLElement.prototype.toggleClass = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    for (var _a = 0, value_1 = value; _a < value_1.length; _a++) {
        var item = value_1[_a];
        this.classList.toggle(item);
    }
    return this;
};
HTMLElement.prototype.hide = function () {
    setStyle(this, { display: "none" });
};
HTMLElement.prototype.show = function () {
    removeStyle(this, "display");
};
HTMLElement.prototype.mapPoint = function (event) {
    var rect = this.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
};
HTMLElement.prototype.__defineGetter__("bounds", function () {
    var rect = this.getBoundingClientRect();
    return { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
});
function getInput(query) {
    return get(query);
}
function executeScripts(element) {
    function nodeNameEquals(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() == name.toUpperCase();
    }
    function evalScript(elem) {
        var data = (elem.text || elem.textContent || elem.innerHTML || "");
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        var script = document.createElement("script");
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode(data));
        }
        catch (e) {
            script.text = data;
        }
        head.insertBefore(script, head.firstChild);
        head.removeChild(script);
    }
    var scripts = [], script;
    var children = element.childNodes, child;
    for (var i = 0; children[i]; i++) {
        child = children[i];
        if (nodeNameEquals(child, "script") && (!child.type || child.type.toLowerCase() == "text/javascript"))
            scripts.push(child);
    }
    for (var i = 0; scripts[i]; i++) {
        script = scripts[i];
        if (script.parentNode)
            script.parentNode.removeChild(script);
        evalScript(scripts[i]);
    }
}
function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    var loaded = false;
    script.onload = script["onreadystatechange"] = function () {
        if (!loaded && (!this.readyState || this.readyState == "complete")) {
            loaded = true;
            callback();
        }
    };
    var node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(script, node);
}
function setStyle(query, styles) {
    var elements = getAll(query);
    var keys = Object.keys(styles);
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var e = elements_1[_i];
        var style = e.style;
        for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
            var k = keys_1[_a];
            var value = styles[k];
            style[k] = isNumber(value) ? value + "px" : value;
        }
    }
}
function removeStyle(query) {
    var styles = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        styles[_i - 1] = arguments[_i];
    }
    var elements = getAll(query);
    var a = 'A'.charCodeAt(0);
    var z = 'Z'.charCodeAt(0);
    for (var _a = 0, styles_1 = styles; _a < styles_1.length; _a++) {
        var style = styles_1[_a];
        var index = a;
        while (index <= z) {
            var c = String.fromCharCode(index);
            if (style.includes(c)) {
                style = style.replace(c, "-" + c.toLowerCase());
            }
            index++;
        }
        for (var _b = 0, elements_2 = elements; _b < elements_2.length; _b++) {
            var element = elements_2[_b];
            element.style.removeProperty(style);
        }
    }
}
function isEventCapable(obj) {
    return isDefined(obj["addEventListener"]);
}
function addEvent(query, name, event) {
    var items = isEventCapable(query) ? [query] : getAll(query);
    for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
        var item = items_2[_i];
        item.addEventListener(name, event);
    }
}
function addClass(query) {
    var value = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        value[_i - 1] = arguments[_i];
    }
    var items = getAll(query);
    for (var _a = 0, items_3 = items; _a < items_3.length; _a++) {
        var item = items_3[_a];
        item.addClass.apply(item, value);
    }
}
function removeClass(query) {
    var value = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        value[_i - 1] = arguments[_i];
    }
    var items = getAll(query);
    for (var _a = 0, items_4 = items; _a < items_4.length; _a++) {
        var item = items_4[_a];
        item.removeClass.apply(item, value);
    }
}
function isBefore(node, sibling) {
    var a = get(node);
    if (!a)
        return false;
    var b = get(sibling);
    if (!b)
        return false;
    if (a == b)
        return false;
    if (a.parentElement != b.parentElement)
        return false;
    while (true) {
        a = a.previousElementSibling;
        if (a == b)
            return true;
        if (a == undefined)
            break;
    }
    return false;
}
function isAfter(node, sibling) {
    var a = get(node);
    if (!a)
        return false;
    var b = get(sibling);
    if (!b)
        return false;
    if (a == b)
        return false;
    if (a.parentElement != b.parentElement)
        return false;
    while (true) {
        a = a.nextElementSibling;
        if (a == b)
            return true;
        if (a == undefined)
            break;
    }
    return false;
}
function selectRange(start, finish) {
    var a = get(start);
    if (a == undefined)
        return [];
    var b = get(finish);
    if (b == undefined)
        return [];
    if (isBefore(a, b)) {
        var c = a;
        a = b;
        b = c;
    }
    else if (!isAfter(a, b))
        return [];
    var selection = [];
    while (a != b) {
        selection.push(a);
        a = a.nextElementSibling;
    }
    selection.push(a);
    return selection;
}
function acceptDroppedFiles(element, ondrop) {
    element.addEventListener("dragover", function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });
    element.addEventListener("drop", function (e) {
        e.stopPropagation();
        e.preventDefault();
        ondrop(e.dataTransfer.files);
    });
}
function addStyleSheet(href, onload) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(link);
    if (onload)
        link.addEventListener("load", onload);
    link.href = href;
}
function addJavaScript(src, onload) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.body.appendChild(script);
    if (onload)
        script.addEventListener("load", onload);
    script.src = src;
}
var LocalCache = (function () {
    function LocalCache() {
        this.data = {};
    }
    LocalCache.prototype.remove = function (url) {
        delete this.data[url];
    };
    LocalCache.prototype.exists = function (url) {
        return this.data.hasOwnProperty(url) && isDefined(this.data[url]);
    };
    LocalCache.prototype.recall = function (url) {
        return this.data[url];
    };
    LocalCache.prototype.store = function (url, value) {
        this.data[url] = value;
    };
    return LocalCache;
}());
var WebRequest = (function () {
    function WebRequest(requestType) {
        if (requestType === void 0) { requestType = "text"; }
        var _this = this;
        this.requestType = requestType;
        this.localCache = new LocalCache();
        this.httpRequest = new XMLHttpRequest();
        this.httpRequest.responseType = requestType;
        this.httpRequest.onload = function () { return _this.httpRequestLoad(); };
        this.callback = undefined;
    }
    WebRequest.prototype.sendComplete = function (data) {
        this.responseText = undefined;
        this.responseBytes = undefined;
        if (this.requestType == "arraybuffer" || this.requestType == "blob")
            this.responseBytes = new Uint8Array(this.httpRequest.response);
        else if (this.requestType == "document")
            this.responseXML = this.httpRequest.responseXML;
        else {
            if (data)
                this.responseText = data;
            else
                this.responseText = this.httpRequest.responseText;
            if (this.cache)
                this.localCache.store(this.url, this.responseText);
        }
        if (this.callback)
            this.callback(this);
    };
    WebRequest.prototype.httpRequestLoad = function () {
        this.sendComplete();
    };
    Object.defineProperty(WebRequest.prototype, "responseJSON", {
        get: function () {
            return JSON.parse(this.responseText);
        },
        enumerable: true,
        configurable: true
    });
    WebRequest.prototype.send = function (url, callback, cache) {
        this.httpRequest.abort();
        this.url = url;
        this.callback = callback;
        this.cache = cache;
        if (cache && this.localCache.exists(url))
            this.sendComplete(this.localCache.recall(url));
        else {
            this.httpRequest.open("GET", url);
            this.httpRequest.send();
        }
    };
    WebRequest.prototype.post = function (url, data, callback, cache) {
        this.httpRequest.abort();
        this.url = url;
        this.callback = callback;
        this.cache = cache;
        if (cache && this.localCache.exists(url))
            this.sendComplete(this.localCache.recall(url));
        else {
            this.httpRequest.open("POST", url);
            if (data instanceof FormData || isString(data))
                this.httpRequest.send(data);
            else
                this.httpRequest.send(objectToFormData(data));
        }
    };
    WebRequest.prototype.cancel = function () {
        this.httpRequest.abort();
    };
    return WebRequest;
}());
function sendWebRequest(url, callback) {
    var r = new WebRequest();
    r.send(url, callback);
}
function sendWebRequestType(url, requestType, callback) {
    var r = new WebRequest(requestType);
    r.send(url, callback);
}
function postWebRequest(url, data, callback) {
    var r = new WebRequest();
    r.post(url, data, callback);
}
function postWebRequestType(url, data, requestType, callback) {
    var r = new WebRequest(requestType);
    r.post(url, data, callback);
}
function objectToFormData(obj) {
    if (obj == undefined)
        return undefined;
    var data = new FormData();
    var keys = Object.keys(obj);
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var k = keys_2[_i];
        var value = obj[k];
        data.append(k, value);
    }
    return data;
}
function formSubmit(form, prepare) {
    var formData = new FormData(form);
    var request = new XMLHttpRequest();
    if (prepare)
        prepare(request);
    request.open(form.getAttribute("method"), form.getAttribute("action"), true);
    request.send(formData);
    return request;
}
Date.fromString = function (s) {
    var i = Date.parse(s);
    return new Date(i);
};
var DateShortFormat = "#M#/#DD#/#YYYY# #h#:#mm# #AMPM#";
var DateShortDayFormat = "#MM#/#DD# #hh#:#mm# #ampm#";
var DateLongFormat = "#DDDD# #MMMM# #D#, #YYYY# #h#:#mm# #AMPM#";
var DateDefaultFormat = DateLongFormat;
Date.prototype.format = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    var dateObject = this;
    YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = dateObject.getDate()) < 10 ? ("0" + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
        "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? "th" : ((dMod = D % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
    formatString = (formatString) ? formatString : DateDefaultFormat;
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = dateObject.getHours());
    if (h == 0)
        h = 24;
    if (h > 12)
        h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
    ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
    return formatString
        .replace("#hhh#", hhh)
        .replace("#hh#", hh)
        .replace("#h#", h)
        .replace("#mm#", mm)
        .replace("#m#", m)
        .replace("#ss#", ss)
        .replace("#s#", s)
        .replace("#ampm#", ampm)
        .replace("#AMPM#", AMPM);
};
Date.prototype.timeAgo = function () {
    var a = new Date();
    var b = this;
    var diff = a - b;
    var seconds = Math.floor(diff / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1)
        return interval + " year(s) ago";
    if (interval == 1)
        return "1 year ago";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
        return interval + " months ago";
    if (interval == 1)
        return "1 month ago";
    interval = Math.floor(seconds / 86400);
    if (interval > 1)
        return interval + " days ago";
    if (interval == 1)
        return "1 day ago";
    interval = Math.floor(seconds / 3600);
    if (interval > 1)
        return interval + " hours ago";
    if (interval == 1)
        return interval + "1 hour ago";
    interval = Math.floor(seconds / 60);
    if (interval > 1)
        return interval + " minutes ago";
    if (interval == 1)
        return interval + "1 minute ago";
    return Math.floor(seconds) + " seconds ago";
};
var TimeLeft = (function () {
    function TimeLeft(s) {
        this.time = 0;
        if (s.isEmpty() || s[0] != "P") {
            this.time = 604800 * 2;
            this.message = "Inactive";
            return;
        }
        if (s == "PT0S") {
            this.message = "Completed";
            return;
        }
        var phrase = "";
        var count = 0;
        var n = "";
        for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
            var c = s_1[_i];
            if (c >= '0' && c <= '9')
                n += c;
            else if (c == 'D') {
                var x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * 86400;
                if (count < 2)
                    phrase = phrase + " " + x + "d";
                count++;
            }
            else if (c == 'H') {
                var x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * 3600;
                if (count < 2)
                    phrase = phrase + " " + x + "h";
                count++;
            }
            else if (c == 'M') {
                var x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * 60;
                if (count < 2)
                    phrase = phrase + " " + x + "m";
                count++;
            }
            else if (c == 'S') {
                var x = n;
                n = "";
                if (x.isEmpty())
                    continue;
                this.time += parseInt(x) * 1;
                if (count < 2)
                    phrase = phrase + " " + x + "s";
                count++;
            }
            else
                n = "";
        }
        this.message = phrase;
    }
    TimeLeft.prototype.toString = function () {
        return this.message;
    };
    return TimeLeft;
}());
var Test = (function () {
    function Test() {
    }
    Test.verify = function (condition, name) {
        Test.writeLine(name, ": ", condition ? "success" : "fail");
    };
    Test.writeBreak = function (message) {
        var h2 = document.createElement("h2");
        if (message)
            h2.innerText = message;
        document.body.appendChild(h2);
    };
    Test.writeLine = function () {
        var content = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            content[_i] = arguments[_i];
        }
        var div = document.createElement("div");
        div.innerText = content.join("");
        document.body.appendChild(div);
    };
    return Test;
}());
String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
};
String.prototype.writeLine = function () {
    Test.writeLine(this);
};
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
};
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
};
String.prototype.splitTrim = function (separator) {
    var result = [];
    var items = this.split(isDefined(separator) ? separator : " ");
    for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
        var s = items_5[_i];
        s = s.trim();
        if (s.length)
            result.push(s);
    }
    return result;
};
String.prototype.format = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};
String.prototype.toElement = function () {
    var block = document.createElement("div");
    block.innerHTML = this;
    return block.firstElementChild;
};
Number.prototype.withCommas = function () {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    ;
};
Number.prototype.toBytes = function () {
    var bytes = Math.floor(this);
    if (bytes < 1)
        return "0 Bytes";
    var k = 1000;
    var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
Number.prototype.toTimeSpan = function () {
    var hours = Math.floor(this / 3600);
    var minutes = Math.floor((this - (hours * 3600)) / 60);
    var seconds = Math.floor(this - (hours * 3600) - (minutes * 60));
    if (hours > 0) {
        var m = minutes.toString();
        if (m.length < 1)
            m = "0" + m;
        var s = seconds.toString();
        if (s.length < 1)
            s = "0" + s;
        return hours + ":" + m + ":" + s;
    }
    else {
        var s = seconds.toString();
        if (s.length < 1)
            s = "0" + s;
        return minutes + ":" + s;
    }
};
var Guid = (function () {
    function Guid() {
        this.value = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    Guid.prototype.toString = function () {
        return this.value;
    };
    return Guid;
}());
var Slider = (function () {
    function Slider(slider, associate) {
        this._slider = get(slider);
        this._knob = this._slider.get(".knob");
        this._associate = associate ? get(associate) : null;
        this._position = 0;
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this.onchange = null;
        var me = this;
        function sliderMouseMove(e, s) {
            var rect = s._slider.getBoundingClientRect();
            var x = e.clientX - rect.left;
            if (x < 0)
                x = 0;
            else if (x > rect.width)
                x = 1;
            else
                x = x / rect.width;
            var range = s._max - s._min;
            s.position = range * x + s._min;
        }
        function sliderMouseUp(e, s) {
            if (e.button == 0) {
                s._knob.removeClass("pressed");
                document["_slider"] = null;
            }
        }
        this._slider.addEventListener("mousedown", function (e) {
            document["_slider"] = me;
            me._knob.addClass("pressed");
            sliderMouseMove(e, me);
        });
        if (isUndefined(window["_slider"])) {
            window["_slider"] = true;
            document.addEventListener("mousemove", function (e) {
                if (document["_slider"]) {
                    var s = document["_slider"];
                    sliderMouseMove(e, s);
                }
            });
            document.addEventListener("mouseup", function (e) {
                if (document["_slider"]) {
                    var s = document["_slider"];
                    sliderMouseUp(e, s);
                }
            });
        }
    }
    Slider.prototype.update = function () {
        if (this._associate)
            this._associate.innerText = this._position.toString();
        var width = this._slider.getBoundingClientRect().width - 26;
        var range = this._max - this._min;
        var percent = (this._position - this.min) / range;
        this._knob.style.left = (width * percent).toString() + "px";
    };
    Object.defineProperty(Slider.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            if (value < this._min)
                value = this._min;
            else if (value > this._max)
                value = this._max;
            var r = 1 / this._step;
            value = Math.round(value * r) / r;
            if (value == this._position)
                return;
            this._position = value;
            this.update();
            if (this.onchange)
                this.onchange(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (value) {
            if (value < 0.01)
                value = 0.01;
            this._step = value;
            this.position = this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            this._min = value;
            if (this._position < this._min)
                this._position = this._min;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Slider.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            this._max = value;
            if (this._position > this._max)
                this._position = this._max;
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    return Slider;
}());
var controls = {
    updating: true,
    color1: null,
    color2: null,
    color3: null,
    speed: null,
    length: null,
    brightness: null,
    saturation: null
};
function initControls() {
    var timer = 0;
    var timeout = 50;
    controls.color1 = get("#color1");
    controls.color1.oninput = function () {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color1.value, index: 1 });
        }, timeout);
    };
    controls.color2 = get("#color2");
    controls.color2.oninput = function () {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color2.value, index: 2 });
        }, timeout);
    };
    controls.color3 = get("#color3");
    controls.color3.oninput = function () {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setcolor", { value: controls.color3.value, index: 3 });
        }, timeout);
    };
    controls.color3 = get("#color3");
    controls.speed = new Slider("#speed .slider", "#speed .associate");
    controls.speed.step = 0.1;
    controls.speed.min = -5;
    controls.speed.max = 5;
    controls.speed.position = 1;
    controls.speed.onchange = function (e) {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setspeed", { value: e.position });
        }, timeout);
    };
    controls.length = new Slider("#length .slider", "#length .associate");
    controls.length.step = 25;
    controls.length.min = 25;
    controls.length.max = 1000;
    controls.length.position = 100;
    controls.length.onchange = function (e) {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setlength", { value: e.position / 100 });
        }, timeout);
    };
    controls.brightness = new Slider("#brightness .slider", "#brightness .associate");
    controls.brightness.step = 1;
    controls.brightness.min = 0;
    controls.brightness.max = 100;
    controls.brightness.position = 100;
    controls.brightness.onchange = function (e) {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setbrightness", { value: e.position / 100 });
        }, timeout);
    };
    controls.saturation = new Slider("#saturation .slider", "#saturation .associate");
    controls.saturation.step = 1;
    controls.saturation.min = 0;
    controls.saturation.max = 100;
    controls.saturation.position = 100;
    controls.saturation.onchange = function (e) {
        if (controls.updating)
            return;
        if (timer != 0)
            clearTimeout(timer);
        timer = setTimeout(function () {
            timer = 0;
            postWebRequest("/?method=setsaturation", { value: e.position / 100 });
        }, timeout);
    };
}
var selection = null;
var commands = {
    select: function (program) {
        if (selection == program)
            return;
        if (selection)
            selection.removeClass("selected");
        selection = program;
        selection.addClass("selected");
        postWebRequest("/?method=seteffect", { name: "" + selection.innerText });
        setTimeout(function () {
            return sendWebRequest("/?method=getdetails", function (r) {
                var details = JSON.parse(r.responseText);
                get("#help").innerHTML = "status: program " + details.name + " selected<br>\n                    " + details.long + "<br>\n                    <br>\n                    " + details.description;
            });
        }, 200);
    },
    reset: function () {
        var help = get("#help");
        if (selection) {
            var message_1 = help.innerHTML;
            sendWebRequest("/?method=reset");
            var s_2 = "status: resetting settings for " + selection.innerText;
            help.innerHTML = s_2;
            setTimeout(function () { if (help.innerHTML == s_2)
                help.innerHTML = message_1; }, 2000);
        }
        else {
            help.innerHTML = "status: no program is selected to reset";
        }
    },
    settings: function () {
        var help = get("#help");
        var message = help.innerHTML;
        if (selection) {
            var s_3 = "status: retreiving settings for " + selection.innerText;
            help.innerHTML = s_3;
            sendWebRequest("/?method=getdetails", function (r) {
                var details = JSON.parse(r.responseText);
                get("#title").innerHTML = "settings for " + details.name;
                controls.updating = true;
                controls.color1.value = details.color1;
                controls.color2.value = details.color2;
                controls.color3.value = details.color3;
                controls.speed.position = details.speed;
                controls.length.position = details.length * 100;
                controls.brightness.position = details.brightness * 100;
                controls.saturation.position = details.saturation * 100;
                controls.updating = false;
                get("#frame").removeClass("expand");
                get("#front").addClass("flip");
                get("#back").removeClass("flip");
                get("#shadow").removeClass("flip");
                get("#edge").addClass("flip");
                setTimeout(function () { if (help.innerHTML == s_3)
                    help.innerHTML = message; }, 4000);
            });
        }
        else {
            help.innerHTML = "status: select a program above first, then try settings again";
        }
    },
    stop: function () {
        if (selection)
            selection.removeClass("selected");
        selection = null;
        sendWebRequest("/?method=stop");
        get("#help").innerHTML = "status: no program selected";
    }
};
function initPixels() {
    var border;
    var colors = false;
    var pixels;
    function readPixels() {
        sendWebRequestType("/?method=getpixels", "arraybuffer", function (r) {
            var data = r.responseBytes;
            if (data.length > 3) {
                colors = true;
                var i = 0;
                var j = 0;
                while (i < data.length)
                    pixels[j++].style.backgroundColor = "rgb(" + data[i++] + "," + data[i++] + "," + data[i++] + ")";
            }
            else if (colors) {
                colors = false;
                for (var _i = 0, pixels_1 = pixels; _i < pixels_1.length; _i++) {
                    var p = pixels_1[_i];
                    p.style.backgroundColor = "rgb(0,0,0)";
                }
            }
        });
    }
    function readProgram() {
        sendWebRequest("/?method=geteffect", function (r) {
            var e = r.responseText;
            if (e.length) {
                var item = get(".program." + e);
                if (item)
                    item.click();
            }
        });
    }
    sendWebRequest("/?method=getborder", function (r) {
        border = r.responseJSON;
        var container = get("#pixels");
        var rect = container.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        var index = 0;
        var count = 0;
        pixels = new Array(border.length);
        for (var i = 0; i < pixels.length; i++) {
            var pixel = document.createElement("div");
            container.appendChild(pixel);
            if (i < border.bottom) {
                index = i;
                count = border.bottom;
                pixel.style.bottom = "0";
                pixel.style.left = ((width - 10) / count * index) + "px";
            }
            else if (i < border.right) {
                index = i - border.bottom;
                count = border.right - border.bottom;
                pixel.style.right = "0";
                pixel.style.bottom = ((height - 10) / count * index) + "px";
            }
            else if (i < border.top) {
                index = i - border.right;
                count = border.top - border.right;
                pixel.style.top = "0";
                pixel.style.right = ((width - 12) / count * index) + "px";
            }
            else {
                index = i - border.top;
                count = border.left - border.top;
                pixel.style.left = "0";
                pixel.style.top = ((height - 1) / count * index) + "px";
            }
            pixels[i] = pixel;
        }
        setInterval(readPixels, 250);
        setInterval(readProgram, 1000);
    });
}
function main() {
    var frame = get("#frame");
    var front = get("#front");
    var back = get("#back");
    var shadow = get("#shadow");
    var edge = get("#edge");
    var fullscreen = get("#fullscreen");
    front.addEventListener("click", commands.settings);
    get("#done").addEventListener("click", function () {
        back.addClass("flip");
        shadow.addClass("flip");
        front.removeClass("flip");
        edge.removeClass("flip");
    });
    fullscreen.addEventListener("click", function () {
        frame.toggleClass("expand");
        if (frame.hasClass("expand")) {
            fullscreen.removeClass("fa-search-plus");
            fullscreen.addClass("fa-search-minus");
        }
        else {
            fullscreen.removeClass("fa-search-minus");
            fullscreen.addClass("fa-search-plus");
        }
    });
    get("#terminal").addEventListener("click", function (e) {
        e.stopPropagation();
    });
    var now = new Date();
    var stamp = now.format("#DDD# #MM# #D# #h#:#mm#:#ss# #YYYY#");
    get("#stamp").innerText = stamp;
    initControls();
    function programsLoaded(json) {
        var effects = JSON.parse(json);
        var html = "";
        for (var _i = 0, effects_1 = effects; _i < effects_1.length; _i++) {
            var e = effects_1[_i];
            html += "<div class=\"program " + e + "\" onclick=\"commands.select(this)\">" + e + "</div>";
        }
        get("#programs").innerHTML = html;
    }
    sendWebRequest("/?method=effects", function (r) { return programsLoaded(r.responseText); });
    initPixels();
}
//# sourceMappingURL=app.js.map