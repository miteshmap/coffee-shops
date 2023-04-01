class APIRequestFactory {

	constructor (obj) {
		this.data = null;
		this.reqObj = obj;
	}

	setParams = (args) => {
		this.reqObj.setParams(args);
	};

	makeApiRequest = async () => {
		await this.reqObj.triggerRequest();
	};

	getData = () => {
		this.data = this.reqObj.prepareData();
		return this.data;
	};
}

export default APIRequestFactory;