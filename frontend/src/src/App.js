import React, { useState } from 'react';
import './App.css';
import $ from 'jquery';


const taxiRides = [
  {
    "id": 1,
    "distance": 2,
    "startTime": "2020-06-19T13:01:17.031Z",
    "duration": 9000
  },
  {
    "id": 2,
    "distance": 1,
    "startTime": "2020-06-19T12:01:17.031Z",
    "duration": 6000
  },
  {
    "id": 3,
    "distance": 5,
    "startTime": "2020-06-19T14:01:17.031Z",
    "duration": 7000
  },
  {
    "id": 4, "distance": 5,
    "startTime": "2020-06-19T14:11:17.031Z",
    "duration": 4000
  }]
  ;





function TaxiRide(props) {

  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [price, setPrice] = useState('');
  const url = 'http://localhost:8888/taxi/ride';

  $.ajax({
    type: "POST",
    url: url,
    contentType:"application/json; charset=utf-8",
    data: JSON.stringify(props.item),
    
    success: function (res) {
      setPrice(res);
    }
  });

  return (
    <div>
      { showPopup ?
        <Popup
          elt={props.item}
          closePopup={() => {
            setShowPopup(false)
          }}
        /> : null
      }
      <div className={props.item.distance > 2 ? 'App-ride clicked' : 'App-ride'} onClick={() => {
        setClicked(true);
        setShowPopup(true);
      }}>
      <span>Ride Id:</span>  {props.item.id}
        {clicked ? <div>Clicked</div> : <div />}
        <span>Ride price:</span>   <div>{price} </div>
      </div>
    </div>
  );
}


function Popup(props) {
  let startTime = Date.parse(props.elt.startTime);
  let sum = startTime+props.elt.duration*1000;
  let endTimeSec = new Date();
  endTimeSec.setTime(sum);
  let endTime = endTimeSec.toISOString();

  let duration = toTimeString(props.elt.duration);
  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h1>{props.elt.id}</h1>
        <h1>{props.elt.startTime}</h1>
        <h1>{endTime}</h1>
        <h1>{duration}</h1>
        <button onClick={props.closePopup}>close me</button>
      </div>
    </div>
  );
}

function toTimeString(seconds) {
  return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}


function App() {
  return (
    <div id="root"> <IdiomaticReactList items={taxiRides}></IdiomaticReactList></div>
  )
}

function IdiomaticReactList(props) {
  return (
    <div >
      {props.items.map((item, index) => (
        <TaxiRide key={item.id} item={item} />

      ))}
    </div>
  );
}

export default App;
