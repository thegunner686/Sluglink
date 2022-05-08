import React, { useCallback, useMemo, useEffect } from 'react';

import {
    StyleSheet,
    Alert,
    View
} from 'react-native';
import { useNewEvent } from './neweventstore';
import { usePosts, useProfile } from "../../../../../hooks";
import { useStorage } from '../../../../../hooks';
import { DetailedEvent } from '../../../components/event/detailedevent'
import { UploadButton } from '../components';

export const NewEventScreen7 = ({ navigation, route }) => {
    const [createPost] = usePosts(state => [state.createPost]);
    const [newEvent, clearEvent] = useNewEvent(state => [state.newEvent, state.clearEvent]);
    const [profile] = useProfile();
    const [uploadPhotos] = useStorage(state => [state.uploadPhotos]);

    /**
     * Uploads all photos related to the event to the firebase storage bucket and
     * appends URLS to the .photos attribute, then uploads event
     */
    const postEvent = useCallback(async () => {
        // Upload photos to firebase and store urls
        let photos = [];
        try {
            photos = await uploadPhotos('Events', newEvent.photos)
        } catch (error) {
            console.log(error);
        }
        console.log({ photos })

        // Construct new event obj
        const event = {
            ...newEvent,
            photos,
            type: 'Event',
            category: profile.category,
            otherCategory: profile.otherCategory || undefined
        };

        // Attempt to post
        try {
            await createPost(event);
        } catch (error) {
            Alert.alert("We were unable to post the event at this moment, please try again in a moment");
            console.log(error);
        }

        // Clear event data and navigate to feed
        clearEvent();
        setTimeout(() => {
            navigation.navigate('Home');
        }, 100);
    }, [newEvent, profile, createPost, clearEvent, uploadPhotos]);

    useEffect(() => {
        setTimeout(() => {
            navigation.setOptions({
                headerRight: () => <UploadButton onPress={postEvent} />
            });
        }, 500);
    }, [newEvent.location, postEvent])


    return (
        <View style={styles.container}>
            <DetailedEvent
                event={{
                    ...newEvent,
                    organizationId: profile?.uid
                }}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
