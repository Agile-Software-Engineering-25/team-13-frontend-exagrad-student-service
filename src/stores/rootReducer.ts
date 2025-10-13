import { combineReducers } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './index';
import weatherReducer from '@stores/slices/weatherSlice';
import examDocumentsReducer from '@stores/slices/examDocumentsSlice';

const appReducer = combineReducers({
  weather: weatherReducer,
  examDocuments: examDocumentsReducer,
});

const rootReducer = appReducer;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useTypedSelector };
export default rootReducer;
