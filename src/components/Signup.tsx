"use client"
import appwriteService from "@/appwrite/config"
import useAuth from "@/context/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"
import toast from "react-hot-toast"

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [error, setError] = useState("");
    const router = useRouter()
    const { setAuthStatus } = useAuth();

    const create = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const userData = await appwriteService.createUserAccount(formData)

            if (userData) {
                setAuthStatus(true);
                router.push("/profile")
                toast.success("User created successfully")
            }
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message)
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
                <h2 className=" text-right text-2xl font-bold leading-tight text-black">
                    Sign up to create account
                </h2>
                <p className=" mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link href="/login" className=" font-medium text-primary transition-all duration-200 hover:underline">
                        Sign in
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                    <div className=" space-y-50">
                        <div>
                            <label htmlFor="name" className=" text-base font-medium text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input type="text" name="name" id="name" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required
                                />
                            </div>
                        </div>
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
                                Create Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup