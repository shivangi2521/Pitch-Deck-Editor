import { useSlideContext } from "../../context/SlideContext";
import Toolbar from "./Toolbar";
import ThemeSidebar from "./ThemeSidebar";

const SlideEditor = () => {
  const { state, dispatch } = useSlideContext();
  const { slide } = state;

  const handleTextChange = (field, value) => {
    dispatch({
      type: "UPDATE_TEXT",
      payload: { field, value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: "UPDATE_IMAGE",
          payload: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1">
        <div className="flex-1 p-8">
          <div
            className="w-full h-[600px] rounded-lg shadow-lg p-8"
            style={{ backgroundColor: slide.theme.backgroundColor }}
          >
            <div
              contentEditable
              className="text-5xl font-bold mb-4"
              style={{ color: slide.theme.textColor }}
              onBlur={(e) => handleTextChange("title", e.target.textContent)}
              suppressContentEditableWarning
            >
              {slide.title}
            </div>

            <div
              contentEditable
              className="text-3xl mb-8"
              style={{ color: slide.theme.textColor }}
              onBlur={(e) => handleTextChange("subtitle", e.target.textContent)}
              suppressContentEditableWarning
            >
              {slide.subtitle}
            </div>

            {slide.image && (
              <img src={slide.image} alt="Slide" className="max-w-md mb-8" />
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
              style={{ color: slide.theme.textColor }}
              onBlur={(e) => handleTextChange("body", e.target.textContent)}
              suppressContentEditableWarning
            >
              {slide.body}
            </div>
          </div>
        </div>
        <ThemeSidebar />
      </div>
    </div>
  );
};

export default SlideEditor;
