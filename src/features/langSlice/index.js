import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    lang: 'ar',
  }
  
  export const LangSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggeLanguage: (state) => {
            if( state.lang == 'en'){
                state.lang = 'ar';
            }else {
                state.lang = 'en'
            }
           
        }
    }        
  })
  
  // Action creators are generated for each case reducer function
  export const {  toggeLanguage } = LangSlice.actions
  
export default LangSlice.reducer