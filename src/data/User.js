import { useState, createContext } from "react";
import { 
	onAuthStateChanged
} from "firebase/auth";
import { auth } from "./../firebase/firebase-config.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({});

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	return(
		<UserContext.Provider value={user}>
			{children}
		</UserContext.Provider>
	);
};