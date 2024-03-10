import { z } from "zod";
import "../styles/PopUpPlaylist.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const input = z.object({
  title: z.string(),
  description: z.string(),
});

type Input = z.infer<typeof input>;

export const PopUpPlaylist = ({
  setPopUpOpen,
}: {
  setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(input),
  });
  const onSubmit = (data: Input) => {
    console.log("data: ", data);
  };
  return (
    <section className="popUpPlaylist">
      <main>
        <header>
          <h2>Your new playlist</h2>
          <button onClick={() => setPopUpOpen(false)}>X</button>
        </header>
        <main>
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
