// ////////////////////////////////////////////////////////////////////////////////////{{{
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
// ////////////////////////////////////////////////////////////////////////////////////}}}

// ===========================================
// JSON HEADER REWRITE
// ===========================================

let strictOnly;
let isDebug;

function onError (e) {

  console.log(e);

}

function findJsonMimeType (header) {

  if (strictOnly) {

    if (isDebug) {

      console.log('strict mode Only');

    }

    return false;

  }

  if (header.name === undefined) {

    return false;

  }

  return header.name.toLowerCase() === 'content-type' && header.value.includes('json');

}

function addJsonHandler (request) {

  return new Promise((resolve) => {

    if (request.responseHeaders.find(findJsonMimeType)) {

      const jsonHeader = {
        'name': 'Content-Type',
        'value': 'application/json',
      };
      request.responseHeaders.push(jsonHeader);

    }

    resolve({
      'responseHeaders': request.responseHeaders,
    });

  });

}

function onConfig (result) {

  if (!result) {

    strictOnly = false;
    isDebug = false;

  }
  if (result && result[0]) {

    strictOnly = result[0].strictOnly || false;
    isDebug = result[0].isDebug || false;

  } else {

    strictOnly = result.strictOnly || false;
    isDebug = result.isDebug || false;

  }

}

function onRecv () {

  browser.webRequest.onHeadersReceived.addListener(
    addJsonHandler, {
      'urls': ['<all_urls>', ],
    }, [
      'blocking',
      'responseHeaders',
    ]
  );

}

browser.storage.onChanged.addListener(function (changes, areaName) {

  if (areaName != 'local') {

    return;

  }

  isDebug = changes.isDebug.newValue;
  strictOnly = changes.strictOnly.newValue;

});

const getting = browser.storage.local.get();
getting.then(onConfig, onError).then(onRecv, onError);
