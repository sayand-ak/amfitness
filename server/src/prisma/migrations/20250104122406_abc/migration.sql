-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);
