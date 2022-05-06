
import React, {
    useEffect,
    useState,
    useMemo,
    useCallback
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    Icon
} from 'react-native-elements';
import Animated, {
    FadeInDown,
    FadeOutUp,
} from "react-native-reanimated";

import { usePosts, useOrganization } from '../../../../hooks';
import { Fonts, Colors, width, sizes } from '../../../../styles';
import { ThumbnailGallery } from './components/thumbnailgallery';
import { EventChips } from './eventchips';
import { getDayWithEnding, getMonthName, getNumeralTime, getNumeralDateAndTime } from '../../../../utils';
import { PostHeader } from '../postheader';

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
        console.log(event);
    }, []);

    /**
     * TODO: Truncate at last word (or space) to avoid 'we wi...'
     */
    const truncatedDescription = useMemo(() => {
        const charLimit = 100;

        if (event?.description && event.description.length > charLimit) {
            let i = charLimit
            for (; i > 80; i--) {
                if (event?.description[i] === ' ') break;
            }
            return event.description.slice(0, i) + '...';
        } else {
            return event?.description;
        }
    }, [event?.description]);

    const navigateToEvent = useCallback(() => {
        navigation.navigate('ViewEvent', { id: event.id })
    }, [navigation, event?.id]);

    const startDate = useMemo(() => new Date(event?.startDate), [event?.startDate])
    const createdAt = useMemo(() => event?.createdAt.toDate(), [event?.createdAt])
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)}
            exiting={FadeOutUp}
            style={styles.container}
        >
            <PostHeader
                post={post}
                organization={organization}
            />
            <ThumbnailGallery photos={event?.photos || []} />
            <TouchableOpacity style={styles.button} onPress={navigateToEvent}>
                <View style={styles.titleAndTime}>
                    <Text style={styles.title}>{event?.title}</Text>
                    <Icon
                        type='material-community'
                        name='calendar'
                        size={sizes.Icon5}
                        color={Colors.Black}
                    />
                    <Text style={styles.time}>{` ${getMonthName(startDate)} ${getDayWithEnding(startDate)} at ${getNumeralTime(startDate)}`}</Text>
                </View>
                <View style={styles.descriptionAndChevron}>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>{truncatedDescription}</Text>
                    </View>
                    <View style={styles.chevronContainer}>
                        <Icon
                            name='chevron-right'
                            size={sizes.Icon5}
                        />
                    </View>
                </View>
                <EventChips isVirtual={event?.isVirtual} isPhysical={event?.isPhysical}/>
                <View style={styles.footer}>
                    <Text style={styles.createdAt}>Posted {getNumeralDateAndTime(createdAt)}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 10 * 9,
        paddingVertical: 20,
    },
    button: {
        paddingTop: 10,
        width: '100%'
    },
    titleAndTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        flex: 1,
        ...Fonts.Paragraph1,
    },
    time: {
        ...Fonts.Paragraph4
    },
    descriptionContainer: {
        width: '100%',
    },
    description: {
        ...Fonts.Paragraph4
    },
    footer: {
        width: '100%',
    },
    createdAt: {
        color: Colors.Grey3.rgb,
        ...Fonts.Label4
    },
    descriptionAndChevron: {
        display: 'flex',
        flexDirection: 'row',
    },
    descriptionContainer: {
        flex: 1,
    },
    chevronContainer: {
        justifyContent: 'center'
    }
});
