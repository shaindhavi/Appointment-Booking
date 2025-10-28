import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Stethoscope, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        
        {/* Quick Access Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-3">Get Started</h2>
              <p className="text-muted-foreground">Choose your portal to access our services</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-[var(--shadow-soft)] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/patient')}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>For Patients</CardTitle>
                      <CardDescription>Book your appointment with our doctors</CardDescription>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      Choose from our expert doctors
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Select your preferred date and time
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Secure and confidential
                    </li>
                  </ul>
                  <Button className="w-full mt-4" onClick={(e) => { e.stopPropagation(); navigate('/patient'); }}>
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-soft)] hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/doctor')}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>For Doctors</CardTitle>
                      <CardDescription>Manage your schedule and appointments</CardDescription>
                    </div>
                    <Stethoscope className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      View your patient appointments
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Manage your schedule
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Confirm or update appointments
                    </li>
                  </ul>
                  <Button className="w-full mt-4" onClick={(e) => { e.stopPropagation(); navigate('/doctor'); }}>
                    Doctor Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 HealthCare Clinic. Your health, our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
