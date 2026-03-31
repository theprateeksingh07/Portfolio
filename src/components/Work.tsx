import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Apex Construction",
    category: "Corporate Website",
    tools: "HTML, CSS, JavaScript, React",
    image: "/images/apex_construction.png",
  },
  {
    title: "Apex Digital",
    category: "Agency Portfolio",
    tools: "Next.js, Tailwind CSS, TypeScript",
    image: "/images/apex_digital.png",
  },
  {
    title: "Task Master",
    category: "Productivity App",
    tools: "React Native, Node.js, MongoDB",
    image: "/images/todo_app.png",
  },
  {
    title: "Wanderlust Travels",
    category: "Travel Booking Platform",
    tools: "Angular, Firebase, Google Maps API",
    image: "/images/travel_website.png",
  },
];

const gestureSection = {
  title: "3D Gesture Game",
  subtitle: "Choose Elements:",
  elements: [
    "Nexura Solar System",
    "Environment",
    "Interactable Objects",
    "Gesture Controller",
  ],
};

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const handleGameClick = (element: string) => {
    const slug = element
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    window.open(`${window.location.origin}?game=${slug}`, "_blank");
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-layout">
          <div className="work-main">
            <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage image={project.image} alt={project.title} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
      <aside className="work-sidebar">
        <div className="gesture-card">
          <h3>{gestureSection.title}</h3>
          <p className="gesture-subtitle">{gestureSection.subtitle}</p>
          <div className="gesture-elements">
            {gestureSection.elements.map((element, index) => (
              <button
                type="button"
                className="gesture-element-button"
                key={index}
                onClick={() => handleGameClick(element)}
              >
                <span className="gesture-element-label">Name {index + 1}:</span>
                <span className="gesture-element-value">{element}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>
  );
};

export default Work;

