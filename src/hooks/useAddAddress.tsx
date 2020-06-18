import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addAddress } from '../reducers/address';

export default function useAddAddress() {
	const dispatch = useDispatch();
	return useCallback((name, postnumber, address) => dispatch(addAddress(name, postnumber, address)), [dispatch]);
}
