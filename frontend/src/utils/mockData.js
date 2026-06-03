// Persistence logic for MVP presentation
const MOCK_TRAILS_KEY = 'devlevel_mock_trails';

const INITIAL_TRAILS = [
    {
        id: "TR-00",
        title: "INTRODUÇÃO AO TERMINAL",
        status: "EM_CURSO",
        progress: 0,
        difficulty: "EASY",
        xpReward: 300,
        totalSteps: 4
    },
    {
        id: "TR-01",
        title: "FUNDAMENTOS DE SEGURANÇA",
        status: "BLOQUEADO",
        progress: 0,
        difficulty: "EASY",
        xpReward: 500,
        totalSteps: 4
    },
    {
        id: "TR-02",
        title: "CRIPTOGRAFIA AVANÇADA",
        status: "BLOQUEADO",
        progress: 0,
        difficulty: "HARD",
        xpReward: 1000,
        totalSteps: 4
    }
];

export const getMockTrails = () => {
    const saved = localStorage.getItem(MOCK_TRAILS_KEY);
    if (!saved) {
        localStorage.setItem(MOCK_TRAILS_KEY, JSON.stringify(INITIAL_TRAILS));
        return INITIAL_TRAILS;
    }
    return JSON.parse(saved);
};

export const updateTrailProgress = (trailId, newProgress) => {
    const trails = getMockTrails();
    const updatedTrails = trails.map(trail => {
        if (trail.id === trailId) {
            const updatedTrail = { ...trail, progress: newProgress };
            if (newProgress >= 100) {
                updatedTrail.status = "CONCLUIDA";
                // Unlock next trail
                const currentIndex = trails.findIndex(t => t.id === trailId);
                if (currentIndex < trails.length - 1) {
                    const nextTrail = trails[currentIndex + 1];
                    if (nextTrail.status === "BLOQUEADO") {
                        // We'll update the next one in the map
                    }
                }
            } else if (newProgress > 0) {
                updatedTrail.status = "EM_CURSO";
            }
            return updatedTrail;
        }
        return trail;
    });

    // Handle unlocking in a second pass if needed, or just handle it here
    const finalTrails = updatedTrails.map((trail, index) => {
        if (index > 0 && updatedTrails[index - 1].status === "CONCLUIDA" && trail.status === "BLOQUEADO") {
            return { ...trail, status: "EM_CURSO" };
        }
        return trail;
    });

    localStorage.setItem(MOCK_TRAILS_KEY, JSON.stringify(finalTrails));
    return finalTrails;
};

export const resetMockData = () => {
    localStorage.removeItem(MOCK_TRAILS_KEY);
    localStorage.removeItem('devlevel_mock_user');
};

export const getMockUser = () => {
    const saved = localStorage.getItem('devlevel_mock_user');
    if (!saved) {
        const initialUser = {
            xp: 0,
            pontuacaoTotal: 0,
            nome: "AGENTE_INVITADO",
            bio: "Acesso temporário para demonstração do sistema.",
            role: "GUEST"
        };
        localStorage.setItem('devlevel_mock_user', JSON.stringify(initialUser));
        return initialUser;
    }
    return JSON.parse(saved);
};

export const updateMockUser = (xpGain, scoreGain) => {
    const user = getMockUser();
    const updatedUser = {
        ...user,
        xp: user.xp + xpGain,
        pontuacaoTotal: user.pontuacaoTotal + scoreGain
    };
    localStorage.setItem('devlevel_mock_user', JSON.stringify(updatedUser));
    return updatedUser;
};
