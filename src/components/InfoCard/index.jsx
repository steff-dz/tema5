import React from 'react';
import styled from 'styled-components';
import TestChart from '../TestChart';

const InfoCard = ({ name, image, descrip, yelpID }) => {
	return (
		<InfoCardBase>
			<h1>{name}</h1>
			<img src={`https://imgix.cosmicjs.com/${image}`} />
			<p dangerouslySetInnerHTML={{ __html: descrip }} />
			<div>
				<TestChart yelpID={yelpID} />
			</div>
		</InfoCardBase>
	);
};

const InfoCardBase = styled.div`
	border: 3px solid black;
	height: 100%;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-top: .5rem;
	}

	img {
		width: 400px;
		display: block;
	}

	p {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		line-height: 2.3rem;
	}

	div {
		padding-bottom: 2rem;
	}
`;

export default InfoCard;
