import React, { useCallback, useRef, useMemo } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Animated
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { width } from '../../../../../styles';
import { SlidingBorder } from "react-native-animated-pagination-dots";
export const FullGallery = React.memo(({
  photos,
}) => {
  const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 90 });
  const onViewabbleItemsChangedRef = useRef(({ viewableItems, changed }) => {
    // if (viewableItems.length == 0) return;
    // let { item, index } = viewableItems[0];
    // setCurrentPhotoIndex(index);
    // setCurrentPhoto(item);
  });

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);

  const renderPhoto = useCallback(({ item: photo, index }) => {
    return (
      <FastImage
        source={{
          uri: photo.url != null ? photo.url : photo.uri,
          priority: FastImage.priority.high,
        }}
        containerStyle={styles.photoContainer}
        style={styles.photo}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  }, []);

  const intervalWidth = useMemo(() => width, []);

  return (
    <View style={styles.gallery}>
      <Animated.FlatList
        horizontal
        decelerationRate='fast'
        snapToAlignment='center'
        viewabilityConfig={viewabilityConfigRef.current}
        onViewableItemsChanged={onViewabbleItemsChangedRef.current}
        data={photos}
        snapToInterval={intervalWidth}
        renderItem={renderPhoto}
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.flatlist}
        pagingEnabled={true}
        keyExtractor={keyExtractor}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
      {photos.length > 1 ?
        <SlidingBorder
          data={photos}
          expandingDotWidth={30}
          scrollX={scrollX}
          inActiveDotOpacity={0.6}
          dotStyle={{
            width: 10,
            height: 10,
            backgroundColor: 'white',
            opacity: .8,
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          slidingIndicatorStyle={{
            borderColor: 'white',
          }}
          containerStyle={{
            bottom: 40
          }}
        />
        : null}
    </View>
  )
});

const styles = StyleSheet.create({
  gallery: {
    flexShrink: 1,
  },
  photoContainer: {
    width: width,
    height: width,
  },
  photo: {
    width: width,
    height: width,
  },
  flatlist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
