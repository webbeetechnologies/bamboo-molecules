import { DEFAULT_ARROW_HEIGHT } from './constants';

export const getDiagonalLength = (height: number, width: number) => {
    return Math.pow(height * height + width * width, 0.5);
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
        additionalStyles.bottom = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
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
        additionalStyles.right = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
        additionalStyles.borderTopWidth = 1;
        additionalStyles.borderRightWidth = 1;
    }

    if (props.placement === 'right' && props.height) {
        additionalStyles.transform.push({ translateY: -props.height / 2 });
        additionalStyles.transform.push({ rotate: '45deg' });
        additionalStyles.left = Math.ceil((diagonalLength - defaultArrowHeight) / 2);
        additionalStyles.borderBottomWidth = 1;
        additionalStyles.borderLeftWidth = 1;
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
