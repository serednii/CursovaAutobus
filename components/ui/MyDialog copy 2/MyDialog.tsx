import * as DialogPrimitives from "@radix-ui/react-dialog";
import * as Icons from "@radix-ui/react-icons";
import "./dialog.css";

interface DialogProps {
  title: string;
  // description: string;
  // content: ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
  setOk: (value: boolean) => void;
}
export const MyDialog = ({
  title,
  // description,
  setOk,
  open,
  setOpen,
}: DialogProps) => {
  return (
    <DialogPrimitives.Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogPrimitives.DialogTrigger>

      </DialogPrimitives.DialogTrigger> */}
      <DialogPrimitives.DialogContent className="content" aria-describedby={undefined}>
        <DialogPrimitives.DialogTitle className="title">{title}</DialogPrimitives.DialogTitle>
        {/* <DialogPrimitives.DialogDescription></DialogPrimitives.DialogDescription> */}
        {/* {title} */}
        <div className="dialog-buttons">
          <DialogPrimitives.DialogClose asChild>
            <button
              // onClick={() => setOk(false)}
              aria-label="Close"
              className="button cancel"
            >
              Not so sure
            </button>
          </DialogPrimitives.DialogClose>
          <DialogPrimitives.DialogClose asChild>
            <button onClick={() => setOk(true)} aria-label="Close" className="button action">
              Sure
            </button>
          </DialogPrimitives.DialogClose>
        </div>
        <DialogPrimitives.DialogClose asChild>
          <button className="icon-btn">
            <Icons.Cross2Icon style={{ transform: "scale(1.5)" }} />
          </button>
        </DialogPrimitives.DialogClose>
      </DialogPrimitives.DialogContent>
    </DialogPrimitives.Dialog>
  );
};
