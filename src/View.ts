import * as Data from 'effect/Data'
import * as Option from 'effect/Option'
import * as Schema from 'effect/Schema'

export type View = Data.TaggedEnum<{
  SplashScreen: {}
  PullRequests: { readonly author: Option.Option<string> }
  Issues: {}
}>
export const { SplashScreen, PullRequests, Issues } = Data.taggedEnum<View>()

export const CLISchema = Schema.Literal('pr')
export type CLISchema = typeof CLISchema.Type
