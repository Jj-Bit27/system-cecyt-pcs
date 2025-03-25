import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { FiCamera } from "react-icons/fi";

function QrScanner({ onScan }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");

    const startScanner = async () => {
      try {
        setIsLoading(true);
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }, // Cuadrado perfecto
          },
          (decodedText) => {
            onScan(decodedText);
            html5QrCode.stop();
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        );
        setIsLoading(false);
      } catch (err) {
        console.error("Error starting scanner:", err);
        setIsLoading(false);
      }
    };

    startScanner();

    return () => {
      if (html5QrCode.isScanning) {
        html5QrCode
          .stop()
          .catch((err) => console.error("Error stopping scanner:", err));
      }
    };
  }, [onScan]);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          id="qr-reader"
          className="w-full aspect-square overflow-hidden rounded-lg"
        ></div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="flex flex-col items-center text-white">
              <FiCamera className="animate-pulse text-3xl mb-2" />
              <p>Iniciando cámara...</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-2 text-center">
        Posicione el código QR dentro del recuadro
      </p>
    </div>
  );
}

export default QrScanner;
