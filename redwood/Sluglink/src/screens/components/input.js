import React from 'react';

import {
    StyleSheet
} from 'react-native';
import {
    Input
} from 'react-native-elements';

import { Colors, Fonts } from '../../styles';

export const StyledInput = React.forwardRef((props, ref) => {
    return (
        <Input
            {...props}
            ref={ref}
            inputStyle={[styles.inputStyle, props.inputStyle]}
            inputContainerStyle={[styles.inputContainerStyle, props.inputContainerStyle]}
        />
    );
});

const styles = StyleSheet.create({
    inputStyle: {
        ...Fonts.Paragraph4,
        textAlign: 'left'
    },
    inputContainerStyle: {
        backgroundColor: Colors.White.rgb,
        borderColor: Colors.Grey5.rgb,
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    }
});
