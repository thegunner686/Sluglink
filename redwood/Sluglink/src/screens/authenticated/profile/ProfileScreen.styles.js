
import { StyleSheet } from 'react-native';
import { Colors, Fonts, Shadow, width, height, rgba } from '../../../styles';

export default styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,

        width: width,
        height: height,

        backgroundColor: Colors.White.rgb,
    },
    background: {
        position: 'absolute',
        backgroundColor: Colors.Blue3.rgb,
        width: width,
        height: height / 4
    },
    content: {
        paddingTop: 64,
        alignItems: 'center',
    },
    profileHeaderText: {
        ...Fonts.SubHeader1,
        fontWeight: "500",
        textAlign: 'center',
        color: Colors.White.rgb,
        marginBottom: 32,
    },
    name: {
        ...Fonts.SubHeader1,
        fontWeight: "500",

        textAlign: 'center',
    },
    profile: {
        ...Fonts.Paragraph3,

        color: Colors.Grey2.rgb,
        textAlign: 'center',

        marginTop: 8,
    },
    email: {
        ...Fonts.Paragraph3,

        color: Colors.Grey2.rgb,
        textAlign: 'center',

        marginVertical: 8,
    },
    profilePicture: {
        width: width / 3,
        height: width / 3,

        ...Shadow.bottom,

        borderRadius: width / 2,
        borderColor: Colors.White.rgb,
        borderWidth: 2,

        marginBottom: 16,
    },

    buttonContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        
        marginVertical: 10
    },
    button: {
        title: {
            ...Fonts.Paragraph3,
        },
        container: {
            padding: 0,
            marginHorizontal: 5,
            // width: width / 4,
        },
    },

    posts: {
        display: 'flex',
        alignItems: 'center',

        width: width / 1.25,
        marginTop: 24,

    },
    postsTitle: {

            ...Fonts.Paragraph3,
    },
});
