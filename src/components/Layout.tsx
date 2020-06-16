import React from 'react';
import Header from '../components/Header';

type ComponentsProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: ComponentsProps) => (
	<div>
		<Header route={window.location.pathname} />
		{children}
	</div>
);

export default Layout;
