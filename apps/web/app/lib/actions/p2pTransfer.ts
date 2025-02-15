"use server";

import { getServerSession } from "next-auth";
import { authOption } from "../auth";
import prisma from "@repo/database/client";

export async function p2ptransfer(to: string, amount: number) {
    const session = await getServerSession(authOption);
    const from = session?.user?.id;

    if (!from) {
        return { message: "User not authenticated" };
    }

    const toUser = await prisma.user.findFirst({
        where: { phone_number: to }
    });

    if (!toUser) {
        return { message: "User not found" };
    }

    try {
        await prisma.$transaction(async (trx) => {
           await trx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await trx.balance.findFirst({
                where: { userId: Number(from) }
            });

            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient funds");
            }

            // Deduct amount from sender
            await trx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: Number(amount) } }
            });

            // Add amount to receiver
            await trx.balance.update({
                where: { userId: Number(toUser.id) },
                data: { amount: { increment: Number(amount) } }
            });


        });

        return { message: "Transfer successful" };
    } catch (error: any) {
        return { message: error.message || "Transaction failed" };
    }
}
