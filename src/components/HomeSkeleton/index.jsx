import React from 'react';
import styled from 'styled-components';

const Skeleton = ({ pageType }) => {
	return (
		<SkeletonBase props={pageType}>
			<div id="nav-skeleton" />
			<Loader />
		</SkeletonBase>
	);
};

const SkeletonBase = styled.div`
	width: 100vw;
	height: 100vh;
	/* background-color: black; */
	background-color: ${(props) => (props === 'guide' ? '#333' : '#01214a')};
	position: relative;
	display: flex;
	flex-direction: column;

	#nav-skeleton {
		width: 380px;
		height: 75px;
		background-color: black;
		opacity: .5;
		position: absolute;
		top: 5px;
		border-radius: 10px;
		animation: loadingNav 2.5s ease-out infinite;
	}

	@keyframes loadingNav {
		from {
			width: 100px;
		}

		to {
			width: 800px;
		}
	}
`;

const Loader = styled.div`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	align-self: center;
	margin-top: 20%;
	border: 10px solid rgba(0, 3, 51, .5);
	border-top: 10px solid white;
	animation: spin 2.5s linear infinite;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
`;

export default Skeleton;
