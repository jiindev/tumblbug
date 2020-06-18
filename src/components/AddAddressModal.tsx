import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import useAddAddress from '../hooks/useAddAddress';

const AddAddressModal = () => {
	const [name, setName] = useState('');
	const [postnumber, setPostnumber] = useState('');
	const [address, setAddress] = useState('');
	const [defaultSet, setDefaultSet] = useState(false);
	const addAddress = useAddAddress();

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onChangePostnumber = (e: ChangeEvent<HTMLInputElement>) => {
		setPostnumber(e.target.value);
	};
	const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};
	const onChangeDefaultSet = (e: ChangeEvent<HTMLInputElement>) => {
		setDefaultSet(e.target.checked);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		addAddress({
			postnumber: parseInt(postnumber, 10),
			name,
			address,
			defaultSet,
		});
	};
	return (
		<AddModal>
			<CloseButton />
			<h3>배송지 추가</h3>
			<AddForm onSubmit={onSubmit}>
				<div>
					<div className="name">
						<input type="text" name="name" placeholder="받는 사람" value={name} onChange={onChangeName} />
						<span>test</span>
					</div>
					<div className="postNumber">
						<input
							type="text"
							name="postNumber"
							placeholder="우편번호"
							value={postnumber}
							onChange={onChangePostnumber}
						/>
						<span></span>
					</div>
					<div className="address">
						<input type="text" name="address" placeholder="주소" value={address} onChange={onChangeAddress} />
						<span>우편번호를 입력해주세요.</span>
					</div>
				</div>
				<input type="checkbox" name="defaultAddress" onChange={onChangeDefaultSet} />
				<label htmlFor="defaultAddress">기본 배송지로 등록</label>
				<button type="submit">등록 완료</button>
			</AddForm>
		</AddModal>
	);
};

const AddModal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: white;
	position: absolute;
	overflow: hidden;
	box-sizing: border-box;
	padding: 25px;
	z-index: 50;
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

export default AddAddressModal;
