import React from 'react';

import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import Animated, {
    FadeInLeft,
    FadeOutRight
} from 'react-native-reanimated';
import { Fonts } from '../../../styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const NextButton = ({ onPress }) => (
    <AnimatedTouchableOpacity 
        onPress={onPress}
        style={styles.container}
        entering={FadeInLeft}
        exiting={FadeOutRight}
    >
        <Text style={Fonts.Paragraph3}>Next</Text>
        <Icon
            name="chevron-right"
        />
    </AnimatedTouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
