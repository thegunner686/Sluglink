import React, { useCallback, useEffect, useState } from "react";

import {
    StyleSheet,
    FlatList,
    RefreshControl,
} from "react-native";

import { Colors, height, rgba, Shadow } from '../../../../styles';

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    useAnimatedScrollHandler,
    useDerivedValue,
} from "react-native-reanimated";

import { Announcement } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const StretchFlatList = ({
    header,
    headerSize,
    posts,
    isFetching,
    fetchMore,
    refresh,
}) => {
    let offsetY = useSharedValue(0);
    
    let headerScale = useDerivedValue(() => {
        if(offsetY.value < 0) {
            return 1 + (-offsetY.value / height)
        } else {
            return 1 //+(-offsetY.value / height)
        }
    }, [offsetY.value]);

    let headerOpacity = useDerivedValue(() => {
        let val = 1 - (offsetY.value / (height * headerSize / 100))
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
                // {
                //     translateY: offsetY.value > 0 ? offsetY.value : offsetY.value / 1.2
                // }
            ]
        }
    });

    const renderPost = useCallback(({ item, index }) => {
        if(item.type === 'Announcement') {
            return (
                <Announcement post={item} index={index} />
            );
        }
    }, []);

    const Header = (
        <Animated.View style={[animatedHeaderStyle, {
            height: height * (headerSize / 100),
            marginBottom: height / 20
        }]}>
            {header}
        </Animated.View>
    );

    const Refresher = (
        <RefreshControl
            refreshing={isFetching}
            onRefresh={refresh}
        />
    );

    const keyExtractor = (item) => item.id;

    return (
        <SafeAreaView edges={['left', 'right']}>
            <AnimatedFlatList
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={Header}
                data={posts}
                renderItem={renderPost}
                keyExtractor={keyExtractor}
                refreshControl={Refresher}
                contentContainerStyle={styles.body}
                maxToRenderPerBatch={3}
                initialNumToRender={3}
                onEndReachedThreshold={0.01}
                onEndReached={fetchMore}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
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
        paddingBottom: height / 10,
    }
});
