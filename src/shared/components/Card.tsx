export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	className,
	...rest
}) => (
	<div
		className={`h-full bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl rounded-[2.5rem] p-8 transition-all duration-200 hover:bg-white/20 hover:scale-105 hover:shadow-blue-200/30 font-sans ${
			className ?? ''
		}`}
		{...rest}
	>
		{children}
	</div>
)
