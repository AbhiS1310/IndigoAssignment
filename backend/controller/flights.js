import isAuthenticated from "../middleware/auth.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import Flight from "../models/flights.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendFlightUpdateNotification from "../utils/sendMail.js";
import express from 'express';

const router = express.Router();

router.get("/flights", catchAsyncErrors(async (req, res, next) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.get("/flights/:id", catchAsyncErrors(async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) { 
      return next(new ErrorHandler("Flight not found!", 404)); 
    }
    res.json(flight);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.post("/flights",isAuthenticated, catchAsyncErrors(async (req, res, next) => {
  const newFlight = new Flight(req.body);
  console.log("ading......");
  try {
    const flight = await newFlight.save();

    // Notify users about the new flight
    const notification = {
      message: `New flight added: ${flight.flightNumber} from ${flight.departure} to ${flight.arrival} on ${flight.date}`,
      date: new Date().toISOString(),
    };
    // Notify.addNotification(notification);
    console.log("ading......");

    res.status(201).json(flight);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

router.put("/flights/:id",isAuthenticated,catchAsyncErrors(async (req, res, next) => {
  try {
    const { flightId } = req.params;
    const flightData = req.body;

    // Update the flight entry
    const updatedFlight = await Flight.findByIdAndUpdate(flightId, flightData, {
      new: true,
    }).exec();

    if (!updatedFlight)
      return next(new ErrorHandler("Flight not found!", 404));

    // Send notification
    await sendFlightUpdateNotification(flightId);

    res
      .status(200)
      .json({ message: "Flight updated successfully", updatedFlight });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

export default router;
