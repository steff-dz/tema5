import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import Mapbox from 'mapbox-gl';
import InfoCard from '../../components/InfoCard';
//"Turning Off" the test char to focus on the info card
//import TestChart from '../../components/TestChart';
//import MyMap from '../../components/MyMap';
let map = null;

const GuidePage = () => {
	//The States I Need-------------------------------------------
	const [ pageData, setPageData ] = useState(null);
	const [ mapMarkersState, setMapMarkersState ] = useState([]);

	//Extra things I will need-----------------------------------------
	Mapbox.accessToksen = process.env.MAPBOX_API_KEY;
	const mapElement = useRef();

	//Getting information I need from Cosmic JS
	useEffect(() => {
		//Grabbing everything I need from Cosmic----------------------
		const client = new Cosmic();

		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObject({
				slug: 'guide-page',
				props: 'slug,title,content'
			})
			.then((data) => {
				setPageData(data.object);
			})
			.catch((error) => {
				console.log(error);
			});

		const bucket2 = client.bucket({
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

	//Code for the map starts here--------------------------------------------
	useEffect(
		() => {
			if (pageData !== null) {
				map = new Mapbox.Map({
					container: mapElement.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					zoom: 9.8,
					center: [ -87.7097118608932, 41.84494319092727 ]
				});
			}
		},
		[ pageData ]
	);

	function renderSkeleton() {
		return <p>Loading page...</p>;
	}

	function renderPage() {
		return (
			<MainBase>
				<section>
					<InfoCard mapMarkersState={mapMarkersState} />
				</section>
				<div id="map-container" ref={mapElement} />
			</MainBase>
		);
	}

	return <React.Fragment>{pageData === null ? renderSkeleton() : renderPage()}</React.Fragment>;
};

const MainBase = styled.main`
	margin: 0 auto;
	height: 100vh;
	width: 98vw;
	border: 1px solid black;
	margin-top: 6%;
	display: grid;
	grid-template-columns: 1fr 1fr;

	#map-container {
		height: 100%;
	}
`;

export default GuidePage;

//<div dangerouslySetInnerHTML={{ __html: pageData.content }} />

//turning off the test chart to focus on the info card.
//	<TestChart />
// insert the TestChart above MyMap component, possibly change the name of Testchart too.
//	<MyMap mapMarkersState={mapMarkersState} />
