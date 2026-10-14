
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import "./Schedule.css";

const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
const START_HOUR = 8;
const END_HOUR = 20;
const HOUR_HEIGHT = 60;

const hours = Array.from(
  { length: END_HOUR - START_HOUR },
  (_, i) => START_HOUR + i
);

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getWeekDates(date) {
  const start = new Date(date);
  const day = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - day);

  return Array.from({ length: 7 }, (_, i) => {
    const result = new Date(start);
    result.setDate(start.getDate() + i);
    return result;
  });
}

function MiniCalendar({ selectedDate, onSelectDate, events }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells = [
    ...Array(offset).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  function changeMonth(direction) {
    onSelectDate(new Date(year, month + direction, 1));
  }

  return (
    <div className="schedule-mini">
      <div className="schedule-mini-header">
        <h3>
          {selectedDate.toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <div className="schedule-mini-navigation">
          <button onClick={() => changeMonth(-1)} aria-label="Bulan sebelumnya">
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => changeMonth(1)} aria-label="Bulan berikutnya">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="schedule-mini-grid">
        {days.map((day) => (
          <span className="schedule-mini-day" key={day}>
            {day}
          </span>
        ))}

        {cells.map((day, index) => {
          if (!day) return <span key={`empty-${index}`} />;

          const cellDate = new Date(year, month, day);
          const key = dateKey(cellDate);
          const isSelected = key === dateKey(selectedDate);
          const isToday = key === dateKey(new Date());
          const hasEvent = events.some((event) => event.date === key);

          return (
            <button
              key={key}
              type="button"
              className={[
                isSelected ? "schedule-mini-active" : "",
                isToday ? "schedule-mini-today" : "",
              ].join(" ")}
              onClick={() => onSelectDate(cellDate)}
            >
              {day}
              {hasEvent && <span className="schedule-date-dot" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WeeklyCalendar({ weekDates, selectedDate, events }) {
  const todayKey = dateKey(new Date());
  const selectedKey = dateKey(selectedDate);

  return (
    <div className="schedule-week-scroll">
      <div className="schedule-week">
        <div className="schedule-week-head">
          <div />

          {weekDates.map((date, index) => {
            const key = dateKey(date);

            return (
              <div
                key={key}
                className={[
                  "schedule-day-header",
                  key === selectedKey ? "schedule-current-day" : "",
                  key === todayKey ? "schedule-today-header" : "",
                ].join(" ")}
              >
                <strong>{date.getDate()}</strong>
                <span>{days[index]}</span>
              </div>
            );
          })}
        </div>

        <div className="schedule-week-body">
          <div className="schedule-hours">
            {hours.map((hour) => (
              <div key={hour}>
                {String(hour).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {weekDates.map((date) => (
            <div
              className="schedule-day-column"
              key={dateKey(date)}
            >
              {events
                .filter((event) => event.date === dateKey(date))
                .map((event) => {
                  const [startHour, startMinute] = event.start
                    .split(":")
                    .map(Number);

                  const [endHour, endMinute] = event.end
                    .split(":")
                    .map(Number);

                  const start = startHour * 60 + startMinute;
                  const end = endHour * 60 + endMinute;

                  const visibleStart = Math.max(start, START_HOUR * 60);
                  const visibleEnd = Math.min(end, END_HOUR * 60);

                  if (visibleEnd <= visibleStart) return null;

                  const top =
                    ((visibleStart - START_HOUR * 60) / 60) * HOUR_HEIGHT;

                  const height =
                    ((visibleEnd - visibleStart) / 60) * HOUR_HEIGHT;

                  return (
                    <div
                      key={event.id}
                      className={`schedule-event ${event.color}`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                      }}
                      title={`${event.title} (${event.start} - ${event.end})`}
                    >
                      <strong>{event.title}</strong>
                      <span>{event.type}</span>
                      <small>
                        {event.start} – {event.end}
                      </small>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingEvents({ events }) {
  const now = new Date();

  const upcoming = events
    .filter((event) => {
      const endDate = new Date(`${event.date}T${event.end}:00`);
      return endDate >= now;
    })
    .sort((a, b) =>
      `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`)
    )
    .slice(0, 4);

  return (
    <div className="schedule-upcoming">
      <div className="schedule-upcoming-header">
        <h3>Upcoming Events</h3>
        <Clock3 size={16} color="#7660e8" />
      </div>

      {upcoming.length === 0 ? (
        <p className="schedule-empty">
          Belum ada kegiatan mendatang.
        </p>
      ) : (
        upcoming.map((event) => (
          <div className="schedule-upcoming-item" key={event.id}>
            <div className={`schedule-upcoming-date ${event.color}`}>
              <strong>
                {new Date(`${event.date}T00:00:00`).getDate()}
              </strong>
              <span>
                {new Date(`${event.date}T00:00:00`).toLocaleDateString(
                  "id-ID",
                  { month: "short" }
                )}
              </span>
            </div>

            <div className="schedule-upcoming-info">
              <strong>{event.title}</strong>
              <span>{event.type}</span>
              <small>
                {event.start} – {event.end}
              </small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function ScheduleView({
  selectedDate,
  events,
  onChangeWeek,
  onToday,
  onSelectDate,
}) {
  const weekDates = getWeekDates(selectedDate);

  const weekStart = weekDates[0].toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });

  const weekEnd = weekDates[6].toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="schedule-page">
      <header className="schedule-header">
        <div>
          <h1>Schedule</h1>
          <p>Kelola jadwal akademik dan kegiatan kamu</p>
        </div>
        <CalendarDays size={22} color="#7660e8" />
      </header>

      <div className="schedule-panel">
        <div className="schedule-toolbar">
          <button onClick={onToday}>Hari Ini</button>

          <button
            onClick={() => onChangeWeek(-1)}
            aria-label="Minggu sebelumnya"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            onClick={() => onChangeWeek(1)}
            aria-label="Minggu berikutnya"
          >
            <ChevronRight size={17} />
          </button>

          <strong>{weekStart} – {weekEnd}</strong>
        </div>

        <div className="schedule-content">
          <WeeklyCalendar
            weekDates={weekDates}
            selectedDate={selectedDate}
            events={events}
          />

          <aside className="schedule-right">
            <MiniCalendar
              selectedDate={selectedDate}
              onSelectDate={onSelectDate}
              events={events}
            />

            <UpcomingEvents events={events} />
          </aside>
        </div>
      </div>
    </div>
  );
}
