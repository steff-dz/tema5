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
