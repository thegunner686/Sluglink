import React, {
    useEffect,
    useState,
    useRef
} from 'react';

import {
    StyleSheet,
    Text,
    Alert,
    View,
} from 'react-native';
import {
    Icon,
    Button,
    Image
} from 'react-native-elements';
import {
    FlatList,
    TouchableOpacity
} from 'react-native-gesture-handler';
import Animated, {
    FadeInLeft,
    FadeOutLeft,
    FadeInUp,
    FadeOutUp,
    set,
} from 'react-native-reanimated';
import {
    SafeAreaView
} from 'react-native-safe-area-context';
import {
    Colors,
    Fonts,
    sizes,
    width,
    height,
    rgba
} from '../../../../styles';
import {
    useNewEvent
} from '../organization/newevent/neweventstore';

export const DetailedEvent = ({ navigation, route }) => {
    const information = "event information stuff"
    const [photos, setPhotos] = useState([]);
    const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 90 });
    const onViewabbleItemsChangedRef = useRef(({ viewableItems, changed }) => {
        if (viewableItems.length == 0) return;
        let { item, index } = viewableItems[0];
        // console.log(viewableItems[0])
        setCurrentPhotoIndex(index);
    });
    const photoLimit = 5;

    useEffect(() => {
        setNewEvent({
            location: "McHenry Library"
        })
        console.log(newEvent);
        setPhotos(newEvent.photos);
    }, [])

    useEffect(() => {
        if (newEvent.photos) setPhotos(newEvent.photos);
    }, [newEvent.photos])

    const renderPhoto = ({ item, index }) => {
        return (
            <Animated.View
                entering={FadeInLeft}
                exiting={FadeOutLeft.delay(100)}
                style={styles.image}
            >
                <Image
                    source={{ uri: item.uri }}
                    containerStyle={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundColor: 'yellow'
                    }}
                    style={{
                        width: width,
                        height: '100%',
                    }}
                    resizeMode='contain'
                />
            </Animated.View>
        )
    };

    const Header = (
        <Animated.View
            entering={FadeInUp.delay(200)}
            exiting={FadeOutUp}
            style={{
                position: 'absolute',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                backgroundColor: rgba(Colors.Black)(0.5),
            }}
        >
            <View style={{
                backgroundColor: rgba(Colors.Blue3)(0.7),
                padding: 10,
                borderRadius: 30,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={[Fonts.Paragraph3, {
                    color: Colors.White.rgb
                }]}>{currentPhotoIndex + 1}/{photos.length}</Text>
            </View>
        </Animated.View>
    );

    const InPersonInfo = (
        <View style={{ marginTop: 2 }}>
            <Text style={Fonts.SubHeader6}>Location: {newEvent.isPhysical ? newEvent.location : newEvent.isVirtual ? "Virtual" : "*no location entered*"}</Text>
            <Text style={[Fonts.Paragraph2, styles.infoPadding]}>Date: {newEvent.startDate.toDateString()}</Text>
            <Text style={[Fonts.Paragraph2, styles.infoPadding]}>
                Time: {newEvent.startDate.getHours() % 12 + ":" + newEvent.startDate.getMinutes() + " " + (newEvent.startDate.getHours() / 12 ? "PM" : "AM")} to {newEvent.endDate.getHours() % 12 + ":" + newEvent.endDate.getMinutes() + " " + (newEvent.endDate.getHours() / 12 ? "PM" : "AM")}
            </Text>

        </View>
    );

    return (
        <SafeAreaView
            style={styles.container}
            edges={['left', 'right']}
        >
            {photos.length > 0 ? Header : null}
            <View style={{ flex: 1 }}>
                <FlatList
                    horizontal
                    viewabilityConfig={viewabilityConfigRef.current}
                    onViewableItemsChanged={onViewabbleItemsChangedRef.current}
                    data={photos}
                    decelerationRate='fast'
                    snapToAlignment='center'
                    snapToInterval={width}
                    renderItem={renderPhoto}
                    style={{ flex: 1 }}
                    pagingEnabled={true}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={Fonts.Header2}>{newEvent?.title}</Text>
                <Text style={Fonts.Paragraph1}>{information}</Text>
                {true ? InPersonInfo : null}

            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    image: {
        width: width,
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.Red4.rgb
    },
    infoContainer: {
        marginHorizontal: "5%",
        flex: 1,
        display: "flex",
        paddingTop: 10
    },
    infoPadding: {
        marginVertical: 3
    }
});