import React from 'react';
import styled from 'styled-components';

const Skeleton = () => {
	return (
		<SkeletonBase>
			<div id="nav-skeleton" />
			<div id="loader" />
		</SkeletonBase>
	);
};

const SkeletonBase = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #333;
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

	#loader {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		align-self: center;
		margin-top: 20%;
		border: 10px solid #202020;
		border-top: 10px solid white;
		animation: spin 2.5s linear infinite;
	}

	@keyframes loadingNav {
		from {
			width: 100px;
		}

		to {
			width: 800px;
		}
	}

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
