import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../../utils/trpc";
import "../../../styles/Artist/Create/CreateTrack.css";
import axios from "axios";
import { getAuthToken } from "../../../../utils/token";
const inputs = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit faire au moins 3 caractères" }),
  minutes: z
    .number()
    .int()
    .positive({ message: "Le nombre de minutes doit être positif" }),
  seconds: z
    .number()
    .int()
    .positive({ message: "Le nombre de secondes doit être positif" }),
  year: z.number().int().positive({ message: "L'année doit être positive" }),
  albumId: z.number().int().nullable(),
});
type Inputs = z.infer<typeof inputs>;
export const CreateTrack = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });
  const getAlbums = trpc.artist.getMyAlbums.useQuery();
  const albums = getAlbums.data;
  console.log("albums : ", albums);
  const onSubmit = async (data: Inputs) => {
    const formData = new FormData();
    if (data.albumId === 0) {
      data.albumId = null;
    } else if (data.albumId != null) {
      formData.append("albumId", data.albumId.toString());
    }
    if (file) {
      formData.append("trackImg", file);
    }
    formData.append("title", data.title);
    formData.append("year", data.year.toString());
    formData.append("minutes", data.minutes.toString());
    formData.append("seconds", data.seconds.toString());
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "http://localhost:8000/api/track",
      formData,
      config
    );
    console.log("res : ", res);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files ? e.target.files[0] : null);
  };

  return (
    <section className="createTrack">
      <h2>Create your track</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" required {...register("title")} />
          {errors.title && <p>{errors.title.message}</p>}
        </section>
        <section>
          <label htmlFor="minutes">Minutes</label>
          <input
            id="minutes"
            type="number"
            required
            {...register("minutes", { valueAsNumber: true })}
          />
          {errors.minutes && <p>{errors.minutes.message}</p>}
        </section>
        <section>
          <label htmlFor="seconds">Seconds</label>
          <input
            id="seconds"
            type="number"
            required
            {...register("seconds", { valueAsNumber: true })}
          />
          {errors.seconds && <p>{errors.seconds.message}</p>}
        </section>
        <section>
          <label htmlFor="year">Année de création</label>
          <input
            id="year"
            type="number"
            required
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && <p>{errors.year.message}</p>}
        </section>
        <section>
          <label htmlFor="albumId">Année de création</label>
          {getAlbums.isLoading ? (
            <p>Chargement des albums...</p>
          ) : (
            <select
              id="albumId"
              {...register("albumId", { valueAsNumber: true })}
            >
              <option value={0}>Appartient à aucun album</option>
              {albums?.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
              ))}
            </select>
          )}
          {errors.albumId && <p>{errors.albumId.message}</p>}
        </section>
        <section>
          <label htmlFor="trackImg"></label>
          <input
            type="file"
            name="trackImg"
            id="trackImg"
            onChange={handleFile}
          />
        </section>
        <button type="submit">Create</button>
      </form>
    </section>
  );
};
