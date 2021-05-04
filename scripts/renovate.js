// Copyright © 2017 TangDongxin
//
// Permission is hereby granted, free of charge, to any person obtaining
// A copy of this software and associated documentation files (the "Software"),
// To deal in the Software without restriction, including without limitation
// The rights to use, copy, modify, merge, publish, distribute, sublicense,
// And/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// In all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// ===========================================
// JSON RENOVATER
// ===========================================


function onRenovate(result) {
  if (dontBeatify) {
    return;
  }


  const css = 'color:#666; cursor:pointer;';
  const items = document.getElementsByClassName(`S${RAND}`);

  for (let i = 0; i < items.length; i++) {
    if (isJSON(items[i].innerHTML)) {
      items[i].setAttribute('json', items[i].innerHTML);
      items[i].setAttribute(
        'content',
        `<str style="${css}"> [← str →]  </str><json style="${
          css}"> [← json →]  </json>${
            items[i].innerHTML.substring(
              0, 10)} ··· ${items[i].innerHTML.substr(-10, 10)}`);
      items[i].innerHTML
        = `<str style="${css}"> [→ str ←]  </str><json style="${
          css}"> [← json →]  </json>${items[i].innerHTML}`;

    } else if (items[i].innerHTML.length > strLength) {
      items[i].setAttribute(
        'content',
        `<str style="${css}"> [← str →]  </str>${
          items[i].innerHTML.substring(
            0, 10)} ··· ${items[i].innerHTML.substr(-10, 10)}`);
      items[i].innerHTML
        = `<str style="${css}"> [→ str ←]  </str>${items[i].innerHTML}`;

    } else if (isLink(items[i].innerHTML)) {
      items[i].setAttribute('url', eval(items[i].innerHTML));
      items[i].setAttribute(
        'content',
        `<str style="${css}"> [← str →]  </str><url style="${
          css}"> [← url →]  </url> ${
            items[i].innerHTML.substring(
              0, 10)} ··· ${items[i].innerHTML.substr(-10, 10)}`);
      items[i].innerHTML = `<str style="${css}"> [→ str ←]  </str><url style="${
        css}"> [← url →]  </url>${items[i].innerHTML}`;

    } else if (isBASE64(items[i].innerHTML)) {
      continue;
      // TODO to support BASE64
      dlog(items[i]);
      items[i].setAttribute('base64', items[i].innerHTML);
      items[i].setAttribute(
        'content',
        `<str style="${css}"> [← str →]  </str><base64 style="${
          css}"> [← base64 →]  </base64>${
            items[i].innerHTML.substring(
              0, 10)} ··· ${items[i].innerHTML.substr(-10, 10)}`);
      items[i].innerHTML
        = `<str style="${css}"> [→ str ←]  </str><base64 style="${
          css}"> [← base64 →]  </base64>${items[i].innerHTML}`;
    }
  }
}
