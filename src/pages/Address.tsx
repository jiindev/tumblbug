import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAddress from '../hooks/useAddress';
import useDefaultAddress from '../hooks/useDefaultAddress';
import useLoadAddresses from '../hooks/useLoadAddresses';
import AddressItem from '../components/AddressItem';
import AddAddressModal from '../components/AddAddressModal';

const AddressPage = () => {
	const addresses = useAddress();
	const defaultId = useDefaultAddress();
	const [showAddModal, setShowAddModal] = useState(false);

	const loadAddresses = useLoadAddresses();

	const onClickAdd = () => {
		setShowAddModal(true);
	};

	const onClickMore = () => {
		loadAddresses(addresses[addresses.length - 1].id);
	};

	return (
		<Layout>
			<Title>
				<H3>등록된 배송지</H3>
				<span onClick={onClickAdd}>추가</span>
			</Title>
			{false && (
				<ToastUI>
					<div>기본 배송지가 변경되었습니다.</div>
				</ToastUI>
			)}
			{showAddModal && (
				<Dim>
					<AddAddressModal />
				</Dim>
			)}
			<Contents>
				<AddressDiv>
					{addresses.length === 0 ? (
						<NoAddress>
							<span />
							<p>등록된 배송지가 없습니다.</p>
						</NoAddress>
					) : (
						<>
							<ul>
								{addresses.map((v) => {
									return <AddressItem address={v} defaultSet={defaultId === v.id} key={v.id} />;
								})}
							</ul>
							<button onClick={onClickMore}>더보기</button>
						</>
					)}
				</AddressDiv>
				<InfoDiv>
					<InfoH3>배송지를 삭제하면 예약된 후원의 배송지 정보도 삭제되나요?</InfoH3>
					<p>
						현재 후원하신 프로젝트에 등록된 배송지가 삭제되거나 변경되지 않습니다. 이를 변경하시려면 후원현황에서
						변경해주세요. <Link to="#">내 후원현황 바로가기</Link>
					</p>
				</InfoDiv>
			</Contents>
		</Layout>
	);
};

export const Dim = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(118, 118, 118, 0.8);
	z-index: 30;
`;

const ToastUI = styled.div`
	position: fixed;
	top: 50%;
	margin-top: -25px;
	z-index: 20;
	width: 100%;
	box-sizing: border-box;
	left: 0;
	padding: 0 15px;
	& > div {
		padding: 15px 30px;
		border-radius: 6px;
		background-color: rgba(107, 107, 107, 0.7);
		font-size: 22px;
		font-weight: 600;
		color: white;
		max-width: 400px;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		text-align: center;
	}
	@media only screen and (min-width: 1024px) {
		flex-direction: row;
	}
`;
const Contents = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	flex-direction: column;
	@media only screen and (min-width: 1024px) {
		flex-direction: row;
	}
`;

const Title = styled.div`
	padding: 55px 0 20px 0;
	display: flex;
	justify-content: space-between;
	& span {
		font-size: 16px;
		color: #4ea3f8;
		text-decoration: underline;
	}
`;

const H3 = styled.h3`
	font-size: 20px;
	font-weight: 600;
	color: #3e3e3e;
`;
const AddressDiv = styled.div`
	border-top: 1px solid #979797;
	border-bottom: 1px solid #979797;
	width: 100vw;
	margin-bottom: 30px;
	margin-left: -20px;
	box-sizing: border-box;
	& > button {
		width: 100%;
		background-color: transparent;
		border: none;
		padding: 15px 0;
		cursor: pointer;
		outline: none;
		font-size: 16px;
		color: #252525;
	}
	@media only screen and (min-width: 768px) {
		width: 100%;
		margin-left: 0;
		border: 1px solid #979797;
		border-radius: 8px;
	}
	@media only screen and (min-width: 1024px) {
		max-width: 660px;
	}
`;

const NoAddress = styled.div`
	width: 100%;
	height: 320px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& span {
		width: 84px;
		height: 84px;
		border: 5px solid #d3d3d3;
		border-radius: 84px;
		margin-bottom: 24px;
		&:after {
			content: '!';
			font-size: 50px;
			color: #d3d3d3;
			font-weight: bold;
			display: inline-block;
			margin: 0 auto;
			width: 84px;
			height: 84px;
			text-align: center;
			line-height: 84px;
		}
	}
	& p {
		font-size: 22px;
		font-weight: 600;
		color: #d3d3d3;
	}
`;

const InfoDiv = styled(AddressDiv)`
	margin: 0 0 30px 0;
	padding: 20px;
	width: 100%;
	border: 1px solid #979797;
	border-radius: 8px;
	& p {
		line-height: 1.54;
		color: #989898;
		font-size: 13px;
		& a {
			color: #4ea3f8;
			text-decoration: underline;
		}
	}
	@media only screen and (min-width: 1024px) {
		max-width: 250px;
		margin: 0 0 0 30px;
	}
`;
const InfoH3 = styled(H3)`
	font-size: 17px;
	padding: 0 0 14px 0;
	line-height: 1.1;
`;

export default AddressPage;
