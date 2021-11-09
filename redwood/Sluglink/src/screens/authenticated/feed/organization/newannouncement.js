import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
} from 'react';

import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform,
    Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts } from '../../../../styles';
import { StyledInput } from '../../../components';
import { CappedInput, UploadButton } from './components';
import { usePosts } from '../../../../hooks';

export const NewAnnouncementScreen = ({ navigation }) => {
    const [createPost] = usePosts(state => [state.createPost]);
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const contentInputRef = useRef(null);
    const linkInputRef = useRef(null);

    const UploadButtonComponent = useMemo(() => {
        const upload = async () => {
            if(loading) return;
            setLoading(true);

            if(link.length > 0) {
                const linkSupported = await Linking.canOpenURL(link);
    
                if(!linkSupported) {
                    setLoading(false);
                    return;
                }
            }
    
            const announcement = {
                link,
                content,
                type: 'Announcement',
            };
    
            try {
                await createPost(announcement);
                navigation.navigate('FeedScreen');
            } catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        return () => <UploadButton onPress={upload} loading={loading} />
    }, [loading, content, link]);

    useEffect(() => {
        if(content.length > 0) {
            navigation.setOptions({
                headerRight: UploadButtonComponent
            });
        } else {
            navigation.setOptions({
                headerRight: () => null
            });
        }
    }, [content, link]);

    return (
        <SafeAreaView
            style={styles.container}
            edges={['bottom','left','right']}
        >           
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <Text style={[Fonts.Paragraph3, {
                    margin: 10,
                }]}>
                    Announcements are only displayed in the home page for your followers.
                </Text>
                <CappedInput
                    autoFocus
                    ref={contentInputRef}
                    placeholder='This is the information to convey to your followers'
                    multiline={true}
                    onChangeText={setContent}
                    value={content}
                    inputContainerStyle={{
                        height: 120,
                        alignItems: 'flex-start'
                    }}
                    inputStyle={Fonts.Paragraph4}
                    maxChars={300}
                />
                <StyledInput
                    ref={linkInputRef}
                    value={link}
                    onChangeText={setLink}
                    placeholder='(optional) https://www.example-link.com'
                    clearButtonMode='always'
                    returnKeyType='next'
                    autoCorrect={false}
                    autoCapitalize='none'
                    inputStyle={[Fonts.Paragraph4, {
                        color: Colors.SteelBlue.rgb
                    }]}
                    onSubmitEditing={() => contentInputRef.current?.focus()}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White.rgb,
        paddingTop: 10
    }
});
