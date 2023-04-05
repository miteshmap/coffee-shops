import { createContext, useReducer } from "react";

export const CoffeeShopsContext = createContext();

export const ACTION = {
	SET_LATLONG: 'SET_LATLONG',
	SET_COFFEE_STORES: 'SET_COFFEE_STORES'
}

function coffeeStoreReducer(state, action) {
	switch (action.type) {
		case ACTION.SET_LATLONG:
			return {...state, latLong: action.payload.latLong }
		case ACTION.SET_COFFEE_STORES:
			return {...state, coffeeStores : action.payload.coffeeStores }
		default:
			throw new Error(`unhandled action ${action.type}`)
	}
}

export default function CoffeeShopContextProvider ({ children }) {
	const initialState = {
		latLong: "",
		coffeeStores: [],
	};
	const [state, dispatch] = useReducer(coffeeStoreReducer, initialState)

	return (
		<CoffeeShopsContext.Provider value={{state, dispatch}}>
			{children}
		</CoffeeShopsContext.Provider>
	)
}