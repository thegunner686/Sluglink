import React, { useEffect } from "react";

import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from "react-native";

import { Colors, height } from '../../../../styles';

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    useAnimatedScrollHandler,
    useDerivedValue,
} from "react-native-reanimated";

export const StretchList = ({ header, body, headerSize=50 }) => {

    let offsetY = useSharedValue(0);
    let headerShown = useSharedValue(true);

    useEffect(() => {
        headerShown.value = header != null;
    }, [header]);

    let headerScale = useDerivedValue(() => {
        if(offsetY.value < 0) {
            return 1 + (-offsetY.value / height)
        } else {
            return 1 //+(-offsetY.value / height)
        }
    }, [offsetY.value]);

    let headerOpacity = useDerivedValue(() => {
        let val = 1 - (offsetY.value / height)
        return Math.max(0, val)
    }, [offsetY.value])

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            let { y } = event.contentOffset;
            offsetY.value = y;
        }
    });

    const animatedHeaderStyle = useAnimatedStyle(() => {
        return {
            opacity: headerOpacity.value,
            transform: [
                {
                    scale: headerScale.value
                },
                {
                    translateY: offsetY.value > 0 ? offsetY.value : offsetY.value / 1.2
                }
            ]
        }
    });
    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
        <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            decelerationRate="fast"
            nestedScrollEnabled={true}
        >   
            <Animated.View
                style={[{
                    height: header == null ? 0 : height * (headerSize / 100)
                }, animatedHeaderStyle]}
            >
                {header}
            </Animated.View>
                
            <View style={styles.body}>
            {body}
            </View>
            
        </Animated.ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    body: {
        zIndex: 0,
        // ...Shadow.top,
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowColor: Colors.Black.rgb,
        shadowOpacity: 0.1,
        shadowRadius: 1,
        backgroundColor: Colors.White.rgb,
        minHeight: height,
        flexGrow: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        top: -20,
        padding: 5,
        paddingBottom: height / 10,
    }
});
