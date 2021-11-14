import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Alert,
} from 'react-native';
import {
    Button
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import Animated, {
    SlideInLeft,
    SlideOutLeft,
    FadeInLeft
} from 'react-native-reanimated';

import { Colors, Fonts, width, height, rgba } from '../../../styles';
import { StretchFlatList, BackButton } from './components';
import { useFollowing, useOrganizationWithPosts } from '../../../hooks';
import { capitalize } from '../../../utils';

const Header = ({ profile, uid }) => {
    const [isFollowing, follow, unfollow] = useFollowing(uid);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const onFollowClick = useCallback(async () => {
        setLoading(true);
        try {
            if(isFollowing) {
                Alert.alert('', `Are you sure you want to unfollow ${profile?.name}?`, [
                    {
                        text: 'No',
                    },
                    {
                        text: 'Yes',
                        onPress: async () => { await unfollow() }
                    }
                ]);
            } else {
                await follow();
            }
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }, [profile, isFollowing, follow, unfollow]);

    return (
        <ImageBackground
            source={{ uri: profile?.picture }}
            style={styles.header}
        >
            <BackButton onPress={navigation.goBack} />
            <Animated.View
                style={styles.info}
                entering={FadeInLeft.delay(500)}
            >
                <Text style={Fonts.SubHeader1}>{profile?.name}</Text>
                <Text style={[Fonts.Label1, {
                    color: Colors.Grey3.rgb
                }]}>{profile?.category == 'Other' ? `(Other Category) ${profile?.otherCategory}` : capitalize(profile?.category)}</Text>
                <Text style={Fonts.Paragraph3}>{profile?.description}</Text>
                <Button 
                    type={isFollowing ? 'solid' : 'outline'}
                    title={isFollowing ? 'Following' : 'Follow'}
                    buttonStyle={styles.followButton}
                    titleStyle={[Fonts.Paragraph2, {
                        color: isFollowing ? Colors.White.rgb : Colors.SteelBlue.rgb
                    }]}
                    containerStyle={{ marginTop: 10}}
                    onPress={onFollowClick}
                    loading={loading}
                />
            </Animated.View>
        </ImageBackground>
    );
};

export const ViewProfileScreen = ({ navigation, route }) => {
    const [profile, posts, isFetchingPosts, refreshPosts, fetchMorePosts] = useOrganizationWithPosts(route.params.uid);
    const focused = useIsFocused();
    useEffect(() => {
        if(profile != null) refreshPosts();
    }, [profile]);

    return (
        <SafeAreaView 
            style={styles.container}
            edges={['left', 'right']}
        >
            {focused && 
            <StretchFlatList
                headerSize={40}
                header={profile?.uid != null && <Header profile={profile} uid={route.params.uid}/>}
                posts={posts}
                isFetching={isFetchingPosts}
                refresh={refreshPosts}
                fetchMore={fetchMorePosts}
            />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb
    },
    header: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    info: {
        width: width / 10 * 9,
        minHeight: height / 20 * 3,
        backgroundColor: rgba(Colors.White)(0.9),
        marginBottom: height / 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    followButton: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb,
    },
});
