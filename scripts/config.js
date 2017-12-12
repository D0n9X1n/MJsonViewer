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
        console.log("No Config find");
        fontStyle    = "Consolas";
        bgColor      = "#FDF6E3";
        intColor     = "#657A81";
        strColor     = "#2AA198";
        keyColor     = "#B58900";
        defaultColor = "#586E75";

        strictOnly   = false;
        hideDetails  = false;
        return;
    }
    if (result && result[0]) {
        fontStyle    = result[0].fontStyle    || "Consolas";
        bgColor      = result[0].bgColor      || "#FDF6E3";
        intColor     = result[0].intColor     || "#657A81";
        strColor     = result[0].strColor     || "#2AA198";
        keyColor     = result[0].keyColor     || "#B58900";
        defaultColor = result[0].defaultColor || "#586E75";

        strictOnly   = result[0].strictOnly   || false;
        hideDetails  = result[0].hideDetails  || false;
    } else {
        fontStyle    = result.fontStyle       || "Consolas";
        bgColor      = result.bgColor         || "#FDF6E3";
        intColor     = result.intColor        || "#657A81";
        strColor     = result.strColor        || "#2AA198";
        keyColor     = result.keyColor        || "#B58900";
        defaultColor = result.defaultColor    || "#586E75";

        strictOnly   = result.strictOnly      || false;
        hideDetails  = result.hideDetails     || false;
    }
}

