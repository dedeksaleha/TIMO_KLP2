import { useMemo, useState } from "react";
import "./Reminder.css";

const initialTasks = [
  {
    id: 1,
    task: "Menyelesaikan laporan praktikum",
    course: "Penelusuran Informasi",
    deadline: "2026-10-16",
    priority: "Tinggi",
    status: "Belum Selesai",
  },
  {
    id: 2,
    task: "Mengerjakan tugas database",
    course: "Basis Data Lanjut",
    deadline: "2026-10-18",
    priority: "Sedang",
    status: "Dalam Proses",
  },
  {
    id: 3,
    task: "Membuat desain halaman web",
    course: "POPL A",
    deadline: "2026-10-20",
    priority: "Rendah",
    status: "Selesai",
  },
];

const emptyForm = {
  task: "",
  course: "",
  deadline: "",
  priority: "Sedang",
  status: "Belum Selesai",
};

function formatDate(value) {
  if (!value) return "-";
  return new Date(`${value}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Reminder() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [priorityFilter, setPriorityFilter] = useState("Semua Prioritas");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const filteredTasks = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        task.task.toLowerCase().includes(keyword) ||
        task.course.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua Status" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "Semua Prioritas" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const completed = tasks.filter((t) => t.status === "Selesai").length;
  const inProgress = tasks.filter((t) => t.status === "Dalam Proses").length;
  const unfinished = tasks.filter((t) => t.status === "Belum Selesai").length;

  function openAddModal() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setEditingId(task.id);
    setForm({
      task: task.task,
      course: task.course,
      deadline: task.deadline,
      priority: task.priority,
      status: task.status,
    });
    setModalOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (editingId !== null) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingId ? { ...task, ...form } : task
        )
      );
    } else {
      setTasks((current) => [...current, { ...form, id: Date.now() }]);
    }

    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function toggleStatus(task) {
    const nextStatus =
      task.status === "Selesai" ? "Belum Selesai" : "Selesai";

    setTasks((current) =>
      current.map((item) =>
        item.id === task.id ? { ...item, status: nextStatus } : item
      )
    );
  }

  function confirmDelete() {
    setTasks((current) => current.filter((task) => task.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <section className="reminder-page">
      <div className="reminder-heading">
        <div>
          <p className="reminder-eyebrow">MANAJEMEN TUGAS</p>
          <h1>Reminder Tugas</h1>
          <p className="reminder-subtitle">
            Atur tugas kuliahmu supaya tidak ada deadline yang terlewat.
          </p>
        </div>

        <button className="reminder-primary-btn" onClick={openAddModal}>
          + Tambah Tugas
        </button>
      </div>

      <div className="reminder-stats">
        <article className="reminder-stat-card">
          <div className="reminder-stat-icon lavender">▤</div>
          <div><p>Total Tugas</p><strong>{tasks.length}</strong></div>
        </article>
        <article className="reminder-stat-card">
          <div className="reminder-stat-icon green">✓</div>
          <div><p>Tugas Selesai</p><strong>{completed}</strong></div>
        </article>
        <article className="reminder-stat-card">
          <div className="reminder-stat-icon orange">◷</div>
          <div><p>Dalam Proses</p><strong>{inProgress}</strong></div>
        </article>
        <article className="reminder-stat-card">
          <div className="reminder-stat-icon pink">!</div>
          <div><p>Belum Selesai</p><strong>{unfinished}</strong></div>
        </article>
      </div>

      <div className="reminder-list-card">
        <div className="reminder-list-heading">
          <div>
            <h2>Daftar Tugas</h2>
            <p>Pantau dan kelola semua tugas kuliahmu.</p>
          </div>
          <span className="reminder-count">{filteredTasks.length} tugas</span>
        </div>

        <div className="reminder-toolbar">
          <label className="reminder-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Cari nama tugas atau mata kuliah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>

          <select
            aria-label="Filter status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>Semua Status</option>
            <option>Belum Selesai</option>
            <option>Dalam Proses</option>
            <option>Selesai</option>
          </select>

          <select
            aria-label="Filter prioritas"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option>Semua Prioritas</option>
            <option>Tinggi</option>
            <option>Sedang</option>
            <option>Rendah</option>
          </select>
        </div>

        <div className="reminder-table-wrap">
          <table className="reminder-table">
            <thead>
              <tr>
                <th>Tugas / Mata Kuliah</th>
                <th>Deadline</th>
                <th>Prioritas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <div className="reminder-task-name">{task.task}</div>
                      <div className="reminder-course">{task.course}</div>
                    </td>
                    <td className="reminder-date">{formatDate(task.deadline)}</td>
                    <td>
                      <span className={`reminder-badge priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`reminder-badge status-${task.status.toLowerCase().replaceAll(" ", "-")}`}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <div className="reminder-actions">
                        <button
                          className="reminder-action complete"
                          title="Ubah status"
                          onClick={() => toggleStatus(task)}
                        >
                          ✓
                        </button>
                        <button
                          className="reminder-action edit"
                          title="Edit tugas"
                          onClick={() => openEditModal(task)}
                        >
                          ✎
                        </button>
                        <button
                          className="reminder-action delete"
                          title="Hapus tugas"
                          onClick={() => setDeleteId(task.id)}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="reminder-empty">
                    Tidak ada tugas yang cocok dengan pencarian atau filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="reminder-table-note">
          Klik tanda centang untuk mengubah status tugas menjadi selesai atau belum selesai.
        </p>
      </div>

      {modalOpen && (
        <div className="reminder-modal-backdrop">
          <section className="reminder-modal" role="dialog" aria-modal="true">
            <div className="reminder-modal-heading">
              <div>
                <p className="reminder-eyebrow">
                  {editingId !== null ? "PERBARUI TUGAS" : "TUGAS BARU"}
                </p>
                <h2>{editingId !== null ? "Edit Tugas" : "Tambah Tugas"}</h2>
              </div>
              <button
                className="reminder-close-btn"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Nama tugas
                <input
                  required
                  value={form.task}
                  onChange={(e) => setForm({ ...form, task: e.target.value })}
                  placeholder="Contoh: Laporan praktikum"
                />
              </label>

              <label>
                Mata kuliah
                <input
                  required
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  placeholder="Contoh: POPL A"
                />
              </label>

              <label>
                Deadline
                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                />
              </label>

              <div className="reminder-form-row">
                <label>
                  Prioritas
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    <option>Tinggi</option>
                    <option>Sedang</option>
                    <option>Rendah</option>
                  </select>
                </label>

                <label>
                  Status
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    <option>Belum Selesai</option>
                    <option>Dalam Proses</option>
                    <option>Selesai</option>
                  </select>
                </label>
              </div>

              <div className="reminder-modal-actions">
                <button
                  type="button"
                  className="reminder-secondary-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="reminder-primary-btn">
                  {editingId !== null ? "Simpan Perubahan" : "Simpan Tugas"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {deleteId !== null && (
        <div className="reminder-modal-backdrop">
          <section className="reminder-modal reminder-delete-modal" role="dialog" aria-modal="true">
            <div className="reminder-delete-icon">!</div>
            <h2>Hapus tugas ini?</h2>
            <p>Tugas yang dihapus tidak dapat dikembalikan.</p>
            <div className="reminder-modal-actions">
              <button
                className="reminder-secondary-btn"
                onClick={() => setDeleteId(null)}
              >
                Batal
              </button>
              <button className="reminder-danger-btn" onClick={confirmDelete}>
                Ya, Hapus
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}