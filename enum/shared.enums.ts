export enum SeatStatusEnum {
  RESERVED = "reserved",
  RESERVEDEMPTY = "reservedEmpty",
  AVAILABLE = "available",
  SELECTED = "selected",
}

export enum RoleEnum {
  ADMIN = "admin",
  GUEST = "guest",
  DRIVER = "driver",
  PASSENGER = "passenger",
}

export enum ActionEnum {
  CREATEROUTEDRIVER = "createRouteDriver",
  CREATEROUTEPASSENGER = "createRoutePassenger",
  UPDATEROUTEPASSENGER = "updateRoutePassenger",
  UPDATEROUTEDRIVER = "updateRouteDriver",
}
