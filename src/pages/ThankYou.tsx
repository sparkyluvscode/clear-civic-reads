import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#030712] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Thanks for Joining the Waitlist!
          </h1>
          <p className="text-xl text-gray-300">
            You will be notified when ClearPolicy releases.
          </p>
          <p className="text-lg text-gray-400">
            Follow{" "}
            <a
              href="https://linkedin.com/in/pranilraichura"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
            >
              linkedin.com/in/pranilraichura
            </a>
            {" "}for updates
          </p>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
