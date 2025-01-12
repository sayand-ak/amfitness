import Form from "../../ui/Form"
import Link from "../../ui/Link";

export default function LoginPage() {
    const fields = [
        { name: "username", label: "Username", type: "text", placeholder: "Enter your username" },
        { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
    ];

    return (
        <div className="min-h-screen flex justify-center">
            {/* Video/Image Section */}
            <div className="relative w-[30%] bg-secondary hidden md:flex">
                <video className="w-full h-full object-cover" autoPlay muted loop>
                    <source src="/login.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-start bg-black bg-opacity-50 pt-12 pl-10">
                    <h2 className="text-white text-xl font-bold animate-text">Brand name</h2>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-[70%] flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold">Fitness Center Login</h2>
                        <p className="text-gray-600 mt-2">Please enter your details</p>
                    </div>

                    {/* Client-side form */}
                    <Form
                        fields={fields}
                        buttonLabel="Sign in"
                    />

                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <p>
                            Don't have an account? <Link href="/signup">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
