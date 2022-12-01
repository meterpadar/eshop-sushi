import { useContext, useEffect } from "react";
import { CartContext } from "../../data/CartProvider.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";

import { UserContext } from "./../../data/User.js";

import {
	Box,
	Heading,
	Text,
	Flex,
	Button
} from "@chakra-ui/react";

export function SideCart() {
	const { cart, increaseCount, decreaseCount, clearCart, getCurrentUserCart, currentUserCart } = useContext(CartContext);

	const user = useContext(UserContext);

	const navitage = useNavigate();

	const itemsPricesInCartNoLoginUser = cart.map(item => item.totalPrice);

	const totalPriceNoLoginUser = itemsPricesInCartNoLoginUser.reduce((a, b) => {
		return a + b;
	}, 0);

	const itemsPricesInCartLoginUser = currentUserCart.map(item => item.totalPrice);

	const totalPriceLoginUser = itemsPricesInCartLoginUser.reduce((a, b) => {
		return a + b;
	}, 0);

	const onGoToCart = () => {
		navitage("/cart");
	};
	
	useEffect(() => {
		getCurrentUserCart();
	});

	console.log(cart);

	return (
		!user ?
			!cart.length ?
				<Box layerStyle='sideCart'>
					<Box layerStyle='sideCartHeader'>
						<Heading variant='cartHeader'>
							Cart
						</Heading>
					</Box>
					<Box layerStyle='sideEmptyCart'>
						<FontAwesomeIcon
							icon="fa-solid fa-cart-shopping" 
							size="2x" 
						/>
						<Text variant='emptyCart'>
							Cart is empty!
						</Text>
					</Box>
				</Box> 
				:
				<Box layerStyle='sideCart'>
					<Flex layerStyle='sideCartHeader'>
						<Heading variant='cartHeader'>
							Cart
						</Heading>
						<Button
							colorScheme='red'
							onClick={clearCart}
						>
							Clear Cart
						</Button>
					</Flex>
					<Box layerStyle='sideCartItems'>
						<Box>
							{
								cart.map(item => (
									<Box 
										key={item.id}
										layerStyle='sideCartFoodBox'	
									>
										<Heading variant='foodBoxHeading'>
											{item.name}
										</Heading>
										<Text variant='foodBoxIngredients'>
											{item.ingredients.join(", ")}
										</Text>
										<Flex layerStyle='foodBoxPriceAndCounter'>
											<Text flex='5'>
												Price: {item.totalPrice}$
											</Text>
											<Flex 
												flex='2' 
												gap={2}
												layerStyle='foodBoxCounter'
											>
												<Button
													colorScheme='blackAlpha'
													size='sm'
													onClick={() => decreaseCount(item)}
												>
													-
												</Button>
												{
													cart.map(itemInCart => (
														itemInCart.id === item.id && 
												<Text key={itemInCart.id}>
													{itemInCart.amount}
												</Text>
													))
												}
												<Button
													colorScheme='blackAlpha'
													size='sm'
													onClick={() => increaseCount(item)}
												>
													+
												</Button>
											</Flex>
										</Flex>
									</Box>
								))
							}
						</Box>		
					</Box>
					<Box>
						<Text variant='sideCartTotalPrice'>
							Total: {totalPriceNoLoginUser}$
						</Text>
						<Button
							variant='sideCart'
							onClick={onGoToCart}
						>
							Go To Cart
						</Button>
					</Box>
				</Box> 
			:
			!currentUserCart.length ?
				<Box layerStyle='sideCart'>
					<Box layerStyle='sideCartHeader'>
						<Heading variant='cartHeader'>
							Cart
						</Heading>
					</Box>
					<Box layerStyle='sideEmptyCart'>
						<FontAwesomeIcon
							icon="fa-solid fa-cart-shopping" 
							size="2x" 
						/>
						<Text variant='emptyCart'>
							Cart is empty!
						</Text>
					</Box>
				</Box> 
				:
				<Box layerStyle='sideCart'>
					<Flex layerStyle='sideCartHeader'>
						<Heading variant='cartHeader'>
							Cart
						</Heading>
						<Button
							colorScheme='red'
							onClick={clearCart}
						>
							Clear Cart
						</Button>
					</Flex>
					<Box layerStyle='sideCartItems'>
						<Box>
							{
								currentUserCart.map(item => (
									<Box 
										key={item.id}
										layerStyle='sideCartFoodBox'	
									>
										<Heading variant='foodBoxHeading'>
											{item.name}
										</Heading>
										<Text variant='foodBoxIngredients'>
											{item.ingredients.join(", ")}
										</Text>
										<Flex layerStyle='foodBoxPriceAndCounter'>
											<Text flex='5'>
													Price: {item.totalPrice}$
											</Text>
											<Flex 
												flex='2' 
												gap={2}
												layerStyle='foodBoxCounter'
											>
												<Button
													colorScheme='blackAlpha'
													size='sm'
													onClick={() => decreaseCount(item)}
												>
														-
												</Button>
												{
													currentUserCart.map(itemInCart => (
														itemInCart.id === item.id && 
														<Text key={itemInCart.id}>
															{itemInCart.amount}
														</Text>
													))
												}
												<Button
													colorScheme='blackAlpha'
													size='sm'
													onClick={() => increaseCount(item)}
												>
														+
												</Button>
											</Flex>
										</Flex>
									</Box>
								))
							}
						</Box>	
					</Box>
					<Box>
						<Text variant='sideCartTotalPrice'>
							Total: {totalPriceLoginUser}$
						</Text>
						<Button
							variant='sideCart'
							onClick={onGoToCart}
						>
							Go To Cart
						</Button>
					</Box>
				</Box>
	);
}
