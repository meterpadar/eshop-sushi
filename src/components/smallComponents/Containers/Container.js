import styled from "@emotion/styled";

export const Container = styled.div(props => ({
	display: "flex",
	position: props.checkout ? "sticky" : "relative",
	top: props.checkout ? "100px" : "initial",
	height: props.checkout ? "fit-content" : "initial",
	flexWrap: props.flexWrap && "wrap",
	flex: props.flex1 ? "1" : props.flex2 ? "2" : "initial",
	alignItems:  props.center ? "center" : props.alignEnd ? "end" : "initial",
	flexDirection:  props.column ? "column" : props.row ? "row" : "initial",
	justifyContent: props.spaceBetween ? "space-between" : props.spaceEvenly ? "space-evenly" : "initial",
	padding: props.foodBoxPadding ? "8px 16px" : props.checkout ? "8px" : "initial",
	overflow: props.overflowHidden && "hidden",
	backgroundColor: props.grey && "#E2E2E2",
	gap: props.gap && "15px 30px",
	borderBottom: props.borderBottom && "solid 1px",
	margin: props.checkoutMargin ? "8px 0" : props.emptyCheckout ? "80px 0" : "initial",
	marginLeft: props.marginLeft && "auto"
}));
