import React, { useState, useEffect } from 'react';
//import NavContainer from '../../containers/NavContainer';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';
import Skeleton from '../../components/Skeleton';

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
				setPageData(data.object);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// function renderSkeleton() {
	// 	return <p>Loading page....</p>;
	// }

	function renderPage() {
		return (
			<MainBase>
				<div dangerouslySetInnerHTML={{ __html: pageData.content }} />
			</MainBase>
		);
	}

	return <React.Fragment>{pageData === null ? <Skeleton /> : renderPage()}</React.Fragment>;
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
			left: 18%;
			bottom: 35%;
			font-size: 4.2rem;
		}

		h2 {
			right: 30%;
			font-size: 9.2rem;
			width: fit-content;
			bottom: 10%;
		}

		p {
			height: 100vh;

			img {
				width: 100%;
				height: 100%;
				/* position: absolute; */
			}
		}
	}
`;

export default LandingPage;
