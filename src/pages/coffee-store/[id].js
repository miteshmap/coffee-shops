import { useRouter } from 'next/router'
import cls from "classnames";
import getCoffeeStoresData from "@/helper/api/foursquare";

export async function getStaticProps(context) {
	const { params: { id } } = context

	const coffeeStoresData = await getCoffeeStoresData(10);

	const findCoffeeStore = coffeeStoresData.find(item => item.id.toString() === id)

	return {
		props: {
			coffeeStore: findCoffeeStore
		}
	}
}

// Generates `/coffee-store/1` and `/coffee-store/2`
export async function getStaticPaths() {
	const coffeeStoresData = await getCoffeeStoresData(10);
	console.log(coffeeStoresData);
	const paths = coffeeStoresData.map(item => {
		return { params: { id: item.id.toString()}}
	})

	return {
		paths,
		fallback: false,
	}
}


const CoffeeStore = (props) => {
	const router = useRouter()

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	console.log()
	console.log(props)
	// console.log(router.query)
	const { id } = router.query

	return (<div className={cls('glass')}>
		{props.coffeeStore.name}
		{props.coffeeStore.address}
		{props.coffeeStore.neighbourhood}
	</div>)
}

export default CoffeeStore
