import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

export default function useToastSentence() {
	const { toastSentence } = useSelector((state: RootState) => state.address);
	return toastSentence;
}
