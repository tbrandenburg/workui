import { TextAttributes } from '@opentui/core'
import { useKeyboard } from '@opentui/react'
import * as DateTime from 'effect/DateTime'
import * as Match from 'effect/Match'
import * as Option from 'effect/Option'
import { useCallback, useState } from 'react'
import invariant from 'tiny-invariant'

import { Loading } from './Loading'
import * as Queries from './Queries'
import * as RQE from './ReactQueryEffect'

export const PullRequests = ({
  author: initialAuthor,
}: {
  author: Option.Option<string>
}) => {
  // TODO filter author?
  const [author, _setAuthor] = useState<Option.Option<string>>(initialAuthor)
  const repo = RQE.useQuery(Queries.currentDirectoryRepo())
  const pulls = RQE.useQuery(
    Queries.pullRequests({
      author,
      repo: Option.none(),
    })
  )

  const [selectedPr, setSelectedPr] = useState<Option.Option<number>>(
    Option.none()
  )

  const readme = RQE.useQuery(
    Queries.pullRequestReadme({
      number: selectedPr,
      repo: Option.none(),
    })
  )

  const shiftFocus = useCallback(() => {}, [])

  useKeyboard((key) => {
    if (key.name === 'tab') {
      shiftFocus()
    }
  })

  return (
    <box padding={2} flexDirection='column'>
      <ascii-font text='ghui' font='tiny' marginBottom={2} />
      <box flexDirection='row' alignItems='center' gap={1}>
        {Match.value(repo).pipe(
          Match.when({ isLoading: true }, () => <Loading kind='dots' />),
          Match.when({ isSuccess: true }, ({ data: repo }) => (
            <>
              <text>{Option.getOrThrow(repo)}</text>
              <text>{'→'}</text>
              <text>pulls</text>
              {Option.isSome(selectedPr) && (
                <>
                  <text>{'→'}</text>
                  <text>#{selectedPr.value}</text>
                </>
              )}
            </>
          )),
          Match.orElse(() => null)
        )}
      </box>
      <box flexDirection='row'>
        <box minWidth={48} border borderColor='gray'>
          {Match.value(pulls).pipe(
            Match.when({ isLoading: true }, () => <Loading kind='dots' />),
            Match.when({ isSuccess: true }, ({ data: prs }) => (
              <select
                focused
                height='100%'
                options={prs.map((pr) => ({
                  name: pr.title,
                  value: pr.number,
                  description: `#${pr.number} | ${pr.user.login} | ${DateTime.format(pr.created_at)}`,
                }))}
                onSelect={(index, option) => {
                  invariant(option)
                  invariant(typeof option.value === 'number')
                  setSelectedPr(Option.some(option.value))
                }}
              ></select>
            )),
            Match.orElse(() => null)
          )}
        </box>
        <scrollbox
          flexGrow={1}
          height='100%'
          border
          borderColor='gray'
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          {Match.value(readme).pipe(
            Match.when({ isLoading: true }, () => <Loading kind='dots' />),
            Match.when({ status: 'success' }, ({ data }) =>
              data.length > 0 ? (
                <text>{data}</text>
              ) : (
                <text attributes={TextAttributes.DIM}>No PR description</text>
              )
            ),
            Match.orElse(() => null)
          )}
        </scrollbox>
      </box>
    </box>
  )
}
