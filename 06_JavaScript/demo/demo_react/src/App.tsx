import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import { Button, DatePicker } from 'antd'
import moment, { Moment } from 'moment';

function App() {

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const [dateRange, setDateRange] = useState([moment(), moment()]);

  return (
    <>
      <RangePicker
        allowClear={ true }
        format={ dateFormat }
        value={ dateRange as [Moment, Moment] }
        onChange={e => {
          let psDate = moment(e?.[0]);
          let peDate = moment(e?.[1]);

          setDateRange([psDate, peDate]);
        }}
      />
      <br/>
      <Button
        type="primary"
        onClick={e => {
          console.log('psDate', dateRange[0].format(dateFormat));
          console.log('peDate', dateRange[1].format(dateFormat));
          // console.log(rangePicker.current.value)
        }}
        >
          INIT
        </Button>
    </>
  );
}

export default App;
