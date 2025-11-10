import * as Data from 'effect/Data'

export type DialogKind = Data.TaggedEnum<{ Keybindings: {} }>
export const DialogKind = Data.taggedEnum<DialogKind>()
