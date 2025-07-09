
import { useState } from "react";
import { HabitNotFound } from "../../components/HabitNotFound/HabitNotFound";
import { getHabits } from "../../services/habitService";
import { useEffect } from "react";
import { HabitCardTrackerComponent } from "../../components/HabitCardTracker/HabitCardTrackerComponent"; 

export const Home = () => {

	interface Habit {
			_id		  				: string;
			title						: string;
			description 		: string;
			color						: string;
			completedDates	: string[];
			icon						: string;
		}

	const [habits, setHabits] = useState([]);
	const [days, setDays] = useState([]);

	useEffect(() => {
		
		getHabits()
		.then(({ data }) => {
			console.log(data)
			setHabits(data);
		
		});
	
	}, []);

	const getNumberDay = (completedDates:string[]) =>{

	
			const x = completedDates.map((dateStr) => dateStr.split("-")[2])
		
		

		return x

	}

	//console.log(getNumberDay(),'<.--numero de dias');

  return (
    <div >


				{
					habits.map((habit:Habit,idx) => 

						<HabitCardTrackerComponent _idHabit={habit._id} title={habit.title} description={habit.description} color={habit.color} icon={habit.icon} daysDone={getNumberDay(habit.completedDates)} />
					)
				}
				<HabitNotFound />
			
      
    
    </div>
  );
};
