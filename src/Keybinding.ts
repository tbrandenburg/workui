import * as Data from 'effect/Data'

export class Keybinding extends Data.TaggedClass('Keybinding')<{
  readonly name: string
  readonly description: string
  readonly key: string
}> {}
