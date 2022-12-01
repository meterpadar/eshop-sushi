import styled from "@emotion/styled";

export const Button = styled.button`
	background-color: ${props => props.red ? "#CE2525" : "#535AA7"};
	color: #ffffff;
	text-transform: capitalize;
	text-decoration: none;
	margin: ${props => props.margin ? "14px 0" : "0"};
	padding: 10px 18px;
	border-radius: 10px;
	border: none;
	font-size: 18px;
	cursor: pointer;
	align-self: ${props => props.center ? "center" : "start"};
	&:hover {
		box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
	}
`;