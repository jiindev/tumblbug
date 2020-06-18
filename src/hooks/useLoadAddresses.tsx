import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loadAddresses } from '../reducers/address';

export default function useLoadAddresses() {
	const dispatch = useDispatch();
	return useCallback((lastId) => dispatch(loadAddresses(lastId)), [dispatch]);
}
