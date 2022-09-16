function getInterDate(start, end) {
  const startTime = getLinuxTime(start);
  const endTime = getLinuxTime(end);

  const dayMiliis = 24 * 60 * 60 * 1_000;

  const returnDate = [];

  for (let i = startTime; i <= endTime; i+=dayMiliis) {
    const curDate = transLinuxTimeToDate(i);

    if (Number(curDate.slice(6)) === 1) {
      returnDate.pop();
    } else {
      returnDate.push(curDate);
    }

  }

  return returnDate;
}

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

function transLinuxTimeToDate(linuxTime) {
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

  return `${ year }${ month }${ day }`;
}