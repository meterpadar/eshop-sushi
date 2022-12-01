import styled from "@emotion/styled";

export const FoodBoxContainer = styled.div(props => ({
	display: "flex",
	flexDirection:  props.column ? "column" : props.row ? "row" : "initial",
	backgroundColor: "#E2E2E2",
	borderRadius: "15px",
	overflow: "hidden"
}));