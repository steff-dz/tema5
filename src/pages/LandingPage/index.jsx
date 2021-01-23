import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

const LandingPage = () => {
	const [ pageData, setPageData ] = useState(null);

	useEffect(() => {
		const client = new Cosmic();
		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObject({
				slug: 'the-local-yokel',
				props: 'slug,title,content'
			})
			.then((data) => {
				console.log(data);
				setPageData(data.object);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function renderSkeleton() {
		return <p>Loading page....</p>;
	}

	function renderPage() {
		return (
			<main>
				<h1>{pageData.title}</h1>

				<div dangerouslySetInnerHTML={{ __html: pageData.content }} />
			</main>
		);
	}

	return <React.Fragment>{pageData === null ? renderSkeleton() : renderPage()}</React.Fragment>;
};

export default LandingPage;
//{pageData === null ? renderSkeleton() : renderPage()}
