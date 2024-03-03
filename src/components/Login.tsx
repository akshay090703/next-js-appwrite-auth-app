"use client"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import toast from "react-hot-toast"

const Login = () => {
    const router = useRouter()
    const { setAuthStatus } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("");

    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const session = await appwriteService.login(formData);

            if (session) {
                setAuthStatus(true);
                router.push("/profile")
            }
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10">
                <div className=" mb-2 flex justify-center">
                    <span className=" inline-block w-full max-w-[60px]">
                        <img src="/favicon.ico" alt="Logo" />
                    </span>
                </div>
                <h2 className=" text-center text-2xl font-bold leading-tight text-black">
                    Sign in to create account
                </h2>
                <p className=" mt-2 text-center text-base text-gray-600">
                    Don&apos;t have any account?&nbsp;
                    <Link href="/signup" className=" font-medium text-primary transition-all duration-200 hover:underline">
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={login} className="mt-8">
                    <div className=" space-y-5 ">
                        <div>
                            <label htmlFor="email" className=" text-base font-medium text-gray-900">Email Address</label>
                            <div className="mt-2">
                                <input type="email" name="email" id="email" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className=" text-base font-medium text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input type="password" name="password" id="password" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1  disabled:cursor-not-allowed disabled:opacity-50" placeholder="Password" value={formData.password} onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))} required
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80">
                                Sign in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login