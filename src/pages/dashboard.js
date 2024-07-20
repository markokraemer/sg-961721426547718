import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from '@/context/AppContext';
import { motion } from "framer-motion";

export default function Dashboard() {
  const { appDescription, generatedCode } = useApp();

  const projectTemplates = [
    { name: "E-commerce Platform", description: "A full-featured online store with product management and checkout." },
    { name: "Blog CMS", description: "A content management system for creating and managing blog posts." },
    { name: "Task Management App", description: "A collaborative tool for organizing and tracking tasks and projects." },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="h-full">
              <CardHeader className="bg-accent text-white">
                <CardTitle>Your Latest Project</CardTitle>
                <CardDescription className="text-accent-foreground">Here's a summary of your most recent app generation.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4"><strong>App Description:</strong> {appDescription || 'No app generated yet'}</p>
                {generatedCode && (
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white transition-colors duration-200">View Generated Code</Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="h-full">
              <CardHeader className="bg-accent text-white">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription className="text-accent-foreground">Start a new project or manage existing ones.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Button className="w-full mb-4 bg-accent hover:bg-accent/90 text-white transition-colors duration-200">Create New App</Button>
                <Button variant="outline" className="w-full transition-colors duration-200">View All Projects</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Project Templates</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {projectTemplates.map((template, index) => (
            <motion.div key={template.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardContent className="p-4">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white transition-colors duration-200">Use Template</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Collaboration</h2>
        <Card>
          <CardHeader className="bg-accent text-white">
            <CardTitle>Team Workspace</CardTitle>
            <CardDescription className="text-accent-foreground">Collaborate with your team on projects.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <p className="mb-4">Invite team members and work together on your generated applications.</p>
            <Button className="bg-accent hover:bg-accent/90 text-white transition-colors duration-200">Invite Team Members</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}