import { Button } from "@material-tailwind/react";

const NewTaskButton = () => {
  return (
    <Button
      className="rounded-lg w-full h-9 my-2 text-small font-medium 
    font-['Helvetica Neue'] relative drop-shadow-none bg-[#1D9BF0] shadow-none text-white flex items-center justify-center"
      style={{ textTransform: "capitalize" }}
    >
      <i className="fa-solid fa-plus pr-2"></i>Create a New Task
    </Button>
  );
};

export default NewTaskButton;
