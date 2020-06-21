import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { getDefaultRequest } from '../module/address';

export default function useGetDefault() {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(getDefaultRequest()), [dispatch]);
}
