import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteAddressRequest, setDefaultAddress } from '../reducers/address';

export default function useAddressActions(id: number) {
	const dispatch = useDispatch();
	const onDelete = useCallback(() => dispatch(deleteAddressRequest(id)), [dispatch, id]);
	const onSetDefault = useCallback(() => dispatch(setDefaultAddress(id)), [dispatch, id]);

	return { onDelete, onSetDefault };
}
