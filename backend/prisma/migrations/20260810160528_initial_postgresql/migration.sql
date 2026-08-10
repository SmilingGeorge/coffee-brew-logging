-- CreateTable
CREATE TABLE "Brew" (
    "id" SERIAL NOT NULL,
    "coffeeName" TEXT NOT NULL,
    "brewMethod" TEXT NOT NULL,
    "coffeeAmount" DOUBLE PRECISION NOT NULL,
    "waterAmount" DOUBLE PRECISION NOT NULL,
    "brewTime" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brew_pkey" PRIMARY KEY ("id")
);
