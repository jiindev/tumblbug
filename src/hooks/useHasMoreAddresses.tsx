import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export default function useHasMoreAddresses() {
	const { hasMoreAddresses } = useSelector((state: RootState) => state.address);
	return hasMoreAddresses;
}
