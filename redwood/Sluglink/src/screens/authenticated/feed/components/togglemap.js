import React from 'react';

import { 
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Icon
} from 'react-native-elements';

import { sizes } from '../../../../styles';

export const ToggleMapButton = ({ toggle, onPress, slop=30 }) => {

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
                type='material-community'
                name={toggle ? 'map-marker-radius' : 'map-marker-radius-outline'}
                size={sizes.Icon4}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
