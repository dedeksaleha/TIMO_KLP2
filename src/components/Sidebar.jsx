
import {
  LayoutDashboard,
  Bell,
  CalendarDays
} from "lucide-react";

const menus = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "reminder", label: "Reminder", icon: Bell },
  { id: "schedule", label: "Schedule", icon: CalendarDays }
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>TIMO</h2>
        <p>Time Management Organizer</p>
      </div>

      <nav className="sidebar-menu">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.id}
              className={
                activePage === menu.id ? "menu active" : "menu"
              }
              onClick={() => onNavigate(menu.id)}
            >
              <Icon size={19} />
              <span>{menu.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
