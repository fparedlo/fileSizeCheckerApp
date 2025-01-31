import Button from "@/components/client/Button";
import Loading from "@/components/client/Loading";
import ResponseBox from "@/components/client/ResponseBox";
import type { FileSize } from "@/types/app.types";
import { createsArray, isValidInput } from "@/utils/checksInput";
import fetchFileSizes from "@/utils/fetchFileSizes";
import { useRef, useState } from "react";

export default function InputBox() {
	const [pending, setPending] = useState(false);
	const fileCheckerTextArea = useRef<HTMLTextAreaElement>(null);
	const [data, setData] = useState<FileSize[] | null>(null);

	const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setPending(true);
		try {
			if (!fileCheckerTextArea.current) {
				throw new Error("No textarea found");
			}
			const urls = createsArray(fileCheckerTextArea.current.value);
			if (isValidInput(urls)) {
				const sizeInfo = await fetchFileSizes(urls);
				setData(sizeInfo);
			} else {
				throw new Error("Input is invalid");
			}
		} catch (e) {
			console.error(`Error handling the form : ${(e as Error).message}`);
			setData(null);
		} finally {
			setPending(false);
		}
	};

	return (
		<>
			<form onSubmit={handleForm} className="grid gap-4">
				<label className="grid" aria-label="Input Box for URLs">
					<span className="text-lg sr-only">Enter URLs</span>
					<textarea
						placeholder="Enter URLs here following the format in the example above"
						className="border p-3 rounded-lg resize-none"
						ref={fileCheckerTextArea}
						cols={2}
						rows={10}
					/>
				</label>
				<Button pending={pending} />
			</form>
			{pending ? <Loading /> : <ResponseBox data={data} />}
		</>
	);
}
