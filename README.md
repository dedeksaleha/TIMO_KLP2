# TIMO — Time Management Organizer

TIMO adalah aplikasi web untuk membantu mahasiswa mengelola tugas, pengingat, dan jadwal kegiatan akademik secara lebih terorganisir.

Project ini dikembangkan oleh **Kelompok 2** untuk memenuhi tugas **UTS Praktikum Pengembangan dan Operasi Perangkat Lunak (POPL)**.

## Fitur Utama

- **Dashboard:** Menampilkan ringkasan aktivitas akademik pengguna.
- **Reminder:** Membantu pengguna mengelola tugas dan pengingat.
- **Schedule:** Menampilkan jadwal akademik melalui kalender mingguan, kalender mini, dan Upcoming Events.

## Teknologi

- **Frontend:** React, Vite, JavaScript, CSS
- **Library:** Lucide React
- **Version Control:** Git dan GitHub
- **Containerization:** Docker dan Nginx

## Design Pattern

Project menerapkan **Container–Presenter Pattern** pada halaman Schedule untuk memisahkan logika aplikasi dan tampilan.

- `ScheduleContainer.jsx`: Mengelola state, data, dan navigasi kalender.
- `ScheduleView.jsx`: Menampilkan antarmuka kalender dan kegiatan.

## Cara Menjalankan

Clone repository dan instal dependency:

```bash
git clone https://github.com/dedeksaleha/TIMO_KLP2.git
cd TIMO_KLP2
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

## Docker

Build image:

```bash
docker build -t timo-klp2:submit-UTS .
```

Jalankan container:

```bash
docker run -d --name timo-uts -p 8080:80 timo-klp2:submit-UTS
```

Buka aplikasi di `http://localhost:8080`.

## Anggota Kelompok

| Anggota | Kontribusi |
|---|---|
| Dedek Saleha       | Dashboard                     |
| Dara Ramadhani     | Reminder                      |
| Hani Huriyah Ahmad | Schedule dan pengujian Docker |

## Repository

**GitHub:** https://github.com/dedeksaleha/TIMO_KLP2
**Docker Hub**: https://hub.docker.com/r/hanihuriyah/timo-klp2

**Status:** Pengembangan frontend untuk UTS POPL. Integrasi data antarf fitur dan backend direncanakan untuk pengembangan selanjutnya.
