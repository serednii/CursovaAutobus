import { FormValuesRoute } from "@/types/form.types";
import { create } from "zustand";
import { Control, FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";

export interface BearState {
  isValid?: boolean;
  setIsValid: (isValid: boolean) => void;

  unregister?: UseFormUnregister<FormValuesRoute>;
  setUnregister: (unregister: UseFormUnregister<FormValuesRoute>) => void;

  watch?: UseFormWatch<FormValuesRoute>;
  control?: Control<FormValuesRoute>;

  register: UseFormRegister<FormValuesRoute>;
  setRegister: (register: UseFormRegister<FormValuesRoute>) => void;

  errors: FieldErrors<FormValuesRoute>;
  setErrors: (errors: FieldErrors<FormValuesRoute>) => void;

  setValue?: UseFormSetValue<FormValuesRoute>;
  setSetValue: (setValue: UseFormSetValue<FormValuesRoute>) => void;

  handleSubmit?: UseFormHandleSubmit<FormValuesRoute>;
  setHandleSubmit: (handleSubmit: UseFormHandleSubmit<FormValuesRoute>) => void;
}

const useCreateFormStore = create<BearState>((set) => ({
  isValid: false,
  setIsValid: (isValid) => set({ isValid }),

  unregister: (() => {}) as unknown as UseFormUnregister<FormValuesRoute>,
  setUnregister: (unregister) => set({ unregister }),

  watch: (() => ({})) as unknown as UseFormWatch<FormValuesRoute>,
  control: {} as Control<FormValuesRoute>,

  register: (() =>
    ({
      onChange: () => {},
      onBlur: () => {},
      ref: () => {},
      name: "",
    } as any)) as UseFormRegister<FormValuesRoute>,
  setRegister: (register) => set({ register }),

  errors: {} as FieldErrors<FormValuesRoute>,
  setErrors: (errors) => set({ errors }),

  setValue: (() => {}) as unknown as UseFormSetValue<FormValuesRoute>,
  setSetValue: (setValue) => set({ setValue }),

  handleSubmit: (() => {}) as unknown as UseFormHandleSubmit<FormValuesRoute>,
  setHandleSubmit: (handleSubmit) => set({ handleSubmit }),
}));

export default useCreateFormStore;
