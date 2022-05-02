import React from 'react';

import {
    TouchableOpacity
} from 'react-native';

import {
    Icon
} from 'react-native-elements';
import { Colors } from '../../styles';

export const BackButton = ({ name="chevron-left", goBack, color, slop=30 }) => {
    return (
        <TouchableOpacity
            onPress={goBack}
            hitSlop={{
                left: slop, right: slop, top: slop, bottom: slop
            }}
        >
            <Icon
                name={name}
                color={color || Colors.Black.rgb}
            />
        </TouchableOpacity>
    )
}
