import React, { memo, useEffect, useCallback, useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import useAddAddress from '../hooks/useAddAddress';
type AddAddressModalProps = {
	onCloseAddModal: () => void;
};
type CheckboxProps = {
	checked: boolean;
};

const AddAddressModal = memo(({ onCloseAddModal }: AddAddressModalProps) => {
	const [name, setName] = useState('');
	const [postnumber, setPostnumber] = useState('');
	const [address, setAddress] = useState('');
	const [defaultSet, setDefaultSet] = useState(false);
	const [nameError, setNameError] = useState('');
	const [postnumberError, setPostnumberError] = useState('');
	const [addressError, setAddressError] = useState('');
	const addAddress = useAddAddress();

	useEffect(() => {
		document.body.style.cssText = `position: fixed; top: -${window.scrollY}px; width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = `position: ""; top: ""; width: "";`;
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		};
	}, []);

	const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		setNameError('');
	}, []);
	const onChangePostnumber = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setPostnumber(e.target.value);
		setPostnumberError('');
	}, []);
	const onChangeAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
		setAddressError('');
	}, []);
	const onChangeDefaultSet = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setDefaultSet(e.target.checked);
	}, []);

	const onSubmit = useCallback(
		(e: FormEvent) => {
			e.preventDefault();
			let error = false;
			if (name.replace(/ /g, '') === '') {
				setNameError('받는 분 이름을 입력해주세요.');
				error = true;
			}
			if (postnumber.replace(/ /g, '') === '') {
				setPostnumberError('우편번호를 입력해주세요.');
				error = true;
			}
			if (!/^[0-9]+$/.test(postnumber)) {
				setPostnumberError('우편번호는 숫자만 입력 가능합니다.');
				error = true;
			}
			if (address.replace(/ /g, '') === '') {
				setAddressError('주소를 입력해주세요.');
				error = true;
			}
			if (address.length > 25) {
				setAddressError('주소는 25자를 넘을 수 없습니다.');
				error = true;
			}
			if (error) {
				return;
			}
			addAddress({
				postnumber: parseInt(postnumber, 10),
				name,
				address,
				defaultSet,
			});
			onCloseAddModal();
		},
		[addAddress, onCloseAddModal, name, postnumber, address, defaultSet]
	);

	return (
		<>
			<Dim onClick={onCloseAddModal} />
			<AddModal>
				<CloseButton onClick={onCloseAddModal} />
				<h3>배송지 추가</h3>
				<AddForm onSubmit={onSubmit}>
					<div>
						<div className="name">
							<input type="text" name="name" placeholder="받는 사람" value={name} onChange={onChangeName} />
							<span>{nameError}</span>
						</div>
						<div className="postNumber">
							<input
								type="text"
								name="postNumber"
								placeholder="우편번호"
								value={postnumber}
								onChange={onChangePostnumber}
							/>
							<span>{postnumberError}</span>
						</div>
						<div className="address">
							<input type="text" name="address" placeholder="주소" value={address} onChange={onChangeAddress} />
							<span>{addressError}</span>
						</div>
					</div>
					<Checkbox checked={defaultSet}>
						<label htmlFor="defaultAddress">
							<input type="checkbox" id="defaultAddress" name="defaultAddress" onChange={onChangeDefaultSet} />
							<span />
							기본 배송지로 등록
						</label>
					</Checkbox>

					<button type="submit">등록 완료</button>
				</AddForm>
			</AddModal>
		</>
	);
});
export const Dim = styled.div`
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
	position: fixed;
	left: 0;
	top: 0;
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
		position: fixed;
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
		width: 100%;
		height: 17px;
	}
	& .address,
	.address input {
		width: 100%;
	}
	& .address span {
		margin-bottom: 10px;
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

const Checkbox = styled.div<CheckboxProps>`
	& input[type='checkbox'] {
		display: none;
	}
	& label {
		font-size: 14px;
		color: #3d3d3d;
		cursor: pointer;
	}
	& span {
		content: '';
		vertical-align: middle;
		width: 20px;
		height: 20px;
		margin: 0;
		margin-right: 5px;
		display: inline-block;
		border-radius: 4px;
		border: solid 1px #979797;
		position: relative;
		&:after {
			position: absolute;
			border-radius: 3px;
			width: 16px;
			height: 16px;
			top: 2px;
			left: 2px;
			display: inline-block;
			background-color: ${(props) => (props.checked ? '#ed635e' : 'white')};
			content: '';
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
