import React, { useEffect, useRef } from 'react';
import Mapbox from 'mapbox-gl';

let map = null;

const MyMap = () => {
	const mapElement = useRef();
	Mapbox.accessToken = process.env.MAPBOX_API_KEY;

	useEffect(() => {
		map = new Mapbox.Map({
			container: mapElement.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 6,
			center: [ -87.57956384915784, 41.92030731895442 ]
		});
	}, []);

	return <div style={{ height: '700px' }} ref={mapElement} />;
};
export default MyMap;
