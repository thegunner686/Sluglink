import React, { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
    Button
} from 'react-native-elements';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';
import { Fonts } from '../../../../../styles';

export const NextButton = (props) => {
    const animation = useSharedValue({ opacity: 0 });

    const animationStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(animation.value.opacity, {
                duration: 200
            })
        }
    })

    useEffect(() => {
        console.log(props.on);
        props.on ? animation.value = { opacity: 1 } : animation.value = { opacity: 0 };
    }, [props.on])

    return (
        <TouchableOpacity style={{ height: 55, width: "80%", alignSelf: "center" }} onPress={() => props.onPress()}>
            <Animated.View
                style={[animationStyle, { backgroundColor: "#00509D", borderRadius: 40, height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }]}
            >
                <Text style={{ color: "white", fontSize: 20, fontFamily: "HelveticaNeue-Bold" }}>
                    Continue
                </Text>
            </Animated.View>
        </TouchableOpacity>
    )
}