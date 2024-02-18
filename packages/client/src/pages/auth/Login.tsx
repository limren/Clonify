import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const inputs = z.object({
  email: z
    .string()
    .email({ message: "Le format de l'email n'est pas correcte" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
});

type Inputs = z.infer<typeof inputs>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <section>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email">Entrez votre e-mail</label>
            <input id="email" type="text" required {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </section>
          <section>
            <label htmlFor="password">Entrez votre mot de passe</label>
            <input
              id="password"
              type="password"
              required
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </section>
          <button type="submit">Connexion</button>
        </form>
      </main>
    </section>
  );
};
