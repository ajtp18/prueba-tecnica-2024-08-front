import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spin from "../adapters/ui/components/Spin";
import { getTransactionStatus } from "../adapters/api/transactionApi";

function FinalStatus() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
      // Obtener el ID de la transacción del localStorage
      const storedTransaction = localStorage.getItem("transaction");
      if (storedTransaction) {
          const transaction = JSON.parse(storedTransaction);

          if (transaction) {
              const transactionId = transaction.id;

              // Función para consultar y actualizar el estado de la transacción
              const checkTransactionStatus = async () => {
                  try {
                      const response = await getTransactionStatus(transactionId);
                      setStatus(response.status);
                  } catch (error) {
                      console.error("Error al obtener el estado de la transacción:", error);
                  }
              };

              // Llamar a la función por primera vez
              checkTransactionStatus();

              // Configurar polling para verificar el estado cada 5 segundos
              const intervalId = setInterval(checkTransactionStatus, 5000);

              // Limpiar el intervalo cuando el componente se desmonte
              return () => clearInterval(intervalId);
          }
      }
  }, []);

  return (
      <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
          <div className='h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl text-center'>
              <h1 className="font-semibold md:text-3xl text-xl text-center">Transacción realizada correctamente</h1>
              <div className="flex text-center my-10">
                  <h2 className="md:text-2xl text-lg">El estado de su pago es: </h2>
                  <strong className={`md:text-2xl text-lg ml-2 font-bold ${status === "PENDING" ? "text-orange-400" : status === "COMPLETED" ? "text-green-400" : "text-red-400"}`}>
                      {status}
                  </strong>
              </div>
              <button className='bg-red-600 rounded-md p-2 border-0 border-black text-white' onClick={() => navigate("/")}>
                  Salir
              </button>
          </div>
      </div>
  );
}

export default FinalStatus;