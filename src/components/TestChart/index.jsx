import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const TestChart = ({ chartData }) => {
	console.log(chartData);
	const [ chartState, setChartState ] = useState({
		data: [],
		layout: {
			width: 400,
			height: 400,
			title: 'Chart'
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
		// fetch(`https://api.yelp.com/v3/businesses/${yelpID}/reviews`, {
		// 	headers: {
		// 		Authorization: `Bearer ${yelpKey}`
		// 	}
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		data.reviews.forEach((el) => {
		// 			newChartData.y.push(el.rating);
		// 			newChartData.x.push(el.time_created.slice(0, 10));
		// 		});
		// 		let newChartState = {
		// 			...chartState,
		// 			data: [ newChartData ]
		// 		};
		// 		setChartState(newChartState);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 	});
	}, []);

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
