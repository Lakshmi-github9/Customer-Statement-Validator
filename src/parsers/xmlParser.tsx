import { XMLParser } from "fast-xml-parser";
import { type RecordItem } from "../types/records";

interface XMLRecord {
  "@_reference": string;
  accountNumber: string;
  startBalance: string;
  mutation: string;
  endBalance: string;
  description: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export const parseXML = async (file: File): Promise<RecordItem[]> => {
  const text = await file.text();
  console.log("file text",text)
  const json = parser.parse(text);
  console.log("records from file",json)

  const records: XMLRecord[] = json.records.record;

  const parsedRecords= records.map((r) => ({
    reference: r["@_reference"],
    accountNumber: r.accountNumber,
    startBalance: Number(r.startBalance),
    mutation: Number(r.mutation),
    endBalance: Number(r.endBalance),
    description: r.description,
  }));
  console.log("parsedRecords",parsedRecords)
  return parsedRecords;
};
