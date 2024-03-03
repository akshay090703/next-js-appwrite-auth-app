"use client"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React from "react"
import useState from 'react';

// this will run on all the pages of this level
const ProtectedLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const router = useRouter();
    const { authStatus } = useAuth();

    if (!authStatus) {
        router.replace("/login");
        return <></>
    }

    return children
}

export default ProtectedLayout