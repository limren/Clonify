import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../../utils/token";

const inputs = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit faire au moins 3 caractères" }),
  year: z.number().int().positive({ message: "L'année doit être positive" }),
});

type Inputs = z.infer<typeof inputs>;

export const CreateAlbum = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    if (file) {
      formData.append("albumImg", file);
    }
    formData.append("title", data.title);
    console.log("year : ", data.year);
    formData.append("year", data.year.toString());
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "http://localhost:8000/api/album",
      formData,
      config
    );
    console.log("res : ", res);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files ? e.target.files[0] : null);
  };
  return (
    <section>
      <h2>Add your album</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" required {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </section>
        <section>
          <label htmlFor="minutes">Year of creation</label>
          <input
            id="minutes"
            type="number"
            required
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </section>
        <section>
          <label htmlFor="img">Album's thumbnail</label>
          <input type="file" onChange={handleFile} />
        </section>
        <button type="submit">Create</button>
      </form>
    </section>
  );
};
