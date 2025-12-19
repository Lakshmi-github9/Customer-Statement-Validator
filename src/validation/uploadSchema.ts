import { z } from "zod";

export const uploadSchema = z.object({
  file: z
  .custom<FileList>()
  .refine((files)=> files?.length === 1,"Please select a file")
    .refine(
      (files) =>
        files[0].name.endsWith(".csv") || files[0].name.endsWith(".xml"),
      { message: "Only CSV or XML files allowed" }
    ),
});

export type UploadFormData = z.infer<typeof uploadSchema>;

// type UploadFormData={
//   file : FileList
// }