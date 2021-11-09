import React, {
    useEffect,
} from 'react';

import {
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewPostButton } from './components';
import { FetchMoreButton, FindOrganizationsButton, PostsFlatList } from '../components';
import { useAuth, useFeed } from '../../../hooks';
import { Colors, width } from '../../../styles';

/**
 * 
 * @param {allow write: if false;
      allow read: if request.auth != null && request.auth.uid == userId;} param0 
 * @returns 
 */

export const FeedScreen = ({ navigation }) => {
    const [user, customClaims] = useAuth(state => [state.user, state.customClaims]);
    const [feed, isFetchingFeed, refreshFeed, fetchMoreFeed] = useFeed(5);

    useEffect(() => {
        navigation.setOptions({
            headerRight: customClaims?.organization == false ? null :
            () => <NewPostButton onPress={() => navigation.navigate('NewPost')}/>,
        });
    }, [customClaims]);

    useEffect(() => {
        if(user == null) return;
        refreshFeed();
    }, [user]);

    const Footer = (
        feed != null && feed.length > 0 ?
            <FetchMoreButton fetchMore={fetchMoreFeed} isFetching={isFetchingFeed} /> :
            <FindOrganizationsButton />
    );

    return (
        <SafeAreaView 
            edges={['left', 'right']}
            style={styles.container}
        >
            <PostsFlatList
                posts={feed}
                refresh={refreshFeed}
                isFetching={isFetchingFeed}
                footer={Footer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White.rgb,
        flex: 1,
    },
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    seeMore: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb
    }
});
