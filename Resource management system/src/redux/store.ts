import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import membersReducer from './membersSlice';


import type { UserInfo } from './userSlice';

export interface MembersState {
  members: UserInfo[];
}

export interface UserState {
  user: UserInfo | null;
  isAuthenticated: boolean;
}



const store = configureStore<{
  user: UserState;
  members: MembersState;
}>({
  reducer: {
    user: userReducer,
    members: membersReducer,
  },
});

// RootState is already defined above as an interface, so remove this duplicate type export.
export type AppDispatch = typeof store.dispatch;
export default store;
