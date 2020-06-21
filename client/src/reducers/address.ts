import { addresses } from '../data/addresses.json';
const addressesData = addresses;
export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST' as const;
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS' as const;
export const GET_DEFAULT_REQUEST = 'GET_DEFAULT_REQUEST' as const;
export const GET_DEFAULT_SUCCESS = 'GET_DEFAULT_SUCCESS' as const;
export const SET_DEFAULT_REQUEST = 'SET_DEFAULT_REQUEST' as const;
export const SET_DEFAULT_SUCCESS = 'SET_DEFAULT_SUCCESS' as const;
export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST' as const;
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS' as const;
export const LOAD_ADDRESSES_REQUEST = 'LOAD_ADDRESSES_REQUEST' as const;
export const LOAD_ADDRESSES_SUCCESS = 'LOAD_ADDRESSES_SUCCESS' as const;
export const RESET_TOAST = 'RESET_TOAST' as const;

export const addAddressRequest = (data: AddedAddress) => ({
	type: ADD_ADDRESS_REQUEST,
	payload: data,
});
export const addAddressSuccess = (data: Address) => ({
	type: ADD_ADDRESS_SUCCESS,
	payload: data,
});
export const getDefaultRequest = () => ({
	type: GET_DEFAULT_REQUEST,
});
export const getDefaultSuccess = (id: number) => ({
	type: GET_DEFAULT_SUCCESS,
	payload: id,
});
export const setDefaultRequest = (id: number) => ({
	type: SET_DEFAULT_REQUEST,
	payload: id,
});
export const setDefaultSuccess = (id: number) => ({
	type: SET_DEFAULT_SUCCESS,
	payload: id,
});
export const deleteAddressRequest = (id: number) => ({
	type: DELETE_ADDRESS_REQUEST,
	payload: id,
});
export const deleteAddressSuccess = (id: number) => ({
	type: DELETE_ADDRESS_SUCCESS,
	payload: id,
});
export const loadAddressesRequest = (lastId?: number) => ({
	type: LOAD_ADDRESSES_REQUEST,
	payload: lastId,
});
export const loadAddressesSuccess = (data: { addresses: Address[]; hasMoreAddresses: boolean }) => ({
	type: LOAD_ADDRESSES_SUCCESS,
	payload: data,
});
export const resetToast = () => ({
	type: RESET_TOAST,
});

type AddressAction =
	| ReturnType<typeof addAddressRequest>
	| ReturnType<typeof addAddressSuccess>
	| ReturnType<typeof getDefaultRequest>
	| ReturnType<typeof getDefaultSuccess>
	| ReturnType<typeof setDefaultRequest>
	| ReturnType<typeof setDefaultSuccess>
	| ReturnType<typeof deleteAddressRequest>
	| ReturnType<typeof deleteAddressSuccess>
	| ReturnType<typeof loadAddressesRequest>
	| ReturnType<typeof loadAddressesSuccess>
	| ReturnType<typeof resetToast>;

export type AddedAddress = {
	postnumber: number;
	name: string;
	address: string;
	defaultSet: boolean;
};

export type Address = {
	id: number;
	postnumber: number;
	name: string;
	address: string;
};

type AddressesState = {
	addresses: Address[];
	hasMoreAddresses: boolean;
	defaultId: number;
	toastSentence: string;
};

const initialState: AddressesState = {
	addresses: [],
	hasMoreAddresses: true,
	defaultId: 0,
	toastSentence: '',
};

function address(state: AddressesState = initialState, action: AddressAction): AddressesState {
	switch (action.type) {
		case ADD_ADDRESS_REQUEST: {
			return { ...state };
		}
		case ADD_ADDRESS_SUCCESS: {
			return {
				...state,
				addresses: [action.payload, ...state.addresses],
			};
		}
		case GET_DEFAULT_REQUEST: {
			return { ...state };
		}
		case GET_DEFAULT_SUCCESS: {
			const defaultId = action.payload;
			return {
				...state,
				defaultId,
			};
		}
		case SET_DEFAULT_REQUEST: {
			return { ...state };
		}
		case SET_DEFAULT_SUCCESS: {
			const defaultId = action.payload;
			const toastSentence = '기본 배송지가 변경되었습니다.';
			return {
				...state,
				defaultId,
				toastSentence,
			};
		}
		case DELETE_ADDRESS_REQUEST: {
			return {
				...state,
			};
		}
		case DELETE_ADDRESS_SUCCESS: {
			let addresses = [...state.addresses];
			addresses = addresses.filter((address) => address.id !== action.payload);
			const toastSentence = '삭제 완료 되었습니다.';
			return {
				...state,
				addresses,
				toastSentence,
			};
		}
		case LOAD_ADDRESSES_REQUEST: {
			return {
				...state,
				addresses: !action.payload ? [] : [...state.addresses],
			};
		}
		case LOAD_ADDRESSES_SUCCESS: {
			return {
				...state,
				addresses: state.addresses.concat(action.payload.addresses),
				hasMoreAddresses: action.payload.hasMoreAddresses,
			};
		}
		case RESET_TOAST: {
			const toastSentence = '';
			return {
				...state,
				toastSentence,
			};
		}
		default:
			return { ...state };
	}
}

export default address;
