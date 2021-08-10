export const checkInputValidation = (input) => {
return input == ""
};

export const isValidInputs = (data) => {
	const inputData = [];

	for (let value in data) {
		inputData.push(checkInputValidation(data[value]));
	}
	
	return !inputData.includes(true);
};
