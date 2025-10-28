// ...existing code...
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

interface Doctor {
  id: string;
  full_name: string;
  specialty?: string;
}

// Replace backend-driven doctors with frontend-only list
const fallbackDoctors: Doctor[] = [
  { id: "local-gp-1", full_name: "Dr. Maya Patel", specialty: "General Practitioner" },
  { id: "local-gp-2", full_name: "Dr. Daniel Ng", specialty: "General Practitioner" },
  { id: "local-card-1", full_name: "Dr. Liam O'Connor", specialty: "Cardiologist" },
  { id: "local-onc-1", full_name: "Dr. Nisha Kapoor", specialty: "Oncologist" },
  { id: "local-eye-1", full_name: "Dr. Sofia Alvarez", specialty: "Ophthalmologist" },
  { id: "local-den-1", full_name: "Dr. Claire Park", specialty: "Dentist" },
];

export function DoctorDashboardUI() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(fallbackDoctors[0].id);
  const [appointments, setAppointments] = useState<any[]>([]);

  const loadAppointments = () => {
    try {
      const raw = localStorage.getItem("appointments");
      const list = raw ? JSON.parse(raw) : [];
      const filtered = Array.isArray(list)
        ? list.filter((a) => a.doctor_id === selectedDoctorId && a.appointment_date === today)
        : [];
      setAppointments(filtered);
    } catch (e) {
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadAppointments();
    // update when other tabs/pages change localStorage
    const onStorage = (e: StorageEvent) => {
      if (e.key === "appointments") loadAppointments();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [selectedDoctorId, today]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Doctor Portal (UI only)</h1>

      <div className="mb-4 flex gap-4 items-center">
        <label className="font-medium">Select doctor:</label>
        <select
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          className="rounded border px-3 py-1"
        >
          {fallbackDoctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.full_name} — {d.specialty}
            </option>
          ))}
        </select>

        <button
          onClick={loadAppointments}
          className="ml-2 rounded bg-primary px-3 py-1 text-white"
        >
          Refresh
        </button>
      </div>

      <div className="mb-6 p-4 border rounded">
        <h2 className="font-semibold">Today's Appointments ({appointments.length})</h2>
        {appointments.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-2">No appointments for today.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {appointments.map((a) => (
              <li key={a.id} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="font-medium">{a.appointment_time}</div>
                  <div className="text-sm text-muted-foreground">Patient: {a.patient_id}</div>
                  {a.reason && <div className="text-sm text-muted-foreground">Reason: {a.reason}</div>}
                </div>
                <div className="text-xs text-muted-foreground">{a.status}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        This is a frontend-only doctor UI. It reads appointments from localStorage key "appointments".
        When booking from the patient UI, ensure the booking code writes to localStorage with the shape:
      </div>
      <pre className="mt-2 rounded bg-muted p-2 text-xs">
{`{
  id: "<uuid>",
  patient_id: "<patient-id>",
  doctor_id: "<doctor-id>",
  appointment_date: "YYYY-MM-DD",
  appointment_time: "09:00 AM",
  reason: "<optional>",
  status: "pending"
}`}
      </pre>
    </div>
  );
}

const DoctorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <DoctorDashboardUI />
      </main>
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 HealthCare Clinic. Your health, our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default DoctorPage;
// ...existing code...