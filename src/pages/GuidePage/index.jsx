import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';

const GuidePage = () => {
	const [ pageData, setPageData ] = useState(null);

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
	}, []);

	function renderSkeleton() {
		return <p>Loading page...</p>;
	}

	function renderPage() {
		return (
			<MainBase>
				<div dangerouslySetInnerHTML={{ __html: pageData.content }} />
			</MainBase>
		);
	}
	return <React.Fragment>{pageData === null ? renderSkeleton() : renderPage()}</React.Fragment>;
};

const MainBase = styled.main`
	height: 100vh;
	border: 1px solid black;
	margin-top: 6%;
`;
export default GuidePage;
