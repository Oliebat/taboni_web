import styled from 'styled-components'

const Button = styled.button`
	width: ${({ $customWidth }) => $customWidth || '170px'};
	pointer-events: auto;
	cursor: pointer;
	background: #e7e7e7;
	border: none;
	padding: 1rem 1.5rem;
	margin: 0;
	font-family: inherit;
	font-size: inherit;
	position: relative;
	display: inline-block;
	text-transform: uppercase;
	letter-spacing: 0.05rem;
	font-weight: 700;
	font-size: 0.75rem;
	border-radius: 0.5rem;
	overflow: hidden;
	color: #fff;
	transition: color 0.8s cubic-bezier(0.3, 1, 0.8, 1);

	@media only screen and (max-width: 1350px) {
		width: 150px;
		padding: 0.8rem 1.3rem;
		font-size: 0.65rem;
	}

	@media only screen and (max-width: 768px) {
		letter-spacing: 0;
		width: 125px;
		font-size: 0.58rem;
		padding: 0.7rem 1.2rem;
	}
	
	@media only screen and (min-width: 1800px) {
		width: ${({ $customWidth }) => $customWidth || '220px'};
		padding: 1.2rem 1.8rem;
		font-size: 0.85rem;
		letter-spacing: 0.06rem;
		border-radius: 0.6rem;
	}
	

	@media only screen and (min-width: 2560px) {
		width: ${({ $customWidth }) => $customWidth || '260px'};
		padding: 1.4rem 2rem;
		font-size: 1rem;
		letter-spacing: 0.07rem;
		border-radius: 0.7rem;
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	&::before {
		background: #a93f55;
		width: 120%;
		left: -10%;
		transform: skew(30deg);
		transition: transform 0.8s cubic-bezier(0.3, 1, 0.8, 1);
	}

	&:hover::before {
		transform: translate3d(100%, 0, 0);
	}

	&:hover {
		color: #000;
	}

	span {
		position: relative;
	}
`

export default Button