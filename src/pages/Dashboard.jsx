
import "../styles/dashboard.css";

const summaryData = [
  {
    title: "Total Tugas",
    value: 12,
    icon: "▤",
    color: "purple",
    note: "Semua tugas akademik",
  },
  {
    title: "Tugas Selesai",
    value: 7,
    icon: "✓",
    color: "blue",
    note: "Tugas sudah dikerjakan",
  },
  {
    title: "Belum Selesai",
    value: 5,
    icon: "⌛",
    color: "pink",
    note: "Masih perlu dikerjakan",
  },
  {
    title: "Deadline Terdekat",
    value: 3,
    icon: "▦",
    color: "cyan",
    note: "Dalam 7 hari ke depan",
  },
];

const tasks = [
  {
    name: "Laporan Praktikum POPL",
    course: "POPL",
    deadline: "10 Okt 2026",
    status: "Besok",
    color: "blue",
  },
  {
    name: "Kuis Sistem Operasi",
    course: "Sistem Operasi",
    deadline: "12 Okt 2026",
    status: "3 hari lagi",
    color: "purple",
  },
  {
    name: "Presentasi Kelompok",
    course: "Basis Data",
    deadline: "15 Okt 2026",
    status: "6 hari lagi",
    color: "pink",
  },
  {
    name: "Tugas Makalah",
    course: "AI",
    deadline: "18 Okt 2026",
    status: "1 minggu lagi",
    color: "cyan",
  },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Ringkasan aktivitas akademik kamu</p>
        </div>

        <div className="dashboard-actions">
          <input
            type="search"
            placeholder="Cari tugas atau jadwal..."
            aria-label="Cari tugas atau jadwal"
          />
          <button className="icon-button" aria-label="Notifikasi">
            ♧
          </button>
          <div className="profile-avatar">D</div>
        </div>
      </header>

      <section className="summary-grid">
        {summaryData.map((item) => (
          <article
            className={`summary-card ${item.color}`}
            key={item.title}
          >
            <div className="summary-icon">{item.icon}</div>
            <div>
              <h2>{item.value}</h2>
              <p className="summary-title">{item.title}</p>
              <p className="summary-note">{item.note}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-content">
        <article className="panel deadline-panel">
          <div className="panel-heading">
            <h2>Deadline Terdekat</h2>
            <button className="text-button">Lihat semua</button>
          </div>

          <div className="table-wrapper">
            <table className="deadline-table">
              <thead>
                <tr>
                  <th>Tugas</th>
                  <th>Mata Kuliah</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.name}>
                    <td>
                      <span className={`task-dot ${task.color}`} />
                      {task.name}
                    </td>
                    <td>{task.course}</td>
                    <td>{task.deadline}</td>
                    <td>
                      <span className={`status-badge ${task.color}`}>
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="dashboard-side">
          <article className="panel progress-panel">
            <div className="panel-heading">
              <h2>Progress Tugas</h2>
              <span className="progress-caption">7 dari 12</span>
            </div>

            <div className="progress-content">
              <div className="progress-ring">
                <div className="progress-ring-inner">
                  <strong>58%</strong>
                </div>
              </div>

              <div className="progress-legend">
                <p><span className="legend-dot blue" /> Selesai <b>7</b></p>
                <p><span className="legend-dot purple" /> Belum selesai <b>5</b></p>
              </div>
            </div>
          </article>

          <article className="panel upcoming-panel">
            <div className="panel-heading">
              <h2>Jadwal Mendatang</h2>
              <button className="text-button">Lihat semua</button>
            </div>

            <div className="upcoming-item">
              <div className="date-box">
                <strong>12</strong>
                <span>Okt</span>
              </div>
              <div className="upcoming-info">
                <strong>Kuis Sistem Operasi</strong>
                <p>09.00 – 10.00</p>
                <p>Ruang A1</p>
              </div>
              <span className="event-tag pink">Kuis</span>
            </div>

            <div className="upcoming-item">
              <div className="date-box">
                <strong>15</strong>
                <span>Okt</span>
              </div>
              <div className="upcoming-info">
                <strong>Presentasi Kelompok</strong>
                <p>13.00 – 15.00</p>
                <p>Ruang B2</p>
              </div>
              <span className="event-tag blue">Presentasi</span>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
