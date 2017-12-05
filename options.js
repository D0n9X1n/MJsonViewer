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

function setPreviewColor(result) {
    console.log("load Color");
    document.getElementById("fontLabel").style.fontFamily         = result.fontStyle    || "Consolas";
    document.querySelector("#bgColorLabel").style.backgroundColor = result.bgColor      || "#FDF6E3";
    document.querySelector("#intColorLabel").style.color          = result.intColor     || "#657A81";
    document.querySelector("#strColorLabel").style.color          = result.strColor     || "#2AA198";
    document.querySelector("#keyColorLabel").style.color          = result.keyColor     || "#B58900";
    document.querySelector("#defaultColorLabel").style.color      = result.defaultColor || "#586E75";

    document.querySelector("#strictOnly").checked                 = result.strictOnly   || false;
    document.querySelector("#hideDetails").checked                = result.hideDetails  || false;
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        bgColor:      document.querySelector("#bgColor").value,
        intColor:     document.querySelector("#intColor").value,
        strColor:     document.querySelector("#strColor").value,
        keyColor:     document.querySelector("#keyColor").value,
        defaultColor: document.querySelector("#defaultColor").value,
        fontStyle:    document.querySelector("#fontStyle").value,

        strictOnly:   document.querySelector("#strictOnly").checked,
        hideDetails:  document.querySelector("#hideDetails").checked
    });
    alert("Success");
    browser.storage.local.get().then(setCurrentChoice, onError);
}

function setCurrentChoice(result) {
    console.log(result);
    document.querySelector("#bgColor").value       = result.bgColor      || "#FDF6E3";
    document.querySelector("#intColor").value      = result.intColor     || "#657A81";
    document.querySelector("#strColor").value      = result.strColor     || "#2AA198";
    document.querySelector("#keyColor").value      = result.keyColor     || "#B58900";
    document.querySelector("#defaultColor").value  = result.defaultColor || "#586E75";
    document.querySelector("#fontStyle").value     = result.fontStyle    || "Consolas";

    document.querySelector("#strictOnly").checked  = result.strictOnly   || false;
    document.querySelector("#hideDetails").checked = result.hideDetails  || false;

    setPreviewColor(result);
}

function restoreOptions() {
    browser.storage.local.get().then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
