const Feedback = require('../models/feedback');

exports.raiseFeedback = async (req, res, next) => {
  try {
    const { feedback_desc, rating, user_id } = req.body;

    const newFeedback = await Feedback.create({
      feedback_desc,
      rating,
      user_id
    });

    res.json({ message: 'Feedback raised successfully', feedback: newFeedback });
  } catch (error) {
    next(error);
  }
};

exports.monitorFeedback = async (req, res, next) => {
  try {
    const { feedback_id, status } = req.body;

    const feedback = await Feedback.findByPk(feedback_id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found.' });
    }

    feedback.status = status;
    await feedback.save();

    res.json({ message: 'Feedback status updated successfully', feedback });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const allFeedback = await Feedback.findAll();

    res.json(allFeedback);
  } catch (error) {
    next(error);
  }
};
