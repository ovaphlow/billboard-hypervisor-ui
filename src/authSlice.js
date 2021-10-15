import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: 0,
    uuid: '',
    name: '',
    username: '',
  },
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.uuid = action.payload.uuid;
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
