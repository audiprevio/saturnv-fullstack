import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import TaskCard from "../TaskCard";
import { Link } from "react-router-dom";
import NewTaskButton from "../NewTaskButton";
import { TaskDisplayer } from "../TaskDisplayer";
import icon from "../../assets/icon.svg";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export function TaskSidebar({ setMapCenter }) {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");


    navigate("/login");
  };

  return (
    <>
      <Card
        color="transparent"
        className="w-[45rem] px-5 pt-5 overflow-y-auto max-h-89.5vh"
      >
        <div className="flex flex-row items-center justify-between flex-end w-full">
          <img className="w-20" src={icon} />
          <div>
            <Typography className="font-normal text-xs">
              Version 0.0.1 Alpha
            </Typography>
          </div>
        </div>
        <hr className="my-4 w-full justify-center flex" />
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-4">
            <Avatar
              src={
                user?.role === "admin"
                  ? "https://docs.material-tailwind.com/img/face-3.jpg"
                  : "https://docs.material-tailwind.com/img/face-2.jpg"
              }
              alt="avatar"
              size="md"
            />
            <div>
              <Typography variant="h4" className="text-black">
                {user?.firstName} {user?.lastName}
                {user?.role === "admin" ? (
                  <Tooltip
                    content="This user is an admin"
                    placement="right"
                    className="bg-opacity-60 text-xs antialiased rounded-md "
                  >
                    <i className="fa-solid fa-circle-check text-blue-600 pl-2"></i>
                  </Tooltip>
                ) : (
                  <Tooltip
                    content="This user is a staff"
                    placement="right"
                    className="bg-opacity-60 text-xs antialiased rounded-md "
                  >
                    <i className="fa-solid fa-circle-check text-gray-500 pl-2"></i>
                  </Tooltip>
                )}
              </Typography>
              <Typography color="gray" className="font-normal text-xs">
                {user?.jobTitle}
              </Typography>
            </div>
          </div>
          <Tooltip
            content="Log Out"
            placement="bottom"
            className="bg-opacity-60 text-xs antialiased rounded-md "
          >
            <IconButton
              className="text-gray-600 ml-8 h-10 mt-0 pb-5 px-3 bg-transparent border-gray-200 text-xs items-center text-center"
              variant="outlined"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-power-off"></i>
            </IconButton>
          </Tooltip>
        </div>
        <Link to={`/add-task`} className="w-full justify-center flex">
          <NewTaskButton />
        </Link>
        <hr className="my-4 w-full justify-center flex" />
        <TaskDisplayer />
      </Card>
    </>
  );
}

export default TaskSidebar;
