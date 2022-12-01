import { css } from '@emotion/react';

export const linkStyle = css`
	font-size: 18px;
	font-weight: 600;
	position: relative;
	color: #434FD8;
	text-decoration: none;
	&:hover {
		color: #434FD8;
		&:before {
			transform: scaleX(1);
		}
	};
	&:before {
		content: "";
		position: absolute;
		display: block;
		width: 100%;
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #434FD8;
		transform: scaleX(0);
		transform-origin: top left;
		transition: transform 0.3s ease;
	}
`

export const footerStyle = css`
	${linkStyle};
	text-transform: uppercase;
	margin-left: 0;
	margin-bottom: 12px;
	align-self: start;
`

export const navStyle = css`
	${linkStyle};
	text-transform: capitalize;
	margin-left: 16px;
	align-self: center;
`