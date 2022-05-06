import React, { useCallback, useState } from 'react';

import {
    Text,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useFollowing } from '../../../hooks';

import styles from './ProfileScreen.styles.js';
import { PostsFlatList } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import { useOrganizationWithPosts } from '../../../hooks';
import { getProfilePosts, useProfile } from '../../../hooks/useProfile';

// TODO:
// edit profile page for organization category
// add report account button

const EditProfileButtons = ({ navigation }) => (
    <View style={ styles.buttonContainer }>
        <Button 
            title='Edit Profile'
            titleStyle={styles.button.title}
            containerStyle={styles.button.container}
            onPress={() => navigation.navigate('EditProfileScreen')} 
        />
        <Button 
            title='Settings'
            titleStyle={styles.button.title}
            containerStyle={styles.button.container}
            onPress={() => navigation.navigate('ProfileSettingsScreen')} 
        />
    </View>
);

const FollowButton = ({ isFollowing, follow, unfollow }) => {
    const [ loading, setLoading ] = useState(false);
    
    const onClick = () => {
        setLoading(true);
        (isFollowing ? unfollow : follow)().then(() => {
            setLoading(false);
        });
    };

    return (
        <View style={ styles.buttonContainer }>
            <Button
                title={ isFollowing ? "Unfollow" : "Follow" }
                titleStyle={styles.button.title}
                containerStyle={styles.button.container}
                onPress={onClick}
                loading={loading}
            />
        </View>
    )
};


export default ProfileScreen = ({ navigation, route }) => {
    const user = useAuth(state => state.user);
    const isOwnProfile = !(route.params && route.params.uid) || route.params.uid == user.uid;
    const uid = isOwnProfile ? user.uid : route.params.uid;

    // when navigating to this screen, change state so that it refreshes the profile
    // important after editing your profile

    // load profile data
    const [profile, posts, fetching, refresh, fetchMore] = useOrganizationWithPosts(uid);
    const [isFollowing, follow, unfollow] = useFollowing(route.params?.uid || user.uid);

    if(!profile)
        return (<View />);

    const category = profile.otherCategory ? `(Other) ${profile.otherCategory}` : profile.category;

    return (
        <SafeAreaView 
            style={styles.container}
            edges={['left', 'right']}
        >
            <View style={styles.background}></View>
            <View style={styles.content}>
                <Text style={styles.profileHeaderText}>Profile</Text>
                <FastImage
                    style={styles.profilePicture}
                    source={{
                        uri: profile.picture,
                        priority: FastImage.priority.high,
                    }}
                />
                <Text style={styles.name}>{profile.name}</Text>
                {profile.organization && <Text style={styles.category}>{category}</Text>}
                <Text style={styles.email}>{profile.email}</Text>
            </View>

            {isOwnProfile ? <EditProfileButtons navigation={navigation} /> : <FollowButton isFollowing={isFollowing} follow={follow} unfollow={unfollow} />}
            
            {profile.organization && 
                <PostsFlatList posts={posts} refresh={refresh} isFetching={fetching} fetchMore={fetchMore} emptyComponent={<Text>empty</Text>} navigation={navigation} />
            }
        </SafeAreaView>
    );
};