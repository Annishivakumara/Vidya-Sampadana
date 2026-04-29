import React from 'react';
import { ArrowRight, BookOpen, Pencil, Plus, Share2, UserRoundPlus } from 'lucide-react';

const coreTeamMembers = [
  {
    name: 'Aditi Sharma',
    role: 'Founder',
    description:
      'Former educator with a passion for building scalable digital learning ecosystems for rural youth.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbHAAEC7Ro6_XnS87gGlSnLZuI2ztaJjtF0UE2rwTMjaRMY2v7TOWDm1aYo3Dq03F6075Vh2UBk7X4MVcgfsYF833xmXtuZybUHGq2Aj3-rAcHCq9N6uuO8JSKckMjNuCp4UZ7SlwsV3PJUSXXLxQuQ9ASkgbiB9MT0efmJ-nsQcJgVdAqUAdVSmwPZQ6G-D6n9q_fHf42Q1vH26q6UZYuT4tNO0L1yyuFnTl5pHeyWEgixMVRMApiRdyd80VdtzMOj_Jw92uKKKc',
  },
  {
    name: 'Vikram Rao',
    role: 'Co-Founder',
    description:
      'Tech architect specializing in open-source educational software and community infrastructures.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3xwPguOqHMUwe6CaXTzBipWl8KxU8PegDMTKRs1oGkHsXCWD66fFp6DgyundaY6NiDSnkIRUcmN6FIpmMZH_Ss6Yx_5J0BCn3gPM956RYSs9n1LE0JBAZpg8E99xGOBrctY8DwdXMnTX5JfJlsKDG7F8K5fagWxuzkXfOUm0wCPmY7ZtXY5Y7-CmYvpXmjxaN1RhJxPyaBgvyx0ov6-4y49dT3SX7tpW3A_Cza26H6oKFJz3vnfWrwToZ5zICjXtROhZWxPUcmG4',
  },
  {
    name: 'Priya Iyer',
    role: 'Operations',
    description:
      'Ensuring seamless delivery of content across 50+ regional nodes and volunteer networks.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgRkB8nS_Lnt4uR6rWjIKBYg18XeVXmvV7rOjqHQwe_U4pUJPJU_HivaWrCm_-u4k7NKuLJfkcU3eHQsF8ilAl_xhGUnkUP9jzqVj9FIS16QNbFx59uAH8wywoe2yJa2cu-Yt0ORrGq2RqRm6nLD1vDO4iyYzxocrwzmfnV3okimACZdCyozWhrhdfr922oCzlEyY05kKSAeMSYaGnJGFwlKlAi95UZAB5TaB8kZwjjQIzCcMcTLpbEAP2TpNiPJ-4ZQyMHBK-m6Y',
  },
  {
    name: 'Siddharth M.',
    role: 'Creative',
    description:
      'Crafting visual languages that make complex knowledge accessible and engaging for all learners.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3H8CTMCYTspmaylFdBPnxLNwTyLiuJMR1ihbbi32hDiQjukWZatO3S-X3RoalJZGr-xdbpQuileXinLYfIgtKQnmg_LpXBGlzQ4xB2gY-M6sund2MuqIIEcISkyGMQiVqmjYQZuYNAZyWuw9w3UG_hXSXRut0o68Vun4rRW6Pv6EImteWV9zAE9QuiYUmNGQ6Qg0e-QP477RXJ7S6S0SEXGwI7Vp9cpU03mhsU6mDHCS2EieIyYn_KI-SpzaVvPOtNzh21s8mQT8',
  },
];

