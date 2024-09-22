import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Slide,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateWebinar = ({ webinarToEdit, setWebinars, closeWebinarToEdit }) => {
  const [open, setOpen] = React.useState(!!webinarToEdit);

  const {
    register,
    handleSubmit,
    control, // Needed for controlled inputs
    formState: { errors },
    reset,
    setValue,
    getValues,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    const newData = { ...data, isFiltered: true };
    if (webinarToEdit) {
      setWebinars((prevState) => {
        return prevState.map((currentWebinar, index) => {
          if (
            index ===
            prevState.findIndex((webinar) => webinar.id === webinarToEdit.id)
          ) {
            return { ...currentWebinar, ...newData };
          }
          return currentWebinar;
        });
      });
    } else {
      setWebinars((prevState) => {
        return [...prevState, newData];
      });
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
    if (webinarToEdit) closeWebinarToEdit();
  };

  useEffect(() => {
    if (webinarToEdit) {
      setValue("instructorName", webinarToEdit.instructorName);
      setValue("instructorRole", webinarToEdit.instructorRole);
      setValue("instructorCompany", webinarToEdit.instructorCompany);
      setValue("instructorImage", webinarToEdit.instructorImage);
      setValue("topics", webinarToEdit.topics);
      setValue("webinarTitle", webinarToEdit.webinarTitle);
      setValue("startDate", webinarToEdit.startDate);
      setValue("startTime", webinarToEdit.startTime);
      setValue("endTime", webinarToEdit.endTime);
    }
  }, [webinarToEdit]);

  return (
    <div>
      {!webinarToEdit ? (
        <Button
          className="bg-[#0E51F1] text-white rounded-xl p-2 px-6 capitalize"
          onClick={handleClickOpen}
        >
          Add Webinar
        </Button>
      ) : null}

      <Dialog
        open={!!webinarToEdit || open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            {`${webinarToEdit ? "Edit" : "Create"} Webinar`}
          </DialogTitle>
          <img
            src="./icons/crossIcon.svg"
            className="px-6 py-4 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="px-2 py-6 flex flex-col gap-8">
            <InstructorDetails
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              clearErrors={clearErrors}
              webinarToEdit={webinarToEdit}
            />
            <WebinarDetails
              register={register}
              control={control}
              errors={errors}
            />
          </DialogContent>
          <Divider />
          <DialogActions className="mr-auto p-4 flex gap-4">
            <Button
              className="bg-[#0E51F1] text-white rounded-xl p-2 px-6 capitalize font-bold"
              type="submit"
            >
              {`${webinarToEdit ? "Edit" : "Create"} Webinar`}
            </Button>
            <Button
              className="rounded-xl p-2 capitalize font-bold"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateWebinar;

// Component to handle instructor details
const InstructorDetails = ({
  register,
  errors,
  setValue,
  clearErrors,
  getValues,
  webinarToEdit,
}) => {
  return (
    <div className="flex items-start gap-8">
      <img src="./icons/usersIcon.svg" alt="users icon" />
      <div className="flex flex-col gap-6 w-full">
        <p className="text-base font-semibold">Instructor Details</p>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-6 w-[50%]">
            <InstructorName register={register} errors={errors} />
            <InstructorRole register={register} errors={errors} />
            <InstructorCompany register={register} errors={errors} />
          </div>
          <div className="flex flex-col gap-6 w-[50%]">
            <InstructorImage
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              clearErrors={clearErrors}
              webinarToEdit={webinarToEdit}
            />
            <Topics register={register} errors={errors} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to handle webinar details
const WebinarDetails = ({ register, control, errors }) => {
  return (
    <div className="flex items-start gap-8">
      <img src="./icons/videoIcon.svg" alt="video icon" />
      <div className="flex flex-col gap-6 w-full">
        <p>Webinar Details</p>
        <div className="flex flex-col gap-6">
          <WebinarTitle register={register} errors={errors} />
          <div className="flex items-center justify-between w-full gap-4">
            <StartDate control={control} errors={errors} />
            <StartTime control={control} errors={errors} />
            <EndTime control={control} errors={errors} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Input components with validation and error handling
const InstructorName = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="instructorName"
        className="required font-semibold text-sm"
      >
        Instructor Name
      </label>
      <input
        type="text"
        {...register("instructorName", {
          required: "Instructor Name is required",
        })}
        placeholder="Type the instructor name"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
      />
      {errors.instructorName && (
        <p className="text-red-600 text-sm">{errors.instructorName.message}</p>
      )}
    </div>
  );
};

const InstructorRole = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="instructorRole"
        className="required font-semibold text-sm"
      >
        Instructor Role
      </label>
      <input
        type="text"
        {...register("instructorRole", {
          required: "Instructor Role is required",
        })}
        placeholder="Type the instructor role"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
      />
      {errors.instructorRole && (
        <p className="text-red-600 text-sm">{errors.instructorRole.message}</p>
      )}
    </div>
  );
};

const InstructorCompany = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="instructorCompany"
        className="required font-semibold text-sm"
      >
        Instructor Company
      </label>
      <input
        type="text"
        {...register("instructorCompany", {
          required: "Instructor Company is required",
        })}
        placeholder="Type the instructor company"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
      />
      {errors.instructorCompany && (
        <p className="text-red-600 text-sm">
          {errors.instructorCompany.message}
        </p>
      )}
    </div>
  );
};

const InstructorImage = ({
  register,
  errors,
  clearErrors,
  setValue,
  getValues,
  webinarToEdit,
}) => {
  const [imagePreview, setImagePreview] = React.useState(null);

  useEffect(() => {
    register("instructorImage", { required: "Instructor Image is required" });

    const currentImage = getValues("instructorImage");

    if (currentImage && typeof currentImage === "string") {
      setImagePreview(currentImage);
    } else if (currentImage instanceof File) {
      const imageUrl = URL.createObjectURL(currentImage);
      setImagePreview(imageUrl);
    }
  }, [getValues, register]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("instructorImage", file);
      clearErrors("instructorImage");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="instructorImage"
        className="required font-semibold text-sm"
      >
        Instructor Image
      </label>
      <input
        type="file"
        accept="image/*"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
        onChange={handleImageChange}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Instructor Preview"
          className="mt-4 w-[135px] h-[135px] rounded-lg object-cover"
        />
      )}
      {errors.instructorImage && (
        <p className="text-red-600 text-sm">{errors.instructorImage.message}</p>
      )}
    </div>
  );
};

