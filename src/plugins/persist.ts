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

import {
  generateNodeID,
  isListNode,
  ManuscriptNode,
  ManuscriptSchema,
} from '@manuscripts/manuscript-transform'
import { Plugin } from 'prosemirror-state'

/**
 * This plugin ensures that all nodes which need ids (i.e. `id` is defined in the node spec's attributes) are given an id, and that there aren't any duplicate ids in the document.
 */
export default () => {
  return new Plugin<null, ManuscriptSchema>({
    appendTransaction: (transactions, oldState, newState) => {
      // get the transaction from the new state
      const tr = newState.tr

      // only scan if nodes have changed
      if (!transactions.some((transaction) => transaction.docChanged)) {
        return null
      }

      // TODO: keep track of changed nodes that haven't been saved yet?
      // TODO: call insertComponent directly?

      const ids = new Set()

      const nodesToUpdate: Array<{
        node: ManuscriptNode
        pos: number
        id: string
      }> = []

      const processNode = (
        parentNode: ManuscriptNode,
        parentPos = 0,
        insideList = false
      ) => {
        parentNode.forEach((node, offset) => {
          if (node.isText) {
            return
          }

          // node pos
          const pos = parentPos + offset

          // set ids for nodes that need them, except blocks inside lists
          if ('id' in node.attrs && (!insideList || node.isInline)) {
            const { id } = node.attrs

            if (id) {
              if (ids.has(id)) {
                // give the duplicate node a new id
                // TODO: maybe change the other node's ID?
                const id = generateNodeID(node.type)
                nodesToUpdate.push({ node, pos, id })
                ids.add(id)
              } else {
                ids.add(id)
              }
            } else {
              // set the id on the node at this position
              const id = generateNodeID(node.type)
              nodesToUpdate.push({ node, pos, id })
              ids.add(id)
            }
          }

          const isList = () => isListNode(node)

          if (node.childCount) {
            processNode(node, pos + 1, insideList || isList())
          }
        })
      }

      processNode(newState.doc, 0, false)

      // update the nodes and return the transaction if something changed
      if (nodesToUpdate.length) {
        for (const { node, pos, id } of nodesToUpdate) {
          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            id,
          })
        }

        return tr.setSelection(newState.selection.map(tr.doc, tr.mapping))
      }
    },
  })
}
