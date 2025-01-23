import type { FileSize } from "@/types/app.types";

export default function ResponseBox({ data }: { data: FileSize[] | null }) {
  return (
    <div>
      {data ? (
        <ul className="grid gap-4 mt-4 grid-cols-3">
          {data.map((file) => (
            <li
              key={file.url}
              className="grid gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg font-mono"
            >
              <span className="text-lg break-all">{file.url}</span>
              <span className="text-2xl text-right">
                <strong>{file.size}</strong>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
