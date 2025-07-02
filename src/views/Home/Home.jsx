

import style from "./Home.module.css";
import { useState } from "react";
import { HabitNotFound } from "../../components/HabitNotFound/HabitNotFound";
import { getHabits } from "../../services/habitService";
import { useEffect } from "react";
import { HabitCardTrackerComponent} from '../../components/HabitCardTracker/HabitCardTrackerComponent';

export const Home = () => {

	const [habits, setHabits] = useState([]);

	useEffect(() => {
		
		getHabits()
		.then(({ data }) => {
			console.log(data)
			setHabits(data);
		
		});
	
	}, []);

  return (
    <div >


				{
					habits.map((habit,idx) => 
					
						<HabitCardTrackerComponent title={habit.title} description={habit.description} color={habit.color} icon={habit.icon} />
					
					)
				}
				<HabitNotFound />
			
      
    
    </div>
  );
};
