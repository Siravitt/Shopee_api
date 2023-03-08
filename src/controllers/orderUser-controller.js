const axios = require("axios");
const {
  Cart,
  Product,
  Shop,
  Order,
  OrderShop,
  OrderItem,
  Address,
} = require("../models");

// const shippingPriceCal = async (totalWeight, origins, destinations) => {
//   const apiKey = process.env.GOOGLE_MAP_API_KEY;
//   let distance = await axios.get(
//     `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`
//   );

//   let unit = distance.data.rows[0].elements[0].distance.text.split(" ");
//   if (unit[1] === "m") {
//     distance = 1;
//   } else {
//     distance = unit[0];
//   }

//   let rateKg = 0;
//   if (totalWeight <= 1) {
//     rateKg = 10;
//   } else if (totalWeight <= 5) {
//     rateKg = 5;
//   } else if (totalWeight <= 10) {
//     rateKg = 4;
//   } else {
//     rateKg = 7;
//   }

//   let rateKm = 0;
//   if (distance <= 5) {
//     rateKm = 4;
//   } else if (distance <= 30) {
//     rateKm = 3;
//   } else if (distance <= 100) {
//     rateKm = 2;
//   } else {
//     rateKm = 1.5;
//   }
//   return totalWeight * rateKg + distance * rateKm;
// };

exports.createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.user.id,
        productId: req.body.productId,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Shop,
        },
      ],
    });

    await Cart.destroy({
      where: { productId: req.body.productId, userId: req.user.id },
    });

    let totalPrice = 0;
    const priceEachShop = [];
    const items = [];
    for (const product of cart) {
      const newProduct = priceEachShop.findIndex(
        (el) => el.shopId === product.shopId
      );
      totalPrice += product.Product.price * product.quantity;

      items.push({
        productId: product.productId,
        quantity: product.quantity,
        totalPrice: product.Product.price * product.quantity,
      });

      if (newProduct === -1) {
        priceEachShop.push({
          shopId: product.shopId,
          totalPrice: product.Product.price * product.quantity,
          address:
            product.Shop.subDistrict +
            ", " +
            product.Shop.district +
            ", " +
            product.Shop.province,
        });
      } else {
        priceEachShop[newProduct].totalPrice += +product.Product.price;
      }
    }

    const order = {
      totalPrice: totalPrice,
      addressId: req.body.addressId,
      userId: req.user.id,
    };

    const newOrderShop = await OrderShop.bulkCreate(priceEachShop);
    const newOrder = await Order.create(order);

    for (const item of items) {
      let i = 0;
      item.orderShopId = newOrderShop[i].id;
      item.orderId = newOrder.id;
      i++;
    }

    await OrderItem.bulkCreate(items);

    res.status(200).json({ message: "Create success" });
  } catch (err) {
    next(err);
  }
};

// exports.getOrder = async (req, res, next) => {
//   try {
//     const order = await OrderItem.findAll({
//       include: [
//         {
//           model: Order,
//           where: {
//             userId: req.user.id,
//           },
//         },
//         {
//           model: OrderShop,
//           where: {
//             // shopId: req.shop.id, //add

//             status: req.query.status,
//           },
//         },
//         {
//           model: Product,
//         },
//       ],
//     });
//     res.status(200).json({ order });
//   } catch (err) {
//     next(err);
//   }
// };

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      attributes: ["id", "userId"],
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: OrderItem,
          attributes: ["totalPrice", "quantity", "orderShopId", "productId"],
          order: ["orderShopId"],
          include: [
            {
              model: Product,
              attributes: ["id", "name", "price"],
            },
            {
              model: OrderShop,
              attributes: ["id", "status", "totalPrice"],
              where: {
                // shopId: req.shop.id, //add

                status: req.query.status,
              },
              include: { model: Shop },
            },
          ],
        },
      ],
    });
    let output = order.map((el) => {
      return el.OrderItems.map((item) => {
        return item;
      });
    });
    let output2 = output[0].reduce((a, c) => {
      const { orderShopId } = c;
      a[orderShopId] = a[orderShopId] ?? [];
      a[orderShopId].push(c);
      return a;
    }, {});
    res.status(200).json(output2);
  } catch (err) {
    next(err);
  }
};

//add
exports.getOrderShopForuser = async (req, res, next) => {
  try {
    const orderShop = await OrderShop.findAll({
      include: { model: Shop },
      where: {
        // userId: req.user.id,
        shopId: req.shop.id,
        status: req.query.status,
      },
    });
    res.status(200).json({ orderShop });
  } catch (err) {
    next(err);
  }
};
//end

exports.updateOrder = async (req, res, next) => {
  try {
    const { orderShopId } = req.params;
    console.log(orderShopId);
    await OrderShop.update(
      {
        status: "SUCCESS",
      },
      {
        where: {
          id: orderShopId,
        },
      }
    );
    res.status(200).json({ message: "Update success" });
  } catch (err) {
    next(err);
  }
};
