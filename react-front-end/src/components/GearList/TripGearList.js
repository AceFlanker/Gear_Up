import React, { useState, useEffect } from 'react';
import './TripGearList.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ListAccordion from './ListAccordion';

const TripGearList = props => {

  const [trip, setTrip] = useState(0);
  const [gearList, setGearList] = useState([]);
  const history = useLocation();


  useEffect(() => {


      let queryPath = null;
      props.tripID ? queryPath = `/api/calendar/userGearList/${props.tripID}` : queryPath = history.pathname;
      axios.get(queryPath)
        .then((res) => {
          setTrip(res.data[0].trip_id)
  
          function createGearObject() {
            const categories = [];
            for (let item of res.data) {
              if (!categories.includes(item.category)) {
                categories.push(item.category)
              }
            }
            const gearId = [];
            const gearList = [];
            for (let category of categories) {
              const userGearList = {}
              userGearList["id"] = categories.indexOf(category);
              userGearList["category"] = category;
              userGearList["gears"] = [];
              for (let gear of res.data) {
                if (category === gear.category) {
                  gearId.push(gear.id);
                  userGearList["gears"].push({ "id": gear.id, "name": gear.type, checked: gear.checked });
                }
              }
              gearList.push(userGearList);
            }
            setGearList(gearList);
            return gearId;
          }
          createGearObject()
        })

  }, [props.tripID])


  return (
    <>
      <div className="accordion" >
        {gearList.map((item) => (
          <>
            {console.log("0999:", item)}
            < ListAccordion key={item.id} category={item.category} gears={item.gears} tripID={trip} />
          </>

        ))}
      </div>

    </>
  );
};

export default TripGearList;