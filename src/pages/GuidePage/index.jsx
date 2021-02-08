import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import HomeSkeleton from '../../components/HomeSkeleton';
import Cosmic from 'cosmicjs';
import Mapbox, { Popup } from 'mapbox-gl';
import DefaultCard from '../../components/DefaultCard';
import InfoCard from '../../components/InfoCard';
import CovidChart from '../../components/CovidChart';

let map = null;
const covidKey = process.env.COVIDNOW_API_KEY;

export const geoJson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			properties: {},
			geometry: {
				type: 'LineString',
				coordinates: [
					[ -87.75913238525389, 42.15233247469604 ],
					[ -88.10554504394531, 42.154241397276955 ],
					[ -88.22502136230469, 42.15462317488421 ],
					[ -88.24012756347656, 42.154114137562736 ],
					[ -88.23841094970703, 42.06598906587129 ],
					[ -88.26913833618164, 42.06637137538314 ],
					[ -88.26828002929688, 41.994456721579816 ],
					[ -88.26845169067383, 41.983356261006136 ],
					[ -88.02692413330078, 41.983483863503515 ],
					[ -87.92495727539062, 41.983483863503515 ],
					[ -87.92633056640625, 41.72725537359254 ],
					[ -87.92598724365234, 41.713673790518186 ],
					[ -87.99053192138672, 41.68393804553257 ],
					[ -88.00495147705078, 41.68111756290652 ],
					[ -88.03241729736327, 41.68163038712496 ],
					[ -88.02898406982422, 41.65547114139424 ],
					[ -87.90950775146484, 41.66008825124748 ],
					[ -87.90985107421875, 41.59926979434569 ],
					[ -87.90985107421875, 41.55740776889781 ],
					[ -87.79243469238281, 41.55689395590664 ],
					[ -87.7862548828125, 41.49006348843993 ],
					[ -87.53494262695312, 41.49212083968776 ],
					[ -87.53082275390625, 41.72930517452586 ],
					[ -87.56515502929688, 41.77028745790557 ],
					[ -87.58472442626953, 41.80638140613443 ],
					[ -87.5936508178711, 41.818152340293416 ],
					[ -87.60257720947266, 41.829409470600616 ],
					[ -87.60944366455078, 41.841687719102524 ],
					[ -87.61390686035156, 41.85549793305566 ],
					[ -87.60875701904297, 41.85473077716112 ],
					[ -87.60669708251953, 41.86649282301993 ],
					[ -87.615966796875, 41.869305165620275 ],
					[ -87.61734008789062, 41.880808915193874 ],
					[ -87.61356353759766, 41.886432216946986 ],
					[ -87.59880065917969, 41.89154387998115 ],
					[ -87.60601043701172, 41.897932883580054 ],
					[ -87.61802673339844, 41.89716623689334 ],
					[ -87.62248992919922, 41.91351937007709 ],
					[ -87.63484954833983, 41.94263801258577 ],
					[ -87.6321029663086, 41.96485119205757 ],
					[ -87.6544189453125, 41.986291053745575 ],
					[ -87.65544891357422, 42.00568280445877 ],
					[ -87.6712417602539, 42.04189892540972 ],
					[ -87.67192840576172, 42.06178350929261 ],
					[ -87.68360137939453, 42.0793685289225 ],
					[ -87.70591735839844, 42.092363020927856 ],
					[ -87.73338317871094, 42.117325357724575 ],
					[ -87.75089263916016, 42.13922298465263 ],
					[ -87.75889299809933, 42.15233993153687 ],
					[ -87.75910355150698, 42.15233297181877 ],
					[ -87.75912702083588, 42.15233048620501 ],
					[ -87.7591347321868, 42.15233272325741 ],
					[ -87.7591310441494, 42.152332226134675 ],
					[ -87.75912735611199, 42.15232949195947 ]
				]
			}
		}
	]
};

