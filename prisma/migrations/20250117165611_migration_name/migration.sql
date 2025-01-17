-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "license" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RouteDriver" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driverId" INTEGER NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "arrivalDate" DATETIME NOT NULL,
    "departureFrom" TEXT NOT NULL,
    "arrivalTo" TEXT NOT NULL,
    "busNumber" TEXT NOT NULL,
    "maxSeats" INTEGER NOT NULL,
    "bookedSeats" INTEGER NOT NULL,
    "selectBusLayout" TEXT NOT NULL,
    "routePrice" INTEGER NOT NULL,
    "notate" TEXT,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "coffee" BOOLEAN NOT NULL DEFAULT false,
    "power" BOOLEAN NOT NULL DEFAULT false,
    "restRoom" BOOLEAN NOT NULL DEFAULT false,
    "modelBus" TEXT NOT NULL,
    CONSTRAINT "RouteDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PassengersSeatsList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idPassenger" INTEGER NOT NULL,
    "routeDriverId" INTEGER NOT NULL,
    CONSTRAINT "PassengersSeatsList_idPassenger_fkey" FOREIGN KEY ("idPassenger") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PassengersSeatsList_routeDriverId_fkey" FOREIGN KEY ("routeDriverId") REFERENCES "RouteDriver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubPassengersList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passengersSeatsListId" INTEGER NOT NULL,
    "subFirstName" TEXT NOT NULL,
    "subLastName" TEXT NOT NULL,
    "subPhone" TEXT NOT NULL,
    "subEmail" TEXT NOT NULL,
    CONSTRAINT "SubPassengersList_passengersSeatsListId_fkey" FOREIGN KEY ("passengersSeatsListId") REFERENCES "PassengersSeatsList" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IntermediateStop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stopName" TEXT NOT NULL,
    "routeId" INTEGER,
    CONSTRAINT "IntermediateStop_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "RouteDriver" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BusSeat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passenger" INTEGER,
    "number" INTEGER NOT NULL,
    "busSeatStatus" TEXT NOT NULL,
    "routeDriverId" INTEGER NOT NULL,
    CONSTRAINT "BusSeat_routeDriverId_fkey" FOREIGN KEY ("routeDriverId") REFERENCES "RouteDriver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderedRoute" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "passengerId" INTEGER NOT NULL,
    "routeDriverId" INTEGER NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderedRoute_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderedRoute_routeDriverId_fkey" FOREIGN KEY ("routeDriverId") REFERENCES "RouteDriver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderSeat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seatNumber" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSeat_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "OrderedRoute" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
