import Layout from "../components/Layout";
const NuevoProducto = () => {
  return (
    <Layout>
      {/* {mensaje && mostrarMensaje()} */}
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            //   onSubmit={formik.handleSubmit}
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
                placeholder="Nombre Producto"
                //   value={formik.values.nombre}
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existencia"
              >
                Existencia
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="existencia"
                type="text"
                placeholder="Existencia"
                //   value={formik.values.apellido}
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null} */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                id="precio"
                type="text"
                placeholder="Precio Producto"
                //   value={formik.values.empresa}
                //   onChange={formik.handleChange}
                //   onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null} */}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              value="Crear Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoProducto;
