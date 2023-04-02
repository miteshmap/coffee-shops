import '@/styles/globals.css'
import CoffeeShopContextProvider from "@/context/coffee-shops-context";

export default function App({ Component, pageProps }) {
  return (
		<CoffeeShopContextProvider>
			<Component {...pageProps} />
		</CoffeeShopContextProvider>
	)
}
