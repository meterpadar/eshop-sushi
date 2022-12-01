import { useContext } from "react";

import { CartContext } from "../../data/CartProvider.js";

import { UserContext } from "./../../data/User.js";

import {
	WrapItem,
	Box,
	Image,
	Heading,
	Text,
	Flex,
	Button
} from "@chakra-ui/react";

export function FoodBox({ food }) {
	const { cart, increaseCount, decreaseCount, currentUserCart } = useContext(CartContext);

	const user = useContext(UserContext);

	const idsOfItemsInCart = cart.map(itemInCart => itemInCart.id);
	const idsOfItemsInCurrentUserCart = currentUserCart.map(itemInCart => itemInCart.id);

	return (
		<WrapItem>
			<Box bg='gray.200' borderRadius='0.5rem'>
				<Box overflow='hidden'>
					<Image
						layerStyle='foodBoxImage' 
						src={`images/${food.img}`} 
						alt={food.img}
					/>
				</Box>
				<Box padding='0.5rem 1rem'>
					<Heading variant='foodBoxHeading'>
						{food.name}
					</Heading>
					<Text variant='foodBoxIngredients'>
						{food.ingredients.join(", ")}
					</Text>
					<Flex layerStyle='foodBoxPriceAndCounter'>
						<Text flex='1'>
							{food.price}$
						</Text>
						<Flex 
							flex='1' 
							gap={2}
							layerStyle='foodBoxCounter'
						>
							<Button
								colorScheme='blackAlpha'
								size='sm'
								onClick={() => decreaseCount(food)}
							>
								-
							</Button>
							{
								user ?
									idsOfItemsInCurrentUserCart.includes(food.id) ?
										currentUserCart.map(itemInCart => (
											itemInCart.id === food.id &&
											<Text key={itemInCart.id}>
												{itemInCart.amount}
											</Text>
										)) 
										:
										<Text>
											0
										</Text>
									:
									idsOfItemsInCart.includes(food.id) ?
										cart.map(itemInCart => (
											itemInCart.id === food.id &&
											<Text key={itemInCart.id}>
												{itemInCart.amount}
											</Text>
										)) 
										:
										<Text>
											0
										</Text>
							}					
							<Button
								colorScheme='blackAlpha'
								size='sm'
								onClick={() => increaseCount(food)}
							>
								+
							</Button>
						</Flex>
					</Flex>
				</Box>
			</Box>
		</WrapItem>
	);
}
