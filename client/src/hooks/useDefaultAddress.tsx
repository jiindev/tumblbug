import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export default function useDefaultAddress() {
	const { defaultId } = useSelector((state: RootState) => state.address);
	return defaultId;
}
