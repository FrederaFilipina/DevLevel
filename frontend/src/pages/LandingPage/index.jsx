import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Modal = ({ isOpen, onClose, title, children, borderColor, forceYellowButtons }) => {
  if (!isOpen) return null;
  
  // Interaction colors: use primary yellow if forced, otherwise derive from border
  const textColor = forceYellowButtons ? 'text-primary' : borderColor.replace('border-', 'text-');
  const btnBorder = forceYellowButtons ? 'border-primary' : borderColor;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      <div className={`relative w-full max-w-lg bg-surface border-2 ${borderColor} p-8 animate-drop-in`}>
        {/* Close Button - Forced to yellow as per request */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-primary opacity-50 hover:opacity-100 uppercase font-code-md text-xs cursor-pointer transition-opacity"
        >
          [X]
        </button>
        
        <h3 className={`text-2xl font-headline-lg mb-6 uppercase tracking-tighter ${borderColor.replace('border-', 'text-')}`}>
          {title}
        </h3>
        
        <div className="text-on-surface/80 leading-relaxed font-body-md">
          {children}
        </div>
        
        <div className="mt-8 pt-4 border-t border-on-surface/10 flex justify-end">
          <button 
            onClick={onClose}
            className={`px-6 py-2 border ${btnBorder} ${textColor} hover:bg-white/5 uppercase font-code-md text-sm cursor-pointer transition-all`}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const features = [
    {
      id: 'booting',
      num: '01',
      title: 'Neural Booting',
      color: 'primary',
      border: 'border-primary',
      text: 'text-primary',
      desc: 'Não sabe por onde começar? Nossos protocolos guiam você desde o "Hello World" até a manipulação de arquiteturas complexas.',
      tip: 'Dica: Comece pela trilha de Lógica de Programação. É a base de todo sistema complexo em Night City.'
    },
    {
      id: 'quizzes',
      num: '02',
      title: 'Memory Quizzes',
      color: 'secondary',
      border: 'border-secondary',
      text: 'text-secondary',
      desc: 'Exercite sua memória muscular e cognitiva com quizes rápidos. Repetição espaçada projetada para fixar sintaxe diretamente no seu HD mental.',
      tip: 'Dica: Tente fazer pelo menos 3 quizes por dia. A repetição é a chave para a maestria neural.',
      forceYellow: true
    },
    {
      id: 'practice',
      num: '03',
      title: 'Deep Dive Practice',
      color: 'tertiary',
      border: 'border-tertiary',
      text: 'text-tertiary',
      desc: 'Teoria sem prática é apenas ruído. Resolva desafios de código reais dentro de um ambiente simulado que prepara você para o mercado.',
      tip: 'Dica: Não tenha medo de errar o código. Cada erro é um bit de informação que acelera seu aprendizado.',
      forceYellow: true
    }
  ];

  return (
    <>
      {/* Background Decor Layers (Truly Fixed) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-background">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="absolute inset-0 crt-grid-overlay opacity-10" />
        
        {/* Floating Digital Dust */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="cyber-particle gpu-accelerated"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-particle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0
            }}
          />
        ))}

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]" />
        
        {/* Neon Decor Lines - Yellow (Static UI Frame) */}
        <div className="neon-pulse-line w-[1px] h-[60%] left-[10%] top-0 opacity-20" />
        <div className="neon-pulse-line w-[1px] h-[70%] right-[8%] bottom-0 opacity-20" />
        <div className="neon-pulse-line h-[1px] w-[35%] left-0 top-[30%] opacity-10" />
        <div className="neon-pulse-line h-[1px] w-[30%] right-0 top-[65%] opacity-10" />
        <div className="neon-pulse-line h-[1px] w-[20%] right-[25%] bottom-[20%] opacity-10" />
      </div>

      <div className="min-h-screen text-on-surface font-body-md overflow-x-hidden relative px-4 z-10">
        {/* Background Effects */}
        <div className="scanline-effect" />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-spacing-margin-mobile md:px-spacing-margin-desktop max-w-spacing-container-max mx-auto flex flex-col items-center text-center">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] iris-glow" />
          
          <div className="relative z-10 animate-drop-in px-4">
            <h2 className="font-code-md text-secondary text-sm tracking-[0.5em] mb-4 uppercase">
              // STATUS: SYSTEM_INITIALIZED
            </h2>
            <h1 className="font-headline-xl text-5xl md:text-8xl text-primary font-black tracking-tighter mb-6 uppercase italic leading-none">
              Dev<span className="text-secondary drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">Level</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-on-surface/80 leading-relaxed mb-10 font-light">
              O hardware você já tem. Agora é hora de atualizar seu <span className="text-secondary font-bold">Córtex Cerebral</span>. 
              Aprenda a programar do zero através de desafios neurais e simulações práticas.
            </p>
            
            <div className="flex justify-center w-full">
              <button 
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-12 py-5 bg-primary text-on-primary font-bold cursor-pointer uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all relative group overflow-hidden"
              >
                <span className="relative z-10">Acessar Terminal</span>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>

        {/* Features/Info Section */}
        <section className="py-20 px-spacing-margin-mobile md:px-spacing-margin-desktop max-w-spacing-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.id} className={`p-8 border ${f.border}/20 bg-surface/50 backdrop-blur-sm hover:${f.border}/60 transition-colors group relative flex flex-col`}>
                <div className={`${f.text} mb-6 text-3xl font-code-md group-hover:animate-pulse flex justify-between items-start`}>
                  <span>{f.num}</span>
                  <button 
                    onClick={() => setActiveModal(f.id)}
                    className={`text-xs border ${f.border} px-2 py-1 opacity-50 hover:opacity-100 transition-opacity cursor-pointer`}
                  >
                    INFO.SYS
                  </button>
                </div>
                <h3 className={`${f.text} font-headline-lg text-xl mb-4 uppercase tracking-wider`}>{f.title}</h3>
                <p className="text-on-surface/70 text-sm leading-relaxed mb-6">
                  {f.desc}
                </p>
                
                {/* Modal Trigger */}
                <button 
                  onClick={() => setActiveModal(f.id)}
                  className={`mt-auto text-left text-[10px] ${f.text} uppercase tracking-[0.2em] font-bold hover:underline cursor-pointer`}
                >
                  + Expandir Detalhes
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Modals */}
        {features.map((f) => (
          <Modal 
            key={`modal-${f.id}`}
            isOpen={activeModal === f.id} 
            onClose={() => setActiveModal(null)}
            title={`Protocolo: ${f.title}`}
            borderColor={f.border}
            forceYellowButtons={f.forceYellow}
          >
            <p>{f.desc}</p>
            <div className={`mt-4 p-4 bg-background/50 border-l-4 ${f.border}`}>
              <p className="italic">{f.tip}</p>
            </div>
          </Modal>
        ))}

        {/* Bottom Visual Decor */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 shadow-[0_0_15px_rgba(252,238,10,0.5)]" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-tertiary/5 rounded-full blur-[100px]" />
      </div>
    </>
  );
};

export default LandingPage;
