import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Alertdialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Add to favourite</DialogTrigger>
      <DialogContent className="w-fit rounded-3xl">
        <DialogHeader>
          <DialogTitle>Post added</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Alertdialog;
