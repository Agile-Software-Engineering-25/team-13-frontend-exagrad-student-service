import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SliceState } from '..';
import type { ExamDocumentResponse } from '@custom-types/examDocument';

interface ExamDocumentsData {
  documents: ExamDocumentResponse[];
}

const examDocumentsSlice = createSlice({
  name: 'examDocumentsSlice',
  initialState: {
    data: {
      documents: [],
    },
    state: 'idle',
    error: null,
  } as SliceState<ExamDocumentsData>,
  reducers: {
    setDocuments: (state, action: PayloadAction<ExamDocumentResponse[]>) => {
      // Replace documents with fetched data (no accumulation)
      state.data.documents = action.payload;
      state.state = 'idle';
      state.error = null;
    },
    addDocument: (state, action: PayloadAction<ExamDocumentResponse>) => {
      state.data.documents.push(action.payload);
      state.state = 'idle';
      state.error = null;
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.data.documents = state.data.documents.filter(
        (doc) => doc.id !== action.payload
      );
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
    clearDocuments: (state) => {
      state.data.documents = [];
      state.state = 'idle';
      state.error = null;
    },
  },
});

const {
  setDocuments,
  addDocument,
  removeDocument,
  setLoading,
  setError,
  clearDocuments,
} = examDocumentsSlice.actions;

export {
  setDocuments,
  addDocument,
  removeDocument,
  setLoading,
  setError,
  clearDocuments,
};
export default examDocumentsSlice.reducer;

