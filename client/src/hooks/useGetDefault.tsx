import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { getDefaultRequest } from '../reducers/address';

export default function useGetDefault() {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(getDefaultRequest()), [dispatch]);
}
