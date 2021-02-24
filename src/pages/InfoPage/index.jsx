import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import PageSkeleton from '../../components/PageSkeleton';
import PageWrapper from '../../components/PageWrapper';

const InfoPage = () => {
	const [ pageData, setPageData ] = useState(null);

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

	useEffect(
		() => {
			if (pageData !== null) {
				// Promise.all([
				// 	fetch(`https://data.cityofchicago.org/resource/qzdf-xmn8.json?primary_type=HOMICIDE`),
				// 	fetch(`https://data.cityofchicago.org/resource/qzdf-xmn8.json?primary_type=THEFT`),
				// 	fetch(`https://data.cityofchicago.org/resource/qzdf-xmn8.json?primary_type=ASSAULT`)
				// ])
				// 	.then(function(responses) {
				// 		return Promise.all(
				// 			responses.map(function(response) {
				// 				return response.json();
				// 			})
				// 		);
				// 	})
				// 	.then(function(data) {
				// 		console.log(data);
				// 	})
				// 	.catch(function(error) {
				// 		console.log(error);
				// 	});

				fetch(`https://data.cityofchicago.org/resource/qzdf-xmn8.json?primary_type=THEFT`, {
					params: {
						limit: 50000
					}
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		},
		[ pageData ]
	);

	function renderPage() {
		return (
			<PageWrapper>
				<InfoContainer dangerouslySetInnerHTML={{ __html: pageData.content }} />
			</PageWrapper>
		);
	}

	return <React.Fragment>{pageData === null ? <PageSkeleton pageColor={'#030303'} /> : renderPage()}</React.Fragment>;
};

const InfoContainer = styled.p`
	margin-top: 100px;
	color: white;
	text-align: center;
	height: 100vh;
`;

export default InfoPage;
