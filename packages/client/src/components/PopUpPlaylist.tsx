import { z } from "zod";
import "../styles/PopUpPlaylist.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { useRef, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../utils/token";

const input = z.object({
  title: z.string().min(2, { message: "You must enter a title" }),
  description: z.string().optional(),
});

type Input = z.infer<typeof input>;

export const PopUpPlaylist = ({
  setPopUpOpen,
}: {
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(input),
  });
  const utils = trpc.useUtils();
  const onSubmit = async (data: Input) => {
    const formData = new FormData();
    if (!file) {
      console.log("error");
      return;
    }
    formData.append("playlistImg", file);
    formData.append("title", data.title);
    formData.append("description", data.description || "");

    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await axios.post(
      "http://localhost:8000/api/playlist",
      formData,
      config
    );
    if (res.status === 200) {
      utils.user.getPlaylists.refetch();
    }
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files ? e.target.files[0] : null);
  };
  console.log("reazeaze");
  return (
    <section className="popUpPlaylist">
      <main className="popUpPlaylistContent">
        <header>
          <h2>Your new playlist</h2>
          <button onClick={() => setPopUpOpen(false)}>X</button>
        </header>
        <main>
          <input type="file" onChange={handleFile} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <section>
              <label htmlFor="title">Title</label>
              <input id="title" type="text" required {...register("title")} />
              {errors.title && <p>{errors.title.message}</p>}
            </section>
            <section>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                required
                {...register("description")}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </section>
            <button type="submit">Create</button>
          </form>
        </main>
      </main>
    </section>
  );
};
