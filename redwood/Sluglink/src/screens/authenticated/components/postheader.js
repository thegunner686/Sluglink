import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {
    Portal,
} from 'react-native-paper';
import { useAuth } from '../../../hooks';
import { Fonts, Colors, sizes } from '../../../styles';
import { capitalize } from '../../../utils';
import { PostActions } from './postactions';
import { useNavigation, useRoute } from '@react-navigation/core';

export const PostHeader = ({
    post,
    organization,
}) => {
    const [user] = useAuth(state => [state.user]);
    const [actionsVisible, setActionsVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    const viewProfile = useCallback(() => {
        navigation.navigate('ViewProfile', {
            uid: post.organizationId
        });
    }, [navigation, post]);

    const toggleActions = useCallback(() => {
        setActionsVisible(!actionsVisible);
    }, [actionsVisible]);

    const typeColorStyle = { color: (post?.type == "Announcement" ? Colors.Red4.rgb : Colors.Blue4.rgb) };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.profile} onPress={viewProfile}>
                    <View style={styles.pictureContainer}>
                        <FastImage
                            source={{
                                uri: organization?.picture,
                                priority: FastImage.priority.high,
                            }}
                            style={styles.picture}
                            placeholderStyle={styles.placeholderPicture}
                        />
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={Fonts.Paragraph1}>{organization?.name}</Text>
                            <Text style={Fonts.Label4}>
                                {organization?.category == 'Other' ?
                                    `(Other Category) ${organization?.otherCategory} ` :
                                    organization?.category
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* {user != null && organization != null */}
                <TouchableOpacity style={styles.menuButton} onPress={toggleActions}>
                    <Icon
                        name='dots-horizontal'
                        type='material-community'
                        size={sizes.Icon4}
                        color={Colors.Black.rgb}
                    />
                </TouchableOpacity>
                {/* : */}
                {/* null */}
                {/* } */}
            </View>
            <Portal >
                <PostActions
                    post={post}
                    isVisible={actionsVisible}
                    toggle={toggleActions}
                    report={user?.uid !== organization?.uid}
                />
            </Portal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    profile: {
        flex: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    pictureContainer: {
        paddingRight: 10
    },
    picture: {
        width: sizes.Icon3,
        height: sizes.Icon3,
        borderRadius: 100,
    },
    placeholderPicture: {
        backgroundColor: 'transparent'
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    menuButton: {
        flex: 1,
        alignItems: 'flex-end'
    }
});
