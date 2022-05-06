import React, { useCallback, useRef, useMemo } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { width } from '../../../../../styles';

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

  const renderPhoto = useCallback(({ item: photo, index}) => {
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

  const intervalWidth = useMemo(() => width, []);

  return (
    <View style={styles.gallery}>
      <FlatList
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
      />
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
