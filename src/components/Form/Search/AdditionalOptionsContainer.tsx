import * as React from 'react';
import * as classnames from 'classnames';
import { Action, AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from '../../UI/Checkbox';
import { vicinityDatesSelect, directFlightSelect } from '../../../store/form/additional/selector';
import { i18n } from '../../../utils';
import { ApplicationMode, ApplicationState, CommonThunkAction, RouteType, ServiceClass } from '../../../state';
import {
	BooleanAction, SetClassAction, setClassType,
	vicinityDatesAction,
	directFlightAction,
	setVicinityDatesCheckbox,
	setDirectFlightCheckbox
} from '../../../store/form/additional/actions';
import { setRouteType } from '../../../store/form/route/actions';
import { isCR } from '../../../store/form/selectors';
import UIDropdown from '../../UI/Dropdown';

interface StateProps {
	vicinityDatesSelect: boolean;
	directFlightSelect: boolean;
	vicinityDays: number;
	widgetMode: ApplicationMode;
	isCR: boolean;
}

interface DispatchProps {
	setClassType: (classType: ServiceClass) => SetClassAction;
	vicinityDatesAction: () => Action;
	directFlightAction: () => Action;
	setVicinityDatesCheckbox: (checked: boolean) => BooleanAction;
	setDirectFlightCheckbox: (checked: boolean) => BooleanAction;
	setRouteType: (type: RouteType) => CommonThunkAction;
}

class AdditionalOptionsContainer extends React.Component<StateProps & DispatchProps> {
	constructor(props: StateProps & DispatchProps) {
		super(props);

		this.changeRouteType = this.changeRouteType.bind(this);
	}

	renderVicinityDates(): React.ReactNode {
		const { vicinityDatesAction, vicinityDatesSelect, vicinityDays } = this.props;
		const NUM_OF_DAYS_PLURAL = 5;
		let dayLabel: string;

		dayLabel = vicinityDays > 1 ? i18n('form', (vicinityDays < NUM_OF_DAYS_PLURAL ? 'additional_vicinityDates_days' : 'additional_vicinityDates_days_5')) : i18n('form', 'additional_vicinityDates_day');

		const label = i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays.toString()).replace('[%-dayLabel-%]', dayLabel);

		return <Checkbox
			id="vicinity"
			label={label}
			trigger={vicinityDatesAction}
			checked={vicinityDatesSelect}
		/>;
	}

	changeRouteType(): void {
		if (this.props.isCR) {
			this.props.setRouteType(RouteType.OW);
		}
		else {
			this.props.setRouteType(RouteType.CR);
		}
	}

	renderDirect(): React.ReactNode {
		const { directFlightAction, directFlightSelect } = this.props;
		const label = i18n('form', 'additional_directFlight');

		return <Checkbox
			id="directCheckbox"
			label={label}
			trigger={directFlightAction}
			checked={directFlightSelect}
		/>;
	}

	renderDropdownTrigger(): React.ReactNode {
		return (
			<div className="widget-ui-select__toggle">{i18n('form', 'moreOptions')}</div>
		);
	}

	renderDropdownContent(): React.ReactNode {
		const { isCR } = this.props;

		return (
			<div className="widget-ui-select__dropdown">
				{!isCR ? this.renderVicinityDates() : null}
				{this.renderDirect()}
			</div>
		);
	}

	renderSelect(): React.ReactNode {
		return (
			<div className="widget-ui-select">
				<UIDropdown
					triggerElement={this.renderDropdownTrigger()}
					contentElement={this.renderDropdownContent()}
				/>
			</div>
		);
	}

	render(): React.ReactNode {
		const { widgetMode, isCR } = this.props;

		return widgetMode === ApplicationMode.NEMO ? <div className="widget-form-additionalOptions">
			<div className="widget-form-additionalOptions__checkboxes">
				{!isCR ? this.renderVicinityDates() : null}
				{this.renderDirect()}
			</div>

			<div className="widget-form-additionalOptions__checkboxes widget-form-additionalOptions__checkboxes_nemo">
				{this.renderSelect()}
			</div>

			<div className={classnames('widget-form__routeTypeSwitch', { 'widget-form__routeTypeSwitch_toCR': !isCR }, { 'widget-form__routeTypeSwitch_toOW': isCR })}>
				<span onClick={this.changeRouteType}>
					{i18n('form', isCR ? 'routeType_OW' : 'routeType_CR')}
				</span>
			</div>
		</div> : null;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		vicinityDatesSelect: vicinityDatesSelect(state),
		directFlightSelect: directFlightSelect(state),
		vicinityDays: state.system.vicinityDays,
		widgetMode: state.system.mode,
		isCR: isCR(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction, any>): DispatchProps => {
	return {
		setClassType: bindActionCreators(setClassType, dispatch),
		vicinityDatesAction: bindActionCreators(vicinityDatesAction, dispatch),
		directFlightAction: bindActionCreators(directFlightAction, dispatch),
		setVicinityDatesCheckbox: bindActionCreators(setVicinityDatesCheckbox, dispatch),
		setDirectFlightCheckbox: bindActionCreators(setDirectFlightCheckbox, dispatch),
		setRouteType: bindActionCreators(setRouteType, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(AdditionalOptionsContainer);
