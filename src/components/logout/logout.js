import { Button } from "@/components/ui/button";

function LogoutForm({ onLogout }) {
    const handleLogout = () => {
      // Perform logout logic here
      onLogout();
    };
  
    return (
      <div className="p-4">
        <Button className="bg-gray-600 flex items-center transition-shadow duration-300 hover:shadow-inner hover:shadow-gray-500 text-white" onClick={handleLogout}>
            Logout
        </Button>
      </div>
    );
  }

  export default LogoutForm;