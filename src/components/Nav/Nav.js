/** @jsxImportSource @emotion/react */

import { useContext } from "react";

import { NavLink } from "react-router-dom";

import { auth } from "./../../firebase/firebase-config.js";
import { signOut } from "firebase/auth";

import { UserContext } from "./../../data/User.js";
import { CartContext } from "../../data/CartProvider.js";

import {
	Flex,
	Spacer,
	Image,
	Avatar,
	Link
} from "@chakra-ui/react";

export function Nav() {
	const user = useContext(UserContext);

	const { setCurrentUserCartAfterLogout } = useContext(CartContext);


	const activeStyle = {
		textDecoration: "solid underline 0.15rem",
	};

	const onIsActive = ({ isActive }) => isActive ? activeStyle : undefined;
	
	const onLogOut = async () => {
		await signOut(auth);
		
		await setCurrentUserCartAfterLogout();
	};

	return (
		<Flex layerStyle='headerNavigation'>
			<Link to='/' as={NavLink}>
				<Image
					boxSize='3rem'
					src="sushi.png"
					alt="Sushi"
				/>
			</Link>
			<Spacer />
			<Flex gap={6}>
				<Link 
					as={NavLink}
					to='/'
					variant='navigationLinkStyle'
					style={onIsActive}
				>
					home
				</Link>	
				<Link 
					as={NavLink} 
					to='/menu'
					variant='navigationLinkStyle'
					style={onIsActive}
				>
					menu
				</Link>
				{
					!user ?
						<>
							<Link 
								as={NavLink} 
								to='/log-in'
								variant='navigationLinkStyle'
								style={onIsActive}
							>
								log in
							</Link>
							<Link 
								as={NavLink} 
								to='/register'
								variant='navigationLinkStyle'
								style={onIsActive}
							>
								register
							</Link>
						</> 
						:
						<>
							<Link 
								as={NavLink} 
								to='/orders'
								variant='navigationLinkStyle'
								style={onIsActive}
							>
								orders
							</Link>
							<Link 
								as={NavLink} 
								to='/log-in'
								variant='navigationLinkStyle'
								onClick={onLogOut}
							>
								log out
							</Link>
							<Avatar size='sm'/>
						</>
				}
			</Flex> 	
		</Flex>
	);
}
