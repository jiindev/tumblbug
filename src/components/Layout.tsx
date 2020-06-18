import React from 'react';
import Header from '../components/Header';

type ComponentsProps = {
	children: React.ReactNode;
	tt?: string;
};

const Layout = ({ children, tt }: ComponentsProps) => {
	return (
		<div>
			<Header route={window.location.pathname} />
			<div className="center">{children}</div>
		</div>
	);
};

export default Layout;
