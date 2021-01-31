import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import MyMap from '../../components/MyMap';

const GuidePage = () => {
	const [ pageData, setPageData ] = useState(null);
	const [ mapMarkersState, setMapMarkersState ] = useState([]);

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

	function renderSkeleton() {
		return <p>Loading page...</p>;
	}

	function renderPage() {
		return (
			<MainBase>
				<section>Info will be posted here.</section>
				<MyMap mapMarkersState={mapMarkersState} />
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
`;
export default GuidePage;

//<div dangerouslySetInnerHTML={{ __html: pageData.content }} />
//<MyMap />
