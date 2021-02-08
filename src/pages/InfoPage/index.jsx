import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import Plot from 'react-plotly.js';
import PageSkeleton from '../../components/PageSkeleton';

const InfoPage = () => {
	const [ pageData, setPageData ] = useState(null);
	// const [ chartState, setChartState ] = useState({
	// 	data: [],
	// 	layout: {
	// 		width: 800,
	// 		height: 400,
	// 		title: ''
	// 	},
	// 	frames: [],
	// 	config: {}
	// });
	const [ homicideData, setHomicideData ] = useState(null);

	useEffect(() => {
		const client = new Cosmic();

		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObject({
				slug: 'chicago-info',
				props: 'slug,title,content'
			})
			.then((data) => {
				setPageData(data.object);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		fetch(`https://data.cityofchicago.org/resource/qzdf-xmn8.json?primary_type=HOMICIDE`)
			.then((response) => response.json())
			.then((data) => {
				setHomicideData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// function renderChart() {
	// 	return (
	// 		<React.Fragment>
	// 			<Plot
	// 				data={chartState.data}
	// 				layout={chartState.layout}
	// 				frames={chartState.frames}
	// 				config={chartState.config}
	// 				onInitialized={(figure) => setChartState(figure)}
	// 				onUpdate={(figure) => setChartState(figure)}
	// 			/>
	// 		</React.Fragment>
	// 	);
	// }

	return <PageSkeleton pageColor={'#01214a'} />;
};

export default InfoPage;
