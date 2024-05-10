let otp = function () {
  let m = "";
  for (let i = 0; i < 6; i++) {
    let number = Math.floor(Math.random() * 10);
    m = m + "" + number;
  }

  return m;
};
module.exports = otp;
