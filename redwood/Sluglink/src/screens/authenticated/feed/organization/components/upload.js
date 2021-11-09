import React from 'react';

import { 
    StyleSheet
} from 'react-native';
import {
    Button,
    Icon
} from 'react-native-elements';

import { Colors, Fonts } from '../../../../../styles';

export const UploadButton = ({ onPress, loading }) => {
    return (
        <Button 
            title='Upload'
            type='clear'
            titleStyle={styles.title}
            containerStyle={styles.container}
            buttonStyle={styles.button}
            onPress={onPress}
            loading={loading}
        />
    );
};

const styles = StyleSheet.create({
    button: {
    },
    container: {
        margin: 5,
    },
    title: {
        ...Fonts.Paragraph3,
        // color: Colors.Green3.rgb,
        color: Colors.Green3.rgb
    }
})
