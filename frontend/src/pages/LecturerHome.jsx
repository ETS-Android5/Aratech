import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Navbar from '../components/Navbar';

//use moment as defaullt localizer for calendar
const localizer = momentLocalizer(moment);

class LecturerHome extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events: [],
		};
	}

	async componentDidMount() {
		//load class timetable
		try {
			await this.props.getStudentClassTimetable();
			const events = this.props.classTimetable;
			this.setState({
				events: events ? this.state.events.concat(events) : this.state.events,
			});
		} catch (error) {
			console.error(error);
		}
	}

	render() {
		const { events } = this.state;
		return (
			<React.Fragment>
				<Navbar />
				<div className="uk-grid-collapse" data-uk-grid>
					{/*start of first half of the page */}
					<div className="uk-width-1-2@m uk-padding-small uk-flex uk-flex-middle uk-flex-center">
						<Calendar
							localizer={localizer}
							events={events}
							titleAccessor="eventName"
							startAccessor="startTime"
							endAccessor="endTime"
							views={['day', 'week', 'agenda']}
							defaultView={'day'}
							onSelectEvent={(event) => this.showEventDetails(event)}
						/>
					</div>
					{/* end of first half the page */}

					{/* start of second half */}
					<div className="uk-width-1-2@m uk-padding-large uk-flex uk-flex-column">
						{/* show profile pic and upcoming class on this card */}
						<div className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center">
							<img
								src="../assets/students"
								className="uk-border-circle"
								alt="avatar"
								style={{
									width: '100px',
									height: '100px',
									cursor: 'pointer',
								}}
							/>
							<h4>Upcoming Class</h4>
						</div>

						{/* show the list of student here */}
						<div className="uk-margin-top uk-padding-small">
							<h3>STUDENTS LIST</h3>
							<table className="uk-table uk-table-divider uk-table-expand">
								<thead>
									<tr>
										<th>Student Name</th>
										<th>Index Number</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Clifford Owusu Amponsah</td>
										<td>9346517</td>
									</tr>
									<tr>
										<td>Doe Godfred</td>
										<td>9346517</td>
									</tr>
									<tr>
										<td>Gyimah Francis</td>
										<td>9343317</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="uk-padding-small">
							<h3>EDIT A STUDENT DETAILS</h3>
							<form>
								<div className="uk-width-1-1 uk-margin">
									<label className="uk-form-label" htmlFor="stdName">
										Student Name:
									</label>
									<input className="uk-input" />
								</div>
								<div className="uk-width-1-1 uk-margin">
									<label className="uk-form-label" htmlFor="stdName">
										Student Index No:
									</label>
									<input className="uk-input" />
								</div>
								<button className="uk-button uk-button-primary uk-margin-right  uk-margin-large-bottom">
									EDIT DETAILS
								</button>
							</form>
						</div>
						<div style={{ marginTop: '-55px' }} className="uk-padding-small">
							<h3>ADD A NEW STUDENT</h3>
							<form>
								<div className="uk-width-1-1 uk-margin">
									<label className="uk-form-label" htmlFor="stdName">
										Student Name:
									</label>
									<input className="uk-input" />
								</div>
								<div className="uk-width-1-1 uk-margin">
									<label className="uk-form-label" htmlFor="stdName">
										Student Index No:
									</label>
									<input className="uk-input" />
								</div>
								<button className="uk-button uk-button-primary uk-margin-right  uk-margin-large-bottom">
									ADD STUDENT
								</button>
							</form>
						</div>
					</div>
					{/* end of second half */}
				</div>
			</React.Fragment>
		);
	}
}

export default LecturerHome;
