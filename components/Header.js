import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
      email
    }
  }
`;
const Header = () => {
  const { data, loading, error } = useQuery(OBTENER_USUARIO);
  const router = useRouter();
  //Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;
  //Si no hay informacion
  if (!data) {
    return router.push("/login");
  }
  const { nombre, apellido, email } = data.obtenerUsuario;
  //   console.log(data);
  //   console.log(loading);
  //   console.log(error);
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">Hola: {nombre}</p>
      <button
        type="button"
        className="bg-blue-800 py-2 px-3 rounded uppercase text-white font-bold w-full sm:w-auto"
        onClick={() => cerrarSesion()}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
export default Header;
