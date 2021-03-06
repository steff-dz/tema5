import React, { useState, useEffect, useRef } from 'react';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import NavItem from '../NavItem';
import { NavLink } from 'react-router-dom';

const NavContainer = () => {
	const navElement = useRef(null);
	const [ navData, setNavData ] = useState(null);

	//Call to Cosmic JS--------------------------------
	useEffect(() => {
		const client = new Cosmic();
		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObjects({
				type: 'navlinks',
				props: 'title,slug'
			})
			.then((data) => {
				setNavData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	//Scroll effect changing Navbar opacity---------------------
	useEffect(() => {
		window.addEventListener(
			'scroll',
			() => {
				if (window.scrollY > 80) {
					navElement.current.style.opacity = '1';
				} else {
					navElement.current.style.opacity = '0.8';
				}
			},
			true
		);
	}, []);

	function renderNav() {
		return (
			<NavBase ref={navElement}>
				<ul>
					<NavLink className="nav-item" to="/">
						Home
					</NavLink>
					{navData.objects.map((item) => {
						return <NavItem key={item.slug} title={item.title} url={`/${item.slug}`} />;
					})}
				</ul>
			</NavBase>
		);
	}

	return (
		<React.Fragment>
			<React.Fragment>{navData === null ? <NavSkeleton /> : renderNav()}</React.Fragment>
		</React.Fragment>
	);
};
//Styled components--------------------------------------
const NavBase = styled.nav`
	position: fixed;
	z-index: 100;
	margin-top: .5rem;
	background-color: black;
	padding: 1rem;
	border-radius: 0 15px 15px 0;
	opacity: .8;
	top: 0;
	width: fit-content;

	ul {
		display: flex;
		flex-direction: row-reverse;
		list-style: none;
		gap: 1rem;
		padding-left: 5rem;

		.nav-item {
			text-decoration: none;
			color: white;
			font-size: 2rem;

			&:hover {
				text-decoration: underline;
			}
		}
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

export default NavContainer;
