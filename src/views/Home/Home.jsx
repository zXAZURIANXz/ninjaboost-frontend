

import style from "./Home.module.css";
import { HabitNotFound } from "../../components/HabitNotFound/HabitNotFound";

export const Home = () => {

  return (
    <div className={style.home_container}>
      
      <HabitNotFound />
    
    </div>
  );
};
