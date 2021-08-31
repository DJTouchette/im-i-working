import logo from './logo.svg';
import './App.css';
import getDates from './getDates';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { Card, Label, Input, Button } from 'semantic-ui-react'
import Calendar from 'react-awesome-calendar';
import "react-datepicker/dist/react-datepicker.css";
import 'semantic-ui-css/semantic.min.css'

function Cal({daysOff, daysOn, isOff, startMonth, startYear, year, month, day}) {
  const events = [];
  let id = 0;
  daysOn.flat().forEach((date) => {
    events.push({ id, from: date.toISOString(), to: date.toISOString(), title: 'Working', color: '#1ccb9e'})
    id += 1;
  });
  daysOff.flat().forEach((datee) => {
    events.push({ id, from: datee.toISOString(), to: datee.toISOString(), title: 'Off', color: '#fd3153'})
    id += 1;
  });
  console.log(year, month, day)

  return (
    <Calendar
      events={events}
      year={year}
      month={month}
      day={day}
      xurrent={{year, month, day}}
    />
  );
  
}


function App() {
  const [days, setDays] = useState({daysOff: [], daysOn: [], isOff: false, hasRan: false});
  const [startDate, setStartDate] = useState(new Date());
  const [daysWorked, setDaysWorked] = useState(1);
  const [queryDate, setQueryDate] = useState(new Date());

  const handleCheck = () => {
    const dates = getDates(queryDate, daysWorked, startDate)
    setDays({...dates, hasRan: true});
  };

  return (
    <div>
      {days.hasRan ? <h1 style={{textAlign: 'center', marginTop: '10px'}}>{days.isOff ? "You are off !" : "You are not off !"}</h1>: null}
    <div className="App">
      <header className="App-header">
      </header>
      {days.hasRan ? null : 

      <Card>
        <Card.Content header='Are you working?' />
        <Card.Content extra>
          <Label>
            My next set starts on:
          </Label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
          <Label>
            Date to check:
          </Label>
          <DatePicker selected={queryDate} onChange={(date) => setQueryDate(date)} />
          <Label>
            How many days do you work for?
          </Label>
          <Input type="number" onChange={(e, data) => setDaysWorked(Number(data.value))}/>
          <Button onClick={handleCheck}>Check</Button>
        </Card.Content>
      </Card>
      }


        {days.hasRan ? <Cal {...days} year={queryDate.getUTCFullYear()} month={queryDate.getUTCMonth()} day={queryDate.getUTCDate()}  /> : null}
    </div>
    </div>
  );
}

export default App;
