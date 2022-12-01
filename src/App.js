import { Routes, Route } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { 
	faFacebookF, 
	faTwitter, 
	faInstagram, 
	faYoutube,
	faGoogle
} from "@fortawesome/free-brands-svg-icons";

import { 
	faCartShopping
} from "@fortawesome/free-solid-svg-icons";

import { Nav } from "./components/Nav/Nav.js";
import { Home } from "./components/Home/Home.js";
import { Menu } from "./components/Menu/Menu.js";
import { LogIn } from "./components/LogIn/LogIn.js";
import { Register } from "./components/Register/Register.js";
import { Orders } from "./components/Orders/Orders.js";
import { Cart } from "./components/Cart/Cart.js";
import { Checkout } from "./components/Checkout/Checkout.js";
import { Footer } from "./components/Footer/Footer.js";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop.js";

import { UserProvider } from "./data/User.js";
import { CartProvider } from "./data/CartProvider.js";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme.js";
import { Box } from "@chakra-ui/react";

library.add(
	faFacebookF, 
	faTwitter, 
	faInstagram, 
	faYoutube,
	faGoogle,
	faCartShopping
);

function App() {
	return (
		<ScrollToTop>
			<ChakraProvider theme={theme}>
				<UserProvider>
					<CartProvider>
						<Box minH='100%'>
							<Nav />
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/menu' element={<Menu />} />
								<Route path='/log-in' element={<LogIn />} />
								<Route path="/register" element={<Register />} />
								<Route path="/orders" element={<Orders />} />
								<Route path="/cart" element={<Cart />} />
								<Route path="/checkout" element={<Checkout />} />
							</Routes>
							<Footer />
						</Box>
					</CartProvider>
				</UserProvider>
			</ChakraProvider>
		</ScrollToTop>
	);
}

export default App;
