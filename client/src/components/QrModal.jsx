import { useRef } from "react";
import { FiX, FiDownload, FiPrinter } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react"; // Cambia 'QRCode' por 'QRCodeCanvas'
import { FaQrcode } from "react-icons/fa";

function QRModal({ computerId, computerName, onClose }) {
  const qrRef = useRef(null);

  // Función para descargar el QR como imagen PNG
  const downloadQR = () => {
    const canvas = document.getElementById("computer-qr-code");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qr-${computerName
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  // Función para imprimir el QR
  const printQR = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const canvas = document.getElementById("computer-qr-code");
      const dataUrl = canvas.toDataURL();

      printWindow.document.write(`
        <html>
          <head>
            <title>Código QR - ${computerName}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
              }
              .qr-container {
                margin: 0 auto;
                max-width: 300px;
              }
              img {
                width: 100%;
                height: auto;
              }
              h2 {
                margin-bottom: 20px;
              }
              p {
                margin-top: 20px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2>${computerName}</h2>
              <img src="${dataUrl}" alt="Código QR" />
              <p>ID: ${computerId}</p>
            </div>
            <script>
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Código QR - {computerName}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center" ref={qrRef}>
          <QRCodeCanvas
            id="computer-qr-code"
            value={computerId}
            size={200}
            level="H"
          />
          <p className="mt-4 text-sm text-gray-500">
            Escanee este código para acceder a la información de la computadora
          </p>
        </div>

        <div className="flex justify-center gap-4 p-4 border-t">
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            <FiDownload />
            <span>Descargar</span>
          </button>
          <button
            onClick={printQR}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            <FiPrinter />
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRModal;
