import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '@/context/AppContext';

export default function Dashboard() {
  const { appDescription, generatedCode } = useApp();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Latest Project</CardTitle>
              <CardDescription>Here's a summary of your most recent app generation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p><strong>App Description:</strong> {appDescription || 'No app generated yet'}</p>
              {generatedCode && (
                <Button className="mt-4">View Generated Code</Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start a new project or manage existing ones.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">Create New App</Button>
              <Button variant="outline" className="w-full">View All Projects</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}