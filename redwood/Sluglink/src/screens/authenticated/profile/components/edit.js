import React from 'react';

import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';

import { Fonts, Colors, sizes } from '../../../../styles';

export const EditButton = ({ onPress, slop = 30 }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
            hitSlop={{
                left: slop,
                right: slop,
                bottom: slop,
                top: slop
            }}
        >
            <Icon
                size={sizes.Icon4}
                name='edit'
            />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        // margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
