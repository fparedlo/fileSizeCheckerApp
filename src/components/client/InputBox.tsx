import { useFormStatus } from "react-dom";
import fetchFileSizes from "@/utils/fetchFileSizes";
import { useRef } from "react";

export default function InputBox() {
  const { pending } = useFormStatus();
  const fileCheckerTextArea = useRef<HTMLTextAreaElement>(null);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const urls = fileCheckerTextArea.current?.value
        .split("\n")
        .filter((url) => url);
      if (!urls || urls.length === 0) {
        throw new Error("Please enter at least one URL");
      }
      const values = await fetchFileSizes(urls);
      console.log(values);
    } catch (e) {
      console.log(`Error handling the form : ${(e as Error).message}`);
    }
  };

  return (
    <form onSubmit={handleForm} className="grid gap-4">
      <label className="grid">
        Copy paste your file URLs here.
        <textarea
          className="border p-3"
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
