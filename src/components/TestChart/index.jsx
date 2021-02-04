import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const TestChart = ({ chartData }) => {
	console.log('hi');
	const [ chartState, setChartState ] = useState({
		data: [],
		layout: {
			width: 800,
			height: 400,
			title: 'Total Covid Cases in the past 10 Days'
		},
		frames: [],
		config: {}
	});

	useEffect(
		() => {
			let newChartData = {
				type: 'scatter',
				x: [],
				y: []
			};

			chartData.forEach((el) => {
				newChartData.x.push(el.date);
				newChartData.y.push(el.cases);
			});

			let newChartState = {
				...chartState,
				data: [ newChartData ]
			};

			setChartState(newChartState);
		},
		[ chartData ]
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
