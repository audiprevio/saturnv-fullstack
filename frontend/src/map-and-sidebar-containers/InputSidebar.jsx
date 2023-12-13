import {
    Card
  } from "@material-tailwind/react";
import TaskForm from '../components/sidebar-containers/TaskForm';
   
  export function InputSidebar() {
    return (
    <>
      <Card className="border-[1px] h-screen w-full max-w-[25rem] p-4 z-10 rounded-none">
        <div className="mb-2 p-0">
        </div>
        <TaskForm />
      </Card>
    </>
    );
  }

export default InputSidebar