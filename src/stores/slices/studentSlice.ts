import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { StudentData } from '@/@custom-types/studentData';

interface StudentSliceData {
  student: StudentData | null;
}

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    data: {
      student: null,
    },
    state: 'idle',
    error: null,
  } as SliceState<StudentSliceData>,
  reducers: {
    setStudent: (state, action: PayloadAction<StudentData>) => {
      state.data.student = action.payload;
      state.state = 'idle';
      state.error = null;
    },
    clearStudent: (state) => {
      state.data.student = null;
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
  },
});

export const { setStudent, clearStudent, setLoading, setError } = studentSlice.actions;
export default studentSlice.reducer;
