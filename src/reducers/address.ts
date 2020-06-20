import { addresses } from '../data/addresses.json';
const addressesData = addresses;
export const ADD_ADDRESS_REQUEST = 'ADD_ADDRESS_REQUEST' as const;
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS' as const;
export const SET_DEFAULT_ADDRESS = 'SET_DEFAULT_ADDRESS' as const;
export const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST' as const;
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS' as const;
export const LOAD_ADDRESSES = 'LOAD_ADDRESSES' as const;

export const addAddressRequest = (data: AddedAddress) => ({
	type: ADD_ADDRESS_REQUEST,
	payload: data,
});
export const addAddressSuccess = (data: AddedAddress) => ({
	type: ADD_ADDRESS_SUCCESS,
	payload: data,
});
export const setDefaultAddress = (id: number) => ({
	type: SET_DEFAULT_ADDRESS,
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
export const loadAddresses = (lastId?: number) => ({
	type: LOAD_ADDRESSES,
	payload: lastId,
});

type AddressAction =
	| ReturnType<typeof addAddressRequest>
	| ReturnType<typeof addAddressSuccess>
	| ReturnType<typeof setDefaultAddress>
	| ReturnType<typeof deleteAddressRequest>
	| ReturnType<typeof deleteAddressSuccess>
	| ReturnType<typeof loadAddresses>;

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
};

const initialState: AddressesState = {
	addresses: [],
	hasMoreAddresses: true,
	defaultId: addressesData[0].id,
};

function address(state: AddressesState = initialState, action: AddressAction): AddressesState {
	switch (action.type) {
		case ADD_ADDRESS_REQUEST: {
			return state;
		}
		case ADD_ADDRESS_SUCCESS: {
			const nextId = Math.max(...state.addresses.map((address) => address.id)) + 1;
			let newAddress = {
				id: nextId,
				postnumber: action.payload.postnumber,
				name: action.payload.name,
				address: action.payload.address,
			};
			return {
				...state,
				addresses: [newAddress, ...state.addresses],
				defaultId: action.payload.defaultSet ? nextId : state.defaultId,
			};
		}
		case SET_DEFAULT_ADDRESS: {
			const defaultId = action.payload;
			return {
				...state,
				defaultId,
			};
		}
		case DELETE_ADDRESS_REQUEST: {
			return state;
		}
		case DELETE_ADDRESS_SUCCESS: {
			let addresses = [...state.addresses];
			addresses = addresses.filter((address) => address.id !== action.payload);
			return {
				...state,
				addresses,
				hasMoreAddresses: addresses[addresses.length - 1] === addressesData[addressesData.length - 1] ? false : true,
			};
		}
		case LOAD_ADDRESSES: {
			const lastIndex = addressesData.findIndex((v) => v.id === action.payload);
			const moreAddresses = addressesData.slice(lastIndex + 1, lastIndex + 6);
			return {
				...state,
				addresses: state.addresses.concat(moreAddresses),
				hasMoreAddresses:
					moreAddresses[moreAddresses.length - 1] === addressesData[addressesData.length - 1] ? false : true,
			};
		}
		default:
			return state;
	}
}

export default address;
