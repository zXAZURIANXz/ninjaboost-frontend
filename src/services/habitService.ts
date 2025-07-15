

import axios from "axios";
import utils from '../data/utils.json';

interface Habit {
			title				: string;
			description : string;
			color				: string;
			isCompleted	: boolean;
			icon				: string;
}

interface HabitCompleted {
		_idHabit		:	String;
		isCompleted	:	Boolean
} 

const { devUrl } = utils;

export const createHabitService = (habit: Habit) => {
  return axios.post(`${devUrl}/habits`, habit)
    .catch(err => {
      console.error('Error creating habit:', err);
      throw err;
    });
};

export const getHabits = () => {
  return axios.get(`${devUrl}/habits`)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

/* update is completed habit */

export const isCompletedHabitService = (habit: HabitCompleted) => {
  console.log(JSON.stringify(habit));
  console.log(`${devUrl}/habits/complete`);

  return axios.post(`${devUrl}/habits/complete`, habit)
    .catch(err => {
      console.error('Error completing habit:', err);
      throw err;
    });
};