const Topics = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="topics" className="required font-semibold text-sm">
        Topics
      </label>
      <input
        type="text"
        {...register("topics", { required: "Topics are required" })}
        placeholder="Enter the topics"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
      />
      {errors.topics && (
        <p className="text-red-600 text-sm">{errors.topics.message}</p>
      )}
    </div>
  );
};

const WebinarTitle = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="webinarTitle" className="required font-semibold text-sm">
        Webinar Title
      </label>
      <input
        type="text"
        {...register("webinarTitle", { required: "Webinar Title is required" })}
        placeholder="Type the webinar title"
        className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
      />
      {errors.webinarTitle && (
        <p className="text-red-600 text-sm">{errors.webinarTitle.message}</p>
      )}
    </div>
  );
};

const StartDate = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-2 w-[33%]">
      <label htmlFor="startDate" className="required font-semibold text-sm">
        Start Date
      </label>
      <Controller
        name="startDate"
        control={control}
        defaultValue={null}
        rules={{ required: "Start Date is required" }}
        render={({ field }) => (
          <DatePicker
            {...field}
            onChange={(value) => field.onChange(value)}
            className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
          />
        )}
      />
      {errors.startDate && (
        <p className="text-red-600 text-sm">{errors.startDate.message}</p>
      )}
    </div>
  );
};

const StartTime = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-2 w-[33%]">
      <label htmlFor="startTime" className="required font-semibold text-sm">
        Start Time
      </label>
      <Controller
        name="startTime"
        control={control}
        defaultValue={null}
        rules={{ required: "Start Time is required" }}
        render={({ field }) => (
          <TimePicker
            {...field}
            onChange={(value) => field.onChange(value)}
            className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
          />
        )}
      />
      {errors.startTime && (
        <p className="text-red-600 text-sm">{errors.startTime.message}</p>
      )}
    </div>
  );
};

const EndTime = ({ control, errors }) => {
  return (
    <div className="flex flex-col gap-2 w-[33%]">
      <label htmlFor="endTime" className="required font-semibold text-sm">
        End Time
      </label>
      <Controller
        name="endTime"
        control={control}
        defaultValue={null}
        rules={{ required: "End Time is required" }}
        render={({ field }) => (
          <TimePicker
            {...field}
            onChange={(value) => field.onChange(value)}
            className="bg-[#E3E7EC] p-2 px-4 rounded-lg outline-none w-full"
          />
        )}
      />
      {errors.endTime && (
        <p className="text-red-600 text-sm">{errors.endTime.message}</p>
      )}
    </div>
  );
};
