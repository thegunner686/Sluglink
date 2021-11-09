import React from 'react';

import {
    StyleSheet
} from 'react-native';
import {
    Button,
} from 'react-native-elements';

import { Colors, Fonts, width } from '../../../styles';

export const FetchMoreButton = ({ fetchMore, isFetching }) => {
    return (
        <Button
            title='See More'
            type='outline'
            buttonStyle={styles.button}
            titleStyle={[Fonts.Paragraph2, {
                color: Colors.SteelBlue.rgb
            }]}
            onPress={fetchMore}
            loading={isFetching}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb
    }
});
