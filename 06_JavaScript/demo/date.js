/**
 * 
 * @param {string} start 
 * @param {string} end 
 * @param {string} delimeter 
 * @returns date (string[])
 */
function getInterDate(start, end, delimeter = '') {
  const startTime = getLinuxTime(start.replaceAll(delimeter, ''));
  const endTime = getLinuxTime(end.replaceAll(delimeter, ''));

  const dayMiliis = 24 * 60 * 60 * 1_000;

  const returnDate = [];

  for (let linuxTime = startTime; linuxTime <= endTime; linuxTime += dayMiliis) {
    const curDate = transLinuxTimeToDate(linuxTime, delimeter);
    let day = '';

    if (delimeter === '') {
      day = curDate.slice(6);
    } else {
      day = curDate.split(delimeter)[2];
    }

    if (Number(day) === 1) {
      returnDate.pop();
    } else {
      returnDate.push(curDate);
    }

  }

  return returnDate;
}

/**
 * 
 * @param {number} date 
 * @returns linuxTime (number)
 */
function getLinuxTime(date) {

  let year = Number(date.slice(0, 4));
  let month = Number(date.slice(4, 6)) -1;
  let day = Number(date.slice(6));

  let tgtDate = new Date();
  tgtDate.setFullYear(year);
  tgtDate.setMonth(month);
  tgtDate.setDate(day);

  tgtDate.setHours(0);
  tgtDate.setMinutes(0);
  tgtDate.setSeconds(0);
  tgtDate.setMilliseconds(0);

  return tgtDate.getTime();
}

/**
 * 
 * @param {number} linuxTime 
 * @param {string} delimeter 
 * @returns formatted date (string)
 */
function transLinuxTimeToDate(linuxTime, delimeter = '') {
  let date = new Date(linuxTime);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${ month }`;
  }

  if (day < 10) {
    day = `0${ day }`;
  }

  return [year, month, day].join(delimeter);
}

// test
console.log(getInterDate('2021-01-01', '2021-04-04', '-'));