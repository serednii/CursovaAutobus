export const allowedFieldsDriver =
  "id,driverId,departureDate,arrivalDate,departureFrom,arrivalTo,routePrice,busNumber,modelBus,maxSeats,bookedSeats,busSeats,passengersSeatsList";
export const allowedFieldsUser = "id,email,firstName,lastName,phone,role,license";

export const ALLOWED_FIELDS_DRIVER = new Set([
  "id",
  "driverId",
  "departureDate",
  "arrivalDate",
  "departureFrom",
  "arrivalTo",
  "routePrice",
  "busNumber",
  "modelBus",
  "maxSeats",
  "bookedSeats",
  "selectBusLayout",
  "busSeats",
  "passengersSeatsList",
  "intermediateStops",
  "notate",
  "wifi",
  "coffee",
  "power",
  "restRoom",
  "driverId",
]);

export const ALLOWED_FIELDS_USER = new Set([
  "id",
  "email",
  "firstName",
  "lastName",
  "phone",
  "role",
  "license",
]);
