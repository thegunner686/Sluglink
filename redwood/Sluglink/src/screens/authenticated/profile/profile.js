import React, { useCallback, useEffect, useState } from 'react';

import {
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native';
import {
    Button,
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Animated, {
    FadeInLeft
} from 'react-native-reanimated';

import { SettingsButton, StretchFlatList, EditButton } from './components';
import { useProfileWithPosts } from '../../../hooks';
import { Colors, Fonts, width, height, rgba } from '../../../styles';
import { useAuth } from '../../../hooks'

const Header = ({ profile }) => {
    const [signOut] = useAuth(state => [state.signOut])
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={{ uri: profile.picture }}
            style={styles.header}
        >
            <Animated.View
                style={styles.info}
                entering={FadeInLeft.delay(500)}
            >
                <Text style={Fonts.SubHeader1}>{profile.name}</Text>
                <Text style={[Fonts.Label1, {
                    color: Colors.Grey3.rgb
                }]}>{profile.category == 'Other' ? `(Other Category) ${profile.otherCategory}` : profile.category}</Text>
                <Text style={Fonts.Paragraph3}>{profile.description}</Text>
                <Button
                    type='outline'
                    title='Edit Profile'
                    titleStyle={Fonts.Paragraph2}
                    buttonStyle={styles.editButton}
                    containerStyle={{ marginTop: 10 }}
                    onPress={() => navigation.navigate('EditProfileScreen')}
                />
                <Button
                    type='solid'
                    title='sign out (testing)'
                    onPress={() => signOut()}
                />
            </Animated.View>
        </ImageBackground>
    );
};

export const ProfileScreen = ({ navigation }) => {
    const [profile, update, posts, isFetchingPosts, refreshPosts, fetchMorePosts] = useProfileWithPosts();

    const toggleDrawer = useCallback(() => {
        navigation.toggleDrawer();
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <EditButton onPress={() => navigation.navigate('EditProfileScreen')} />,
            headerRight: () => <SettingsButton onPress={toggleDrawer} />,
        });
    }, []);

    useEffect(() => {
        if (profile != null) refreshPosts();
    }, [profile]);

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'bottom', 'right']}
        >
            {profile != null && <StretchFlatList
                headerSize={40}
                header={<Header profile={profile} />}
                posts={posts}
                isFetching={isFetchingPosts}
                refresh={refreshPosts}
                fetchMore={fetchMorePosts}
            />}
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
    editButton: {
        width: width / 10 * 8,
        borderColor: Colors.SteelBlue.rgb,
    },
});
