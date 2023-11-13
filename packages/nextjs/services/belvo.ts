import belvo from "belvo";

export const belvoClient = new belvo(
  `${process.env.BELVO_API_KEY}`,
  `${process.env.BELVO_SECRET_KEY}`,
  `${process.env.BELVO_URL}`,
);
