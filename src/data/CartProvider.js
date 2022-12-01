import { useState, useContext, createContext } from "react";

import { db } from "./../firebase/firebase-config.js";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import { UserContext } from "./User.js";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
	const user = useContext(UserContext);

	const [cart, setCart] = useState([]);
	const [currentUserCart, setCurrentUserCart] = useState([]);
	const [usersAddress, setUsersAddress] = useState({});
	
	let cartClone = [...cart];

	const getUsersAddress = async () => {
		if (!user) {
			return;
		} else {
			const usersAddressRef = doc(db, "users", user.uid);

			const usersAddressDocSnap = await getDoc(usersAddressRef);

			setUsersAddress(usersAddressDocSnap.data().address);
		}
	};

	const setCurrentUserCartAfterLogin = async (userUid) => {
		const currentCartRef = doc(db, "users", userUid);
			
		const currentCartSnap = await getDoc(currentCartRef);

		setCart(currentCartSnap.data().currentCart);
	};

	const setCurrentUserCartAfterLogout = async () => {
		setCart([]);
	};

	const saveCurrentCartToUser = async () => {
		if (!user) {
			return;
		} else {
			const currentCartRef = doc(db, "users", user.uid);

			const currentCartPayload = { currentCart: cartClone };

			await updateDoc(currentCartRef, currentCartPayload);
		}
	};
	
	const getCurrentUserCart = async () => {
		if (!user) {
			setCurrentUserCart([]);

			return;
		} else {
			const currentUserCartDocRef = doc(db, "users", user.uid);

			const currentUserCartDocSnap = await getDoc(currentUserCartDocRef);

			setCurrentUserCart(currentUserCartDocSnap.data().currentCart);
		}
	};
	
	const addItemToCart = (addedItem, amount) => {
		const idsOfItemsInCart = cart.map(itemInCart => itemInCart.id);
		
		const newItemInCart = {
			...addedItem,
			amount,
			totalPrice: addedItem.price * amount
		};

		let index = 0;

		if (!cart.length) {
			cartClone[index] = newItemInCart;
		} else if (!idsOfItemsInCart.includes(addedItem.id)) {
			index = cart.length;

			cartClone[index] = newItemInCart;
		} else {
			index = cart.map(itemInCart => itemInCart.id).indexOf(addedItem.id);

			cartClone[index] = newItemInCart;
		}

		setCart(cartClone);

		saveCurrentCartToUser();
	};	
    
	const increaseCount = item => {
		const idsOfItemsInCart = cart.map(itemInCart => itemInCart.id);

		if (idsOfItemsInCart.includes(item.id)) {
			cart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					addItemToCart(item, itemInCart.amount + 1);
				}
			});
		} else {
			addItemToCart(item, 1);
		}
	};

	const removeItemFromCart = (removedItem, amount) => {
		const index = cart.map(itemInCart => { 
			return itemInCart.id; 
		}).indexOf(removedItem.id);

		if (amount === 0) {
			cartClone = cartClone.filter(itemInCartClone => itemInCartClone.id !== removedItem.id);
		} else {
			cartClone[index] = {
				...removedItem,
				amount,
				totalPrice: removedItem.price * amount
			};
		}

		setCart(cartClone);

		saveCurrentCartToUser();
	};

	const decreaseCount = item => {
		const idsOfItemsInCart = cart.map(itemInCart => itemInCart.id);

		if (idsOfItemsInCart.includes(item.id)) {
			cart.map(itemInCart => {
				if (itemInCart.amount < 1) {
					return;
				} else if (itemInCart.id === item.id) {
					removeItemFromCart(item, itemInCart.amount - 1);
				}
			});
		}
	};

	const clearCart = async () => {
		if (!user) {
			setCart([]);
		} else {
			const currentCartRef = doc(db, "users", user.uid);
			const currentCartPayload = { currentCart: [] };

			setCart([]);

			await updateDoc(currentCartRef, currentCartPayload);
		}
	};

	return(
		<CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, increaseCount, decreaseCount, clearCart, setCurrentUserCartAfterLogin, setCurrentUserCartAfterLogout, getCurrentUserCart, currentUserCart, getUsersAddress, usersAddress }}>
			{children}
		</CartContext.Provider>
	);
};