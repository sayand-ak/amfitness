/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Gym` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gym_username_key" ON "Gym"("username");
