import React from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    Input
} from 'react-native-elements';
import { Fonts } from '../../../../../styles';
import { StyledInput } from '../../../../components';

export const CappedInput = React.forwardRef((props, ref) => {
    const { value, maxChars } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.charactercount}>{value?.length}/{maxChars}</Text>
            <StyledInput
                {...props}
                ref={ref}
                onChangeText={(text) => {
                    if(text.length > maxChars) return;
                    props.onChangeText(text);
                }}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    charactercount: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        ...Fonts.Label5
    }
});
