import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonFormData } from '../types';

interface FormState {
  formData: PersonFormData[];
}

const initialState: FormState = {
  formData: [],
};

export const formSlice:any = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<PersonFormData>) => {
      state.formData.push(action.payload);
    },
    // Define other reducers like editData, deleteData here
  },
});

export const { addData } = formSlice.actions;

export default formSlice.reducer;
