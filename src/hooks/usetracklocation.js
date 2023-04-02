import {useContext, useState } from "react"
import {ACTION, CoffeeShopsContext} from "@/context/coffee-shops-context";

const useTracklocation = () => {
	const [locationErrorMsg, setLocationError] = useState("")
	const [isLocating, setLocatingStatus] = useState(false)
	const { dispatch } = useContext(CoffeeShopsContext);

	const success = (position) => {
		const latitude = position.coords.latitude
		const longitude = position.coords.longitude

		dispatch({
			type: ACTION.SET_LATLONG,
			payload: {
				latLong: `${latitude},${longitude}`,
			}
		})
		// setLatLong()
		setLocatingStatus(false)
		setLocationError("")
	}

	const error = () => {
		setLocatingStatus(false)
		setLocationError("Unable to retrieve your location");
	}

	const handleTrackLocation = () => {
		setLocatingStatus(true)
		if (!navigator.geolocation) {
			setLocationError("Geolocation is not supported by your browser")
			setLocatingStatus(false)
		} else {
			navigator.geolocation.getCurrentPosition(success, error)
		}
	}

	return {
		locationErrorMsg,
		isLocating,
		handleTrackLocation,
	}
}

export default useTracklocation;