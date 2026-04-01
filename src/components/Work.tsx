import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward, MdPlayCircleOutline, MdClose } from "react-icons/md";

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

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVideoOpen]);

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

          {/* Featured Project Sidebar */}
          <div className="work-sidebar">
            <div className="featured-card">
              <div>
                <span className="featured-badge">Featured Project</span>
              </div>
              <h3>PC Gesture Control</h3>
              <p className="featured-category">Native App</p>
              <p className="featured-description">
                A software-only solution to control your PC mouse using hand gestures via a webcam. Built with Python, OpenCV, and MediaPipe.
              </p>
              <div className="featured-tools">
                <span>Tools & Tech</span>
                <p>Python, OpenCV, MediaPipe</p>
              </div>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="featured-demo-btn"
                data-cursor="disable"
              >
                <MdPlayCircleOutline className="demo-play-icon" />
                View DEMO
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render the modal globally to avoid strict positioning contexts */}
      {mounted && createPortal(
        <div className={`video-modal-overlay ${isVideoOpen ? "open" : ""}`} onClick={() => setIsVideoOpen(false)}>
          <button className="video-modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close modal">
            <MdClose />
          </button>
          <div className={`video-modal-content ${isVideoOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
            <div className="mobile-notch"></div>
            {isVideoOpen && (
              <iframe
                className="demo-video-player"
                src="https://www.instagram.com/reel/DWkUY_Gkg1L/embed"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="autoplay; encrypted-media"
                title="Project Demo Reel"
              ></iframe>
            )}
            <div className="mobile-home-bar"></div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Work;

