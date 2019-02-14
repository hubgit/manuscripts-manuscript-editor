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

// tslint:disable:max-classes-per-file
import { browserAdaptor } from 'mathjax3/mathjax3/adaptors/browserAdaptor'
import { AbstractMathDocument } from 'mathjax3/mathjax3/core/MathDocument'
import { AbstractMathItem } from 'mathjax3/mathjax3/core/MathItem'
import { TeX } from 'mathjax3/mathjax3/input/tex'
import { SVG } from 'mathjax3/mathjax3/output/svg'
import 'mathjax3/mathjax3/util/entities/all'

type Typeset = (math: string | null, display: boolean) => HTMLElement

export interface Mathjax {
  typeset: Typeset
}

class GenericMathDocument<N, T, D> extends AbstractMathDocument<N, T, D> {}
class GenericMathItem<N, T, D> extends AbstractMathItem<N, T, D> {}

const InputJax = new TeX({})
const OutputJax = new SVG()
const doc = new GenericMathDocument(document, browserAdaptor(), {
  InputJax,
  OutputJax,
})
document.head.appendChild(OutputJax.styleSheet(doc) as Node)

export const typeset = (math: string, display: boolean) => {
  const item = new GenericMathItem(math, InputJax, display)
  item.setMetrics(16, 8, 1000000, 100000, 1)
  item.compile(doc)
  item.typeset(doc)
  return item.typesetRoot
}
