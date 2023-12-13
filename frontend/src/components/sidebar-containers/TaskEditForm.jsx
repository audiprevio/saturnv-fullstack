import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Select,
  Option,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function TaskEditForm() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const { _id } = useParams();

  const [formData, setFormData] = useState({
    taskName: "",
    personInCharge: "",
    personInChargeEmail: "",
    supervisor: "",
    supervisorInChargeEmail: "",
    createdAt: new Date().toISOString(),
    deadline: new Date().toISOString(),
    taskLocation: null,
    taskLocationName: "",
    taskDescription: "",
    taskStatus: "On-Going",
    taskPriority: "Low",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    fetch(`${apiUrl}/tasks/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Convert 'createdAt' and 'deadline' to Date objects
        data.createdAt = new Date(data.createdAt).toISOString();
        data.deadline = new Date(data.deadline).toISOString();

        // Update the formData state with the task data
        setFormData(data);
      });
  }, [_id]);

  const handleInputChange = (e, name) => {
    let finalValue;
  
    if (name === "taskStatus" || name === "taskPriority") {
      console.log(e); // Log the event object
      finalValue = e.value;
    } else if (
      name === "personInChargeEmail" ||
      name === "supervisorInChargeEmail"
    ) {
      finalValue = [e.target.value]; // Wrap the email address in an array
    } else {
      finalValue = e.target.value;
    }
  
    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };
  

  const handleLocationChange = (value) => {
    // Create a new PlacesService object
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    // Request details for the selected place
    service.getDetails({ placeId: value.value.place_id }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Get the latitude and longitude of the place
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Update the formData state with the latitude and longitude
        setFormData({
          ...formData,
          taskLocation: { lat, lng },
          taskLocationName: place.name,
        });
      }
    });
  };

  const handleSubmit = async (event) => {
    console.log("handleSubmit was called");
    event.preventDefault();

    try {
      const token = localStorage.getItem("jwt");
      const { _id, taskLocationName, ...formDataWithoutIdAndDates } = formData; 
      const response = await fetch(`${apiUrl}/tasks/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formDataWithoutIdAndDates,
          createdAt: formData.createdAt.slice(0, 10),
          deadline: formData.deadline.slice(0, 10),
        }),
      });

      console.log(formData);

      if (response.ok) {
        console.log("Form data was sent to the server");
        toast.success("Success: Form data was sent to the server!");
      } else {
        console.log("Failed to send form data to the server");
        toast.error("Error: Failed to send form data to the server");
        const errorData = await response.json(); 
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  const areAllFieldsFilled = () => {
    for (let key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        return false;
      }
    }
    return true;
  };

  return (
    <Card
      color="transparent"
      className="w-1/2 pl-[2rem] pt-5 overflow-y-auto max-h-[100vh]"
    >
      <Link to={`/`}>
        <Typography>
          <i className="fa-solid fa-arrow-left text-2xl text-[#1d8af0] my-6 mx-[-1rem] hover:bg-[#eeeeee] px-4 py-3 mb-0 mt-[-0.25rem] rounded-full"></i>
        </Typography>
      </Link>
      <Typography variant="h2" color="black">
        Manage Task Form
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="font-['Helvetica Neue'] text-sm pt-1"
      >
        See or edit your task here
      </Typography>
      <form className="mt-8 mb-2 pr-10 pb-10" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Input
            name="taskName"
            size="lg"
            label="Task Name"
            value={formData.taskName}
            onChange={(e) => handleInputChange(e, "taskName")}
          />
          <GooglePlacesAutocomplete
            selectProps={{
              getOptionValue: (option) => option.value.place_id,
              value: formData.taskLocation
                ? formData.taskLocation.place_id
                : null,
              onChange: handleLocationChange,
            }}
          />
                    <div className="flex flex-row gap-4">
          <Input
            type="date"
            name="createdAt"
            size="lg"
            label="Start Date"
            value={formData.createdAt ? formData.createdAt.slice(0, 10) : ""}
            onChange={(e) => handleInputChange(e, "createdAt")}
          />
          <Input
            type="date"
            name="deadline"
            label="Deadline"
            size="lg"
            value={formData.deadline ? formData.deadline.slice(0, 10) : ""}
            onChange={(e) => handleInputChange(e, "deadline")}
          />
          </div>
          <div className="flex flex-row gap-4">
          <Input
            name="personInCharge"
            size="lg"
            label="Person In Charge Name"
            value={formData.personInCharge}
            onChange={(e) => handleInputChange(e, "personInCharge")}
          />
          <Input
            name="personInChargeEmail"
            size="lg"
            label="Person In Charge Email"
            value={formData.personInChargeEmail}
            onChange={(e) => handleInputChange(e, "personInChargeEmail")}
          />
          </div>
          <div className="flex flex-row gap-4">
          <Input
            name="supervisor"
            size="lg"
            label="Supervisor Name"
            value={formData.supervisor}
            onChange={(e) => handleInputChange(e, "supervisor")}
          />
          <Input
            name="supervisorInChargeEmail"
            size="lg"
            label="Supervisor In Charge Email"
            value={formData.supervisorInChargeEmail}
            onChange={(e) => handleInputChange(e, "supervisorInChargeEmail")}
          />
          </div>
          <div className="w-full">
            <Textarea
              name="taskDescription"
              label="Task Description"
              value={formData.taskDescription}
              onChange={(e) => handleInputChange(e, "taskDescription")}
            />
          </div>
          <div className="flex flex-row gap-4">
          <Select
            name="taskStatus"
            label="Task Status"
            value={formData.taskStatus}
            onChange={(e) => handleInputChange(e, "taskStatus")}
          >
            <Option value="Finished">Finished</Option>
            <Option value="On-Going">On-Going</Option>
            <Option value="Overdue">Overdue</Option>
            <Option value="Dropped">Dropped</Option>
          </Select>

          <Select
            name="taskPriority"
            label="Task Priority"
            value={formData.taskPriority}
            onChange={(e) => handleInputChange(e, "taskPriority")}
          >
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
          </div>
        </div>
        <Button
          className="mt-6 bg-[#1D9BF0] text-base"
          fullWidth
          type="Submit"
          disabled={!areAllFieldsFilled()}
          style={{ textTransform: 'capitalize' }}
        >
          Submit Edit
        </Button>
      </form>
    </Card>
  );
}
export default TaskEditForm;
