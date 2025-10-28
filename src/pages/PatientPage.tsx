import { Header } from "@/components/Header";
import { BookingSection } from "@/components/BookingSection";

const PatientPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BookingSection />
      </main>
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 HealthCare Clinic. Your health, our priority.</p>
        </div>
      </footer>
    </div>
  );
};

export default PatientPage;