const volunteers = [
  {
    name: 'Elena Gilbert',
    area: 'Content',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHcjmz_aAOHTUYKe4O3XCshsAj58fSAHwmRFZRbttcYu3EST6-qcXKWpew0TEiGl85kq2QqriKGs78eSQP2TUBIQla5CZPP_fv0egpCGzHNNffmSOBHJqW3I96bQRyWWDAqIGR-KYK2RY9zze1pAmyvtQJINf8QOlJItC2iyjlcRVyGVl8KeEaFmIEzXOS9BMuZFZw1X9zO6SXUsfOHF9z9r-fAhm3Le49jOs-U6b2Sqj7d3LZe9dtFvTR3rFSHdRbcnzYkUDsrt8',
  },
  {
    name: 'Marcus Chen',
    area: 'Tech',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7LFQ-Ye88L-Foz8vzMrDdXCKq8HdbU3WCpqqvDjwhasuXysFlP1QvKHC6YVnh-jagQQ-GhOeVI2_84YHtjvLMTz5ozsXbXT83u_uLzhySw94GO7vUqMO_Z4FJ_vGIBWHihpH3n7wZLK0jzIDG-EolMjmr0t7yWBTcdx3WPCNbF1ZoS33wBDu88ZpXKhKoWfWuSWc-XxZZTdFbGu996AoM_S0ZPoMfM6SVxDT1u9RBpJNLP-KYfz7YL_rSgsFehvAI8tHdu6Q5wOc',
  },
  {
    name: 'Sarah Jenks',
    area: 'Design',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBGwOrQMpt76_JB_boghTqb1tLDP4WatB6aUlmh69ZQIxezqU764NihiaKfU1WMTJGWb88Z22-lsNPR8rkIP0l8JXSnp6NzsUR_rPLMpCMyG1N996b1HwUzajJzdssAInFMAAmlSBfiSqRerY9RmwccnUpkv9_lM_Ejr1y74yUM_MfhPx__A0j4L0Vnoi3trGI3OEQz6DWNT3jh2nD-ECIq-7r9MN_5HzHxS4uWNkd4wKnaOU6s6mmKazMKag_1_aOcGEllDmlvDBQ',
  },
  {
    name: 'Karthik S.',
    area: 'Tech',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6xGl5rTrKhNWS5N9tPx-aSIpf5sZsz_AigaUHo_smsH5UfYWQ1aHJ0Rdn15D8WvNXCnz20SDfGALlYP6N8lnKX1-r4qMiB3NVgyG23kCs4W1yX9E19eTG-2HyrtvLJBkQxAowJc5ouJJmREWW_Yi936qQu03cDpgw8mjj0YPnc-BXoS7d9YnEa9bgFyPeODBzV1lEyff80V5C30z7iysOKmt1IxBhQvQpfXv3ZHDHZiMl9KA-NB3Je_t5_Wp0FF-hu-bYDIJtRGw',
  },
  {
    name: 'Aisha Khan',
    area: 'Content',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDycFrqA2rQQ-ERcjshJKI1_pHKas7JbJJucTdxyZfk3zSy8hSk315fMzuywXScnTYxLlFtw51aY3apa44vVF95DX2HuW9g44qvQ5nOOEB3BU_Ja25pZ5pw9g5qHDzdOIa6KzU_AWEDHIEOGfwUrpRZDhuqig3-GEFaNgcJY14iemp6gYemBxIYbsisM7gPny-Q_CogtVIS7JkeZBhYR8FBNXe9oYeQS5XZnCnr7ZB2xdY33IY5VmXpnsvBAFaaVucq-wJs_Y1IJ1M',
  },
  {
    name: 'Liam Vance',
    area: 'Ops',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBOQynOC_QjNTtKTkW3xJqumgpoc_KOUTLyrGzyvinN8L0nYjxpS3QCwrm0LMsbmfRnkSA6j8Ozc1FzPPvEFzt2P5MBiXPtervEVYU9qfwaYOzqm16yu1Ge6fbK5v6e9mg22iZ9E22I26FfDjbcvK2r9WEeNkTsCrttqwZ5zPP-HhdLpxrefyJd4pRwiHQFZoka41q0i-TpwGdroGlaBqvgdB6aPExvGQ7J50iyyjFay0e66Hr36-gAi18yVDxlT9_8h9AL2VBbnII',
  },
  {
    name: 'Mei Lin',
    area: 'Design',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDBqfWDi4rcKy7eyV0WiODhMrz5nmla11P-kxhcgNcrvC11jXvIbOabIZNSfTuJIc2_wTVi02R5fylc9d-deV4EpFy8qBc41bcz6NonHvPW9ZT9MnA3wcX6AxWuaEXrQtguX9JnZPI-g_rKSDcv14enpnRrhUhXeLWzITjy3rA5_NiIOn9OocRu5KluakSXYHO_1aMY8p-K9s776VpJFjWz8DI3Xzh9ePJM_DLm0ooYnAqaztV-kAVZZe5xTpMQW3Cr_sL_gUIt9DA',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#f6f2fb] text-[#1c1b21]">
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24">
        <section className="mb-20">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#574eb1] mb-4 block">
            About Our Mission - Stitch Version
          </span>
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-tight max-w-3xl">
              The Minds Behind <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#574eb1] to-[#7067cc]">
                Knowledge Curation.
              </span>
            </h1>
            <p className="text-[#474552] max-w-sm pb-2 border-l-2 border-[#e5e1ea] pl-6">
              Our team is dedicated to democratizing educational resources through rigorous curation and
              community-driven knowledge sharing.
            </p>
          </div>
        </section>

        <section className="mb-32">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 gap-5">
            <div>
              <h2 className="text-3xl font-display font-bold">Core Team</h2>
              <p className="text-[#474552] mt-1">The visionary leaders steering Vidya Sampadana.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#574eb1] to-[#7067cc] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeamMembers.map((member) => (
              <article
                key={member.name}
                className="group relative bg-white rounded-xl p-8 shadow-[0px_20px_40px_rgba(87,78,177,0.05)] hover:shadow-[0px_20px_40px_rgba(87,78,177,0.12)] transition-all duration-300"
              >
                <button
                  type="button"
                  className="absolute top-4 right-4 text-[#787583] hover:text-[#574eb1] transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-[#c5c0ff] scale-110" />
                    <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover" />
                  </div>
                  <h3 className="text-xl font-display font-bold">{member.name}</h3>
                  <span className="mt-2 mb-4 px-3 py-1 bg-[#574eb1] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {member.role}
                  </span>
                  <p className="text-[#474552] text-sm mb-6 leading-relaxed">{member.description}</p>
                  <a href="#!" className="text-[#787583] hover:text-[#574eb1] transition-colors">
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f0ecf5] rounded-[2rem] p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
              <h2 className="text-3xl font-display font-bold">Our Volunteers</h2>
              <p className="text-[#474552] mt-1">The heartbeat of our collective intelligence gallery.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-[#00685e] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              <UserRoundPlus className="w-4 h-4" />
              Add Volunteer
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {volunteers.map((volunteer) => (
              <article
                key={volunteer.name}
                className="group relative bg-white p-4 rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <img src={volunteer.image} alt={volunteer.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex flex-col overflow-hidden">
                  <span className="font-bold text-sm truncate">{volunteer.name}</span>
                  <span className="text-[9px] font-bold text-[#008377] uppercase tracking-wider">{volunteer.area}</span>
                </div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-[#e5e1ea] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              </article>
            ))}

            <button
              type="button"
              className="bg-[#f6f2fb] p-4 rounded-xl flex items-center justify-center gap-2 border-2 border-dashed border-[#c8c4d4] hover:border-[#574eb1] transition-colors cursor-pointer group"
            >
              <span className="text-sm font-bold text-[#787583] group-hover:text-[#574eb1] tracking-wide">
                View 120+ Others
              </span>
              <ArrowRight className="w-4 h-4 text-[#787583] group-hover:text-[#574eb1]" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#f0ecf5] mt-20">
        <div className="w-full px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#574eb1]" />
              <span className="font-display font-bold text-[#574eb1] text-xl">Vidya Sampadana</span>
            </div>
            <p className="text-sm text-[#474552] mt-2">
              &copy; {new Date().getFullYear()} Vidya Sampadana. Curating Knowledge for All.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#!" className="text-sm text-[#787583] hover:text-[#574eb1] transition-opacity underline-offset-4 hover:underline">
              Philosophy
            </a>
            <a href="#!" className="text-sm text-[#787583] hover:text-[#574eb1] transition-opacity underline-offset-4 hover:underline">
              Volunteers
            </a>
            <a href="#!" className="text-sm text-[#787583] hover:text-[#574eb1] transition-opacity underline-offset-4 hover:underline">
              Terms
            </a>
            <a href="#!" className="text-sm text-[#787583] hover:text-[#574eb1] transition-opacity underline-offset-4 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
