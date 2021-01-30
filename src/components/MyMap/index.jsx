import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

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
				props: 'title,slug,content,metafields'
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
			zoom: 8.4,
			center: [ -87.99978817047791, 41.99604652933358 ]
		});
	}, []);

	useEffect(
		() => {
			if (mapMarkersState === null) {
				return;
			} else {
				mapMarkersState.map((item) => {
					let popUpCard = `
						<div class="popup-card">
						<h3>${item.metafields[4].value}</h3>
						<p>${item.metafields[2].value}</p>
						<img src="https://imgix.cosmicjs.com/${item.metafields[3].value}" alt="photo of location">
						<p>${item.content}</p>
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

	return <MapBase ref={mapElement} />;
};
export default MyMap;

const MapBase = styled.div`
	height: 100%;
	width: 100%;

	.popup-card {
		h3 {
			font-size: 1rem;
		}

		img {
			width: 100%;
		}
	}
`;

//.on('zoom', (event) => handleMapZoom(event));
//can I attach this somewhere else? write map.on('zoom', etc) outside of where it is declared/rendered?
//.on('click', (event) => showName(event));
//.setHTML(`<div>${item.metafields[4].value}</div>`)
