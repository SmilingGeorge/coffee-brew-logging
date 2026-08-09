-- CreateTable
CREATE TABLE "Brew" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "coffeeName" TEXT NOT NULL,
    "brewMethod" TEXT NOT NULL,
    "coffeeAmount" REAL NOT NULL,
    "waterAmount" REAL NOT NULL,
    "brewTime" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
