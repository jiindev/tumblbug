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
			{false && (
				<ToastUI>
					<div>기본 배송지가 변경되었습니다.</div>
				</ToastUI>
			)}
			{false && (
				<Dim>
					{false && (
						<CheckModal>
							<p>정말 삭제하시겠습니까?</p>
							<div className="buttons">
								<button>확인</button>
								<button>취소</button>
							</div>
						</CheckModal>
					)}
					{true && (
						<AddModal>
							<CloseButton />
							<h3>배송지 추가</h3>
							<AddForm action="">
								<div>
									<div className="name">
										<input type="text" name="name" placeholder="받는 사람" />
										<span>test</span>
									</div>
									<div className="postNumber">
										<input type="text" name="postNumber" placeholder="우편번호" />
										<span></span>
									</div>
									<div className="address">
										<input type="text" name="address" placeholder="주소" />
										<span>우편번호를 입력해주세요.</span>
									</div>
								</div>
								<input type="checkbox" name="defaultAddress" id="" />
								<label htmlFor="defaultAddress">기본 배송지로 등록</label>
								<button>등록 완료</button>
							</AddForm>
						</AddModal>
					)}
				</Dim>
			)}
			<Contents>
				<AddressDiv>
					{false && (
						<NoAddress>
							<span />
							<p>등록된 배송지가 없습니다.</p>
						</NoAddress>
					)}
					{true && (
						<>
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
									<div className="postNumber">[123456]</div>
									<div className="address">서울시 강남구 강남대로 345, 12층 1201호</div>
								</AddressLi>
							</ul>
							<button>더보기</button>
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

const Dim = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(118, 118, 118, 0.8);
	z-index: 30;
`;
const AddModal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
	position: absolute;
	overflow: hidden;
	box-sizing: border-box;
	padding: 25px;
	& h3 {
		font-size: 22px;
		font-weight: bold;
		color: #3d3d3d;
	}
	@media only screen and (min-width: 768px) {
		border-radius: 6px;
		box-shadow: 1px 3px 5px 0 rgba(47, 46, 46, 0.5);
		border: solid 1px #979797;
		margin-left: -255px;
		margin-top: -206px;
		left: 50%;
		top: 50%;
		width: 510px;
		height: 412px;
	}
`;
const AddForm = styled.form`
	margin-top: 45px;
	& > div {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100%;
	}
	& input[type='text'] {
		border-radius: 4px;
		border: solid 1px #979797;
		padding: 12px 14px;
		box-sizing: border-box;
		font-size: 14px;
		margin-bottom: 10px;
		width: 228px;
		display: block;
		&::placeholder {
			color: #adadad;
		}
	}
	& span {
		font-size: 14px;
		color: #ed635e;
		display: block;
		margin-bottom: 23px;
		width: 160px;
		height: 17px;
	}
	& .address,
	.address input {
		width: 100%;
	}
	& .address span {
		margin-bottom: 10px;
	}
	& label {
		font-size: 14px;
		color: #3d3d3d;
		margin-left: 5px;
	}
	& button {
		border-radius: 4px;
		background-color: #ed635e;
		width: 100%;
		padding: 15px 0;
		font-size: 16px;
		font-weight: 600;
		color: white;
		border: none;
		cursor: white;
		margin-top: 60px;
	}
	@media only screen and (min-width: 768px) {
		& > div {
			flex-direction: row;
		}
		& input[type='text'] {
			display: inline-block;
		}
		& .name input[type='text'] {
			width: 200px;
			margin-right: 28px;
		}
	}
`;
const CloseButton = styled.span`
	width: 20px;
	height: 20px;
	position: absolute;
	display: block;
	top: 20px;
	right: 20px;
	cursor: pointer;
	&:before,
	&:after {
		content: '';
		display: block;
		background-color: #3d3d3d;
		width: 3px;
		height: 20px;
		position: absolute;
		top: 0;
		left: 0;
		margin-left: 10px;
	}
	&:before {
		transform: rotate(45deg);
	}
	&:after {
		transform: rotate(135deg);
	}
`;
const CheckModal = styled.div`
	border-radius: 6px;
	box-shadow: 1px 3px 5px 0 rgba(47, 46, 46, 0.5);
	border: solid 1px #979797;
	background-color: white;
	width: 312px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -156px;
	margin-top: -90px;
	text-align: center;
	overflow: hidden;
	& p {
		font-size: 18px;
		font-weight: 600;
		color: #2f2f2f;
		padding: 47px 0;
	}
	& div.buttons {
		border-top: 1px solid #aaaaaa;
	}
	& button {
		width: 50%;
		border: none;
		font-size: 18px;
		font-weight: 600;
		padding: 25px 0;
		background-color: white;
		color: #363636;
		&:first-child {
			border-right: 1px solid #aaaaaa;
			color: #ed635e;
		}
	}
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
		& span {
			border-radius: 5px;
			background-color: #ff5b5c;
			font-size: 14px;
			font-weight: 600;
			color: white;
			padding: 3px 10px;
			display: inline-block;
			margin-left: 5px;
		}
	}
	& .address {
		font-size: 14px;
		font-weight: normal;
		color: #989898;
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
	margin: 30px 0;
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
	line-height: 1.1;
`;

export default Address;
