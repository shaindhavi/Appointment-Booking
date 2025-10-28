import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import heroImage from "@/assets/clinic-hero.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-background">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-foreground leading-tight">
              Your Health,
              <br />
              <span className="text-primary">Our Priority</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Book appointments with top healthcare professionals in seconds. Manage your health journey with ease.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="shadow-[var(--shadow-hover)]">
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </Button>
              <Button variant="secondary" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Doctor Portal
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Easy Booking</p>
                  <p className="text-sm text-muted-foreground">Quick online scheduling</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">24/7 Access</p>
                  <p className="text-sm text-muted-foreground">Anytime, anywhere</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImage}
              alt="Healthcare professionals in a modern clinic"
              className="rounded-2xl shadow-[var(--shadow-hover)] w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
