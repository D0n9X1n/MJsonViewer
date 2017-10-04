//////////////////////////////////////////////////////////////////////////////////////
// Copyright © 2017 TangDongxin
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//////////////////////////////////////////////////////////////////////////////////////

var bgColor, intColor, strColor, keyColor, defaultColor;
var fontStyle;
var strictOnly;

function onError(error) {
    console.log(error);
}

function onGot(result) {
    if (result[0]) {
        fontStyle    = result[0].fontStyle    || "Consolas";
        bgColor      = result[0].bgColor      || "#FDF6E3";
        intColor     = result[0].intColor     || "#657A81";
        strColor     = result[0].strColor     || "#2AA198";
        keyColor     = result[0].keyColor     || "#B58900";
        defaultColor = result[0].defaultColor || "#586E75";

        strictOnly   = result[0].strictOnly   || false;
    } else {
        fontStyle    = result.fontStyle    || "Consolas";
        bgColor      = result.bgColor      || "#FDF6E3";
        intColor     = result.intColor     || "#657A81";
        strColor     = result.strColor     || "#2AA198";
        keyColor     = result.keyColor     || "#B58900";
        defaultColor = result.defaultColor || "#586E75";

        strictOnly   = result.strictOnly   || false;
    }

    var str, jsonpMatch, hovered, tag,
        chrome = this.chrome || this.browser,
        jsonRe = /^\s*(?:\[\s*(?=-?\d|true|false|null|["[{])[^]*\]|\{\s*"[^]+\})\s*$/,
        div    = document.createElement("div"),
        body   = document.body,
        first  = body && body.firstChild,
        mod    = /Mac|iPod|iPhone|iPad|Pike/.test(navigator.platform) ? "metaKey" : "ctrlKey",
        rand   = Math.random().toString(36).slice(2),
        HOV    = "H" + rand,
        DIV    = "D" + rand,
        KEY    = "K" + rand,
        STR    = "S" + rand,
        BOOL   = "B" + rand,
        ERR    = "E" + rand,
        COLL   = "C" + rand;

    function reconvert(str){
        str = str.replace(/(\\u)(\w{1,4})/gi, function($0) {
            return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi, function($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"),16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi, function($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
        });

        return str;
    }

    function units(size) {
        return size > 1048576 ? (0|(size / 1048576)) + "MB" :
            size > 1024 ? (0|(size / 1024)) + "KB" :
            size + "B";
    }

    function fragment(a, b) {
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
        var list = node.querySelectorAll(query), i = list.length;
        for (; i--; ) list[i].classList[set ? "add" : "remove"](name);
    }

    function changeSiblings(node, name, set) {
        var tmp, i = 0, query = [];

        for (; node && node.tagName === "I"; ) {
            tmp = node.previousElementSibling;
            if (tmp && tmp.className == KEY) {
                query.unshift(".D" + rand + ">i.I" + rand + "[data-key='" + node.dataset.key + "']");
            } else if (query[0]) {
                query.unshift(".D" + rand + ">i.I" + rand);
            } else {
                for (; tmp; tmp = tmp.previousElementSibling) if (tmp.tagName === "BR") i++;
                query.unshift(".D" + rand + ">" + (i ? "br:nth-of-type(" + i + ")+i.I" + rand : "i.I" + rand + ":first-child"));
            }
            node = node.parentNode && node.parentNode.previousElementSibling;
        }
        if (!query[1]) return;
        query[0] = ".R" + rand + ">i.I" + rand;
        change(document, query.join("+"), name, set);
    }

    function keydown(e) {
        if (hovered) {
            e.preventDefault();
            if (e.altKey) {
                changeSiblings(hovered, HOV, 1);
            } else if (e[mod]) {
                change(hovered.nextSibling, "i.I" + rand, HOV, 1);
            }
        }
    }

    function init() {
        tag = document.createElement("style");
        tag.textContent = [
            '.R', ',.D', '{font:16px ' + fontStyle + '}' +
            '.D', '{margin-left:6px; padding-left:1em; margin-top: 1px; border-left:1px dashed; border-color: #93A1A1;}' +
            '.X', '{border:1px solid #ccc; padding:1em}' +
            'a.L', '{text-decoration:none}' +
            'a.L', ':hover,a.L', ':focus{text-decoration:underline}' +
            'i.I', '{cursor:pointer;color:#ccc}' +
            'i.H', ',i.I', ':hover{text-shadow: 1px 1px 3px #999; color:#333}'+
            'i.I', ':before{content:" ▼ "}' +
            'i.C', ':before{content:" ▶ "}' +
            'i.I', ':after{content:attr(data-content)}' +
            'i.C', '+.D', '{width:1px; height:1px; margin:0; padding:0; border:0; display:inline-block; overflow:hidden}' +
            '.S', '{color:' + strColor + '}' + // string
            '.K', '{color:' + keyColor + '}' + // key
            '.E', '{color:#BCADAD}' + // error
            '.B', '{color:' + intColor + '}' + // number and bool
            '.E', ',.B', '{font-style: italic}' + // number bold
            'h3.E', '{margin:0 0 1em}'
        ].join(rand);

        tag.textContent = tag.textContent + 'body {background: ' + bgColor + '; color:' + defaultColor + ';}';

        div.classList.add(DIV);
        document.head.appendChild(tag);
        document.addEventListener("keydown", keydown);
        document.addEventListener("keyup", function(e) {
            if (hovered) change(document, "." + HOV, HOV);
        })
        document.addEventListener("mouseover", function(e) {
            if (e.target.tagName === "I") {
                hovered = e.target;
                keydown(e);
            }
        })
        document.addEventListener("mouseout", function(e) {
            if (hovered) {
                change(document, "." + HOV, HOV);
                hovered = null;
            }
        })
    }

    function draw(str, to, first, box) {
        tag || init();

        var re = /("(?:((?:https?|file):\/\/(?:\\?\S)+?)|(?:\\?.)*?)")\s*(:?)|-?\d+\.?\d*(?:e[+-]?\d+)?|true|false|null|[[\]{},]|(\S[^-[\]{},"\d]*)/gi
            , node = div.cloneNode()
            , link = document.createElement("a")
            , span = document.createElement("span")
            , info = document.createElement("i")
            , colon = document.createTextNode(": ")
            , comma = fragment(",")
            , path = []
            , cache = {
                "{": fragment("{", "}"),
                "[": fragment("[", "]")
            };

        node.className = "R" + rand + (box ? " " + box : "");

        link.classList.add("L" + rand);
        info.classList.add("I" + rand);

        to.addEventListener("click", function(e) {
            var target = e.target, open = target.classList.contains(COLL);
            if (target.tagName == "I") {
                if (e.altKey) {
                    changeSiblings(target, COLL, !open);
                } else if (e[mod]) {
                    open = target.nextSibling.querySelector("i");
                    if (open) change(target.nextSibling, "i", COLL, !open.classList.contains(COLL));
                } else {
                    target.classList[open ? "remove" : "add"](COLL);
                }
            }
        }, true);

        to.replaceChild(box = node, first);
        loop(str, re);

        function loop(str, re) {
            str = reconvert(str);
            var match, val, tmp, i = 0, len = str.length;
            try {
                for (; match = re.exec(str); ) {
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
                            tmp.dataset.content = node.len + (
                                node.len == 1 ?
                                (val == "]" ? " item, " : " property, ") :
                                (val == "]" ? " items, " : " properties, ")
                            ) + units(re.lastIndex - node.start + 1);

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
                        if (match[2]) {
                            tmp = link.cloneNode();
                            tmp.href = match[2].replace(/\\"/g, '"');
                        } else {
                            tmp = span.cloneNode();
                        }
                        tmp.textContent = match[1] || val;
                        tmp.classList.add(match[3] ? KEY : match[1] ? STR : match[4] ? ERR : BOOL);
                        node.appendChild(tmp);
                        if (match[3]) {
                            node.appendChild(colon.cloneNode());
                        }
                    }
                    if (++i > 1000) {
                        document.title = (0|(100*re.lastIndex/len)) + "% of " + units(len);
                        return setTimeout(function() { loop(str, re) });
                    }
                }
                document.title = ""
                JSON.parse(str)
            } catch(e) {
                tmp = document.createElement("h3");
                tmp.className = ERR;
                tmp.textContent = e;
                box.insertBefore(tmp, box.firstChild);
            }
        }
    }

    if (strictOnly) {
        // only render when the contentType is json
        if (/[+\/]json$/i.test(document.contentType))
            draw(str, body, first)
        }
    } else {
        // check whether the content is json or like json
        if (first
            && (first.tagName == "PRE"
                && first == body.lastElementChild
                || first == body.lastChild
                && first.nodeType == 3)
            && (str = first.textContent)
            && (/[+\/]json$/i.test(document.contentType)
                || (jsonpMatch = /^\s*((?:\/\*\*\/\s*)?([$a-z_][$\w]*)\s*(?:&&\s*\2\s*)?\()([^]+)(\)[\s;]*)$/i.exec(str))
                && jsonRe.test(jsonpMatch[3]) || jsonRe.test(str)))
        {
            if (jsonpMatch) {
                str = jsonpMatch[3]
                body.replaceChild(fragment(jsonpMatch[1], jsonpMatch[4]), first)
                first = body.lastChild.previousSibling
            }
            draw(str, body, first)
        }
    }

    chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
        var node,
            sel   = window.getSelection(),
            range = sel.rangeCount && sel.getRangeAt(0),
            str   = range && range.toString()

        if (!str) return

        if (req.op === "formatSelection") {
            node = document.createElement("div")
            range.deleteContents()
            range.insertNode(node)
            sel.removeAllRanges()
            draw(str, node.parentNode, node, "X" + rand)
        }
    })
}

var getting = browser.storage.local.get();
getting.then(onGot, onError);

