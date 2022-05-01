import React, {
    useEffect,
    useState
} from 'react';

import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView
} from 'react-native';
import {
    ButtonGroup,
    Button,
    Icon
} from 'react-native-elements';
import Animated, {
    FadeInLeft,
    FadeOutLeft,
    FadeInUp,
    FadeOutUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, sizes } from '../../../../../styles';
import { CappedInput } from '../components';
import { useNewEvent } from './neweventstore';
import { ProgressBar } from '../components';
import { NextButton } from '../components';
import { StyledInput } from '../../../../components';

export const NewEventScreen45 = ({ navigation, route }) => {
    const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);

    const navigateNext = () => {
        navigation.navigate('NewEventScreen5');
    };

    // useEffect(() => { setNewEvent({ location: "Porter" }) }, [])

    // useEffect(() => {
    //   if (newEvent.location != null || options[selectedOption] === 'No') {
    //     navigation.setOptions({
    //       headerRight: () => <NextButton onPress={navigateNext} />
    //     });
    //   } else {
    //     setTimeout(() => {
    //       navigation.setOptions({
    //         headerRight: null
    //       });
    //     }, 500);
    //   }
    // }, [newEvent.location])

    return (
        <SafeAreaView
            style={styles.container}
            edges={['bottom', 'left', 'right']}
        >

            <ProgressBar
                progress={4.5 / 6}
            />
            <View style={{ flex: 1, alignItems: "center", marginTop: "30%" }}>
                <Animated.Text
                    entering={FadeInLeft}
                    exiting={FadeOutLeft}
                    style={{
                        margin: 10,
                        fontSize: 15,
                        fontWeight: "600",
                        marginBottom: "10%"
                    }}
                >
                    What link should they use to join virtually?
                </Animated.Text>
                <Animated.View
                    entering={FadeInUp.delay(100)}
                    exiting={FadeOutUp.delay(100)}
                    style={{ marginBottom: "20%" }}
                >
                    <StyledInput
                        autoFocus
                        placeholder='https://www.example.com'
                        value={newEvent.link || ''}
                        onChangeText={(text) => setNewEvent({
                            link: text
                        })}
                        autoCapitalize='none'
                        clearButtonMode='while-editing'
                        autoCorrect={false}
                        inputStyle={[Fonts.Paragraph3, {
                            color: Colors.SteelBlue.rgb,
                        }]}
                        inputContainerStyle={{ width: "80%" }}
                    />
                </Animated.View>
                <NextButton
                    on={newEvent?.link}
                    onPress={navigateNext}
                />
                {/* <Animated.Text
                    entering={FadeInLeft}
                    exiting={FadeOutLeft}
                    style={{
                        marginHorizontal: 10,
                        fontSize: 15,
                        fontWeight: '600',
                    }}
                >
                    Is there anything else they need to know to attend?
                </Animated.Text>
                <Animated.View
                    entering={FadeInUp.delay(200)}
                    exiting={FadeOutUp.delay(200)}
                >
                    <CappedInput
                        multiline={true}
                        lines={20}
                        placeholder='Additional information for virtual goers: i.e. passwords, instructions, etc...'
                        maxChars={300}
                        value={newEvent.virtualInfo || ''}
                        inputContainerStyle={{
                            height: 120,
                            alignItems: 'flex-start'
                        }}
                        inputStyle={Fonts.Paragraph3}
                        onChangeText={(text) => setNewEvent({
                            virtualInfo: text
                        })}
                    />
                </Animated.View> */}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
    },
    msg: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    info: {
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
        marginTop: "20%"
        // marginBottom: "10%"
    }
});
