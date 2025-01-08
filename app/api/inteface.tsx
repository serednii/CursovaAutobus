export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  license: string;
  routes?: RouteDriver[];
  orders?: OrderedRoute[];
}

export interface RouteDriver {
  id: number;
  driverId: number;
  user: User;
  departureDate: Date;
  arrivalDate: Date;
  departureFrom: string;
  arrivalTo: string;
  busNumber: string;
  routePrice: number;
  notate?: string;
  wifi: boolean;
  coffee: boolean;
  power: boolean;
  restRoom: boolean;
  busSeats: Record<string, any>; // Тип Json в Prisma
  intermediateStops: string[];
  passengersListId: number[];
  orders?: OrderedRoute[];
}

export interface OrderedRoute {
  id: number;
  passengerId: number;
  user: User;
  routeDriverId: number;
  routeDriver: RouteDriver;
  orderDate: Date;
  orderSeats: number[];
}

const RouteDriver = {
  driverId: 10,
  departureDate: "2025-01-10T08:00:00Z",
  arrivalDate: "2025-01-10T12:00:00Z",
  departureFrom: "New York",
  arrivalTo: "Washington, D.C.",
  busNumber: "NY-WDC-2025",
  routePrice: 50,
  notate: "This is a comfortable route.",
  wifi: true,
  coffee: true,
  power: true,
  restRoom: true,
  busSeats: {
    passengerLength: 19,
    modelBus: "Volvo 240",
    passenger: [
      { passenger: 1, number: 1, busSeatStatus: "reserved" },
      { passenger: 2, number: 5, busSeatStatus: "reserved" },
      { passenger: 5, number: 8, busSeatStatus: "reserved" },
      { passenger: 8, number: 11, busSeatStatus: "reserved" },
      { passenger: 10, number: 14, busSeatStatus: "reserved" },
      { passenger: 11, number: 2, busSeatStatus: "reserved" },
      { passenger: null, number: 6, busSeatStatus: "available" },
      { passenger: null, number: 9, busSeatStatus: "available" },
      { passenger: null, number: 12, busSeatStatus: "available" },
      { passenger: null, number: 15, busSeatStatus: "available" },
      { passenger: null, number: 3, busSeatStatus: "available" },
      { passenger: null, number: 7, busSeatStatus: "available" },
      { passenger: null, number: 10, busSeatStatus: "available" },
      { passenger: null, number: 13, busSeatStatus: "available" },
      { passenger: null, number: 16, busSeatStatus: "available" },
      { passenger: null, number: 4, busSeatStatus: "available" },
      { passenger: null, number: 19, busSeatStatus: "available" },
      { passenger: null, number: 18, busSeatStatus: "available" },
      { passenger: null, number: 17, busSeatStatus: "available" },
    ],
  },
  intermediateStops: ["Philadelphia", "Baltimore"],
  passengersListId: [1, 2, 80],
};
