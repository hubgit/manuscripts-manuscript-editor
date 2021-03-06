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

import { ManuscriptNodeView } from '@manuscripts/manuscript-transform'

import { ViewerProps } from '../components/Viewer'
import { BaseNodeView } from './base_node_view'
import { createNodeView } from './creators'

export class InlineFootnoteView<PropsType extends ViewerProps>
  extends BaseNodeView<PropsType>
  implements ManuscriptNodeView {
  public initialise = () => {
    this.createDOM()
    this.updateContents()
  }

  public selectNode = () => {
    // TODO: select and scroll to the footnote without changing the URL?
    this.props.history.push('#' + this.node.attrs.rid)
  }

  public updateContents = () => {
    this.dom.textContent = this.node.attrs.contents
  }

  public ignoreMutation = () => true

  protected createDOM = () => {
    this.dom = document.createElement('span')
    this.dom.classList.add('footnote')
  }
}

export default createNodeView(InlineFootnoteView)
