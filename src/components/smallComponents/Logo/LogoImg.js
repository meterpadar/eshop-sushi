import styled from '@emotion/styled';

export const LogoImg = styled.img(props => ({
	width: props.home ? '200px' : props.nav ? '50px' : 'initial'
}))
	
