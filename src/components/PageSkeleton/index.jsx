import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const PageSkeleton = ({ pageColor }) => {
	return (
		<SkeletonBase pageColor={pageColor}>
			<Loader />
		</SkeletonBase>
	);
};

const spin = keyframes`
	from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
`;

const SkeletonBase = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: ${(variants) => variants.pageColor};
	position: relative;
	display: flex;
	flex-direction: column;
`;

const Loader = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	align-self: center;
	margin-top: 20%;
	border: 10px solid rgba(0, 3, 51, .5);
	border-top: 10px solid white;
	animation: ${spin} 2.5s linear infinite;
`;

export default PageSkeleton;
