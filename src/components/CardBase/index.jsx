import styled from 'styled-components';

const CardBase = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 3rem;

	h1 {
		font-size: 2.5rem;
		text-align: center;
		margin: 1.2rem 0;
	}

	img {
		width: 400px;
		display: block;
	}

	p {
		padding: 1rem 2rem;
		font-size: 1.3rem;
		line-height: 2.3rem;
	}

	div {
		padding-bottom: 2rem;
	}

	@media only screen and (max-width: 1200px) {
		padding: 0 .5rem;

		img {
			width: 300px;
		}
	}
`;

export default CardBase;
