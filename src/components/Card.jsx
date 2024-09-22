import Image from "next/image";

const Card = ({ webinar, index, setWebinars, setEditingWebinar }) => {
  const {
    instructorName,
    instructorRole,
    instructorCompany,
    instructorImage,
    topics,
    webinarTitle,
    startDate,
    startTime,
    endTime,
    isFiltered,
  } = webinar;

  if (!isFiltered) return null;

  return (
    <div className="flex flex-col gap-4 p-4 border-[1px] border-solid border-[#E3E7EC] rounded-lg">
      <MainData
        instructorName={instructorName}
        instructorRole={instructorRole}
        instructorCompany={instructorCompany}
        instructorImage={instructorImage}
      />
      <SubData
        topics={topics}
        webinarTitle={webinarTitle}
        startDate={startDate}
        startTime={startTime}
        endTime={endTime}
      />
      <Buttons
        index={index}
        setWebinars={setWebinars}
        setEditingWebinar={setEditingWebinar}
      />
    </div>
  );
};

export default Card;

const MainData = ({
  instructorName,
  instructorRole,
  instructorCompany,
  instructorImage,
}) => {
  return (
    <div className="rounded-lg bg-[#741DE3] px-4 py-6 flex items-center justify-between text-white">
      <div>
        <p className="text-lg font-semibold">{instructorName}</p>
        <p className="text-sm font-semibold">{instructorRole}</p>
        <p className="text-sm font-semibold">{instructorCompany}</p>
      </div>
      <Image
        src={
          instructorImage
            ? URL.createObjectURL(instructorImage)
            : "/images/defaultInstructor.png"
        }
        alt="user image"
        width={76}
        height={76}
        className="rounded-md"
      />
    </div>
  );
};

const SubData = ({ topics, webinarTitle, startDate, startTime, endTime }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold">{topics}</p>
      <p className="text-lg font-semibold">{webinarTitle}</p>
      <p className="text-sm font-normal">
        {formatDate(startDate)} • {formatTime(startTime)} -{" "}
        {formatTime(endTime)}
      </p>
    </div>
  );
};

const Buttons = ({ index, setWebinars, setEditingWebinar }) => {
  return (
    <div className="flex items-center justify-between gap-2 w-fit mt-4">
      <DeleteButton index={index} setWebinars={setWebinars} />
      <EditButton setEditingWebinar={setEditingWebinar} />
    </div>
  );
};

const DeleteButton = ({ index, setWebinars }) => {
  return (
    <button
      className="bg-[#F9E8E8] text-[#D14040] px-4 py-2 rounded-full"
      onClick={() =>
        setWebinars((prevState) => {
          return prevState.filter((_, currentIndex) => currentIndex !== index);
        })
      }
    >
      Delete
    </button>
  );
};

const EditButton = ({ setEditingWebinar }) => {
  return (
    <button
      className="text-[#0E51F1] px-4 py-2 rounded-full"
      onClick={setEditingWebinar}
    >
      Edit
    </button>
  );
};
