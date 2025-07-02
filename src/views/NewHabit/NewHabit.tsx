
import {useEffect, useState} from 'react'
import { Button, Input, Select, Alert, message, Space } from 'antd'
import { HabitCardTrackerComponent } from '../../components/HabitCardTracker/HabitCardTrackerComponent';
import { getIconService } from '../../services/searchIconService';
import { createHabitService } from '../../services/habitService';
import style from './NewHabit.module.css';
import colors from '../../data/colors.json';
import utils from '../../data/utils.json';

const { TextArea } = Input;

export const NewHabit = () => {

		interface Habit {
			title				: string;
			description : string;
			color				: string;
			isCompleted : boolean;
			icon				: string;
		}

		type AlertType = 'success' | 'error';

    const options                      		= utils?.days,
					[messageApi, contextHolder]  		= message.useMessage(),
          [title, setTitle]            		= useState<string>(''),
          [description,setDescription] 		= useState<string>(''),
          [habitColor,setHabitColor]   		= useState<string>('#ff7385'),
          [icons,setIcons]             		= useState<string[]>([]),
          [iconName, setIconName]     	  = useState<string>('sport'),
          [iconSelect,setIconSelect]   		= useState<string>('mdi:ninja-star');

    const getHabitColor  = (newColor) => setHabitColor(newColor),
          searchIconName = (e) => setIconName(e.target.value);
    

		// get search icons
    useEffect(() => {
			getIconService(iconName)
			.then((data) => setIcons(data))

    },[iconName])

    const createHabit = () => {
			if(!title.trim()){
				customAlert('error','Title is required');
				return;
			}
				const newHabit: Habit = { 
          title       : title,
          description : description,
          color       : habitColor,
          isCompleted : false,
          icon        : iconSelect
      	}

				createHabitService(newHabit)
				.then((data) => {
					data?.status == 201 ? customAlert('success','Habit created! One step closer to your goal.') : customAlert('error','Failed to create habit.')
				})
				.catch(() => {
    			customAlert('error', 'Failed to create habit due to network or server error.');
 				});
				
    }

/**TODO UODATE WITH ZUSTAND */
 const customAlert = (alert:AlertType,message:String) => {
		messageApi.open({
        type: alert === 'success' ? 'success' : 'error',
        content: message
      });
 }
		

  return (
    
    <>
				{/* notificacion */}
				{contextHolder} 
        <HabitCardTrackerComponent title={title} description={description} color={habitColor} icon={iconSelect}/>
       
        <h3 className={style['habit-input-title']}>Habit name</h3>
        <Input  placeholder={title} onChange={(e) => setTitle(e.target.value)} />
        <h3 className={style['habit-input-title']}>Description</h3>
        <TextArea rows={4} maxLength={100} placeholder={description} onChange={(e) => setDescription(e.target.value)} />
        
        <h3 className={style['habit-input-title']}>Days</h3>
        
				{/* TODO include days */}
        {/* <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={(e) => getDayHabit(e)}
          options={options}
        /> */}

        <h3 className={style['habit-input-title']}>Habit Color</h3>

        <div className={style["habit-color-container"]}>
          {
            Object.entries(colors).map(([name, hex]) => 
              <div className={style['habit-color-container__color']} style={{ backgroundColor: hex}} onClick={()=> getHabitColor(hex)} ></div>
            )
          }
        </div>

        
        <h3 className={style['habit-input-title']} >Search Icon</h3>

        <Input onChange={(e) => searchIconName(e)}/>
          <div className={style.habitContainer}>
            {
              icons?.map((icon,idx) => 
                <div  className={style.habitContainer__btnHabit}>
                <img src={`https://api.iconify.design/${icon}.svg?color=white`} width="150" height="150" onClick={()=>setIconSelect(icon)} />
              </div>
              )
            }
          </div>

        <Button  color="purple" variant="solid" style={{ height: '50px' ,lineHeight: '50px'}} onClick={() => createHabit()} >Create habit</Button>
      
    </>
  )
}
