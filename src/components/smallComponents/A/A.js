import styled from '@emotion/styled';

export const A = styled.a(props => ({
	color: props.facebook ? '#4E5BAE' : props.twitter ? '#81C2D8' : props.instagram ? '#DD5484' : props.youtube ? '#D32626' : 'initial',
	'& > svg': {
		height: '16px',
		width: '16px',
		padding: '8px',
		borderRadius: '50%',
		'&:hover': {
		color: '#fff',
		backgroundColor: props.facebook ? '#4E5BAE' : props.twitter ? '#81C2D8' : props.instagram ? '#DD5484' : props.youtube ? '#D32626' : 'initial'
	}
	}
}));