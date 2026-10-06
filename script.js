const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* Mobile navigation */
const menuToggle = $(".menu-toggle");
const nav = $(".nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });
  $$(".nav a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

/* Course finder */
const finderData = {
  mechanical: "SolidWorks",
  product: "CREO",
  manufacturing: "NX CAD",
  architecture: "AutoCAD",
  automotive: "CATIA"
};
$("#findCourseBtn")?.addEventListener("click", () => {
  const goal = $("#careerGoal")?.value;
  const experience = $("#experienceLevel")?.value;
  const interest = $("#workInterest")?.value;
  const box = $("#courseRecommendation");
  if (!goal || !experience || !interest) {
    box.textContent = "Please select all three options to get a recommendation.";
    box.classList.add("show");
    return;
  }
  let course = finderData[goal] || "SolidWorks";
  if (interest === "2d") course = "AutoCAD";
  if (interest === "surface") course = "CATIA";
  if (interest === "automotive") course = "CATIA";
  box.innerHTML = `<strong>Recommended course: ${course}</strong><br>Based on your goal, experience and interest, ${course} is a suitable starting point.`;
  box.classList.add("show");
});

/* Course details modal */
const courseDetails = {
  CREO: "CREO focuses on 3D product design, assemblies, surface modelling, sheet metal and drafting.",
  SolidWorks: "SolidWorks covers part modelling, assemblies, drawings, simulation concepts and rendering.",
  CATIA: "CATIA is suited to advanced surface modelling, product design and automotive applications.",
  AutoCAD: "AutoCAD focuses on 2D drafting, 3D modelling, construction drawings and industrial design."
};
const modal = $("#courseModal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");
$$(".course-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const course = btn.dataset.course;
    modalTitle.textContent = course;
    modalText.textContent = courseDetails[course] || "Course details will be updated soon.";
    modal?.classList.add("show");
    modal?.setAttribute("aria-hidden", "false");
  });
});
$$(".modal-close").forEach(btn => btn.addEventListener("click", closeModal));
modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
function closeModal(){
  modal?.classList.remove("show");
  modal?.setAttribute("aria-hidden", "true");
}

