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

export const EventFooter = ({
    event
}) => {
    const starttime = useMemo(() => event?.starttime?.toDate(), [event?.starttime]);
    const endtime = useMemo(() => event?.endtime?.toDate(), [event?.endtime]);

    // should probably put into a component or util file
    const trimLink = (link) => {
        const limit = 50;
        if(link.length > limit) {
            return `${link.substring(0, limit-3)}...`;
        }
        return link;
    };

    const LocationSubComponent = (
        <View style={styles.row}>
                <Icon
                    name='location-pin'
                    size={sizes.Icon5}
                    color={Colors.Grey3.rgb}
                    containerStyle={{ marginRight: 5}}
                />
                <Text style={[Fonts.Paragraph3, { color: Colors.Grey3.rgb }]}>{event.location?.name}</Text>
        </View>
    );

    const VirtualLinkSubComponent = (
        <View style={styles.row}>
            <Icon
                name='link'
                size={sizes.Icon5}
                color={Colors.SteelBlue.rgb}
                containerStyle={{ marginRight: 5}}
            />
            <Text style={[Fonts.Paragraph3, { color: Colors.SteelBlue.rgb }]}>{trimLink(event.link)}</Text>
        </View>
    );

    // this should probably also go in a components file
    const FormattedDate = (date) => (
        <>
            <Text style={[Fonts.Paragraph3, {
                color: Colors.Grey3.rgb
            }]}>
                {getNumeralTime(date)}
            </Text>
            <Dot />
            <Text style={[Fonts.Paragraph3, {
                color: Colors.Grey3.rgb
            }]}>
                {getNumeralDate(date)}
            </Text>
        </>
    )

    return (
        <View style={styles.container}>
            { event.isPhysical && LocationSubComponent }
            { event.isVirtual && VirtualLinkSubComponent }
            <View style={styles.row}>
                { FormattedDate(starttime) }
                <Text style={[Fonts.Paragraph3, { color: Colors.Grey3.rgb }]}> - </Text>
                { FormattedDate(endtime) }
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
