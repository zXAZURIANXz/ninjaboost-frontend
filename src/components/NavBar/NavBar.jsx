



import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;

import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import style from './NavBar.module.css';

export const NavBar = () => {


  const navigate = useNavigate();

  const goToNewHabit = () => {
    navigate('/newHabit');
  }

  return (
    <Header 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          padding: '0px 10px',
          display: 'flex',
          color:'white',
          backgroundColor: '#000000',
          justifyContent:'space-between'
        }}
    >
      <div className={style['nav_bar__icons']}>
        <Icon className={style['nav_bar__icons']} icon="material-symbols-light:settings-outline-rounded" color="white" width="40" height="40" onClick={() => taskDone()} />
      </div>
        <h2> Ninja Boost </h2>
      <div className={style['nav_bar__icons']}>
        <Icon icon="material-symbols-light:add-circle-outline-rounded" color="white" width="40" height="40" onClick={() => goToNewHabit()} />
      </div>
        
      
    </Header>
      
  )
}
