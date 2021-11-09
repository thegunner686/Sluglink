import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Divider
} from 'react-native-elements';

import { usePosts, useOrganization } from '../../../../hooks';
import { PostHeader } from '../postheader';
import { AnnouncementFooter } from './announcementfooter';
import { Fonts, Colors } from '../../../../styles';

export const Announcement = ({
    post,
}) => {
    const [getPost] = usePosts(state => [state.getPost]);
    const [organization] = useOrganization(post.organizationId);
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPost(post.id);
            setAnnouncement(res);
        };
        if(post?.id != null) fetch();
    }, [post.id]);

    return (
        <View style={styles.container}>
            <PostHeader post={announcement} organization={organization} type={post?.type} />
            <View style={styles.content}>
                <Text style={[Fonts.Graph4, {
                    lineHeight: 25,
                }]}>{announcement?.content}</Text>
            </View>
            <AnnouncementFooter announcement={announcement} />
            <Divider width={1} color={Colors.Grey6.rgb}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginBottom: 50,
        padding: 10,
    },
    content: {
    }
});
