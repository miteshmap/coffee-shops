import {useState} from "react";

const usetracklocation = () => {
	const [latLong, setLatLong] = useState("");
	const [locationErrorMsg, setLocationError] = useState("");
	const [isLocating, setLocatingStatus] = useState(false);

	const success = (position) => {
		const latitude = position.coords.latitude
		const longitude = position.coords.longitude

		setLatLong(`${latitude},${longitude}`)
		setLocatingStatus(false)
		setLocationError("")
	}

	const error = () => {
		setLocatingStatus(false)
		setLocationError("Unable to retrieve your location");
	}

	const handleTrackLocation = () => {
		setLocatingStatus(true);
		if (!navigator.geolocation) {
			setLocationError("Geolocation is not supported by your browser");
			setLocatingStatus(false)
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	return {
		latLong,
		locationErrorMsg,
		isLocating,
		handleTrackLocation,
	}
}

export default usetracklocation;