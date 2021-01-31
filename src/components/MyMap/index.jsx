import React, { useState, useEffect, useRef } from 'react';
//import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import styled from 'styled-components';

let map = null;
let yelpKey = process.env.YELP_API_KEY;

const MyMap = ({ mapMarkersState }) => {
	const mapElement = useRef();
	Mapbox.accessToken = process.env.MAPBOX_API_KEY;
	const corsURL = 'https://cors-anywhere.herokuapp.com/';

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

	useEffect(() => {
		if (map === null) {
			return;
		} else {
			console.log('poop');
			fetch(`${corsURL}https://api.yelp.com/v3/businesses/fleetwood-roller-rink-summit-argo/reviews`, {
				headers: {
					Authorization: `Bearer ${yelpKey}`
				}
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, []);

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

// const fetchThings = async () => {
// 	const data = await axios
// 		.get(
// 			`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/fleetwood-roller-rink-summit-argo/reviews`,
// 			{
// 				headers: {
// 					Authorization: `Bearer ${process.env.YELP_API_KEY}`
// 				}
// 			}
// 		)
// 		.then((res) => {
// 			console.log(res.data);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// };
