import fp from 'fingerprintjs2';

const notErrorOrUndefined = ([k, v]) =>
	!(v === null || v === undefined || v instanceof Error);
const arrayToString = ([k, v]) =>
	Array.isArray(v) ? [k, v.join(', ')] : [k, v];
const notEmptyString = ([k, v]) =>
	!((typeof v === 'string' || v instanceof String) && v.lenght === 0);
const boolToString = ([k, v]) =>
	typeof v === 'boolean' ? [k, `${v}`] : [k, v];
const flattenObject = ([k, v]) => ({ [k]: v });
export const toSingleObject = (acc, curr) => ({ ...acc, ...curr });

export const cleanData = (data) => {
	return Object.entries(data)
		.filter(notErrorOrUndefined)
		.map(arrayToString)
		.filter(notEmptyString)
		.map(boolToString)
		.map(flattenObject)
		.reduce(toSingleObject);
};

export const getFingerprint = () => fp.getPromise();
