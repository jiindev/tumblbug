import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { resetToast } from '../module/address';

export default function useResetToast() {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(resetToast()), [dispatch]);
}
