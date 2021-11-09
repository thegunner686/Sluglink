import React from 'react';

import {
    StyleSheet,
    FlatList,
    RefreshControl,
    View
} from 'react-native';

import { Announcement } from './announcement';

export const PostsFlatList = ({ posts, isFetching, refresh, footer }) => {    
    const renderPost = ({ item }) => {
        if(item.type === 'Announcement') {
            return (
                <Announcement post={item} />
            )
        }
    };

    const Footer = (
        <View style={styles.footer}>
            {footer}
        </View>
    );

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
            ListFooterComponent={Footer}
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
