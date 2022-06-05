import Layout from "../components/Layout";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";
import Producto from "../components/Producto";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;
const Productos = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  if (loading) return "Cargando";
  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <Link href="/nuevoproducto">
          <a className="bg-blue-800 py-2 px-5 rounded uppercase font-bold text-white mt-3 inline-block text-sm hover:bg-gray-800 mb-3">
            Nuevo Producto
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.obtenerProductos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
              // <tr key={producto.id}>
              //   <td>{producto.nombre}</td>
              //   <td>{producto.existencia}</td>
              //   <td>{producto.precio}</td>
              //   {/* <td>{producto.nombre}</td> */}
              // </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Productos;
