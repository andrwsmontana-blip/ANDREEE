import React, { useState } from 'react';
import { Banknote, PlusCircle, Calendar } from 'lucide-react';

const DisabilityCalendar: React.FC = () => {
    const [date] = useState(new Date());
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1) });
    
    const disabledDays = [8, 15, 22, 23];
    const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    return (
        <div className="bg-gray-700 p-6 rounded-lg mt-8">
            <h4 className="font-bold text-lg text-white mb-4">Calendario de Incapacidades (Ejemplo)</h4>
            <div className="text-center mb-4">
                <span className="text-xl font-semibold text-white">
                    {date.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}
                </span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-400 mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm">
                {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
                {days.map(day => (
                    <div
                        key={day}
                        className={`w-full aspect-square flex items-center justify-center rounded-full ${
                            disabledDays.includes(day) 
                                ? 'bg-red-700 text-white font-bold' 
                                : 'text-gray-200'
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};


const PayrollPage: React.FC = () => (
    <div className="animate-fade-in-up space-y-8">
        <div>
            <h1 className="text-4xl font-extrabold text-white mb-4">Vinculación Laboral y Nómina</h1>
            <p className="text-lg text-gray-400">Información esencial sobre tu contrato, pagos y beneficios.</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-white mb-6">Gestión Administrativa del Personal</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard icon={<Banknote className="text-green-500" />} title="Gestión de Nómina" description="Información sobre tu contrato, afiliaciones, fechas de corte y desprendibles de pago." />
                <InfoCard icon={<PlusCircle className="text-red-500" />} title="Reporte de Incapacidades" description="Proceso y documentación necesaria para reportar ausencias por motivos de salud." />
                <InfoCard icon={<Calendar className="text-purple-500" />} title="Solicitud de Vacaciones" description="Planifica tu descanso. Conoce el procedimiento para solicitar y aprobar tus vacaciones." />
            </div>
            <DisabilityCalendar />
        </div>
    </div>
);


const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-gray-700 p-6 rounded-lg">
        <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{icon}</div>
            <h4 className="font-bold text-lg text-white">{title}</h4>
        </div>
        <p className="text-sm text-gray-300">{description}</p>
    </div>
);

export default PayrollPage;
