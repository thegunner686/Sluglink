import React, { useState, useCallback, useEffect } from 'react';

import {
    Text,
    StyleSheet
} from 'react-native';
import {
    Input
} from 'react-native-elements';
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import remoteConfig from '@react-native-firebase/remote-config';

import { Colors, Fonts, width, height, sizes } from "../../../styles";
import { NextButton } from './nextbutton';
import { useSignUp } from './signupstore';

export const OrganizationSignUpDetailsSecondaryScreen = ({ route, navigation }) => {
    const [organization, setOrganization] = useSignUp(state => [state.organization, state.setOrganization]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(organization.category || '');
    const [otherCategory, setOtherCategory] = useState(organization.otherCategory || '');

    useEffect(() => {
        const goToNextScreen = () => {
            setOrganization({ category, otherCategory });
            navigation.navigate('OrganizationSignUpDetailsTertiary');
        };

        if(category == 'Other') {
            if(otherCategory != '') {
                navigation.setOptions({
                    headerRight: () => <NextButton onPress={goToNextScreen} />
                });
            } else {
                navigation.setOptions({
                    headerRight: null
                });
            }
        } else if(category !== '') {
            navigation.setOptions({
                headerRight: () => <NextButton onPress={goToNextScreen} />
            });
        } else {
            navigation.setOptions({
                headerRight: null
            });
        }
    }, [category, otherCategory]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: organization.name
        });
    }, [organization.name]);

    useEffect(() => {
        const json = remoteConfig().getValue('categories').asString();
        try {
            setCategories(JSON.parse(json));
        } catch (error) {
            console.log(error);
            setCategories([]);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Candidate for Remote Config */}
            <Text style={Fonts.Paragraph3}>Pick a category that best represents your organization.</Text>
            <Picker
                selectedValue={category}
                onValueChange={(val, i) => setCategory(val)}
                mode='dropdown'
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item key='' label='' value='' />
                {categories.map((cat) => (
                    <Picker.Item key={cat.name} label={cat.name} value={cat.name} />
                ))}
            </Picker>
            {category == "Other" &&
                <Input 
                    autoFocus
                    placeholder="Other category name"
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    value={otherCategory}
                    onChangeText={setOtherCategory}
                    returnKeyType='done'
                    clearButtonMode='always'
                    autoCorrect={false}
                />
            }
        </SafeAreaView>
    )
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

