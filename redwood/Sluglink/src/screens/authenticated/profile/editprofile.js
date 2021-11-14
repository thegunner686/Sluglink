import React, { useCallback, useEffect, useState } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import {
    Button,
    Image,
    Input
} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { UpdateButton } from './components';
import { useProfile } from '../../../hooks';
import { useAuth } from '../../../hooks';
import { Colors, Fonts, width, height } from '../../../styles';
import { propertiesAreEqual } from '../../../utils';

export const EditProfileScreen = ({ navigation }) => {
    const [customClaims] = useAuth(state => [state.customClaims]);
    const [profile, updateProfile] = useProfile();
    const [editedProfile, setEditedProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEditedProfile(profile);
    }, [profile]);

    const validateAndUpdateProfile = useCallback(async () => {
        if(isLoading) return;
        if(editedProfile.name == null || editedProfile.name.trim() == '') return;
        setIsLoading(true);
        try {
            await updateProfile(editedProfile);
        } catch(e) {
            Alert.alert(
                'Oops!',
                'We encountered an error while updating your profile',
                [
                    {
                        text: 'Bummer...',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
            return;
        }
        setIsLoading(false);
        navigation.goBack();
    }, [editedProfile, isLoading]);

    useEffect(() => {
        if(profile == null || editedProfile == null) return;
        if(!propertiesAreEqual(editedProfile, profile, [
            'name', 'description', 'picture', 'phone_number', 'other', 'otherCategory',
        ])) {
            navigation.setOptions({
                headerRight: () => <UpdateButton onPress={validateAndUpdateProfile}/>
            });
        }
    }, [profile, editedProfile]);

    return (
        <KeyboardAvoidingView 
            style={styles.keyboardContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled
        >
            <ScrollView
                style={{ backgroundColor: Colors.White.rgb, width, }}
                contentContainerStyle={styles.container}
            >
                <TouchableOpacity 
                    style={styles.pictureBox}
                    hitSlop={{
                        left: 20,
                        right: 20,
                        bottom: 20,
                        top: 20
                    }}
                >
                    <Image 
                        source={{ uri: editedProfile?.picture }}
                        style={styles.picture}
                    />
                    <Text style={{
                        ...Fonts.Label3,
                        color: Colors.Blue4.rgb
                    }}>Upload Picture</Text>
                </TouchableOpacity>

                <Input 
                    placeholder="Email"
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={[styles.inputContainerStyle, { borderWidth: 0, borderBottomWidth: 0}]}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    value={editedProfile?.email}
                    disabled={true}
                    returnKeyType='done'
                    autoCorrect={false}
                />

                <Input 
                    placeholder="Name"
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    value={editedProfile?.name}
                    onChangeText={(val) => setEditedProfile(oldEditedProfile => ({ ...oldEditedProfile, name: val }))}
                    returnKeyType='done'
                    clearButtonMode='always'
                    autoCorrect={false}
                />

                <Input 
                    placeholder="Description"
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    value={editedProfile?.description}
                    onChangeText={(val) => setEditedProfile(oldEditedProfile => 
                        ({ ...oldEditedProfile, description: val })
                    )}
                    returnKeyType='done'
                    clearButtonMode='always'
                    autoCorrect={false}
                />

                <Input 
                    placeholder="Phone Number"
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    value={editedProfile?.phone_number}
                    onChangeText={(val) => setEditedProfile(oldEditedProfile => 
                        ({ ...oldEditedProfile, phone_number: val })
                    )}
                    returnKeyType='done'
                    clearButtonMode='always'
                    keyboardType='numbers-and-punctuation'
                    autoCorrect={false}
                />

                {customClaims?.organization &&
                    <>
                        {editedProfile?.category == "other" &&
                            <Input 
                                autoFocus={true}
                                placeholder="Other category name"
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                                leftIconContainerStyle={styles.leftIconContainerStyle}
                                value={editedProfile?.otherCategory}
                                onChangeText={(val) => setProfile(oldEditedProfile => 
                                    ({ ...oldEditedProfile, otherCategory: val })
                                )}
                                returnKeyType='done'
                                clearButtonMode='always'
                                autoCorrect={false}
                            />
                        }
                        <Picker
                            selectedValue={editedProfile?.category}
                            onValueChange={(val, i) => setEditedProfile(oldEditedProfile => 
                                ({ ...oldEditedProfile, category: val })
                            )}
                            mode='dropdown'
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            <Picker.Item label='Sports' value='sports' />
                            <Picker.Item label='Social' value='social' />
                            <Picker.Item label='Resource' value='resource' />
                            <Picker.Item label='Academic' value='academic' />
                            <Picker.Item label='Other' value='other' />
                        </Picker>
                    </>
                }

            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1
    },
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
    },
    pictureBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    picture: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    picker: {
        width: width / 10 * 8,
        height: 'auto'
    },
    pickerItem: {
        ...Fonts.Paragraph4
    },
    inputStyle: {
        ...Fonts.Paragraph4,
        textAlign: 'left'
    },
    inputContainerStyle: {
        backgroundColor: Colors.White.rgb,
        borderColor: Colors.Grey5.rgb,
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 5
    }
});