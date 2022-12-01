import { AddressForm } from "./../AddressForm/AddressForm.js";

import { useContext, useEffect, useRef } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../data/CartProvider.js";
import { UserContext } from "./../../data/User.js";

import { db } from "./../../firebase/firebase-config.js";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { 
	Heading,
	Box,
	Flex,
	Text,
	Button,
	Radio, 
	RadioGroup,
	Stack,
	Alert,
	AlertTitle
} from "@chakra-ui/react";

export function Checkout() {
	const {
		register, 
		handleSubmit,
		formState: { errors } 
	} = useForm();

	const navigate = useNavigate();

	const myRef = useRef(null);

	const scrollToLoaction = () => myRef.current.scrollIntoView(); 
	
	const { getUsersAddress, usersAddress, clearCart } = useContext(CartContext);
	const user = useContext(UserContext);

	const onAddAddress = () => {
		document.getElementById("addressForm").style.display = "block";

		document.getElementById("alertAndAddAddressButton").style.display = "none";
	};

	const onPlaceOrder = async (paymentMethod) => {
		if (Object.keys(usersAddress).length === 0) {
			scrollToLoaction();
		} else {
			const ordersRef = doc(db, "users", user.uid);
			
			const usersDataDocSnap = await getDoc(ordersRef);

			const orderNumber = Object.keys(usersDataDocSnap.data().orders).length + 1;

			const orderData = {
				address: usersDataDocSnap.data().address,
				order: {
					items: usersDataDocSnap.data().currentCart.map(itemInCart => (
						{
							foodName: itemInCart.name,
							amount: itemInCart.amount,
							price: itemInCart.totalPrice
						} 
					)),
				},
				totalPrice: usersDataDocSnap.data().currentCart.map(itemInCart => itemInCart.totalPrice).reduce((a, b) => {
					return a + b;
				}, 0),
				paymentMethod: paymentMethod
			};

			const ordersPayload = { 
				orders: {
					[orderNumber]: orderData,
					...usersDataDocSnap.data().orders
				}
			};

			await updateDoc(ordersRef, ordersPayload);

			clearCart();

			navigate("/orders");
		}
	};

	useEffect(() => {
		getUsersAddress();
	}, []);

	return (
		<Box layerStyle='body'>
			<Box marginBottom="1.5rem">
				<Heading variant='bodyHeader' ref={myRef} >
					checkout
				</Heading>
				<Flex gap={2} marginBottom="0.5rem">
					<Heading variant='foodMenuHeader'>
						Location
					</Heading>
					<Box layerStyle='foodMenuHeaderLine'/>
				</Flex>
				<Text
					variant="boldText"
				>
					Address:
				</Text>
				<AddressForm />
				<Box id='alertAndAddAddressButton'>
					{
						Object.keys(usersAddress).length === 0 ?
							<Alert
								layerStyle='alertStyle'
								status='error'
							>				
								<AlertTitle>
									No Address Found					
								</AlertTitle>
							</Alert>
							:
							<Box>	
								<Text variant="address">
									{`${usersAddress.streetName} ${usersAddress.buildingNumber}`}
								</Text>
								<Text variant="address">
									{usersAddress.city}
								</Text>
								<Text variant="address">
									{usersAddress.pinCode}
								</Text>
								<Text variant="address">
									{usersAddress.state}
								</Text>
								<Text variant="address">
									{usersAddress.country}
								</Text>
							</Box>
					}
					<Button
						colorScheme='blue'
						my={4}
						size='lg'
						onClick={onAddAddress}
					>
						Add Address
					</Button>
				</Box>	
			</Box>
			<Box
				as='form'
				onSubmit={
					handleSubmit(data => {
						console.log(data);
	
						onPlaceOrder(data.paymentMethod);
					})
				}	
			>
				<Flex gap={2} marginBottom="1rem">
					<Heading variant='foodMenuHeader'>
						Mode of Payment
					</Heading>
					<Box layerStyle='foodMenuHeaderLine'/>
				</Flex>
				<RadioGroup 
					defaultValue='cash on delivery'
				>
					<Stack>
						<Radio 
							{...register("paymentMethod")}
							value='cash on delivery'
							name="paymentMethod"
						>
							Cash on Delivery
						</Radio>
						<Radio 
							{...register("paymentMethod")}
							value='wallet' 
							name="paymentMethod"
						>
							Wallet
						</Radio>
						<Radio 
							{...register("paymentMethod")}
							value='credit / debit card' 
							name="paymentMethod"
						>
							Credit / Debit Card
						</Radio>
						<Radio 
							value='net banking' 
							name="paymentMethod"
						>
							Net Banking
						</Radio>
					</Stack>
				</RadioGroup>
				{
					Object.values(errors).length !== 0 && <Alert
						layerStyle='alertStyle'
						status='error'
					>
						{
							Object.values(errors).map(error => (
								<AlertTitle key={error.message}>
									{error.message}
								</AlertTitle>
							)
							)
						}
					</Alert>
				}
				<Button
					type='submit'
					colorScheme='blue'
					my={4}
					size='lg'
				>
					Place Order
				</Button>
			</Box>
		</Box>
	);
}
