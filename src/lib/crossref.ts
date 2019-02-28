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

import { stringify } from 'qs'
import { convertDataToBibliographyItem } from '../csl'

const search = (query: string, rows: number, mailto: string) =>
  window
    .fetch(
      'https://api.crossref.org/works?' +
        stringify({
          filter: 'type:journal-article',
          query,
          rows,
          mailto,
        })
    )
    .then(response => response.json())
    .then(({ message: { items, 'total-results': total } }) => ({
      items: items.map(convertDataToBibliographyItem),
      total,
    }))

const fetch = (doi: string, mailto: string) =>
  window
    .fetch(
      `https://api.crossref.org/works/${encodeURIComponent(
        doi
      )}/transform/application/vnd.citationstyles.csl+json?` +
        stringify({
          mailto,
        })
    )
    .then(response => response.json())
    .then(convertDataToBibliographyItem)

export const crossref = { fetch, search }
