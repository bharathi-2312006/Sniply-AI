import { QRCodeCanvas } from "qrcode.react";

export default function QRPreview({ url }) {
  if (!url) return null;

  const downloadQR = () => {
    const canvas =
      document.querySelector("canvas");

    const link =
      document.createElement("a");

    link.download =
      "sniply-qr.png";

    link.href =
      canvas.toDataURL();

    link.click();
  };

  return (
    <div className="card">

      <h2>QR Code</h2>

      <QRCodeCanvas
        value={url}
        size={180}
      />

      <p>{url}</p>

      <button
        onClick={downloadQR}
      >
        Download QR
      </button>

    </div>
  );
}