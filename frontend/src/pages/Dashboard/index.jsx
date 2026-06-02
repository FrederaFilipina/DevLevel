import React from 'react'
import CourseCard from '../../components/CourseCard'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth();

    // Independent Level Calculation Logic
    // Formula: Level = floor(sqrt(XP / 100)) + 1
    // This creates a progressive curve where higher levels require more XP
    const calculateLevelData = (xp) => {
        const baseXP = 100; // XP for level 2
        const level = Math.floor(Math.sqrt(xp / baseXP)) + 1;

        // XP required for the current level start
        const currentLevelXP = Math.pow(level - 1, 2) * baseXP;
        // XP required for the next level start
        const nextLevelXP = Math.pow(level, 2) * baseXP;

        const xpInCurrentLevel = xp - currentLevelXP;
        const xpRequiredForNext = nextLevelXP - currentLevelXP;
        const progress = Math.min(Math.round((xpInCurrentLevel / xpRequiredForNext) * 100), 100);

        return { level, progress, nextLevelXP, xpInCurrentLevel, xpRequiredForNext };
    };

    const currentXP = user?.xp || 0;
    const { level: calculatedLevel, progress: xpProgress, nextLevelXP, xpRequiredForNext, xpInCurrentLevel } = calculateLevelData(currentXP);

    // Fallback data for fields not yet in JWT/Context
    const userData = {
        name: user?.nome || (user?.email ? user.email.split('@')[0].toUpperCase() : "AGENTE_ANONIMO"),
        xp: currentXP,
        bio: user?.bio || "Acesso de nível básico ao Mainframe. Buscando descriptografar novos conhecimentos e elevar privilégios de acesso.",
        score: user?.pontuacaoTotal || 0,
        role: user?.role || "USER"
    };

    // Dynamic color for score
    const getScoreColor = (score) => {
        if (score === 0) return 'text-tertiary border-tertiary/40 bg-tertiary/5';
        if (score < 1000) return 'text-secondary-fixed-dim border-secondary-fixed-dim/40 bg-secondary/5';
        if (score < 5000) return 'text-secondary border-secondary/40 bg-secondary/10';
        return 'text-primary border-primary/40 bg-primary/10 shadow-[0_0_15px_rgba(252,238,10,0.2)]';
    };

    const scoreStyles = getScoreColor(userData.score);

    // Temporary avatar using a bot-style generator
    const tempAvatar = `https://api.dicebear.com/7.x/bottts/svg?seed=${user?.id || 'default'}&backgroundColor=020202,0d0d0d`;

    return (
        <main className="flex flex-col w-full min-h-screen bg-background px-4 md:px-8 justify-start relative overflow-hidden pt-22 pb-10">
            {/* User Profile Section */}
            <section className="flex flex-col md:flex-row gap-6 md:gap-8 mb-12 p-6 md:p-8 border border-primary/10 bg-surface-container-low/20 backdrop-blur-md relative overflow-hidden group animate-drop-in">
                {/* Tech Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/50"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/50"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50"></div>

                {/* Mobile Top Header: Avatar Left, Level Right */}
                <div className="flex md:hidden items-center justify-start gap-4 w-full mb-2">
                    <div className="relative w-24 h-24 flex-shrink-0">
                        <div className="absolute inset-0 border-2 border-secondary/40"></div>
                        <img
                            src={user?.avatarUrl ? user.avatarUrl : tempAvatar}
                            alt="Profile"
                            className="w-full h-full object-cover bg-surface-container-high grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] bg-secondary text-background text-[7px] font-black text-center py-0.5 uppercase tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                            {userData.role}
                        </div>
                    </div>

                    <div className="relative inline-flex items-center justify-center px-5 py-2 border-2 border-primary shadow-[0_0_15px_rgba(252,238,10,0.2)] transform -skew-x-12">
                        <div className="absolute -top-3 -left-1 bg-background px-1 border-x border-primary">
                            <span className="text-[8px] text-primary uppercase font-bold tracking-[0.3em] skew-x-12">LEVEL</span>
                        </div>
                        <span className="text-3xl font-black text-secondary leading-none skew-x-12 drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">{calculatedLevel}</span>
                    </div>
                </div>

                {/* Profile Picture (Desktop Only) */}
                <div className="hidden md:relative md:block w-44 h-44 flex-shrink-0">
                    <div className="absolute inset-0 border-2 border-secondary/40 group-hover:border-secondary transition-colors duration-500"></div>
                    <div className="absolute -inset-2 border border-primary/10"></div>
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-secondary"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-secondary"></div>

                    <img
                        src={user?.avatarUrl ? user.avatarUrl : tempAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover bg-surface-container-high grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%] bg-secondary text-background text-[9px] font-black text-center py-0.5 uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                        {userData.role} ACCESS
                    </div>
                </div>

                {/* Info and Stats */}
                <div className="flex-1 flex flex-col gap-4 md:gap-5 text-left">
                    <div className="relative flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                        <div>
                            <span className="text-[10px] text-primary/40 font-code-md block mb-1">USER_IDENTIFIER: {user?.id?.slice(0, 8) || "UNKNOWN"}</span>
                            <h2 className="text-3xl md:text-6xl font-black text-primary uppercase tracking-tighter italic leading-tight md:leading-[0.8] group-hover:drop-shadow-[0_0_8px_rgba(252,238,10,0.3)] transition-all">
                                {userData.name}
                            </h2>
                        </div>

                        {/* Level Badge (Desktop Only) */}
                        <div className="hidden md:relative md:inline-flex items-center justify-center px-6 py-2 border-2 border-primary shadow-[0_0_15px_rgba(252,238,10,0.2)] transform -skew-x-12 group/level hover:bg-primary/5 transition-all duration-300">
                            <div className="absolute -top-3 -left-1 bg-background px-1 border-x border-primary">
                                <span className="text-[8px] text-primary uppercase font-bold tracking-[0.3em] skew-x-12">LEVEL</span>
                            </div>
                            <span className="text-3xl font-black text-secondary leading-none skew-x-12 drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]">{calculatedLevel}</span>
                            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-primary"></div>
                        </div>
                    </div>

                    <p className="text-on-surface-variant text-sm md:text-base max-w-2xl font-body-md border-l-2 border-secondary/20 pl-4 py-2 italic bg-secondary/5 relative">
                        <span className="absolute top-0 left-0 w-1 h-2 bg-secondary/50"></span>
                        "{userData.bio}"
                    </p>

                    {/* Integrated Progress Bar - Refined */}
                    <div className="w-full max-w-2xl mt-1">
                        <div className="flex justify-between items-center mb-2 px-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary animate-pulse"></div>
                                <span className="text-[10px] text-primary uppercase font-black tracking-[0.25em]">Neural_Sync_Progress</span>
                            </div>
                            <span className="text-[10px] text-primary/80 font-code-md bg-primary/10 px-2 border border-primary/20">{currentXP} / {nextLevelXP} XP</span>
                        </div>
                        <div className="h-3 md:h-4 w-full bg-surface-container-highest/20 border border-primary/30 relative p-[2px]">
                            <div
                                className="h-full bg-primary shadow-[0_0_15px_rgba(252,238,10,0.4)] transition-all duration-1000 ease-out relative overflow-hidden"
                                style={{ width: `${xpProgress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 skew-x-[-45deg] translate-x-[-100%] animate-[scanline_2s_linear_infinite] opacity-30"></div>
                            </div>
                            <div className="absolute inset-0 flex pointer-events-none">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="flex-1 border-r border-background/40" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid: XP Left, Score Right on Mobile */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2 max-w-lg">
                        <div className="flex flex-col p-3 md:p-4 border border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all relative overflow-hidden group/stat cursor-default">
                            <div className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t border-r border-secondary/50"></div>
                            <span className="text-[7px] md:text-[9px] text-secondary/70 uppercase font-black tracking-widest mb-1 flex items-center gap-1 md:gap-2">
                                <span className="w-1 h-1 bg-secondary"></span> XP_ACC
                            </span>
                            <div className="flex items-baseline gap-1 md:gap-2">
                                <span className="text-2xl md:text-4xl font-code-md text-secondary leading-none tracking-tighter">{userData.xp}</span>
                                <span className="hidden sm:inline text-[8px] md:text-[10px] text-secondary/50 uppercase font-bold">Pts</span>
                            </div>
                        </div>

                        <div className={`flex flex-col p-3 md:p-4 border transition-all duration-500 relative overflow-hidden group/stat cursor-default ${scoreStyles}`}>
                            <div className="absolute top-0 right-0 w-4 md:w-6 h-4 md:h-6 border-t border-r border-current opacity-30"></div>
                            <span className="text-[7px] md:text-[9px] uppercase font-black tracking-widest mb-1 flex items-center gap-1 md:gap-2 opacity-70">
                                <span className="w-1 h-1 bg-current"></span> SCORE
                            </span>
                            <div className="flex items-baseline gap-1 md:gap-2">
                                <span className="text-2xl md:text-4xl font-code-md leading-none tracking-tighter">{userData.score}</span>
                                <span className="hidden sm:inline text-[8px] md:text-[10px] uppercase font-bold opacity-50">PTS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='flex items-start flex-col gap-4 mb-4 pl-2 border-l-2 border-primary-fixed-dim/30'>
                <h1 className="flex flex-row items-center font-headline-lg text-primary uppercase tracking-tighter gap-3 text-2xl">
                    <span className='font-black border-b-2 border-primary-fixed-dim'>MAINFRAME_STATUS:</span> 
                    <span className="text-primary-fixed-dim font-bold animate-pulse drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">ONLINE</span>
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary-fixed-dim"></span>
                        <span className="w-1.5 h-1.5 bg-primary-fixed-dim/40"></span>
                    </div>
                </h1>

                <h3 className='text-on-surface-variant text-sm md:text-md max-w-3xl leading-relaxed font-body-md opacity-80'>
                    Conexão estabelecida. Selecione uma trilha de estudos para iniciar o processo de descriptografia e elevar seus privilégios de sistema no diretório raiz.
                </h3>
            </div>

            <div className="flex flex-col gap-6">
                <CourseCard 
                    id="TR-00" 
                    title="INTRODUÇÃO AO TERMINAL" 
                    status="CONCLUIDA" 
                    progress={100} 
                    difficulty="EASY" 
                />
                <CourseCard 
                    id="TR-01" 
                    title="FUNDAMENTOS DE SEGURANÇA" 
                    status="EM_CURSO" 
                    progress={35} 
                    difficulty="EASY" 
                />
                <CourseCard 
                    id="TR-02" 
                    title="CRIPTOGRAFIA AVANÇADA" 
                    status="BLOQUEADO" 
                    progress={0} 
                    difficulty="HARD" 
                />
            </div>
        </main>
    )
}

export default Dashboard
