"use client"
import { ReactNode } from "react"
import { RecoilRoot } from "recoil"
import { SessionProvider } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
export const Providers =({children}:{children: ReactNode}) =>{
    return <RecoilRoot>
        <SessionProvider>
            <ToastContainer />
        {children}
       </SessionProvider>
    </RecoilRoot>
}