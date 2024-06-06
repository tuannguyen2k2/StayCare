
import { IProfile } from "@/interfaces/profile.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AccountSliceState = {
  user: IProfile | null;
};

const initialState: AccountSliceState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IProfile | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = accountSlice.actions;
export default accountSlice.reducer;
