import React, { useEffect, useState } from 'react'
import HrAttends from '../../../Components/HrViews'

import { apiServices } from '../../../Services/apiServices'

const HrAttend = () => {
    const [hrHttends,sethrAttends] = useState([])

    useEffect(()=>{
        apiServices("GET","attendance/").then(res=>{
            sethrAttends(res?.data?.Attendance?.docs)
        })
    },[])



  return (
    <div>
        <HrAttends
        hrHttends={hrHttends}
        
        />
    </div>
  )
}

export default HrAttend