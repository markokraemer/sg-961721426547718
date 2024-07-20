import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useApp } from '@/context/AppContext';
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { appDescription, setAppDescription, generatedCode, isGenerating, generateCode } = useApp();
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!appDescription) {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Generate Software with AI
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create full-stack applications in minutes with the power of AI. No coding required.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10" onClick={handleGenerate}>
                {isGenerating ? 'Generating...' : 'Generate App'}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Describe Your App</CardTitle>
                <CardDescription>Use natural language to describe your application's features and requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Describe your app..." 
                  value={appDescription}
                  onChange={(e) => setAppDescription(e.target.value)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Generation</CardTitle>
                <CardDescription>Our AI will generate the full-stack code for your application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">
                  {isGenerating ? (
                    <span className="text-gray-500">Generating...</span>
                  ) : generatedCode ? (
                    <span className="text-gray-500">Code Generated!</span>
                  ) : (
                    <span className="text-gray-500">Waiting for input...</span>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Download & Deploy</CardTitle>
                <CardDescription>Get your application code and deploy it with ease.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled={!generatedCode}>
                  {generatedCode ? 'Download Code' : 'Generate Code First'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {generatedCode && (
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Generated Code</CardTitle>
                <CardDescription>Here's a preview of your generated code:</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <code>{generatedCode}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}