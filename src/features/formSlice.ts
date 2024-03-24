import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonFormData } from '../types';

interface FormState {
  formData: PersonFormData[];
}

const initialState: FormState = {
  formData: [],
};

export const formSlice: any = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<PersonFormData>) => {
      state.formData.push(action.payload);
    },
    deleteData: (state, action: PayloadAction<number>) => {
      state.formData = state.formData.filter((item) => item.key !== action.payload);
    },
    editData: (state, action: PayloadAction<PersonFormData>) => {
      const index = state.formData.findIndex((item) => item.key === action.payload.key);
      if (index !== -1) {
        state.formData[index] = action.payload;
      }
    },
    deleteMultipleData: (state, action: PayloadAction<number[]>) => {
      state.formData = state.formData.filter(item => !action.payload.includes(item.key));
    },
  },
});

export const { addData, deleteData, editData , deleteMultipleData } = formSlice.actions;

export default formSlice.reducer;
