import React, { useCallback, useRef, useMemo, useEffect } from 'react';
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


export const ThumbnailGallery = React.memo(({
  photos,
}) => {
  const viewabilityConfigRef = useRef({ itemVisiblePercentThreshold: 90 });
  const onViewabbleItemsChangedRef = useRef(({ viewableItems, changed }) => {
    // if (viewableItems.length == 0) return;
    // let { item, index } = viewableItems[0];
    // setCurrentPhotoIndex(index);
    // setCurrentPhoto(item);
  });

  const renderPhoto = useCallback(({ item: photo, index }) => {
    return (
      <FastImage
        source={{
          uri: photo.url,
          priority: FastImage.priority.high,
        }}
        containerStyle={styles.photoContainer}
        style={styles.photo}
        resizeMode={FastImage.resizeMode.cover}
      />
    )
  }, []);

  const intervalWidth = useMemo(() => width / 10 * 9, []);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollOffset = React.useRef(new Animated.Value(0)).current;

  const keyExtractor = React.useCallback((_, index) => index.toString(), []);

  useEffect(() => {
    scrollX.addListener((val) => {
      const { value } = val;
      let offset = value;
      scrollOffset.setValue(offset);
    })

    return () => scrollX.removeAllListeners();
  }, [])

  return (
    <View style={styles.gallery}>
      <Animated.FlatList
        horizontal
        decelerationRate='fast'
        snapToAlignment='center'
        viewabilityConfig={viewabilityConfigRef.current}
        onViewableItemsChanged={onViewabbleItemsChangedRef.current}
        data={photos}
        snapToInterval={width}
        renderItem={renderPhoto}
        style={{ flexGrow: 1 }}
        contentContainerStyle={styles.flatlist}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        contest
        keyExtractor={keyExtractor}
      />
      {photos.length > 1 ?
        <SlidingBorder
          data={photos}
          scrollX={scrollOffset}
          dotSize={15}
          dotStyle={{
            backgroundColor: 'white',
            opacity: .8,
          }}
          slidingIndicatorStyle={{
            borderColor: 'white',
          }}
          containerStyle={{
            bottom: 5,
          }}
          borderPadding={-2}
        />
        : null
      }
    </View>
  )
});

const styles = StyleSheet.create({
  gallery: {
    flexShrink: 1,
  },
  photoContainer: {
    width: width,
    height: width / 10 * 6,
  },
  photo: {
    width: width,
    height: width / 10 * 6,
    // borderRadius: 10,
  },
  flatlist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // width: "100%"
  }
});
