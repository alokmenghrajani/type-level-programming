import { z } from "zod";
import { Api } from "./api-types";

async function fetch<K extends keyof Api>(path: K, params: z.infer<Api[K][0]>): Promise<z.infer<Api[K][1]>> {
  const res = await window.fetch(path, {
    method: "POST",
    body: JSON.stringify(params)
  });
  return res.json();
}

export async function add() {
  const w: any = window;
  const r = await fetch("/add", { x: Number(w.x.value), y: Number(w.y.value) });
  w.sum.innerText = r.sum;
}

export async function rot13() {
  const w: any = window;
  const r = await fetch("/rot13", { plaintext: w.plaintext.value });
  w.ciphertext.innerText = r.ciphertext;
}
