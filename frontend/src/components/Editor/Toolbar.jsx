const Toolbar = ({ activeSlide, setSlides, setActiveSlide }) => {
  const handleSavebtn = () => {
    if (!activeSlide) {
      console.log("No active slide to save.");
      return;
    }

    const updatedData = {
      title: activeSlide.title,
      subtitle: activeSlide.subtitle,
      body: activeSlide.body,
      // image: activeSlide.image,
      theme: activeSlide.theme,
    };

    fetch(`http://127.0.0.1:8000/api/slides/${activeSlide.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the slide");
        }
        return response.json();
      })
      .then((updatedSlide) => {
        console.log("Slide updated successfully:", updatedSlide);

        setSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === updatedSlide.id ? updatedSlide : slide
          )
        );
      })
      .catch((error) => {
        console.error("Error updating slide:", error);
      });
  };

  const handleDeleteSlide = () => {
    if (!activeSlide) {
      console.log("No active slide to delete.");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/slides/${activeSlide.id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the slide");
        }
        console.log("Slide deleted successfully");

        setSlides((prevSlides) =>
          prevSlides.filter((slide) => slide.id !== activeSlide.id)
        );

        setActiveSlide((prevSlides) => {
          const remainingSlides = prevSlides.filter(
            (slide) => slide.id !== activeSlide.id
          );
          return remainingSlides.length > 0 ? remainingSlides[0] : null;
        });
      })
      .catch((error) => {
        console.error("Error deleting slide:", error);
      });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(), // Temporary unique ID for the new slide
      title: "New Slide",
      subtitle: "",
      body: "",
      image: null,
      theme: {
        backgroundColor: "#ffffff",
        textColor: "#000000",
        fontSizes: {
          title: "24px",
          subtitle: "18px",
          body: "14px",
        },
      },
    };

    // Add the new slide to the slides state
    setSlides((prevSlides) => [...prevSlides, newSlide]);

    // Set the new slide as the active slide
    setActiveSlide(newSlide);

    // Send the new slide to the backend
    fetch(`http://127.0.0.1:8000/api/slides/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSlide),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add the new slide");
        }
        return response.json();
      })
      .then((createdSlide) => {
        console.log("New slide added successfully:", createdSlide);

        // Update the slide ID with the one returned from the backend
        setSlides((prevSlides) =>
          prevSlides.map((slide) =>
            slide.id === newSlide.id ? createdSlide : slide
          )
        );
        setActiveSlide(createdSlide);
      })
      .catch((error) => {
        console.error("Error adding new slide:", error);
      });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        {/* Save Button */}
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSavebtn}
        >
          Save
        </button>

        {/* Delete Button */}
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleDeleteSlide}
        >
          Delete
        </button>

        {/* Add Slide Button */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleAddSlide}
        >
          Add Slide
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
