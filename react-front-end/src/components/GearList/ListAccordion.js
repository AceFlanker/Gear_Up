import React, { useState, useEffect } from 'react';
import './ListAccordion.css'
import axios from 'axios';


const ListAccordion = ({ category, gears, tripID }) => {
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setComplete] = useState("");

  const handler = (gear) => {
    if (!gear.checked && gear.id) {
      gear.checked = true
      setComplete(makeid(5))
      axios.put(`/api/userGear/update/${tripID}`,
        {
          "type_id": gear.id,
          "checked": true
        }
      )
    }
    else {
      gear.checked = false
      setComplete(makeid(5))
      axios.put(`/api/userGear/update/${tripID}`,
        {
          "type_id": gear.id,
          "checked": false
        }
      )
    }

  }

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  return (
    <>
      <div className="accordion-item">
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>{category}</div>
          <div>{isActive ? '-' : '+'}</div>
        </div>
        {gears.map((gear) => (
          isActive &&
          <div style={{
            textDecoration: gear.checked && 'line-through'
          }} className="accordion-content" key={gear.id} onClick={() => handler(gear)}>
            {gear.name}
            <input type="checkbox" id={gear.id} key={gear.id} checked={gear.checked}  style={{float:'right'}}></input>
          </div>
        ))}

      </div>

    </>
  );




};

export default ListAccordion;