'use client'
import { signIn } from "next-auth/react"

const Login = () => {
    return (
        <div>
            <h2>Admin Login</h2>
            <button onClick={() => signIn("google", {callbackUrl: '/admin'})}>
                Sign in with Google
            </button>
        </div>
    )
}

export default Login