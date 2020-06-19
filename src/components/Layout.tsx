import React, { useMemo } from 'react';
import Header from '../components/Header';

type ComponentsProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: ComponentsProps) => {
	return (
		<div>
			<Header route={window.location.pathname} />
			<div className="center">{children}</div>
		</div>
	);
};

export default Layout;
