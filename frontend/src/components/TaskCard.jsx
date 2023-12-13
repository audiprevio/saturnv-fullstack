import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { MapCenterContext } from "../contexts/MapCenterContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TaskCard = ({ task, fetchTasks }) => {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const { setMapCenter } = useContext(MapCenterContext);

  const handleSeeLocationClick = () => {
    setMapCenter({ lat: task.taskLocation.lat, lng: task.taskLocation.lng });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt");

      const response = await fetch(`${apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleDeleteClick = async () => {
    try {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${apiUrl}/tasks/softdelete/${task._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Success: Task was soft-deleted!");
        console.log("Task was soft-deleted successfully");
        fetchTasks();
      } else {
        toast.error("Error: Failed to soft-delete task!");
        console.error("Failed to soft-delete the task");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const isOverdue = new Date() > new Date(task.deadline);

  return (
    <Card className="w-full mr-[1rem] mt-[1rem] border-[1px] pb-0 shadow-none hover:bg-[#f4f4f4] transition-all duration-500 ease-in-out">
      <CardBody className="flex flex-row justify-between pl-5 pt-[2rem] w-full">
        <div className="flex flex-col">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-[0.1rem] font-['Helvetica Neue'] w-[100%]"
          >
            {task.taskName}
          </Typography>
          <Typography className=" text-md font-normal font-['Helvetica Neue'] relative text-neutral-900  mt-[0.75rem]">
            {task.taskDescription}
          </Typography>
          <div className="flex flex-col items-start justify-between w-full opacity-70">
            <Tooltip
              content="Task Deadline"
              placement="right"
              className="bg-opacity-60 text-xs antialiased rounded-md"
            >
              <Typography
                className={`text-sm font-normal font-['Helvetica Neue'] mt-[0.75rem] ${
                  isOverdue ? "text-red-500" : ""
                }`}
              >
                <i className="fa-solid fa-calendar-day pr-2 pt-2" />
                {new Date(task.deadline).toLocaleDateString()}
              </Typography>
            </Tooltip>
            <Tooltip
              content="Person In Charge"
              placement="right"
              className="bg-opacity-60 text-xs antialiased rounded-md"
            >
              <Typography className="text-sm font-normal font-['Helvetica Neue'] mt-[0.75rem] mb-0 pb-0">
                <Typography className="text-sm font-normal font-['Helvetica Neue'] mb-0 pb-0">
                  <i className=" fa-solid fa-user pr-2"></i>
                  {task.personInCharge}
                </Typography>
              </Typography>
            </Tooltip>
          </div>
        </div>
        <>
          <Tooltip
            content="Delete This Task"
            placement="bottom"
            className="bg-opacity-60 text-xs antialiased rounded-md"
          >
            <IconButton
              className="text-red-300 h-10 w-10 mt-0 pb-7 px-3 bg-transparent border-red-100 text-xs items-center text-center"
              variant="outlined"
              onClick={handleDeleteClick}
            >
              <i className="fa-solid fa-trash"></i>
            </IconButton>
          </Tooltip>
        </>
      </CardBody>
      <hr className="mb-4" />
      <CardFooter className="pt-0">
        <div className="flex flex-row justify-between pb-0">
          <Button
            onClick={handleSeeLocationClick}
            className="bg-[#1D9BF0] rounded-lg w-[10.5rem] h-9 text-sm font-medium px-1
      font-['Helvetica Neue'] relative drop-shadow-none text-lowercase text-white flex items-center justify-center"
            style={{ textTransform: "capitalize" }}
          >
            <i className="fa-solid fa-location-dot pr-2"></i>See Location
          </Button>

          {!isOverdue || user?.role === "admin" ? (
            <Link to={`/edit-task/${task._id}`}>
              <Button
                className="rounded-lg w-[10.5rem] h-9 text-sm font-medium px-1
    font-['Helvetica Neue'] relative drop-shadow-none bg-[#0F141A] shadow-none flex items-center justify-center"
                style={{ textTransform: "capitalize" }}
              >
                <i className="fa-solid fa-pen pr-2"></i>Manage Task
              </Button>
            </Link>
          ) : (
              <Button
                disabled
                className="rounded-lg w-[10.5rem] h-9 text-sm font-medium px-1
  font-['Helvetica Neue'] cursor-pointer relative drop-shadow-none bg-[#e5e5e5] shadow-none text-gray-500 flex items-center justify-center"
                style={{ textTransform: "capitalize" }}
              >
                Overdue, contact admin
              </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
