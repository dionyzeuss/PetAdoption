const Shop = require("../models/shopSchema");

module.exports.getAllSales = (req, res) => {
  Shop.find({ isSold: false })
    .then((items) => res.send(items))
    .catch((error) => res.status(500).send(error));
};

module.exports.getSalesById = (req, res) => {
  const id = req.params.id;
  Shop.findById(id)
    .then((item) => {
      if (item) {
        res.send(item);
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports.createSales = (req, res) => {
  const newItem = new Shop(req.body);
  newItem
    .save()
    .then((item) => res.status(201).send(item))
    .catch((error) => res.status(500).send(error));
};

module.exports.updateSales = (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndUpdate(id, req.body, { new: true })
    .then((item) => {
      if (item) {
        res.send(item);
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((error) => res.status(500).send(error));
};

module.exports.deleteSales = (req, res) => {
  const id = req.params.id;
  Shop.findByIdAndDelete(id)
    .then((item) => {
      if (item) {
        res.send({ message: "Item deleted successfully" });
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch((error) => res.status(500).send(error));
};
