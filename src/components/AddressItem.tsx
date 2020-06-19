import React, { memo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Address } from '../reducers/address';
import useAddressActions from '../hooks/useAddressActions';
import DeleteAddressModal from './DeleteAddressModal';
import MoreLayer from './MoreLayer';

type AddressItemProps = {
	address: Address;
	defaultSet?: boolean;
};

const AddressItem = memo(({ address, defaultSet }: AddressItemProps) => {
	const [showMoreLayer, setShowMoreLayer] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const { onDelete, onSetDefault } = useAddressActions(address.id);
	const onClickMoreButton = useCallback(() => {
		setShowMoreLayer(true);
	}, []);
	const onClickDefaultButton = useCallback(() => {
		onSetDefault();
		setShowMoreLayer(false);
	}, [onSetDefault]);
	const onShowDeleteModal = useCallback(() => {
		setShowDeleteModal(true);
	}, []);
	const onClickDeleteButton = useCallback(() => {
		setShowMoreLayer(false);
		onShowDeleteModal();
	}, [onShowDeleteModal]);
	const onCloseMoreLayer = useCallback(() => {
		setShowMoreLayer(false);
	}, []);
	const onCloseDeleteModal = useCallback(() => {
		setShowDeleteModal(false);
	}, []);

	return (
		<>
			{showDeleteModal && (
				<>
					<DeleteAddressModal onDelete={onDelete} onCloseDeleteModal={onCloseDeleteModal} />
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
				{showMoreLayer && (
					<MoreLayer
						onCloseMoreLayer={onCloseMoreLayer}
						onClickDefaultButton={onClickDefaultButton}
						onClickDeleteButton={onClickDeleteButton}
					/>
				)}
			</AddressLi>
		</>
	);
});

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

export default AddressItem;
