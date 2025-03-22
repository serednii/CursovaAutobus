import { create } from "zustand";
import { useForm } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
import useCreateFormStore from "./createFormStore";

interface FormState {
  register: UseFormRegister<FormValuesRoute>;
  unregister: UseFormUnregister<FormValuesRoute>;
  setValue: UseFormSetValue<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
  control: Control<FormValuesRoute>;
  handleSubmit: UseFormHandleSubmit<FormValuesRoute>;
  errors: FieldErrors<FormValuesRoute>;
  isValid: boolean;
}

const useFormStore = create<FormState>(() => {
  const {
    register,
    unregister,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm<FormValuesRoute>({
    mode: "onChange",
    defaultValues: {
      wifi: true,
      coffee: true,
      power: true,
      restRoom: true,
    },
  });

  const storeRegister = useCreateFormStore((state) => state.register);
  const storeUnregister = useCreateFormStore((state) => state.unregister);
  const storeSetValue = useCreateFormStore((state) => state.setValue);
  const storeSetRegister = useCreateFormStore((state) => state.setRegister);
  const storeSetUnregister = useCreateFormStore((state) => state.setUnregister);
  const storeSetSetValue = useCreateFormStore((state) => state.setSetValue);

  return {
    storeRegister,
    storeUnregister,
    storeSetValue,
    storeSetRegister,
    storeSetUnregister,
    storeSetSetValue,
    register,
    unregister,
    setValue,
    watch,
    control,
    handleSubmit,
    errors,
    isValid,
  };
});

export default useFormStore;
