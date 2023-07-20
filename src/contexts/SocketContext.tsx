import React, {FC, useContext, useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {createContext} from "react";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketContextProps {
    children: React.ReactNode;

}

let socket: Socket = io("http://localhost:3000");
export const SocketProvider:FC<SocketContextProps> = ({ children}) => {

    useEffect(() => {


        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};


