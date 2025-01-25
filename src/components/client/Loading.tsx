import loading from "@/assets/loading.svg";

export default function Loading() {
	return (
		<div className="flex gap-3 justify-center items-center">
			<img
				className="animate-spin"
				src={loading.src}
				loading="lazy"
				alt="Spinning wheel"
			/>
			<p className="text-center">Fetching assets, please wait...</p>
		</div>
	);
}
