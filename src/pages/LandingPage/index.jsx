import React, { useState, useEffect } from 'react';
//import NavContainer from '../../containers/NavContainer';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';

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
				props: 'slug,title,content,metadata'
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
			<MainBase>
				<div dangerouslySetInnerHTML={{ __html: pageData.content }} />
			</MainBase>
		);
	}

	return <React.Fragment>{pageData === null ? renderSkeleton() : renderPage()}</React.Fragment>;
};
const MainBase = styled.main`
	height: 100vh;
	position: relative;

	div {
		h1,
		h2 {
			position: absolute;
			z-index: 99;
			color: white;
		}

		h1 {
			left: 10%;
			bottom: 35%;
			font-size: 4rem;
		}

		h2 {
			right: 20%;
			font-size: 9rem;
			width: fit-content;
			bottom: 10%;
		}

		p {
			/* height: 100vh; */
			top: 0;
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
`;

export default LandingPage;
