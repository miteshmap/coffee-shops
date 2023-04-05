const Airtable = require('airtable')

const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

async function createRecords(fields) {
	try {
		const results = await base('list')
			.create([{ "fields": { ...fields, rating: 0} }]);

		if (results.length !== 0) {
			return results[0]._rawJson.fields;
		}
		return null;
	}
	catch (err) {
		throw err
	}
}

async function findRecord(id) {
	const results = await base('list')
		.select({
			// Selecting the first 3 records in Grid view:
			maxRecords: 1,
			filterByFormula: `(id = "${id}")`
		})
		.firstPage()

	if (results.length !== 0) {
		return results[0]._rawJson.fields;
	}

	return null
}

export default async function createCoffeeStore(req, res) {
	if (req.method === 'POST') {
		const postData = req.body;
		const isIdExists = await findRecord(postData.id);
		if (isIdExists) {
			res.status(200).json({ msg: 'The coffee store is already stored.'})
			return
		}

		const requiredKeys = ['id', 'name'];
		const postDataKeys = Object.keys(postData);
		let hasRequiredKeys = requiredKeys.every(x => postDataKeys.includes(x));
		if (!hasRequiredKeys) {
				res.status(200).json({ msg: 'The post data is missing one of required keys.' })
				return
		}

		try {
			const results = await createRecords(postData)
			if (results === null) {
				res.status(200).json({ msg: 'something went wrong, please try again later' })
				return
			}
			res.status(200).json({ msg: results })
			return
		}
		catch (e) {
			res.status(400).json(e)
		}
		return
	}

	if (req.method === 'GET') {
		res.status(400).json({ msg: 'this api endpoint requires POST request.'})
		return
	}
};