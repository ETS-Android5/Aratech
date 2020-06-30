import React from 'react';
import Navbar from '../components/Navbar';

const StdAss = () => {
	return (
		<React.Fragment>
			<Navbar />
			<div
				// write some logic to give margin bottom of 100 or 200px if the are ass descriptions for nice styling
				style={{ marginBottom: '200px' }}
				className="uk-card uk-card-default uk-card-hover uk-card-body uk-text-center"
			>
				<img
					// onClick={() => history.push('/student/profile')}
					src={'user.avatar'}
					className="uk-border-circle"
					alt="avatar"
					style={{
						width: '100px',
						height: '100px',
						cursor: 'pointer',
					}}
				/>
				<h4 className="header uk-text-uppercase">Upcoming Assignment</h4>
				{/* write logic to display upcoming assignments with due dates */}
				<div className="uk-align-center">
					<table className="uk-table uk-table-divider uk-table-small">
						<thead>
							<tr>
								<td>COE 345 Assignment 1</td>
								<td>11/06/2020</td>
								<td>
									<button className="uk-button uk-button-primary">Submit</button>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>COE 568 Assignment 4</td>
								<td>14/07/2020</td>
								<td>
									<button className="uk-button uk-button-primary">Submit</button>
								</td>
							</tr>
							<tr>
								<td>COE 468 Assignment 5</td>
								<td>22/03/2020</td>
								<td>
									<button className="uk-button uk-button-primary">Submit</button>
								</td>
							</tr>
							<tr>
								<td>MATH 252 Assignment 2</td>
								<td>30/06/2020</td>
								<td>
									<button className="uk-button uk-button-primary">Submit</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className="uk-flex uk-flex-wrap uk-flex-wrap-around uk-height-medium">
				<div className="uk-slidenav-large uk-padding">
					{/* list All the various assignments of stuents here. */}
					<h4 className="uk-text-bold">All Assignments</h4>
					<ul className="uk-list uk-list-large uk-list-circle">
						<li>COE 345 Assignment 1</li>
						<li>COE 568 Assignment 4</li>
						<li>COE 456 Assignment 2</li>
						<li>COE 136 Assignment 5</li>
						<li>MATH 446 Assignment 5</li>
					</ul>
				</div>
				<div className="uk-width-expand@m">
					<div style={{ marginTop: '40px' }} className="uk-section uk-card uk-card-default uk-card-body">
						<ul className="uk-list  uk-list-large uk-list-divider">
							<li>
								<p className="uk-padding-large-bottom">display the file the sudent submitted</p>
								<p>
									<h3>Display the respective assignment name</h3>
									<p>Assignment description if any</p>
								</p>
							</li>
							<li>
								<p className="uk-padding-xlarge-bottom">9346517_Clifford_Coe536_Assignment2.pdf</p>
								<p>
									<h3>COE 536 Assignment 2</h3>
									<>
										{/* ass description */}
										lorem Embedded Systems online assignment 4. Due today at 12 noon Last assignment
										for 2020 This is also a control and monitoring assignment so you are advised to
										do independent work Submit only own hand written solutions in pdf format to the
										dedicated email address I thank you all and hope to see all of you again Good
										luck and may the Lord Almighty guide and protect us
									</>
								</p>
							</li>
							<li>
								<p className="uk-padding-bottom-xlarge">9346517_Clifford_MATH252_Assignment2.pdf</p>
								<p>
									<h3>MATH 252 Assignment 5</h3>
									<>
										{/* ass description */}
										lorem Mathematics online assignment 5. Due today at 12 noon Last assignment for
										2020 This is also a control and monitoring assignment so you are advised to do
										independent work Submit only own hand written solutions in pdf format to the
										dedicated email address I thank you all and hope to see all of you again Good
										luck and may the Lord Almighty guide and protect us
									</>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default StdAss;
