import Card from "./Card";
import { useState } from "react";
import CreateWebinar from "./CreateWebinar";

const Cards = ({ webinars, setWebinars }) => {
  const [editingWebinar, setEditingWebinar] = useState(null);

  if (!webinars.length) return <p>No webinars to show.</p>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {webinars.map((webinar, index) => (
          <Card
            key={index}
            webinar={webinar}
            index={index}
            setWebinars={setWebinars}
            setEditingWebinar={() => setEditingWebinar(webinar)} // Pass edit state handler
          />
        ))}
      </div>

      {/* Render the CreateWebinar component in edit mode if editing */}
      {editingWebinar && (
        <CreateWebinar
          webinarToEdit={editingWebinar}
          setWebinars={setWebinars}
          closeWebinarToEdit={() => setEditingWebinar(null)}
        />
      )}
    </div>
  );
};

export default Cards;
