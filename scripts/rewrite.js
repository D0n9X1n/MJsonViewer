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

// ===========================================
// JSON HEADER REWRITE
// ===========================================

function findJsonMimeType(header) {
    if (header.name === undefined) {
        return false;
    }
    return header.name.toLowerCase() === 'content-type' && header.value.includes('json');
};

function addJsonHandler(request) {
    return new Promise((resolve) => {
        if (request.responseHeaders.find(findJsonMimeType)) {
            const jsonHeader = {
                name: 'Content-Type',
                value: 'application/json'
            };
            request.responseHeaders.push(jsonHeader);
        }

        resolve({
            responseHeaders: request.responseHeaders
        });
    });
};

browser.webRequest.onHeadersReceived.addListener(
    addJsonHandler, {
        urls: ['<all_urls>']
    }, [
        'blocking',
        'responseHeaders'
    ]
);
