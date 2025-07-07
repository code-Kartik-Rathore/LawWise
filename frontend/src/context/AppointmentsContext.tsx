import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Appointment {
  id: string;
  date: string;
  time: string;
  lawyerType: string;
  email: string;
  // Add other appointment fields as needed
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  getUpcomingAppointment: () => Appointment | undefined;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    // Load from localStorage on initial load
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appointments');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage whenever appointments change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const getUpcomingAppointment = (): Appointment | undefined => {
    const now = new Date();
    
    return appointments.find(appointment => {
      const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
      const fiveMinutesBefore = new Date(appointmentDateTime.getTime() - 5 * 60000);
      const thirtyMinutesAfter = new Date(appointmentDateTime.getTime() + 30 * 60000);
      
      return now >= fiveMinutesBefore && now <= thirtyMinutesAfter;
    });
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, getUpcomingAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentsProvider');
  }
  return context;
};
