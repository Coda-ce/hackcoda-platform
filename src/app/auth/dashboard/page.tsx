import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/core/auth/nextauth.config";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold">Dashboard do Hackathon</h1>
			<p className="mt-4">Bem-vindo, {session.user?.name}!</p>
			<div className="mt-2 p-4 bg-green-100 text-green-800 rounded">
				Sessão ativa com sucesso! Você está logado como: **{session.user?.email}
				**
			</div>

			<a
				href="/api/auth/signout"
				className="mt-6 inline-block text-red-600 hover:underline"
			>
				Sair do sistema
			</a>
		</div>
	);
}
