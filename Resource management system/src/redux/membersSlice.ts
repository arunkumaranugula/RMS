import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserInfo } from './userSlice';

interface MembersState {
  members: UserInfo[];
}

const initialState: MembersState = {
  members: [],
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    setMembers(state, action: PayloadAction<UserInfo[]>) {
      state.members = action.payload;
    },
    addMember(state, action: PayloadAction<UserInfo>) {
      state.members.push(action.payload);
    },
  },
});

export const { setMembers, addMember } = membersSlice.actions;
export default membersSlice.reducer;
