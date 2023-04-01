import { createApi } from 'unsplash-js';

class Unsplash {
	#url = null
	results = null

	constructor() {
		this.#url = createApi({
			accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
		})
	}

	setParams = ({query = "coffee", limit = 30, page = 1} = {}) => {
		this.args = {
			query: query,
			page: page,
			perPage: limit,
		}
	}

	triggerRequest = async () => {
		this.results = await this.#url.search.getPhotos(this.args)
		return this
	}

	prepareData = () => {
		if (this.results.response.total > 0) {
			return this.results.response.results.map(photo => photo.urls.small)
		}
		return []
	}
}

export default Unsplash;
