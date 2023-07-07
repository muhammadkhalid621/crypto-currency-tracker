
export async function fetchCryptocurrencies() {
  const response = await fetch("https://api.coincap.io/v2/assets");
  const data = await response.json();
  return data.data;
}
