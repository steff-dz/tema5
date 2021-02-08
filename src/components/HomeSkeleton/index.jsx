import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const Skeleton = ({ pageColor }) => {
	return (
		<SkeletonBase pageColor={pageColor}>
			<NavSkeleton />
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

const loadingNav = keyframes`
	from {
			width: 100px;
		}

		to {
			width: 800px;
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

const NavSkeleton = styled.div`
	width: 380px;
	height: 75px;
	background-color: black;
	opacity: .5;
	position: absolute;
	top: 5px;
	border-radius: 10px;
	animation: ${loadingNav} 2.5s ease-out infinite;
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

export default Skeleton;
