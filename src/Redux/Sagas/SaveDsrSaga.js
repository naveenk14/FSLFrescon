import { call, put, takeLatest } from 'redux-saga/effects';
import * as Types from "../ActionTypes";
import { SaveDsrService } from '../../Services/SaveDsrService';

function* SaveDsrSaga({ payload }) {
  try {
   
    const BookingResponse = yield call(SaveDsrService, payload);
    const response = BookingResponse.data;
  
    yield put({
      type: Types.SAVE_DSR_SUCCESS,
      payload: response})
  } catch (error) {
    yield put({ type: Types.SAVE_DSR_FAILURE, error: alert.error(error.response.data.error.message) })
  };
}


function* watchSaveDsr() {

  yield takeLatest(Types.SAVE_DSR_REQUEST, SaveDsrSaga);
}
export default watchSaveDsr;
