import React, {
    useState
} from 'react';

import { 
    StyleSheet
} from 'react-native';
import {
    Button,
    Icon
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

import { Colors, Fonts, sizes } from '../../../../../styles';

export const UploadButton = ({ onPress }) => {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handlePress = async () => {
        if(loading) return;
        setLoading(true);

        await onPress();
        setLoading(false);
        navigation.navigate('FeedScreen');
    }
    return (
        <Button 
            title='Upload'
            type='solid'
            titleStyle={styles.title}
            containerStyle={styles.container}
            buttonStyle={styles.button}
            onPress={handlePress}
            loading={loading}
            icon={(
                <Icon
                    type='material-community'
                    name='upload'
                    size={sizes.Icon5}
                    color={Colors.White.rgb}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.Green3.rgb
    },
    container: {
        margin: 5,
    },
    title: {
        ...Fonts.Paragraph3,
        // color: Colors.Green3.rgb,
        color: Colors.White.rgb
    }
})
