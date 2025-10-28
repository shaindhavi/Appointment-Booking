import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patient_id: string;
  doctor_id: string;
  patient_name?: string;
}

export const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Frontend-only: load all appointments from localStorage
    const raw = localStorage.getItem('appointments');
    const list: Appointment[] = raw ? JSON.parse(raw) : [];
    // If you want to filter by a specific doctor, you could store a chosen doctor id in localStorage
    setAppointments(list.sort((a, b) => (a.appointment_date + a.appointment_time).localeCompare(b.appointment_date + b.appointment_time)));
    setLoading(false);
  }, [user]);

  const updateAppointmentStatus = async (appointmentId: string, status: Appointment["status"]) => {
    try {
      const raw = localStorage.getItem('appointments');
      const list: Appointment[] = raw ? JSON.parse(raw) : [];
      const updated = list.map(a => a.id === appointmentId ? { ...a, status } : a);
      localStorage.setItem('appointments', JSON.stringify(updated));
      setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status } : a));
      toast.success(`Appointment ${status}`);
    } catch {
      toast.error("Failed to update appointment status");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString();
  };

  const todayAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointment_date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const pendingCount = todayAppointments.filter(apt => apt.status === 'pending').length;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Doctor Dashboard</h2>
          <p className="text-muted-foreground">Manage your appointments and patient schedule</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">{pendingCount} pending confirmation</p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">All upcoming</p>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <User className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </div>
              <p className="text-xs text-muted-foreground">Confirmed bookings</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-6xl mx-auto shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Review and manage your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading appointments...</p>
            ) : appointments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No appointments scheduled</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-[var(--transition-smooth)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{appointment.patient_name}</p>
                        <p className="text-sm text-muted-foreground">{appointment.reason || "No reason provided"}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(appointment.appointment_date)}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.appointment_time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                      {appointment.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Confirm
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
