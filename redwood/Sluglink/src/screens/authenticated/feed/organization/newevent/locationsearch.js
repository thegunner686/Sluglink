import React, {
  useEffect,
  useState,
 } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import {
  Input
} from 'react-native-elements';
import { useGooglePlaces } from '../../../../../hooks/useGooglePlaces';

import Animated, {
  FadeInLeft,
  FadeOutRight
} from 'react-native-reanimated';

import { Fonts, Colors, width, height, Shadow } from '../../../../../styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const default_result = {"description": "University of California Santa Cruz, High Street, Santa Cruz, CA, USA", "matched_substrings": [{"length": 3, "offset": 0}], "place_id": "ChIJT7-M_6JBjoAR1SCDknw7jjo", "reference": "ChIJT7-M_6JBjoAR1SCDknw7jjo", "structured_formatting": {"main_text": "University of California Santa Cruz", "main_text_matched_substrings": [[Object]], "secondary_text": "High Street, Santa Cruz, CA, USA"}, "terms": [{"offset": 0, "value": "University of California Santa Cruz"}, {"offset": 37, "value": "High Street"}, {"offset": 50, "value": "Santa Cruz"}, {"offset": 62, "value": "CA"}, {"offset": 66, "value": "USA"}], "types": ["university", "point_of_interest", "establishment"]};

const SearchResult = ({ index, result, onPress, selected }) => {
  return (
    <AnimatedTouchableOpacity
      onPress={() => onPress(result)}
      entering={FadeInLeft.delay(index*100)}
      exiting={FadeOutRight.delay(index*100)}
      style={[styles.result, {
        borderBottomWidth: selected ? 5 : 0,
        borderBottomColor: Colors.Green3.rgb
      }]}
    >
      <Text style={Fonts.Paragraph4}>{result.description}</Text>
    </AnimatedTouchableOpacity>
  )
};

export const LocationSearch = ({ onChange, location }) => {
  const [response, feed, getDetails] = useGooglePlaces(500);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedResult, setSelectedResult] = useState(default_result);

  useEffect(() => {
    if(location != null && selectedResult != null) {
      setSelectedResult(location);
    }
  }, [location, selectedResult]);

  useEffect(() => {
    if(response && response.predictions) {
      setResults(response.predictions);
    }
  }, [response]);

  useEffect(() => {
    feed(search);
    if(search.length > 0) setSelectedResult(null);
  }, [search]);
  
  const onResultPress = async (result) => {
    const details = await getDetails(result.place_id);
    setSearch('');
    onChange(result, details);
    setSelectedResult(result);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Input
        onChangeText={setSearch}
        value={search}
        autoFocus
        placeholder='Search for a location'
        containerStyle={{
          alignSelf: 'center',
          height: height / 20,
          paddingHorizontal: 0
        }}
        inputContainerStyle={{
          backgroundColor: Colors.White.rgb,
          borderBottomWidth: 0,
          borderRadius: 10,
          paddingHorizontal: 10,
          ...Shadow.standard
        }}
        inputStyle={{
          borderBottomWidth: 0,
          ...Fonts.Paragraph3,
        }}
        clearButtonMode='while-editing'
      />
      <View style={styles.resultsContainer}>
        {selectedResult ? (
          <SearchResult
            index={0}
            result={selectedResult}
            selected={true}
            onPress={onResultPress}
          />
        ) :
        <>
          {results.map((result, index) => (
            <SearchResult
              key={result.place_id}
              index={index}
              result={result}
              onPress={onResultPress}
            />
          ))}
        </>
        }
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: width / 10 * 9,
    position: 'absolute',
    alignSelf: 'center',
    top: height / 10,
    display: 'flex',
    flexShrink: 1,
    alignItems: 'center',
    zIndex: 1
  },
  resultsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  result: {
    width: '95%',
    padding: 10,
    backgroundColor: Colors.White.rgb,
    borderRadius: 10,
    margin: 5,
    ...Shadow.standard
  }
});