/* Assessment */
const questionBank = {
  creo: [
    ["Which feature is commonly used to create a basic solid in CREO?", ["Extrude","Render","Publish","Measure"], 0],
    ["What is an assembly used for?", ["Combining components","Only printing","Only sketching","Deleting parts"], 0],
    ["Which environment is used for part modelling?", ["Part","Sheet","Drawing only","Map"], 0],
    ["What is a sketch generally used for?", ["Defining 2D geometry","Sending email","Rendering video","Creating folders"], 0],
    ["Sheet metal tools are used mainly for?", ["Sheet metal components","Text editing","Databases","Animations"], 0],
    ["A drawing can communicate?", ["Manufacturing dimensions","Only colors","Only sound","Passwords"], 0],
    ["Parametric design means?", ["Dimensions/relations drive geometry","No dimensions","Only images","Manual painting"], 0],
    ["An assembly constraint helps?", ["Position components","Change monitor","Open browser","Compress files"], 0],
    ["Which is a common CAD output?", ["Engineering drawing","Music file","Chat message","Spreadsheet only"], 0],
    ["CREO is primarily used for?", ["Mechanical/product design","Video editing","Accounting","Web hosting"], 0]
  ],
  solidworks: [
    ["What is SolidWorks mainly used for?", ["3D mechanical design","Email","Accounting","Video editing"], 0],
    ["Which feature creates a solid from a sketch?", ["Extruded Boss/Base","Inbox","Mail Merge","Slide"], 0],
    ["Assemblies combine?", ["Parts","Emails","Web pages","Folders"], 0],
    ["A drawing contains?", ["Views and dimensions","Only music","Only code","Only photos"], 0],
    ["Simulation can be used to study?", ["Engineering behaviour","Typing speed","Web traffic","Email"], 0],
    ["A sketch is generally?", ["2D geometry","A database","A presentation","A video"], 0],
    ["Rendering helps create?", ["Visual representation","SQL query","Text file","Password"], 0],
    ["Mate is used in assemblies to?", ["Define relationships","Rename Windows","Send files","Print text"], 0],
    ["Sheet metal tools support?", ["Bends and sheet components","Audio editing","Email rules","Spreadsheets"], 0],
    ["SolidWorks is popular in?", ["Mechanical/product design","Social media","Accounting","Music"], 0]
  ],
  catia: [
    ["CATIA is widely used for?", ["Product and automotive design","Email","Accounting","Web browsing"], 0],
    ["CATIA is strong in?", ["Surface modelling","Text editing","Email","Audio"], 0],
    ["A sketch defines?", ["2D geometry","A web page","A database","A video"], 0],
    ["Generative Shape Design is related to?", ["Surface design","Accounting","Email","Printing"], 0],
    ["An assembly contains?", ["Components","Only text","Only images","Only sound"], 0],
    ["Automotive designers often use CATIA for?", ["Vehicle product development","Email","Payroll","Video"], 0],
    ["Engineering drawings communicate?", ["Manufacturing information","Music","Passwords","Social posts"], 0],
    ["Parametric modelling uses?", ["Features and dimensions","Only photos","Only text","No constraints"], 0],
    ["A product structure represents?", ["Components and relationships","Browser tabs","Emails","Songs"], 0],
    ["CATIA belongs to?", ["CAD/engineering software","Antivirus","Office email","Operating system"], 0]
  ],
  autocad: [
    ["AutoCAD is widely used for?", ["2D drafting and CAD","Email","Video editing","Accounting"], 0],
    ["What does a line command create?", ["A line","A database","A webpage","A sound"], 0],
    ["Dimensions are used to show?", ["Size information","Music","Passwords","Emails"], 0],
    ["Layers help organize?", ["Drawing objects","Emails","Files only","Audio"], 0],
    ["A block is?", ["Reusable drawing content","A password","A video","A database"], 0],
    ["Polyline can create?", ["Connected segments","Only circles","Emails","Tables only"], 0],
    ["Model space is used for?", ["Drawing/model creation","Email","Chat","Music"], 0],
    ["Paper space is commonly used for?", ["Layouts/printing","Sketching only","Passwords","Web browsing"], 0],
    ["AutoCAD can create?", ["2D drawings and 3D models","Only audio","Only spreadsheets","Only emails"], 0],
    ["A technical drawing should contain?", ["Clear dimensions and annotations","Only colors","Only photos","Only animations"], 0]
  ],
  nxcad: [
    ["NX CAD is used for?", ["Industrial product design","Email","Accounting","Video editing"], 0],
    ["NX supports?", ["3D modelling and assemblies","Only typing","Only email","Only music"], 0],
    ["A sketch is?", ["2D geometry","A password","A webpage","An email"], 0],
    ["Assembly design combines?", ["Components","Emails","Videos","Folders"], 0],
    ["NX is commonly associated with?", ["Siemens digital manufacturing tools","Social media","Antivirus","Email"], 0],
    ["Parametric modelling uses?", ["Features and dimensions","Only images","Only text","No constraints"], 0],
    ["Manufacturing integration helps?", ["Design-to-production workflows","Email replies","Music creation","Web browsing"], 0],
    ["Engineering drawings communicate?", ["Manufacturing details","Passwords","Music","Social posts"], 0],
    ["Surface modelling is useful for?", ["Complex shapes","Email","Accounting","Text formatting"], 0],
    ["NX CAD is relevant to?", ["Industrial/mechanical design","Only office work","Only entertainment","Only communication"], 0]
  ]
};

let selectedCourse = "";
let currentQuestion = 0;
let answers = [];

