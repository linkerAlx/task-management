"use client";

import { User } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

type StateContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    addTask: boolean;
    setAddTask: Dispatch<SetStateAction<boolean>>,
    expandedOrderId: number | undefined,
    setExpandedOrderId: Dispatch<SetStateAction<number | undefined>>
};

const context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [addTask, setAddTask] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const token = Cookies.get("clientToken");
        if (token) {
            try {
                const decoded = jwt.decode(token);
                if (decoded) {
                    setUser(decoded as any);
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
            }
        }
    }, []);

    return (
        <context.Provider
            value={{
                user,
                setUser,
                addTask,
                setAddTask,
                expandedOrderId,
                setExpandedOrderId
            }}
        >
            {children}
        </context.Provider>
    )
};

export const useStateContext = () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
        throw new Error("useStateContext must be used within a StateContext Provider");
    }
    return ctx;
};
