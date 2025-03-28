import React, { useState, useEffect, useRef } from "react";
import Toolbar from "./Toolbar";
import ThemeSidebar from "./ThemeSidebar";

const MergedSlideEditor = () => {
  const [slides, setSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(null);
  const previousSlideRef = useRef(null); // To track the previous active slidedsfasdf

  // Fetch data from the API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/slides/");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not valid JSON");
        }

        const data = await response.json();
        setSlides(data); // Set the slides state with the fetched data
        setActiveSlide(data[0]); // Set the first slide as active
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  // Auto-save changes when switching slides
  useEffect(() => {
    if (
      previousSlideRef.current &&
      previousSlideRef.current.id !== activeSlide?.id
    ) {
      const previousSlide = previousSlideRef.current;

      // Prepare the payload with the updated slide data
      const updatedData = {
        title: previousSlide.title,
        subtitle: previousSlide.subtitle,
        body: previousSlide.body,
        image: previousSlide.image,
        theme: previousSlide.theme,
      };

      // Send the PATCH request to save the previous slide
      fetch(`http://127.0.0.1:8000/api/slides/${previousSlide.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to auto-save the slide");
          }
          return response.json();
        })
        .then((updatedSlide) => {
          console.log("Slide auto-saved successfully:", updatedSlide);

          // Update the slides state with the updated slide
          setSlides((prevSlides) =>
            prevSlides.map((slide) =>
              slide.id === updatedSlide.id ? updatedSlide : slide
            )
          );
        })
        .catch((error) => {
          console.error("Error auto-saving slide:", error);
        });
    }

    // Update the previousSlideRef to the current activeSlide
    previousSlideRef.current = activeSlide;
  }, [activeSlide]);

  const handleSlideClick = (slide) => {
    setActiveSlide(slide);
  };

  const handleTextChange = (field, value) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) =>
        slide.id === activeSlide.id ? { ...slide, [field]: value } : slide
      )
    );
    setActiveSlide((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file); // Append the image file to FormData

      // Send the PATCH request with FormData
      fetch(`http://127.0.0.1:8000/api/slides/${activeSlide.id}/`, {
        method: "PATCH",
        body: formData, // Use FormData as the request body
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update the slide image");
          }
          return response.json();
        })
        .then((updatedSlide) => {
          console.log("Image updated successfully:", updatedSlide);

          // Update the slides state with the updated slide
          setSlides((prevSlides) =>
            prevSlides.map((slide) =>
              slide.id === updatedSlide.id ? updatedSlide : slide
            )
          );
          setActiveSlide(updatedSlide);
        })
        .catch((error) => {
          console.error("Error updating image:", error);
        });
    }
  };

  const handleThemeChange = (property, value) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) =>
        slide.id === activeSlide.id
          ? {
              ...slide,
              theme: {
                ...slide.theme,
                [property]:
                  property === "fontSizes"
                    ? { ...slide.theme.fontSizes, ...value }
                    : value,
              },
            }
          : slide
      )
    );
    setActiveSlide((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        [property]:
          property === "fontSizes"
            ? { ...prev.theme.fontSizes, ...value }
            : value,
      },
    }));
  };

  // const handleAddSlide = async () => {
  //   setLoading(true);  // Show loading when adding a new slide

  //   const newSlide = {
  //     title: "New Slide",
  //     subtitle: "Subtitle",
  //     body: "Body content here...",
  //     image: "",
  //     theme: {
  //       backgroundColor: "#ffffff",
  //       textColor: "#000000",
  //       fontSizes: {
  //         title: "32px",
  //         subtitle: "24px",
  //         body: "18px",
  //       },
  //     },
  //   };

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/api/slides/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(newSlide),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add slide");
  //     }

  //     const addedSlide = await response.json();
  //     setSlides((prevSlides) => [...prevSlides, addedSlide]);
  //     setActiveSlide(addedSlide);
  //   } catch (error) {
  //     console.error("Error adding slide:", error);
  //   } finally {
  //     setLoading(false);  // Hide loading after slide is added
  //   }
  // };

  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  // if (!activeSlide) {
  //   return <div>Loading...</div>;
  // }

  if (!activeSlide) {
    return <div>LOADING......</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-lg font-bold p-4">Slides</h2>
        <ul>
          {slides.map((slide) => (
            <li
              key={slide.id}
              className={`p-4 cursor-pointer ${
                activeSlide.id === slide.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => handleSlideClick(slide)}
            >
              {slide.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Slide Editor */}
      <div className="flex-1 flex flex-col">
        <Toolbar activeSlide={activeSlide} setSlides={setSlides} />
        <div className="flex flex-1">
          <div className="flex-1 p-8">
            <div
              className="w-full h-[600px] rounded-lg shadow-lg p-8"
              style={{
                backgroundColor: activeSlide.theme.backgroundColor, // Apply background color
              }}
            >
              <div
                contentEditable
                className="mb-4"
                style={{
                  color: activeSlide.theme.textColor,
                  fontSize: activeSlide.theme.fontSizes.title, // Apply title font size
                }}
                onBlur={(e) => handleTextChange("title", e.target.textContent)}
                suppressContentEditableWarning
              >
                {activeSlide.title}
              </div>

              <div
                contentEditable
                className="mb-8"
                style={{
                  color: activeSlide.theme.textColor,
                  fontSize: activeSlide.theme.fontSizes.subtitle, // Apply subtitle font size
                }}
                onBlur={(e) =>
                  handleTextChange("subtitle", e.target.textContent)
                }
                suppressContentEditableWarning
              >
                {activeSlide.subtitle}
              </div>

              {activeSlide.image && (
                <img
                  src={activeSlide.image}
                  alt="Slide"
                  className="max-w-md mb-8"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />

              <div
                contentEditable
                className="text-lg"
                style={{
                  color: activeSlide.theme.textColor,
                  fontSize: activeSlide.theme.fontSizes.body, // Apply body font size
                }}
                onBlur={(e) => handleTextChange("body", e.target.textContent)}
                suppressContentEditableWarning
              >
                {activeSlide.body}
              </div>
            </div>
          </div>
          <ThemeSidebar
            theme={activeSlide.theme}
            onThemeChange={handleThemeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MergedSlideEditor;
