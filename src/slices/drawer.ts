import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type State = { isOpen: boolean };

type Reducers<State> = {
    toggleDrawer: CaseReducer<State, PayloadAction<boolean>>,
};

const slice = createSlice<State, Reducers<State>, 'drawer'>({
    name: 'drawer',
    initialState: {
        isOpen: false,
    },
    reducers: {
       toggleDrawer: (state, action) => {
           state.isOpen = action.payload;
       }
    }
});

export const { reducer } = slice;

export const { toggleDrawer } = slice.actions;

export const isDrawerOpen = (state: RootState): boolean => state.drawer.isOpen;
