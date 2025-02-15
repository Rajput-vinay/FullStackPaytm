import { ReactNode } from "react"


interface childrenProps{
    children : ReactNode
}
export const Center = ({children}:childrenProps) =>{
    return (
        <div className="flex justify-center flex-col h-full">
            <div className="flex justify-center">
                {children}
            </div>

        </div>
    )
}