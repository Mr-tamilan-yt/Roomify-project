import { useLocation } from "react-router";

type LocationState = {
  initialImage?: string;
  name?: string;
};

const VisualizerId = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const { initialImage, name } = state || {};

  return (
    <section>
      <h1>{name || "Untitled Project"}</h1>

      <div className="visualizer">
        {initialImage && (
          <div className="image-container">
            <h2>Source Image</h2>
            <img src={initialImage} alt="source" />
          </div>
        )}
      </div>
    </section>
  );
};

export default VisualizerId;