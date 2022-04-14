import React from 'react';

import {
    StyleSheet,
    Text,
    Alert,
    View
} from 'react-native';
import {
    Icon,
    Button,
    Image
} from 'react-native-elements';
import Animated, {
    FadeInLeft,
    FadeOutLeft,
    FadeInUp,
    FadeOutUp,
} from 'react-native-reanimated';
import { Colors, Fonts, sizes, width, height, rgba } from '../../../../../styles';
import { useNewEvent } from './neweventstore';
import { DetailedEvent } from "../../components/detailedevent";
import { usePosts, useProfile } from '../../../../../hooks';

export const NewEventScreen6 = ({ navigation, route }) => {
    const [createPost] = usePosts(state => [state.createPost]);
    const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
    const [profile] = useProfile();

    const postEvent = async () => {

        const event = {
            ...newEvent,
            type: 'Event',
            category: profile.category,
            otherCategory: profile.otherCategory || undefined
        };

        try {
            await createPost(event);
        } catch (error) {
            alert("We were unable to post the event at this moment, please try again in a moment");
            console.log(error);
        }

    }

    return (
        <View style={{ flex: 1 }}>
            <DetailedEvent navigation={navigation} route={route} />
            <Button
                title='Submit'
                titleStyle={Fonts.Paragraph2}
                containerStyle={{ marginVertical: 40, alignSelf: "center" }}
                buttonStyle={styles.button}
                onPress={postEvent}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    image: {
        width: width,
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.Red4.rgb
    },
    button: {
        width: width / 10 * 8,
        borderRadius: 5,
        backgroundColor: Colors.Green3.rgb
    }
});
