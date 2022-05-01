import React from 'react';

import {
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'react-native-elements';

import { Colors, rgba, sizes } from '../../../../styles';

export const BackButton = ({ onPress, icon, offset=true }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    left: offset ? 10 : 0,
                    top: offset ? 10 : -10,
                }
            ]}
            onPress={onPress}
            hitSlop={{
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }}
        >
            <Icon 
                name={icon || 'close'}
                color={Colors.White.rgb}
                size={sizes.Icon5}
            />
        </TouchableOpacity>
    );
};

const size = 30;

const styles = StyleSheet.create({
    container: {
        width: size,
        height: size,
        backgroundColor: rgba(Colors.Black)(0.8),
        borderRadius: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
});
