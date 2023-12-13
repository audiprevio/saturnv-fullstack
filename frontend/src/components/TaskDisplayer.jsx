import { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";
import TaskCard from "./TaskCard";

export function TaskDisplayer() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const token = localStorage.getItem("jwt");

  const data = [
    {
      label: "On-going",
      value: "On-Going",
      desc: `Tasks that are currently in progress.`,
    },
    {
      label: "Finished",
      value: "Finished",
      desc: `Tasks that have been completed.`,
    },
    {
      label: "Overdue",
      value: "Overdue",
      desc: `Tasks that have passed their deadline.`,
    },
    {
      label: "Dropped",
      value: "Dropped",
      desc: `Tasks that have been dropped.`,
    },
  ];

  const [activeTab, setActiveTab] = useState("On-Going");

  const fetchTasks = async () => {
    const response = await fetch(`${apiUrl}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const fetchedTasks = await response.json();
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [apiUrl, token]);

  const filterTasks = (status) => {
    return tasks.filter(
      (task) => task.taskStatus === status && !task.isDeleted
    );
  };

  return (
    <Tabs value={activeTab} className="overflow-y-auto">
    <TabsHeader>
        {data.map(({ label, value }) => (
        <Tab 
            key={value} 
            value={value} 
            className={value === activeTab ? "text-[#1D9BF0]" : "text-gray-400"}
            onClick={() => setActiveTab(value)}
        >
            <div className="flex items-center gap-2 font-medium">
            {label}
            </div>
        </Tab>
        ))}
    </TabsHeader>
    <TabsBody>
        {isLoading ? (
          <Spinner color="blue" />
        ) : (
          data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="text-sm font-normal text-gray-500">
                {desc}
                {filterTasks(value).map((task, index) => (
                <TaskCard key={index} task={task} fetchTasks={fetchTasks}/>
                ))}
            </TabPanel>
          ))
        )}
    </TabsBody>
    </Tabs>
  );
}
