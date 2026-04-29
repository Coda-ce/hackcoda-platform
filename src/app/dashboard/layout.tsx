"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Terminal, Users, LayoutDashboard, LogOut, Code, User, Trophy } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-brasil-verde font-mono animate-pulse">CARREGANDO_SISTEMA...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const navItems = [
    { name: "PAINEL CENTRAL", icon: LayoutDashboard, href: "/dashboard" },
    { name: "MEUS PROJETOS", icon: Code, href: "/dashboard/projects" },
    { name: "MINHAS EQUIPES", icon: Users, href: "/dashboard/team" },
    { name: "RANKINGS", icon: Trophy, href: "/dashboard/rankings" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brasil-preto/50">
      {/* Top Header Y2K */}
      <header className="w-full bg-brasil-cinza/40 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="text-brasil-verde" size={24} />
            <span className="text-xl font-black text-brasil-creme tracking-tighter">
              HACK<span className="text-brasil-verde">CODA</span>
            </span>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="text-xs tracking-widest font-bold px-4 hover:bg-brasil-verde/10 hover:text-brasil-verde transition-colors"
                onClick={() => router.push(item.href)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>

          {/* User Actions - Right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-brasil-creme truncate max-w-[150px]">
                {session?.user?.name || "Hacker Anônimo"}
              </p>
              <p className="text-[10px] text-brasil-verde/80 truncate max-w-[150px]">
                {session?.user?.email}
              </p>
            </div>
            
            <div className="flex items-center gap-3 ml-1">
              <button 
                onClick={() => router.push('/dashboard/profile')}
                className="w-10 h-10 rounded-full border-2 border-brasil-verde overflow-hidden hover:scale-105 hover:border-brasil-verdeClaro transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brasil-verde focus:ring-offset-2 focus:ring-offset-brasil-preto flex-shrink-0 flex items-center justify-center bg-brasil-cinza/50"
                title="Meu Perfil"
              >
                {session?.user?.image ? (
                  <img 
                    src={session?.user?.image} 
                    alt="Foto de Perfil" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-brasil-verde" />
                )}
              </button>
              
              <div className="w-px h-6 bg-brasil-verde/20"></div>
              
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-gray-500 hover:text-gray-300 transition-colors duration-200 focus:outline-none p-1 flex-shrink-0"
                title="Encerrar Sessão"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-8">
          <div className="mb-8 pb-4">
            <h1 className="text-3xl font-black tracking-tighter text-brasil-creme">
              Bem-vindo, {session?.user?.name || "Hacker"}!
            </h1>
            <p className="text-brasil-verdeEscuro uppercase tracking-widest text-sm font-bold mt-1">
              Software Engineer
            </p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
