import APIRequestFactory from "@/helper/api/api_request_factory";
import Unsplash from "@/helper/api/unsplash";
import FourSquare from "@/helper/api/foursquare";

const getCoffeeShops = async (latlng = null) => {
	// Make Foursquare API request.
	let fourSquareFactoryObj = new APIRequestFactory(new FourSquare())
	fourSquareFactoryObj.setParams({ latlng })
	await fourSquareFactoryObj.makeApiRequest()
	const coffeeStoresData = fourSquareFactoryObj.getData()

	// Make unsplash API request.
	let unsplashFactoryObj = new APIRequestFactory(new Unsplash())
	unsplashFactoryObj.setParams()
	await unsplashFactoryObj.makeApiRequest()
	const photos = unsplashFactoryObj.getData()

	return coffeeStoresData.map((coffeestore, index) => {
		return {
			...coffeestore,
			imageUrl: photos[index]
		}
	});
}

export default getCoffeeShops;