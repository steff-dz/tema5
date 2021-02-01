import React from 'react';
import styled from 'styled-components';

const InfoCard = ({ name, image, descrip, yelpID }) => {
	return (
		<InfoCardBase>
			<h1>{name}</h1>
		</InfoCardBase>
	);
};

const InfoCardBase = styled.div`
	border: 3px solid black;
	height: 100%;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-top: .5rem;
	}
`;

export default InfoCard;
