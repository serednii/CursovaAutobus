/*
  Warnings:

  - You are about to drop the `OrderSeat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderedRoute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderSeat";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderedRoute";
PRAGMA foreign_keys=on;
