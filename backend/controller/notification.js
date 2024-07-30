import Notification from "../models/notifications.js";
import express from 'express';
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

const router = express.Router();

router.post("/notifications", catchAsyncErrors(async (req, res) => {
  const { fullName, email, contactNumber, flightNumber, notificationType } = req.body;

  try {
    const notification = new Notification({
      fullName,
      email,
      contactNumber,
      flightNumber,
      notificationType,
    });

    await notification.save();

    res
      .status(201)
      .json({ message: "Notification preference saved successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.get("/notifications", catchAsyncErrors(async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.put("/notifications/:id", catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { fullName, email, contactNumber, flightNumber, notificationType } = req.body;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.fullName = fullName;
    notification.email = email;
    notification.contactNumber = contactNumber;
    notification.flightNumber = flightNumber;
    notification.notificationType = notificationType;

    await notification.save();

    res.json({ message: "Notification updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

export default router;