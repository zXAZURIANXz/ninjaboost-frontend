import React, {useEffect, useState} from 'react'
import style from './HabitCardTrackerComponent.module.css'
import PropTypes from 'prop-types';
import { Typography } from "antd";
import { Icon } from '@iconify/react';
import Color from 'color';
import { isCompletedHabitService } from '../../services/habitService';

const { Title } = Typography;

export const HabitCardTrackerComponent = ({_idHabit,title,description,color,icon,daysDone}) => {

	console.log(daysDone,'<-----DIAS DEL HABITO COMPONENTE');

	const completed = daysDone.map((d) => Number(d));

	interface HabitCompleted {
		_idHabit		: String,
		isCompleted : Boolean
	}

	const getDaysInCurrentMonth = () => {
		 const now   			 = new Date(),
					 year 	 		 = now.getFullYear(),
					 month 			 = now.getMonth(), // 0-indexado: enero = 0
		 			 daysInMonth = new Date(year, month + 1, 0).getDate();
		return daysInMonth;
	};

	const daysInMonth 													 = getDaysInCurrentMonth();
  const [isChecked, setIsChecked] 						 = useState(false);
  const [squeareDayHabit, setSqueareDayHabit ] = useState(Array(daysInMonth).fill(false));

  const darknedColor = Color(color).alpha(0.2).hexa();

  const taskDone = (_idHabit:string) => {

		const habitDone:HabitCompleted = {
			_idHabit:_idHabit,
			isCompleted:true,
		}

		console.log(habitDone,'habit');
		// isCompletedHabitService(habitDone)
		// .then((data) => {
		// 	console.log('ok')
		// 			//data?.status == 201 ? customAlert('success','Habit created! One step closer to your goal.') : customAlert('error','Failed to create habit.')
		// 		})
		// 		.catch(() => {
    // 			//customAlert('error', 'Failed to create habit due to network or server error.');
 		// 		});

		console.log(_idHabit)

    setSqueareDayHabit(preHabits => {
        const newHabits = [...preHabits];
        for (let i = 0; i < newHabits.length; i++) {
            if (!newHabits[i]) {
              newHabits[i] = true; // Activamos ese hábito
              break; // Salimos del bucle, ya que solo queremos activar uno
            }else{
            newHabits[i] = false; // Activamos ese hábito
              break;
            }
          }
          return newHabits;
    })
    setIsChecked(!isChecked);
  }


const getMarkedDays = (completedDays: string[], daysInMonth) => {
  const completed = completedDays.map(Number);
  return Array.from({ length: daysInMonth }, (_, idx) =>
    completed.includes(idx + 1)
  );
};

console.log(getMarkedDays(daysDone,daysInMonth),'asasd');
  const  SquareHabitDoneComponent = ({dayNumber,isChecked}) => {
    return(
        <div key={dayNumber} className={style['habit-card__tracker-habit-check'] } style={isChecked ? {backgroundColor:color} : {backgroundColor:darknedColor} } >
					<span className={style['habit-card__tracker-habit-days']}  style={isChecked ? {opacity:1} : {opacity:0.3} } >{dayNumber}</span> 
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
            <div className={style['habit-card__check']} style={isChecked ? {backgroundColor:color} : {backgroundColor:darknedColor} } >
                <Icon icon="material-symbols-light:check" color="white" width="40" height="40" onClick={() => taskDone(_idHabit)} />
            </div>
        </div>

        <div className={style['habit-card__tracker']}>
            {
                squeareDayHabit.map((habit,idx) => <SquareHabitDoneComponent dayNumber={idx + 1} isChecked={habit} />)
            }
        </div>

				<div className={style["habit-card__footer"]}>
					<p className={style['habit-card__footer-daily-month']}  level={5}>Julio 🗓️</p>
					<p className={style['habit-card__footer-daily-streak']} level={5}>Daily Streak : 0 🔥</p>
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