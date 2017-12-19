// Copyright © 2017 Tangdongxin

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var bgColor; // background color
var intColor; // integer color
var strColor; // string color
var keyColor; // k-v key color
var defaultColor; // default text color
var fontStyle; // font-family
var fontSize; // font-size
var strictOnly; // only deal with the application/json response
var hideDetails; // hide the count and size
var dontBeatify; // hide the [str] or [json]
var strLength; // string length
var isDebug; // debug mode
// ===========================================
// DEFAULT VALUES
// ===========================================
var RAND = "MIKE";
var HOV  = "H" + RAND;
var DIV  = "D" + RAND;
var KEY  = "K" + RAND;
var STR  = "S" + RAND;
var BOOL = "B" + RAND;
var ERR  = "E" + RAND;
var COLL = "C" + RAND;

// ===========================================
// COMMON FUNCTIONS
// ===========================================
function onError(result, error) {
    console.log(result);
}

function dlog(target) {
    if (isDebug) {
        console.log(target);
    }
}

function reconvert(str) {
    str = str.replace(/(\\u)(\w{1,4})/gi, function($0) {
        return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
    });
    str = str.replace(/(&#x)(\w{1,4});/gi, function($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
    });
    str = str.replace(/(&#)(\d{1,6});/gi, function($0) {
        return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
    });

    return str;
}

function units(size) {
    return size > 1048576 ? (0 | (size / 1048576)) + "MB" :
        size > 1024 ? (0 | (size / 1024)) + "KB" :
        size + "B";
}

function fragment(div, a, b) {
    var frag = document.createDocumentFragment();
    frag.appendChild(document.createTextNode(a));
    if (b) {
        frag.appendChild(div.cloneNode());
        frag.appendChild(document.createTextNode(b));
    } else {
        frag.appendChild(document.createElement("br"));
    }
    return frag;
}

function change(node, query, name, set) {
    var list = node.querySelectorAll(query),
        i = list.length;
    for (; i--;) list[i].classList[set ? "add" : "remove"](name);
}

function draw(str, current, isEmbed = false) {
    var re = /("(?:((?:https?|file):\/\/(?:\\?\S)+?)|(?:\\?.)*?)")\s*(:?)|-?\d+\.?\d*(?:e[+-]?\d+)?|true|false|null|[[\]{},]|(\S[^-[\]{},"\d]*)/gi;
    var node = document.createElement("div");
    node.classList.add(DIV);
    var link = document.createElement("a");
    var span = document.createElement("span");
    var info = document.createElement("i");
    var colon = document.createTextNode(": ");
    var comma = fragment(node, ",");
    var path = [];
    var cache = {
        "{": fragment(node, "{", "}"),
        "[": fragment(node, "[", "]")
    };

    node.className = "R" + RAND;
    link.classList.add("L" + RAND);
    if (isEmbed) {
        info.classList.add("IJSON" + RAND);
    } else {
        info.classList.add("I" + RAND);
    }

    parse(str, re);

    current.innerHTML = node.innerHTML;

    function parse(str, re) {
        str = reconvert(str);
        var match, val, tmp, i = 0;
        var len = str.length;
        try {
            for (; match = re.exec(str);) {
                val = match[0];
                if (val == "{" || val == "[") {
                    path.push(node);
                    node.appendChild(cache[val].cloneNode(true));
                    node = node.lastChild.previousSibling;
                    node.len = 1;
                    node.start = re.lastIndex;
                } else if ((val == "}" || val == "]") && node.len) {
                    if (node.childNodes.length) {
                        tmp = info.cloneNode();
                        var content = node.len + (
                            node.len == 1 ?
                            (val == "]" ? " item, " : " property, ") :
                            (val == "]" ? " items, " : " properties, ")
                        ) + units(re.lastIndex - node.start + 1);

                        if (hideDetails) {
                            tmp.setAttribute("title", content);
                        } else {
                            tmp.dataset.content = content;
                        }

                        if ((val = node.previousElementSibling) && val.className == KEY) {
                            tmp.dataset.key = reconvert(val.textContent.slice(1, -1).replace(/'/, "\\'"));
                        }
                        node.parentNode.insertBefore(tmp, node);
                    } else {
                        node.parentNode.removeChild(node);
                    }
                    node = path.pop();
                } else if (val == ",") {
                    node.len += 1;
                    node.appendChild(comma.cloneNode(true));
                } else {
                    tmp = span.cloneNode();
                    tmp.textContent = match[1] || val;
                    tmp.classList.add(match[3] ? KEY : match[1] ? STR : match[4] ? ERR : BOOL);
                    node.appendChild(tmp);
                    if (match[3]) {
                        node.appendChild(colon.cloneNode());
                    }
                }
            }
            document.title = "";
            JSON.parse(str);
        } catch (e) {
            dlog(e);
            // TODO: find a better way to report error
        }
    }
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (JSON.stringify(obj).indexOf('{') == 1 ||
                JSON.stringify(obj).indexOf(']') == 1) {
                return true;
            }
        } catch (e) {}
    }
    return false;
}
