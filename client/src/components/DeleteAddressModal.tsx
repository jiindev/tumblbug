import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { Dim } from './AddAddressModal';

type DeleteModalProps = {
	onDelete: () => void;
	onCloseDeleteModal: () => void;
};

const DeleteAddressModal = memo(({ onDelete, onCloseDeleteModal }: DeleteModalProps) => {
	useEffect(() => {
		document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = `position: ""; top: ""; width: "";`;
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		};
	}, []);

	return (
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
	);
});
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

export default DeleteAddressModal;
