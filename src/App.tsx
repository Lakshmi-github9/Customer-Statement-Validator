import { useState } from "react";
import FileUploader from "./components/FileUploader";
import ResultTable from "./components/TableResult";
import { parseCSV } from "./parsers/csvParser";
import { parseXML } from "./parsers/xmlParser";
import { validateRecords, type ValidationError } from "./utils/validator";

export default function App() {
  const [errors, setErrors] = useState<ValidationError[]>([]);
 const [hasUploaded, setHasUploaded] = useState(false);
   const [fileName, setFileName] = useState<string>("");

  const handleUpload = async (file: File) => {
    // ✅ RESET PREVIOUS STATE (CRITICAL)
    setErrors([]);
    setHasUploaded(false);
    setFileName(file.name);

    const records =
      file.name.endsWith(".csv")
        ? await parseCSV(file)
        : await parseXML(file);

    const validationErrors = validateRecords(records);
    setErrors(validationErrors);
    setHasUploaded(true); 
  };

  return (
    <>
      <h2>Customer Statement Processor</h2>
      <FileUploader onUpload={handleUpload} />
      {!hasUploaded && (
        <p>Please upload transaction statements file</p>
      )}

      {hasUploaded && (
         <>
          <p>
            Showing results for: <strong>{fileName}</strong>
          </p>
          <ResultTable data={errors} />
        </>
      )}
    </>
  );
}
