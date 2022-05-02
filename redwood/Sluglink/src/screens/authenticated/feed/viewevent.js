import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Colors } from '../../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DetailedEvent } from '../components/event/detailedevent';
import { usePosts } from '../../../hooks';

export const ViewEventScreen = React.memo(({
  navigation,
  route
}) => {
  const { id } = route.params;
  const [getPost] = usePosts(state => [state.getPost]);
  const [event, setEvent] = useState(null);

  useEffect(() => {
      const fetch = async () => {
          const res = await getPost(id);
          setEvent(res);
      };
      if (id != null) fetch();
  }, [id]);

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={styles.container}
    >
      <DetailedEvent event={event} navigation={navigation} />
    </SafeAreaView>
  )
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White.rgb,
    flex: 1,
    justifyContent: 'center'
  }
})
