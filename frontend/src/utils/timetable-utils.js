export const dailyEvents = (event) => {
  let modifiedEvents = [];
  for (let i = 0; i < 50; i++) {
    const startDateInMillis = new Date(event.eventId.startTime).getTime();
    const endDateInMillis = new Date(event.eventId.endTime).getTime();
    const _event = { ...event.eventId };
    _event.startTime = new Date(startDateInMillis + i * 86400000);
    _event.endTime = new Date(endDateInMillis + i * 86400000);
    modifiedEvents.push(_event);
  }

  return modifiedEvents;
};

export const weeklyEvents = (event) => {
  let modifiedEvents = [];
  for (let i = 0; i < 30; i++) {
    const startDateInMillis = new Date(event.eventId.startTime).getTime();
    const endDateInMillis = new Date(event.eventId.endTime).getTime();
    const _event = { ...event.eventId };
    _event.startTime = new Date(startDateInMillis + 7 * i * 86400000);
    _event.endTime = new Date(endDateInMillis + 7 * i * 86400000);
    modifiedEvents.push(_event);
  }

  return modifiedEvents;
};
