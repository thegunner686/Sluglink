import React, {
    useEffect,
    useState,
    useRef,
    useMemo
  } from 'react';
  
  import {
    StyleSheet,
    Text,
    Alert,
    View
  } from 'react-native';
  import {
    Icon,
    Button,
  } from 'react-native-elements';
  import FastImage from 'react-native-fast-image';
  import { FlatList } from 'react-native-gesture-handler';
  import Animated, {
    FadeInLeft,
    FadeOutLeft,
    FadeInUp,
    FadeOutUp,
  } from 'react-native-reanimated';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Colors, Fonts, sizes, width, height, rgba } from '../../../../../styles';
  import { useNewEvent } from './neweventstore';
  import { launchImageLibrary } from 'react-native-image-picker';
  import { NextButton } from '../../../..';
  
  export const NewEventScreen6 = ({ navigation, route }) => {
    const [newEvent, setNewEvent] = useNewEvent(state => [state.newEvent, state.setNewEvent]);
    const [photos, setPhotos] = useState([]);
    const [currentPhoto, setCurrentPhoto] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 90 });
    const onViewabbleItemsChangedRef = useRef(({ viewableItems, changed }) => {
      if (viewableItems.length == 0) return;
      let { item, index } = viewableItems[0];
      // console.log(viewableItems[0])
      setCurrentPhotoIndex(index);
      setCurrentPhoto(item);
    });
    const photoLimit = 5;
  
    const navigateNext = () => {
      navigation.navigate('NewEventScreen7');
    };
  
    useEffect(() => {
      setTimeout(() => {
        navigation.setOptions({
            headerRight: () => <NextButton onPress={navigateNext} />
        });
      }, 500);
    }, []);
  
    useEffect(() => {
      setNewEvent({
        photos: [...photos],
      });
    }, [photos])
  
    const addPhoto = () => {
      launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 1,
      }, async (res) => {
        if (!res.didCancel && !res.errorCode) {
          let { uri, fileName } = res.assets[0];
          const photo = {
            uri,
            fileName
          };
          // console.log(res.assets)
  
          setPhotos(oldPhotos => ([
            ...oldPhotos, photo
          ]));
          setCurrentPhoto(photo);
          setCurrentPhotoIndex(oldIndex => oldIndex + 1);
        } else if (res.errorCode) {
          Alert.alert('Couldn\'t upload that image');
        }
      });
    };
  
    const Footer = useMemo(() => (
      <View style={{
        width: width,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View>
          <Icon
            name='photo'
            size={sizes.Icon1}
          />
        </View>
        <View
          style={{
            width: width / 5 * 4,
            marginBottom: height / 3,
            alignItems: 'center'
          }}
        >
          <Text style={Fonts.SubHeader2}>Event Photos</Text>
          <Text style={[Fonts.Paragraph3, {
            textAlign: 'center'
          }]}>
            They're optional, but photos help generate buzz and excitement about your event.
          </Text>
        </View>
        <Button
          title='Add Photo'
          titleStyle={[Fonts.Paragraph2, {
            color: Colors.SteelBlue.rgb
          }]}
          type='outline'
          buttonStyle={{
            borderColor: Colors.SteelBlue.rgb,
            borderRadius: 10
          }}
          icon={() => (
            <Icon
              name='add-photo-alternate'
              size={sizes.Icon4}
              color={Colors.SteelBlue.rgb}
            />
          )}
          onPress={addPhoto}
        />
      </View>
    ), [width, height, addPhoto]);
  
    const removePhoto = () => {
      var copy = [...photos];
      currentPhotoIndex;
      if (currentPhotoIndex !== -1) {
        copy.splice(currentPhotoIndex, 1);
        setPhotos(copy);
      }
    };
  
    const renderPhoto = ({ item, index }) => {
      return (
        <Animated.View
          entering={FadeInLeft}
          exiting={FadeOutLeft.delay(100)}
          style={styles.image}
        >
          <FastImage
            source={{
                uri: item.uri,
                priority: FastImage.priority.normal,
            }}
            containerStyle={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
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
  
    const Header = useMemo(() => (
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
          }]}>{currentPhotoIndex + 1}/{photoLimit}</Text>
        </View>
        <Button
          title='Remove'
          buttonStyle={{
            backgroundColor: Colors.Red3.rgb,
            borderRadius: 10,
          }}
          titleStyle={Fonts.Paragraph3}
          icon={() => (
            <Icon
              name='delete'
              size={sizes.Icon5}
              color={Colors.Red2.rgb}
            />
          )}
          onPress={() => removePhoto()}
        />
      </Animated.View>
    ), [currentPhotoIndex, photoLimit, removePhoto]);
  
    return (
      <SafeAreaView
        style={styles.container}
        edges={['left', 'right']}
      >
        {photos.length > 0 ? Header : null}
        <View style={{ flexGrow: 1 }}>
          <FlatList
            horizontal
            ListFooterComponent={photos.length < photoLimit ? Footer : null}
            viewabilityConfig={viewabilityConfigRef.current}
            onViewableItemsChanged={onViewabbleItemsChangedRef.current}
            data={photos}
            decelerationRate='fast'
            snapToAlignment='center'
            snapToInterval={width}
            renderItem={renderPhoto}
            style={{ flexGrow: 1 }}
            pagingEnabled={true}
          />
        </View>
      </SafeAreaView>
    );
  };
  
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
    }
  });
  