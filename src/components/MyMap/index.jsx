import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';

let map = null;

const MyMap = () => {
	const [ mapMarkersState, setMapMarkersState ] = useState([]);

	const mapElement = useRef();
	Mapbox.accessToken = process.env.MAPBOX_API_KEY;

	useEffect(() => {
		const client = new Cosmic();
		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObjects({
				type: 'mapmarkers',
				props: 'title,slug,metafields'
			})
			.then((data) => {
				setMapMarkersState(data.objects);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		map = new Mapbox.Map({
			container: mapElement.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 8,
			center: [ -87.88100395517584, 41.86044985988897 ]
		});
	}, []);

	useEffect(
		() => {
			if (mapMarkersState === null) {
				return;
			} else {
				mapMarkersState.map((item) => {
					let popUpCard = `
						<div>
						<h3>${item.metafields[4].value}</h3>
						<p>${item.metafields[2].value}</p>
						</div>
						`;
					new Mapbox.Marker()
						.setLngLat([ item.metafields[0].value, item.metafields[1].value ])
						.setPopup(new Mapbox.Popup().setHTML(popUpCard))
						.addTo(map);
				});
			}
		},
		[ mapMarkersState ]
	);

	// function handleMapZoom(event) {
	// 	console.log(event);
	// }
	function showName(event) {
		console.log(event);
	}

	return <div style={{ height: '700px' }} ref={mapElement} />;
};
export default MyMap;

//.on('zoom', (event) => handleMapZoom(event));
//can I attach this somewhere else? write map.on('zoom', etc) outside of where it is declared/rendered?
//.on('click', (event) => showName(event));
//.setHTML(`<div>${item.metafields[4].value}</div>`)
