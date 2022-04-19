import React, { useEffect, useState } from "react";
import {
    View,
    Dimensions
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from 'react-native-reanimated';


export const ProgressBar = (props) => {
    const width = Dimensions.get("window").width;
    const animation = useSharedValue({ width: 0 });

    const animationStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(animation.value.width, {
                duration: 1000
            })
        }
    })

    useEffect(() => {
        animation.value = { width: props.progress * width }
    }, []);

    return (
        <View style={{ height: 20, width: "90%", position: "absolute", marginTop: 10, marginHorizontal: "5%", borderRadius: 10, backgroundColor: "#F2F2F2" }}>
            <Animated.View
                style={[{ height: "100%", backgroundColor: "#FFD500", borderRadius: 10 }, animationStyle]}
            />
        </View>
    )
}