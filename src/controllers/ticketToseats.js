const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const getSeatByScreenId = async (req, res) => {
  const { id } = req.params;
  const foundScreen = await prisma.seat.findFirst({
    where: { screenId: Number.parseInt(id) },
  });
  if (!foundScreen)
    res.status(404).json({ error: "Screen with that id does not exist" });
  const seats = await prisma.seat.findMany({
    where: {
      screenId: Number.parseInt(id),
    },
  });

  res.status(201).json({ Seats: seats });
};

const createTicket = async (req, res) => {
  const { seatNumber, screenId } = req.body;
  // if (!seatNumber || !screenId) {
  //   return res.status(400).json({
  //     error: "Missing fields in the request body",
  //   });
  // }
  // const seat = await prisma.seat.findFirst({
  //   where: { id: Number(seatNumber) },
  // });

  // const screen = await prisma.screen.findFirst({
  //   where: { id: Number(screenId) },
  // });

  try {
    const createdTicket = await prisma.ticket.create({
      data: {
        screening: {
          connect: {
            id: screening.id,
          },
        },
        customer: {
          connect: {
            id: customer.id,
          },
        },
        seats: {
          create: [
            { seatNumber: seatNumber, screenId: Number.parseInt(screenId) },
          ],
        },
      },
      // select: {
      //   id: true,
      //   customer: {
      //     include: { contact: true },
      //   },
      // },

      include: {
        seats: true,
      },
    });
    res.status(201).json({ ticket: createdTicket });
  } catch (e) {
    res.json({ error: "Invalid screen id or seat number has been entered" });
  }
};

module.exports = {
  getSeatByScreenId,
  createTicket,
};
