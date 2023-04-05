import { useRouter } from 'next/router'
import cls from "classnames"
import getCoffeeShops from "@/helper/utility"
import {useEffect, useContext, useState} from "react";
import {CoffeeShopsContext} from "@/context/coffee-shops-context";
import { createRecord } from "@/helper/airtable"

export async function getStaticProps(context) {
	const { params: { id } } = context

	const coffeeStoresData = await getCoffeeShops();
	const findCoffeeStore = coffeeStoresData.find(item => item.id.toString() === id)

	return {
		props: {
			coffeeStore: findCoffeeStore ?? null
		}
	}
}

// Generates `/coffee-store/1` and `/coffee-store/2`.
export async function getStaticPaths() {
	const coffeeStoresData = await getCoffeeShops();
	const paths = coffeeStoresData.map(item => {
		return { params: { id: item.id.toString()}}
	})

	return {
		paths,
		fallback: true,
	}
}

const CoffeeStore = (initProp) => {
	const router = useRouter()
	const { state: { coffeeStores } } = useContext(CoffeeShopsContext)
	const [coffeeStore, setCoffeeStore] = useState(initProp.coffeeStore);

	const { id } = router.query

	useEffect(() => {
		if ((initProp.coffeeStore == null)
			|| (initProp.coffeeStore != null && Object.keys(initProp.coffeeStore).length == 0 )
		) {
			if (coffeeStores.length > 0) {
				const newCoffeeStore = coffeeStores.find(item => item.id.toString() === id)
				createRecord(newCoffeeStore)
				setCoffeeStore(newCoffeeStore)
			}
		}
		else {
			createRecord(initProp.coffeeStore)
		}
	}, [id, initProp.coffeeStore])

	if (router.isFallback) {
		return <div>Loading...</div>
	}

	return (coffeeStore != null && (
		<div className={cls('glass')}>
			{coffeeStore.name}
			{coffeeStore.address}
			{coffeeStore.neighbourhood}
		</div>
	))
}

export default CoffeeStore
