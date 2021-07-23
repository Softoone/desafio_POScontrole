import { Button, Row } from "reactstrap";
import codigo from "../assets/img/qr_code.jpg";
import settings from "../assets/img/settings.jpg";
import "../styles/QrCode.css";
import { createAuth, createAccess, getAccessKey } from "../services/Api.js";
import { Link } from "react-router-dom";
import { setStorage } from "../utils/Auth";

const QrCode = () => {
  const handleAuth = async () => {
    try {
      const { id } = await createAuth();

      const createKey = async (id) => {
        const data = await createAccess(id);
        return data;
      };

      await createKey(id);

      const accessKey = await getAccessKey(id);

      localStorage.setItem("authorized", accessKey.token);
      //setStorage(accessKey.token);
      console.log("id token: ", accessKey.token);
    } catch {
      window.alert(
        "Não foi possível gerar uma chave de acesso /n" +
          "Recarregue a página e tente Novamente!"
      );
    }
  };

  return (
    <Row>
      <div className="col-7">
        <ol>
          <p>Para acessar o seu portal: </p>
          <li>Abra o aplicativo Rede 5 Estrelas no celular</li>
          <li>
            Toque em configurações <img className="settings" src={settings} /> e
            selecione <b>Autorizar acesso</b>{" "}
          </li>
          <li>
            Aponte seu <b>POS</b> para o código
          </li>
        </ol>
      </div>
      <div className="col-4">
        <img className="code" src={codigo} alt="QR Code Exclusivo" />

        <Link to="/report">
          <Button onClick={handleAuth}>
            <b>AUTENTICAR</b>
          </Button>
        </Link>
      </div>
    </Row>
  );
};

export default QrCode;
