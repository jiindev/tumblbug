import { addresses } from '../data/addresses.json';
const addressesData = addresses;
const ADD_ADDRESS = 'address/ADD_ADDRESS' as const;
const SET_DEFAULT_ADDRESS = 'address/SET_DEFAULT_ADDRESS' as const;
const DELETE_ADDRESS = 'address/DELETE_ADDRESS' as const;
const LOAD_ADDRESSES = 'address/LOAD_ADDRESSES' as const;

export const addAddress = (data: { postnumber: number; name: string; address: string; defaultSet: boolean }) => ({
	type: ADD_ADDRESS,
	payload: data,
});
export const setDefaultAddress = (id: number) => ({
	type: SET_DEFAULT_ADDRESS,
	payload: id,
});
export const deleteAddress = (id: number) => ({
	type: DELETE_ADDRESS,
	payload: id,
});
export const loadAddresses = (lastId?: number) => ({
	type: LOAD_ADDRESSES,
	payload: lastId,
});

type AddressAction =
	| ReturnType<typeof addAddress>
	| ReturnType<typeof setDefaultAddress>
	| ReturnType<typeof deleteAddress>
	| ReturnType<typeof loadAddresses>;

export type Address = {
	id: number;
	postnumber: number;
	name: string;
	address: string;
};

type AddressesState = {
	addresses: Address[];
	defaultId: number;
};

const initialState: AddressesState = { addresses: addressesData.slice(0, 5), defaultId: addressesData[0].id };

function address(state: AddressesState = initialState, action: AddressAction): AddressesState {
	switch (action.type) {
		case ADD_ADDRESS: {
			const nextId = Math.max(...state.addresses.map((address) => address.id)) + 1;
			let newAddress = {
				id: nextId,
				postnumber: action.payload.postnumber,
				name: action.payload.name,
				address: action.payload.address,
			};
			return {
				...state,
				addresses: [newAddress, ...addresses],
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
		case DELETE_ADDRESS: {
			let addresses = [...state.addresses];
			addresses = addresses.filter((address) => address.id !== action.payload);
			return { ...state, addresses };
		}
		case LOAD_ADDRESSES: {
			const lastIndex = addressesData.findIndex((v) => v.id === action.payload);
			const moreAddresses = addressesData.slice(lastIndex + 1, lastIndex + 6);
			return {
				...state,
				addresses: state.addresses.concat(moreAddresses),
			};
		}
		default:
			return state;
	}
}

export default address;
