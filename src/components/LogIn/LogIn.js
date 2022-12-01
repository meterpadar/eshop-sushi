import { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import { Link as RouterLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from "firebase/auth";
import { auth, db } from "./../../firebase/firebase-config.js";
import { setDoc, doc } from "firebase/firestore";

import { UserContext } from "./../../data/User.js";
import { CartContext } from "../../data/CartProvider.js";

import {
	Heading,
	Box,
	Input,
	Text,
	Link,
	Button,
	Alert,
	AlertTitle
} from "@chakra-ui/react";

export function LogIn() {
	const [loginError, setLoginError] = useState(false);
	const { setCurrentUserCartAfterLogin, cart } = useContext(CartContext);
	const user = useContext(UserContext);

	const googleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		const registeredGoogleUser = await signInWithPopup(auth, provider);

		const docRef = await doc(db, "users", registeredGoogleUser.user.uid);
		const payload = { 
			email: registeredGoogleUser.user.email,
			currentCart: cart,
			address: {},
			orders: {}
		};
			
		await setDoc(docRef, payload);
	};
	
	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	const {
		register, 
		handleSubmit,
		watch,
		formState: { errors } 
	} = useForm();

	const watchEmail = watch("email");
	const watchPassword = watch("password");

	const logIn = async () => {
		try {
			const loginUser = await signInWithEmailAndPassword(
				auth,
				watchEmail,
				watchPassword
			);

			await setCurrentUserCartAfterLogin(loginUser.user.uid);

			setLoginError(false);
		} catch (error) {
			console.log(error.message);
			
			setLoginError(true);
		}
	};

	return (
		<Box layerStyle='body'>
			<Heading variant='bodyHeader'>
				Login
			</Heading>
			{
				!user ?
					<>
						<Box
							as='form'
							onSubmit={
								handleSubmit(data => {
									console.log(data);

									logIn();
								})
							}
						>
							<Input 
								layerStyle='inputStyle'
								variant='unstyled'
								type="email" 
								placeholder='Email'
								size='lg'
								{...register("email", {
									required: "Email is required"
								})}
							/>
							<Input 
								layerStyle='inputStyle'
								variant='unstyled'
								type="password" 
								placeholder='Passowrd'
								size='lg'
								{...register("password", {
									required: "Password is required"
								})}
							/>
							{
								loginError &&
									<Alert
										layerStyle='alertStyle'
										status='error'
									>
										<AlertTitle>
											Email or Password is incorrect !
										</AlertTitle>
									</Alert>
							}
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
							<Text variant='boldText'>
								Not yet registered? <Link
									as={RouterLink} 
									to='/register'
									variant='blueLink'
								>
									Register
								</Link> 
							</Text>
							<Button
								colorScheme='blue'
								size='lg'
								type='submit'
							>
								Login
							</Button>
						</Box> 
						<Box textAlign='center'>
							<Text variant="boldText">
								OR
							</Text>
							<Button 
								variant='googleButton'
								leftIcon={<FontAwesomeIcon icon="fa-brands fa-google" color='blue'/>}
								onClick={handleGoogleSignIn}
							>
								Sign in with Google
							</Button>
						</Box>
					</> :
					<Text variant="boldText">
						You logged in
					</Text>
			}
		</Box>
	);
}
