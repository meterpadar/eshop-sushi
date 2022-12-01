import {
	Box,
	Input,
	Alert,
	AlertTitle,
	Button,
	Flex
} from "@chakra-ui/react";

import { useContext } from "react";

import { useForm } from "react-hook-form";

import { UserContext } from "./../../data/User.js";
import { CartContext } from "../../data/CartProvider.js";

import { db } from "./../../firebase/firebase-config.js";
import { doc, updateDoc } from "firebase/firestore";

export function AddressForm() {
	const user = useContext(UserContext);
	const { getUsersAddress } = useContext(CartContext);

	const {
		register, 
		handleSubmit,
		formState: { errors } 
	} = useForm();

	const updateAddress = async (addressData) => {
		if (!user) {
			return;
		} else {
			const addressRef = doc(db, "users", user.uid);

			const addressPayload = { address: addressData };

			await updateDoc(addressRef, addressPayload);
			await getUsersAddress();
			
			onCancel();
		}
	};

	const onCancel = () => {
		document.getElementById("addressForm").style.display = "none";
        
		document.getElementById("alertAndAddAddressButton").style.display = "block";
	};

	return (
		<Box
			id="addressForm"
			as='form'
			style={{display: "none"}}
			onSubmit={
				handleSubmit(data => {
					console.log(data);

					updateAddress(data);
				})
			}
		>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="number" 
				placeholder='Building number'
				{...register("buildingNumber", {
					required: "Building number is required"
				})}
			/>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="text" 
				placeholder='Street name'
				{...register("streetName", {
					required: "Street name is required"
				})}
			/>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="text" 
				placeholder='City'
				{...register("city", {
					required: "City is required",
				})}
			/>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="text" 
				placeholder='State'
				{...register("state", {
					required: "State is required",
				})}
			/>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="text" 
				placeholder='Country'
				{...register("country", {
					required: "Country is required",
				})}
			/>
			<Input
				layerStyle='inputStyle'
				size='lg'
				variant='unstyled'
				type="number" 
				placeholder='Pin code'
				{...register("pinCode", {
					required: "Pin code is required",
				})}
			/>
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
			<Flex gap={4}>
				<Button
					colorScheme='blackAlpha'
					size='lg'
					onClick={onCancel}
				>
                    Cancel
				</Button>
				<Button
					type='submit'
					colorScheme='blue'
					size='lg'
				>
                    Update
				</Button>
			</Flex>
		</Box>
	);
}
