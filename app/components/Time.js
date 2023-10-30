function myHourlyFunction(condition) {
  const millisecondsInAnHour = 3600000;
  const intervalId = setInterval(() => {
    console.log(condition);
    if (condition) {
      clearInterval(intervalId);
    } else {
      console.log('Reloading the page.');
      location.reload(); // Reload the current page
    }
  }, millisecondsInAnHour);
}

// Calculate the time until the next hour
function timeUntilNextHour() {
  const now = new Date();
  const minutesUntilNextHour = 60 - now.getMinutes();
  const secondsUntilNextHour = 60 - now.getSeconds();
  const millisecondsUntilNextHour =
    (minutesUntilNextHour * 60 + secondsUntilNextHour) * 1000;
  return millisecondsUntilNextHour;
}

export { myHourlyFunction, timeUntilNextHour };
