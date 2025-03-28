import React, { useState } from "react";

function SlideEditor({ slide, onUpdate }) {
  const [title, setTitle] = useState(slide.title);
  const [content, setContent] = useState(slide.content);

  const handleSave = () => {
    onUpdate({ ...slide, title, content });
  };

  return (
    <div className="p-4 border-t">
      <h2 className="text-lg font-bold mb-2">Edit Slide</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}

function LeftSlider() {
  const [slides, setSlides] = useState([
    { id: 1, title: "Slide 1", content: "This is the content of Slide 1" },
    { id: 2, title: "Slide 2", content: "This is the content of Slide 2" },
    { id: 3, title: "Slide 3", content: "This is the content of Slide 3" },
    { id: 4, title: "Slide 4", content: "This is the content of Slide 4" },
    { id: 5, title: "Slide 5", content: "This is the content of Slide 5" },
  ]);

  const [activeSlide, setActiveSlide] = useState(slides[0]);

  const handleSlideClick = (slide) => {
    setActiveSlide(slide);
  };

  const handleSlideUpdate = (updatedSlide) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) =>
        slide.id === updatedSlide.id ? updatedSlide : slide
      )
    );
    setActiveSlide(updatedSlide);
  };

  return (
    <div className="flex h-screen">
      {/* Left Slider */}
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

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">{activeSlide.title}</h1>
        <p>{activeSlide.content}</p>
        <SlideEditor slide={activeSlide} onUpdate={handleSlideUpdate} />
      </div>
    </div>
  );
}

export default LeftSlider;
