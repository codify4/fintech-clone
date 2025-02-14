import { create } from "zustand"
import { zustandStorage } from "./mmkv-storage";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Transaction {
    id: number;
    amount: number;
    date: Date;
    title: string;
}

export interface BalanceState {
    transactions: Transaction[];
    balance: () => number;
    runTransaction: (transaction: Transaction) => void;
    clearTransactions: () => void;
}

export const useBalanceStore = create<BalanceState>()(
    persist((set, get) => ({
        transactions: [],
        balance: () => 0,
        runTransaction: (transaction: Transaction) => {
            set((state) => ({ transactions: [...state.transactions, transaction] }));
        },
        clearTransactions: () => {
            set({
                transactions: []
            });
        },
    }), {
        name: 'balance',
        storage: createJSONStorage(() => zustandStorage)
    })
);