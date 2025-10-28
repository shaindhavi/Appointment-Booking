import { Calendar, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-border bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Calendar className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">HealthCare Clinic</h1>
        </div>
        <nav className="flex items-center gap-4">
          {!user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/patient')}>
                For Patients
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/doctor')}>
                For Doctors
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                <UserCircle className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant={location.pathname === '/patient' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => navigate('/patient')}
              >
                Book Appointment
              </Button>
              <Button 
                variant={location.pathname === '/doctor' ? 'default' : 'ghost'} 
                size="sm" 
                onClick={() => navigate('/doctor')}
              >
                Doctor Portal
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
