import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import { Fonts } from '../../../styles';

export const NextButton = ({ onPress }) => (
    <TouchableOpacity 
        onPress={onPress}
        style={styles.container}
    >
        <Text style={Fonts.Paragraph3}>Next</Text>
        <Icon
            name="chevron-right"
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
