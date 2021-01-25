import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';
import styled from 'styled-components';

const Navigation = () => {
	const [ navData, setNavData ] = useState(null);

	useEffect(() => {
		const client = new Cosmic();
		const bucket = client.bucket({
			slug: process.env.BUCKET_SLUG,
			read_key: process.env.READ_KEY
		});

		bucket
			.getObject({
				slug: 'navigation',
				props: 'slug,title,content'
			})
			.then((data) => {
				setNavData(data.object);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function renderSkel() {
		return <p>loading page...</p>;
	}

	function renderNav() {
		return <NavBase dangerouslySetInnerHTML={{ __html: navData.content }} />;
	}

	return <React.Fragment>{navData === null ? renderSkel() : renderNav()}</React.Fragment>;
};

export default Navigation;

const NavBase = styled.nav`
	width: 100vw;
	z-index: 100;
	position: absolute;
	padding: 0 2rem;
	margin-top: 0.5rem;

	ul {
		display: flex;
		list-style: none;
		font-size: 2.5rem;
		color: white;
		align-items: baseline;
		font-weight: bold;

		li {
			padding-right: 1rem;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;
