import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51DpVXWGc9EcLzRLBNKni929hB026lACv6toMfjH1FPtIXfYgIrhXzjolcYzDDl2VwtvmyPF20PJ1JaMUCTNoEwDN00FN8hrRZL");
const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  try {
    if (req.body.gigId) {
      const { gigId } = req.body;
      const gig = await prisma.gigs.findUnique({
        where: { id: gigId },  // No need for parseInt
      });

      if (!gig) {
        return res.status(404).send("Gig not found.");
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig.price,
          buyer: { connect: { id: req.userId } },
          gig: { connect: { id: gig.id } },
        },
      });

      return res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      return res.status(400).send("Gig id is required.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const confirmOrder = async (req, res) => {
  try {
    if (req.body.paymentIntent) {
      await prisma.orders.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { isCompleted: true },
      });
      return res.status(200).send("Order confirmed.");
    } else {
      return res.status(400).send("Payment intent is required.");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getBuyerOrders = async (req, res) => {
  try {
    if (req.userId) {
      const orders = await prisma.orders.findMany({
        where: { buyerId: req.userId, isCompleted: true },
        include: { gig: true },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    if (req.userId) {
      const orders = await prisma.orders.findMany({
        where: {
          gig: {
            createdById: req.userId,  // No need for parseInt
          },
          isCompleted: true,
        },
        include: {
          gig: true,
          buyer: true,
        },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
