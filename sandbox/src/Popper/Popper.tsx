import React, { ReactElement, RefObject } from 'react';
import { useOverlayPosition } from '@react-native-aria/overlays';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const defaultArrowHeight = 15;
const defaultArrowWidth = 15;

const getDiagonalLength = (height: number, width: number) => {
  return Math.pow(height * height + width * width, 0.5);
};


export type IPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'right top'
  | 'right bottom'
  | 'left top'
  | 'left bottom';

export type IPopperProps = {
  shouldFlip?: boolean;
  crossOffset?: number;
  offset?: number;
  children: React.ReactNode;
  shouldOverlapWithTrigger?: boolean;
  trigger?: ReactElement | RefObject<any>;
  placement?: IPlacement;
};

type PopperContext = IPopperProps & {
  triggerRef: any;
  onClose: any;
  setOverlayRef?: (overlayRef: any) => void;
};

const PopperContext = React.createContext({} as any);
const usePopperContext = () => {
    return React.useContext(PopperContext);
}

export const PopperContextProvider = ({children, ...props}: any) => {
    return <PopperContext.Provider value={ props } children={children} />
}

export const PopperContent = React.forwardRef(
  ({ children, style, ...rest }: any, ref: any) => {
    const {
      isOpen,
      triggerRef,
      shouldFlip,
      crossOffset,
      offset,
      scrollRef,
      closeOnScroll = true,
      placement: placementProp,
      onClose,
      shouldOverlapWithTrigger,
      setOverlayRef,
    } = usePopperContext();


    const overlayRef = React.useRef(null);
    // const { top } = useSafeAreaInsets();

    const {
      overlayProps,
      rendered,
      arrowProps,
      placement,
      updatePosition,
    } = useOverlayPosition({
      scrollRef,
      targetRef: triggerRef,
      overlayRef,
      shouldFlip: shouldFlip,
      crossOffset: crossOffset,
      isOpen: isOpen,
      offset: offset,
      placement: placementProp as any,
      containerPadding: 0,
      onClose: closeOnScroll ? onClose : null,
      shouldOverlapWithTrigger,
    });


    const restElements: React.ReactNode[] = [];
    let arrowElement: React.ReactElement | null = null;

    React.useEffect(() => {
      setOverlayRef && setOverlayRef(overlayRef);
    }, [overlayRef, setOverlayRef]);

    // Might have performance impact if there are a lot of siblings!
    // Shouldn't be an issue with popovers since it would have atmost 2. Arrow and Content.
    React.Children.forEach(children, (child) => {
      if (
        React.isValidElement(child) &&
        // @ts-ignore
        child.type.displayName === 'PopperArrow'
      ) {
        arrowElement = React.cloneElement(child, {
          // @ts-ignore
          arrowProps,
          actualPlacement: placement,
        });
      } else {
        restElements.push(child);
      }
    });

    let arrowHeight = 0;
    let arrowWidth = 0;

    if (arrowElement) {
      arrowHeight = defaultArrowHeight;
      arrowWidth = defaultArrowWidth;

      //@ts-ignore
      if (arrowElement.props.height) {
        //@ts-ignore
        arrowHeight = arrowElement.props.height;
      }

      //@ts-ignore
      if (arrowElement.props.width) {
        //@ts-ignore
        arrowWidth = arrowElement.props.width;
      }
    }

    const containerStyle = React.useMemo(
      () =>
        getContainerStyle({
          placement,
          arrowHeight,
          arrowWidth,
        }),
      [arrowHeight, arrowWidth, placement]
    );

    const overlayStyle = React.useMemo(
      () =>
        StyleSheet.create({
          overlay: {
            ...overlayProps.style,
            // To handle translucent android StatusBar
            // marginTop: Platform.select({ android: top, default: 0 }),
            opacity: rendered ? 1 : 0,
            position: 'absolute',
          },
        }),
      [rendered, overlayProps.style]
    );

    if (!isOpen) return <React.Fragment></React.Fragment>

    return (
      <ScrollView ref={overlayRef} collapsable={false} style={overlayStyle.overlay}>
        {arrowElement}
        <View
          style={StyleSheet.flatten([containerStyle, style])}
          {...rest}
          ref={ref}
        >
          
          {restElements}
        </View>
      </ScrollView>
    );
  }
);

// This is an internal implementation of PopoverArrow
export const PopperArrow = React.forwardRef(
  (
    {
      height = defaultArrowHeight,
      width = defaultArrowWidth,

      //@ts-ignore - Will be passed by React.cloneElement from PopperContent
      arrowProps,
      //@ts-ignore - Will be passed by React.cloneElement from PopperContent
      actualPlacement,
      style,
      borderColor = '#52525b',
      backgroundColor = 'black',
      ...rest
    }: any,
    ref: any
  ) => {
    const additionalStyles = React.useMemo(
      () => getArrowStyles({ placement: actualPlacement, height, width }),
      [actualPlacement, height, width]
    );

    const triangleStyle: ViewStyle = React.useMemo(
      () => ({
        position: 'absolute',
        width,
        height,
      }),
      [width, height]
    );

    const arrowStyles = React.useMemo(
      () => [arrowProps.style, triangleStyle, additionalStyles, style],
      [triangleStyle, additionalStyles, arrowProps.style, style]
    );

    return (
      <View
        ref={ref}
        style={arrowStyles}
        borderColor={borderColor}
        backgroundColor={backgroundColor}
        {...rest}
      />
    );
  }
);

const getArrowStyles = (props: any) => {
  const additionalStyles: any = {
    transform: [],
  };

  const diagonalLength = getDiagonalLength(
    defaultArrowHeight,
    defaultArrowHeight
  );

  if (props.placement === 'top' && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: '45deg' });
    additionalStyles.bottom = Math.ceil(
      (diagonalLength - defaultArrowHeight) / 2
    );
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }

  if (props.placement === 'bottom' && props.width) {
    additionalStyles.transform.push({ translateX: -props.width / 2 });
    additionalStyles.transform.push({ rotate: '45deg' });
    additionalStyles.top = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }

  if (props.placement === 'left' && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: '45deg' });
    additionalStyles.right = Math.ceil(
      (diagonalLength - defaultArrowHeight) / 2
    );
    additionalStyles.borderTopWidth = 1;
    additionalStyles.borderRightWidth = 1;
  }

  if (props.placement === 'right' && props.height) {
    additionalStyles.transform.push({ translateY: -props.height / 2 });
    additionalStyles.transform.push({ rotate: '45deg' });
    additionalStyles.left = Math.ceil(
      (diagonalLength - defaultArrowHeight) / 2
    );
    additionalStyles.borderBottomWidth = 1;
    additionalStyles.borderLeftWidth = 1;
  }

  return additionalStyles;
};

const getContainerStyle = ({ placement, arrowHeight }: any) => {
  const diagonalLength = getDiagonalLength(arrowHeight, arrowHeight) / 2;

  if (placement === 'top') {
    return { marginBottom: diagonalLength };
  }

  if (placement === 'bottom') {
    return { marginTop: diagonalLength };
  }

  if (placement === 'left') {
    return { marginRight: diagonalLength };
  }

  if (placement === 'right') {
    return { marginLeft: diagonalLength };
  }

  return {};
};

PopperArrow.displayName = 'PopperArrow';
// Popper.Content = PopperContent;
// Popper.Arrow = PopperArrow;

