import React from 'react';
import styled from 'styled-components';

const DefaultCard = () => {
	return (
		<DefaultCardBase>
			<h1>Steff's Guide to Chicago</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt error consectetur iste doloremque!
				Minima cupiditate id, exercitationem necessitatibus aliquid maiores modi cumque ullam? Soluta quasi nam
				aspernatur, eum in et.Voluptate ut iste atque culpa architecto exercitationem error maiores reiciendis
				voluptates repellendus dolorem illo eaque cupiditate minima, odio enim harum aliquid eius soluta
				laboriosam? Enim iure reprehenderit distinctio beatae non!
			</p>
		</DefaultCardBase>
	);
};

const DefaultCardBase = styled.div`
	border: 3px solid black;
	height: 100%;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin-top: .5rem;
	}

	p {
		padding: 1rem 2rem;
		font-size: 1.7rem;
		line-height: 2rem;
	}
`;

export default DefaultCard;
