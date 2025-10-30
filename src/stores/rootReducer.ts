import { combineReducers } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './index';
import examDocumentsReducer from '@stores/slices/examDocumentsSlice';
import lecturerFeedbackReducer from '@stores/slices/lecturerFeedbackSlice';

const appReducer = combineReducers({
  examDocuments: examDocumentsReducer,
  lecturerFeedback: lecturerFeedbackReducer,
});

const rootReducer = appReducer;

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useTypedSelector };
export default rootReducer;
