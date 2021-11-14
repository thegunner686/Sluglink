import React, {
    useEffect,
} from 'react';

import {
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewPostButton } from './components';
import { PostsFlatList } from '../components';
import { useAuth, useFeed } from '../../../hooks';
import { Colors, width } from '../../../styles';

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

    return (
        <SafeAreaView 
            edges={['left', 'right']}
            style={styles.container}
        >
            <PostsFlatList
                posts={feed}
                refresh={refreshFeed}
                isFetching={isFetchingFeed}
                fetchMore={fetchMoreFeed}
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
