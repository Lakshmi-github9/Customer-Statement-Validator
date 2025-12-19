import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadSchema, type UploadFormData } from "../validation/uploadSchema";

type FileUploaderProps={
  onUpload: (file: File) => void
}
export default function FileUploader({ onUpload }: FileUploaderProps) {

  const { register, handleSubmit, formState: { errors } } =
    useForm<UploadFormData>({ resolver: zodResolver(uploadSchema) });

    console.log("erros fileUpload",errors)

  return (
    <form onSubmit={handleSubmit((data) =>{
      const file = data.file[0]
      onUpload(file);
    } )}>
      <input type="file" {...register("file")} />
      {errors.file && <p>{errors.file.message}</p>}
      <Button type="submit" variant="contained">Upload</Button>
    </form>
  );
}
