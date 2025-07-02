

import axios from "axios";
import utils from '../data/utils.json';

interface Habit {
			title				: string;
			description : string;
			color				: string;
			isCompleted	: boolean;
			icon				: string;
}


export const createHabitService = (habit:Habit) => {

	return axios.post(`${utils.devUrl}/habits`, habit)
				 .then(function(response){
					return response
				 })
				 .catch(function(err){
					console.log(err)
				 })
				 .finally(function(){})

}

export const getHabits = () => {

	return axios.get(`${utils.devUrl}/habits`)
				 .then(function(response){
					return response
				 })
				 .catch(function(err){
					console.log(err)
				 })
 				.finally(function(){})
}