import {createSlice, CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Product = {
    id: string;
    title: string;
    shopID: string;
};

const initialState = {
    data: []
}

type State = {
    data: Product[],
};

type Reducers = {
    addToWishList: CaseReducer<State, PayloadAction<Product>>;
    removeFromWishList: CaseReducer<State, PayloadAction<string>>;
}

const slice = createSlice<State, Reducers, 'wishList'>({
    name: 'wishList',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.data.push(action.payload);
        },
        removeFromWishList: (state, action) => {
            state.data = state.data.filter((product) => product.id !== action.payload);
        },
    },
});

export const { addToWishList, removeFromWishList } = slice.actions;

export const selectAllProductsOfShop = (state: RootState, shopID: string): Product[] => {
    return state.wishList.data.filter((product) => product.shopID === shopID);
}

export const { reducer } = slice;
