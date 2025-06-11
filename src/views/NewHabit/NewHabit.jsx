



import React, {useEffect, useState} from 'react'
import { Button, Input, Select } from 'antd'
import style from './NewHabit.module.css'
import colors from '../../data/colors.json';
import utils from '../../data/utils.json';
import { HabitCardTrackerComponent } from '../../components/HabitCardTracker/HabitCardTrackerComponent';
const { TextArea } = Input;

export const NewHabit = () => {

    const options                      = utils?.days,
          [title, setTitle]            = useState('Enter the title of your new habit'),
          [description,setDescription] = useState('Add details like time, frequency, or motivation'),
          [habitColor,setHabitColor]   = useState('#ff7385'),
          [icons,setIcons]             = useState(),
          [iconName, setIconName]      = useState('sport'),
          [iconSelect,setIconSelect]   = useState('mdi:ninja-star');



    const getHabitColor = (newColor) => setHabitColor(newColor),
          searchIconName = (e) => setIconName(e.target.value);
    

    useEffect(() => {
      fetch(`${utils.iconsApiSearch}${iconName}&limit=40`)
      .then((res) => res.json())
      .then((data) => setIcons(data.icons))
      .catch((error) => {
        console.log(error);
      })

    },[iconName])


    const createHabit = () => {

      const newHabit = { 

          id          : "1",
          title       : habitTitle,
          description : habitDes,
          color       : habitColor,
          complete    : false,
          icon        : iconSelect
      
      }

      console.log(newHabit);

    }

    return (
    
    <>

        <HabitCardTrackerComponent title={title} description={description} color={habitColor} icon={iconSelect}/>

        
       
        <h2>Habit name</h2>
        <Input  placeholder={title} onChange={(e) => setTitle(e.target.value)}/>
        <h3>Description</h3>
        <TextArea rows={4} maxLength={100} placeholder={description} onChange={(e) => setDescription(e.target.value)} />
        
        <h3>Days</h3>
        
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={(e) => getDayHabit(e)}
          options={options}
        />

        <h3>Color</h3>

        <div className={style["habit-color-container"]}>

          {
            Object.entries(colors).map(([name, hex]) => 
              
              <div className={style['habit-color-container__color']} style={{ backgroundColor: hex}} onClick={()=> getHabitColor(hex)} ></div>
              
            )
          }

        </div>

        
        <h3>Search Icon</h3>

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
