import { z } from "zod";

export const addReq = z.strictObject({
  x: z.number(),
  y: z.number(),
});

export const addResp = z.strictObject({
  sum: z.number(),
});

export const rot13Req = z.strictObject({
  plaintext: z.string(),
})

export const rot13Resp = z.strictObject({
  ciphertext: z.string(),
})

export type Api = {
  "/add": [typeof addReq, typeof addResp],
  "/rot13": [typeof rot13Req, typeof rot13Resp],
}
