



import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import style from './HabitNotFound.module.css'

export const HabitNotFound = () => {
  return (
    <div className={style['not_found_container']}>
        <Icon icon="material-symbols-light:add-circle-outline-rounded" color="white" width="40" height="40" />
        <h2> No Habit found </h2>
        <span>create a new habit to track your </span>
    </div>
  )
}
