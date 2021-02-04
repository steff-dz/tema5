import React from 'react';
import CardBase from '../CardBase';

const DefaultCard = ({ defaultText }) => {
	return (
		<CardBase>
			<div dangerouslySetInnerHTML={{ __html: defaultText }} />
		</CardBase>
	);
};

export default DefaultCard;
