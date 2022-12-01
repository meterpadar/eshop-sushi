import { useContext, useEffect } from "react";

import { CartContext } from "../../data/CartProvider.js";

import { useNavigate } from "react-router-dom";

import { UserContext } from "./../../data/User.js";

import {
	Box,
	Flex,
	Heading,
	Text,
	Button,
	Image
} from "@chakra-ui/react";

export function Cart() {
	const { cart, increaseCount, decreaseCount, currentUserCart, getCurrentUserCart } = useContext(CartContext);

	const user = useContext(UserContext);

	const navigate = useNavigate();

	const itemsPricesInCart = cart.map(item => item.totalPrice);

	const price = itemsPricesInCart.reduce((a, b) => {
		return a + b;
	}, 0);

	const onCheckout = () => {
		user ? navigate("/checkout") : navigate("/log-in");
	};

	const gstPrice = price * 2 / 100;

	useEffect(() => {
		getCurrentUserCart();
	});

	return (
		<Box layerStyle='body'>
			<Heading variant='bodyHeader'>
                Cart
			</Heading>
			{
				!user ?
					!cart.length ?
						<Text variant="boldText">
							Cart is empty!
						</Text>
						:
						<Box>
							{
								cart.map(itemInCart => (
									<Flex
										key={itemInCart.id}
										layerStyle='foodCartBox'
									>
										<Box overflow='hidden'>
											<Image
												layerStyle='foodBoxImage' 
												src={`images/${itemInCart.img}`} 
												alt={itemInCart.img}
											/>
										</Box>
										<Box 
											flex='1'
											layerStyle='foodCartBoxText'
										>
											<Box>
												<Heading variant='foodBoxHeading'>
													{itemInCart.name}
												</Heading>
												<Text variant='foodBoxIngredients'>
													{itemInCart.ingredients.join(", ")}
												</Text>
											</Box>		
											<Flex layerStyle='foodBoxCartPriceAndCounter'>
												<Text flex='1'>
													Price: {itemInCart.price}$
												</Text>
												<Flex >
													<Flex 
														layerStyle='foodBoxCounter'
														gap={2}
													>
														<Button
															colorScheme='blackAlpha'
															size='sm'
															onClick={() => decreaseCount(itemInCart)}
														>
															-
														</Button>
														<Text>
															{itemInCart.amount}
														</Text>				
														<Button
															colorScheme='blackAlpha'
															size='sm'
															onClick={() => increaseCount(itemInCart)}
														>
															+
														</Button>
													</Flex>
												</Flex>
											</Flex>
										</Box>		
									</Flex>
								))
							}
							<Box>
								<Text variant="boldText">
									Price: {price}$
								</Text>
								<Text variant="boldText">
									GST: {gstPrice}$ (rate 2%)
								</Text>
								<Text variant="boldText">
									Total Price: {price + gstPrice}$
								</Text>
								<Button
									colorScheme='blue'
									textTransform='uppercase'
									my={4}
									size='lg'
									onClick={onCheckout}
								>
									checkout
								</Button>
							</Box>
						</Box>
					:
					!currentUserCart.length ?
						<Text variant="boldText">
							Cart is empty!
						</Text>
						:
						<Box>
							{
								currentUserCart.map(itemInCart => (
									<Flex
										key={itemInCart.id}
										layerStyle='foodCartBox'
									>
										<Box overflow='hidden'>
											<Image
												layerStyle='foodBoxImage' 
												src={`images/${itemInCart.img}`} 
												alt={itemInCart.img}
											/>
										</Box>
										<Box 
											flex='1'
											layerStyle='foodCartBoxText'
										>
											<Box>
												<Heading variant='foodBoxHeading'>
													{itemInCart.name}
												</Heading>
												<Text variant='foodBoxIngredients'>
													{itemInCart.ingredients.join(", ")}
												</Text>
											</Box>		
											<Flex layerStyle='foodBoxCartPriceAndCounter'>
												<Text flex='1'>
													Price: {itemInCart.price}$
												</Text>
												<Flex >
													<Flex 
														layerStyle='foodBoxCounter'
														gap={2}
													>
														<Button
															colorScheme='blackAlpha'
															size='sm'
															onClick={() => decreaseCount(itemInCart)}
														>
															-
														</Button>
														<Text>
															{itemInCart.amount}
														</Text>				
														<Button
															colorScheme='blackAlpha'
															size='sm'
															onClick={() => increaseCount(itemInCart)}
														>
															+
														</Button>
													</Flex>
												</Flex>
											</Flex>
										</Box>		
									</Flex>
								))
							}
							<Box>
								<Text variant="boldText">
									Price: {price}$
								</Text>
								<Text variant="boldText">
									GST: {gstPrice}$ (rate 2%)
								</Text>
								<Text variant="boldText">
									Total Price: {price + gstPrice}$
								</Text>
								<Button
									colorScheme='blue'
									textTransform='uppercase'
									my={4}
									size='lg'
									onClick={onCheckout}
								>
									checkout
								</Button>
							</Box>
						</Box>
			}
			
		</Box>
	);
}
