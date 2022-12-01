import styled from "@emotion/styled";

export const BodyContainer = styled.div(props => ({
	position: "relative",
	display: "flex",
	padding: "72px 10%",
	flexDirection: "column",
	minHeight: "520px",
	backgroundImage: props.home && "url(\"sushi-wallpaper.png\")",
	backgroundAttachment: props.home && "fixed",
	backgroundSize: props.home && "cover",
	justifyContent: props.home && "center",
	"&:before": {
		content: props.home && "\"\"",
		position: props.home && "absolute",
		top: props.home && "0px",
		right: props.home && "0px",
		bottom: props.home && "0px",
		left: props.home && "0px",
		backgroundColor: props.home && "rgba(0,0,0,0.7)"
	}
}));

