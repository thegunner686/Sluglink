import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import {
    ListItem,
    Icon,
} from 'react-native-elements';
import {
    Modal
} from 'react-native-paper';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import { usePosts } from '../../../hooks';
import { Fonts, Colors, rgba, sizes, height } from '../../../styles';

const haptic_options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };

export const PostActions = ({ post, isVisible, toggle }) => {
    const [deleteMessageVisible, setDeleteMessageVisible] = useState(false);
    const [deletePost] = usePosts(state => [state.deletePost]);

    useEffect(() => {
        if(!isVisible) setDeleteMessageVisible(false);
    }, [isVisible]);

    const onDeletePress = useCallback(() => {
        ReactNativeHapticFeedback.trigger('impactLight', haptic_options);
        setDeleteMessageVisible(true);
    }, []);

    const onDeleteLongPress = useCallback(async () => {
        ReactNativeHapticFeedback.trigger('impactHeavy', haptic_options);
        setDeleteMessageVisible(false);
        try {
            await deletePost({ id: post.id });
        } catch(error) {
            console.error(error);
        }
    }, [post]);
    
    return (
        <Modal
            visible={isVisible}
            animationType='slide'
            onDismiss={toggle}
            contentContainerStyle={styles.container}
            style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}
        >
                {deleteMessageVisible && (
                    <Text style={[Fonts.Paragraph4, {
                        marginHorizontal: 10,
                        textAlign: 'center',
                        color: Colors.White.rgb
                    }]}>Hold down to delete.</Text>
                )}
                <ListItem 
                    Component={TouchableOpacity}
                    containerStyle={styles.delete}
                    onPress={onDeletePress}
                    onLongPress={onDeleteLongPress}
                    style={styles.listitem}
                >
                    <ListItem.Content style={styles.content}>
                        <Icon
                            name='delete-forever'
                            color={Colors.White.rgb}
                            size={sizes.Icon5}
                        />
                        <ListItem.Title style={[Fonts.Paragraph2, {
                            color: Colors.White.rgb,
                            paddingHorizontal: 5
                        }]}>
                            Delete Post
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                <ListItem 
                    Component={TouchableOpacity}
                    containerStyle={styles.cancel}
                    onPress={toggle}
                    style={styles.listitem}
                >
                    <ListItem.Content style={styles.content}>
                        <ListItem.Title style={[Fonts.Paragraph2, {
                            color: Colors.White.rgb,
                        }]}>
                            Cancel
                        </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listitem: {
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cancel: {
        backgroundColor: Colors.Red3.rgb,
        borderRadius: 10,
        margin: 10,
    },
    delete: {
        backgroundColor: Colors.SteelBlue.rgb,
        borderRadius: 10,
        margin: 10,
    }
})
