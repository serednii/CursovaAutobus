-- CreateTable
CREATE TABLE "OrderedRoute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passengerId" INTEGER NOT NULL,
    "routeDriverId" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderedRoute_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderedRoute_routeDriverId_fkey" FOREIGN KEY ("routeDriverId") REFERENCES "RouteDriver" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderSeat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seatNumber" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSeat_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderedRoute" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
