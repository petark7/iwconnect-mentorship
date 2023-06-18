import { useState } from 'react';
import './index.scss';

const AvailableTimes = ({ availableTimes = [], setSelected }) => {
	const [selectedTime, setSelectedTime] = useState(null);
	const availableTimesJSX = availableTimes.map(time =>
		(
			<p
				key={time}
				className={`availableTime-time ${selectedTime === time ? 'availableTime-selected' : null}`}
				onClick={() => {
					setSelectedTime(time);
					setSelected(time); // Used outside of component
				}}
			>
				{time}
			</p>
		));
	return (
		<div className="availableTimes d-flex justify-content-center gap-3 flex-wrap">
			{availableTimesJSX}
		</div>
	);
};

export default AvailableTimes;
