-- CreateTable
CREATE TABLE "CryptoCurrency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "tradeVolume24h" REAL NOT NULL,
    "percentageChange" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CryptoCurrency_code_key" ON "CryptoCurrency"("code");
