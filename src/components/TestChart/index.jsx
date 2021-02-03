import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const corsURL = 'https://cors-anywhere.herokuapp.com/';
const yelpKey = process.env.YELP_API_KEY;

const TestChart = ({ yelpID }) => {
	const [ reviews, setReviews ] = useState(null);
	const [ chartState, setChartState ] = useState({
		data: [],
		layout: {
			width: 400,
			height: 400,
			title: 'Latest 3 Yelp Reviews'
		},
		frames: [],
		config: {}
	});

	useEffect(
		() => {
			let newChartData = {
				type: 'bar',
				x: [],
				y: []
			};

			//BELOW IS THE YELP FETCH
			fetch(`https://api.yelp.com/v3/businesses/${yelpID}/reviews`, {
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
		},
		[ yelpID ]
	);

	return (
		<React.Fragment>
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
