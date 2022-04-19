
import React, {
    useEffect,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    Divider
} from 'react-native-elements';
import Animated, {
    AnimatedLayout,
    SlideInUp,
    SlideInLeft,
    SlideOutDown,
    Layout,
    SlideOutLeft,
    FadeInDown,
    FadeOutUp,
} from "react-native-reanimated";

import { PostHeader } from '../postheader';
import { usePosts, useOrganization } from '../../../../hooks';
import { Fonts, Colors } from '../../../../styles';
import { EventFooter } from './eventfooter';

export const Event = ({
    index,
    post,
    navigation,
}) => {
    const [getPost] = usePosts(state => [state.getPost]);
    const [organization] = useOrganization(post.organizationId);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const res = await getPost(post.id);
            setEvent(res);
        };
        if (post?.id != null) fetch();
    }, [post.id]);

    // useEffect(() => console.log(event), [])
    /*

    Snippet used for testing w mock data. Not sure if the data is modelled correctly. 
    The event uses the same scheme specified in loblolly/functions/post.js

    // hard-coded org
    const organization = useOrganization("72rrxDVACYx4o0MpYGaoDE0ueUKL");

    const now = new Date(); 
    // hard-coded event
    const event = {
        type: "Event",
        id: "bA5smHgfFqyiHAmogEO3",
        organizationId: "72rrxDVACYx4o0MpYGaoDE0ueUKL",
        
        createdAt: now,
        content: "Some text about the event",
        link: "https://google.com/",

        title: "Some event",
        starttime: now,
        endtime: now,

        photos: [],

        location: {
            name: "Your mom's house",
            address: "151 Clay St",
            latitude: -100,
            longitude: -100,
            notes: "Knock before entering"
        },
        
        isVirtual: true,
        isPhysical: true,

    }
    */

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)}
            exiting={FadeOutUp}
            style={styles.container}
        >
            <PostHeader post={post} organization={organization} type={post.type} />

            <TouchableOpacity onPress={() => console.log("Screen not specified yet")}>
                <View style={styles.content}>
                    <Text style={[Fonts.Graph4, {
                        lineHeight: 25,
                    }]}>{post?.title}</Text>
                </View>
                <EventFooter event={post} />
                <Divider width={1} color={Colors.Grey6.rgb} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10,
    },
    content: {
    }
});
