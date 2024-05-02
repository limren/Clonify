import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import "../../styles/Auth/Register.css";
const inputs = z
  .object({
    username: z
      .string()
      .min(4, { message: "Le nom d'utilisateur est trop court" })
      .max(20, { message: "Le nom d'utilisateur est trop long" }),
    email: z
      .string()
      .email({ message: "Le format de l'email n'est pas correcte" }),
    password: z
      .string()
      .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" })
      .max(20, { message: "Le mot de passe est trop long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" })
      .max(20, { message: "Le mot de passe est trop long" }),
    role: z.enum(["USER", "ARTIST", "ADMIN"]).nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
      });
    }
  });

type Inputs = z.infer<typeof inputs>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(inputs),
  });

  const registerMutation = trpc.auth.register.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const response = await registerMutation.mutateAsync(data);
    console.log("response : ", response);
  };
  return (
    <section className="register">
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              type="text"
              required
              {...register("username")}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </section>
          <section>
            <label htmlFor="email">Entrez votre e-mail</label>
            <input id="email" type="text" required {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </section>
          <section>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </section>
          <section>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          </section>
          <section>
            <label htmlFor="selectRole">Rôle</label>
            <select {...register("role")} id="selectRole">
              <option value="USER">Utilisateur</option>
              <option value="ARTIST">Artiste</option>
            </select>
          </section>
          <button type="submit">Inscription</button>
        </form>
      </main>
    </section>
  );
};
