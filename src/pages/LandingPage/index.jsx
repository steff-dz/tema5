import React, { useState, useEffect } from 'react';
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
	overflow: hidden;

	div {
		h1,
		h2 {
			position: absolute;
			z-index: 99;
			color: white;
		}

		h1 {
			left: 250px;
			bottom: 250px;
			font-size: 4.2rem;
		}

		h2 {
			right: 500px;
			font-size: 9.2rem;
			width: fit-content;
			bottom: 50px;
		}

		p {
			height: 100vh;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}

	@media only screen and (max-width: 800px) {
		background-color: #012c5a;
		display: flex;
		flex-direction: column;
		align-content: center;
		height: 100vh;
		div {
			margin-top: 12%;

			width: 100%;
			height: 100%;

			h1,
			h2 {
				position: static;
				text-align: center;
			}

			h1 {
				font-size: 3rem;
				margin-top: 5%;
				margin-bottom: 15px;
			}

			h2 {
				font-size: 7rem;
				margin: 0 auto;
			}
			p {
				height: 0;
				img {
					height: 50%;
					object-fit: cover;
					position: absolute;
					bottom: 0;
				}
			}
		}
	}

	@media only screen and (max-width: 500px) {
		div {
			h1 {
				margin-top: 13%;
				font-size: 2.5rem;
			}

			h2 {
				font-size: 5rem;
			}
		}
	}
`;

export default LandingPage;
