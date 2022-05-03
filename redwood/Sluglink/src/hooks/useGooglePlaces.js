import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import uuid from 'react-native-uuid';

import { GOOGLE_PLACES_KEY } from "@env";

const GOOGLE_PLACES_AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

const defaultAutocompleteParams = {
    location: "36.99279,-122.060962",
    radius: "10000",
    language: "en",
    components: "country:us",
    strictbounds: true
};

const GOOGLE_PLACES_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";

const defaultDetailsParams = {
    language: "en",
    region: "us",
    fields: "address_component,formatted_address,geometry,name,type,url"
};

const generateSessionToken = () => uuid.v4();

export const useGooglePlaces = (latency) => {
  const sessionToken = generateSessionToken();
  const [response, setResponse] = useState({ predictions: [] });
  const [input, setInput] = useState('');
  const [lastInput, setLastInput] = useState('');

  const generateAutocompleteRequestURL = (input, params) => {
    let url = `${GOOGLE_PLACES_AUTOCOMPLETE_URL}?input=${input}&key=${GOOGLE_PLACES_KEY}&sessiontoken=${sessionToken}`;
    Object.keys(params).forEach(key => {
      if(key === 'strictbounds') {
        url += '&strictbounds';
      } else {
        url += `&${key}=${params[key]}`;
      }
    })
    return url;
  };

  const generateDetailsRequestURL = (place_id, params) => {
    let url = `${GOOGLE_PLACES_DETAILS_URL}?place_id=${place_id}&key=${GOOGLE_PLACES_KEY}&sessiontoken=${sessionToken}`;
    Object.keys(params).forEach(key => {
        url += `&${key}=${params[key]}`;
    });
    return url;
  };

  const request = async (input) => {
    if(input.length === 0) setResponse({ predictions: [] });
    const url = generateAutocompleteRequestURL(input, defaultAutocompleteParams);
    try {
      const response = await fetch(url, {
        method: 'GET',
        body: null,
      });
      const json = await response.json();
      setResponse(json);
    } catch(error) {
      console.error(error);
      setResponse({ predictions: [] });
    }
  };

  const feed = useCallback(async (search_term) => {
    setLastInput(input);
    setInput(search_term);
  }, [input]);

  const getDetails = async (place_id) => {
    const url = generateDetailsRequestURL(place_id, defaultDetailsParams);
    try {
      const response = await fetch(url, {
        method: 'GET',
        body: null
      });
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loop = setInterval(async () => {
      if(input === lastInput) return;
      await request(input);
    }, latency);
    return () => clearInterval(loop);
  }, [input, lastInput]);

  return [response, feed, getDetails];
};