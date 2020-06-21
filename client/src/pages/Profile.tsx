import React, { memo } from 'react';
import Layout from '../components/Layout';
import { Title, H3 } from './Address';

const Profile = memo(() => (
	<Layout>
		<Title>
			<H3>프로필</H3>
		</Title>
	</Layout>
));

export default Profile;
