import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Shield, Users, Bell, FileText } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments in just a few clicks with our intuitive calendar interface.",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "See doctor availability in real-time and choose the perfect time slot.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is protected with industry-standard encryption.",
  },
  {
    icon: Users,
    title: "Multiple Doctors",
    description: "Access a wide network of qualified healthcare professionals.",
  },
  {
    icon: Bell,
    title: "Reminders",
    description: "Receive timely notifications about your upcoming appointments.",
  },
  {
    icon: FileText,
    title: "Digital Records",
    description: "Access your medical history and appointment records anytime.",
  },
];

export const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide a comprehensive healthcare management system designed to make your experience seamless
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-[var(--transition-smooth)] border-border"
              >
                <CardContent className="pt-6">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
