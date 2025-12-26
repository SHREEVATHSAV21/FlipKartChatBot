import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FAQSection from "@/components/FAQSection"; // Import the new FAQSection

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Start building your amazing project here!
        </p>
        <Link to="/chatbot">
          <Button size="lg" className="px-8 py-4 text-lg">
            Go to Chat Bot
          </Button>
        </Link>
      </div>
      <FAQSection /> {/* Add the FAQSection here */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;