import { ok } from "assert";
import { Request, Response, RequestHandler } from "express";

export const generateAuthLink: RequestHandler = (req, res) => {
  console.log(req.body);
  res.json({ ok: true });
};
