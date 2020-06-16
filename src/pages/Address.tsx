import React, { useState } from 'react';
import Layout from '../components/Layout';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Address = () => {
	const [showMoreModal, setShowMoreModal] = useState(false);
	const onClickMoreButton = () => {
		setShowMoreModal(true);
	};
	return (
		<Layout>
			<H3>등록된 배송지</H3>
			<Contents>
				<AddressDiv>
					<ul>
						<AddressLi>
							<div className="postNumber">
								[123456]
								<span>기본</span>
							</div>
							<div className="address">서울시 강남구 강남대로 345, 12층 1201호</div>
							<MoreButton onClick={onClickMoreButton}>
								<span />
								<span />
								<span />
							</MoreButton>
							{showMoreModal && (
								<MoreModal>
									<ul>
										<li>기본 배송지 설정</li>
										<li>삭제</li>
									</ul>
								</MoreModal>
							)}
						</AddressLi>
						<AddressLi>
							<div className="postNumber">
								[123456]
								<span>기본</span>
							</div>
							<div className="address">서울시 강남구 강남대로 345, 12층 1201호</div>
						</AddressLi>
					</ul>
					<button>더보기</button>
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

const Contents = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	flex-direction: column;
	@media only screen and (min-width: 1024px) {
		flex-direction: row;
	}
`;

const H3 = styled.h3`
	font-size: 20px;
	font-weight: 600;
	color: #3e3e3e;
	padding: 55px 0 20px 0;
`;
const AddressDiv = styled.div`
	border: 1px solid #979797;
	border-radius: 8px;
	width: 100%;
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
	@media only screen and (min-width: 1024px) {
		max-width: 660px;
	}
`;
const AddressLi = styled.li`
	border-bottom: 1px solid #979797;
	position: relative;
	padding: 23px 20px 20px 20px;
	& .postNumber {
		color: #3e3e3e;
		font-size: 16px;
		font-weight: 600;
		margin: 3px 0 6px 0;
	}
	& .address {
		font-size: 14px;
		font-weight: normal;
		color: #989898;
	}
`;
const MoreButton = styled.button`
	position: absolute;
	top: 30px;
	right: 20px;
	width: 25px;
	height: 25px;
	border: solid 1px #e1e1e1;
	border-radius: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	padding: 0;
	background-color: white;
	outline: none;
	& span {
		width: 4px;
		height: 4px;
		background-color: #5e5e5e;
		display: block;
		border-radius: 4px;
		margin: 0 1px;
	}
`;
const MoreModal = styled.div`
	width: 166px;
	border-radius: 4px;
	box-shadow: 2px 2px 3px 0 rgba(122, 122, 122, 0.5);
	border: solid 1px #cdcdcd;
	background-color: white;
	position: absolute;
	top: 61px;
	right: 20px;
	z-index: 10;
	& ul {
		margin: 10px 0;
	}
	& li {
		padding: 10px 20px;
		color: #3e3e3e;
		font-size: 16px;
		cursor: pointer;
		&:hover {
			background-color: #f4f4f4;
		}
	}
`;

const InfoDiv = styled(AddressDiv)`
	margin: 30px 0 0 0;
	padding: 20px;
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
`;

export default Address;
