import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const CovidChart = ({ chartData, displayMode }) => {
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

	//Filtering different types of data to the chart based off of the display mode value-----------------------
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

			switch (displayMode) {
				case 'Cases':
					chartData.forEach((el) => {
						newChartData.y.push(el.cases);
					});
					break;
				case 'New Cases':
					chartData.forEach((el) => {
						newChartData.y.push(el.newCases);
					});
					break;
				case 'Deaths':
					chartData.forEach((el) => {
						newChartData.y.push(el.deaths);
					});
					break;
				default:
					console.log('there is an error in the switch statement.');
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

export default CovidChart;
