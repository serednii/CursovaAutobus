"use client";

import { Container } from "@/components/shared/container";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  InputAdornment,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "@/components/shared/form/dataPicker";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Driver() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm({ mode: "onChange" });

  interface FormValues {
    password: string;
    password_repeat: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    license: string;
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    alert("Form submitted with data: " + JSON.stringify(data));
    reset();
  };

  return (
    <Container>
      <header className="flex justify-between items-center px-4">
        <div>
          <h1 className="text-2xl font-bold">Route Management</h1>
          <p>Create and manage your bus routes</p>
        </div>
        <div>
          <Link
            href="/driver/route"
            className="bg-[#2563EB] flex items-center justify-center gap-2 rounded-lg w-[158px] h-[40px] text-white p-2 
                hover:bg-[#1E3A8A] hover:shadow-lg transition duration-300"
          >
            <FaPlus style={{ color: "white" }} /> Create Route
          </Link>
        </div>
      </header>

      <main className="px-4 bg-[white] rounded-xl">
        {/* Форму тепер обгортаємо в onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TextField з react-hook-form */}
          <TextField
            {...register("firstName", { required: "First name is required" })}
            className="mb-6"
            label="First Name"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />

          {/* Додавання CustomDatePicker */}

          <div className="flex">
            <CustomDatePicker
              title="Departure Date"
              name="departureDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
            <CustomDatePicker
              title="Arrival Date"
              name="arrivalDate"
              register={register}
              errors={errors}
              control={control} // Передаємо control
            />
          </div>

          {/* Checkbox з react-hook-form */}
          <FormControlLabel
            control={<Checkbox {...register("checked")} color="primary" />}
            label="Check this box"
          />

          {/* Кнопка submit */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isValid} // Вимикає кнопку, якщо форма не валідна
          >
            Submit
          </Button>
        </form>
      </main>
    </Container>
  );
}
