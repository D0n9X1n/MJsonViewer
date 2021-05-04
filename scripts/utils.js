// ////////////////////////////////////////////////////////////////////////////////////
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
  // ////////////////////////////////////////////////////////////////////////////////////


// ===========================================
// UTIL TOOLS
  // ===========================================


function isBASE64(str) {
  try {
    const res = new Buffer(a, 'base64').toString();
    return res != undefined;

  } catch (e) {
    return false;
  }
}

function isJSON(str) {
  if (typeof str === 'string') {
    try {
      if (str[0] == '"') {
        str = eval(str);
      }

    } catch (e) {
      // here we just ignore the result
      // dlog(e);
    }


    try {
      const obj = eval(`(${str})`);

      if (str[0] == '{' || str[0] == '[') {
        return true;
      }

    } catch (e) {
      dlog(e);
    }
  }
  return false;
}

function isLink(str) {
  if (str.startsWith('http') || str.startsWith('mailto')
    || str.startsWith('\'http') || str.startsWith('"http')) {
    str = eval(str);
  }

  const regex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
  return regex.test(str);
}

function showPopup(str, div) {
  div.innerHTML = str;
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(
    function() {
      console.log('Async: Copying to clipboard was successful!');
    },
    function(err) {
      console.error('Async: Could not copy text: ', err);
    });
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
