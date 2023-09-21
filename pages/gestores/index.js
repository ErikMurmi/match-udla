import { dbConnect } from "utils/mongoose";
import { unstable_getServerSession, useSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Gestor from "models/Gestor";

dbConnect();

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const { method, body } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  //const {status,data} = useSession()
  console.log("La sesion es " + session);
  /*
   */
  switch (method) {
    case "GET":
      try {
        const gestores = await Gestor.find();
        return res.status(200).json(gestores);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    case "POST":
      try {
        const newGestor = new Gestor(body);
        const savedGestor = await newGestor.save();
        return res.status(201).json(savedGestor);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    default:
      return res.status(400).json({
        msg: "This method does not exits",
      });
  }
  console.log(req.method, req.url);
}
