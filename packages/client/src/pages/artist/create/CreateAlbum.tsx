import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../../utils/trpc";

const inputs = z.object({
  title: z
    .string()
    .min(3, { message: "Le titre doit faire au moins 3 caractères" }),
  year: z.number().int().positive({ message: "L'année doit être positive" }),
});

type Inputs = z.infer<typeof inputs>;

export const CreateAlbum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });
  const createAlbumMutate = trpc.artist.createAlbum.useMutation();
  const onSubmit = async (data: Inputs) => {
    const res = await createAlbumMutate.mutateAsync(data);
    console.log("res : ", res);
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
        <button type="submit">Create</button>
      </form>
    </section>
  );
};
