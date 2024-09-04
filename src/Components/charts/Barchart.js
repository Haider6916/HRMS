import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
     title: {
                display: false,
                text: 'Custom Chart Title'
    }

  },
   scales: {
       y: {
                suggestedMin: 8,
                suggestedMax: 9
            }
    }

};

// const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Barchart = ({ overviewState }) => {

  const graphData = overviewState?.GraphAttendance ? overviewState?.GraphAttendance : []

  const [statusColors, setstatusColors] = useState([])
  const [graphDays, setGraphDays] = useState([])

  useEffect(() => {
    colorGraph(overviewState?.GraphAttendance)
    DaysGraph(overviewState?.GraphAttendance)
    console.log("overviewState?.GraphAttendance", overviewState?.GraphAttendance);
  }, [overviewState])
  
  
  const colorGraph = (graphData)=>{
    // green color = #38CB89, blue color = #0098C9, orange color = #FFA600, red color =#FF5630
   const arr = graphData?.map((item)=> {
      if(item.status === "Present"){
        return '#0098C9'
      } 
      else if(item.status === "Late"){
        return '#FFA600'
      }else if (item.status === "Absent"){
        return '#FF5630'
      }else{
        return '#38CB89'
      }
    })
    setstatusColors(arr)
  }

  const DaysGraph =(graphData)=>{
    let arr =[]
     graphData?.map((item, index)=> {
      arr.splice(index, 0, moment(item.createdAt).format('ddd'))
      setGraphDays(arr)
     })
  }

  const data = {
     
    labels: graphDays,
    datasets: [
      {
        data: graphData?.map((item)=> item.hoursWorked / 60),
        backgroundColor: statusColors,
        barPercentage: 0.15,
        borderRadius: 15,
      },
    ],
  };


  return (
    <Bar options={options} data={data} />
  )
}

export default Barchart