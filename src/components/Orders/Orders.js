import { 
	Heading,
	Box,
	Text,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";

import { UserContext } from "./../../data/User.js";

import { db } from "./../../firebase/firebase-config.js";
import { doc, getDoc } from "firebase/firestore";

export function Orders() {
	const user = useContext(UserContext);

	const [currentUserOrders, setCurrentUserOrders] = useState({});

	const getUserOrders = async () => {
		const currentUserRef = doc(db, "users", user.uid);

		const currentUserDocSnap = await getDoc(currentUserRef);
		
		setCurrentUserOrders(currentUserDocSnap.data().orders);
	};

	useEffect(() => {
		getUserOrders();
	}, []);	

	return (
		<Box layerStyle='body'>
			<Box marginBottom="1.5rem">
				<Heading variant='bodyHeader'>
					Orders
				</Heading>
				{
					Object.values(currentUserOrders).length === 0 ?
						<Text variant="boldText">
							You haven&apos;t ordered anything yet!
						</Text>
						:
						<TableContainer>
							<Table variant='simple' size='sm'>
								<TableCaption>Orders</TableCaption>
								<Thead>
									<Tr>
										<Th>N.O.</Th>
										<Th>Order</Th>
										<Th>Address</Th>
										<Th>Payment Method</Th>
										<Th>Price</Th>
									</Tr>
								</Thead>
								<Tbody>
									{
										Object.entries(currentUserOrders).map(([key, value]) => (
											<Tr key={key}>
												<Td>
													<Text variant="orderTable">
														{`${key}.`}
													</Text>
												</Td>
												<Td>
													{
														value.order.items.map(orderInfo => (
															<Text key={orderInfo.foodName} variant="orderTable" textTransform='capitalize'>
																{`${orderInfo.foodName} - ${orderInfo.amount} ks`} 
															</Text>
											
														))
													}
												</Td>
												<Td>
													<Text variant="orderTable">
														{`${value.address.streetName} ${value.address.buildingNumber}`}
													</Text>
													<Text variant="orderTable">
														{`${value.address.city}`}
													</Text>
													<Text variant="orderTable">
														{`${value.address.pinCode}`}
													</Text>
													<Text variant="orderTable">
														{`${value.address.state}`}
													</Text>
													<Text variant="orderTable">
														{`${value.address.country}`}
													</Text>
												</Td>
												<Td>
													<Text variant="orderTable">
														{value.paymentMethod}
													</Text>
												</Td>
												<Td>
													<Text variant="orderTable">
														{`${value.totalPrice}€`}
													</Text>
												</Td>
											</Tr>
										))
									}
								</Tbody>
							</Table>
						</TableContainer>
						
				}
				
			</Box>
		</Box>
	);
}
