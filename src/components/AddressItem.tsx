import React, { useState } from 'react';
import styled from 'styled-components';
import { Address } from '../reducers/address';
import useAddressActions from '../hooks/useAddressActions';
import { Dim } from '../pages/Address';

type AddressItemProps = {
	address: Address;
	defaultSet?: boolean;
};

const AddressItem = ({ address, defaultSet }: AddressItemProps) => {
	const [showMoreModal, setShowMoreModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { onDelete, onSetDefault } = useAddressActions(address.id);
	const onClickMoreButton = () => {
		setShowMoreModal(true);
	};
	const onClickDefaultButton = () => {
		onSetDefault();
		setShowMoreModal(false);
	};
	const onClickDeleteButton = () => {
		setShowMoreModal(false);
		onShowDeleteModal();
	};
	const onShowDeleteModal = () => {
		setShowDeleteModal(true);
	};
	const onCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			{showDeleteModal && (
				<>
					<Dim onClick={onCloseDeleteModal} />
					<CheckModal>
						<p>정말 삭제하시겠습니까?</p>
						<div className="buttons">
							<button onClick={onDelete}>확인</button>
							<button onClick={onCloseDeleteModal}>취소</button>
						</div>
					</CheckModal>
				</>
			)}
			<AddressLi>
				<div className="postNumber">
					{address.postnumber}
					{defaultSet && <span>기본</span>}
				</div>
				<div className="address">{address.address}</div>
				<MoreButton onClick={onClickMoreButton}>
					<span />
					<span />
					<span />
				</MoreButton>
				{showMoreModal && (
					<MoreModal>
						<ul>
							<li onClick={onClickDefaultButton}>기본 배송지 설정</li>
							<li onClick={onClickDeleteButton}>삭제</li>
						</ul>
					</MoreModal>
				)}
			</AddressLi>
		</>
	);
};

const AddressLi = styled.li`
	border-bottom: 1px solid #979797;
	position: relative;
	padding: 23px 20px 20px 20px;
	box-sizing: border-box;
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

const CheckModal = styled.div`
	border-radius: 6px;
	box-shadow: 1px 3px 5px 0 rgba(47, 46, 46, 0.5);
	border: solid 1px #979797;
	background-color: white;
	width: 312px;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-left: -156px;
	margin-top: -90px;
	text-align: center;
	overflow: hidden;
	z-index: 30;
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

export default AddressItem;
