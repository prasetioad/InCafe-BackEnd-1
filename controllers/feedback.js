const db = require("../models");
const formatResult = require("../helpers/formatResult");
const Feedback = db.feedback;

exports.create = (req, res) => {
  Feedback.create(req.body)
    .then((result) => {
      formatResult(res, 201, true, "Feedback Created!", result.dataValues);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getData = (req, res) => {
  Feedback.findAll()
    .then((result) => {
      formatResult(res, 200, true, "Success Get Feedback!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};

exports.getDataById = (req, res) => {
  const FeedbackId = req.params.userId;
  Feedback.findAll({
    where: { userId: FeedbackId },
    attributes: ["id", "userId", "content", "rating"],
  })
    .then((result) => {
      formatResult(res, 200, true, "Success Get Feedback!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, "Smething Wrong!");
    });
};

exports.deleteData = (req, res) => {
  Feedback.destroy({
    where: {
      userId: req.params.userId,
    },
  })
    .then((result) => {
      formatResult(res, 201, true, "Feedback Deleted!", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, " Fail Delete Feedback!", err);
    });
};

exports.updateData = (req, res) => {
  const movieId = req.params.userId;
  Feedback.update(req.body, { where: { id: movieId } })
    .then((result) => {
      formatResult(res, 201, true, "Update Success", result);
    })
    .catch((err) => {
      formatResult(res, 500, false, err, null);
    });
};
