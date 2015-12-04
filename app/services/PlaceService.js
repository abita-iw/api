import { api_key } from '../constants/ServerConstants';
import fetch from 'isomorphic-fetch';

export function searchPlaces(latitude, longitude, radius) {
  let uri = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&types=park|zoo&key=AIzaSyBJdh8EzsmDv9kypTiI6hGCwmYl7_pMXec`;
  return fetch(uri).then(res => res.json());
}
