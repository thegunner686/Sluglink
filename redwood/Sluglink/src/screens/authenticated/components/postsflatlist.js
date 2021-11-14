import React from 'react';

import {
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';

import { Announcement } from './announcement';

export const PostsFlatList = ({ posts, isFetching, fetchMore, refresh }) => {    
    const renderPost = ({ item, index }) => {
        if(item.type === 'Announcement') {
            return (
                <Announcement post={item} index={index}/>
            )
        }
    };

    const keyExtractor = (item) => item.id;

    const Refresher = (
        <RefreshControl
            refreshing={isFetching}
            onRefresh={refresh}
        />
    );
    
    return ( posts == null || posts.length == 0 ? null :
        <FlatList
            data={posts}
            refreshing={isFetching}
            renderItem={renderPost}
            keyExtractor={keyExtractor}
            refreshControl={Refresher}
            maxToRenderPerBatch={3}
            onEndReachedThreshold={0.01}
            onEndReached={fetchMore}
        />
    );
};

export const styles = StyleSheet.create({
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
});
