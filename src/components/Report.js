import React from "react";
import { Row, Button } from "reactstrap";
import "../styles/Report.css";
import { getReport } from "../services/Api";
import Box from "@material-ui/core/Box";
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
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { HiStar } from "react-icons/hi";
import { getStorage } from "../utils/Auth";

const Report = () => {
  const [avgScore, setAvgScore] = useState([]);
  const [totalRates, setTotalRates] = useState([]);
  const [percentageAvg, setPercentageAvg] = useState([]);
  const [weekDay, setWeekDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [graphicView, setGraphicView] = useState(false);

  const getData = async () => {
    try {
      const { data } = await getReport(getStorage("authorized"));
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
        setIsStart(true);
        fillYAxis();
      })
      .catch((error) => {
        console.error(error);
        window.alert(
          "Erro na renderização dos componentes...Verifique elementos da página e tente novamente!"
        );
      });
  }, []);

  function chartFilter(value) {
    value == "mês" ? setGraphicView(true) : setGraphicView(false);
  }

  function finishSession() {
    localStorage.removeItem("authorized");
    window.location.reload();
  }

  function fillYAxis() {
    console.log(weekDay);
    const values = [];
    const indexNo = weekDay.length;

    for (let i = 0; i < indexNo; i++) {
      values.push(weekDay[i].score);
    }

    values.sort((a, b) => a - b);

    return values[indexNo - 1];
  }

  return (
    <>
      <Row>
        <div className="col-10">
          <h1>Média ao longo do tempo</h1>
          {!graphicView ? (
            <ResponsiveContainer width="85%" aspect={3}>
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
                <YAxis
                  type="number"
                  domain={[0, Math.round(avgScore + 1)]}
                  interval={0}
                />
                <Tooltip />

                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="90%" aspect={3}>
              <BarChart
                width={500}
                height={300}
                data={month}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="field" />
                <YAxis
                  type="number"
                  domain={[0, Math.round(avgScore + 1)]}
                  interval={0}
                />
                <Tooltip />

                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="col-1">
          <Button id="divButtons" onClick={() => finishSession()}>
            ENCERRAR SESSÃO
          </Button>
          <Button id="divButtons" onClick={() => chartFilter("dia")}>
            VIEW POR DIA
          </Button>
          <Button id="divButtons" onClick={() => chartFilter("mês")}>
            VIEW POR MÊS
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table className="ss" aria-label="simple table">
            <TableHead>
              <p>
                <b>Avaliações por estrela</b>
              </p>
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
                <TableCell />
                <TableCell align="right">
                  <b className="avgScoreLine">
                    {avgScore}
                    <br /> estrelas <br />
                  </b>
                  Média entre {totalReviews(totalRates)} opiniões
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">
                  <p className="tableCellText">
                    5 <HiStar className="starIcon" />
                  </p>
                </TableCell>
                <TableCell align="center">
                  <progress max="100" value={percentageAvg.five}></progress>
                </TableCell>
                <TableCell align="left">
                  <b className="totalRatesLines">{totalRates.five}</b>
                  {" (" + percentageAvg.five + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <p className="tableCellText">
                    4 <HiStar className="starIcon" />
                  </p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <progress max="100" value={percentageAvg.four}></progress>
                </TableCell>
                <TableCell align="left">
                  <b className="totalRatesLines">{totalRates.four}</b>
                  {" (" + percentageAvg.four + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <p className="tableCellText">
                    3 <HiStar className="starIcon" />
                  </p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <progress max="100" value={percentageAvg.three}></progress>
                </TableCell>
                <TableCell align="left">
                  <b className="totalRatesLines">{totalRates.three}</b>
                  {" (" + percentageAvg.three + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <p className="tableCellText">
                    2 <HiStar className="starIcon" />
                  </p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <progress max="100" value={percentageAvg.two}></progress>
                </TableCell>
                <TableCell align="left">
                  <b className="totalRatesLines">{totalRates.two}</b>
                  {" (" + percentageAvg.two + "%)"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <p className="tableCellText">
                    1 <HiStar className="starIcon" />
                  </p>
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <progress max="100" value={percentageAvg.one}></progress>
                </TableCell>
                <TableCell align="left">
                  <b className="totalRatesLines">{totalRates.one}</b>
                  {" (" + percentageAvg.one + "%)"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Row>
    </>
  );
};

export default Report;
