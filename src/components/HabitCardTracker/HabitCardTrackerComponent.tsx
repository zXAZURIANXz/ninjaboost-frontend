import React, { useEffect, useState } from 'react'
import style from './HabitCardTrackerComponent.module.css'
import PropTypes from 'prop-types';
import { Typography } from "antd";
import { Icon } from '@iconify/react';
import Color from 'color';
import { isCompletedHabitService } from '../../services/habitService';

const { Title } = Typography;

export const HabitCardTrackerComponent = ({_idHabit,title,description,color,icon,daysDone,isCompleted}) => {


	const now   			= new Date(),
		 		currentDay  = now.getDate(),
				dayIndex    = currentDay - 1;

	interface HabitCompleted {
		_idHabit		: String,
		isCompleted : Boolean
	}

 /**
 	* Returns the number of days in the current month.
 	*
 	* It uses the current date to get the year and month,
 	* then calculates the number of days by creating a date
 	* with day 0 of the next month, which points to the last day
 	* of the current month.
 	*
 	* Example: if today is July, it returns 31.
 	*/
	const getDaysInCurrentMonth = (now) => {
	  const year 	 		  = now.getFullYear(),
					month 			= now.getMonth(), // 0-indexado: enero = 0
		 			daysInMonth = new Date(year, month + 1, 0).getDate();

		return daysInMonth;
	};

	/**
	 * Generates a boolean array representing which days in the current month are completed.
	 *
	 * Converts the array of completed day strings (e.g., ["1", "3", "5"]) into numbers,
	 * and then creates an array of length `daysInMonth`, where each index represents a day.
	 * If the day (index + 1) is included in the completed list, the value is `true`; otherwise, `false`.
	 *
	 * @param {string[]} completedDays - An array of completed day numbers as strings (e.g., ["1", "2", "15"]).
	 * @param {number} daysInMonth - The total number of days in the current month.
	 * @returns {boolean[]} An array of booleans indicating whether each day is completed.
	 */

	const getMarkedDays = (completedDays: string[], daysInMonth) => {
		const completed = completedDays.map(Number);
		return Array.from({ length: daysInMonth }, (_, idx) =>
			completed.includes(idx + 1)
		);
	};

	const daysInMonth 													 = getDaysInCurrentMonth(now),
				darknedColor 												   = Color(color).alpha(0.2).hexa(),
  			[squeareDayHabit, setSqueareDayHabit]  = useState(() => getMarkedDays(daysDone, daysInMonth)),
			  [completed, setCompleted] 						 = useState(isCompleted); // Button to mark or unmark a habit


  const taskDone = (_idHabit:string,isCompleted:boolean) => {

		const habitDone:HabitCompleted = {
			_idHabit:_idHabit,
			isCompleted:!completed,
		}

		isCompletedHabitService(habitDone)
		.then((data) => {

			const {status} = data;
			if(status == 200) {
				const updatedHabits = squeareDayHabit.map((dayDone, idx) =>
					idx === dayIndex ? !dayDone  : dayDone
				);
				setSqueareDayHabit(updatedHabits);
			}
			//data?.status == 201 ? customAlert('success','Habit created! One step closer to your goal.') : customAlert('error','Failed to create habit.')
		})
		.catch(() => {
    	//customAlert('error', 'Failed to create habit due to network or server error.');
 		});

    setCompleted(!completed);

  }


  const  SquareHabitDoneComponent = ({dayNumber,completed}) => {
    return(
        <div key={dayNumber} className={style['habit-card__tracker-habit-check'] } style={completed ? {backgroundColor:color} : {backgroundColor:darknedColor} } >
					<span className={style['habit-card__tracker-habit-days']}  style={completed ? {opacity:1} : {opacity:0.3} } >{dayNumber}</span> 
				</div>
    )
  }

  return (
    <div className={style["habit-card"]}>
        <div className={style["habit-card__header"]}>
            <div className={style['habit-card__header-icon']} style={{backgroundColor:darknedColor}} >
                <Icon icon={icon} color="white" width="40" height="40" />
            </div>
            <div className={style['habit-card__text']}>
                <Title className={style['habit-card__header-title']} level={4}> {title || 'Enter the title of your new habit'}</Title>
                <Title className={style['habit-card__header-description']} level={5}> {description || 'Add details like time, frequency, or motivation'} </Title>
            </div>
            <div className={style['habit-card__check']} style={completed ? {backgroundColor:color} : {backgroundColor:darknedColor} } >
                <Icon icon="material-symbols-light:check" color="white" width="40" height="40" onClick={() => taskDone(_idHabit,isCompleted)} />
            </div>
        </div>

        <div className={style['habit-card__tracker']}>
            {
                squeareDayHabit.map((habit,idx) => <SquareHabitDoneComponent dayNumber={idx + 1} completed={habit} />)
            }
        </div>

				<div className={style["habit-card__footer"]}>
					<p className={style['habit-card__footer-daily-month']}  >Julio 🗓️</p>
					<p className={style['habit-card__footer-daily-streak']} >Daily Streak : 0 🔥</p>
				</div>
    </div>
    )
}


HabitCardTrackerComponent.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string
}

HabitCardTrackerComponent.defaultProps = {
    title: 'Enter the title of your new habit',
    description: 'Add details like time, frequency, or motivation',
};