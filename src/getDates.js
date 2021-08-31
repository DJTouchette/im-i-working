const startDayDefault = new Date();

function getDates(queryDate, daysWork, startDay = startDayDefault, weeks = 500) {
  let isWorking = true;
  let daysOff = [];
  let daysOn = [];

  const getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
  };

  let date = startDay;
  const addDays = (date, days = 1) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const dateRange = (start, end, range = []) => {
    if (start > end) return range;
    const next = addDays(start, 1);
    return dateRange(next, end, [...range, start]);
  };

  for(var i = 0; i < weeks; i ++) {
    const currentDate = date;
    const in7Days = addDays(currentDate, daysWork);
    if (isWorking) {
      daysOn.push(dateRange(currentDate, in7Days));
    } else {
      daysOff.push(dateRange(currentDate, in7Days));
    }

    date = addDays(date, daysWork + 1)
    isWorking = !isWorking;
  }

  const queryOffDate = queryDate; 

  const queryOffDateMonth = queryOffDate.getUTCMonth() + 1
  const queryOffDateDay = queryOffDate.getUTCDate()
  const queryOffDateYear = queryOffDate.getUTCFullYear()

  let foundRange = false
  let range = []
  let dayOff = 0;
  daysOff.forEach((dateRange) => {
    let dayI = 1;
    dateRange.forEach((date) => {
      const month = date.getUTCMonth() + 1
      const day = date.getUTCDate()
      const year = date.getUTCFullYear()

      if (queryOffDateYear === year && queryOffDateMonth === month && queryOffDateDay == day) {
        foundRange = true;
        range = dateRange
        dayOff = dayI
      }
      dayI += 1;
    });
  });

  if (foundRange) {
    console.log('Your off !!')
    console.log(`It is your ${dayOff} day off`)
    return {daysOn, daysOff, isOff: true};
  } else {
    daysOn.forEach((dateRange) => {
      let dayI = 1;
      dateRange.forEach((date) => {
        const month = date.getUTCMonth() + 1
        const day = date.getUTCDate()
        const year = date.getUTCFullYear()
        if (queryOffDateYear === year && queryOffDateMonth === month && queryOffDateDay == day) {
          foundRange = true;
          range = dateRange
          dayOff = dayI
        }
        dayI += 1;
      });
    });

    console.log('Your working')
    console.log(`It is your ${dayOff} day of working`)
    console.log(range)

    return {daysOn, daysOff, isOff: false};
  }

}

export default getDates;
