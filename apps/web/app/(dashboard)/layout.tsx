import { ReactNode } from "react";
import { SidebarItem } from "../../component/SidebarItem";
import HomeIcon from "../utlis/HomeIcon";
import TransactionsIcon from "../utlis/TransactionsIcon";
import TransferIcon from "../utlis/TransferIcon";
import P2PTransferIcon from "../utlis/P2PTransferIcon";


interface LayoutProps{
    children : ReactNode
}
export default function Layout({children}:LayoutProps){

    return (
        <div className="flex">
            <div className="w-72 border-r border-slate-600 min-h-screen mr-4 pt-28">
                <div>
                    <SidebarItem href={"/dashboard"} icon ={<HomeIcon />} title="Home"  />
                    <SidebarItem href= {"/transactions"} icon ={<TransactionsIcon />} title="Transactions" />
                    <SidebarItem href= {"/transfer"} icon ={<TransferIcon />} title="Transfer" />
                    <SidebarItem href={"/p2p"} icon = {<P2PTransferIcon />} title="P2P Transfer" />
                </div>

            </div>
            {children}
        </div>
    )

}