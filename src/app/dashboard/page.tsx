"use client";

import {
	Activity,
	ArrowRight,
	Database,
	Eye,
	PenLine,
	Sparkles,
	Users,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/Card";

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-brasil-cinza/60">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-bold">INSCRIÇÕES</CardTitle>
						<Activity className="h-4 w-4 text-brasil-verde" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-black text-brasil-creme">0</div>
						<CardDescription className="text-xs text-brasil-verde mt-1">
							Hackathons inscritos
						</CardDescription>
					</CardContent>
				</Card>

				<Card className="bg-brasil-cinza/60">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-bold">PROJETOS ATIVOS</CardTitle>
						<Database className="h-4 w-4 text-brasil-verde" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-black text-brasil-creme">0</div>
						<CardDescription className="text-xs text-brasil-verde mt-1">
							Aguardando inicialização
						</CardDescription>
					</CardContent>
				</Card>

				<Card className="bg-brasil-cinza/60">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-bold">EQUIPES</CardTitle>
						<Users className="h-4 w-4 text-brasil-verde" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-black text-brasil-creme">0</div>
						<CardDescription className="text-xs text-brasil-verde mt-1">
							Nenhuma equipe vinculada
						</CardDescription>
					</CardContent>
				</Card>
			</div>

			<div className="mt-8">
				<div className="relative overflow-hidden rounded-2xl border border-brasil-verde/20 bg-brasil-cinza/60 flex flex-col md:flex-row items-center justify-between p-6 md:p-8 gap-6 shadow-[0_0_15px_rgba(93,214,44,0.1)]">
					{/* Subtle gradient background glow */}
					<div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-brasil-verde/10 to-transparent pointer-events-none" />

					{/* Left Section: Icon & Text */}
					<div className="flex flex-col md:flex-row items-start gap-6 relative z-10 w-full md:w-auto">
						{/* Icon Box */}
						<div className="flex-shrink-0 w-16 h-16 rounded-2xl border border-brasil-verde/30 bg-brasil-verde/5 flex items-center justify-center shadow-[0_0_10px_rgba(93,214,44,0.15)]">
							<Sparkles className="w-8 h-8 text-brasil-verde" />
						</div>

						{/* Text Content */}
						<div className="flex flex-col gap-1">
							<span className="text-xs font-bold text-brasil-verde uppercase tracking-wider">
								SEU PORTFÓLIO
							</span>
							<h2 className="text-2xl font-black text-brasil-creme tracking-tight">
								Portfólio
							</h2>
							<p className="text-sm text-brasil-creme/70 max-w-md mt-1 leading-relaxed">
								Seu portfólio está no ar. Edite suas informações ou compartilhe
								com o mundo.
							</p>
						</div>
					</div>

					{/* Right Section: Buttons */}
					<div className="flex items-center gap-3 relative z-10 w-full md:w-auto justify-start md:justify-end mt-2 md:mt-0">
						<button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brasil-preto/40 text-brasil-creme/60 hover:text-brasil-creme hover:bg-brasil-preto/60 transition-all text-sm font-semibold">
							<PenLine className="w-4 h-4" />
							Editar Portfólio
						</button>
						<button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brasil-preto border border-brasil-verde text-brasil-verde shadow-[0_0_15px_rgba(93,214,44,0.3)] hover:shadow-[0_0_25px_rgba(93,214,44,0.5)] transition-all text-sm font-bold">
							<Eye className="w-4 h-4" />
							Ver Portfólio
							<ArrowRight className="w-4 h-4 ml-1" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
