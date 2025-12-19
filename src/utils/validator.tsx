import { type RecordItem } from "../types/records";

export interface ValidationError {
  record: RecordItem;
  errors: string[];
}

export const validateRecords = (
  records: RecordItem[]
): ValidationError[] => {
  const referenceCount = new Map<string, number>();

  // Count references first
  records.forEach((r) => {
    referenceCount.set(
      r.reference,
      (referenceCount.get(r.reference) || 0) + 1
    );
  });

  const invalidRecords: ValidationError[] = [];

  records.forEach((record) => {
    const errors: string[] = [];

    // Rule 1: Duplicate reference
    if (referenceCount.get(record.reference)! > 1) {
      errors.push("Duplicate reference");
    }

    // Rule 2: End balance validation
    const calculated =
      record.startBalance + record.mutation;

    if (calculated !== record.endBalance) {
      errors.push("Incorrect end balance");
    }

    if (errors.length > 0) {
      invalidRecords.push({ record, errors });
    }
  });

  return invalidRecords;
};
