import React, { useState, useCallback, useEffect } from 'react';
import { Home, Building, ClipboardList, Wrench, Bot, Users, ChevronDown, Sparkles, Briefcase, Shield, GraduationCap, Image as ImageIcon, Film, BrainCircuit, ChevronsLeft, UserSearch, BookUser, Banknote } from 'lucide-react';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import Chatbot from './components/Chatbot';
import Tutorial, { TUTORIAL_STEPS } from './components/Tutorial';
import TrainingPage from './components/pages/TrainingPage';
import SafetyPage from './components/pages/SafetyPage';
import ImageEditorPage from './components/pages/ImageEditorPage';
import VideoAnalysisPage from './components/pages/VideoAnalysisPage';
import StrategicAnalysisPage from './components/pages/StrategicAnalysisPage';
import PreselectionPage from './components/pages/PreselectionPage';
import ManualsPage from './components/pages/ManualsPage';
import PayrollPage from './components/pages/PayrollPage';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isChatOpen, setChatOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isTutorialActive, setIsTutorialActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById('emoji-container');
    if (container && !container.hasChildNodes()) {
        const emojiCount = 15;
        for (let i = 0; i < emojiCount; i++) {
            const emoji = document.createElement('div');
            emoji.innerHTML = '🥾';
            emoji.classList.add('falling-emoji');
            
            const size = Math.random() * 2 + 1; // 1rem to 3rem
            const left = Math.random() * 95; // Use 95 to keep it from the edge
            const duration = Math.random() * 5 + 7; // 7s to 12s
            const delay = Math.random() * 5; // 0s to 5s

            emoji.style.fontSize = `${size}rem`;
            emoji.style.left = `${left}vw`;
            emoji.style.animationDuration = `${duration}s`;
            emoji.style.animationDelay = `${delay}s`;
            
            container.appendChild(emoji);

            setTimeout(() => {
                emoji.remove();
            }, (duration + delay) * 1000);
        }
    }
  }, []);

  useEffect(() => {
    const hasCompleted = localStorage.getItem('onboardingTutorialCompleted');
    if (hasCompleted !== 'true') {
        setIsTutorialActive(true);
        const firstStepPage = TUTORIAL_STEPS[0].page;
        setCurrentPage(firstStepPage);
        if (firstStepPage.includes('.')) {
          setOpenMenu(firstStepPage.split('.')[0]);
        }
    }
  }, []);

  const closeTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('onboardingTutorialCompleted', 'true');
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= TUTORIAL_STEPS.length) {
      closeTutorial();
      return;
    }
    if(stepIndex < 0) return;

    const nextStepConfig = TUTORIAL_STEPS[stepIndex];
    setCurrentPage(nextStepConfig.page);
    if(nextStepConfig.page.includes('.')) {
        setOpenMenu(nextStepConfig.page.split('.')[0]);
    } else {
        setOpenMenu(null);
    }
    setTutorialStep(stepIndex);
  };

  const handleSetPage = (page: string) => {
    setCurrentPage(page);
    if (isTutorialActive) {
      setIsTutorialActive(false);
      localStorage.setItem('onboardingTutorialCompleted', 'true');
    }
  }

  const handleToggleMenu = (menu: string) => {
     if (menu === 'ai') {
        setOpenMenu(openMenu === menu ? null : menu);
    }
  }

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'onboarding.identity': return <AboutPage />;
      case 'onboarding.induction': return <OnboardingPage />;
      case 'operations.training': return <TrainingPage />;
      case 'hr.preselection': return <PreselectionPage />;
      case 'hr.manuals': return <ManualsPage />;
      case 'hr.payroll': return <PayrollPage />;
      case 'operations.safety': return <SafetyPage />;
      case 'ai.image': return <ImageEditorPage />;
      case 'ai.video': return <VideoAnalysisPage />;
      case 'ai.strategy': return <StrategicAnalysisPage />;
      default: return <HomePage />;
    }
  }, [currentPage]);
  
  const NavItem: React.FC<{ page: string; label: string; icon: React.ReactNode; isSubItem?: boolean; isCollapsed: boolean }> = ({ page, label, icon, isSubItem = false, isCollapsed }) => (
    <button
      onClick={() => handleSetPage(page)}
      className={`flex items-center space-x-3 p-3 w-full text-left rounded-lg transition-colors ${ 
        isSubItem ? (isCollapsed ? 'pl-3 justify-center' : 'pl-10') : (isCollapsed ? 'justify-center' : '')
      } ${
        currentPage === page
          ? 'bg-red-800 text-white'
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      {!isCollapsed && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </button>
  );

  const CollapsibleNavItem: React.FC<{name: string, title: string, icon: React.ReactNode, isCollapsed: boolean, children: React.ReactNode}> = ({name, title, icon, isCollapsed, children}) => {
    const isActive = currentPage.startsWith(name) || openMenu === name;
    return (
        <div>
            <button
                onClick={() => handleToggleMenu(name)}
                className={`flex items-center justify-between p-3 w-full text-left rounded-lg transition-colors ${
                    currentPage.startsWith(name) ? 'text-white' : 'text-gray-300'
                } hover:bg-gray-700`}
            >
                <div className={`flex items-center space-x-3 ${isCollapsed ? 'w-full justify-center' : ''}`}>
                    {icon}
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">{title}</span>}
                </div>
                {!isCollapsed && <ChevronDown className={`h-5 w-5 transition-transform ${isActive ? 'rotate-180' : ''}`} />}
            </button>
            {isActive && <div className="mt-1 space-y-1">{children}</div>}
        </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {isTutorialActive && (
        <Tutorial
          stepIndex={tutorialStep}
          onNext={() => goToStep(tutorialStep + 1)}
          onPrev={() => goToStep(tutorialStep - 1)}
          onClose={closeTutorial}
        />
      )}
    
      <aside className={`bg-gray-800 border-r border-gray-700 p-4 flex flex-col justify-between transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div>
          <div className={`flex items-center space-x-2 mb-8 p-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <Building className="h-8 w-8 text-red-500 flex-shrink-0" />
            {!isSidebarCollapsed && <h1 className="text-xl font-bold text-white whitespace-nowrap">Industrias MGP</h1>}
          </div>
          <nav className="space-y-2">
            <NavItem page="home" label="Página de Inicio" icon={<Home className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />

            <NavItem page="onboarding.identity" label="Presentación Organizacional" icon={<Users className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="onboarding.induction" label="Inducción al Personal" icon={<ClipboardList className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="operations.training" label="Capacitación y Desarrollo" icon={<GraduationCap className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="hr.preselection" label="Pre selección y Selección" icon={<UserSearch className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="hr.manuals" label="Manual de Funciones" icon={<BookUser className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="hr.payroll" label="Vinculación y Nómina" icon={<Banknote className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />
            <NavItem page="operations.safety" label="SST (Seguridad)" icon={<Shield className="h-5 w-5" />} isCollapsed={isSidebarCollapsed} />

            <CollapsibleNavItem name="ai" title="Herramientas IA" icon={<Sparkles className="h-5 w-5" />} isCollapsed={isSidebarCollapsed}>
                <NavItem page="ai.image" label="Editor de Imágenes" icon={<ImageIcon className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
                <NavItem page="ai.video" label="Análisis de Video" icon={<Film className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
                <NavItem page="ai.strategy" label="Análisis Estratégico" icon={<BrainCircuit className="h-5 w-5" />} isSubItem isCollapsed={isSidebarCollapsed} />
            </CollapsibleNavItem>
            
          </nav>
        </div>
        <div>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex items-center justify-center space-x-3 p-3 w-full text-left rounded-lg transition-colors text-gray-300 hover:bg-gray-700"
            >
              <ChevronsLeft className={`h-6 w-6 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
               {!isSidebarCollapsed && <span className="font-medium text-sm whitespace-nowrap">Cerrar Menú</span>}
            </button>
            <div className={`text-center text-xs text-gray-400 mt-4 transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                <p>&copy; 2024 Industrias MGP</p>
            </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 lg:p-10">
        {renderPage()}
      </main>

      <div className="fixed bottom-6 right-6 z-40">
        {isChatOpen && <Chatbot onClose={() => setChatOpen(false)} />}
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          className="bg-red-800 text-white p-4 rounded-full shadow-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
          aria-label="Open chat"
        >
          <Bot className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default App;