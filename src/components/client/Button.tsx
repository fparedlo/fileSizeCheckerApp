export default function Button({ pending }: { pending: boolean }) {
	return (
		<button
			className="bg-slate-800 text-white rounded-lg py-3 px-4 text-xl font-bold hover:bg-slate-900 disabled:opacity-30"
			disabled={pending}
			type="submit"
		>
			Check File Sizes
		</button>
	);
}
