import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Button, DatePicker } from 'antd'
import moment, { Moment } from 'moment';

import Parent from './components/ref/Parent';

function App() {

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const [dateRange, setDateRange] = useState([moment(), moment()]);
  const [isChaged, setIsChanged] = useState(false);

  useEffect(() => {
    console.log(isChaged);
  }, [isChaged]);

  return (
    <>
      <RangePicker
        allowClear={ true }
        format={ dateFormat }
        value={ dateRange as [Moment, Moment] }
        onChange={e => {
          let psDate = moment(e?.[0]);
          let peDate = moment(e?.[1]);

          setIsChanged(true);

          setDateRange([psDate, peDate]);
        }}
      />
      <br/>
      <Button
        type="primary"
        onClick={e => {
          console.log('psDate', dateRange[0].format(dateFormat));
          console.log('peDate', dateRange[1].format(dateFormat));

          setIsChanged(false);
          setDateRange([moment(), moment()])
          // console.log(rangePicker.current.value)
        }}
        >
          INIT
        </Button>
        <Parent />
    </>
  );
}

export default App;
