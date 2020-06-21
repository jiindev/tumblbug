import { useSelector } from 'react-redux';
import { RootState } from '../module';

export default function useAddress() {
	const { addresses } = useSelector((state: RootState) => state.address);
	return addresses;
}
