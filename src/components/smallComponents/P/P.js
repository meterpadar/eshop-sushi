import styled from "@emotion/styled";

export const P = styled.p(props => ({
	margin: props.noMargin ? "0" : props.sideMargin ? "0 16px" : "8px 0",
	fontWeight: props.bold ? "600" : props.light ? "300" : "initial",
	textTransform: props.uppercase ? "uppercase" : props.capitalize ? "capitalize" : "initial",
	color: props.white ? "#ffffff" : props.grey ? "#6C6C6C" : "initial",
	fontSize: props.mediumFont ? "32px" : props.bigFont ? "48px" : props.smallFont ? "14px" : "16px",
	textAlign: props.center ? "center" : "initial",
	fontStyle: props.italic ? "italic" : "initial",
	flex: props.flex1 ? "1" : props.flex2 ? "2" : "initial"
}));