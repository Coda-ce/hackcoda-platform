"use client";

import { useEffect, useRef } from "react";

export function MatrixBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const alphabet = "01";

		const fontSize = 14;
		const columns = Math.floor(canvas.width / fontSize) + 1;
		const drops: number[] = [];

		for (let x = 0; x < columns; x++) {
			// Começar os drops espalhados por toda a altura da tela imediatamente!
			drops[x] = Math.random() * (canvas.height / fontSize);
		}

		const draw = () => {
			// Fade the background out slightly to create the trail effect
			ctx.fillStyle = "rgba(15, 15, 15, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#5DD62C"; // Neon Green
			ctx.font = fontSize + "px monospace";

			for (let i = 0; i < drops.length; i++) {
				const text = alphabet.charAt(
					Math.floor(Math.random() * alphabet.length),
				);
				const x = i * fontSize;
				const y = drops[i] * fontSize;

				ctx.fillText(text, x, y);

				// Reset drop to top randomly when it hits the bottom
				if (y > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
		};

		const interval = setInterval(draw, 33);

		const handleResize = () => {
			if (!canvas) return;
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			const newColumns = Math.floor(canvas.width / fontSize) + 1;

			// Se a tela aumentar, adiciona novos drops espalhados
			if (newColumns > drops.length) {
				for (let x = drops.length; x < newColumns; x++) {
					drops[x] = Math.random() * (canvas.height / fontSize);
				}
			}
		};
		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
			<canvas
				ref={canvasRef}
				className="absolute inset-0 bg-[#0F0F0F] w-full h-full"
				style={{ opacity: 0.85 }}
			/>
			<div className="absolute inset-0 bg-black/40" />
		</div>
	);
}
