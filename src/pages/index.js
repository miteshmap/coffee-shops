import {useEffect, useState} from "react";
import Head from 'next/head'
import Image from "next/image";
import usetracklocation from "@/hooks/usetracklocation";
import Banner from "@/components/banner";
import Card from '@/components/card';
import getCoffeeShops from "@/helper/utility";
import styles from '@/styles/Home.module.css'

export async function getStaticProps(context) {
	const coffeeStores = await getCoffeeShops()

	return {
		props: {
			coffeeStores,
		}
	}
}

export default function Home(props) {
	const {
		latLong,
		locationErrorMsg,
		isLocating,
		handleTrackLocation
	} = usetracklocation();

	const[nearByCoffeeShops, setNearByCoffeeShops] = useState([]);

	const handleOnBannerButtonClick = () => {
		handleTrackLocation();
	}

	useEffect( () => {
		async function fetchData() {
			let currentCoffeeShops = await getCoffeeShops(latLong);
			setNearByCoffeeShops(currentCoffeeShops)
		}
		fetchData();
	}, [latLong])

	return (
    <>
			<div className={styles.container}>
				<Head>
					<title>Coffee Shops</title>
					<meta name="description" content="Generated by create next app" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.main}>
					<Banner
						buttonText={isLocating ? 'Locating...' : 'View stores nearby'}
						handleOnClick={handleOnBannerButtonClick}
					/>

					{locationErrorMsg.length > 0 ? (<div>{locationErrorMsg}</div>) : null}

					{(nearByCoffeeShops.length > 0)
						? (
							<>
								<h2>Nearby Coffee Shops</h2>
								<div className={styles.cardLayout}>
									{nearByCoffeeShops.map(coffeeStore => (
										<Card
											imageUrl={coffeeStore?.imageUrl ?? ''}
											href={`/coffee-store/${coffeeStore?.id}`}
											name={coffeeStore?.name}
											key={coffeeStore?.id}
											className={styles.card}
										/>
									))}
								</div>
							</>
						): null
					}

					<h2>Features Coffee Shops</h2>
					<div className={styles.cardLayout}>
						{props.coffeeStores.length > 0 && props.coffeeStores.map(coffeeStore => (
							<Card
								imageUrl={coffeeStore?.imageUrl ?? ''}
								href={`/coffee-store/${coffeeStore?.id}`}
								name={coffeeStore?.name}
								key={coffeeStore?.id}
								className={styles.card}
							/>
						))}
          </div>

				</main>
				<footer className={styles.footer}></footer>
			</div>
    </>
  )
}
