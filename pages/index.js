// import React from "react";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Cliente from "../components/Cliente";

const OBTENER_CLIENTES_VENDEDOR = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_VENDEDOR);
  const router = useRouter();
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  if (loading) return "Cargando...";

  if (!data.obtenerClientesVendedor) {
    // console.log("data null");
    return router.push("/login");
  }
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 rounded uppercase font-bold text-white mt-3 inline-block text-sm hover:bg-gray-800 mb-3">
            Nuevo Cliente
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.obtenerClientesVendedor.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
}
