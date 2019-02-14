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

import { EditorProps } from '../components/Editor'
import { placeholderContent } from '../lib/placeholder'
import { NodeViewCreator } from '../types'
import Block from './block'

class PlaceholderElement extends Block {
  private element: HTMLElement

  protected get elementType() {
    return 'div'
  }

  protected createElement() {
    this.element = document.createElement(this.elementType)
    this.element.className = 'block'
    this.element.setAttribute('id', this.node.attrs.id)
    this.dom.appendChild(this.element)

    const content = document.createElement('div')
    content.className = 'placeholder-item'
    content.innerHTML = placeholderContent(
      'An element',
      'support@manuscriptsapp.com'
    )
    this.element.appendChild(content)
  }

  protected updateContents() {
    // empty
  }
}

const placeholderElement = (props: EditorProps): NodeViewCreator => (
  node,
  view,
  getPos
) => new PlaceholderElement(props, node, view, getPos)

export default placeholderElement
