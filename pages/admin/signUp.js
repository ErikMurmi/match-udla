import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/client";
import { registerUser } from "controllers/userController";

export const signUp = () => {
  //const user = useUser()
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaNacimiento: "",
    clave: "",
    firebaseId: "",
    tipo: 1,
  });

  // useEffect(() => {
  //     user && router.replace("/")
  // }, [user])

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "fechaNacimiento") {
      setNewUser({
        ...newUser,
        [name]: new Date(value).toISOString().substring(0, 10),
      });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const signUp = async (form) => {
    form.preventDefault();
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        newUser.firebaseId = user.uid;
        //console.log(newUser)
        await registerUser(newUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("code:", errorCode, "msg:", errorMessage);
        return null;
      });
  };

  return (
    <div>
      <form onSubmit={signUp} id="login-form">
        <h1>Registro</h1>
        <label htmlFor="nombre">Nombre*</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          onChange={handleChange}
          placeholder="Tu nombre"
        ></input>
        <label htmlFor="apellido">Apellido*</label>
        <input
          id="apellido"
          type="text"
          name="apellido"
          onChange={handleChange}
          placeholder="Tu apellido"
        ></input>
        <label htmlFor="email">Email*</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="example@mail.com"
        ></input>
        <label htmlFor="contrasenia">Contraseña*</label>
        <input
          id="contrasenia"
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Mínimo 6 caracteres"
          minLength={6}
        ></input>
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          onChange={handleChange}
        ></input>
        <input type="submit" value="Registrar"></input>
        <div className="linkCenter">
          <p>Ya tienes una cuenta? </p>
          <Link href="/signin" className="link">
            Inicia sesión aquí
          </Link>
        </div>
      </form>
    </div>
  );
};

export default signUp;
