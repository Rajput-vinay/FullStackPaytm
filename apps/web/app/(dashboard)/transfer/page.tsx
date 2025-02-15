import { getServerSession } from "next-auth";
import { AddMoneyCard } from "../../../component/AddMoneyCard";
import { BalanceCard } from "../../../component/BalanceCard";
import { OnRampTransaction } from "../../../component/OnRampTransaction";
import { authOption } from "../../lib/auth";
import prisma from "@repo/database/client";

async function getBalance() {
  const session = await getServerSession(authOption);
  if (!session?.user?.id) return { amount: 0, locked: 0 };

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOption);
  if (!session?.user?.id) return [];

  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  // Fetch balance and transactions
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">Transfer</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
