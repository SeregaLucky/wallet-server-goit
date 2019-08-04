const allCosts = require("../../db/consts/all-costs.json");

const getCostsCategory = (req, res) => {
  const keyArrayCall = Object.keys(req.query);
  const keyArrayCallLength = keyArrayCall.length;

  // Если без дополнительного запроса
  if (!keyArrayCallLength) {
    res.json(allCosts);
  }
  // Если идет с дополнительным запросом, например: /?category=girl
  else if (req.query.category) {
    const findСategory = req.query.category;

    const needCosts = allCosts.filter(cost => {
      const categoryInConst = cost.categories;

      if (categoryInConst.includes(findСategory)) {
        return cost;
      }
    });

    if (!needCosts.length) {
      const notFound = {
        status: "no products",
        products: []
      };

      return res.json(notFound);
    } else {
      const found = {
        status: "success",
        products: [needCosts]
      };
      return res.json(found);
    }
  }
  // Если самого ключа нету такого
  else {
    throw false;
  }
};

module.exports = getCostsCategory;
