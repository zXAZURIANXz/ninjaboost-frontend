

import axios from "axios";
import utils from '../data/utils.json';

const { devUrl } = utils;

interface Habit {
			title				: string;
			description : string;
			color				: string;
			isCompleted	: boolean;
			icon				: string;
}


/**  CREATE NEW HABIT */
export const createHabitService = (habit:Habit) => {

	return axios.post(`${devUrl}/habits`, habit)
				 .then(function(response){
					return response
				 })
				 .catch(function(err){
					console.log(err)
				 })
				 .finally(function(){})

}

/**  GET HABITS */
export const getHabits = () => {

	return axios.get(`${devUrl}/habits`)
				 .then(function(response){
					return response
				 })
				 .catch(function(err){
					console.log(err)
				 })
 				.finally(function(){})
}


/**  isCompleted HABIT */


export const completedHabit = (_id:number) => {

	return axios.patch(`${devUrl}/habits/${_id}`)
				.then(function(response) {
					return response
				})
				.catch(function(err){
					console.log(err)
				})
				.finally(function(){})

}