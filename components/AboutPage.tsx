import React, { useState } from 'react';
import { Target, Eye, Gem, Users, BookOpen, Send, RefreshCw, CheckCircle } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold text-white mb-4">Nuestra Identidad</h1>
        <p className="text-lg text-gray-400">Conoce el corazón y el alma de Industrias MGP.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-8">
          <InfoCard
            icon={<BookOpen className="h-8 w-8 text-red-500" />}
            title="Nuestra Historia"
            description="Desde nuestros humildes comienzos en un pequeño taller, Industrias MGP ha crecido hasta convertirse en un líder de la industria, impulsado por la innovación y un compromiso inquebrantable con la calidad. Cada hito en nuestro viaje ha sido un testimonio de la dedicación de nuestro equipo."
          />
          <InfoCard
            icon={<Users className="h-8 w-8 text-red-500" />}
            title="Cultura MGP"
            description="Creemos en una cultura de colaboración, respeto y aprendizaje continuo. Fomentamos un ambiente donde cada voz es escuchada y cada idea es valorada. Nuestro equipo es nuestro mayor activo, y lo demostramos a través de un ambiente de trabajo dinámico y de apoyo."
          />
        </div>
        <img src="https://picsum.photos/600/400?business" alt="Team working" className="rounded-xl shadow-lg w-full h-auto object-cover"/>
      </div>
      
      <div className="bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Nuestro Propósito y Valores</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <PurposeItem icon={<Target className="h-10 w-10 mx-auto text-red-500" />} title="Misión" description="Proveer soluciones innovadoras y de alta calidad que superen las expectativas de nuestros clientes, impulsando el progreso en nuestra industria." />
          <PurposeItem icon={<Eye className="h-10 w-10 mx-auto text-red-400" />} title="Visión" description="Ser el referente global en nuestro sector, reconocidos por nuestra excelencia, sostenibilidad y el impacto positivo en la comunidad." />
          <PurposeItem icon={<Gem className="h-10 w-10 mx-auto text-red-300" />} title="Valores" description="Calidad, Compromiso, Integridad, Innovación y Colaboración son los pilares que guían cada una de nuestras acciones." />
        </div>
      </div>

      <ContactForm />

    </div>
  );
};

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-md">
    <div className="flex items-center space-x-4 mb-3">
      {icon}
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

const PurposeItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div>
    {icon}
    <h4 className="text-xl font-semibold mt-4 mb-2 text-white">{title}</h4>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSuccess(false), 5000); // Reset success message after 5 seconds
        }, 1500);
    };

    return (
        <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-white mb-2">Contacto con RRHH</h2>
            <p className="text-gray-400 mb-6">¿Tienes alguna pregunta? Envíanos un mensaje y te responderemos a la brevedad.</p>
            {isSuccess ? (
                <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg flex items-center" role="alert">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span className="block sm:inline">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-red-500 focus:border-red-500" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-red-500 focus:border-red-500" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Asunto</label>
                        <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-red-500 focus:border-red-500" required />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
                        <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2.5 focus:ring-red-500 focus:border-red-500" required></textarea>
                    </div>
                    <div className="text-right">
                        <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center gap-2 bg-red-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-900 disabled:bg-gray-500 transition-colors">
                            {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            <span>{isLoading ? 'Enviando...' : 'Enviar Mensaje'}</span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};


export default AboutPage;