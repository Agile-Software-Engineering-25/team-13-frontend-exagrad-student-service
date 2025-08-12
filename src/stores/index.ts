import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export interface SliceState<T> {
  data: T;
  state: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
