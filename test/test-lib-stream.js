/* Copyright 2016 Myles Borins
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var path = require('path');
var fs = require('fs');

var test = require('tap').test;
var concat = require('concat-stream');

var Esmall = require('../lib');
var simplePath = path.join(__dirname, 'fixtures', 'simple.js');
var expected = 'const a=213;let b=123;const c=123456;var d=2134;console.log(a+b*c/d);';

test('test stream interface', (t) => {
  var rs = fs.createReadStream(simplePath);
  var esmall = new Esmall();
  rs.pipe(esmall).pipe(concat((data) => {
    t.equals(data.toString(), expected, 'it should be minified');
    t.end();
  }));
});
