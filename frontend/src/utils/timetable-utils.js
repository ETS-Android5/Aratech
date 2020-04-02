//merge both class timetable and personal timetable
export const mergeTimetables = (clasTimetable, personalTimetable) => {
  let timetable = {
    monday: [...clasTimetable.monday, ...personalTimetable.monday],
    tuesday: [...clasTimetable.tuesday, ...personalTimetable.tuesday],
    wednesday: [...clasTimetable.wednesday, ...personalTimetable.wednesday],
    thursday: [...clasTimetable.thursday, ...personalTimetable.thursday],
    friday: [...clasTimetable.friday, ...personalTimetable.friday],
    saturday: [...clasTimetable.saturday, ...personalTimetable.saturday],
    sunday: [...clasTimetable.sunday, ...personalTimetable.sunday]
  };

  return timetable;
};

//turn all events into one big array of events
export const makeEventsArray = timetable => {
  //delete userId if present
  delete timetable.userId;

  let events = [
    ...timetable.monday,
    ...timetable.tuesday,
    ...timetable.wednesday,
    ...timetable.thursday,
    ...timetable.friday,
    ...timetable.saturday,
    ...timetable.sunday
  ];

  return events;
};
