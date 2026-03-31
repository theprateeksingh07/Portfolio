import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Founder and CEO</h4>
                <h5>Apex Digital</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Leading Apex Digital, driving digital innovation and building scalable solutions for modern businesses.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BTech CSE Student</h4>
                <h5>University</h5>
              </div>
              <h3>Present</h3>
            </div>
            <p>
              Pursuing a Bachelor of Technology in Computer Science and Engineering, focusing on real-world digital systems and scalable application architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
