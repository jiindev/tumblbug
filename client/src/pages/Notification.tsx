import React, { memo } from 'react';
import Layout from '../components/Layout';
import { Title, H3 } from './Address';

const Notification = memo(() => (
	<Layout>
		<Title>
			<H3>계정</H3>
		</Title>
	</Layout>
));

export default Notification;
