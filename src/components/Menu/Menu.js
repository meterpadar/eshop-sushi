import { SideCart } from "./../SideCart/SideCart.js";
import { FoodMenu } from "./../FoodMenu/FoodMenu.js";

import {
	Heading,
	Flex,
	Box
} from "@chakra-ui/react";

export function Menu() {
	return (
		<Box layerStyle='body'>
			<Heading variant='bodyHeader'>
				Menu
			</Heading>
			<Flex gap={6}>	
				<FoodMenu />
				<SideCart />
			</Flex>
		</Box>
	);
}
