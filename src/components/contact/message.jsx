import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { usePlay } from "../../hooks/usePlay";

export const Message = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  // Anim refs
  const headingRef = usePlay().ref;
  const paragraphRef = usePlay().ref;
  const socialsRef = usePlay().ref;
  const nameRef = usePlay().ref;
  const emailRef = usePlay().ref;
  const messageRef = usePlay().ref;
  const submitRef = usePlay().ref;
  const buttonsRef = usePlay().ref;

  const setField = (name, value) =>
    setForm((f) => ({ ...f, [name]: value }));
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validate = (f) => {
    const er = {};
    if (!f.name.trim()) er.name = "Please enter a name.";
    if (!f.email.trim()) er.email = "Please enter an email.";
    else if (!isEmail(f.email.trim()))
      er.email = "Enter a valid email address.";
    if (!f.message.trim()) er.message = "Please enter a message.";
    return er;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setField(name, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (name === "name")
        next.name = value.trim() ? "" : "Please enter a name.";
      if (name === "email")
        next.email = value.trim() ? "" : "Please enter an email.";
      if (name === "message")
        next.message = value.trim() ? "" : "Please enter a message.";
      return next;
    });
    setGeneralError("");
  };

  const handleEmailKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const val = e.currentTarget.value.trim();
    if (!val) {
      setErrors((er) => ({ ...er, email: "Please enter an email." }));
      return;
    }
    setErrors((er) => ({
      ...er,
      email: isEmail(val) ? "" : "Enter a valid email address.",
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const er = validate(form);
    setErrors(er);
    if (Object.values(er).some(Boolean)) {
      setGeneralError("Please correct the highlighted fields.");
      return;
    }

    setSubmitting(true);
    setGeneralError("");
    try {
      const res = await fetch("http://localhost:8080/send.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          website: "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok)
        throw new Error(data?.error || `HTTP ${res.status}`);

      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setGeneralError(
        "Message sent successfully. We’ll get back to you shortly."
      );
    } catch (err) {
      console.error(err);
      setGeneralError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Now clickable
  const contactButtons = [
    {
      icon: (
        <FaMapMarkerAlt className="text-black hover:text-white text-2xl" />
      ),
      text: "Infopark Rd, Kakkanad, Kerala",
      href: "https://www.google.com/maps/place/Kusumagiri+Mental+Health+Centre/@10.0176192,76.356102,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080c9aaaaaaaab:0xe3e71c1596b96ca4!8m2!3d10.0176139!4d76.3586769!16s%2Fg%2F1tgckq_2?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: <FaEnvelope className="text-black hover:text-white text-2xl" />,
      text: "jessymathewhr@gmail.com",
      href: "mailto:jessymathewhr@gmail.com",
    },
    {
      icon: <FaPhone className="text-black hover:text-white text-2xl" />,
      text: "+968 9770 8198",
      href: "tel:+96897708198",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#32348d] px-4 sm:px-6 md:px-8 lg:px-10 flex items-start justify-center pt-16 sm:pt-10 md:pt-12">
      <div className="w-full max-w-5xl py-8 sm:py-12">
        <div className="grid grid-cols-1 gap-10 place-items-center">
          {/* Left content */}
          <div className="relative z-10 w-full max-w-xl text-center lg:text-left">
            <h2
              ref={headingRef}
              className="text-white text-4xl sm:text-5xl md:text-[72px] font-normal font-teko slide-in-left slide-delay-1 mt-6 sm:mt-3 leading-[1.05]"
            >
              WRITE US ANY MESSAGE
            </h2>
            <p
              ref={paragraphRef}
              className="mt-3 text-white/95 text-sm sm:text-base font-light font-teko leading-6 slide-in-left slide-delay-2"
            >
              If there are any queries, kindly take a moment to fill up this
              form. Our representatives will contact you shortly.
            </p>

            <div
              aria-live="polite"
              className={[
                "mt-3 min-h-[1.25rem] text-sm font-medium",
                generalError
                  ? generalError.startsWith("Message sent")
                    ? "text-emerald-300"
                    : "text-rose-300"
                  : "text-transparent",
              ].join(" ")}
            >
              {generalError || "•"}
            </div>

            <div
              ref={socialsRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4 slide-in-left slide-delay-3"
            >
              <a href="#" aria-label="Instagram" className="p-1 -m-1">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-white hover:text-[#00acec] transition-colors duration-200 text-2xl"
                />
              </a>
              <a href="#" aria-label="YouTube" className="p-1 -m-1">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-white hover:text-[#00acec] transition-colors duration-200 text-2xl"
                />
              </a>
              <a href="https://www.linkedin.com/in/jessy-mathew-55318b99" aria-label="LinkedIn" className="p-1 -m-1">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-white hover:text-[#00acec] transition-colors duration-200 text-2xl"
                />
              </a>
              <a href="#" aria-label="Facebook" className="p-1 -m-1">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-white hover:text-[#00acec] transition-colors duration-200 text-2xl"
                />
              </a>
            </div>
          </div>

          {/* Right form */}
          <div className="relative z-10 w-full max-w-xl">
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div ref={nameRef} className="slide-in-right slide-delay-1">
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    type="text"
                    placeholder="Your name"
                    required
                    aria-invalid={Boolean(errors.name) || undefined}
                    aria-errormessage={errors.name ? "err-name" : undefined}
                    className={[
                      "w-full rounded-md bg-white text-black placeholder-black/70 focus:border-[#00acec] focus:ring-2 focus:ring-[#00acec]/40 px-3 py-2.5 text-sm outline-none transition",
                      errors.name
                        ? "border border-rose-400 ring-rose-200"
                        : "border border-transparent",
                    ].join(" ")}
                  />
                  <p
                    id="err-name"
                    className={[
                      "mt-1 text-xs",
                      errors.name ? "text-rose-300" : "text-transparent",
                    ].join(" ")}
                    aria-live="polite"
                  >
                    {errors.name || "placeholder"}
                  </p>
                </div>

                {/* Email */}
                <div ref={emailRef} className="slide-in-right slide-delay-1">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    onKeyDown={handleEmailKeyDown}
                    type="email"
                    placeholder="you@example.com"
                    required
                    aria-invalid={Boolean(errors.email) || undefined}
                    aria-errormessage={errors.email ? "err-email" : undefined}
                    className={[
                      "w-full rounded-md bg-white text-black placeholder-black/70 focus:border-[#00acec] focus:ring-2 focus:ring-[#00acec]/40 px-3 py-2.5 text-sm outline-none transition",
                      errors.email
                        ? "border border-rose-400 ring-rose-200"
                        : "border border-transparent",
                    ].join(" ")}
                  />
                  <p
                    id="err-email"
                    className={[
                      "mt-1 text-xs",
                      errors.email ? "text-rose-300" : "text-transparent",
                    ].join(" ")}
                    aria-live="polite"
                  >
                    {errors.email || "placeholder"}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div ref={messageRef} className="slide-in-right slide-delay-2">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Type your message here..."
                  required
                  aria-invalid={Boolean(errors.message) || undefined}
                  aria-errormessage={errors.message ? "err-message" : undefined}
                  className={[
                    "w-full rounded-md bg-white text-black placeholder-black/70 focus:border-[#00acec] focus:ring-2 focus:ring-[#00acec]/40 px-3 py-2.5 text-sm outline-none transition resize-y",
                    errors.message
                      ? "border border-rose-400 ring-rose-200"
                      : "border border-transparent",
                  ].join(" ")}
                />
                <p
                  id="err-message"
                  className={[
                    "mt-1 text-xs",
                    errors.message ? "text-rose-300" : "text-transparent",
                  ].join(" ")}
                  aria-live="polite"
                >
                  {errors.message || "placeholder"}
                </p>
              </div>

              <input
                type="text"
                name="website"
                defaultValue=""
                readOnly
                tabIndex={-1}
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {/* Submit */}
              <div ref={submitRef} className="slide-in-right slide-delay-3">
                <div className="group relative rounded-xl overflow-hidden w-full sm:w-56 mx-auto shadow-md transition hover:shadow-lg">
                  <span className="pointer-events-none absolute inset-0 [clip-path:polygon(60%_100%,100%_30%,100%_100%)] bg-black/15 translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-600 ease-out" />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center rounded-md bg-[#00acec] text-black hover:text-white px-3 py-3 text-sm font-teko disabled:opacity-60"
                    aria-busy={submitting || undefined}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Contact buttons */}
        <div
          ref={buttonsRef}
          className="w-full flex flex-wrap justify-center gap-4 sm:gap-6 px-1 sm:px-4 mt-8 slide-in-right slide-delay-5"
        >
          {contactButtons.map((btn, idx) => (
            <div
              key={idx}
              className="group relative rounded-xl overflow-hidden w-full sm:w-auto sm:min-w-[220px] max-w-[320px] shadow-md transition hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <a
                href={btn.href}
                target={btn.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  btn.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="bg-[#00acec] rounded-xl flex flex-col items-center gap-2 sm:gap-3 px-4 py-4 sm:py-6 w-full text-black hover:text-white text-sm font-teko text-center"
              >
                {btn.icon}
                <span className="px-1">{btn.text}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
