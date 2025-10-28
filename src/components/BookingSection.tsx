// ...existing code...
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";


const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

interface Doctor {
  id: string;
  user_id?: string;
  specialty?: string;
  full_name?: string;
  fallback?: boolean;
}

// Fallback local doctors to ensure the list always shows at least 5 doctors
const fallbackDoctors: Doctor[] = [
  { id: "local-1", user_id: "local-1", full_name: "Dr. Maya Patel", specialty: "General Practitioner", fallback: true },
  { id: "local-2", user_id: "local-2", full_name: "Dr. Liam O'Connor", specialty: "Cardiologist", fallback: true },
  { id: "local-3", user_id: "local-3", full_name: "Dr. Sofia Martinez", specialty: "Pediatrician", fallback: true },
  { id: "local-4", user_id: "local-4", full_name: "Dr. Ethan Williams", specialty: "Dermatologist", fallback: true },
  { id: "local-5", user_id: "local-5", full_name: "Dr. Aisha Khan", specialty: "ENT Specialist", fallback: true },
];

export const BookingSection = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoadingDoctors(true);
    // Frontend-only: load from localStorage if present, else use fallback
    try {
      const raw = localStorage.getItem('doctors');
      if (raw) {
        const parsed = JSON.parse(raw) as Doctor[];
        if (Array.isArray(parsed) && parsed.length >= 1) {
          setDoctors(parsed);
          setLoadingDoctors(false);
          return;
        }
      }
    } catch (e) {
      // ignore parsing errors and fall back to defaults
    }
    setDoctors(fallbackDoctors);
    setLoadingDoctors(false);
  };

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedTime || !date || !user) {
      toast.error("Please fill in all required fields");
      return;
    }

    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor) {
      toast.error("Selected doctor not found");
      return;
    }

    // Frontend-only: store appointment in localStorage
    setLoading(true);
    const appointment = {
      id: generateId(),
      patient_id: user.id,
      doctor_id: selectedDoctor,
      appointment_date: date.toISOString().split('T')[0],
      appointment_time: selectedTime,
      reason: reason || null,
      status: 'pending'
    };
    try {
      const raw = localStorage.getItem('appointments');
      const list = raw ? JSON.parse(raw) : [];
      const newList = Array.isArray(list) ? [...list, appointment] : [appointment];
      localStorage.setItem('appointments', JSON.stringify(newList));
      toast.success("Appointment booked successfully!", {
        description: `With ${doctor.full_name} on ${date.toDateString()} at ${selectedTime}`,
      });
      setSelectedDoctor("");
      setSelectedTime("");
      setReason("");
    } catch (e) {
      toast.error("Failed to save appointment locally");
    } finally {
      setLoading(false);
    }
  };

  function generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Book Your Appointment</h2>
          <p className="text-muted-foreground">Choose your doctor and preferred time slot</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          <Card className="lg:col-span-2 shadow-[var(--shadow-soft)] order-2 lg:order-1">
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>Fill in your information to book an appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="doctor">Select Doctor</Label>
                {loadingDoctors ? (
                  <div className="p-4 text-center text-muted-foreground border rounded-md">Loading doctors...</div>
                ) : (
                  <>
                    <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                      <SelectTrigger id="doctor" className="h-auto min-h-[44px]">
                        <SelectValue placeholder="Choose a doctor from the list below" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.id} value={doctor.id} className="py-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium">{doctor.full_name}</span>
                              <span className="text-xs text-muted-foreground">{doctor.specialty}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedDoctor && (
                      <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
                        <p className="text-sm">
                          <span className="font-semibold text-primary">Selected Doctor:</span> {
                            doctors.find(d => d.id === selectedDoctor)?.full_name
                          } - <span className="text-muted-foreground">{doctors.find(d => d.id === selectedDoctor)?.specialty}</span>
                        </p>
                      </div>
                    )}
                    {/* Available Doctors List */}
                    <div className="mt-4 border rounded-lg divide-y">
                      <div className="px-4 py-2 bg-muted/50 font-medium text-sm">Available Doctors ({doctors.length})</div>
                      {doctors.map((doctor) => (
                        <div 
                          key={doctor.id} 
                          className={`px-4 py-3 cursor-pointer transition-colors ${
                            selectedDoctor === doctor.id 
                              ? 'bg-primary/10 border-l-4 border-l-primary' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setSelectedDoctor(doctor.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">{doctor.full_name}</p>
                              <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                            </div>
                            {selectedDoctor === doctor.id && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-slot">Time Slot</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time-slot">
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Textarea
                  id="reason"
                  placeholder="Briefly describe your concern"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                />
              </div>

              <Button onClick={handleBooking} className="w-full" size="lg" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)] order-1 lg:order-2">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose your preferred appointment date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
// ...existing code...