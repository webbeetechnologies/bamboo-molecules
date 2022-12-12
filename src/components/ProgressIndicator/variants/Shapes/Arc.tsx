import { Component } from 'react';
import { Linecap, Path } from 'react-native-svg';
import type { Animated } from 'react-native';

const CIRCLE = Math.PI * 2;

type Direction = 'clockwise' | 'counter-clockwise';

function makeArcPath(
    x: number,
    y: number,
    startAngleArg: number,
    endAngleArg: number,
    radius: number,
    direction: Direction,
) {
    let startAngle = startAngleArg;
    let endAngle = endAngleArg;
    if (endAngle - startAngle >= CIRCLE) {
        endAngle = CIRCLE + (endAngle % CIRCLE);
    } else {
        endAngle = endAngle % CIRCLE;
    }
    startAngle = startAngle % CIRCLE;
    const angle = startAngle > endAngle ? CIRCLE - startAngle + endAngle : endAngle - startAngle;

    if (angle >= CIRCLE) {
        return `M${x + radius} ${y}
            a${radius} ${radius} 0 0 1 0 ${radius * 2}
            a${radius} ${radius} 0 0 1 0 ${radius * -2}`;
    }

    const directionFactor = direction === 'counter-clockwise' ? -1 : 1;
    endAngle *= directionFactor;
    startAngle *= directionFactor;
    const startSine = Math.sin(startAngle);
    const startCosine = Math.cos(startAngle);
    const endSine = Math.sin(endAngle);
    const endCosine = Math.cos(endAngle);

    const arcFlag = angle > Math.PI ? 1 : 0;
    const reverseFlag = direction === 'counter-clockwise' ? 0 : 1;

    return `M${x + radius * (1 + startSine)} ${y + radius - radius * startCosine}
          A${radius} ${radius} 0 ${arcFlag} ${reverseFlag} ${x + radius * (1 + endSine)} ${
        y + radius - radius * endCosine
    }`;
}

type Props = {
    startAngle: number | Animated.AnimatedMultiplication<string | number>;
    endAngle: number;
    radius: number;
    offset: {
        top: number;
        left: number;
    };
    strokeCap: Linecap;
    strokeWidth: number;
    direction: Direction;
};

export default class Arc extends Component<Props> {
    render() {
        const {
            startAngle = 0,
            endAngle,
            radius,
            offset = { top: 0, left: 0 },
            direction = 'clockwise',
            strokeCap = 'butt',
            strokeWidth = 0,
            ...restProps
        } = this.props;

        const path = makeArcPath(
            (offset.left || 0) + strokeWidth / 2,
            (offset.top || 0) + strokeWidth / 2,
            startAngle,
            endAngle,
            radius - strokeWidth / 2,
            direction,
        );

        return (
            <Path
                fill="transparent"
                d={path}
                strokeLinecap={strokeCap}
                strokeWidth={strokeWidth}
                {...restProps}
            />
        );
    }
}
