import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteAddress, setDefaultAddress } from '../reducers/address';

export default function useAddressActions(id: number) {
	const dispatch = useDispatch();
	const onDelete = useCallback(() => dispatch(deleteAddress(id)), [dispatch]);
	const onSetDefault = useCallback(() => dispatch(setDefaultAddress(id)), [dispatch]);

	return { onDelete, onSetDefault };
}