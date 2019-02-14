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

import { ParagraphNode } from '@manuscripts/manuscript-transform'
import { EditorProps } from '../components/Editor'
import { NodeViewCreator } from '../types'
import Block from './block'

class Paragraph extends Block {
  protected node: ParagraphNode

  protected get elementType() {
    return 'p'
  }
}

const paragraph = (props: EditorProps): NodeViewCreator => (
  node,
  view,
  getPos,
  decorations
) => {
  // TODO: set a node property instead?
  for (const decoration of decorations) {
    if (decoration.spec.element) {
      return new Paragraph(props, node, view, getPos)
    }
  }

  const dom = document.createElement('p')

  return {
    dom,
    contentDOM: dom,
  }
}

export default paragraph
