
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Library, LayoutGrid, Search, ChevronDown, LogOut, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { TCGType } from "../types";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentTCG, setCurrentTCG] = React.useState<TCGType>("Digimon Card Game 2020");
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutGrid className="h-5 w-5" /> },
    { path: "/browse", label: "Database", icon: <Search className="h-5 w-5" /> },
    { path: "/decks", label: "Decks", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/collection", label: "Collection", icon: <Library className="h-5 w-5" /> },
  ];

  // Updated to only include Digimon but structured for easy expansion
  const tcgOptions: TCGType[] = [
    "Digimon Card Game 2020"
    // Add new TCGs here in the future
  ];

  const handleTCGChange = (tcg: TCGType) => {
    setCurrentTCG(tcg);
    // You could dispatch an event or use context to notify other components
    const event = new CustomEvent('tcgChanged', { detail: tcg });
    window.dispatchEvent(event);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-0 hover:bg-transparent">
                  <Library className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">CardVerse</span>
                  {tcgOptions.length > 1 && (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              {tcgOptions.length > 1 && (
                <DropdownMenuContent align="start" className="w-56">
                  {tcgOptions.map((tcg) => (
                    <DropdownMenuItem 
                      key={tcg} 
                      onClick={() => handleTCGChange(tcg)}
                      className={tcg === currentTCG ? "bg-muted" : ""}
                    >
                      <span className="font-medium">{tcg}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <User className="h-4 w-4 mr-2" />
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">{children}</main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
