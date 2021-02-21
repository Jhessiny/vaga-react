const express = require("express");
const app = express();
var cors = require("cors");
const { consultarCep, calcularPrecoPrazo } = require("correios-brasil");

app.use(cors());

app.get("/cart/:cep", (req, res) => {
  const cepDestino = req.params.cep;
  let args = {
    sCepOrigem: "81200100",
    sCepDestino: cepDestino,
    nVlPeso: "1",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "20",
    nVlLargura: "20",
    nCdServico: ["04014"],
    nVlDiametro: "0",
  };

  calcularPrecoPrazo(args)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

//   console.log();
//   consultarCep(req.params.cep).then((res) => console.log(res));
//   res.json();

app.listen(5000, () => console.log("server running"));
