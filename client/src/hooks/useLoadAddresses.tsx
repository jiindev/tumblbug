import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loadAddressesRequest } from '../reducers/address';

export default function useLoadAddresses() {
	const dispatch = useDispatch();
	return useCallback((lastId?) => dispatch(loadAddressesRequest(lastId)), [dispatch]);
}
