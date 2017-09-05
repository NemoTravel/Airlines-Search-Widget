import { types } from 'actions';
import { cloneDeep } from 'lodash';

const initialState = {
	blockIsActive: {
		search: true,
		registration: false,
		bookings: false
	},
	search: {
		departure: {
			isLoading: false,
			suggestions: [],
			inputValue: '',
			airport: null
		},
		arrival: {
			isLoading: false,
			suggestions: [],
			inputValue: '',
			airport: null
		}
	}
};

export default function form(state = initialState, action) {
	let newState = null;
	
	switch (action.type) {
		case types.TOGGLE_BLOCK:
			newState = cloneDeep(state);
			newState.blockIsActive[action.payload] = !state.blockIsActive[action.payload];
			return newState;
			
		case types.AUTOCOMPLETE_LOADING_STARTED:
			newState = cloneDeep(state);
			newState.search[action.payload].isLoading = true;
			return newState;
			
		case types.AUTOCOMPLETE_LOADING_FINISHED:
			newState = cloneDeep(state);
			newState.search[action.payload].isLoading = false;
			return newState;
			
		case types.AUTOCOMPLETE_SUGGESTIONS_CHANGED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].suggestions = action.payload.suggestions;
			return newState;
			
		case types.AUTOCOMPLETE_INPUT_VALUE_CHANGED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].inputValue = action.payload.value;
			return newState;
			
		case types.AIRPORT_SELECTED:
			newState = cloneDeep(state);
			newState.search[action.payload.fieldType].airport = action.payload.airport;
			return newState;
			
		case types.SWITCH_AIRPORTS:
			const departureAirport = state.search.departure.airport;
			const arrivalAirport = state.search.arrival.airport;
			
			if (departureAirport || arrivalAirport) {
				newState = cloneDeep(state);
				
				const departureInpurtValue = newState.search.departure.inputValue;
				const arrivalInpurtValue = newState.search.arrival.inputValue;

				newState.search.departure.airport = arrivalAirport;
				newState.search.arrival.airport = departureAirport;

				newState.search.departure.inputValue = arrivalInpurtValue;
				newState.search.arrival.inputValue = departureInpurtValue;
				
				return newState;
			}

			return state;

		default:
			return state;
	}
}