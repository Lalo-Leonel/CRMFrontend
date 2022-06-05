import React, { useState } from "react";
import router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVO_CLIENTE = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
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
const NuevoCliente = () => {
  //Registrar nuevo Cliente
  const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
    update(cache, { data: { nuevoCliente } }) {
      //Obtener el objeto de cache que deseamos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
      });
      // Reescribimos el cache (el cache nunca se debe modificar )
      cache.writeQuery({
        query: OBTENER_CLIENTES_VENDEDOR,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente],
        },
      });
    },
  });
  //Estado para el mensaje
  const [mensaje, setMensaje] = useState(null);
  //Estado para la ruta
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      empresa: "",
      email: "",
      telefono: "",
    },
    validationSchema: yup.object({
      nombre: yup.string().required("El nombre es obligatorio"),
      apellido: yup.string().required("El apellido es obligatorio"),
      empresa: yup.string().required("La empresa es obligatorio"),
      email: yup
        .string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      telefono: yup.string().min(6, "El telefono debe ser al menos 6 digitos"),
    }),
    onSubmit: async (valores) => {
      // console.log("enviando");
      // console.log(valores);
      const { nombre, apellido, empresa, email, telefono } = valores;
      try {
        const { data } = await nuevoCliente({
          variables: {
            input: {
              nombre,
              apellido,
              empresa,
              email,
              telefono,
            },
          },
        });
        console.log(data);
        // Se creo correctamente el usuario
        setMensaje(
          `Se creo correctamente el cliente: ${data.nuevoCliente.nombre}`
        );
        setTimeout(() => {
          setMensaje(null);
          router.push("/");
        }, 3000);
      } catch (error) {
        setMensaje(error.message);
        // console.log(error.message);
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
  });
  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };
  return (
    <div>
      <Layout>
        {mensaje && mostrarMensaje()}
        <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="nombre"
                  type="text"
                  placeholder="Nombre Cliente"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellidos
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="apellido"
                  type="text"
                  placeholder="Apellido Cliente"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="empresa"
                >
                  Empresa
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="empresa"
                  type="text"
                  placeholder="Empresa Cliente"
                  value={formik.values.empresa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="email"
                  type="email"
                  placeholder="Email Cliente"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="telefono"
                >
                  Telefono
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                  id="telefono"
                  type="tel"
                  placeholder="Telefono Cliente"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.telefono && formik.errors.telefono ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.telefono}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                value="Crear Cliente"
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default NuevoCliente;
