import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import Plot from 'react-plotly.js';
import HomeSkeleton from '../../components/HomeSkeleton';

const cors = 'https://cors-anywhere.herokuapp.com/';
const InfoPage = () => {
	const [ pageData, setPageData ] = useState(null);
	const [ chartState, setChartState ] = useState({
		data: [
			{
				x: [ 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011 ],
				y: [
					5128510,
					5106780,
					5150230,
					5171960,
					5200820,
					5224270,
					5244090,
					5254680,
					5252880,
					5239350,
					5219780
				],
				type: 'scatter'
			}
		],
		layout: {
			width: 800,
			height: 400,
			title: 'population'
		},
		frames: [],
		config: {}
	});

	const censusKey = '6a666693f2c349932b6b4e55060abc630f82da9d';

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
		fetch(
			`https://api.census.gov/data/2019/acs/acsse?get=NAME,K200101_001E&for=county:031&in=state:17&key=${censusKey}`
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function renderChart() {
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
	}

	return <HomeSkeleton pageColor={'#01214a'} />;
};

export default InfoPage;

//https://api.census.gov/data/2019/acs/acs5/profile?get=NAME,DP02_0001E&for=county:031&in=state:17&key=${censusKey}

//https://api.census.gov/data/2019/acs/acsse?get=NAME,K200101_001E&for=county:001&in=state:01&key=YOUR_KEY_GOES_HERE
//https://api.census.gov/data/2019/acs/acsse?get=NAME,K200101_001E&for=state:17&key=${censusKey}

//https://api.census.gov/data/2019/acs/acsse?get=NAME,K200101_001E&for=county:001&in=state:01&key=YOUR_KEY_GOES_HERE
//https://api.census.gov/data/2019/acs/acs5/profile?get=NAME,DP02_0001E&for=county:031&in=state:17&key=${censusKey}
