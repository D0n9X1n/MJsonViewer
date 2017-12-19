// Copyright © 2017 TangDongxin

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

// ===========================================
// JSON PARSER
// ===========================================
function onParse(result) {
    var chrome = this.chrome || this.browser;
    var jsonRe = /^\s*(?:\[\s*(?=-?\d|true|false|null|["[{])[^]*\]|\{\s*"[^]+\})\s*$/;
    var body = document.body;
    var str, jsonpMatch, tag;

    if (strictOnly) {
        // only render when the contentType is json
        if (/[+\/]json$/i.test(document.contentType)) {
            init();
            str = body.textContent;
            draw(str, body);
        }
    } else {
        // check whether the content is json or like json
        first = body && body.firstChild;
        if (first &&
            (first.tagName == "PRE" &&
                first == body.lastElementChild ||
                first == body.lastChild &&
                first.nodeType == 3) &&
            (str = first.textContent) &&
            (/[+\/]json$/i.test(document.contentType) ||
                (jsonpMatch = /^\s*((?:\/\*\*\/\s*)?([$a-z_][$\w]*)\s*(?:&&\s*\2\s*)?\()([^]+)(\)[\s;]*)$/i.exec(str)) &&
                jsonRe.test(jsonpMatch[3]) || jsonRe.test(str))) {
            if (jsonpMatch) {
                str = jsonpMatch[3];
                body.replaceChild(fragment(jsonpMatch[1], jsonpMatch[4]), first);
                first = body.lastChild.previousSibling;
            }
            init();
            draw(str, body);
        }
    }

    function init() {
        if (tag) {
            return;
        }

        tag = document.createElement("style");
        tag.textContent = [
            '.R', ',.D', '{font:' + fontSize + ' ' + fontStyle + '}' +
            '.D', '{margin-left:0.5em; padding-left:2em; margin-top: 1px; border-left:1px dashed; border-color: #93A1A1;}' +
            '.X', '{border:1px solid #ccc; padding:1em}' +
            'a.L', '{text-decoration:none}' +
            'a.L', ':hover,a.L', ':focus{text-decoration:underline}' +
            'i.I', '{cursor:pointer;color:#ccc}' +
            'i.H', ',i.I', ':hover{text-shadow: 1px 1px 3px #999; color:#333}' +
            'i.I', ':before{content:" ▼ "}' +
            'i.C', ':before{content:" ▶ "}' +
            'i.C', '+.D', '{width:1px; height:1px; margin:0; padding:0; border:0; display:inline-block; overflow:hidden}' +
            '.S', '{color:' + strColor + '}' + // string
            '.K', '{color:' + keyColor + '}' + // key
            '.E', '{color:#BCADAD}' + // error
            '.B', '{color:' + intColor + '}' + // number and bool
            '.E', ',.B', '{font-style: italic}' + // number bold
            'h3.E', '{margin:0 0 1em}'
        ].join(RAND);

        tag.textContent += 'i.I' + RAND + ':after{content:attr(data-content)}';
        tag.textContent += 'body {background: ' + bgColor + '; color:' + defaultColor + ';}';
        tag.textContent += '.HIDE {width:200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }';
        tag.textContent += '* {font:' + fontSize + ' ' + fontStyle + ' !important;}';
        tag.textContent += '.black_overlay{ display: none; position: fixed; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index:1001; -moz-opacity: 0.6; opacity:.60; filter: alpha(opacity=60); }';
        tag.textContent += '.white_content { display: none; position: fixed; top: 10%; left: 13%; width: 70%; min-width: 500px; min-height: 300px; height: 60%; padding: 1%; border: 16px solid orange; background-color: white; z-index:1002; overflow: auto; }';
        tag.textContent += 'str:hover{text-shadow: 1px 1px 3px #999; color:#333}';
        tag.textContent += 'json:hover{text-shadow: 1px 1px 3px #999; color:#333}';

        document.head.appendChild(tag);
    }
}

