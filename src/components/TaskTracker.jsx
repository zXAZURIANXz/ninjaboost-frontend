



import { Row } from 'antd';
import React from 'react'

export const TaskTracker = () => {

  const getDaysInMonth = (year, month) => {
    // Mes es 0-indexado (0 = Enero, 1 = Febrero, ..., 11 = Diciembre)
    return new Date(year, month + 1, 0).getDate();
  }

  const totalDays = getDaysInMonth(2025, 3),
        daysInMonth = new Array(totalDays).fill(0),
        days = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];

  const ActivityStatus = ({color}) => {
    return(
      <div style={{ 
        width:'30px',
        height:'30px',
        border:`1px solid ${color}`,
        borderRadius:'5px',
        backgroundColor: color, 
        marginLeft:'5px' }} >  
      </div>
    )
  }

  return (
    <div>
      {
        days.map((day) =>
          <>
              <Row style={{marginBottom:'10px'}}>
                <p style={{minWidth:'90px'}}>{day}</p>
                {
                  daysInMonth.map((activity) => 
                    <ActivityStatus  color={'#56d364'}/>
                  )
                }
              </Row>
          </>
        )
      }
    </div>
  )
}
