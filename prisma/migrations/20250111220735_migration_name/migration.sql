-- CreateTable
CREATE TABLE "RouteDriver" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "departureFrom" TEXT NOT NULL,
    "arrivalTo" TEXT NOT NULL,
    "busNumber" TEXT NOT NULL,
    "selectBusLayout" TEXT NOT NULL,
    "routePrice" INTEGER NOT NULL,
    "notate" TEXT,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "coffee" BOOLEAN NOT NULL DEFAULT false,
    "power" BOOLEAN NOT NULL DEFAULT false,
    "restRoom" BOOLEAN NOT NULL DEFAULT false,
    "busSeats" JSONB NOT NULL,
    "intermediateStops" TEXT[],
    "passengersListId" INTEGER[],

    CONSTRAINT "RouteDriver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedRoute" (
    "id" SERIAL NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "routeDriverId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderSeats" INTEGER[],

    CONSTRAINT "OrderedRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantBusSeats" (
    "id" SERIAL NOT NULL,
    "busSeats" JSONB NOT NULL,

    CONSTRAINT "VariantBusSeats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RouteDriver" ADD CONSTRAINT "RouteDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedRoute" ADD CONSTRAINT "OrderedRoute_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedRoute" ADD CONSTRAINT "OrderedRoute_routeDriverId_fkey" FOREIGN KEY ("routeDriverId") REFERENCES "RouteDriver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
