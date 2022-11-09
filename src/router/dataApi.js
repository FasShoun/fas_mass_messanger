const goData = require("./../db/conndb");

const dataAPi = async (req, res, next) => {
  try {
    const getData = await goData.find();
    res.send(getData);
    next()
  } catch (err) {
    console.log(err);
  }
};
module.exports = dataAPi;
