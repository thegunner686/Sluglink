
import { StyleSheet } from 'react-native';
import { Colors, Fonts, Shadow, width, height, rgba } from '../../../styles';

export default styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

        width: width,
        height: height,

        backgroundColor: Colors.White.rgb,
    },
    button: {
        button: {
            borderColor: Colors.Red4.rgb,
        },
        title: {
            color: Colors.Red4.rgb,
        },
        container: {
            padding: 0,
            marginVertical: 5,
            width: width / 1.5,
        },
    },
});
