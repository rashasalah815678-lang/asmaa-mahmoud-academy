// ============================================================
// منصة أسماء محمود التفاعلية
// Asmaa Mahmoud Interactive Academy
// ============================================================


// ============================================================
// SUPABASE
// ============================================================

const SUPABASE_URL = "https://pfepxbjgvinlpedjslmq.supabase.co";

// بعدين هنضع المفتاح هنا
const SUPABASE_PUBLISHABLE_KEY = "ضعي_هنا_Publishable_Key";

let supabaseClient = null;


// ============================================================
// تحميل Supabase عند الحاجة فقط
// ============================================================

function loadSupabase() {

    return new Promise(function (resolve, reject) {

        if (window.supabase) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

        script.onload = function () {
            resolve();
        };

        script.onerror = function () {
            reject(new Error("تعذر تحميل Supabase"));
        };

        document.head.appendChild(script);

    });

}


async function initSupabase() {

    if (
        !SUPABASE_PUBLISHABLE_KEY ||
        SUPABASE_PUBLISHABLE_KEY === "sb_publishable_b_Z2bjPI-ZwN0D11CMHPWA_Zi-mDV_l"
    ) {
        return null;
    }

    try {

        await loadSupabase();

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

        return supabaseClient;

    } catch (error) {

        console.error(error);

        return null;

    }

}


// ============================================================
// الطلاب
// ============================================================

let students =
    JSON.parse(
        localStorage.getItem("asmaa_platform_students")
    ) || [
        {
            id: 1,
            name: "محمد أحمد",
            level: "مستوى متوسط",
            points: 450
        },
        {
            id: 2,
            name: "فاطمة عمر",
            level: "تأسيس مبتدئ",
            points: 320
        },
        {
            id: 3,
            name: "يوسف إبراهيم",
            level: "إتقان متقدم",
            points: 680
        }
    ];


// ============================================================
// الحالة الحالية
// ============================================================

let currentCourse = "";
let currentLesson = "";
let currentLessonIndex = 0;


// ============================================================
// الدورات
// ============================================================

const courses = {

    "القرآن الكريم": {
        icon: "📖",
        description:
            "رحلة تفاعلية لتعلّم القرآن الكريم وتطوير مهارات التلاوة والحفظ.",
        lessons: [
            "مقدمة في القرآن الكريم",
            "فضل تلاوة القرآن",
            "آداب تلاوة القرآن",
            "مراجعة القرآن الكريم"
        ]
    },

    "التجويد": {
        icon: "📚",
        description:
            "تعلم قواعد التجويد بطريقة سهلة وتفاعلية.",
        lessons: [
            "مقدمة في علم التجويد",
            "مخارج الحروف",
            "صفات الحروف",
            "أحكام النون الساكنة والتنوين",
            "أحكام الميم الساكنة",
            "المدود",
            "القلقلة",
            "مراجعة شاملة في التجويد"
        ]
    },

    "اللغة العربية": {
        icon: "🔤",
        description:
            "تعلم أساسيات اللغة العربية بطريقة مبسطة وتفاعلية.",
        lessons: [
            "مقدمة في اللغة العربية",
            "الحروف والكلمات",
            "الجملة العربية",
            "مراجعة اللغة العربية"
        ]
    },

    "العقيدة": {
        icon: "🕌",
        description:
            "دروس مبسطة في العقيدة الإسلامية.",
        lessons: [
            "ما هي العقيدة؟",
            "أركان الإيمان",
            "التوحيد",
            "مراجعة العقيدة"
        ]
    },

    "الفقه": {
        icon: "⚖️",
        description:
            "مدخل مبسط إلى الفقه والعبادات.",
        lessons: [
            "مقدمة في الفقه",
            "الطهارة",
            "الصلاة",
            "مراجعة الفقه"
        ]
    },

    "الحديث": {
        icon: "📜",
        description:
            "تعلم الحديث النبوي وفهم معانيه.",
        lessons: [
            "مقدمة في الحديث",
            "أهمية الحديث",
            "آداب المسلم",
            "مراجعة الحديث"
        ]
    },

    "التفسير": {
        icon: "🌙",
        description:
            "التعرف على معاني الآيات بطريقة سهلة.",
        lessons: [
            "مقدمة في التفسير",
            "كيف نفهم القرآن؟",
            "معاني الآيات",
            "مراجعة التفسير"
        ]
    },

    "مسابقة معلم وطالب": {
        icon: "🏆",
        description:
            "اختبارات وتحديات تعليمية للمعلم والطالب.",
        lessons: [
            "التحدي الأول",
            "التحدي الثاني",
            "التحدي الثالث",
            "التحدي النهائي"
        ]
    }

};


