import React, { useCallback, useEffect, useState } from 'react';

import {
    Text,
    View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    Button, Icon,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useFollowing } from '../../../hooks';
import functions from '@react-native-firebase/functions';

import styles from './ProfileScreen.styles.js';
import { PostsFlatList } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import { useOrganizationWithPosts, useOrganization } from '../../../hooks';
import { getProfilePosts, useProfile } from '../../../hooks/useProfile';

// TODO:
// edit profile page for organization category

const EditProfileButtons = ({ navigation }) => (
    <View style={styles.buttonContainer}>
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

const FollowButton = ({ uid, isFollowing, follow, unfollow }) => {
    const [loading, setLoading] = useState({ follow: false, report: false });

    const onFollow = () => {
        setLoading({ ...loading, follow: true });
        (isFollowing ? unfollow : follow)().then(() => {
            setLoading({ ...loading, follow: false });
        });
    };

    const onReport = () => {

        setLoading({ ...loading, report: true });
        functions().httpsCallable('users-report')({ 
            reportId: uid
         }).then(() => {
            setLoading({ ...loading, report: false});
        });
    };

    return (
        <View style={styles.buttonContainer}>
            <Button
                title={isFollowing ? "Unfollow" : "Follow"}
                titleStyle={styles.button.title}
                containerStyle={styles.button.container}
                onPress={onFollow}
                loading={loading.follow}
            />
            <Button 
                title=""
                icon={
                    <Icon
                        name="report"
                        size={16}
                        color="white"
                    />
                }
                titleStyle={styles.button.title}
                buttonStyle={styles.button.report}
                containerStyle={styles.button.container}
                onPress={onReport}
                loading={loading.report}
            />
        </View>
    )
};


export default ProfileScreen = ({ navigation, route }) => {
    const user = useAuth(state => state.user);
    const isOwnProfile = !(route.params && route.params.uid) || route.params.uid == user.uid;
    const uid = isOwnProfile ? user.uid : route.params.uid;
    const [profile, posts, fetching, refresh, fetchMore] = useOrganizationWithPosts(uid);

    const [isFollowing, follow, unfollow] = useFollowing(route.params?.uid || user.uid);

    if (!profile)
        return (<View />);

    const category = profile.category == "Other" ? `(Other) ${profile.otherCategory}` : profile.category;

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
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.email}>{profile.email}</Text>
            </View>

            {isOwnProfile ? <EditProfileButtons navigation={navigation} /> : <FollowButton uid={uid} isFollowing={isFollowing} follow={follow} unfollow={unfollow} />}

            <PostsFlatList posts={posts} refresh={refresh} isFetching={fetching} fetchMore={fetchMore} emptyComponent={<View></View>} navigation={navigation} />
        </SafeAreaView>
    );
};