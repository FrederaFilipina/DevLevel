import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import { updateMockUser, updateTrailProgress, getMockTrails } from '../../utils/mockData';
import { questionsByTrail } from '../../utils/questionsData';

const Quiz = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentStep = parseInt(searchParams.get('step') || '1');
    const trailId = searchParams.get('trailId') || 'TR-00';

    // Get questions for the current trail
    const trailQuestions = questionsByTrail[trailId] || [];

    const [questaoAtual, setQuestaoAtual] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shuffledOpcoes, setShuffledOpcoes] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    // Load question based on URL step
    useEffect(() => {
        if (trailQuestions.length > 0) {
            const index = Math.min(Math.max(currentStep - 1, 0), trailQuestions.length - 1);
            const questao = trailQuestions[index];
            setQuestaoAtual(questao);
            setShuffledOpcoes([...questao.opcoes].sort(() => Math.random() - 0.5));
            setSelectedOption(null);
            setIsSubmitted(false);
        }
    }, [currentStep, trailId]);

    const handleSubmit = () => {
        if (!selectedOption || isSubmitted) return;
        
        setIsSubmitted(true);
        const opcaoSelecionada = questaoAtual.opcoes.find(o => o.id === selectedOption);
        
        // Simular latência de processamento
        setTimeout(() => {
            if (opcaoSelecionada?.correta) {
                toast.success("ACESSO CONCEDIDO: INTEGRIDADE CONFIRMADA", {
                    className: 'cyber-toast-success',
                });
                
                // Update MVP Mock Data
                const trails = getMockTrails();
                const currentTrail = trails.find(t => t.id === trailId);
                const xpPerQuestion = currentTrail ? Math.round(currentTrail.xpReward / trailQuestions.length) : questaoAtual.xp;
                
                updateMockUser(xpPerQuestion, xpPerQuestion * 2);
                
                const progressPerQuestion = 100 / trailQuestions.length;
                updateTrailProgress(trailId, Math.min(currentStep * progressPerQuestion, 100));

                if (currentStep < trailQuestions.length) {
                    setSearchParams({ step: (currentStep + 1).toString(), trailId });
                } else {
                    setIsFinished(true);
                }
            } else {
                toast.error("VULNERABILIDADE DETECTADA: RESPOSTA ERRADA...", {
                    className: 'cyber-toast-error',
                });
                
                // Escolher uma pergunta aleatória diferente da atual (se houver mais de uma)
                let novoIndex;
                do {
                    novoIndex = Math.floor(Math.random() * trailQuestions.length);
                } while (trailQuestions.length > 1 && trailQuestions[novoIndex].id === questaoAtual.id);
                
                const novaQuestao = trailQuestions[novoIndex];
                
                // Aplicar a nova pergunta com um pequeno atraso visual
                setTimeout(() => {
                    setQuestaoAtual(novaQuestao);
                    setShuffledOpcoes([...novaQuestao.opcoes].sort(() => Math.random() - 0.5));
                    setSelectedOption(null);
                    setIsSubmitted(false);
                }, 500);
            }
        }, 1500);
    };

    if (isFinished) {
        return (
            <main className="flex items-center justify-center w-full min-h-screen bg-background relative overflow-hidden px-4">
                <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center animate-drop-in max-w-lg text-center">
                    <div className="relative mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-secondary animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div className="absolute -inset-4 border border-secondary/20 rounded-full animate-ping"></div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-primary uppercase italic tracking-tighter mb-4 drop-shadow-[0_0_15px_rgba(252,238,10,0.5)]">
                        SISTEMA_DESCRIPTOGRAFADO
                    </h1>
                    
                    <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed italic border-l-2 border-secondary/50 pl-4 text-sm md:text-base">
                        "Protocolo de descriptografia concluído com sucesso. Todos os pacotes de dados foram extraídos e a integridade da conexão foi mantida."
                    </p>

                    <button 
                        onClick={() => navigate('/dashboard')}
                        className="group relative px-12 py-4 bg-secondary cursor-pointer text-background font-black uppercase tracking-[0.4em] transform -skew-x-12 hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
                    >
                        RETORNAR_AO_MAINFRAME
                        <div className="absolute inset-0 bg-white/20 group-hover:animate-shimmer pointer-events-none"></div>
                    </button>
                </div>
            </main>
        );
    }

    if (!questaoAtual) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-code-md">CARREGANDO_PROTOCOLO...</div>;

    const progressoModulo = (currentStep / trailQuestions.length) * 100;

    return (
        <main className="flex flex-col w-full min-h-screen bg-background px-4 md:px-8 pt-24 pb-12 relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto w-full mb-8">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-[10px] text-primary/60 font-code-md block mb-1 tracking-[0.3em]">STEP_{currentStep.toString().padStart(2, '0')} // MISSION_ID: {questaoAtual.id}</span>
                        <h1 className="text-2xl md:text-4xl font-black text-primary uppercase italic tracking-tighter flex items-center gap-3">
                            <span className="bg-primary text-background px-2 skew-x-[-12deg]">{questaoAtual.dificuldade}</span>
                            <span className="drop-shadow-[0_0_8px_rgba(252,238,10,0.4)]">{questaoAtual.titulo}</span>
                        </h1>
                    </div>
                    <div className="text-right">
                        <span className="text-[10px] text-secondary font-black tracking-widest block mb-1">RECOMPENSA</span>
                        <span className="text-2xl font-code-md text-secondary leading-none">{questaoAtual.xp} XP</span>
                    </div>
                </div>

                <div className="h-1.5 w-full bg-surface-container-highest/30 border border-primary/20 relative overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 bottom-0 bg-primary shadow-[0_0_15px_rgba(252,238,10,0.5)] transition-all duration-1000 ease-out"
                        style={{ width: `${progressoModulo}%` }}
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-6">
                    <div className="p-6 bg-surface-container-low/40 border-l-4 border-secondary backdrop-blur-sm">
                        <p className="text-on-surface text-lg leading-relaxed font-body-md italic">
                            "{questaoAtual.descricao}"
                        </p>
                    </div>

                    <div className="relative group">
                        <div className="flex items-center justify-between bg-surface-container px-4 py-2 border border-primary/20 border-b-0">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                            </div>
                            <span className="text-[10px] text-primary/40 font-code-md uppercase">mainframe_compiler.js</span>
                        </div>
                        <div className="p-6 bg-surface-container-lowest border border-primary/20 font-code-md text-sm md:text-base leading-relaxed overflow-x-auto relative">
                            <pre className="text-on-surface">
                                {questaoAtual.codigo.split('\n').map((line, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="text-primary/20 w-4 text-right select-none">{i + 1}</span>
                                        <code className="text-secondary/90">{line}</code>
                                    </div>
                                ))}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary animate-pulse"></span> SELECIONE O PROTOCOLO DE CORREÇÃO
                    </h3>
                    
                    {shuffledOpcoes.map((opcao) => (
                        <button
                            key={opcao.id}
                            disabled={isSubmitted}
                            onClick={() => setSelectedOption(opcao.id)}
                            className={`group relative p-4 text-left border transition-all duration-300 ${
                                selectedOption === opcao.id 
                                    ? 'border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
                                    : 'border-primary/20 bg-surface-container-low/40 hover:border-primary/50'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-code-md border ${
                                    selectedOption === opcao.id ? 'bg-secondary text-background border-secondary' : 'text-primary/40 border-primary/20'
                                }`}>
                                    {opcao.id}
                                </span>
                                <span className={`font-body-md text-sm ${
                                    selectedOption === opcao.id ? 'text-secondary font-bold' : 'text-on-surface'
                                }`}>
                                    {opcao.texto}
                                </span>
                            </div>
                        </button>
                    ))}

                    <div className="mt-6 flex flex-col gap-4">
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedOption || isSubmitted}
                            className={`w-full py-4 font-black uppercase tracking-[0.4em] cursor-pointer italic transition-all duration-500 relative overflow-hidden ${
                                !selectedOption || isSubmitted
                                    ? 'bg-surface-container-highest text-on-surface-variant/30 cursor-not-allowed'
                                    : 'bg-primary text-background shadow-[0_0_20px_rgba(252,238,10,0.3)] hover:scale-[1.02]'
                            }`}
                        >
                            {isSubmitted ? "ANALISANDO_INTEGRIDADE..." : "ENVIAR_PROTOCOLO"}
                        </button>
                        
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-2 text-[10px] text-primary/40 font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center gap-2"
                        >
                            Abortar e Voltar ao Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-4 left-8 hidden md:flex items-center gap-6 opacity-30">
                <div className="flex flex-col">
                    <span className="text-[8px] text-primary font-black">LATENCY</span>
                    <span className="text-[10px] text-primary font-code-md">24ms</span>
                </div>
                <div className="flex flex-col border-l border-primary/20 pl-6">
                    <span className="text-[8px] text-primary font-black">STATUS</span>
                    <span className="text-[10px] text-primary font-code-md">{isSubmitted ? 'INJECTING...' : 'WAITING...'}</span>
                </div>
            </div>
        </main>
    );
};

export default Quiz;
