import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id: ID!) {
    obtenerCliente(id: $id) {
      nombre
      apellido
      empresa
      email
      telefono
      vendedor
    }
  }
`;
const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id: ID!, $input: ClienteInput) {
    actualizarCliente(id: $id, input: $input) {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;
const EditarCliente = () => {
  //Obtener el ID actual
  const router = useRouter();
  const {
    query: { pid },
  } = router;
  // console.log(pid);

  //consultar el cliente a editar
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id: pid,
    },
  });
  //mutation para actualizar cliente
  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  const schemaValidation = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    apellido: yup.string().required("El apellido es obligatorio"),
    empresa: yup.string().required("La empresa es obligatorio"),
    email: yup
      .string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
    telefono: yup.string().min(6, "El telefono debe ser al menos 6 digitos"),
  });
  if (loading) return "Cargando";
  const { obtenerCliente } = data;
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  const actualizarInfoCliente = async (valores) => {
    // console.log(valores)
    const { nombre, apellido, empresa, email, telefono } = valores;
    try {
      const { data } = await actualizarCliente({
        variables: {
          id: pid,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      // console.log(data);
      //TODO: sweet alert
      Swal.fire("Actualizado!", "El clinte fue actualizado.", "success");
      //dirigir a la pagina principal
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {/* {mensaje && mostrarMensaje()} */}
      <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(valores) => actualizarInfoCliente(valores)}
          >
            {(props) => {
              console.log(props);
              return (
                <form
                  className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      value={props.values.nombre}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.nombre && props.errors.nombre ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
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
                      value={props.values.apellido}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.apellido && props.errors.apellido ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.apellido}</p>
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
                      value={props.values.empresa}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.empresa && props.errors.empresa ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.empresa}</p>
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
                      value={props.values.email}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
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
                      value={props.values.telefono}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.telefono && props.errors.telefono ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.telefono}</p>
                    </div>
                  ) : null}
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                    value="Editar Cliente"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
