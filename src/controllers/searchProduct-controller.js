const { Op } = require("sequelize");
const { Product, ProductImage } = require("../models");

exports.searchProduct = async (req, res) => {
  const { name } = req.query;
  console.log(req.query);
  try {
    const results = await Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          // {
          //   description: {
          //     [Op.like]: `%${query}%`,
          //   },
          //       // },
        ],
      },
      include: { model: ProductImage },
    });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
