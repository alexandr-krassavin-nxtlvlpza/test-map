import { type CaseReducer, createSlice, type PayloadAction, type SliceCaseReducers } from '@reduxjs/toolkit'
import { type RootState } from '../store'
import { shops } from '../data'

export interface Shop {
  id: string
  name: string
  description: string
  address: string
  contacts: {
    email: string
    phone: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  images: string[]
}

const initialState = {
  data: shops,
  selectedShop: null
}

interface State {
  data: Shop[]
  selectedShop: Shop | null
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setSelectedShop: CaseReducer<State, PayloadAction<string>>
  clearSelectedShop: CaseReducer<State, PayloadAction>
  setShops: CaseReducer<State, PayloadAction<Shop[]>>
}

const slice = createSlice<State, Reducers<State>, 'shop'>({
  name: 'shop',
  initialState,
  reducers: {
    setSelectedShop: (state, action) => {
      const shopID = action.payload
      state.selectedShop = state.data.find((shop) => shop.id === shopID) ?? null
    },
    clearSelectedShop: (state) => {
      state.selectedShop = null
    },
    setShops: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { setSelectedShop, clearSelectedShop, setShops } = slice.actions

export const getAllShops = (state: RootState): Shop[] => state.shop.data
export const getSelectedShop = (state: RootState): Shop | null => state.shop.selectedShop
export const { reducer } = slice
