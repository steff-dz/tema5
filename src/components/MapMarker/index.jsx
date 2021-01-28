import React from 'react';
import Mapbox from 'mapbox-gl';

const MapMarker = ({ long, lat, key, map }) => {
	return new Mapbox.Marker().setLngLat([ long, lat ]).addTo(map);
};

export default MapMarker;
