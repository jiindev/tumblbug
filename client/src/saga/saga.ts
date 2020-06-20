import { takeEvery, put, delay, all, fork, takeLatest, call } from 'redux-saga/effects';
import {
	ADD_ADDRESS_REQUEST,
	addAddressSuccess,
	addAddressRequest,
	deleteAddressSuccess,
	deleteAddressRequest,
	DELETE_ADDRESS_REQUEST,
	loadAddressesSuccess,
	loadAddressesRequest,
	LOAD_ADDRESSES_REQUEST,
} from '../reducers/address';
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:8000/api`;

function addAddressAPI(data: { postnumber: number; name: string; address: string; defaultSet: boolean }) {
	// return axios.post('address');
	console.log(data);
	return data;
}
function* addAddress(action: ReturnType<typeof addAddressRequest>) {
	try {
		const result = yield call(addAddressAPI, action.payload);
		yield put(addAddressSuccess(result));
	} catch (e) {
		console.error(e);
	}
}
function* watchAddAddress() {
	yield takeLatest(ADD_ADDRESS_REQUEST, addAddress);
}
function deleteAddressAPI(id: number) {
	// return axios.post('address');
	console.log(id);
	return id;
}
function* deleteAddress(action: ReturnType<typeof deleteAddressRequest>) {
	try {
		const result = yield call(deleteAddressAPI, action.payload);
		yield put(deleteAddressSuccess(result));
	} catch (e) {
		console.error(e);
	}
}
function* watchdeleteAddress() {
	yield takeLatest(DELETE_ADDRESS_REQUEST, deleteAddress);
}
function loadAddressesAPI(lastId = 0) {
	return axios.get(`/address?lastId=${lastId}`);
}
function* loadAddresses(action: ReturnType<typeof loadAddressesRequest>) {
	try {
		const result = yield call(loadAddressesAPI, action.payload);
		yield put(loadAddressesSuccess(result.data));
	} catch (e) {
		console.error(e);
	}
}
function* watchloadAddresses() {
	yield takeLatest(LOAD_ADDRESSES_REQUEST, loadAddresses);
}

export default function* rootSaga() {
	yield all([fork(watchAddAddress), fork(watchdeleteAddress), fork(watchloadAddresses)]);
}
