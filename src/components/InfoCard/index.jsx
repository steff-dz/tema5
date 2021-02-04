import React from 'react';
import CardBase from '../CardBase';

const InfoCard = ({ name, image, descrip }) => {
	return (
		<CardBase>
			<h1>{name}</h1>
			<img src={`https://imgix.cosmicjs.com/${image}`} />
			<div dangerouslySetInnerHTML={{ __html: descrip }} />
		</CardBase>
	);
};

export default InfoCard;
