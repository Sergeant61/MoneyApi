const express = require("express");
const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

// Model
const ApiResponse = require("../models/ApiResponse");



router.get("/doviz/:id", function (req, res, next) {
  let id = req.params.id;
  let url;
  let query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'

  switch (+id) {
    case 1:
      url = 'https://dovizborsa.com/doviz/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 2:
      url = 'https://dovizborsa.com/altin/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 3:
      url = 'https://dovizborsa.com/parite/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 4:
      url = 'https://dovizborsa.com/endeks/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 5:
      url = 'https://dovizborsa.com/serbest-piyasa/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 6:
      url = 'https://dovizborsa.com/serbest-piyasa/doviz/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 7:
      url = 'https://dovizborsa.com/serbest-piyasa/altin/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 8:
      url = 'https://dovizborsa.com/emtia/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 9:
      url = 'https://dovizborsa.com/emtia/metal/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 10:
      url = 'https://dovizborsa.com/emtia/bitki/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 11:
      url = 'https://dovizborsa.com/emtia/enerji/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 12:
      url = 'https://dovizborsa.com/banka/';
      query = '#TB-11 > div > div.-x1'
      break;
    case 13:
      url = 'https://dovizborsa.com/merkez-bankasi/doviz/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 14:
      url = 'https://dovizborsa.com/merkez-bankasi/parite/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
    case 15:
      url = 'https://dovizborsa.com/merkez-bankasi/efektif/';
      query = '#main > div.-p2 > div > div.-i0 > div > div.-z1._h3 > div.-j1.__s5.__d5 > div.-x1'
      break;
  }

  if (url !== undefined) {
    axios(url)
      .then(response => {
        const html = response.data;

        let apiResponse = new ApiResponse("Success.", true, 1, getTable(html, query));
        res.json(apiResponse)

      })
      .catch(err => {
        let apiResponse = new ApiResponse("Fail.", false, 1, err);
        res.json(apiResponse)

      });
  } else {
    let apiResponse = new ApiResponse("Fail.", false, 1, url);
    res.json(apiResponse)
  }



});


function getTable(html, querySelector) {
  const $ = cheerio.load(html)
  const spotDoviz = $(querySelector);

  //console.log(spotDoviz.html());
  const tablo = []

  spotDoviz.toArray().map(div => {

    const divList = $(div).children();
    // console.log(divList.html(), divList.length, '\n\n');

    divList.toArray().map(cloumn => {
      const cloumnList = $(cloumn).children();

      // console.log(cloumnList.html(), cloumnList.length, '\n\n');
      //console.log("length : " + cloumnList.length,);

      const satir = [];
      cloumnList.toArray().map(row => {
        const rowList = $(row);

        satir.push(rowList.text())
        //console.log(rowList.text(), "length : " + rowList.length,);

      });

      const dovizBirim = satir[0];
      const dovizText = satir[1];
      const alis = satir[2];
      const satis = satir[3];
      const dk = satir[4];
      const saat = satir[5];

      // ["USDTRY","Dolar / Türk Lirası","6,82120","6,82320","0.00","00:00:19",""]
      if (dovizText != "--")
        tablo.push({
          dovizBirim,
          dovizText,
          alis,
          satis,
          dk,
          saat
        })

    });

  });

  return tablo;

}

module.exports = router;
