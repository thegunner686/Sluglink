import React from 'react';

import { 
    StyleSheet,
} from 'react-native';
import {
    Icon,
    Button
} from 'react-native-elements';

import { Fonts, Colors, sizes } from '../../../../styles';

export const NewPostButton = ({ onPress, slop=20 }) => {
    return (
        <Button
            onPress={onPress}
            type='clear'
            title='Post'
            buttonStyle={styles.button}
            titleStyle={[Fonts.Paragraph2, {
                color: Colors.SteelBlue.rgb
            }]}
            containerStyle={styles.container}
            icon={() => (
                <Icon 
                    name='add'
                    size={sizes.Icon5}
                    color={Colors.SteelBlue.rgb}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    button: {

    },
    container: {
        marginRight: 10,
    }
})
