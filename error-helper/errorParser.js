module.exports = err => {
  console.log(err);
  switch (err.code) {
    case 11000:
      return "This value is already registered.";
    default:
      return "Sunucu bazlı hata sunucu log kayıtlarına bakın.";
  }

};
