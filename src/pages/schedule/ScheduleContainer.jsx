
import { useState } from "react";
import ScheduleView from "./ScheduleView";

const initialEvents = [
  {
    id: 1,
    title: "Kuliah POPL",
    type: "Kuliah",
    date: "2026-10-12",
    start: "09:00",
    end: "11:00",
    color: "blue",
  },
  {
    id: 2,
    title: "Kuis Data Mining",
    type: "Kuis",
    date: "2026-10-13",
    start: "10:00",
    end: "11:00",
    color: "purple",
  },
  {
    id: 3,
    title: "Presentasi Kelompok",
    type: "Presentasi",
    date: "2026-10-15",
    start: "13:00",
    end: "15:00",
    color: "pink",
  },
  {
    id: 4,
    title: "UTS AI",
    type: "UTS",
    date: "2026-10-17",
    start: "09:00",
    end: "11:00",
    color: "blue",
  },
  {
    id: 5,
    title: "Review Materi",
    type: "Belajar",
    date: "2026-10-19",
    start: "14:00",
    end: "16:00",
    color: "purple",
  },
];

export default function ScheduleContainer() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function changeWeek(direction) {
    setSelectedDate((previousDate) => {
      const nextDate = new Date(previousDate);
      nextDate.setDate(nextDate.getDate() + direction * 7);
      return nextDate;
    });
  }

  return (
    <ScheduleView
      selectedDate={selectedDate}
      events={initialEvents}
      onChangeWeek={changeWeek}
      onToday={() => setSelectedDate(new Date())}
      onSelectDate={setSelectedDate}
    />
  );
}
