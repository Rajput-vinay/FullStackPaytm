"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";


interface SidebarItemProps {
    href: string;
    title: string;
    icon: ReactNode;
}

export const SidebarItem = ({ href,title,icon }: SidebarItemProps) => {
const router = useRouter()
const pathname = usePathname()
const selected = pathname === href
    return(
        <div className={`flex ${selected ? "text-[#6445ac]": "text-slate-5" } cursor-pointer p-2 pl-8`} onClick={() =>{
            router.push(href)
        }}>
            <div className="pr-2">
                {icon}
            </div>
            <div className={`font-bold ${selected ? "text-[#6445ac]" : "text-slate-500" }`}>
                {title}
            </div>
        </div>
    )
}