import { AvailableDateResponse, ResponseWithAvailableDates } from '../../state';

export const parseDatesAvailability = (response: ResponseWithAvailableDates): AvailableDateResponse[] => {
	let availableDates: AvailableDateResponse[] = [];

	if (response && response.flights && response.flights.availability && response.flights.availability.dates) {
		availableDates = response.flights.availability.dates;
	}

	return availableDates;
};
