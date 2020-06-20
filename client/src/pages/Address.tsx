import React, { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useAddress from '../hooks/useAddress';
import useToastSentence from '../hooks/useToastSentence';
import useDefaultAddress from '../hooks/useDefaultAddress';
import useLoadAddresses from '../hooks/useLoadAddresses';
import useHasMoreAddresses from '../hooks/useHasMoreAddresses';
import AddressItem from '../components/AddressItem';
import AddAddressModal from '../components/AddAddressModal';
import ToastMessage from '../components/ToastMessage';
import useResetToast from '../hooks/useResetToast';

const AddressPage = memo(() => {
	const addresses = useAddress();
	const hasMoreAddresses = useHasMoreAddresses();
	const toastSentence = useToastSentence();
	const defaultId = useDefaultAddress();
	const [showAddModal, setShowAddModal] = useState(false);
	const defaultIndexInArray = useMemo(() => addresses.findIndex((v) => v.id === defaultId), [addresses, defaultId]);
	const resetToast = useResetToast();
	const loadAddresses = useLoadAddresses();

	useEffect(() => {
		loadAddresses();
		resetToast();
	}, []);

	useEffect(() => {
		if (toastSentence !== '') {
			setTimeout(() => {
				resetToast();
			}, 3000);
		}
	}, [toastSentence]);

	const onClickAdd = useCallback(() => {
		setShowAddModal(true);
	}, []);

	const onClickMore = useCallback(() => {
		loadAddresses(addresses[0] && addresses[addresses.length - 1].id);
	}, [loadAddresses, addresses]);

	const onCloseAddModal = useCallback(() => {
		setShowAddModal(false);
	}, []);

	return (
		<Layout>
			<Title>
				<H3>등록된 배송지</H3>
				<span onClick={onClickAdd}>추가</span>
			</Title>
			{toastSentence !== '' && <ToastMessage toastSentence={toastSentence} />}
			{showAddModal && (
				<>
					<AddAddressModal onCloseAddModal={onCloseAddModal} />
				</>
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
								{defaultIndexInArray !== -1 && (
									<AddressItem address={addresses[defaultIndexInArray]} defaultSet={true} key={defaultId} />
								)}
								{addresses
									.filter((v) => {
										if (defaultIndexInArray !== -1) {
											return v.id !== defaultId;
										} else return true;
									})
									.map((v) => {
										return <AddressItem address={v} defaultSet={false} key={v.id} />;
									})}
							</ul>
							{hasMoreAddresses && <MoreAddressButton onClick={onClickMore}>더보기</MoreAddressButton>}
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
});

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
		cursor: pointer;
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
const MoreAddressButton = styled.button`
	width: 100%;
	background-color: transparent;
	border: none;
	padding: 15px 0;
	cursor: pointer;
	outline: none;
	font-size: 16px;
	color: #252525;
	border-top: 1px solid #979797;
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
