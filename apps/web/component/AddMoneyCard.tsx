"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import { toast } from "react-toastify";

const SUPPORTED_BANKS = [
    { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
    { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" }
];

export const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState<number>(0);   

    return (
        <Card title="Add Money">
            <div className="w-full">
                <TextInput
                    label="Amount"
                    placeholder="Amount"
                    onChange={(val: string) => setValue(Number(val))}
                />
                <div className="py-4 text-left">Bank</div>
                <Select
                    onSelect={(value) => {
                        const selectedBank = SUPPORTED_BANKS.find(x => x.name === value);
                        if (selectedBank) {
                            setRedirectUrl(selectedBank.redirectUrl);
                            setProvider(selectedBank.name);
                        }
                    }}
                    options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))}
                />
                <div className="flex justify-center pt-4">
                    <Button 
                        onClick={async () => {
                            if (!value) {
                                toast.error("Please enter a valid amount.");
                                return;
                            }

                            try {
                                await createOnRampTransaction(provider, value);
                                toast.success("Transaction Processing!");
                                setTimeout(() => {
                                    if (redirectUrl) {
                                        window.location.href = redirectUrl;
                                    } else {
                                        toast.error("Invalid redirect URL");
                                    }
                                }, 1000);
                            } catch (error) {
                                toast.error("Transaction failed. Please try again.");
                                console.error(error);
                            }
                        }}
                    >
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
};
