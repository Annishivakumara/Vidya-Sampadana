import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import "./About.css";

const institutionalPillars = [
  {
    code: "01",
    title: "Student-Centered Records",
    desc: "Structured academic directories that help educators and coordinators track student enrollment, department placement, and contact information accurately.",
  },
  {
    code: "02",
    title: "Volunteer Mentorship",
    desc: "Coordinated volunteer network spanning technical, academic content, outreach, and student guidance domains.",
  },
  {
    code: "03",
    title: "Competitive Exam Readiness",
    desc: "Dedicated service modules supporting KCET and NEET exam updates and student preparation workflows.",
  },
  {
    code: "04",
    title: "Role-Based Governance",
    desc: "Clear separation of responsibilities across Student, Volunteer, and Administrator accounts through centralized identity management.",
  },
];

const VOLUNTEER_DOMAINS = [
  "ALL",
  "TECH",
  "CONTENT",
  "OUTREACH",
  "MENTORING",
  "OPERATIONS",
];

const About = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === "/about";

  const [teamMembers, setTeamMembers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [loadingDirectory, setLoadingDirectory] = useState(true);
  const [directoryAvailable, setDirectoryAvailable] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAboutDirectory = async () => {
      setLoadingDirectory(true);
      try {
        const [teamRes, volRes] = await Promise.allSettled([
          api.get("/about/team/public"),
          api.get("/about/volunteers/public"),
        ]);

        if (!isMounted) return;

        let anySuccess = false;

        if (
          teamRes.status === "fulfilled" &&
          Array.isArray(teamRes.value?.data)
        ) {
          setTeamMembers(teamRes.value.data);
          anySuccess = true;
        }

        if (
          volRes.status === "fulfilled" &&
          Array.isArray(volRes.value?.data)
        ) {
          setVolunteers(volRes.value.data);
          anySuccess = true;
        }

        setDirectoryAvailable(anySuccess);
      } catch {
        if (isMounted) {
          setDirectoryAvailable(false);
        }
      } finally {
        if (isMounted) {
          setLoadingDirectory(false);
        }
      }
    };

    fetchAboutDirectory();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredVolunteers =
    selectedDomain === "ALL"
      ? volunteers
      : volunteers.filter(
          (v) =>
            String(v.domain || "").toUpperCase() === selectedDomain.toUpperCase()
        );

  const getInitials = (name) => {
    if (!name) return "VS";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");
  };

  return (
    <section
      className={`about section ${
        isStandalonePage ? "about--standalone" : ""
      }`}
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container">
        {/* Top Mission & Governance Split */}
        <div className="about__inner">
          {/* Left — Institutional Overview Card */}
          <div className="about__visual">
            <div className="about__overview-card">
              <div className="about__overview-header">
                <span className="about__overview-label">
                  Vidya Sampadana Foundation
                </span>
                <span className="about__overview-badge">
                  Institutional Charter
                </span>
              </div>

              <h3 className="about__overview-title">
                Bridging students, educators, and volunteer mentors through
                structured digital infrastructure.
              </h3>

              <p className="about__overview-desc">
                Vidya Sampadana is built on a modular microservice foundation
                connecting student administration, identity management,
                competitive exam updates, and volunteer coordination into one
                cohesive academic portal.
              </p>

              <div className="about__architecture-list">
                <div className="about__arch-item">
                  <span className="about__arch-dot" aria-hidden="true" />
                  <div>
                    <strong>Student &amp; User Services</strong>
                    <span>
                      Academic profile management and multi-role registration
                    </span>
                  </div>
                </div>
                <div className="about__arch-item">
                  <span className="about__arch-dot" aria-hidden="true" />
                  <div>
                    <strong>About &amp; Volunteer Service</strong>
                    <span>
                      Core leadership directory and domain-based volunteer teams
                    </span>
                  </div>
                </div>
                <div className="about__arch-item">
                  <span className="about__arch-dot" aria-hidden="true" />
                  <div>
                    <strong>KCET &amp; NEET Updates</strong>
                    <span>
                      Dedicated examination tracking and guidance services
                    </span>
                  </div>
                </div>
              </div>

              <div className="about__overview-actions">
                <Link to="/students" className="about__action-link">
                  <span>Explore Student Directory</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right — Editorial Narrative & 4 Pillars */}
          <div className="about__content">
            <div className="badge">
              <span className="badge-dot" aria-hidden="true" />
              About the Platform
            </div>

            <h2 id="about-heading" className="about__title">
              Built for transparent, reliable{" "}
              <span>educational administration</span>
            </h2>

            <p className="about__text">
              Vidya Sampadana is a comprehensive education management platform
              developed to bridge the gap between students, educators, and
              volunteers. Our mission is to simplify administrative workflows so
              mentors and coordinators can focus on what matters most — student
              growth and academic achievement.
            </p>

            <p className="about__text">
              From student registration and record maintenance to volunteer
              domain coordination, every module is designed with clarity,
              accountability, and role-based security in mind.
            </p>

            {/* Institutional Pillars Grid */}
            <div className="about__pillars">
              {institutionalPillars.map((pillar) => (
                <div className="about__pillar-card" key={pillar.code}>
                  <span className="about__pillar-code">{pillar.code}</span>
                  <h3 className="about__pillar-title">{pillar.title}</h3>
                  <p className="about__pillar-desc">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Core Team & Volunteer Directory (powered by about-us-service when available) */}
        {(isStandalonePage ||
          teamMembers.length > 0 ||
          volunteers.length > 0) && (
          <div className="about__directory" aria-label="Organization Directory">
            <div className="about__directory-header">
              <div>
                <div className="badge">
                  <span className="badge-dot" aria-hidden="true" />
                  People &amp; Governance
                </div>
                <h3 className="about__directory-title">
                  Core Team &amp; Active Volunteers
                </h3>
              </div>
              <p className="about__directory-sub">
                Public directory synchronized with the Vidya Sampadana{" "}
                <code>about-us-service</code>.
              </p>
            </div>

            {loadingDirectory ? (
              <div
                className="about__directory-state"
                role="status"
                aria-live="polite"
              >
                <span className="about__spinner" aria-hidden="true" />
                <span>Loading organization directory...</span>
              </div>
            ) : !directoryAvailable &&
              teamMembers.length === 0 &&
              volunteers.length === 0 ? (
              <div className="about__directory-notice">
                <div className="about__notice-block">
                  <h4>Core Leadership &amp; Volunteer Network</h4>
                  <p>
                    Our core team and volunteer mentors operate across Technical
                    Development, Academic Content, Outreach, Mentoring, and
                    Operations domains. Live directory records appear here
                    automatically when connected to the{" "}
                    <code>about-us-service</code> on port 8080.
                  </p>
                </div>
              </div>
            ) : (
              <div className="about__directory-sections">
                {/* Core Team Members */}
                <div className="about__group">
                  <div className="about__group-head">
                    <h4>Core Leadership Team</h4>
                    <span className="about__count-badge">
                      {teamMembers.length}{" "}
                      {teamMembers.length === 1 ? "Member" : "Members"}
                    </span>
                  </div>

                  {teamMembers.length === 0 ? (
                    <p className="about__empty-text">
                      No active core team profiles are currently published.
                    </p>
                  ) : (
                    <div className="about__member-grid">
                      {teamMembers.map((member) => (
                        <article
                          className="about__member-card"
                          key={member.id || member.name}
                        >
                          <div className="about__member-avatar">
                            {member.photoUrl || member.imageUrl ? (
                              <img
                                src={member.photoUrl || member.imageUrl}
                                alt={member.name}
                              />
                            ) : (
                              <span>{getInitials(member.name)}</span>
                            )}
                          </div>
                          <div className="about__member-info">
                            <h5>{member.name}</h5>
                            {member.role || member.designation ? (
                              <span className="about__member-role">
                                {member.role || member.designation}
                              </span>
                            ) : null}
                            {member.bio || member.description ? (
                              <p>{member.bio || member.description}</p>
                            ) : null}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {/* Active Volunteers */}
                <div className="about__group">
                  <div className="about__group-head about__group-head--wrap">
                    <div>
                      <h4>Active Volunteers</h4>
                      <span className="about__count-badge">
                        {filteredVolunteers.length}{" "}
                        {filteredVolunteers.length === 1
                          ? "Volunteer"
                          : "Volunteers"}
                      </span>
                    </div>

                    {volunteers.length > 0 && (
                      <div
                        className="about__domain-filters"
                        role="group"
                        aria-label="Filter volunteers by domain"
                      >
                        {VOLUNTEER_DOMAINS.map((domain) => (
                          <button
                            key={domain}
                            type="button"
                            className={`about__domain-btn ${
                              selectedDomain === domain ? "active" : ""
                            }`}
                            onClick={() => setSelectedDomain(domain)}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {filteredVolunteers.length === 0 ? (
                    <p className="about__empty-text">
                      No active volunteer profiles found for the selected
                      domain.
                    </p>
                  ) : (
                    <div className="about__member-grid">
                      {filteredVolunteers.map((vol) => (
                        <article
                          className="about__member-card"
                          key={vol.id || vol.name}
                        >
                          <div className="about__member-avatar about__member-avatar--volunteer">
                            <span>{getInitials(vol.name)}</span>
                          </div>
                          <div className="about__member-info">
                            <h5>{vol.name}</h5>
                            {vol.domain && (
                              <span className="about__member-role">
                                {vol.domain}
                              </span>
                            )}
                            {vol.role && <p>{vol.role}</p>}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
