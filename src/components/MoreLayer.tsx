import React, { memo } from 'react';
import styled from 'styled-components';
import { Dim } from './AddAddressModal';

type MoreLayerProps = {
	onCloseMoreLayer: () => void;
	onClickDefaultButton: () => void;
	onClickDeleteButton: () => void;
};

const MoreLayer = memo(({ onCloseMoreLayer, onClickDefaultButton, onClickDeleteButton }: MoreLayerProps) => {
	return (
		<>
			<TransparentDim onClick={onCloseMoreLayer} />
			<Layer>
				<ul>
					<li onClick={onClickDefaultButton}>기본 배송지 설정</li>
					<li onClick={onClickDeleteButton}>삭제</li>
				</ul>
			</Layer>
		</>
	);
});

const TransparentDim = styled(Dim)`
	background: transparent;
`;

const Layer = styled.div`
	width: 166px;
	border-radius: 4px;
	box-shadow: 2px 2px 3px 0 rgba(122, 122, 122, 0.5);
	border: solid 1px #cdcdcd;
	background-color: white;
	position: absolute;
	top: 61px;
	right: 20px;
	z-index: 40;
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

export default MoreLayer;
