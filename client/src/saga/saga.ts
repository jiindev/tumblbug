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
	getDefaultRequest,
	getDefaultSuccess,
	GET_DEFAULT_REQUEST,
	setDefaultRequest,
	setDefaultSuccess,
	SET_DEFAULT_REQUEST,
} from '../reducers/address';
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:8000/api`;

function addAddressAPI(data: { postnumber: number; name: string; address: string; defaultSet: boolean }) {
	return axios.post('/address', data);
}
function* addAddress(action: ReturnType<typeof addAddressRequest>) {
	try {
		const result = yield call(addAddressAPI, action.payload);
		yield put(addAddressSuccess(result.data));
	} catch (e) {
		console.error(e);
	}
}
function* watchAddAddress() {
	yield takeLatest(ADD_ADDRESS_REQUEST, addAddress);
}
function deleteAddressAPI(id: number) {
	return axios.delete(`/address/${id}`);
}
function* deleteAddress(action: ReturnType<typeof deleteAddressRequest>) {
	try {
		const result = yield call(deleteAddressAPI, action.payload);
		yield put(deleteAddressSuccess(result.data));
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
function getDefaultAPI() {
	return axios.get(`/address/default`);
}
function* getDefault(action: ReturnType<typeof getDefaultRequest>) {
	try {
		const result = yield call(getDefaultAPI);
		yield put(getDefaultSuccess(result.data));
	} catch (e) {
		console.error(e);
	}
}
function* watchGetDefault() {
	yield takeLatest(GET_DEFAULT_REQUEST, getDefault);
}
function setDefaultAPI(data: number) {
	return axios.put(`/address/default`, { data });
}
function* setDefault(action: ReturnType<typeof setDefaultRequest>) {
	try {
		const result = yield call(setDefaultAPI, action.payload);
		yield put(setDefaultSuccess(result.data));
	} catch (e) {
		console.error(e);
	}
}
function* watchSetDefault() {
	yield takeLatest(SET_DEFAULT_REQUEST, setDefault);
}

export default function* rootSaga() {
	yield all([
		fork(watchAddAddress),
		fork(watchdeleteAddress),
		fork(watchloadAddresses),
		fork(watchGetDefault),
		fork(watchSetDefault),
	]);
}
