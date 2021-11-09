import React from 'react';

import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../../styles';

export const NewEventScreen = () => {
    return (
        <SafeAreaView
            style={styles.container}
            edges={['bottom','left','right']}
        >
            <Text>Event</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
    }
});
