//done with bulkcreate()
const csv = require("csv-parser");
const fs = require("fs"); // require fs module of node js
const sequelize = require("./table").sequelize;
const tables = require("./table").tables;
const { Op } = require("sequelize");
const tripura ="./Tripura.csv";
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function createTable() {
  await sequelize.sync(/*{force:true}*/);  //{force:true}
}
createTable();
readline.question("Enter load or analyze", async (name) => {
  try {
    if (name == "load") {
      sequelize
        .authenticate()
        .then(() => {
          console.log("Database is present and connected succesfully");
        })
        .catch((err) => {
          console.log(err);
        }); // authenticate() returns a promise
      //inserting values into the table
      const results = [];
      const csvstream = fs.createReadStream(tripura).pipe(csv());
      csvstream.on("data", (data_v) => {
        let AUTHORIZED = data_v.AUTHORIZED_CAP;
        //parsing the year only
        let dateOfr = data_v.DATE_OF_REGISTRATION;
        var m = dateOfr.toString();
        var year = m.slice(6);
        let yfinal = parseInt(year);
        yfinal += 2000;
        let pba = data_v.PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN;
        results.push({
          AUTHORIZED_CAP: AUTHORIZED,
          DATE_OF_REGISTRATION: yfinal,
          PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN: pba,
        });
      });
      csvstream.on("end", () => {
        bulkLoad(results);
      });
      async function bulkLoad(rows) {
        await tables.bulkCreate(rows);
        console.log("loading done");
      }
      console.log("loader part is done successfully");
    } //if load finished
    else if (name == "analyze") {
      console.log("analyzer");

      //TESTCASE 1
      let count1, count2, count3, count4, count5;
      let dictAuthorized = {};
    //async function Count1(){
      let { count } = await tables.findAndCountAll({
        where: {
          AUTHORIZED_CAP: {
            [Op.lte]: 100000,
          },
        },
      });
      count1 = count;
      dictAuthorized["<= 1L"] = count1;
      console.log("first value", count1);
       //} Count1();
       // async function Count2(){
       count2 = await tables.count({
        where: {
          [Op.and]: [
            { AUTHORIZED_CAP: { [Op.lte]: 1000000 } },
            { AUTHORIZED_CAP: { [Op.gt]: 100000 } },
          ],
        },
      });
      dictAuthorized["1L to 10L"] = count2;
      console.log("second value", count2);
      // } Count2();
      // async function Count3(){
       count3 = await tables.count({
        where: {
          [Op.and]: [
            { AUTHORIZED_CAP: { [Op.lte]: 10000000 } },
            { AUTHORIZED_CAP: { [Op.gt]: 1000000 } },
          ],
        },
      });
      dictAuthorized["10L to 1Cr"] = count3;
      console.log("third value", count3);
      //} Count3();
      //async function Count4(){
      count4 = await tables.count({
        where: {
          [Op.and]: [
            { AUTHORIZED_CAP: { [Op.lte]: 100000000 } },
            { AUTHORIZED_CAP: { [Op.gt]: 10000000 } },
          ],
        },
      });
      dictAuthorized["1Cr to 10Cr"] = count4;
       console.log("fourth value", count4);
      //}Count4();
      //async function Count5(){
      count5 = await tables.count({
        where: {
          [Op.and]: [
            { AUTHORIZED_CAP: { [Op.lte]: 1000000000 } },
            { AUTHORIZED_CAP: { [Op.gt]: 100000000 } },
          ],
        },
      });
      dictAuthorized[">10Cr "] = count5;
      console.log("fifth value", count5);
      //  }Count5();
      // async function jsongen(){
      const jsonData1 = await JSON.stringify(dictAuthorized);
      console.log(dictAuthorized);
      fs.writeFile("authorized_cap.json", jsonData1, (err) => {
        if (err) throw err;
        console.log("Authorized cap json file generated");
      });
      //}  jsongen();
     //TESTCASE 2
      let dict = {};
      dict = await tables.findAll({
        attributes: [
          "DATE_OF_REGISTRATION",
          [sequelize.fn("COUNT", "DATE_OF_REGISTRATION"), "count_date"],
        ], // [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
        where: {
          [Op.and]: [
            { DATE_OF_REGISTRATION: { [Op.gte]: 2000 } }, //DATE_OF_REGISTRATION >= 2000
            { DATE_OF_REGISTRATION: { [Op.lte]: 2019 } }, //DATE_OF_REGISTRATION
          ],
        },
        order: ["DATE_OF_REGISTRATION"],
        group: ["DATE_OF_REGISTRATION"],
        raw: true,
      });
      console.log(dict);
      const jsonData2 = JSON.stringify(dict);
      console.log(jsonData2);
      fs.writeFile("dateOfreg.json", jsonData2, (err) => {
        if (err) throw err;
        console.log("DATE_OF_REGISTRATION file generated");
      });
      //TESTCASE 3
      let dict3 = {};
      dict3 = await tables.findAll({
        attributes: [
          "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN",
          [
            sequelize.fn("COUNT", "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"),
            "count_pba",
          ],
        ],
        where: {
          ["DATE_OF_REGISTRATION"]: 2015, //DATE_OF_REGISTRATION = 2015
        },
        group: ["PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"],
      });
      const jsonData3 = JSON.stringify(dict3);
      console.log(dict3);
      fs.writeFile("pba.json", jsonData3, (err) => {
        if (err) throw err;
        console.log(
          "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN  2015 file generated"
        );
      });
      //TESTCASE 4
      let dict4 = {};
      dict4 = await tables.findAll({
        attributes: [
          "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN",
          "DATE_OF_REGISTRATION",
          [
            sequelize.fn("COUNT", "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN"),
            "count_pba",
          ],
        ], // [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
        where: {
          [Op.and]: [
            { DATE_OF_REGISTRATION: { [Op.gte]: 2000 } }, //DATE_OF_REGISTRATION >= 2000
            { DATE_OF_REGISTRATION: { [Op.lte]: 2019 } }, //DATE_OF_REGISTRATION
          ],
        },
        group: [
          "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN",
          "DATE_OF_REGISTRATION",
        ],
        order: ["DATE_OF_REGISTRATION"],
      });
      const jsonData4 = JSON.stringify(dict4);
      // console.log(dict4);
      fs.writeFile("pba_Eachyear.json", jsonData4, (err) => {
        if (err) throw err;
        console.log(
          "PRINCIPAL_BUSINESS_ACTIVITY_AS_PER_CIN FOR EACH YEAR 2000-2019 file generated"
        );
      });
    } // else if
  } catch (err) {
    //try finished
    console.log(err);
  } // catch
}); // readline funct
