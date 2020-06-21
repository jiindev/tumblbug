import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { deleteAddressRequest, setDefaultRequest } from '../module/address';

export default function useAddressActions(id: number) {
	const dispatch = useDispatch();
	const deleteAddress = useCallback(() => dispatch(deleteAddressRequest(id)), [dispatch, id]);
	const setDefault = useCallback(() => dispatch(setDefaultRequest(id)), [dispatch, id]);

	return { deleteAddress, setDefault };
}
