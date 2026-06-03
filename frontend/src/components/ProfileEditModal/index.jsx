import React, { useState, useEffect } from 'react';
import { CustomInput } from '../CustomInput';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfileEditModal = ({ isOpen, onClose, profile, onUpdate }) => {
    const [nome, setNome] = useState(profile?.nome || '');
    const [email, setEmail] = useState(profile?.email || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl || '');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && profile) {
            setNome(profile.nome || '');
            setEmail(profile.email || '');
            setBio(profile.bio || '');
            setAvatarUrl(profile.avatarUrl || '');
            setSenha('');
        }
    }, [isOpen, profile]);

    if (!isOpen) return null;

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('tokenAcesso');
            const updateData = {};
            
            if (nome !== profile?.nome) updateData.nome = nome;
            if (email !== profile?.email) updateData.email = email;
            if (bio !== profile?.bio) updateData.bio = bio;
            if (avatarUrl !== profile?.avatarUrl) updateData.avatarUrl = avatarUrl;
            if (senha) updateData.senha = senha;

            if (Object.keys(updateData).length === 0) {
                toast.info("Nenhuma alteração detectada.", { position: "top-right" });
                onClose();
                return;
            }

            await axios.put('http://localhost:3000/user/', updateData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("MAINFRAME_UPDATED: Perfil atualizado com sucesso!", {
                position: "top-right",
            });
            
            onUpdate(); // Refresh profile in Dashboard
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            const errorMsg = error?.response?.data?.message || "Erro ao atualizar perfil";
            toast.error(`SISTEMA_FALHOU: ${errorMsg}`, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300">
            {/* Background Glitch Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
            </div>

            <div className="relative w-full max-w-xl bg-surface-container-low border border-primary/20 p-6 md:p-10 shadow-[0_0_80px_rgba(252,238,10,0.05)] overflow-hidden group">
                {/* Tech Corners - Refined */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-primary"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-secondary/40"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-secondary/40"></div>
                
                {/* Scanning Line Effect */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

                <div className="flex justify-between items-start mb-10 border-b border-primary/10 pb-6 relative">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-primary/40 font-code-md tracking-[0.4em] mb-1">CONFIGURAÇÕES_DE_CONTA</span>
                        <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter italic leading-none drop-shadow-[0_0_8px_rgba(252,238,10,0.4)]">
                            EDITAR_PERFIL
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-primary/30 hover:text-secondary transition-all font-code-md text-xs cursor-pointer border border-primary/10 px-3 py-1 bg-primary/5 hover:bg-secondary/10 hover:border-secondary/30"
                    >
                        [ FECHAR ]
                    </button>
                    
                    <div className="absolute -bottom-[1px] left-0 w-24 h-[2px] bg-secondary shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
                </div>

                <form onSubmit={handleSave} className="space-y-5 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <CustomInput 
                            label="NOME COMPLETO"
                            id="nome"
                            value={nome}
                            setValue={setNome}
                            placeholder="Seu nome"
                            hasArrow
                        />
                        <CustomInput 
                            label="E-MAIL"
                            id="email"
                            type="email"
                            value={email}
                            setValue={setEmail}
                            placeholder="seu@email.com"
                            hasArrow
                        />
                    </div>

                    <CustomInput 
                        label="URL DO AVATAR"
                        id="avatarUrl"
                        value={avatarUrl}
                        setValue={setAvatarUrl}
                        placeholder="https://link-da-imagem.com"
                        hasArrow
                    />

                    <fieldset className="flex flex-col gap-2 mb-2 group/field">
                        <label className="block text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1 pl-1 border-l-2 border-primary/20 group-focus-within/field:border-primary group-focus-within/field:text-primary transition-all">
                            BIOGRAFIA / DESCRIÇÃO
                        </label>
                        <div className="relative">
                            <textarea 
                                className="w-full bg-background/50 border-b-2 border-primary/10 focus:border-secondary text-on-surface font-code-md text-sm px-4 py-4 outline-none transition-all placeholder:text-on-surface-variant/20 min-h-[120px] resize-none scrollbar-hide"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Conte um pouco sobre você..."
                            />
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary/20"></div>
                        </div>
                    </fieldset>

                    <CustomInput 
                        label="ALTERAR SENHA"
                        id="senha"
                        type="password"
                        value={senha}
                        setValue={setSenha}
                        placeholder="Deixe em branco para não alterar"
                        hasArrow
                        required={false}
                    />

                    <div className="flex flex-col md:flex-row gap-4 pt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 border-2 border-tertiary/30 text-tertiary font-black uppercase tracking-[0.1em] text-xs hover:bg-tertiary/10 hover:border-tertiary transition-all cursor-pointer relative group/cancel overflow-hidden"
                        >
                            <span className="relative z-10">CANCELAR</span>
                            <div className="absolute inset-0 translate-x-[-100%] group-hover/cancel:translate-x-0 bg-tertiary/5 transition-transform duration-300"></div>
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 relative overflow-hidden bg-primary text-background group-hover/btn:text-secondary font-black uppercase tracking-[0.2em] text-xs py-4 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer group/btn shadow-[0_0_20px_rgba(252,238,10,0.15)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 text-blackf transition-colors duration-300">
                                {loading ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-secondary border-t-transparent animate-spin"></div>
                                        SALVANDO...
                                    </>
                                ) : (
                                    "SALVAR"
                                )}
                            </span>
                            {/* Standard Glitch/Glint Hover Overlay */}
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                        </button>
                    </div>
                </form>

                {/* Status Bar */}
                <div className="mt-8 pt-4 border-t border-primary/5 flex justify-between items-center text-[8px] font-code-md text-primary/20 uppercase tracking-[0.3em]">
                    <span>SISTEMA: ONLINE</span>
                    <span>SINCRONIZAÇÃO: {loading ? 'EXECUTANDO' : 'AGUARDANDO'}</span>
                    <span>VER: 2.0.4</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditModal;
