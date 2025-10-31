import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { CourseResponse } from '@/@custom-types/examData';

interface CoursesData {
  courses: CourseResponse[];
  lastFetched: number | null;
}

const coursesSlice = createSlice({
  name: 'coursesSlice',
  initialState: {
    data: {
      courses: [],
      lastFetched: null,
    },
    state: 'idle',
    error: null,
  } as SliceState<CoursesData>,
  reducers: {
    setCourses: (state, action: PayloadAction<CourseResponse[]>) => {
      state.data.courses = action.payload;
      state.data.lastFetched = Date.now();
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
    clearCourses: (state) => {
      state.data.courses = [];
      state.data.lastFetched = null;
      state.state = 'idle';
      state.error = null;
    },
  },
});

const { setCourses, setLoading, setError, clearCourses } =
  coursesSlice.actions;

export { setCourses, setLoading, setError, clearCourses };
export default coursesSlice.reducer;
