class FourSquare {
	#url = null;
	results = null

	constructor() {
		this.#url = `${process.env.NEXT_PUBLIC_FOURSQUARE_API_URL}/places/search`;
	}

	/**
	 * Set params for the api request.
	 *
	 * @param query
	 * @param limit
	 * @param latlng
	 */
	setParams = ({query = 'coffee', limit = 10, latlng = '40.7313924,-74.2520952'} = {}) => {
		latlng = latlng === null ? '40.7313924,-74.2520952' : latlng

		this.#url += "?"
		this.#url += `query=${query}`
		this.#url += `&ll=${latlng}`
		this.#url += `&limit=${limit}`
	}

	triggerRequest = async () => {
		const response = await fetch(this.#url, {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY
			}
		})
		this.results = await response.json()
		return this;
	}

	prepareData = () => {
		return this.results.results.map((item) => {
			return {
				id: item.fsq_id,
				name: item.name,
				address: item.location.formatted_address,
				imageUrl: null
			}
		})
	}
}

export default FourSquare;