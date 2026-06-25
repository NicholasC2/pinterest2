"use client";

import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && <p>{file.name}</p>}
    </>
  );
}