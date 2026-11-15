document.addEventListener("DOMContentLoaded", () => {
  // 1. Footer Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const menuBtn = document.getElementById("menu-btn");
  const primaryNav = document.getElementById("primary-nav");

  if (menuBtn && primaryNav) {
    menuBtn.addEventListener("click", () => {
      const expanded = primaryNav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(expanded));
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 3. Book Manuscripts & Sample Excerpts Shelf
  const books = [
    {
      status: "Manuscript in Progress • ~65,000 Words",
      chapter: "Chapter I — The Ferry From Catbalogan",
      title: "Before the Monsoon Crosses Samar",
      synopsis:
        "Between an island barangay in Daram and a crowded boarding house in Sampaloc, a young student-writer pieces together his grandfather’s lost notebooks before the rainy season cuts the ferry route.",
      folio: "Folio 01 of 03 • 2 min read",
      paragraphs: [
        "Every crossing from Catbalogan to Daram began the same way: with the smell of diesel, salt spray, and damp newsprint folded twice inside a shirt pocket. Before I ever knew what a manuscript was, I knew how to keep paper dry against the sea wind.",
        "My grandfather kept his ledger beneath a tin of biscuits on the highest shelf of the kitchen. In the margins beside tide charts and boat repairs, he wrote down the names of neighbors who had left for Manila and the dates they promised to return.",
        "Years later, sitting under a flickering fluorescent bulb in Intramuros with a red editing pen in hand, I realized I was still doing the exact same thing—recording who we were before the tide could wash the ink away."
      ]
    },
    {
      status: "Draft Complete • 14 Essays",
      chapter: "Sanaysay III — Sulat-Kamay at Alaala",
      title: "Mga Bakas sa Puti ng Papel",
      synopsis:
        "Fourteen reflective essays exploring Filipino identity, the revival of Baybayin script, and how public libraries and campus newspapers keep local memory alive.",
      folio: "Folio 02 of 03 • 2 min read",
      paragraphs: [
        "Hindi lamang palamuti sa pabalat ng libro ang sinaunang baybayin; isa itong paalala na bago pa man dumating ang banyagang pluma, may sarili nang tinig at talas ang ating mga ninuno.",
        "Sa bawat kurba ng titik sa puting papel, may kasaysayang pilit binubura ng paglimot—at may kabataang muling nag-aaral bumasa upang hindi maputol ang kuwento ng bayan.",
        "To write in two languages is to stand on a bridge: one foot rooted in the soil of home, the other reaching out so the rest of the world cannot pretend it did not hear us."
      ]
    },
    {
      status: "Chapter Sample • ~48,000 Words",
      chapter: "Introduction — Notes From the Front Row",
      title: "The Chalkboard Republic",
      synopsis:
        "Drawn from student government halls, debate floors, and disaster-response briefings, this book examines how young Filipinos turn campus journalism and civic action into lasting reform.",
      folio: "Folio 03 of 03 • 2 min read",
      paragraphs: [
        "Democracy rarely announces itself with a brass band. More often, it begins in a humid classroom after dismissal, with four student editors arguing over whether a headline is brave enough to print.",
        "From Manila High School’s pressroom to regional youth assemblies, I watched students draft resolutions with the same urgency that emergency responders bring to an incoming typhoon.",
        "This book is a field record of those rooms—and a reminder that young people are never merely preparing for leadership; they are already practicing it."
      ]
    }
  ];

  const shelfTabs = Array.from(document.querySelectorAll(".spine-card"));
  const readingDesk = document.getElementById("reading-desk");
  const progressBar = document.getElementById("desk-progress-bar");
  const deskStatus = document.getElementById("desk-status");
  const deskChapter = document.getElementById("desk-chapter");
  const deskTitle = document.getElementById("desk-title");
  const deskSynopsis = document.getElementById("desk-synopsis");
  const deskProse = document.getElementById("desk-prose");
  const deskFolio = document.getElementById("desk-folio");

  function selectBook(idx) {
    const book = books[idx];
    if (!book) return;

    shelfTabs.forEach((t, i) => {
      const selected = i === idx;
      t.classList.toggle("is-active", selected);
      t.setAttribute("aria-selected", String(selected));
    });

    if (readingDesk && shelfTabs[idx]) {
      readingDesk.setAttribute("aria-labelledby", shelfTabs[idx].id);
    }

    if (progressBar) {
      progressBar.style.width = `${((idx + 1) / books.length) * 100}%`;
    }

    deskStatus.textContent = book.status;
    deskChapter.textContent = book.chapter;
    deskTitle.textContent = book.title;
    deskSynopsis.textContent = book.synopsis;
    if (deskFolio) deskFolio.textContent = book.folio;

    deskProse.style.opacity = "0.25";
    window.setTimeout(() => {
      deskProse.innerHTML = book.paragraphs.map((p) => `<p>${p}</p>`).join("");
      deskProse.style.opacity = "1";
    }, 110);
  }

  shelfTabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => selectBook(idx));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (idx + 1) % shelfTabs.length;
        shelfTabs[next].focus();
        selectBook(next);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (idx - 1 + shelfTabs.length) % shelfTabs.length;
        shelfTabs[prev].focus();
        selectBook(prev);
      }
    });
  });

  // Reading Desk Theme (Paper vs. Night Ink) & Font Controls
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const textSmallerBtn = document.getElementById("text-smaller");
  const textLargerBtn = document.getElementById("text-larger");
  let proseSize = 1.16;

  if (themeToggleBtn && readingDesk) {
    themeToggleBtn.addEventListener("click", () => {
      const isNight = readingDesk.classList.toggle("night-mode");
      readingDesk.classList.toggle("paper-mode", !isNight);
      themeToggleBtn.setAttribute("aria-pressed", String(isNight));
      themeToggleBtn.textContent = isNight ? "Warm Paper" : "Night Ink";
    });
  }

  if (textSmallerBtn && textLargerBtn && deskProse) {
    textSmallerBtn.addEventListener("click", () => {
      proseSize = Math.max(1.0, Number((proseSize - 0.08).toFixed(2)));
      deskProse.style.fontSize = `${proseSize}rem`;
    });

    textLargerBtn.addEventListener("click", () => {
      proseSize = Math.min(1.48, Number((proseSize + 0.08).toFixed(2)));
      deskProse.style.fontSize = `${proseSize}rem`;
    });
  }

  // 4. Filterable Experience Cards
  const filterBtns = document.querySelectorAll(".filter-btn");
  const expCards = document.querySelectorAll(".exp-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      expCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  // 5. Full Credential Modal with Focus Restoration
  const records = [
    {
      kicker: "Editorial & Campus Journalism",
      title: "MHS Newsette & EARIST CED-SG",
      sub: "Newsroom Leadership, Captioning & Press Conferences",
      items: [
        "Senior English News Editor (2019) — MHS Newsette, Official English Publication of Manila High School (Since 1951).",
        "Head of Captioning Committee (2022–2023) & Representative — EARIST College of Education Student Government (CED-SG).",
        "Division Schools Press Conference (DSPC) News Writing Category A representative (Daram & Jiabong, Samar).",
        "Completed LAYAG III Student Journalism seminar featuring ABS-CBN Chief of Reporters Jeff Canoy (SLSU The Wheel, Nov 2023).",
        "1st Year Representative & Head of Research Committee — EARIST Science Club (2021)."
      ]
    },
    {
      kicker: "Heritage & Baybayin Literacy",
      title: "Pilak Baybayin Familia & National Library",
      sub: "Pre-Colonial Script Advocacy & Local Public History",
      items: [
        "Vice Editorial Staff & Guest Lecturer — Pilak Baybayin Familia (PBF), teaching ancient Baybayin writing.",
        "Participant at Pambansang Aklatan ng Pilipinas (National Library) forum: 'Aklatan at Pamana ng Bayan: Talakayan sa Gampanin ng Aklatan at Pagbuo ng Kasaysayang Lokal at Pangmadla' (Nov 2022).",
        "Participant in 'Liberation Talks: Dreams of Cake and Ice Cream — Coping with Hunger in World War II' (Filipinas Heritage Library, Ayala Foundation & Manila Bulletin)."
      ]
    },
    {
      kicker: "Honors, Essays & Literary Craft",
      title: "OCEJ Award, Sanaysay & Storytelling",
      sub: "Recognitions in Writing, Oratory & Leadership",
      items: [
        "Outstanding Campus English Journalist Award (OCEJ Award) — MHS Newsette.",
        "Mila Tan Leadership Award — Gold Medal awarded by the City Mayor’s Office.",
        "2nd Place Winner — Pagsulat ng Sanaysay, awarded by EARIST KaDiPan.",
        "3rd Place Silver Medalist — English Storytelling (Category B, English Month Celebration, Nov 2020).",
        "1st Place Gold Medal — UN Month Poster Making Contest; Gold & Silver Medalist — Boy Scouts of the Philippines (BSP) Jamboree, Daram Samar.",
        "Online Guest Speaker — Plumang Bahaghari (2019); Alumnus of 12th Philippine International Literary Festival (PILF) & Sha Nacino's book-writing workshop."
      ]
    },
    {
      kicker: "Youth Diplomacy & Civic Service",
      title: "UPF Asia Pacific, YWCA & MapaKalamidad.PH",
      sub: "International Delegations, Debate & Emergency Response",
      items: [
        "Philippine Youth Delegate & Representative — UPF Asia Pacific International Leadership Conferences, Indonesia Leadership Summit 2022, and Think Tank 2022 Track II Diplomacy Forums (with 1,000+ international delegates).",
        "Disaster Risk Reduction Youth Ambassador — MapaKalamidad.PH (2022) & Emergency Responder under Manila DRRMO (MHS Batang Emergency Response Team).",
        "Inter-School Debate Representative — La Salle Debate Society (2020–2021) & Bronze Medalist in Division of City Schools Manila Social Studies Debate.",
        "Vice President — YWCA Y-Associates (MHS), YWCA Youth Board Representative (2021), and Manila Youth Leader at YWCA International Summit."
      ]
    }
  ];

  const modal = document.getElementById("record-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalKicker = document.getElementById("modal-kicker");
  const modalHeading = document.getElementById("modal-heading");
  const modalSub = document.getElementById("modal-sub");
  const modalContent = document.getElementById("modal-content");
  let lastTriggerBtn = null;

  document.querySelectorAll(".detail-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = records[Number(btn.getAttribute("data-detail"))];
      if (!item || !modal) return;

      lastTriggerBtn = btn;
      modalKicker.textContent = item.kicker;
      modalHeading.textContent = item.title;
      modalSub.textContent = item.sub;
      modalContent.innerHTML = `<ul>${item.items.map((li) => `<li>${li}</li>`).join("")}</ul>`;

      modal.hidden = false;
      document.body.style.overflow = "hidden";
      closeModalBtn.focus();
    });
  });

  function hideModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastTriggerBtn) {
      lastTriggerBtn.focus();
      lastTriggerBtn = null;
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", hideModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) hideModal();
    });
  }

  // 6. Custom Subject Dropdown (replaces OS blue native select)
  const customSelect = document.getElementById("custom-subject");
  const selectTrigger = document.getElementById("subject-trigger");
  const selectMenu = document.getElementById("subject-menu");
  const selectValueText = document.getElementById("subject-value");
  const hiddenTopicInput = document.getElementById("inq-topic");
  let closeSelect = () => {};

  if (customSelect && selectTrigger && selectMenu && selectValueText && hiddenTopicInput) {
    const options = Array.from(selectMenu.querySelectorAll(".select-option"));
    let focusedIndex = options.findIndex((opt) => opt.classList.contains("is-selected"));

    function setFocusedOption(index) {
      options.forEach((opt, i) => opt.classList.toggle("is-focused", i === index));
      focusedIndex = index;
    }

    function openSelect() {
      selectMenu.hidden = false;
      selectTrigger.setAttribute("aria-expanded", "true");
      const selectedIdx = options.findIndex((opt) => opt.classList.contains("is-selected"));
      setFocusedOption(selectedIdx >= 0 ? selectedIdx : 0);
    }

    closeSelect = (returnFocus = false) => {
      if (selectMenu.hidden) return;
      selectMenu.hidden = true;
      selectTrigger.setAttribute("aria-expanded", "false");
      options.forEach((opt) => opt.classList.remove("is-focused"));
      if (returnFocus) selectTrigger.focus();
    };

    function chooseOption(option) {
      const val = option.getAttribute("data-value");
      hiddenTopicInput.value = val;
      selectValueText.textContent = val;

      options.forEach((opt) => {
        const isMatch = opt === option;
        opt.classList.toggle("is-selected", isMatch);
        opt.setAttribute("aria-selected", String(isMatch));
      });

      closeSelect(true);
    }

    selectTrigger.addEventListener("click", () => {
      if (selectMenu.hidden) {
        openSelect();
      } else {
        closeSelect(false);
      }
    });

    options.forEach((option, index) => {
      option.addEventListener("mouseenter", () => setFocusedOption(index));
      option.addEventListener("click", () => chooseOption(option));
    });

    selectTrigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (selectMenu.hidden) {
          openSelect();
          return;
        }
        const dir = e.key === "ArrowDown" ? 1 : -1;
        const next = (focusedIndex + dir + options.length) % options.length;
        setFocusedOption(next);
      } else if (e.key === "Enter" || e.key === " ") {
        if (!selectMenu.hidden) {
          e.preventDefault();
          chooseOption(options[focusedIndex]);
        }
      } else if (e.key === "Tab") {
        closeSelect(false);
      }
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        closeSelect(false);
      }
    });
  }

  // Global Escape Key Handler (Modal, Dropdown, Mobile Menu)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal();
      closeSelect(true);
      if (primaryNav && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // 7. Copy Email & Mailto Form
  const copyBtn = document.getElementById("copy-email-btn");
  const copyFeedback = document.getElementById("copy-feedback");

  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener("click", async () => {
      const email = copyBtn.getAttribute("data-email");
      try {
        await navigator.clipboard.writeText(email);
        copyFeedback.textContent = "Email copied to clipboard.";
        setTimeout(() => {
          copyFeedback.textContent = "";
        }, 2500);
      } catch {
        copyFeedback.textContent = "Highlight and copy the email above.";
      }
    });
  }

  const inquiryForm = document.getElementById("inquiry-form");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("inq-name").value.trim();
      const topic = document.getElementById("inq-topic").value;
      const bodyText = document.getElementById("inq-body").value.trim();

      const fullBody = `Hello Edjaydan,\n\nMy name is ${name}.\n\n${bodyText}`;
      window.location.href = `mailto:edjaydan.ocampo@gmail.com?subject=${encodeURIComponent(
        topic
      )}&body=${encodeURIComponent(fullBody)}`;
    });
  }

  // 8. Download Full CV (.txt)
  const downloadCvBtn = document.getElementById("download-cv-btn");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
      const lines = [
        "EDJAYDAN S. OCAMPO — BOOK WRITER, ESSAYIST & CULTURAL STORYTELLER",
        "==================================================================",
        "Base: Manila, Philippines | Hometown: Daram, Catbalogan, Samar",
        "",
        "MANUSCRIPTS & WORKS",
        "- Before the Monsoon Crosses Samar (Literary Fiction)",
        "- Mga Bakas sa Puti ng Papel (Bilingual Essays & Sanaysay)",
        "- The Chalkboard Republic (Narrative Nonfiction)",
        "",
        "EDUCATION",
        "- EARIST Manila — College of Education (CED), CED-SG Representative",
        "- ACLC College Paco — Senior High School (2021–2023)",
        "- Manila High School — Junior High School (2014–2020)",
        "- Parasan Elementary School — Daram 1, Catbalogan, Samar (2010–2014)",
        "",
        "EDITORIAL, CULTURAL & LEADERSHIP ROLES",
        "- Senior English News Editor (2019) — MHS Newsette (Since 1951)",
        "- Vice Editorial Staff & Guest Lecturer — Pilak Baybayin Familia (PBF)",
        "- Head of Captioning Committee (2022–2023) — EARIST CED-SG",
        "- Philippine Youth Delegate — UPF Asia Pacific World Summit & Track II Diplomacy Forums",
        "- Disaster Risk Reduction Youth Ambassador — MapaKalamidad.PH (2022)",
        "- Inter-School Debate Representative — La Salle Debate Society (2020–2021)",
        "- Vice President — YWCA Y-Associates (MHS) & YWCA Youth Board Representative (2021)",
        "",
        "HONORS & AWARDS",
        "- Outstanding Campus English Journalist Award (OCEJ Award) — MHS Newsette",
        "- Mila Tan Leadership Award — Gold Medal, City Mayor's Office",
        "- 2nd Place, Pagsulat ng Sanaysay — EARIST KaDiPan",
        "- 3rd Place Silver Medalist, English Storytelling (Category B)",
        "- Bronze Medalist, Division of City Schools Manila Social Studies Debate",
        "- 1st Place Gold Medal, UN Month Poster Making Contest"
      ].join("\n");

      const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Edjaydan-S-Ocampo-CV.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // 9. Scroll Reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // 10. Ambient Background Cursor Glow (Desktop / Hover-Capable Only)
  const isMobileView = () =>
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(hover: none)").matches;

  let cursorGlow = document.getElementById("cursor-glow");
  if (!cursorGlow) {
    cursorGlow = document.createElement("div");
    cursorGlow.id = "cursor-glow";
    cursorGlow.className = "cursor-glow";
    cursorGlow.setAttribute("aria-hidden", "true");
    document.body.prepend(cursorGlow);
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = null;

  function animateGlow() {
    if (isMobileView()) {
      cursorGlow.classList.remove("is-active");
      rafId = null;
      return;
    }

    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    cursorGlow.style.setProperty("--glow-x", `${currentX.toFixed(1)}px`);
    cursorGlow.style.setProperty("--glow-y", `${currentY.toFixed(1)}px`);

    if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
      rafId = requestAnimationFrame(animateGlow);
    } else {
      rafId = null;
    }
  }

  window.addEventListener(
    "mousemove",
    (e) => {
      if (isMobileView()) return;

      targetX = e.clientX;
      targetY = e.clientY;
      if (!cursorGlow.classList.contains("is-active")) {
        cursorGlow.classList.add("is-active");
      }
      if (!rafId) {
        rafId = requestAnimationFrame(animateGlow);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "resize",
    () => {
      if (isMobileView()) {
        cursorGlow.classList.remove("is-active");
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    cursorGlow.classList.remove("is-active");
  });
});