window.selectCourse = function(course){
  selectedCourse = course;
  currentQuestion = 0;
  answers = Array(10).fill(null);
  $("#courseSelection")?.classList.add("hidden");
  $("#startAssessment")?.classList.remove("hidden");
  const names = {creo:"CREO",solidworks:"SolidWorks",catia:"CATIA",autocad:"AutoCAD",nxcad:"NX CAD"};
  $("#selectedCourseTitle").textContent = `${names[course]} Assessment`;
  $("#selectedCourseIcon").textContent = course === "autocad" ? "📐" : course === "catia" ? "🚗" : course === "solidworks" ? "🔧" : course === "nxcad" ? "🏭" : "⚙️";
};
window.backToCourses = function(){
  $("#startAssessment")?.classList.add("hidden");
  $("#questionContainer")?.classList.add("hidden");
  $("#resultContainer")?.classList.add("hidden");
  $("#courseSelection")?.classList.remove("hidden");
};
window.startAssessment = function(){
  currentQuestion = 0;
  answers = Array(10).fill(null);
  $("#startAssessment")?.classList.add("hidden");
  $("#questionContainer")?.classList.remove("hidden");
  renderQuestion();
};
function renderQuestion(){
  const q = questionBank[selectedCourse][currentQuestion];
  $("#questionNumber").textContent = `Question ${currentQuestion + 1} / 10`;
  $("#questionText").textContent = q[0];
  $("#scoreDisplay").textContent = `Answered: ${answers.filter(a => a !== null).length}`;
  $("#progressBar").style.width = `${((currentQuestion + 1) / 10) * 100}%`;
  const box = $("#optionsContainer");
  box.innerHTML = "";
  q[1].forEach((option, i) => {
    const div = document.createElement("div");
    div.className = "option" + (answers[currentQuestion] === i ? " selected" : "");
    div.textContent = `${String.fromCharCode(65+i)}. ${option}`;
    div.onclick = () => { answers[currentQuestion] = i; renderQuestion(); };
    box.appendChild(div);
  });
  $("#previousBtn").disabled = currentQuestion === 0;
  $("#nextBtn").textContent = currentQuestion === 9 ? "Finish →" : "Next →";
}
window.previousQuestion = function(){
  if(currentQuestion > 0){ currentQuestion--; renderQuestion(); }
};
window.nextQuestion = function(){
  if(answers[currentQuestion] === null){
    alert("Please select an answer before continuing.");
    return;
  }
  if(currentQuestion < 9){ currentQuestion++; renderQuestion(); }
  else finishAssessment();
};
function finishAssessment(){
  let score = 0;
  questionBank[selectedCourse].forEach((q,i)=>{ if(answers[i] === q[2]) score++; });
  const names = {creo:"CREO",solidworks:"SolidWorks",catia:"CATIA",autocad:"AutoCAD",nxcad:"NX CAD"};
  const level = score >= 8 ? "Advanced" : score >= 5 ? "Intermediate" : "Beginner";
  $("#questionContainer")?.classList.add("hidden");
  $("#resultContainer")?.classList.remove("hidden");
  $("#resultCourse").textContent = `${names[selectedCourse]} assessment`;
  $("#finalScore").textContent = `${score}/10`;
  $("#skillLevel").textContent = level;
  $("#resultMessage").textContent = score >= 8 ? "Excellent performance." : score >= 5 ? "Good foundation. More practice will help." : "Start with the fundamentals and practice regularly.";
  $("#recommendedCourse").textContent = names[selectedCourse];
}
window.retakeAssessment = function(){
  $("#resultContainer")?.classList.add("hidden");
  $("#startAssessment")?.classList.remove("hidden");
};

/* Gallery filters */
$$(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filters button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    $$(".gallery-item").forEach(item => {
      item.style.display = filter === "all" || item.dataset.software === filter ? "" : "none";
    });
  });
});

/* Comparison */
const comparisonData = {
  "CREO":["Strong parametric product design","Excellent for mechanical/product workflows","Good for assemblies and manufacturing"],
  "SolidWorks":["User-friendly mechanical modelling","Strong part and assembly workflow","Popular for mechanical design"],
  "CATIA":["Advanced surface/product design","Strong automotive applications","Suitable for complex products"],
  "AutoCAD":["Excellent 2D drafting","Useful for technical documentation","Common in architecture and engineering"],
  "NX CAD":["Advanced industrial design","Strong manufacturing integration","Suitable for complex engineering workflows"]
};
function updateComparison(){
  const a = $("#compareA")?.value, b = $("#compareB")?.value, box = $("#comparisonResult");
  if(!box || !a || !b) return;
  const make = name => `<div><h3>${name}</h3><ul>${comparisonData[name].map(x=>`<li>${x}</li>`).join("")}</ul></div>`;
  box.innerHTML = make(a) + make(b);
}
$("#compareA")?.addEventListener("change", updateComparison);
$("#compareB")?.addEventListener("change", updateComparison);
updateComparison();

/* Brochure */
$("#brochureBtn")?.addEventListener("click", () => {
  const content = `CRANSOCAAU | CAD DESIGN TRAINING INSTITUTE\n\nCourses:\nCREO\nSolidWorks\nCATIA\nAutoCAD\nNX CAD\n\nTraining Modes: Online / Offline\n\nContact Cransocaau for verified batch, trainer and placement details.`;
  const blob = new Blob([content], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Cransocaau-Course-Brochure.txt"; a.click();
  URL.revokeObjectURL(url);
});

/* WhatsApp enquiry */
$("#waBtn")?.addEventListener("click", () => {
  const name = $("#waName")?.value.trim() || "there";
  const course = $("#waCourse")?.value;
  const mode = $("#waMode")?.value;
  const message = `Hello Cransocaau, my name is ${name}. I am interested in ${course} training. Preferred mode: ${mode}.`;
  window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, "_blank");
});

/* FAQ search */
$("#faqSearch")?.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  $$("#faqList details").forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(term) ? "" : "none";
  });
});

/* Theme */
$("#themeBtn")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("cransocaau-theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if(localStorage.getItem("cransocaau-theme") === "dark") document.body.classList.add("dark");

/* Enquiry form demo */
$("#enquiryForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const status = $("#formStatus");
  if(status){
    status.textContent = "Thank you! Your enquiry has been captured on this demo page.";
    status.style.color = "#197342";
  }
});
