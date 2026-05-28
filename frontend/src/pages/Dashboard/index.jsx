import React from 'react'
import CourseCard from '../../components/CourseCard'

const Dashboard = () => {
    return (
        <main className="flex flex-col w-full min-h-screen bg-background px-4 justify-start relative overflow-hidden pt-22">
            <div className='flex items-start flex-col gap-6 mb-5'>
                <h1 class="font-headline-lg-mobile flex flex-row items-center md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2 uppercase tracking-tight gap-2 text-2xl">
                    <span className='font-semibold border-b-2 border-b-[#00dce6]'>Status:</span> <span class="text-primary-fixed-dim font-semibold text-2xl">Online</span>
                </h1>

                <h3 className='text-on-surface-variant text-md'>
                    Bem-vindo ao Mainframe. Selecione uma trilha de estudos que deseja explorar para descriptografar e evoluir seu nível de acesso.
                </h3>
            </div>
            <CourseCard/>
        </main>
    )
}

export default Dashboard