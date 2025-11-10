import * as BunContext from '@effect/platform-bun/BunContext'
import { skipToken } from '@tanstack/react-query'
import * as Effect from 'effect/Effect'
import * as Layer from 'effect/Layer'
import * as Option from 'effect/Option'

import * as GitHub from './GitHub'
import * as RQE from './ReactQueryEffect'
import { Repo } from './Repo'

export const currentDirectoryRepo = () =>
  RQE.queryOptions({
    queryKey: ['currentDirectoryRepo'] as const,
    queryFn: () =>
      Effect.runPromiseExit(
        Repo.currentRepo.pipe(
          Effect.provide(Layer.merge(Repo.Default, BunContext.layer)),
          Effect.orDie
        )
      ),
  })

export const pullRequests = (options: {
  author: Option.Option<string>
  repo: Option.Option<{ owner: string; name: string }>
}) =>
  RQE.queryOptions({
    queryKey: ['pulls', options] as const,
    queryFn: () =>
      Effect.runPromiseExit(
        GitHub.PullRequests.list(options).pipe(
          Effect.provide(
            Layer.merge(GitHub.PullRequests.Default, BunContext.layer)
          )
        )
      ),
  })

export const pullRequestReadme = (options: {
  number: Option.Option<number>
  repo: Option.Option<string>
}) => {
  return RQE.queryOptions({
    queryKey: ['pull', options],
    queryFn: Option.match(options.number, {
      onSome: (number) => () =>
        Effect.runPromiseExit(
          GitHub.PullRequests.readme({
            ...options,
            number,
          }).pipe(
            Effect.provide(
              Layer.merge(GitHub.PullRequests.Default, BunContext.layer)
            )
          )
        ),
      onNone: () => skipToken,
    }),
  })
}

export const issues = (options: {
  author: Option.Option<string>
  repo: Option.Option<{ owner: string; name: string }>
}) =>
  RQE.queryOptions({
    queryKey: ['issues', options] as const,
    queryFn: () =>
      Effect.runPromiseExit(
        GitHub.Issues.list(options).pipe(
          Effect.provide(Layer.merge(GitHub.Issues.Default, BunContext.layer))
        )
      ),
  })
