import { DEFAULT_ARROW_HEIGHT } from './constants';

export const getDiagonalLength = (height: number, width: number) => {
    return Math.pow(height * height + width * width, 0.5);
};

const getArrowLeft = (triggerMeasurements: number[]) => {
    const [triggerX = 0, , triggerWidth = 0] = triggerMeasurements || [];
    return !triggerWidth ? null : triggerX + triggerWidth / 2;
};

const getArrowTop = (triggerMeasurements: number[]) => {
    const [, triggerY = 0, , triggerHeight = 0] = triggerMeasurements || [];
    return !triggerHeight ? null : triggerY + triggerHeight / 2;
};

export const getArrowStyles = (props: any) => {
    const defaultArrowHeight = DEFAULT_ARROW_HEIGHT;

    const additionalStyles: any = {
        transform: [],
    };

    const diagonalLength = getDiagonalLength(defaultArrowHeight, defaultArrowHeight);

    if (props.placement === 'top' && props.width) {
        additionalStyles.transform.push({ translateX: -props.width / 2 });
        additionalStyles.transform.push({ rotate: '45deg' });
        additionalStyles.bottom = -Math.ceil((diagonalLength - defaultArrowHeight) * 0.75);
        additionalStyles.borderBottomWidth = 1;
        additionalStyles.borderRightWidth = 1;
        additionalStyles.left = getArrowLeft(props.triggerMeasurements);
    }

    if (props.placement === 'bottom' && props.width) {
        additionalStyles.transform.push({ translateX: -props.width / 2 });
        additionalStyles.transform.push({ rotate: '45deg' });
        additionalStyles.top = -Math.ceil((diagonalLength - defaultArrowHeight) * 0.75);
        additionalStyles.borderTopWidth = 1;
        additionalStyles.borderLeftWidth = 1;
        additionalStyles.left = getArrowLeft(props.triggerMeasurements);
    }

    if (props.placement === 'left' && props.height) {
        additionalStyles.transform.push({ translateY: -props.height / 2 });
        additionalStyles.transform.push({ rotate: '45deg' });
        additionalStyles.right = -Math.ceil((diagonalLength - defaultArrowHeight) * 0.75);
        additionalStyles.borderTopWidth = 1;
        additionalStyles.borderRightWidth = 1;
        additionalStyles.top = getArrowTop(props.triggerMeasurements);
    }

    if (props.placement === 'right' && props.height) {
        additionalStyles.transform.push({ translateY: -props.height / 2 });
        additionalStyles.transform.push({ rotate: '45deg' });
        additionalStyles.left = -Math.ceil((diagonalLength - defaultArrowHeight) * 0.75);
        additionalStyles.borderBottomWidth = 1;
        additionalStyles.borderLeftWidth = 1;
        additionalStyles.top = getArrowTop(props.triggerMeasurements);
    }

    return additionalStyles;
};
export const getContainerStyle = ({ placement, arrowHeight }: any) => {
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
