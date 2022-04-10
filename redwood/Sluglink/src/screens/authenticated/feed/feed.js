import React, {
    useEffect,
} from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NewPostButton } from './components';
import { PostsFlatList } from '../components';
import { useAuth, useFeed } from '../../../hooks';
import { Colors, Fonts, width, height } from '../../../styles';

import Animated, {
    FadeInUp
} from 'react-native-reanimated';

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

    const FindOrganizationsButton = (
        <View style={{ paddingTop: height / 3 }}>
            <Animated.View 
                entering={FadeInUp}
                style={{
                    alignSelf: 'center',
                }}
            >
                <Button
                    onPress={() => navigation.navigate('Explore')}
                    title='Find organizations to follow'
                    type='outline'
                    buttonStyle={styles.find}
                    titleStyle={[Fonts.Paragraph2, {
                        color: Colors.SteelBlue.rgb
                    }]}
                />
            </Animated.View>
        </View>
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
                fetchMore={fetchMoreFeed}
                emptyComponent={FindOrganizationsButton}
                navigation={navigation}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White.rgb,
        flex: 1,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    find: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb
    }
});
