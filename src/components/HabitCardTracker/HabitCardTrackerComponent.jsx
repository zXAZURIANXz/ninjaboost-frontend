import React, {useEffect, useState} from 'react'
import style from './HabitCardTrackerComponent.module.css'
import PropTypes from 'prop-types';
import { Typography } from "antd";
import { Icon } from '@iconify/react';
import Color from 'color';

const { Title } = Typography;


export const HabitCardTrackerComponent = ({title,description,color,icon}) => {

  const [isChecked, setIsChecked] = useState(false);
  const [squeareHabit, setSqueareHabit ] = useState(Array(200).fill(false));

  const darknedColor = Color(color).alpha(0.2).hexa();
  const taskDone = () => {


    setSqueareHabit(preHabits => {

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
    console.log(isChecked);

    //checar todos los divs

  }


  const  SquareHabitDoneComponent = ({index,isChecked}) => {

    console.log(isChecked);
    return(
        <div key={index} className={style['habit-card__tracker-habit-check'] } style={isChecked ? {backgroundColor:color} : {backgroundColor:darknedColor} }  ></div>
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
                <Icon icon="material-symbols-light:check" color="white" width="40" height="40" onClick={() => taskDone()} />
            </div>
        </div>

        <div className={style['habit-card__tracker']}>
            {
                squeareHabit.map((habit,idx) =>                 
                    <SquareHabitDoneComponent idx={idx} isChecked={habit} />
                )
            }
						
        </div>
				<p className={style['habit-card__daily-streak']} level={5}>Daily Streak : 0 🔥</p>
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