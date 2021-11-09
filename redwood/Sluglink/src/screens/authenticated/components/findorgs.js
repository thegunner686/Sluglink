import React from 'react';

import {
    StyleSheet
} from 'react-native';
import {
    Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import { Colors, Fonts, width } from '../../../styles';

export const FindOrganizationsButton = () => {
    const navigation = useNavigation();

    return (
        <Button
            title='Find Organizations to Follow'
            type='outline'
            buttonStyle={styles.button}
            titleStyle={[Fonts.Paragraph2, {
                color: Colors.SteelBlue.rgb
            }]}
            onPress={() => navigation.navigate('Explore')}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb
    }
});
