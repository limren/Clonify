import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth/Login.css";
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
  const navigate = useNavigate();
  const loginMutation = trpc.auth.login.useMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const response = await loginMutation.mutateAsync(data);
    const token = response?.token;
    if (!token) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", token);
      navigate("/");
    }
    console.log("response : ", response);
    console.log("token : ", token);
  };
  return (
    <section className="login">
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email">E-mail</label>
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
          <button type="submit">Connexion</button>
        </form>
      </main>
    </section>
  );
};
