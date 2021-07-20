import React from "react";
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
import { Redirect } from "react-router-dom";

const Report = () => {
  const [avgScore, setAvgScore] = useState([]);
  const [totalRates, setTotalRates] = useState([]);
  const [percentageAvg, setPercentageAvg] = useState([]);
  const [weekDay, setWeekDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [isStart, setIsStart] = useState(false);

  const getData = async () => {
    try {
      const { data } = await getReport(localStorage.getItem("authorized"));
      return data;
    } catch {
      window.alert("Incapaz de gerar informações...Volte para autenticação!");
    }
  };

  function totalReviews(item) {
    const soma = item.one + item.two + item.three + item.four + item.five;
    return soma;
  }

  useEffect(() => {
    getData()
      .then((response) => {
        setAvgScore(response.avgScore);
        setTotalRates(response.amount);
        setPercentageAvg(response.percentageAvgScore);
        setWeekDay(response.byWeekDay);
        setMonth(response.byMonth);
        console.log(response);
        console.log(totalRates);
        console.log(percentageAvg);
        setIsStart(true);
      })
      .catch((error) => {
        console.error(error);
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

  /* function verInfo() {
    console.log(data);
  } */
  return (
    <Row>
      {/*<Button onClick={verInfo}>Ver info Console</Button>*/}
      <div className="col-11">
        <h1>Média ao longo do tempo</h1>
        <ResponsiveContainer width="75%" aspect={4}>
          <BarChart
            width={500}
            height={300}
            data={weekDay}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="field" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="col-10">
        <div>
          <div className="text-center">0%</div>
          <Progress />
          <div className="text-center">25%</div>
          <Progress value="25" />
          <div className="text-center">50%</div>
          <Progress value={50} />
          <div className="text-center">75%</div>
          <Progress value={75} />
          <div className="text-center">100%</div>
          <Progress value="100" />
          <div className="text-center">Multiple bars</div>
          <Progress multi>
            <Progress bar value="15" />
            <Progress bar color="success" value="30" />
            <Progress bar color="info" value="25" />
            <Progress bar color="warning" value="20" />
            <Progress bar color="danger" value="5" />
          </Progress>
        </div>
        <TableContainer component={Paper}>
          <Table className="ss" aria-label="simple table">
            <TableHead>
              <p>Avaliações por estrela</p>
              <TableRow>
                <TableCell>
                  {isStart && (
                    <Box component="fieldset" mb={3} borderColor="transparent">
                      <Rating
                        name="read-only size-large half-rating-read"
                        size="large"
                        value={avgScore}
                        precision={0.5}
                        readOnly
                      />
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                  <b>{avgScore}</b>
                  <br></br> estrelas <br></br> Média entre{" "}
                  {totalReviews(totalRates)} opiniões
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
                <TableCell align="left">XYXY</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="right">
                  <b>{totalRates.five}</b>
                  {"(" + percentageAvg.five + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">4</TableCell>
                <TableCell align="left">XYXY</TableCell>
                <TableCell align="center">
                  <Progress />
                </TableCell>
                <TableCell align="right">
                  {totalRates.four}
                  {"(" + percentageAvg.four + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">3</TableCell>
                <TableCell align="left">XYXY</TableCell>
                <TableCell align="center">aaaa</TableCell>
                <TableCell align="right">
                  {totalRates.three}
                  {"(" + percentageAvg.three + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">2</TableCell>
                <TableCell align="left">XYXY</TableCell>
                <TableCell align="center">aaa</TableCell>
                <TableCell align="right">
                  {totalRates.two}
                  {"(" + percentageAvg.two + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">1</TableCell>
                <TableCell align="left">XYXY</TableCell>
                <TableCell align="center">aaa</TableCell>
                <TableCell align="right">
                  {totalRates.one}
                  {"(" + percentageAvg.one + "%)"}
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
