import React, { useState, useEffect, useRef } from 'react';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

let map = null;

const MyMap = ({ mapMarkersState }) => {
	const mapElement = useRef();

	Mapbox.accessToken = process.env.MAPBOX_API_KEY;

	//This useEffect is calling and creating a map
	useEffect(() => {
		map = new Mapbox.Map({
			container: mapElement.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			zoom: 9.8,
			center: [ -87.7097118608932, 41.84494319092727 ]
		});
	}, []);

	//this useEffect is creating markers on the map from Cosmic JS so long as the state holding the map marker information is not empty.
	useEffect(
		() => {
			if (mapMarkersState === null) {
				return;
			} else {
				mapMarkersState.map((item) => {
					let el = document.createElement('div');
					el.className = 'my-marker';

					el.setAttribute('data-name', `${item.metafields[5].value}`);
					el.addEventListener('click', function() {
						console.log('hi');
						console.log(el.getAttribute('data-name'));
					});

					let popUpCard = `
						<div class="popup-card">
						<h3>${item.metafields[4].value}</h3>
						<p>${item.metafields[2].value}</p>
						<img src="https://imgix.cosmicjs.com/${item.metafields[3].value}" alt="photo of location">
						<p>${item.content}</p>
						</div>
						`;

					new Mapbox.Marker(el)
						.setLngLat([ item.metafields[0].value, item.metafields[1].value ])
						.setPopup(new Mapbox.Popup().setHTML(popUpCard))
						.addTo(map);

					//console.log(marker.getPopup());
				});
			}
		},
		[ mapMarkersState ]
	);

	// window.addEventListener('click', (event) => {
	// 	console.log(event.target);
	// });

	return <MapBase ref={mapElement} />;
};

//styling the map element.
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

	.my-marker {
		display: block;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		background-color: cornflowerblue;
	}
`;
export default MyMap;

//.on('zoom', (event) => handleMapZoom(event));
//can I attach this somewhere else? write map.on('zoom', etc) outside of where it is declared/rendered?
//.on('click', (event) => showName(event));
//.setHTML(`<div>${item.metafields[4].value}</div>`)

// function handleMapZoom(event) {
// 	console.log(event);
// }

//This is just testing functionality.
// function showName(event) {
// 	console.log(event);
// }
