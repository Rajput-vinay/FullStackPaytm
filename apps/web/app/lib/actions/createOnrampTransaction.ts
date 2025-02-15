"use server"
import { getServerSession } from "next-auth";
import { authOption } from "../auth";
import prisma from "@repo/database/client";




export async function createOnRampTransaction(provider: string,amount: number){
    //  ideall the token should come from the banking provider

    const session = await getServerSession(authOption);

    if(!session?.user || !session?.user?.id){
        return {
            message: "User not authenticated",
        }
    }

    const token = (Math.random() * 10000).toString()

    await prisma.onRampTransaction.create({
        data:{
            amount: amount *100,
            provider,
            status:"Processing",
            token:token,
            userId: Number(session?.user?.id),
            startTime: new Date()
        }
    })
    return {
        message: "Transaction created successfully",
    }
}