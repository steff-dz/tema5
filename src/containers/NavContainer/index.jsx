import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';
import NavItem from '../../components/NavItem';

const NavContainer = () => {
	const [ navData, setNavData ] = useState(null);

	useEffect(() => {
		const client = new Cosmic();
		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObjects({
				type: 'navlinks',
				limit: 5,
				props: 'title,slug'
			})
			.then((data) => {
				setNavData(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function renderSkel() {
		return <p>Loading...</p>;
	}

	function renderNav() {
		return (
			<NavBase>
				<ul>
					{navData.objects.map((item) => {
						return <NavItem key={item.slug} title={item.title} url={`/${item.slug}`} />;
					})}
				</ul>
			</NavBase>
		);
	}

	return <React.Fragment>{navData === null ? renderSkel() : renderNav()}</React.Fragment>;
};

const NavBase = styled.nav`
	position: absolute;
	z-index: 100;
	margin-top: .5rem;

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

export default NavContainer;

/* <NavBase>
<ul>
    {navData.objects.map((item) => {
        return <li>{item.title}</li>;
    })}
</ul>
</NavBase> */
