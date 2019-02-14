import { schema } from '@manuscripts/manuscript-transform'
import { Slice } from 'prosemirror-model'
import { transformPasted } from '../paste'

test('transformPasted handler', () => {
  const slice = Slice.fromJSON(schema, {
    content: [
      {
        type: 'paragraph',
        attrs: {},
        content: [{ type: 'hard_break' }],
      },
      {
        type: 'paragraph',
        attrs: {
          id: 'p-1',
        },
        content: [
          {
            type: 'text',
            text:
              'These rhythmic patterns then sum together to create the signals that muscles need to carry out the movements.',
          },
        ],
      },
    ],
    openStart: 1,
    openEnd: 1,
  })

  expect(slice.content.childCount).toBe(2)
  expect(slice.content.child(1).attrs.id).toBe('p-1')

  const result = transformPasted(slice)

  expect(result.content.childCount).toBe(1)
  expect(result.content.size).toBe(111)
  expect(slice.content.child(0).attrs.id).toBeNull()

  expect(result).toMatchSnapshot('transform-pasted')
})
