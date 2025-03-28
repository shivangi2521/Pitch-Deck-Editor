import { useSlideContext } from "../../context/SlideContext";
import Button from "../common/Button";

const SlidePreview = ({ onClose }) => {
  const { state } = useSlideContext();
  const { slide } = state;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Preview</h2>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>

        <div
          className="w-full aspect-[16/9] rounded-lg shadow-lg p-8"
          style={{ backgroundColor: slide.theme.backgroundColor }}
        >
          <h1
            className="font-bold mb-4"
            style={{
              color: slide.theme.textColor,
              fontSize: slide.theme.fontSizes.title,
            }}
          >
            {slide.title}
          </h1>

          <h2
            className="mb-8"
            style={{
              color: slide.theme.textColor,
              fontSize: slide.theme.fontSizes.subtitle,
            }}
          >
            {slide.subtitle}
          </h2>

          {slide.image && (
            <img
              src={slide.image}
              alt="Slide"
              className="max-w-md mb-8 mx-auto"
            />
          )}

          <p
            style={{
              color: slide.theme.textColor,
              fontSize: slide.theme.fontSizes.body,
            }}
          >
            {slide.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlidePreview;
