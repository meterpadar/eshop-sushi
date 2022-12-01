import { useContext } from "react";

import { useForm } from "react-hook-form";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from "firebase/auth";
import { auth, db } from "./../../firebase/firebase-config.js";
import { setDoc, doc } from "firebase/firestore";

import { UserContext } from "./../../data/User.js";
import { CartContext } from "../../data/CartProvider.js";

import {
	Box,
	Heading,
	Input,
	Alert,
	AlertTitle,
	Text,
	Link,
	Button
} from "@chakra-ui/react";

export function Register() {
	const {
		register, 
		handleSubmit,
		watch,
		formState: { errors } 
	} = useForm();

	const navigate = useNavigate();

	const { cart } = useContext(CartContext);

	const user = useContext(UserContext);

	const watchEmail = watch("email");
	const watchPassword = watch("password");

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

	const registerUser = async () => {
		try {
			const registeredUser = await createUserWithEmailAndPassword(
				auth,
				watchEmail,
				watchPassword
			);

			const loggedUser = await signInWithEmailAndPassword(
				auth,
				watchEmail,
				watchPassword
			);

			const docRef = doc(db, "users", registeredUser.user.uid);
			const payload = { 
				email: watchEmail,
				currentCart: cart,
				address: {},
				orders: {}
			};
			
			await setDoc(docRef, payload);

			console.log(registeredUser);
			console.log(loggedUser);
		} catch (error) {
			console.log(error.message);
		}

		navigate("/menu");
	};

	return (
		<Box layerStyle='body'>
			<Heading variant='bodyHeader'>
				Register
			</Heading>
			{
				!user ?
					<>
						<Box
							as='form' 
							onSubmit={
								handleSubmit(data => {
									console.log(data);

									registerUser();
								})
							}>
							<Input
								layerStyle='inputStyle'
								size='lg'
								variant='unstyled'
								type="email" 
								placeholder='Email'
								{...register("email", {
									required: "Email is required"
								})}
							/>
							<Input
								layerStyle='inputStyle'
								size='lg'
								variant='unstyled'
								type="password" 
								placeholder='Passowrd'
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 6,
										message: "Min Length Is 6 chars"
									}
								})}
							/>
							<Input
								layerStyle='inputStyle'
								size='lg'
								variant='unstyled'
								type="password" 
								placeholder='Confirm Password'
								{...register("confirmPassword", {
									validate: {
										matchPassword: value => value === watchPassword || "Password doesn't match"
									}
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
							<Text variant='boldText'>
								Already registered? 
								<Link
									as={RouterLink} 
									to='/log-in'
									variant='blueLink'
								>
									Login
								</Link>  
							</Text>
							<Button
								type='submit'
								colorScheme='blue'
								size='lg'
							>
								Register
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
						You already registered
					</Text>
			}
		</Box>
	);
}
