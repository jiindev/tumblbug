import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addAddress } from '../reducers/address';

export default function useAddAddress() {
	const dispatch = useDispatch();
	return useCallback(
		(data: { postnumber: number; name: string; address: string; defaultSet: boolean }) => dispatch(addAddress(data)),
		[dispatch]
	);
}
