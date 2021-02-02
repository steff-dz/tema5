import React from 'react';
import styled from 'styled-components';

const DefaultCard = () => {
	return (
		<DefaultCardBase>
			<h1>Welcome to Chicago-Land!</h1>
			<p>
				This guide is going to skip over the usual tourist Chicago spots such as the Sears Tower, Cloud Gate,
				the Shed Aquarium, Navy Pier, and similar places. You can find those things on any ol' guide like on
				Trip Advisor or Yelp. Instead, we are going to feature the places that an old Chicago-Land native loves
				to visit whenever they are back in Chi-Town. Hopefully, this will help unveil some hidden treasures that
				the city and surrounding neighborhoods and suburbs have to offer.
				<br />
				<br />
				But what does 'Chicago-Land' mean, you ask? Chicago-Land is simply an informal name for the entire
				metropolitan area of Chicago. It's a huge area and whether someone is from Boy's Town or Naperville, we
				all feel that we are a part of Chicago.<br />
			</p>
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
		font-size: 1.7rem;
		line-height: 2.3rem;
	}
`;

export default DefaultCard;
