const createRecord = async (newCoffeeStore) => {
	const response = await fetch('/api/createCoffeeStore', {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(newCoffeeStore),
	})
	return response.json()
}

export { createRecord }

