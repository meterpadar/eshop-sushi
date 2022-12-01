import styled from '@emotion/styled';

export const H1 = styled.h1(props => ({
	fontWeight: props.footer || props.menuTitle || props.checkout ? '500' : 'initial',
	textTransform: props.footer || props.bodyTitle ? 'uppercase' : props.menuTitle ? 'capitalize' : 'initial',
	fontSize: props.footer || props.menuTitle ? '32px' : props.bodyTitle || props.checkout ? '42px' : '16px',
	marginTop: props.footer ? '46px' : props.bodyTitle ? '0' : '22px',
	margin: props.noMargin && '0',
	borderBottom: props.bodyTitle ? 'solid 2px' : props.menuTitle ? 'solid 1px' : 'initial'
}));