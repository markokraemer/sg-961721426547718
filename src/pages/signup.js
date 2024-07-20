import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Layout from '@/components/Layout';

export default function SignUp() {
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    try {
      await signUp(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create an account');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader className="bg-accent text-white">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription className="text-accent-foreground">Create your Softgen Clone account</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters long" }
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (val) => val === watch('password') || "Passwords do not match"
                  })}
                  className="w-full p-2 border rounded"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                Sign Up
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}