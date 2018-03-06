import { Action, AnyAction, Dispatch } from 'redux';
import { AutocompleteFieldType, CommonThunkAction, GetStateFunction } from '../../../state';
import { ADD_SEGMENT, DELETE_SEGMENT, REMOVE_COMPLEX_SEGMENTS } from '../../actions';
import { setSelectedAirport } from './autocomplete/actions';

export interface SegmentAction extends Action {
	type: string;
}

export const removeComplexSegments = (): SegmentAction => {
	return {
		type: REMOVE_COMPLEX_SEGMENTS
	};
};

export const addSegment = (): SegmentAction => {
	return {
		type: ADD_SEGMENT
	};
};

export const deleteSegment = (): SegmentAction => {
	return {
		type: DELETE_SEGMENT
	};
};

export const continueRoute = (): CommonThunkAction => {
	return (dispatch: Dispatch<AnyAction>, getState: GetStateFunction): void => {
		const segments = getState().form.segments;
		const arrAirportInLastSegment = segments.length > 0 ? segments[segments.length - 1].autocomplete.arrival.airport : null;

		dispatch(addSegment());

		if (arrAirportInLastSegment) {
			dispatch(setSelectedAirport(arrAirportInLastSegment, AutocompleteFieldType.Departure, segments.length));
		}
	}
};