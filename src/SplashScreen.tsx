import { Markdown } from './Markdown'
import { md } from './tags'

const welcomeMessage = md`
welcome to workui, the TUI for [work CLI](https://github.com/tbrandenburg/work/)

If you're here, it's because you ran \`workui\` without any arguments _and_ you don't have a configured work context.

Here's how to remedy this:

- Configure a context: \`work context add my-project --tool github --repo owner/repo\`
- Set the context: \`work context set my-project\`
- Run \`workui items\` to view work items in the current context.
- Run commands that work across contexts, like \`workui items @my-project\` to specify context explicitly.
`.replaceAll(/\\/g, '')

export const SplashScreen = () => (
  <box
    paddingLeft={2}
    paddingRight={2}
    flexGrow={1}
    height='100%'
    maxWidth={64}
    margin='auto'
    flexDirection='column'
    gap={2}
  >
    <ascii-font text='workui' font='tiny' />
    <Markdown>{welcomeMessage}</Markdown>
  </box>
)
