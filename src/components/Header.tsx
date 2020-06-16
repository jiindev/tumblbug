import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type ComponentsProps = {
	route: string;
};

type TabPropsType = {
	activeTab: boolean;
};

const Header = ({ route }: ComponentsProps) => (
	<header>
		<H1>
			<Link to="/">설정</Link>
		</H1>
		<TabList>
			<ul>
				<Link to="/profile">
					<Tab activeTab={route === '/profile'}>프로필</Tab>
				</Link>
				<Link to="/account">
					<Tab activeTab={route === '/account'}>계정</Tab>
				</Link>
				<Link to="/paymethod">
					<Tab activeTab={route === '/paymethod'}>결제수단</Tab>
				</Link>
				<Link to="/address">
					<Tab activeTab={route === '/address'}>배송지</Tab>
				</Link>
				<Link to="/notification">
					<Tab activeTab={route === '/notification'}>알림</Tab>
				</Link>
			</ul>
		</TabList>
	</header>
);

const H1 = styled.h1`
	font-size: 36px;
	font-weight: bold;
	color: #000;
	padding: 50px 0 60px 42px;
`;
const TabList = styled.nav`
	& ul {
		display: flex;
	}
	padding-left: 42px;
	border-bottom: solid 1px #cecece;
`;

const Tab = styled.li<TabPropsType>`
	font-family: AppleSDGothicNeo;
	font-size: 20px;
	color: #999;
	margin: 0 35px 0 0;
	padding-bottom: 10px;
	cursor: pointer;
	transition: all 0.2s ease;
	position: relative;
	&:hover {
		color: #000;
		font-weight: 600;
	}
	${(props) =>
		props.activeTab &&
		`
		font-weight : bold !important;
		color : #3e3e3e !important;
		&:after {
			content: '';
			height: 4px;
			width: 100%;
			padding: 0 5px;
			background-color: black;
			display: inline-block;
			position: absolute;
			bottom: 0;
			left: -5px;
		}
		`};
`;

export default Header;
