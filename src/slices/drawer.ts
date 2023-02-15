import { type CaseReducer, createSlice, type PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit'
import { type RootState } from '../store'

interface State { isOpen: boolean }

interface Reducers<State> extends SliceCaseReducers<State> {
  toggleDrawer: CaseReducer<State, PayloadAction<boolean>>
}

const slice = createSlice<State, Reducers<State>, 'drawer'>({
  name: 'drawer',
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleDrawer: (state, action) => {
      state.isOpen = action.payload
    }
  }
})

export const { reducer } = slice

export const { toggleDrawer } = slice.actions

export const isDrawerOpen = (state: RootState): boolean => state.drawer.isOpen
