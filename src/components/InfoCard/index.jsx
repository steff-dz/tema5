import React from 'react';
import styled from 'styled-components';

const InfoCard = ({ name, image, descrip, yelpID }) => {
	return (
		<InfoCardBase>
			<h1>{name}</h1>
			<img src={`https://imgix.cosmicjs.com/${image}`} />
			<p dangerouslySetInnerHTML={{ __html: descrip }} />
		</InfoCardBase>
	);
};

const InfoCardBase = styled.div`
	border: 3px solid black;
	height: 100%;
	color: white;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-top: .5rem;
	}

	img {
		width: 400px;
		margin: 0 auto;
		display: block;
	}

	p {
		padding: 1rem 2rem;
		font-size: 1.7rem;
		line-height: 2.3rem;
	}
`;

export default InfoCard;
