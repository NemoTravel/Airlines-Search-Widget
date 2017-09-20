import Cookie from 'js-cookie';
import moment from 'moment';

const decode = (string) => {
	try {
		return JSON.parse(string);
	}
	catch (e) {
		return string;
	}
};

const encode = (object) => {
	return typeof object === 'string' ? object : JSON.stringify(object);
};

/**
 * Caching function.
 * 
 * Uses `localStorage` if available, or uses cookies instead.
 * 
 * @param key
 * @param value
 */
export const cache = (key, value = null) => {
	if (typeof localStorage !== 'undefined') {
		if (value) {
			localStorage.setItem(key, encode(value));
		}
		else {
			return decode(localStorage.getItem(key));
		}
	}
	else {
		if (value) {
			Cookie.set(key, encode(value));
		}
		else {
			return decode(Cookie.get(key));
		}
	}
};

/**
 * Internationalization module.
 * 
 * @param moduleName
 * @param label
 * @returns {*}
 */
export const i18n = (moduleName, label) => {
	try {
		const locale = cache('locale');
		const module = require('i18n/' + locale + '/' + moduleName);
		
		return module[label];
	}
	catch (e) {
		console.warn(e);
		return '';
	}
};

/**
 * Get an array of MomentJS dates between two given dates.
 * 
 * @param firstDate
 * @param secondDate
 * @param withBoundaryDates
 * @returns {Array}
 */
export const getIntermediateDates = (firstDate, secondDate = moment(), withBoundaryDates = false) => {
	let result = [];
	
	if (firstDate && secondDate) {
		let startDate = firstDate.clone();
		let endDate = secondDate.clone();

		while (startDate.add(1, 'days').diff(endDate) < 0) {
			result.push(startDate.clone());
		}
		
		if (withBoundaryDates) {
			result.unshift(firstDate);
			result.push(secondDate);
		}
	}
	
	return result;
};