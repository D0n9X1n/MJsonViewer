// Copyright © 2017 Tangdongxin

// Permission is hereby granted, free of charge, to any person obtaining
// A copy of this software and associated documentation files (the "Software"),
// To deal in the Software without restriction, including without limitation
// The rights to use, copy, modify, merge, publish, distribute, sublicense,
// And/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included
// In all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


// ===========================================
// WORK FLOW
// ===========================================
const getting = browser.storage.sync.get();
getting.then(onConfig, onError)
  .then(onParse, onError)
  .then(onRenovate, onError);
