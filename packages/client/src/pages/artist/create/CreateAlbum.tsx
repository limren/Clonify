import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export const CreateAlbum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });

  return <section>Album</section>;
};
