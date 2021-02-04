import React from 'react';
import styled from 'styled-components';

const DefaultCard = ({ defaultText }) => {
	return (
		<DefaultCardBase>
			<div dangerouslySetInnerHTML={{ __html: defaultText }} />
		</DefaultCardBase>
	);
};

//should probably make this a re-usable comp for both this card and the info card.
const DefaultCardBase = styled.div`
	color: white;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-top: .5rem;
	}

	p {
		padding: 1rem 2rem;
		font-size: 1.5rem;
		line-height: 2.3rem;
	}
`;

export default DefaultCard;
