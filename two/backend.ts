import { z } from "zod";
import { Api, addReq, addResp, rot13Req, rot13Resp } from "./api-types";

type Ctx = {
  path: string,
  body: string,
}

type Handler<Req, Resp> = (ctx: Ctx, req: Req) => Promise<Resp>;
export type Handlers = {
  [K in keyof Api]: [Api[K][0], Api[K][1],
    Handler<z.infer<Api[K][0]>, z.infer<Api[K][1]>>];
};

const addHandler = async (ctx: Ctx, request: z.infer<typeof addReq>): Promise<z.infer<typeof addResp>> => ({
  sum: request.x + request.y
});

const rot13Handler = async (ctx: Ctx, request: z.infer<typeof rot13Req>): Promise<z.infer<typeof rot13Resp>> => ({
  ciphertext: request.plaintext.split('').reverse().join('')
})


export const handlers: Handlers = {
  "/add": [addReq, addResp, addHandler],
  "/rot13": [rot13Req, rot13Resp, rot13Handler],
}

export async function dispatch(ctx: Ctx): Promise<any> {
  const key = ctx.path as keyof Handlers;
  const [zRequest, zResponse, handler] = handlers[key];
  const r = await handler(ctx, zRequest.parse(ctx.body) as any); // much sadness
  zResponse.parse(r); // parse to prevent accidentally leaking data!
  return r;
}

