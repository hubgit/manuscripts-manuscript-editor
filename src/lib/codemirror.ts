/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

type CreateEditor = (value: string, mode: string) => Promise<CodeMirror.Editor>

export interface CodeMirrorCreator {
  createEditor: CreateEditor
}

export const createEditor: CreateEditor = async (value, mode) => {
  await import(`codemirror/mode/${mode}/${mode}.js`)
  // TODO: tell webpack to only match js files in this path

  // tslint:disable-next-line:no-empty
  return CodeMirror(() => {}, {
    autofocus: true,
    lineNumbers: true,
    lineWrapping: true,
    mode,
    value,
  })
}
