import React, { useCallback, useRef, useMemo } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text
} from 'react-native';
import {
  Image
} from 'react-native-elements';
import { width } from '../../../../../styles';

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

  const renderPhoto = useCallback(({ item: photo, index}) => {
    return (
      <Image
        source={{ uri: photo.url || photo.uri }}
        containerStyle={styles.photoContainer}
        style={styles.photo}
        resizeMode='cover'
      />
    )
  }, []);

  const intervalWidth = useMemo(() => width / 10 * 9, []);

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
    width: width / 10 * 9,
    height: width / 10 * 6,
  },
  photo: {
    borderRadius: 10,
  },
  flatlist: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
