import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Index from './pages/Index';
import Account from './pages/Account';
import AddressPage from './pages/Address';
import Notification from './pages/Notification';
import Paymethod from './pages/Paymethod';
import Profile from './pages/Profile';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact={true} path="/" component={Index} />
				<Route path="/account" component={Account} />
				<Route path="/address" component={AddressPage} />
				<Route path="/notification" component={Notification} />
				<Route path="/paymethod" component={Paymethod} />
				<Route path="/profile" component={Profile} />
				{/* 존재하지 않는 페이지의 경우 리다이렉션 */}
				<Route component={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
