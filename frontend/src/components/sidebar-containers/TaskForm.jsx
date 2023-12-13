import { useState } from "react";
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
import { Link } from "react-router-dom";

export function TaskForm() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;

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

  const handleInputChange = (e, name) => {
    let finalValue;
  
    if (name === "taskStatus" || name === "taskPriority") {
      finalValue = e.value ? e.value : e;
    } else if (
      name === "personInChargeEmail" ||
      name === "supervisorInChargeEmail"
    ) {
      finalValue = [e.target.value];
    } else {
      finalValue = e.target.value;
    }
  
    console.log(`handleInputChange called with name: ${name}, finalValue: ${finalValue}`);
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

    console.log("Form data:", formData);

    const token = localStorage.getItem("jwt");

    try {
      const { taskLocationName, ...formDataWithoutLocationName } = formData;

      const response = await fetch(`${apiUrl}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formDataWithoutLocationName,
          createdAt: formData.createdAt ? formData.createdAt.slice(0, 10) : undefined,
          deadline: formData.deadline ? formData.deadline.slice(0, 10) : undefined,
        }),
      });

      console.log("Server response:", response);

      if (response.ok) {
        console.log("Form data was sent to the server");
        toast.success("Success: Form data was sent to the server!");
      } else {
        console.log("Failed to send form data to the server");
        toast.error("Error: Failed to send form data to the server");
        const errorData = await response.json();
        console.log("Server error data:", errorData);
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
      className="w-1/2 pl-[2rem] pt-5 overflow-y-auto max-h-100vh"
    >
      <Link to={`/`}>
        <Typography>
          <i className="fa-solid fa-arrow-left text-2xl text-[#1d8af0] my-6 mx-[-1rem] hover:bg-[#eeeeee] px-4 py-3 mb-0 mt-[-0.25rem] rounded-full"></i>
        </Typography>
      </Link>
      <Typography variant="h2" color="black">
        Create A New Task
      </Typography>
      <Typography
        variant="lead"
        color="gray"
        className="font-['Helvetica Neue'] text-sm pt-1"
      >
        Create your tasks here. Please use relevant emails.
      </Typography>
      <form
        className="mt-8 mb-2 pr-10 pb-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Input
            name="taskName"
            size="lg"
            label="Task Name"
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
            onChange={(e) => handleInputChange(e, "createdAt")}
          />
          <Input
            type="date"
            name="deadline"
            size="lg"
            label="Deadline"
            onChange={(e) => handleInputChange(e, "deadline")}
          />
          </div>
          <div className="flex flex-row gap-4">
          <Input
            name="personInCharge"
            size="lg"
            label="PIC Name"
            onChange={(e) => handleInputChange(e, "personInCharge")}
          />
          <Input
            name="personInChargeEmail"
            size="lg"
            label="PIC Email"
            onChange={(e) => handleInputChange(e, "personInChargeEmail")}
          />
          </div>
          <div className="flex flex-row gap-4">
          <Input
            name="supervisor"
            size="lg"
            label="Supervisor Name"
            onChange={(e) => handleInputChange(e, "supervisor")}
          />
          <Input
            name="supervisorInChargeEmail"
            label="Supervisor Email"
            size="lg"
            onChange={(e) => handleInputChange(e, "supervisorInChargeEmail")}
          />
          </div>
          <div className="w-full">
            <Textarea
              name="taskDescription"
              label="Task Description"
              onChange={(e) => handleInputChange(e, "taskDescription")}
            />
          </div>
          <div className="flex flex-row gap-4">
          <Select
            name="taskStatus"
            label="Task Status"
            onChange={(e) => handleInputChange(e, "taskStatus")}
            value={formData.taskStatus || "On-Going"}
          >
            <Option value="Finished">Finished</Option>
            <Option value="On-Going">On-Going</Option>
            <Option value="Overdue">Overdue</Option>
            <Option value="Dropped">Dropped</Option>
          </Select>

          <Select
            name="taskPriority"
            label="Task Priority"
            onChange={(e) => handleInputChange(e, "taskPriority")}
            value={formData.taskPriority || "Low"}
          >
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
          </div>
        </div>
        <Button
          className="mt-6 bg-[#1D9BF0] text-sm h-10"
          fullWidth
          type="submit"
          disabled={!areAllFieldsFilled()}
          style={{ textTransform: 'capitalize' }}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}
export default TaskForm;
