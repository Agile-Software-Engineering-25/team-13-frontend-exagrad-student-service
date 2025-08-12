import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { WeatherData } from '@custom-types/weather';

const weatherSlice = createSlice({
  name: 'weatherSlice',
  initialState: {
    data: {
      temperature: 20,
    },
    state: 'idle',
    error: null,
  } as SliceState<WeatherData>,
  reducers: {
    setTemperature: (state, action: PayloadAction<number>) => {
      state.data.temperature = action.payload;
    },
  },
});

const { setTemperature } = weatherSlice.actions;

export { setTemperature };
export default weatherSlice.reducer;
