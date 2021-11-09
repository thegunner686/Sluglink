import React from 'react';

import { 
    StyleSheet
} from 'react-native';
import {
    Button
} from 'react-native-elements';

import { Colors, Fonts } from '../../../../styles';

export const UpdateButton = ({ onPress }) => {
    return (
        <Button 
            title='Update'
            type='outline'
            titleStyle={styles.title}
            containerStyle={styles.container}
            buttonStyle={styles.button}
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: Colors.Green3.rgb
    },
    container: {
        margin: 5
    },
    title: {
        ...Fonts.Paragraph3,
        color: Colors.Green3.rgb
    }
})
