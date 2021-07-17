import {} from "reactstrap";
import codigo from "../assets/img/QRcode_sccreen.jpg";
import "../estilos/QrCode.css";

const QrCode = () => {
  return (
    <div>
      <ol>
        <p>Para acessar seu portal: </p>
        <li>Abra o aplicativo no celular</li>
        <li>
          Siga para configurações e selecione <b>Autorizar acesso</b>{" "}
        </li>
        <li>
          Aponte seu <b>POS</b> para o código
        </li>
      </ol>

      <img src={codigo} alt="QR Code Exclusivo" />
    </div>
  );
};

export default QrCode;
