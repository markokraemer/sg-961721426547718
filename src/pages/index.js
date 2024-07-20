import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useApp } from '@/context/AppContext';
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useState } from 'react';

export default function Home() {
  const { appDescription, setAppDescription, generatedCode, isGenerating, generateCode, generationSteps } = useApp();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleGenerate = () => {
    if (!appDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter an app description first.",
        variant: "destructive",
      });
      return;
    }
    generateCode();
    toast({
      title: "Generating Code",
      description: "Your app is being generated. Please wait...",
    });
  };

  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center">
          <motion.h1 
            className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Generate Software with <span className="text-accent">AI</span>
          </motion.h1>
          <motion.p 
            className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Create full-stack applications in minutes with the power of AI. No coding required.
          </motion.p>
          <motion.div 
            className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent/90 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
              onClick={handleGenerate}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isGenerating ? 'Generating...' : 'Generate App'}
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-accent text-white">
              <CardTitle>Describe Your App</CardTitle>
              <CardDescription className="text-accent-foreground">Use natural language to describe your application's features and requirements.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Input 
                placeholder="Describe your app..." 
                value={appDescription}
                onChange={(e) => setAppDescription(e.target.value)}
                className="w-full p-2 border rounded transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-accent text-white">
              <CardTitle>AI Generation</CardTitle>
              <CardDescription className="text-accent-foreground">Our AI will generate the full-stack code for your application.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-40 bg-gray-100 rounded-md flex flex-col items-center justify-center p-4 overflow-y-auto">
                {isGenerating ? (
                  generationSteps.map((step, index) => (
                    <motion.p 
                      key={index} 
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {step}
                    </motion.p>
                  ))
                ) : generatedCode ? (
                  <span className="text-green-500 font-semibold">Code Generated Successfully!</span>
                ) : (
                  <span className="text-gray-500">Waiting for input...</span>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-accent text-white">
              <CardTitle>Download & Deploy</CardTitle>
              <CardDescription className="text-accent-foreground">Get your application code and deploy it with ease.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-white transition-all duration-200"
                disabled={!generatedCode}
              >
                {generatedCode ? 'Download Code' : 'Generate Code First'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {generatedCode && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-accent text-white">
                <CardTitle>Generated Code</CardTitle>
                <CardDescription className="text-accent-foreground">Here's a preview of your generated code:</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}