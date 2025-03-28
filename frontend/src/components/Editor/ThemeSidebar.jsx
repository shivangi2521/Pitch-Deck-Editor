const ThemeSidebar = ({ theme = {}, onThemeChange }) => {
  const handleThemeChange = (property, value) => {
    onThemeChange(property, value);
  };

  const handleFontSizeChange = (element, value) => {
    onThemeChange("fontSizes", { [element]: value + "rem" });
  };

  const {
    backgroundColor = "#ffffff",
    textColor = "#000000",
    fontSizes = {},
  } = theme;
  const { title = "2", subtitle = "1.5", body = "1" } = fontSizes;

  return (
    <div className="w-64 bg-gray-100 p-4 border-l border-gray-200">
      <h2 className="text-xl font-bold mb-4">Theme Settings</h2>

      {/* Background Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleThemeChange("backgroundColor", e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      {/* Text Color */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Text Color</label>
        <input
          type="color"
          value={textColor}
          onChange={(e) => handleThemeChange("textColor", e.target.value)}
          className="w-full h-10 rounded cursor-pointer"
        />
      </div>

      {/* Font Sizes */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Font Sizes</h3>

        <div className="space-y-3">
          {/* Title Font Size */}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={parseFloat(title)}
              onChange={(e) => handleFontSizeChange("title", e.target.value)}
              className="w-full"
            />
            <span className="text-sm">{title}</span>
          </div>

          {/* Subtitle Font Size */}
          <div>
            <label className="block text-sm mb-1">Subtitle</label>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={parseFloat(subtitle)}
              onChange={(e) => handleFontSizeChange("subtitle", e.target.value)}
              className="w-full"
            />
            <span className="text-sm">{subtitle}</span>
          </div>

          {/* Body Font Size */}
          <div>
            <label className="block text-sm mb-1">Body</label>
            <input
              type="range"
              min="0.8"
              max="2"
              step="0.1"
              value={parseFloat(body)}
              onChange={(e) => handleFontSizeChange("body", e.target.value)}
              className="w-full"
            />
            <span className="text-sm">{body}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSidebar;
