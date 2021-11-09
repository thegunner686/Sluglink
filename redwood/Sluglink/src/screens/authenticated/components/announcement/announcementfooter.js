import React, {
    useCallback,
    useMemo
} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Linking,
    TouchableOpacity,
} from 'react-native';
import {
    Icon
} from 'react-native-elements';

import { getNumeralTime, getNumeralDate } from '../../../../utils';
import { Fonts, Colors, sizes } from '../../../../styles';

const Dot = () => (
    <Icon
        name='circle'
        type='material-community'
        size={3}
        color={Colors.Grey4.rgb}
        containerStyle={{ marginHorizontal: 2 }}
    />
);

export const AnnouncementFooter = ({
    announcement
}) => {
    const datetime = useMemo(() => announcement?.createdAt?.toDate(), [announcement?.createdAt]);

    const trimLink = (link) => {
        const limit = 50;
        if(link.length > limit) {
            return `${link.substring(0, limit-3)}...`;
        }
        return link;
    };

    const openLink = useCallback(async (link) => {
        const linkSupported = await Linking.canOpenURL(link);

        if(linkSupported) {
            await Linking.openURL(link);
        }
    }, []);

    return (
        <View style={styles.container}>
            {announcement?.link != null && announcement.link.length > 0 && (
                <TouchableOpacity 
                    onPress={() => openLink(announcement.link)}
                    style={styles.row}
                >
                    <Icon
                        name='link'
                        size={sizes.Icon5}
                        color={Colors.SteelBlue.rgb}
                        containerStyle={{ marginRight: 5}}
                    />
                    <Text style={[Fonts.Paragraph2, {
                        color: Colors.SteelBlue.rgb,
                        marginRight: 5
                    }]}>
                        {trimLink(announcement.link)}
                    </Text>
                </TouchableOpacity>
            )}
            <View style={styles.row}>
                <Text style={[Fonts.Paragraph3, {
                    color: Colors.Grey3.rgb
                }]}>
                    {getNumeralTime(datetime)}
                </Text>
                <Dot />
                <Text style={[Fonts.Paragraph3, {
                    color: Colors.Grey3.rgb
                }]}>
                    {getNumeralDate(datetime)}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
        marginVertical: 10,
    },
    row: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
