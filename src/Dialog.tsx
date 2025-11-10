import { RGBA } from '@opentui/core'
import { useTerminalDimensions } from '@opentui/react'
import type { ReactNode } from 'react'

export const Component = ({
  children,
  onClose,
}: {
  children: ReactNode
  onClose: () => void
}) => {
  const dimensions = useTerminalDimensions()
  return (
    <box
      onMouseUp={() => onClose()}
      width={dimensions.width}
      height={dimensions.height}
      alignItems='center'
      position='absolute'
      paddingTop={dimensions.height / 4}
      left={0}
      top={0}
      backgroundColor={RGBA.fromHex('#000000cc')}
    >
      <box
        onMouseUp={async (e) => {
          e.stopPropagation()
        }}
        minWidth={48}
        maxWidth={dimensions.width - 2}
        padding={2}
        border
        borderColor='gray'
        borderStyle='rounded'
        position='relative'
      >
        {children}
      </box>
    </box>
  )
}
Component.displayName = 'Dialog.Component'
