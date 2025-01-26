export default function Button({ pending }: { pending: boolean }) {
	return (
		<button
			className="bg-slate-800  rounded-lg py-3 px-4 text-xl text-white font-bold hover:bg-slate-900 disabled:opacity-30 focus:outline focus:outline-offset-4 focus:outline-4"
			disabled={pending}
			type="submit"
		>
			Check File Sizes
		</button>
	);
}
