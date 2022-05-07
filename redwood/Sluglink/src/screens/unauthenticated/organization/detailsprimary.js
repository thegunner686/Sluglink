import React, { useState, useCallback, useEffect, useRef } from 'react';

import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import {
    Icon,
    Input,
    Image
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from 'react-native-image-picker';

import { Colors, Fonts, width } from "../../../styles";
import { NextButton } from './nextbutton';
import { useSignUp } from './signupstore';

export const OrganizationSignUpDetailsPrimaryScreen = ({ navigation, route }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    const [isUploading, setIsUploading] = useState(false);
    const [photoURI, setPhotoURI] = useState(organization.photoURI || '');
    const [name, setName] = useState(organization.name || '');
    const [description, setDescription] = useState(organization.description || '');
    const descriptionInputRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: organization.email,
        });
    }, [organization.email]);

    useEffect(() => {

        const goToNextScreen = () => {
            setOrganization({ name, description, photoURI })
            navigation.navigate('OrganizationSignUpDetailsSecondary');
        };

        if(photoURI != "" && name != "" && description != "") {
            navigation.setOptions({
                headerRight: () => <NextButton onPress={goToNextScreen}/>
            });
        } else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [photoURI, name, description]);

    const onImagePress = useCallback(() => {
        if(isUploading) return;
        launchImageLibrary({
            mediaType: "photo",
            quality: 1,
            selectionLimit: 1,
        }, async (res) => {
            if(!res.didCancel && !res.errorCode) {
                let { uri } = res.assets[0];
                setPhotoURI(uri);
            } else if(res.errorCode) {
                Alert.alert("Failed to upload photo.");
            }
        });
    }, [isUploading]);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={onImagePress}
                disabled={isUploading}
            >
                <Image
                    source={photoURI == "" ? null : {
                        uri: photoURI,
                    }}
                    style={styles.image}
                    placeholderStyle={styles.placeholderImage}
                    PlaceholderContent={
                        isUploading ? 
                            <ActivityIndicator />
                            :
                            <Icon
                                name="add-photo-alternate"
                            />
                    }
                />
            </TouchableOpacity>
            <Input
                autoFocus
                placeholder="Organization Name"
                inputStyle={styles.inputStyle}
                inputContainerStyle={[styles.inputContainerStyle, {
                    marginTop: 20,
                }]}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                onChangeText={setName}
                value={name}
                clearButtonMode='always'
                returnKeyType='next'
                autoCorrect={false}
                onSubmitEditing={() => descriptionInputRef.current?.focus()}
            />
            <Input
                ref={descriptionInputRef}
                placeholder="Brief description"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                onChangeText={setDescription}
                value={description}
                returnKeyType='done'
                clearButtonMode='always'
                autoCorrect={false}
            />
        </SafeAreaView>
    );
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: width / 10 * 4,
        height: width / 10 * 4,
        borderRadius: 10,
    },
    placeholderImage: {
        backgroundColor: 'transparent',
        borderColor: Colors.Grey5.rgb,
        borderWidth: 0.5,
    },
    upload: {
        ...Fonts.Paragraph3,
        color: Colors.Blue5.rgb,
        alignSelf: 'center'
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
