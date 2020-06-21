import React, { memo } from 'react';
import Layout from '../components/Layout';
import { Title, H3 } from './Address';

const Paymethod = memo(() => (
	<Layout>
		<Title>
			<H3>결제수단</H3>
		</Title>
	</Layout>
));

export default Paymethod;
