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


// ===========================================
// READ CONFIG
// ===========================================
function onConfig(result) {
    if (!result) {
        dlog("No Config find");
        fontStyle    = "Consolas";
        fontSize     = "14px";
        bgColor      = "#FDF6E3";
        intColor     = "#657A81";
        strColor     = "#2AA198";
        keyColor     = "#B58900";
        defaultColor = "#586E75";

        strictOnly   = false;
        hideDetails  = false;
        dontBeatify  = false;
        isHighlight  = false;
        isDebug      = false;

        strLength    = 300;
        return;
    }
    if (result && result[0]) {
        fontStyle    = result[0].fontStyle    || "Consolas";
        fontSize     = result[0].fontSize     || "14px";
        bgColor      = result[0].bgColor      || "#FDF6E3";
        intColor     = result[0].intColor     || "#657A81";
        strColor     = result[0].strColor     || "#2AA198";
        keyColor     = result[0].keyColor     || "#B58900";
        defaultColor = result[0].defaultColor || "#586E75";

        strictOnly   = result[0].strictOnly   || false;
        hideDetails  = result[0].hideDetails  || false;
        dontBeatify  = result[0].dontBeatify  || false;
        isHighlight  = result[0].isHighlight  || false;
        isDebug      = result[0].isDebug      || false;
        strLength    = result[0].strLength    || 300;
    } else {
        fontStyle    = result.fontStyle    || "Consolas";
        fontSize     = result.fontSize     || "14px";
        bgColor      = result.bgColor      || "#FDF6E3";
        intColor     = result.intColor     || "#657A81";
        strColor     = result.strColor     || "#2AA198";
        keyColor     = result.keyColor     || "#B58900";
        defaultColor = result.defaultColor || "#586E75";

        strictOnly   = result.strictOnly   || false;
        hideDetails  = result.hideDetails  || false;
        dontBeatify  = result.dontBeatify  || false;
        isHighlight  = result.isHighlight  || false;
        isDebug      = result.isDebug      || false;
        strLength    = result.strLength    || 300;
    }

    document.addEventListener("click", function(e) {
        var target = e.target;
        if (target.tagName.toUpperCase() == "I") {
            var isClose = target.classList.contains(COLL);
            var classname = target.classList[0];
            if (isClose) {
                target.removeAttribute("class");
                target.setAttribute("class", classname);
            } else {
                target.removeAttribute("class");
                target.setAttribute("class", classname + " C" + classname.substring(1));
            }
            e.preventDefault();
        } else if (target.tagName.toUpperCase() == "STR") {
            var parentElement = target.parentElement;
            var originStr = parentElement.innerHTML;
            parentElement.innerHTML = parentElement.getAttribute("content");
            parentElement.setAttribute("content", originStr);
        } else if (target.tagName.toUpperCase() == "JSON") {
            if (document.getElementById("light")) {
                var lightDiv = document.getElementById("light");
                lightDiv.parentElement.removeChild(lightDiv);
            }
            if (document.getElementById("fade")) {
                var fadeDiv = document.getElementById("fade");
                fadeDiv.parentElement.removeChild(fadeDiv);
            }

            var parentElement = target.parentElement;

            var fadeDiv = document.createElement("div");
            fadeDiv.setAttribute("id", "fade");
            fadeDiv.classList.add("black_overlay");
            document.body.appendChild(fadeDiv);

            var lightDiv = document.createElement("div");
            lightDiv.setAttribute("id", "light");
            lightDiv.classList.add("white_content");
            document.body.appendChild(lightDiv);

            document.getElementById('light').style.display = 'block';
            document.getElementById('fade').style.display = 'block';
            draw(eval(parentElement.getAttribute("json")), lightDiv);
        } else if (target.classList.contains("black_overlay")) {
            var fadeDiv = document.getElementById("fade");
            fadeDiv.parentElement.removeChild(fadeDiv);
            var lightDiv = document.getElementById("light");
            lightDiv.parentElement.removeChild(lightDiv);
        } else if (target.className.toUpperCase() == DIV.toUpperCase()) {
            if (isHighlight) {
                if (target.style.borderLeft) {
                    target.removeAttribute("style");
                } else {
                    target.style = "border-left:1px solid";
                }
            }
        }
    }, true);
}
