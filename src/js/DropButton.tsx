import { Canvas, Group, Mask, Oval, Rect, RoundedRect } from '@shopify/react-native-skia'

export interface DropButtonProps {
  buttonSize?: number
  color?: string
  buttonColor?: string
  children: React.ReactNode
}

export const DropButton = ({
  buttonSize: buttonSizeProp,
  color: colorProp,
  buttonColor: buttonColorProp,
  children,
}: DropButtonProps): React.ReactElement => {
  const [{ contentWidth, contentHeight }, setMeasures] = useState<{
    contentWidth: number
    contentHeight: number
  }>({
    contentWidth: 0,
    contentHeight: 0,
  })

  const color = colorProp ?? '#AAAAAA'
  const buttonColor = buttonColorProp ?? 'purple'
  const buttonSize = buttonSizeProp ?? Math.min(contentWidth, contentHeight) * 0.8

  const OVERFLOW_FACTOR = 0.3
  const BUTTON_BORDER_SIZE = buttonSize * 0.2

  const circleMaskSize = buttonSize + BUTTON_BORDER_SIZE
  const circleOverflow = buttonSize * OVERFLOW_FACTOR
  const circleMaskOverflow = circleOverflow + BUTTON_BORDER_SIZE / 2
  const rectBorderRadius = Math.min(contentWidth, contentHeight) * 0.8
  const contentPadding = rectBorderRadius * 0.5

  const rectWidth = contentWidth + rectBorderRadius
  const rectHeight = contentHeight + rectBorderRadius
  const canvasWidth = rectWidth + circleMaskOverflow
  const canvasHeight = rectHeight + circleMaskOverflow

  const measureContent = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setMeasures({ contentWidth: width, contentHeight: height })
  }, [])

  return (
    <PressableScale
      style={{
        width: rectWidth,
        height: rectHeight,
      }}>
      <Canvas style={{ flex: 1 }}>
        <Mask
          mode="luminance"
          mask={
            <Group>
              <RoundedRect
                x={0}
                y={0}
                width={rectWidth}
                height={rectHeight}
                r={rectBorderRadius}
                color="white"
              />
              <Oval
                x={rectWidth - circleMaskSize + circleMaskOverflow}
                y={-circleMaskOverflow}
                width={circleMaskSize}
                height={circleMaskSize}
                color="black"
              />
            </Group>
          }>
          <Rect x={0} y={0} width={canvasWidth} height={canvasHeight} color={color} />
        </Mask>
      </Canvas>
      <View
        onLayout={measureContent}
        style={{
          position: 'absolute',
          marginTop: contentPadding,
          marginLeft: contentPadding,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {children}
      </View>
      <View
        style={{
          position: 'absolute',
          right: -circleOverflow,
          top: -circleOverflow,
          width: buttonSize,
          height: buttonSize,
        }}>
        <PressableScale
          style={{
            width: '100%',
            height: '100%',
            borderRadius: buttonSize,
            backgroundColor: buttonColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SomeIcon name="edit" size={buttonSize * 0.5} color="white" />
        </PressableScale>
      </View>
    </PressableScale>
  )
}

// Usage

export const Screen = () => {
  return (
    <View style={{flex: 1}}>
      <DropButton>
        <Text
          style={{ color: 'white', fontSize: 45 }}
          numberOfLines={1}
          ellipsizeMode="clip">
          Hello World
        </Text>
      </DropButton>
    </View>
  )
}