// ============================================================
// فيديوهات محلية
// ============================================================

const lessonVideos = {

    "التجويد": {
        "مقدمة في علم التجويد":
            "videos/tajweed/intro-tajweed.mp4"
    }

};


// ============================================================
// التنقل بين الصفحات
// ============================================================

function switchView(viewName) {

    document
        .querySelectorAll(".view-section")
        .forEach(function (section) {

            section.classList.remove("active");

        });


    const target =
        document.getElementById(viewName);

    if (target) {
        target.classList.add("active");
    }


    document
        .querySelectorAll(".nav-btn")
        .forEach(function (button) {

            button.classList.remove("active");

            const action =
                button.getAttribute("onclick") || "";

            if (
                action.includes("'" + viewName + "'") ||
                action.includes('"' + viewName + '"')
            ) {

                button.classList.add("active");

            }

        });


    if (viewName === "achievements") {
        updateAchievements();
    }


    if (viewName === "admin") {
        updateAdminStats();
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// الإنجازات
// ============================================================

function getCompletedLessonsTotal() {

    return Number(
        localStorage.getItem("asmaa_completed_lessons")
    ) || 0;

}


function getTotalLessons() {

    let total = 0;

    Object.keys(courses).forEach(function (courseName) {

        total += courses[courseName].lessons.length;

    });

    return total;

}


function getTotalQuizPoints() {

    return Number(
        localStorage.getItem("asmaa_total_quiz_points")
    ) || 0;

}


function getQuizAttempts() {

    return Number(
        localStorage.getItem("asmaa_total_quiz_attempts")
    ) || 0;

}


function getAchievementLevel(points) {

    if (points >= 200) {
        return "نجم الأكاديمية";
    }

    if (points >= 100) {
        return "متعلم متقدم";
    }

    if (points >= 50) {
        return "متعلم نشيط";
    }

    return "مبتدئ";

}


function updateAchievements() {

    const completed =
        getCompletedLessonsTotal();

    const total =
        getTotalLessons();

    const points =
        getTotalQuizPoints();

    const attempts =
        getQuizAttempts();


    const percentage =
        total > 0
            ? Math.min(
                100,
                Math.round(
                    (completed / total) * 100
                )
            )
            : 0;


    const pointsElement =
        document.getElementById("achievementPoints");

    if (pointsElement) {
        pointsElement.textContent = points;
    }


    const completedElement =
        document.getElementById("completedLessonsCount");

    if (completedElement) {
        completedElement.textContent = completed;
    }


    const attemptsElement =
        document.getElementById("quizAttemptsCount");

    if (attemptsElement) {
        attemptsElement.textContent = attempts;
    }


    const progressElement =
        document.getElementById("overallProgress");

    if (progressElement) {
        progressElement.textContent =
            percentage + "%";
    }


    const levelElement =
        document.getElementById("studentAchievementLevel");

    if (levelElement) {
        levelElement.textContent =
            getAchievementLevel(points);
    }


    updateBadge(
        "firstLessonBadgeProgress",
        "firstLessonBadgeText",
        completed,
        1,
        "ابدئي أول درس"
    );


    updateBadge(
        "activeLearnerProgress",
        "activeLearnerText",
        completed,
        3,
        "أكملي 3 دروس"
    );


    updateBadge(
        "quizChampionProgress",
        "quizChampionText",
        points,
        100,
        "اجمعي 100 نقطة"
    );


    updateBadge(
        "academyStarProgress",
        "academyStarText",
        points,
        200,
        "اجمعي 200 نقطة"
    );

}


function updateBadge(
    progressId,
    textId,
    value,
    target,
    remainingText
) {

    const progress =
        document.getElementById(progressId);

    const text =
        document.getElementById(textId);


    const percentage =
        Math.min(
            100,
            Math.round((value / target) * 100)
        );


    if (progress) {
        progress.style.width =
            percentage + "%";
    }


    if (text) {

        text.textContent =
            value >= target
                ? "✅ تم الإنجاز"
                : remainingText;

    }

}


// ============================================================
// الطلاب
// ============================================================

function saveStudents() {

    localStorage.setItem(
        "asmaa_platform_students",
        JSON.stringify(students)
    );

}


function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function renderStudents() {

    const tableBody =
        document.getElementById("studentsTableBody");

    if (!tableBody) return;


    if (students.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5">
                    لا يوجد طلاب حتى الآن.
                </td>
            </tr>
        `;

        return;

    }


    tableBody.innerHTML =
        students.map(function (student, index) {

            return `
                <tr>

                    <td>${index + 1}</td>

                    <td>
                        ${escapeHTML(student.name)}
                    </td>

                    <td>
                        ${escapeHTML(student.level)}
                    </td>

                    <td>
                        ${Number(student.points) || 0}
                    </td>

                    <td>

                        <button
                            class="delete-student-btn"
                            onclick="deleteStudent(${student.id})"
                        >
                            حذف
                        </button>

                    </td>

                </tr>
            `;

        }).join("");

}


function handleAddStudent(event) {

    event.preventDefault();


    const nameInput =
        document.getElementById("studentName");

    const levelInput =
        document.getElementById("studentLevel");

    const pointsInput =
        document.getElementById("studentPoints");


    const name =
        nameInput
            ? nameInput.value.trim()
            : "";

    const level =
        levelInput
            ? levelInput.value.trim()
            : "";

    const points =
        pointsInput
            ? Number(pointsInput.value) || 0
            : 0;


    if (!name || !level) {

        showAdminMessage(
            "تنبيه",
            "اكتبي اسم الطالب والمستوى أولًا."
        );

        return;

    }


    students.push({

        id: Date.now(),

        name: name,

        level: level,

        points: points

    });


    saveStudents();

    renderStudents();

    updateAdminStats();


    if (nameInput) {
        nameInput.value = "";
    }

    if (levelInput) {
        levelInput.value = "";
    }

    if (pointsInput) {
        pointsInput.value = "";
    }


    showAdminMessage(
        "تمت الإضافة",
        "تمت إضافة الطالب بنجاح."
    );

}


function deleteStudent(id) {

    students =
        students.filter(function (student) {

            return student.id !== id;

        });


    saveStudents();

    renderStudents();

    updateAdminStats();

}


// ============================================================
// المواد
// ============================================================

function openCourse(courseName) {

    if (!courses[courseName]) return;


    currentCourse = courseName;


    const title =
        document.getElementById("courseModalTitle");

    if (title) {
        title.textContent = courseName;
    }


    const modal =
        document.getElementById("courseModal");

    if (modal) {
        modal.classList.add("show");
    }

}


function closeCourse() {

    const modal =
        document.getElementById("courseModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


function openCoursePage(courseName) {

    if (!courses[courseName]) return;


    currentCourse = courseName;


    const course =
        courses[courseName];


    const icon =
        document.getElementById("coursePageIcon");

    const title =
        document.getElementById("coursePageTitle");

    const description =
        document.getElementById("coursePageDescription");


    if (icon) {
        icon.textContent = course.icon;
    }

    if (title) {
        title.textContent = courseName;
    }

    if (description) {
        description.textContent =
            course.description;
    }


    const lessonsContainer =
        document.getElementById("lessonsContainer");


    if (lessonsContainer) {

        lessonsContainer.innerHTML =
            course.lessons.map(function (lesson, index) {

                return `
                    <div class="lesson-card">

                        <div>

                            <span>
                                الدرس ${index + 1}
                            </span>

                            <h3>
                                ${escapeHTML(lesson)}
                            </h3>

                        </div>

                        <button
                            class="continue-btn"
                            onclick="startLesson('${courseName}', ${index})"
                        >
                            متابعة الدرس
                        </button>

                    </div>
                `;

            }).join("");

    }


    updateCourseProgress();

    switchView("coursePage");

}


function startLesson(courseName, index) {

    if (!courses[courseName]) return;


    currentCourse = courseName;

    currentLessonIndex = index;

    currentLesson =
        courses[courseName].lessons[index];


    openLessonPage(
        courseName,
        currentLesson,
        index
    );

}


// ============================================================
// صفحة الدرس
// ============================================================

function openLessonPage(
    courseName,
    lessonName,
    lessonIndex
) {

    currentCourse = courseName;

    currentLesson = lessonName;

    currentLessonIndex = lessonIndex;


    const title =
        document.getElementById("lessonTitle");

    const explanation =
        document.getElementById("lessonExplanationText");


    if (title) {
        title.textContent = lessonName;
    }


    if (explanation) {

        explanation.textContent =
            getLessonExplanation(
                courseName,
                lessonName
            );

    }


    setLessonVideo(
        courseName,
        lessonName
    );


    switchView("lessonPage");

}


// ============================================================
// شرح الدروس
// ============================================================

function getLessonExplanation(
    courseName,
    lessonName
) {

    const explanations = {

        "مقدمة في علم التجويد":
            "في هذا الدرس نتعرف على معنى علم التجويد وأهميته، وكيف يساعدنا على قراءة القرآن الكريم قراءة صحيحة.",

        "مخارج الحروف":
            "نتعرف في هذا الدرس على الأماكن التي تخرج منها الحروف العربية أثناء النطق.",

        "صفات الحروف":
            "نتعرف على أهم صفات الحروف التي تساعدنا على النطق الصحيح.",

        "أحكام النون الساكنة والتنوين":
            "نتعرف على أحكام النون الساكنة والتنوين بطريقة سهلة مع أمثلة تطبيقية.",

        "أحكام الميم الساكنة":
            "نتعلم الأحكام الأساسية للميم الساكنة مع أمثلة من القرآن الكريم.",

        "المدود":
            "نتعرف على مفهوم المد وبعض أنواعه الأساسية.",

        "القلقلة":
            "نتعلم حروف القلقلة وكيفية نطقها بصورة صحيحة.",

        "مراجعة شاملة في التجويد":
            "مراجعة تفاعلية لأهم القواعد التي تعلمناها في دروس التجويد."

    };


    return explanations[lessonName] ||
        "في هذا الدرس سنتعلم " +
        lessonName +
        " بطريقة مبسطة وتفاعلية.";

}


// ============================================================
// الفيديو
// ============================================================

function createVideoPath(
    courseName,
    lessonName
) {

    return (
        encodeURIComponent(courseName) +
        "/" +
        encodeURIComponent(lessonName) +
        ".mp4"
    );

}


async function setLessonVideo(
    courseName,
    lessonName
) {

    const video =
        document.getElementById("lessonVideo");

    const source =
        document.getElementById("lessonVideoSource");

    const emptyState =
        document.getElementById("videoEmptyState");


    if (!video || !source || !emptyState) {
        return;
    }


    const localVideo =
        lessonVideos[courseName]?.[lessonName];


    if (localVideo) {

        source.src = localVideo;

        video.load();

        video.style.display = "block";

        emptyState.style.display = "none";

        return;

    }


    showVideoEmptyState(
        video,
        emptyState
    );

}


function showVideoEmptyState(
    video,
    emptyState
) {

    if (video) {

        video.pause();

        video.removeAttribute("src");

        video.style.display = "none";

    }


    if (emptyState) {
        emptyState.style.display = "flex";
    }

}


// ============================================================
// إكمال الدرس
// ============================================================

function completeLesson() {

    if (!currentCourse || !currentLesson) {

        showAdminMessage(
            "تنبيه",
            "افتحي درسًا أولًا."
        );

        return;

    }


    const key =
        "asmaa_completed_lesson_" +
        currentCourse +
        "_" +
        currentLesson;


    if (
        localStorage.getItem(key) !== "true"
    ) {

        localStorage.setItem(
            key,
            "true"
        );


        localStorage.setItem(
            "asmaa_completed_lessons",
            getCompletedLessonsTotal() + 1
        );


        showAdminMessage(
            "🎉 أحسنتِ!",
            "تم تسجيل إكمال الدرس بنجاح."
        );

    } else {

        showAdminMessage(
            "تم الإنجاز",
            "هذا الدرس مكتمل بالفعل."
        );

    }


    updateAchievements();

    updateCourseProgress();

}


// ============================================================
// تقدم المادة
// ============================================================

function updateCourseProgress() {

    if (!currentCourse) return;


    const course =
        courses[currentCourse];

    if (!course) return;


    let completed = 0;


    course.lessons.forEach(function (lesson) {

        const key =
            "asmaa_completed_lesson_" +
            currentCourse +
            "_" +
            lesson;


        if (
            localStorage.getItem(key) === "true"
        ) {

            completed++;

        }

    });


    const percentage =
        course.lessons.length > 0
            ? Math.round(
                (completed / course.lessons.length) * 100
            )
            : 0;


    const progressText =
        document.getElementById("courseProgressText");

    const progress =
        document.getElementById("courseProgress");


    if (progressText) {
        progressText.textContent =
            percentage + "%";
    }


    if (progress) {
        progress.style.width =
            percentage + "%";
    }

}


// ============================================================
// الاختبارات
// ============================================================

const lessonQuizBank = {

    "مقدمة في علم التجويد": [

        {
            question: "ما المقصود بعلم التجويد؟",
            options: [
                "تحسين الخط",
                "قراءة القرآن قراءة صحيحة",
                "حفظ الأرقام",
                "تعلم الحساب"
            ],
            answer: 1
        },

        {
            question: "ما الهدف الأساسي من التجويد؟",
            options: [
                "النطق الصحيح",
                "سرعة القراءة فقط",
                "كتابة المصحف",
                "تعلم اللغة الإنجليزية"
            ],
            answer: 0
        },

        {
            question: "التجويد متعلق بشكل أساسي بـ؟",
            options: [
                "تلاوة القرآن",
                "الرسم",
                "الحساب",
                "العلوم"
            ],
            answer: 0
        }

    ],


    "مخارج الحروف": [

        {
            question: "ماذا نعني بمخرج الحرف؟",
            options: [
                "مكان خروج الحرف",
                "شكل الحرف",
                "لون الحرف",
                "عدد الحروف"
            ],
            answer: 0
        },

        {
            question: "معرفة المخارج تساعد على؟",
            options: [
                "النطق الصحيح",
                "الكتابة فقط",
                "الحساب",
                "الحفظ فقط"
            ],
            answer: 0
        },

        {
            question: "الحروف العربية لها مخارج؟",
            options: [
                "محددة",
                "غير موجودة",
                "متشابهة دائمًا",
                "لا أهمية لها"
            ],
            answer: 0
        }

    ],


    "صفات الحروف": [

        {
            question: "ما المقصود بصفات الحروف؟",
            options: [
                "كيفية نطق الحرف",
                "عدد الكلمات",
                "شكل الصفحة",
                "لون المصحف"
            ],
            answer: 0
        },

        {
            question: "معرفة صفات الحروف تساعد على؟",
            options: [
                "تحسين التلاوة",
                "الحساب",
                "الرسم",
                "الكتابة فقط"
            ],
            answer: 0
        },

        {
            question: "الصفات مرتبطة بـ؟",
            options: [
                "نطق الحروف",
                "حجم المصحف",
                "عدد الصفحات",
                "نوع الورق"
            ],
            answer: 0
        }

    ],


    "أحكام النون الساكنة والتنوين": [

        {
            question: "من أحكام النون الساكنة والتنوين؟",
            options: [
                "الإظهار",
                "الرسم",
                "الكتابة",
                "الحساب"
            ],
            answer: 0
        },

        {
            question: "التنوين يكون في؟",
            options: [
                "آخر الاسم غالبًا",
                "كل حرف",
                "الأفعال فقط",
                "الأرقام"
            ],
            answer: 0
        },

        {
            question: "من أحكام النون الساكنة؟",
            options: [
                "الإدغام",
                "الخط",
                "الرسم",
                "الحساب"
            ],
            answer: 0
        }

    ],


    "أحكام الميم الساكنة": [

        {
            question: "ما موضوع هذا الدرس؟",
            options: [
                "الميم الساكنة",
                "المدود فقط",
                "مخارج الحروف فقط",
                "اللغة الإنجليزية"
            ],
            answer: 0
        },

        {
            question: "من أحكام الميم الساكنة؟",
            options: [
                "الإخفاء الشفوي",
                "المد",
                "القلقلة",
                "الإظهار الحلقي"
            ],
            answer: 0
        },

        {
            question: "الميم تخرج من؟",
            options: [
                "الشفتين",
                "الجوف",
                "الحلق فقط",
                "الخيشوم فقط"
            ],
            answer: 0
        }

    ],


    "المدود": [

        {
            question: "ما معنى المد؟",
            options: [
                "إطالة الصوت بحرف من حروف المد",
                "قطع الصوت",
                "إخفاء الحرف",
                "تغيير الكلمة"
            ],
            answer: 0
        },

        {
            question: "من حروف المد؟",
            options: [
                "الألف",
                "الباء",
                "الميم",
                "التاء"
            ],
            answer: 0
        },

        {
            question: "من حروف المد أيضًا؟",
            options: [
                "الواو والياء",
                "الباء والتاء",
                "الميم والنون",
                "الجيم والحاء"
            ],
            answer: 0
        }

    ],


    "القلقلة": [

        {
            question: "ما المقصود بالقلقلة؟",
            options: [
                "اضطراب الصوت عند النطق بالحرف الساكن",
                "إطالة الصوت",
                "إخفاء الحرف",
                "تغيير الحركة"
            ],
            answer: 0
        },

        {
            question: "من حروف القلقلة؟",
            options: [
                "ق",
                "س",
                "م",
                "ل"
            ],
            answer: 0
        },

        {
            question: "مجموعة حروف القلقلة هي؟",
            options: [
                "قطب جد",
                "يرملون",
                "أجدك",
                "حروف المد"
            ],
            answer: 0
        }

    ],


    "مراجعة شاملة في التجويد": [

        {
            question: "ما أهمية التجويد؟",
            options: [
                "تحسين تلاوة القرآن",
                "زيادة سرعة الكتابة",
                "تعلم الحساب",
                "تعلم الرسم"
            ],
            answer: 0
        },

        {
            question: "ما مخرج الحرف؟",
            options: [
                "مكان خروجه",
                "شكله",
                "لونه",
                "عدده"
            ],
            answer: 0
        },

        {
            question: "من حروف القلقلة؟",
            options: [
                "ق",
                "م",
                "س",
                "ل"
            ],
            answer: 0
        },

        {
            question: "من حروف المد؟",
            options: [
                "الألف",
                "الباء",
                "التاء",
                "الجيم"
            ],
            answer: 0
        },

        {
            question:
                "من أحكام النون الساكنة والتنوين؟",
            options: [
                "الإظهار",
                "الرسم",
                "الخط",
                "الحساب"
            ],
            answer: 0
        }

    ]

};


// ============================================================
// تشغيل الاختبار
// ============================================================

function startLessonQuiz() {

    if (!currentLesson) {

        showAdminMessage(
            "تنبيه",
            "افتحي درسًا أولًا."
        );

        return;

    }


    const questions =
        lessonQuizBank[currentLesson];


    if (!questions) {

        showAdminMessage(
            "الاختبار",
            "لا يوجد اختبار لهذا الدرس حاليًا."
        );

        return;

    }


    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        const q = questions[i];


        const answer =
            window.prompt(
                "السؤال " +
                (i + 1) +
                ":\n\n" +
                q.question +
                "\n\n" +
                q.options
                    .map(function (option, index) {

                        return (
                            (index + 1) +
                            ") " +
                            option
                        );

                    })
                    .join("\n")
            );


        if (
            Number(answer) - 1 ===
            q.answer
        ) {

            score++;

        }

    }


    const points =
        score * 20;


    addQuizPoints(points);


    showAdminMessage(
        "🧠 نتيجة الاختبار",
        "حصلتِ على " +
        score +
        " من " +
        questions.length +
        " — وأضيفت " +
        points +
        " نقطة."
    );

}


function addQuizPoints(points) {

    localStorage.setItem(
        "asmaa_total_quiz_points",
        getTotalQuizPoints() + points
    );


    localStorage.setItem(
        "asmaa_total_quiz_attempts",
        getQuizAttempts() + 1
    );


    updateAchievements();

    updateAdminStats();

}


// ============================================================
// لوحة التحكم
// ============================================================

function updateAdminStats() {

    const totalStudents =
        document.getElementById("totalStudentsCount");

    const totalLessons =
        document.getElementById("totalLessonsCount");

    const totalQuizzes =
        document.getElementById("totalQuizzesCount");

    const averagePoints =
        document.getElementById("averagePoints");


    if (totalStudents) {
        totalStudents.textContent =
            students.length;
    }


    if (totalLessons) {
        totalLessons.textContent =
            getTotalLessons();
    }


    if (totalQuizzes) {
        totalQuizzes.textContent =
            Object.keys(lessonQuizBank).length;
    }


    if (averagePoints) {

        const average =
            students.length > 0
                ? Math.round(
                    students.reduce(
                        function (total, student) {

                            return (
                                total +
                                (Number(student.points) || 0)
                            );

                        },
                        0
                    ) / students.length
                )
                : 0;


        averagePoints.textContent =
            average;

    }

}


// ============================================================
// الرسائل
// ============================================================

function showAdminMessage(
    title,
    text
) {

    const old =
        document.querySelector(".academy-popup");

    if (old) {
        old.remove();
    }


    const popup =
        document.createElement("div");


    popup.className =
        "academy-popup";


    popup.innerHTML = `
        <div class="popup-box">

            <button class="popup-close">
                ×
            </button>

            <div class="popup-icon">
                ✨
            </div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(text)}
            </p>

            <button class="popup-ok">
                حسنًا
            </button>

        </div>
    `;


    document.body.appendChild(popup);


    popup
        .querySelector(".popup-close")
        ?.addEventListener(
            "click",
            function () {
                popup.remove();
            }
        );


    popup
        .querySelector(".popup-ok")
        ?.addEventListener(
            "click",
            function () {
                popup.remove();
            }
        );

}


// ============================================================
// مدير الفيديوهات
// ============================================================

function openVideoManager() {

    const modal =
        document.getElementById("videoManagerModal");

    if (!modal) {
        console.error("videoManagerModal غير موجود في index.html");
        return;
    }

    modal.classList.add("show");

    modal.style.display = "flex";

    loadVideoLessons();

}


function closeVideoManager() {

    const modal =
        document.getElementById("videoManagerModal");

    if (modal) {

        modal.classList.remove("show");

        modal.style.display = "none";

    }

}


function loadVideoLessons() {

    const courseSelect =
        document.getElementById("videoCourseSelect");

    const lessonSelect =
        document.getElementById("videoLessonSelect");


    if (!courseSelect || !lessonSelect) {
        return;
    }


    lessonSelect.innerHTML =
        `<option value="">اختاري الدرس</option>`;


    const courseName =
        courseSelect.value;


    if (!courseName || !courses[courseName]) {
        return;
    }


    courses[courseName].lessons.forEach(
        function (lesson) {

            const option =
                document.createElement("option");

            option.value = lesson;

            option.textContent = lesson;

            lessonSelect.appendChild(option);

        }
    );

}


// ============================================================
// رفع الفيديو
// ============================================================

async function saveLessonVideo() {

    const courseSelect =
        document.getElementById("videoCourseSelect");

    const lessonSelect =
        document.getElementById("videoLessonSelect");

    const fileInput =
        document.getElementById("lessonVideoFile");

    const message =
        document.getElementById("videoUploadMessage");


    const course =
        courseSelect
            ? courseSelect.value
            : "";

    const lesson =
        lessonSelect
            ? lessonSelect.value
            : "";


    if (!course || !lesson) {

        if (message) {
            message.textContent =
                "⚠️ اختاري المادة والدرس أولًا.";
        }

        return;

    }


    if (
        !fileInput ||
        !fileInput.files ||
        !fileInput.files[0]
    ) {

        if (message) {
            message.textContent =
                "⚠️ اختاري ملف الفيديو أولًا.";
        }

        return;

    }


    const file =
        fileInput.files[0];


    if (
        file.type !== "video/mp4" &&
        !file.name.toLowerCase().endsWith(".mp4")
    ) {

        if (message) {
            message.textContent =
                "⚠️ اختاري فيديو بصيغة MP4.";
        }

        return;

    }


    if (message) {
        message.textContent =
            "⏳ جاري الاتصال...";
    }


    try {

        const client =
            await initSupabase();


        if (!client) {

            if (message) {

                message.textContent =
                    "⚠️ مفتاح Supabase لم يتم وضعه بعد.";

            }

            return;

        }


        const path =
            createVideoPath(
                course,
                lesson
            );


        if (message) {
            message.textContent =
                "⏳ جاري رفع الفيديو...";
        }


        const result =
            await client
                .storage
                .from("lesson-videos")
                .upload(
                    path,
                    file,
                    {
                        contentType: "video/mp4",
                        upsert: true,
                        cacheControl: "3600"
                    }
                );


        if (result.error) {

            if (message) {

                message.textContent =
                    "❌ " +
                    result.error.message;

            }

            return;

        }


        if (message) {

            message.textContent =
                "✅ تم رفع الفيديو بنجاح!";

        }


        fileInput.value = "";


    } catch (error) {

        console.error(error);

        if (message) {

            message.textContent =
                "❌ حدث خطأ أثناء رفع الفيديو.";

        }

    }

}


// ============================================================
// إغلاق النوافذ
// ============================================================

document.addEventListener(
    "click",
    function (event) {

        const courseModal =
            document.getElementById("courseModal");

        const videoModal =
            document.getElementById("videoManagerModal");


        if (event.target === courseModal) {
            closeCourse();
        }


        if (event.target === videoModal) {
            closeVideoManager();
        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        closeCourse();

        closeVideoManager();


        const popup =
            document.querySelector(".academy-popup");

        if (popup) {
            popup.remove();
        }

    }
);


// ============================================================
// عند فتح الصفحة
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudents();

        updateAchievements();

        updateAdminStats();


        const videoCourseSelect =
            document.getElementById(
                "videoCourseSelect"
            );


        if (videoCourseSelect) {

            videoCourseSelect.addEventListener(
                "change",
                loadVideoLessons
            );

        }

    }
);


// ============================================================
// جعل الدوال متاحة لأزرار HTML
// ============================================================

window.switchView = switchView;
window.openCourse = openCourse;
window.closeCourse = closeCourse;
window.openCoursePage = openCoursePage;
window.startLesson = startLesson;
window.completeLesson = completeLesson;
window.startLessonQuiz = startLessonQuiz;
window.handleAddStudent = handleAddStudent;
window.deleteStudent = deleteStudent;
window.showAdminMessage = showAdminMessage;
window.openVideoManager = openVideoManager;
window.closeVideoManager = closeVideoManager;
window.saveLessonVideo = saveLessonVideo;
window.loadVideoLessons = loadVideoLessons;