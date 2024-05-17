import Payment from "../models/paymentModel.js";

export const createNewPayment = async (req, res) => {
  try {
  
    const payment = new Payment({ ...req.body });
    await payment.save();
    res.status(201).send({
      success: true,
      message: "payment Placed Successfully",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in payment Placed",
    });
  }
};

export const getUserPayments = async (req, res) => {
    try {
        const payments  = await Payment.find({userId: req.params.id})
        res.status(200).send(payments);
    } catch (error) {
         console.log(error);
         res.status(500).send({
           success: false,
           message: "Error while getting payments",
           error,
         });
    }
}
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send(payments);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting payments",
      error,
    });
  }
};