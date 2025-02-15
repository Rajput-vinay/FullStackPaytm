"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2ptransfer } from "../app/lib/actions/p2pTransfer";
import {toast} from 'react-toastify'

export function SendCard() {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const handleTransfer = async () => {
        if (!phoneNumber || !amount) {
            toast.error("Please enter both phone number and amount.");
            return;
        }

        try {
            const response = await p2ptransfer(phoneNumber, Number(amount) * 100);
            if (response.message === "Transfer successful") {
                toast.success("Money sent successfully! 🚀");
                setPhoneNumber("");
                setAmount("");
            } else {
                toast.error(response.message || "Transaction failed!");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="h-[90vh]">
            
            <Center>
                <Card title="Send Money">
                    <div className="min-w-72 pt-2">
                        <TextInput
                            placeholder="Phone Number"
                            label="Phone Number"
                            onChange={(val: string) => setPhoneNumber(val)}
                            value={phoneNumber}
                        />

                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            onChange={(val: string) => setAmount(val)}
                            value={amount}
                        />

                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleTransfer}>
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </Center>
        </div>
    );
}
