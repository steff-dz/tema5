import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cosmic from 'cosmicjs';
import Skeleton from '../../components/Skeleton';

const InfoPage = () => {
	const [ pageData, setPageData ] = useState(null);

	//const censusKey = '6a666693f2c349932b6b4e55060abc630f82da9d';

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

	return <Skeleton />;
};

export default InfoPage;
