import { useEffect, useState } from "react";

import { onSnapshot } from "firebase/firestore"; 
import { foodMenuCollectionRef } from "./../../firebase/firestore.collection.js";

import { FoodBox } from "./../FoodBox/FoodBox.js";

import {
	Heading,
	Flex,
	Box,
	Wrap
} from "@chakra-ui/react";

export function FoodMenu() {
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		const getFoodMenu = onSnapshot(foodMenuCollectionRef, snapshot => {
			setMenu(snapshot.docs.map(doc => ({
				id: doc.id,
				name: doc.data().name,
				ingredients: doc.data().ingredients,
				price: doc.data().price,
				img: doc.data().img.id
			})));
		});

		return () => {
			getFoodMenu();
		};
	}, []);

	return (
		<Box flex='2'>
			<Flex gap={2} marginBottom="1rem">
				<Heading variant='foodMenuHeader'>
					Best Sellers
				</Heading>
				<Box layerStyle='foodMenuHeaderLine'/>
			</Flex>
			<Wrap spacing='2rem'>
				{
					menu.map(food => (
						<FoodBox 
							key={food.id}
							food={food}
						/>
					))
				}
			</Wrap>
		</Box>
	);
}
