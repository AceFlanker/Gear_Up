
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import WeatherApp from '../components/Weather/WeatherApp';
import './Styles/Dashboard.scss';
import { FutureTrips } from '../components/Dashboard/FutureTrips';
import FriendList from '../components/Friendship/Friendlist'
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Dashboard = () => {
  
  const [friendList, setFriendList] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [trip1, setTrip1] = useState(null);
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/friendlist/${user_id}`)
    .then((res)=>{
      setFriendList([...res.data]);
    })
  }, [])
  
  useEffect(()=>{
    const user_id=localStorage.getItem('user_id');
    axios.get(`api/trips/dashboard/${user_id}`)
    .then((res)=>{
      setUpcomingTrips([...res.data]);
    })
  }, [])
 
  return (
    <div className="">
      {/* <Grid container spacing={1}>
        <Grid item xs={7}>
          <Item><FutureTrips upcomingTrips={upcomingTrips}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><FriendList/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>  <WeatherApp /></Item>
        </Grid>
      </Grid> */}
      <div className="trip-container">
        <FutureTrips upcomingTrips={upcomingTrips}/>
      </div>
       {/* <div className="friend-list-container">
        <FriendList/>
        </div> */}
      <div className="weather-app-container">
        <WeatherApp />
      </div>

    </div>
  )
}
export default Dashboard;
