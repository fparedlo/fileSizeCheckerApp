import fetchFileSizes from "@/utils/fetchFileSizes";
import { createsArray, isValidInput } from "@/utils/checksInput";
import { useRef, useState } from "react";

export default function InputBox() {
  const [pending, setPending] = useState(false);
  const fileCheckerTextArea = useRef<HTMLTextAreaElement>(null);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!fileCheckerTextArea.current) {
        throw new Error("No textarea found");
      }
      const urls = createsArray(fileCheckerTextArea.current.value);
      if (isValidInput(urls)) {
        const sizeInfo = await fetchFileSizes(urls);
        console.log(sizeInfo);
      } else {
        throw new Error("Input is invalid");
      }
    } catch (e) {
      console.error(`Error handling the form : ${(e as Error).message}`);
    }
  };

  return (
    <form onSubmit={handleForm} className="grid gap-4">
      <label className="grid">
        <p className="mt-4">
          <strong>Example:</strong>
        </p>
        <code className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
          https://placecats.com/neo/300/200
          <br />
          https://placecats.com/millie/300/150
          <br />
          https://placecats.com/millie_neo/300/200
          <br />
          https://placecats.com/neo_banana/300/200
          <br />
        </code>
        <textarea
          placeholder="Enter URLs here"
          className="border p-3 rounded-lg resize-none"
          ref={fileCheckerTextArea}
          cols={2}
          rows={10}
        />
      </label>
      <button
        className="bg-slate-800 text-white rounded-lg py-3 px-4 text-xl font-bold hover:bg-slate-900"
        disabled={pending}
        type="submit"
      >
        Check!
      </button>
    </form>
  );
}
