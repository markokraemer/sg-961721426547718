import Head from 'next/head';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Layout({ children }) {
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
                  <span className="text-2xl font-bold text-indigo-600">Softgen Clone</span>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="mr-2">Sign In</Button>
              <Button>Get Started</Button>
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