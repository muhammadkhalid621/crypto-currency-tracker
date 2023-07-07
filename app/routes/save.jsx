import { db } from "../utils/prisma.server";
import { redirect } from "@remix-run/node";


export async function action({ request }) {
  const formData = await request.formData();
  const code = formData.get("code");
  const name = formData.get("name");
  const price = formData.get("priceUsd");
  const volume = formData.get("volumeUsd24Hr");
  const change = formData.get("changePercent24Hr");
  console.log(code, name, price, volume, change);

  const response = await db.cryptoCurrency.create({
    data: {
      code: code,
      name: name,
      amount: parseFloat(price),
      tradeVolume24h: parseFloat(volume),
      percentageChange: parseFloat(change),
    },
  });
  return redirect('/');
}