const GuidePage = () => {
	//The States I Need-------------------------------------------
	const [ pageData, setPageData ] = useState(null);
	const [ mapMarkersState, setMapMarkersState ] = useState([]);
	const [ venue, setVenue ] = useState(null);
	const [ recentCovidCases, setRecentCovidCases ] = useState(null);
	const [ displayMode, setDisplayMode ] = useState('');

	//Extra things I will need-----------------------------------------
	const mapElement = useRef();
	Mapbox.accessToken = process.env.MAPBOX_API_KEY;

	//Getting information I need from Cosmic JS----------------------------------
	useEffect(() => {
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

	//Creating the map ---------------------------------------------------------------
	useEffect(
		() => {
			if (pageData !== null) {
				map = new Mapbox.Map({
					container: mapElement.current,
					style: 'mapbox://styles/mapbox/streets-v11',
					zoom: 7.8,
					center: [ -87.7097118608932, 41.84494319092727 ]
				}).on('load', () => {
					map.addSource('cookcounty', {
						type: 'geojson',
						data: geoJson
					});

					map.addLayer({
						id: 'cook-county',
						type: 'fill',
						source: 'cookcounty',
						layout: {},
						paint: {
							'fill-color': '#00c',
							'fill-opacity': 0.2
						}
					});
				});
			}
		},
		[ pageData ]
	);

	//Creating map markers------------------------------------------------------------
	useEffect(
		() => {
			if (mapMarkersState === null) {
				return;
			} else {
				mapMarkersState.map((item) => {
					let el = document.createElement('div');

					el.className = 'my-marker';
					el.setAttribute('data-name', `${item.title}`);
					el.style.backgroundImage =
						'url("https://pics.freeicons.io/uploads/icons/png/4482957981557740362-512.png")';

					el.addEventListener('click', function() {
						let selectedVenue = el.getAttribute('data-name');
						let venueToPass = mapMarkersState.find((el) => el.title === selectedVenue);
						setVenue(venueToPass);
					});
					el.addEventListener('mouseenter', function() {
						console.log('you are hovering');
						let popup = new Mapbox.Popup({
							closeButton: false,
							closeOnClick: false
						})
							.setLngLat([ item.metafields[0].value, item.metafields[1].value ])
							.setHTML(`<h3>${item.metafields[4].value}</h3>`)
							.addTo(map);

						el.addEventListener('mouseleave', function() {
							popup.remove();
						});
					});

					let popUpCard = `
					<div class="popup-card">
					<h3>${item.metafields[4].value}</h3>
					<p>${item.metafields[2].value}</p>

					</div>
					`;

					new Mapbox.Marker(el)
						.setLngLat([ item.metafields[0].value, item.metafields[1].value ])
						.setPopup(new Mapbox.Popup().setHTML(popUpCard))
						.addTo(map);
				});
			}
		},
		[ mapMarkersState ]
	);

	//Covid API call & storing covid data ------------------------------------------------
	useEffect(() => {
		let covidData = [];
		fetch(`https://api.covidactnow.org/v2/county/17031.timeseries.json?apiKey=${covidKey}`)
			.then((response) => response.json())
			.then((data) => {
				const recentCovidData = data.actualsTimeseries;
				for (let i = 0; i < 11; i++) {
					let movingData = recentCovidData.pop();
					covidData.push(movingData);
				}

				if (covidData.length === 11) {
					setRecentCovidCases(covidData);
				} else {
					return;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function defaultCard() {
		return <DefaultCard defaultText={pageData.content} />;
	}

	function renderInfoCard() {
		return <InfoCard name={venue.metafields[4].value} image={venue.metafields[3].value} descrip={venue.content} />;
	}

	function renderPage() {
		return (
			<MainBase>
				<section id="guide-container">
					<div id="card-container">{venue === null ? defaultCard() : renderInfoCard()}</div>
					<div id="map-container" ref={mapElement} />
				</section>

				<section id="corona-container">
					<i className="fas fa-chevron-down" />
					<h2>Recent Covid Stats in Cook County</h2>
					<h3>
						<i>for the past 10 days</i>
					</h3>
					<div id="button-container">
						<button
							onClick={() =>
								displayMode !== 'New Cases' ? setDisplayMode('New Cases') : setDisplayMode('')}
						>
							New Cases
						</button>
						<button
							onClick={() => (displayMode !== 'Cases' ? setDisplayMode('Cases') : setDisplayMode(''))}
						>
							Total Cases
						</button>
						<button
							onClick={() => (displayMode !== 'Deaths' ? setDisplayMode('Deaths') : setDisplayMode(''))}
						>
							Deaths
						</button>
					</div>

					<article>
						{displayMode !== '' ? (
							<CovidChart chartData={recentCovidCases} displayMode={displayMode} />
						) : (
							''
						)}
					</article>
				</section>
			</MainBase>
		);
	}

	return <React.Fragment>{pageData === null ? <HomeSkeleton /> : renderPage()}</React.Fragment>;
};

const MainBase = styled.main`
	background-color: #030303;
	overflow: scroll;

	#guide-container {
		margin-top: 100px;
		margin-left: auto;
		margin-right: auto;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		width: 80vw;
		height: 75vh;

		#card-container {
			overflow: scroll;
			overflow-x: hidden;
			border-radius: 10px;
			background-color: black;
			border: 2px solid grey;
		}

		#map-container {
			height: 100%;
			border-radius: 10px;

			.my-marker {
				display: block;
				width: 30px;
				height: 30px;
				background-size: 30px 30px;
			}

			.mapboxgl-popup-content {
				button {
					font-size: 1.5rem;
					padding: 0 0.3rem;
				}
			}

			.popup-card {
				h3 {
					font-size: 1rem;
				}
			}
		}
	}

	#corona-container {
		margin-top: 2%;
		margin-left: auto;
		margin-right: auto;
		height: 50vh;
		width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;

		.fa-chevron-down {
			color: white;
			font-size: 2.3rem;
			animation: bounce;
			animation-duration: 2.5s;
			animation-iteration-count: infinite;
			margin-bottom: 1%;
		}

		h2 {
			color: white;
			text-align: center;
			font-size: 2.5rem;
			font-weight: normal;
		}

		h3 {
			color: white;
			font-weight: normal;
			font-size: 1.5rem;
		}

		#button-container {
			margin-top: .5rem;
			display: flex;
			gap: 2rem;
			width: 100%;
			justify-content: center;

			button {
				margin: 2% 0;
				font-size: 1.8rem;
				padding: .8rem;
				cursor: pointer;
				color: white;
				background-color: black;
				border: 1px solid white;

				&:hover {
					opacity: 0.5;
				}
			}
		}

		article {
			color: white;
		}
	}

	@media only screen and (max-width: 1000px) {
		#guide-container {
			display: flex;
			flex-direction: column;

			height: fit-content;

			#card-container {
				height: 50vh;
			}

			#map-container {
				height: 50vh;
			}
		}
	}
`;

export default GuidePage;

//@media only screen and (max-width: 1024px){}
