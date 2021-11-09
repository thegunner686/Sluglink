import React from 'react';

import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import {
    Icon,
    Button
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, sizes, width, height } from '../../../../styles';

const PostOption = ({ name, description, icon, onPress, color }) => {
    return (
        <View
            style={[styles.postOption]}
        >
            <Text style={[Fonts.Header5, {
                color,
            }]}>{name}</Text>
            <Text style={[Fonts.Paragraph5, {
                textAlign: 'center'
            }]}>{description}</Text>
            <Button 
                onPress={onPress}
                icon={() => (
                    <Icon
                        name={icon}
                        type='material'
                        size={sizes.Icon5}
                        color={color}
                        containerStyle={{ marginRight: 10 }}
                    />
                )}
                title={`Create New ${name}`}
                titleStyle={[Fonts.Paragraph2, {
                    color
                }]}
                buttonStyle={{
                    width: width / 10 * 8,
                    borderColor: color
                }}
                containerStyle={{
                    marginTop: 10,
                }}
                type='outline'
            />
        </View>
    )
};

export const NewPostScreen = ({ navigation }) => {
    return (
        <SafeAreaView 
            style={styles.container}
            edges={['left', 'right']}
        >
            <View style={{ flex: 1}}></View>
            <PostOption
                color={Colors.Blue3.rgb}
                name='Event'
                icon='event'
                description='Schedule an event that your organization is hosting. Who, what, where and when.'
                onPress={() => navigation.navigate('NewEventScreen')}
            />
            <View style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={[Fonts.Label2, {
                    color: Colors.Grey3.rgb
                }]}>OR</Text>
            </View>
            <PostOption
                color={Colors.Red3.rgb}
                name='Announcement'
                icon='announcement'
                description='Broadcast an announcement to your followers. Important updates, informational posts, and more.'
                onPress={() => navigation.navigate('NewAnnouncementScreen')}
            />
            <View style={{ flex: 3}}></View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White.rgb,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postOption: {
        width: width / 10 * 8,
        height: height / 10 * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
