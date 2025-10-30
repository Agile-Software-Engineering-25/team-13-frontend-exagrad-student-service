import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { LecturerFeedback } from '@custom-types/lecturerFeedback';

interface LecturerFeedbackData {
  feedbacks: LecturerFeedback[];
}

const lecturerFeedbackSlice = createSlice({
  name: 'lecturerFeedback',
  initialState: {
    data: {
      feedbacks: [],
    },
    state: 'idle',
    error: null,
  } as SliceState<LecturerFeedbackData>,
  reducers: {
    setFeedbacks: (state, action: PayloadAction<LecturerFeedback[]>) => {
      state.data.feedbacks = action.payload;
      state.state = 'idle';
      state.error = null;
    },
    setLoading: (state) => {
      state.state = 'loading';
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.state = 'failed';
      state.error = action.payload;
    },
    clearFeedbacks: (state) => {
      state.data.feedbacks = [];
      state.state = 'idle';
      state.error = null;
    },
  },
});

export const { setFeedbacks, setLoading, setError, clearFeedbacks } =
  lecturerFeedbackSlice.actions;
export default lecturerFeedbackSlice.reducer;
