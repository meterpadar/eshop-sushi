/** @jsxImportSource @emotion/react */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";

import {
	Box,
	Flex,
	Heading,
	Link,
	Text
} from "@chakra-ui/react";

export function Footer() {
	const activeStyle = {
		textDecoration: "solid underline 0.15rem",
	};

	const onIsActive = ({ isActive }) => isActive ? activeStyle : undefined;

	return (
		<Box layerStyle='footer'>
			<Flex layerStyle='footerNavigation'>
				<Flex direction='column' gap={3}>
					<Heading fontWeight='semibold'>
						company
					</Heading>
					<Link 
						as={NavLink} 
						to='/about-us'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						about us
					</Link>
					<Link 
						as={NavLink}
						to='/faq'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						faq
					</Link>
					<Link 
						as={NavLink}
						to='/contact-us'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						contact us
					</Link>
				</Flex>
				<Flex direction='column' gap={3}>
					<Heading fontWeight='semibold'>
						legal
					</Heading>
					<Link 
						as={NavLink}
						to='/terms-and-conditions'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						terms & conditions
					</Link>
					<Link 
						as={NavLink}
						to='/privacy-policy'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						privacy policy
					</Link>
					<Link 
						as={NavLink}
						to='/disclaimer'
						variant='navigationLinkStyle'
						style={onIsActive}
					>
						disclaimer
					</Link>
				</Flex>
				<Flex direction='column' gap={3}>
					<Heading fontWeight='semibold'>
						social media
					</Heading>
					<Flex justify='space-between'>
						<Link
							href='https://www.facebook.com'
							target="_blank"
							variant='socialLinkStyle'
							facebook='true'
						>
							<FontAwesomeIcon icon="fa-brands fa-facebook-f" 
							/>
						</Link>
						<Link
							href='https://www.twitter.com'
							target="_blank"
							variant='socialLinkStyle'
							twitter='true'
						>
							<FontAwesomeIcon icon="fa-brands fa-twitter" />
						</Link>
						<Link
							href='https://www.instagram.com'
							target="_blank"
							variant='socialLinkStyle'
							instagram='true'
						>
							<FontAwesomeIcon icon="fa-brands fa-instagram" />
						</Link>
						<Link
							href='https://www.youtube.com'
							target="_blank"
							variant='socialLinkStyle'
							youtube='true'
						>
							<FontAwesomeIcon icon="fa-brands fa-youtube" />
						</Link>
					</Flex>
				</Flex>
			</Flex>
			<Text layerStyle='footerCopyright'>
				copyright c 2022 tap foodworks ltd. | all rights reserved
			</Text>
		</Box>
	);
}
