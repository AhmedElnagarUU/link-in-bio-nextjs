import { PawPrint } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex items-center text-4xl font-bold text-primary mb-4">
        <span className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent">
          LinkHub
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        <div
          className="w-4 h-4 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-4 h-4 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
    </div>
  );
};

export default Loading;