import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const corsURL = 'https://cors-anywhere.herokuapp.com/';
const yelpKey = process.env.YELP_API_KEY;
let i = 0;
const covidKey = process.env.COVIDNOW_API_KEY;

const TestChart = () => {
	const [ reviews, setReviews ] = useState(null);
	const [ chartState, setChartState ] = useState({
		data: [],
		layout: {
			width: 500,
			height: 400,
			title: 'My first diagram'
		},
		frames: [],
		config: {}
	});

	useEffect(() => {
		let newChartData = {
			type: 'bar',
			x: [],
			y: []
		};

		//BELOW IS THE YELP FETCH
		fetch(`${corsURL}https://api.yelp.com/v3/businesses/fleetwood-roller-rink-summit-argo/reviews`, {
			headers: {
				Authorization: `Bearer ${yelpKey}`
			}
		})
			.then((response) => response.json())
			.then((data) => {
				data.reviews.forEach((el) => {
					newChartData.y.push(el.rating);
					newChartData.x.push(el.time_created.slice(0, 10));
				});
				let newChartState = {
					...chartState,
					data: [ newChartData ]
				};
				setChartState(newChartState);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function covidInfo() {
		fetch(`https://api.covidactnow.org/v2/county/17043.timeseries.json?apiKey=${covidKey}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<React.Fragment>
			<p>maybe a chart will go here oneday. hopefully.</p>
			<button onClick={() => covidInfo()}>Covid Act Now API</button>
			<Plot
				data={chartState.data}
				layout={chartState.layout}
				frames={chartState.frames}
				config={chartState.config}
				onInitialized={(figure) => setChartState(figure)}
				onUpdate={(figure) => setChartState(figure)}
			/>
		</React.Fragment>
	);
};

export default TestChart;
