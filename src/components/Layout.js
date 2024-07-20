import Head from 'next/head';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export default function Layout({ children }) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Softgen Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <Image src="https://softgen.ai/Logo.svg" alt="Softgen Logo" width={120} height={40} />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/" className={`${router.pathname === '/' ? 'border-accent text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}>
                  Home
                </Link>
                <Link href="/dashboard" className={`${router.pathname === '/dashboard' ? 'border-accent text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}>
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <>
                  <span className="mr-4 text-gray-700">{user.email}</span>
                  <Button variant="outline" className="mr-2" onClick={signOut}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="mr-2" onClick={() => router.push('/signin')}>Sign In</Button>
                  <Button className="bg-accent hover:bg-accent/90 text-white" onClick={() => router.push('/signup')}>Get Started</Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">© 2023 Softgen Clone. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}