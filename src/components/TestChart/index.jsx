import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const TestChart = ({ chartData, displayMode }) => {
	const [ chartState, setChartState ] = useState({
		data: [],
		layout: {
			width: 800,
			height: 400,
			title: ''
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

			chartData.filter((el) => {
				newChartData.x.push(el.date);
			});

			if (displayMode === 'Cases') {
				chartData.forEach((el) => {
					newChartData.y.push(el.cases);
				});
			} else if (displayMode === 'New Cases') {
				chartData.forEach((el) => {
					newChartData.y.push(el.newCases);
				});
			} else if (displayMode === 'Deaths') {
				chartData.forEach((el) => {
					newChartData.y.push(el.deaths);
				});
			} else {
				console.log('its not working!');
			}

			let newChartState = {
				...chartState,
				data: [ newChartData ],
				layout: {
					title: `Total ${displayMode}`
				}
			};

			setChartState(newChartState);
		},
		[ chartData, displayMode ]
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
