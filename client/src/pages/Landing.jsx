// App.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMonitor, FiTool } from "react-icons/fi";
import QrScanner from "../components/QrScanner.jsx";

function Landing() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data) {
      navigate(`/details/${data}`);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
      <div className="w-full max-w-md mt-4 md:mt-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Mantenimiento de Computadoras
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          {scanning ? (
            <div className="flex flex-col items-center">
              <QrScanner onScan={handleScan} />
              <button
                onClick={() => setScanning(false)}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-md text-gray-700"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setScanning(true)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 px-4 rounded-md hover:bg-emerald-600 transition-colors"
            >
              <FiSearch className="text-lg" />
              Escanear Código QR
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/computers")}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FiMonitor className="text-emerald-500 text-3xl mb-2" />
            <span className="font-medium text-center">
              Ver todas las computadoras
            </span>
          </button>

          <button
            onClick={() => navigate("/maintenance/new")}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <FiTool className="text-emerald-500 text-3xl mb-2" />
            <span className="font-medium text-center">
              Agregar nuevo mantenimiento
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
export default Landing;
