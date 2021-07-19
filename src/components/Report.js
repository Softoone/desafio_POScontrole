import { Row, Progress, Button } from "reactstrap";
import "../styles/Report.css";
import { getReport } from "../services/Api";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";

const Report = () => {
  const [reportData, setReportData] = useState([]);
  const [value, setValue] = useState(3);
  const [totalRates, setTotalRates] = useState([]);

  const getData = async () => {
    try {
      const { data } = await getReport(sessionStorage.getItem("authorized"));
      return data;
    } catch {
      window.alert("Incapaz de gerar informações...Volte para autenticação!");
    }
  };
  useEffect(() => {
    getData()
      .then(async (response) => {
        await setReportData(response);
        await setTotalRates(response.amount);
        console.log(reportData);
        console.log(totalRates);
      })
      .catch((error) => {
        console.error("Erro no retorno de DataAPI");
        window.alert(
          "Erro na renderização dos componentes...Verifique elementos da página e tente novamente!"
        );
      });
  }, []);

  const chartData = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 2780,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 2390,
    },
    {
      name: "Page G",
      uv: 3490,
    },
  ];

  function totalReviews(v1, v2, v3, v4, v5) {
    const soma = v1 + v2 + v3 + v4 + v5;
    return soma;
  }
  /* function verInfo() {
    console.log(data);
  } */
  return (
    <Row>
      {/*<Button onClick={verInfo}>Ver info Console</Button>*/}
      <div className="col-11">
        <h1>Hello Chart</h1>
        <ResponsiveContainer width="90%" aspect={3}>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="col-10">
        <TableContainer component={Paper}>
          <Table className="ss" aria-label="simple table">
            <TableHead>
              <p>Avaliações por estrela</p>
              <TableRow>
                <TableCell>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="read-only size-large"
                      size="large"
                      value={reportData.avgScore}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <b>{reportData.avgScore}</b> estrelas <br></br> Média entre{" "}
                  {totalReviews(totalRates)}
                  opiniões
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}  
                  </TableCell>  */}
              <TableRow>
                <TableCell align="left">5</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right">
                  {totalRates.five}(Porcentagem)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">4</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center">
                  <Progress />
                </TableCell>
                <TableCell align="right">
                  {totalRates.four}(Porcentagem)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">3</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="right">
                  {totalRates.three}(Porcentagem)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">2</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center">aaa</TableCell>
                <TableCell align="right">
                  {totalRates.two}(Porcentagem)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">1</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="center">aaa</TableCell>
                <TableCell align="right">
                  {totalRates.one}(Porcentagem)
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Row>
  );
};

export default Report;
