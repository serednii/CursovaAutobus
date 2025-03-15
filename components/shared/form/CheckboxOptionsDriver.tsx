// import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
// import { IoIosWifi } from "react-icons/io";
// import { CgCoffee } from "react-icons/cg";
// import { MdOutlinePower } from "react-icons/md";
// import { FaRestroom } from "react-icons/fa";
// import { UseFormRegister, UseFormWatch } from "react-hook-form";
// import { FormValuesRoute } from "@/types/form.types";

// interface Props {
//   register: UseFormRegister<FormValuesRoute>;
//   watch: UseFormWatch<FormValuesRoute>;
//   className?: string;
// }

// export default function CheckboxOptionsDriver({ register, watch }: Props) {
//   return (
//     <div className="flex justify-between flex-wrap">
//       <div>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox {...register("wifi")} />}
//             checked={watch("wifi") || false}
//             label={
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <IoIosWifi style={{ marginRight: "8px", fontSize: "24px" }} />
//                 Wi-Fi
//               </div>
//             }
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("coffee")} />}
//             checked={watch("coffee") || false}
//             label={
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <CgCoffee style={{ marginRight: "8px", fontSize: "24px" }} />
//                 Coffee/Tea
//               </div>
//             }
//           />
//         </FormGroup>
//       </div>
//       <div>
//         <Typography variant="h6" gutterBottom></Typography>
//         <FormGroup>
//           <FormControlLabel
//             control={<Checkbox {...register("power")} />}
//             checked={watch("power") || false}
//             label={
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <MdOutlinePower style={{ marginRight: "8px", fontSize: "24px" }} />
//                 Power Outlets
//               </div>
//             }
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("restRoom")} />}
//             checked={watch("restRoom") || false}
//             label={
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <FaRestroom style={{ marginRight: "8px", fontSize: "24px" }} />
//                 RestRoom
//               </div>
//             }
//           />
//         </FormGroup>
//       </div>
//     </div>
//   );
// }
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { IoIosWifi } from "react-icons/io";
import { CgCoffee } from "react-icons/cg";
import { MdOutlinePower } from "react-icons/md";
import { FaRestroom } from "react-icons/fa";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormValuesRoute } from "@/types/form.types";
import { memo } from "react";

interface Props {
  register: UseFormRegister<FormValuesRoute>;
  watch: UseFormWatch<FormValuesRoute>;
}

const options1 = [
  { name: "wifi", label: "Wi-Fi", icon: IoIosWifi },
  { name: "coffee", label: "Coffee/Tea", icon: CgCoffee },
];
const options2 = [
  { name: "power", label: "Power Outlets", icon: MdOutlinePower },
  { name: "restRoom", label: "RestRoom", icon: FaRestroom },
];

export default memo(function CheckboxOptionsDriver({ register, watch }: Props) {
  return (
    <div className="flex justify-between flex-wrap">
      <FormGroup>
        {options1.map(({ name, label, icon: Icon }) => (
          <FormControlLabel
            key={name}
            control={<Checkbox {...register(name as keyof FormValuesRoute)} />}
            checked={watch(name as "wifi" | "coffee") || false}
            label={
              <div className="flex items-center">
                <Icon className="mr-2 text-xl" />
                {label}
              </div>
            }
          />
        ))}
      </FormGroup>
      <FormGroup>
        {options2.map(({ name, label, icon: Icon }) => (
          <FormControlLabel
            key={name}
            control={<Checkbox {...register(name as keyof FormValuesRoute)} />}
            checked={watch(name as "power" | "restRoom") || false}
            label={
              <div className="flex items-center">
                <Icon className="mr-2 text-xl" />
                {label}
              </div>
            }
          />
        ))}
      </FormGroup>
    </div>
  );
});
