import { addresses } from '../data/addresses.json';

const ADD_ADDRESS = 'address/ADD_ADDRESS' as const;
const SET_DEFAULT_ADDRESS = 'address/SET_DEFAULT_ADDRESS' as const;
const DELETE_ADDRESS = 'address/DELETE_ADDRESS' as const;
const LOAD_ADDRESSES = 'address/LOAD_ADDRESSES' as const;

export const addAddress = (postnumber: number, name: string, address: string) => ({
	type: ADD_ADDRESS,
	payload: { postnumber, name, address },
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

const initialState: AddressesState = { addresses: addresses.slice(0, 5), defaultId: addresses[0].id };

function address(state: AddressesState = initialState, action: AddressAction): AddressesState {
	switch (action.type) {
		case ADD_ADDRESS: {
			let addresses = [...state.addresses];
			const nextId = Math.max(...state.addresses.map((address) => address.id)) + 1;
			addresses = addresses.concat({
				id: nextId,
				postnumber: action.payload.postnumber,
				name: action.payload.name,
				address: action.payload.address,
			});
			return { ...state, addresses };
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
			let addresses = [...state.addresses];
			let loadedData = [
				{
					id: 12382726352,
					postnumber: 203928,
					name: '홍길동',
					address: '서울시 강남구 강남대로 364, 11층',
				},
				{
					id: 12382726390,
					postnumber: 233958,
					name: '고길동',
					address: '서울시 강남구 가양대로 32, 가양아파트 21동 201호',
				},
				{
					id: 12382726393,
					postnumber: 243929,
					name: '이영신',
					address: '서울시 서초구 서초대로 311, 20층',
				},
			];
			addresses.concat(loadedData);
			return {
				...state,
				addresses,
			};
		}
		default:
			return state;
	}
}

export default address;
