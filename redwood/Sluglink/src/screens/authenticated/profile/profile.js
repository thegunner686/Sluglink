import React, { useCallback, useEffect, useState } from 'react';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {
    Button,
    Image
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsButton } from './components';
import { useProfile } from '../../../hooks';
import { Colors, Fonts } from '../../../styles';

export const ProfileScreen = ({ navigation }) => {
    const [profile] = useProfile();

    const toggleDrawer = useCallback(() => {
        navigation.toggleDrawer();
    }, [navigation]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <SettingsButton onPress={toggleDrawer}/>
        });
    }, []);

    return (
        <SafeAreaView 
            style={styles.container}
            edges={['left', 'bottom', 'right']}
        >
            <View style={styles.box}>
                <Image
                    source={{ uri: profile?.picture }}
                    placeholderStyle={styles.picturePlaceholder}
                    style={styles.picture}
                />
                <View style={styles.toprightbottom}>
                    <Button 
                        title='Edit Profile'
                        type='outline'
                        titleStyle={styles.editProfileTitle}
                        containerStyle={styles.editProfileButtonContainer}
                        onPress={() => navigation.navigate('EditProfileScreen')}
                    />
                </View>
            </View>
            <View style={styles.boxcol}>
                <View>
                    <Text style={Fonts.Graph2}>{profile?.name}</Text>
                </View>
                <View>
                    <Text style={Fonts.Paragraph3}>{profile?.description}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb
    },  
    box: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    boxcol: {
        paddingTop: 0,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    topright: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    toprighttop: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    toprightbottom: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toprightcell: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    picturePlaceholder: {
        backgroundColor: Colors.Brown6.rgb,
    },
    editProfileTitle: {
        color: Colors.Blue5.rgb,
        ...Fonts.Paragraph4
    },
    editProfileButtonContainer: {
        width: '90%',
    },
});
