import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export default function useAddress() {
	const { addresses } = useSelector((state: RootState) => state.address);
	return addresses;
}
