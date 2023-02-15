import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector
} from 'react-redux'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import { reducer as wishListReducer } from './slices/wishList'
import { reducer as drawerReducer } from './slices/drawer'
import { reducer as shopReducer } from './slices/shop'

const persistedWishList = persistReducer({ key: 'wishList', storage }, wishListReducer)

const reducer = combineReducers({
  wishList: persistedWishList,
  drawer: drawerReducer,
  shop: shopReducer
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type dispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useSelector = useAppSelector
export const useDispatch: () => dispatch = useAppDispatch
export const persistor = persistStore(store)
