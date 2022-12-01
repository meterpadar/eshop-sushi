import { useNavigate } from "react-router-dom";

import {
	Flex,
	Image,
	Heading,
	Box,
	Text,
	Button
} from "@chakra-ui/react";

export function Home() {
	const navitage = useNavigate();

	const onOrderNow = () => {
		navitage("/menu");
	};

	return (
		<Flex layerStyle='homeMainBox'>
			<Flex pos='relative' gap={6}>
				<Image 
					boxSize='13rem'
					src="sushi.png" 
					alt="sushi" 
				/>
				<Flex layerStyle='homeLogoText'>
					<Heading 
						size='3xl'
						color='#535AA7'
					>
						sushi
					</Heading>
					<Heading 
						size='4xl' 
						color='#434FD8'
					>
						time
					</Heading>
				</Flex>
			</Flex>
			<Box pos='relative'>
				<Text
					fontSize='4xl'
					fontWeight='semibold'
					color='white'
					textTransform='capitalize'
				>
					sushi time online ordering
				</Text>
				<Text
					fontSize='5xl'
					fontWeight={200}
					color='white'
					textTransform='capitalize'
				>
					your best sushi delivered fast & fresh
				</Text>
				<Button
					colorScheme='blue'
					textTransform='capitalize'
					my={4}
					size='lg'
					onClick={onOrderNow}
				>
					order now
				</Button>
			</Box>
		</Flex>
	);
}
