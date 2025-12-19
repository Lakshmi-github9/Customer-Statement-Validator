import Papa, { type ParseResult } from "papaparse";
import type { RecordItem } from "../types/records";

interface CSVRecord {
  Reference: string;
  "Account Number": string;
  "Start Balance": string;
  Mutation: string;
  "End Balance": string;
  Description: string;
}

export const parseCSV = (file: File): Promise<RecordItem[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRecord>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: ParseResult<CSVRecord>) => {
        const records: RecordItem[] = result.data.map((row:CSVRecord) => ({
          reference: row.Reference,
          accountNumber: row["Account Number"],
          startBalance: Number(row["Start Balance"]),
          mutation: Number(row.Mutation),
          endBalance: Number(row["End Balance"]),
          description: row.Description,
        }));
        resolve(records);
      },
      error: reject,
    });
  });
};
