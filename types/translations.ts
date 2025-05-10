// Інтерфейс для перекладів header.json
export interface HeaderTranslations {
  create_route: string;
  my_routes: string;
  my_route: string;
  my_bookings: string;
  seat_selection: string;
}

// Інтерфейс для перекладів auth.json
export interface AuthTranslations {
  register_passenger: {
    title: string;
    sub_title: string;
  };
  register_driver: {
    title: string;
    sub_title: string;
  };
  select_role: {
    title: string;
    description: string;
    driver: {
      title: string;
      description: string;
    };
    passenger: {
      title: string;
      description: string;
    };
    cancel: string;
  };
  sign_in: {
    title: string;
    sign_in_loading: string;
    welcome: string;
    register: string;
  };
  error: {
    error_message: string;
    try_again: string;
  };
}

// Інтерфейс для перекладів form.json
export interface FormTranslations {
  departure_from: string;
  arrival_to: string;
  departure_date: string;
  arrival_date: string;
  wi_fi: string;
  coffee: string;
  power: string;
  restRoom: string;
  select_bus: string;
  bus: string;
  seats: string;
  intermediate_stops: string;
  stops: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  from: string;
  to: string;
  available_seats: string;
  price: string;
  view_route: string;
  edit_reservation: string;
  book_now: string;
  booked_seats: string;
  change_route: string;
  change_bookings: string;
  new_route: string;
  cancel_route: string;
  activate_again: string;
  delete_route: string;
  activate_route: string;
  activate_again_route: string;
  date_and_time: string;
  seats_number: string;
  total_price: string;
  max_seats: string;
  invalid_phone_number: string;
  phone_is_required: string;
  invalid_email: string;
  email_is_required: string;
  password: string;
  repeat_password: string;
  you_must_specify_password: string;
  password_must_have_at_least_8_characters: string;
  the_passwords_do_not_match: string;
  driver_license_number: string;
  this_field_is_required: string;
  minimum_5_symbol_license: string;
  submit: string;
}

// Інтерфейс для seatselection.json
export interface SeatSelectionTranslations {
  selected_bus: string;
  departure: string;
  arrival: string;
  seats_available: string;
  add_sub_passenger: string;
  reserved_seats: string;
}

// Інтерфейс для myroutes.json
export interface MyRoutesTranslations {
  my_routes: string;
  there_are_no_available_routes: string;
  available_routes: string;
  past_routes: string;
  is_delete_route: string;
}

// Інтерфейс для myroute.json
export interface MyRouteTranslations {
  view_chosen_route: string;
  route: string;
  passenger_details: string;
  seats: string;
  order_passenger: string;
  passenger: string;
  phone: string;
  email: string;
}

// Інтерфейс для mybookings.json
export interface MyBookingsTranslations {
  booked_routes: string;
  cancel_booking: string;
  details_route: string;
  details_bookings: string;
  my_bookings: string;
  there_are_no_available_bookings: string;
}

// Інтерфейс для home.json
export interface HomeTranslations {
  find_your_route: string;
  available_routes: string;
  select_options: string;
}

// Інтерфейс для createroute.json
export interface CreateRouteTranslations {
  route_management: string;
  create_and_manage_your_bus_routes: string;
  bus_layout: string;
  bus_number: string;
  route_price: string;
  additional_options: string;
  add_sub_passenger: string;
  create_route: string;
  update_route: string;
}

export interface FooterTranslations {
  company_name: string;
  company_description: string;
  quick_links: string;
  about_us: string;
  contact: string;
  terms: string;
  support: string;
  faq: string;
  help_center: string;
  privacy: string;
  follow_us: string;
  facebook: string;
  instagram: string;
  twitter: string;
  rights: string;
}

export type Namespace =
  | "header"
  | "auth"
  | "form"
  | "seatselection"
  | "myroutes"
  | "myroute"
  | "mybookings"
  | "home"
  | "createroute"
  | "footer";

export type TranslationKey<T extends Namespace> = T extends "header"
  ? keyof HeaderTranslations
  : T extends "auth"
  ? keyof AuthTranslations | `${string}.${string}`
  : T extends "form"
  ? keyof FormTranslations
  : T extends "seatselection"
  ? keyof SeatSelectionTranslations
  : T extends "myroutes"
  ? keyof MyRoutesTranslations
  : T extends "myroute"
  ? keyof MyRouteTranslations
  : T extends "mybookings"
  ? keyof MyBookingsTranslations
  : T extends "home"
  ? keyof HomeTranslations
  : T extends "createroute"
  ? keyof CreateRouteTranslations
  : T extends "footer"
  ? keyof FooterTranslations
  : never;
