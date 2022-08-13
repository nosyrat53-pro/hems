import { configureStore } from '@reduxjs/toolkit';
import signInSlice from '../features/signSlice/index';
import LanguageSlice from '../features/langSlice/index';

export const store = configureStore({
  reducer: {
    signIn: signInSlice,
    lagnuage: LanguageSlice,
  },
})