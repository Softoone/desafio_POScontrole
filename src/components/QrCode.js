import { Button, Row } from "reactstrap";
import codigo from "../assets/img/qr_code.jpg";
import settings from "../assets/img/settings.jpg";
import "../styles/QrCode.css";
import {
  createAuth,
  createAccess,
  getAccessKey,
  getReport,
} from "../services/Api.js";

const QrCode = () => {
  const handleAuth = async () => {
    try {
      const { id } = await createAuth();

      const createKey = async (id) => {
        const data = await createAccess(id);
        return data;
      };

      const { token } = await createKey(id);

      const accessKey = await getAccessKey(id);
      console.log("id token: ", id);

      sessionStorage.setItem("authorized", accessKey.token);
    } catch {
      window.alert(
        "Não foi possível gerar uma chave de acesso \n" + "Tente Novamente!"
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
        <Button onClick={handleAuth}>
          <b>AUTENTICAR</b>
        </Button>
      </div>
    </Row>
  );
};

export default QrCode;
