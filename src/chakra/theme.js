import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	components: {
		Input: {
			sizes: {
				lg: {
					field: {
						borderRadius: "1.5rem",
					},
				},
			},
		},
		Button: {
			baseStyle: {
				margin: "0.5rem 0",
				_focus: {
					boxShadow: "none"
				}
			},
			variants: {
				sideCart: {
					margin: "0",
					width: "100%",
					borderRadius: "0",
					textTransform: "uppercase",
					backgroundColor: "#805AD5",
					color: "white",
					_hover: {
						backgroundColor: "#553C9A"
					}
				},
				googleButton: {
					borderRadius: "none",
					boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
					color: "#8A8A8A"
				}
			}
		},
		Text: {
			variants: {
				foodBoxIngredients: {
					fontSize: "0.9rem",
					color: "grey",
					fontStyle: "italic"
				},
				emptyCart: {
					fontSize: "1.8rem",
					fontWeight: "700"
				},
				sideCartTotalPrice: {
					padding: "0.5rem",
					fontWeight: "600"
				},
				boldText: {
					fontWeight: "500"
				},
				address: {
					color: "grey",
					fontWeight: "500",
					fontSize: "0.9rem"
				},
				orderTable: {
					color: "grey",
					fontWeight: "500",
					textTransform: "capitalize"
				}
			}
		},
		Heading: {
			variants: {
				bodyHeader: {
					fontSize: "2.75rem",
					fontWeight: "400",
					borderBottom: "solid 2px",
					marginBottom: "1rem",
					textTransform: "uppercase"
				},
				foodMenuHeader: {
					fontSize: "2.1rem",
					fontWeight: "500"
				},
				foodBoxHeading: {
					fontWeight: "500",
					fontSize: "1rem",
					textTransform: "capitalize"
				},
				cartHeader: {
					fontSize: "2.8rem",
					fontWeight: "600"
				}
			}
		},
		Link: {
			baseStyle: {
				_focus: {
					boxShadow: "none"
				}
			},
			variants: {
				navigationLinkStyle: {
					fontSize: "18px",
					fontWeight: "semibold",
					color: "#434FD8",
					alignSelf: "start",
					_hover: {
						textDecoration: "none",
						_before: {
							transform: "scaleX(1)"
						}
					},
					_before: {
						content: "\"\"",
						position: "relative",
						display: "block",
						width: "100%",
						height: "2px",
						top: "24px",
						left: "0",
						backgroundColor: "#434FD8",
						transform: "scaleX(0)",
						transformOrigin: "top left",
						transition: "transform 0.3s ease"
					}	
				},
				socialLinkStyle: (props) => ({
					width: "2.5rem",
					height: "2.5rem",
					borderRadius: "50%",
					padding: "0.5rem",
					textAlign: "center",
					transitionDuration: "300ms",
					color: props.facebook ? "#4E5BAE" : props.twitter ? "#81C2D8" : props.instagram ? "#DD5484" : props.youtube ? "#D32626" : "black",
					_hover: {
						backgroundColor: props.facebook ? "#4E5BAE" : props.twitter ? "#81C2D8" : props.instagram ? "#DD5484" : props.youtube ? "#D32626" : "white",
						color: "white",
						boxShadow: "dark-lg"
					}
				}),
				blueLink: {
					color: "blue"
				}
			}
		}
	},
	layerStyles: {
		headerNavigation: {
			pos: "fixed", 
			w: "100%", 
			h: 16, 
			zIndex: 2, 
			bg: "gray.100", 
			px: 20,
			alignItems: "center",
			textTransform: "capitalize"
		},
		body: {
			px: 20,
			paddingTop: 16,
			paddingBottom: 10
		},
		foodMenuHeaderLine: {
			flex: "1",
			borderBottom: "solid gray 1px",
			margin: "1rem 0"
		},
		foodBoxImage: {
			transition: "all .3s",
			width: "12.5rem",
			height: "8rem",
			objectFit: "cover",
			_hover: {
				transform: "scale(1.2)"
			}
		},
		foodBoxPriceAndCounter: {
			alignItems: "center",
			marginTop: "0.5rem"	
		},
		foodBoxCartPriceAndCounter: {
			alignItems: "center",
		},
		foodBoxCounter: {
			justifyContent: "space-between",
			alignItems: "center"
		},
		sideCart: {
			flex: "1",
			backgroundColor: "gray.200",
			position: "sticky",
			top: "6rem",
			height: "23rem"
		},
		sideCartItems: {
			overflowY: "auto",
			padding: "0.5rem",
			height: "60%",
			borderTop: "solid 1px",
			"&::-webkit-scrollbar": {
				width: "4px",
			},
			"&::-webkit-scrollbar-track": {
				width: "6px",
			},
			"&::-webkit-scrollbar-thumb": {
				background: "grey",
				borderRadius: "24px",
			}
		},
		sideEmptyCart: {
			position: "absolute",
			top: "40%",
			width: "100%",
			textAlign: "center"
		},
		sideCartHeader: {
			justifyContent: "space-between", 
			alignItems: "center",
			padding: "0.5rem"
		},
		sideCartFoodBox: {
			borderBottom: "solid 1px",
			padding: "0.5rem 0"
		},
		homeMainBox: {
			pos: "relative",
			px: 20,
			py: 36,
			flexDirection: "column",
			backgroundImage: "url(\"sushi-wallpaper.png\")",
			backgroundAttachment: "fixed",
			backgroundSize: "cover",
			justifyContent: "center",
			minH: "20rem",
			_before: {
				content:"\"\"",
				position: "absolute",
				top: "0px",
				right: "0px",
				bottom: "0px",
				left: "0px",
				backgroundColor: "rgba(0,0,0,0.7)"
			}
		},
		homeLogoText: {
			flexDirection: "column",
			justifyContent: "center",
			textTransform: "uppercase",
			color: "#535AA7"
		},
		footer: {
			backgroundColor: "gray.100",
			px: 20,
			paddingTop: "3rem"
		},
		footerNavigation: {
			justifyContent: "space-between",
			textTransform: "uppercase",
			marginBottom: "2rem",
		},
		footerCopyright: {
			fontSize: "lg",
			fontWeight: "semibold",
			textTransform: "uppercase",
			textAlign: "center"
		},
		inputStyle: {
			margin: "0.3rem 0;",
			padding: "0.9rem 1.1rem",
			backgroundColor: "#DDDDDD",
			fontSize: "1rem",
			_focus: {
				backgroundColor: "#A0A0A0",
				color: "#fff",
				_placeholder: {
					color: "#fff"
				}
			}
		},
		alertStyle: {
			borderRadius: "0.3rem",
			border: "solid 1px #F7B0B0",
			margin: "1rem 0",
			flexDirection: "column"
		},
		foodCartBoxText: {
			justifyContent: "space-between",
			display: "flex",
			flexDirection: "column",
			padding: "1rem"
		},
		foodCartBox: {
			bg: "gray.200", 
			borderRadius: "0.5rem",
			marginBottom: "0.8rem"
		}
	}
});