$(document).ready(function() {
    // Homepage interactive popup w date/time
    function getGreeting(){
        const Hours = new Date().getHours();
        if (Hours > 17) {
            return "Good Evening, Welcome to Brainiacs!";
        } else if (Hours > 12) {
            return "Good Afternoon, Welcome to Brainiacs!";
        } else if (Hours > 0) {
            return "Good Morning, Welcome to Brainiacs!";
        } else {
            return "Hello, Welcome to Brainiacs!";
        }
    }

    // Gif
    function getGif(){
        const Hours = new Date().getHours();
        if (Hours > 17) {
            return "website-project/images/evening-gif.gif";  // 
        } else if (Hours > 12) {
            return "website-project/images/afternoon-gif.gif";  // 
        } else if (Hours > 0) {
            return "website-project/images/morning-gif.gif";  // 
        }
        return "website-project/images/othert.gif";  
    }

    // Index greeting
    function updatepopup() {
        const now = new Date();

        // Set the greeting message
        document.getElementById("greetingMessage").innerText = getGreeting();

        // Set the formatted date and time in the desired format
        document.getElementById("DateTime").innerText = "Today is " + now.toLocaleDateString("en-GB", { 
                day: 'numeric', month: 'long', year: 'numeric' 
            }) + " and the time is " + now.toLocaleTimeString("en-GB", { 
                hour: '2-digit', minute: '2-digit', hour12: true 
            });

        // Set the greeting image based on time of day
        document.getElementById("greetingimage").src = getGif();

        // Display the popup
        document.getElementById("popup").style.display = "block";
        }

        // Close the popup on click
        $('#closepopup').click(function () {
            $('#popup').hide();
        });
        
        setTimeout(updatepopup, 1000);  // Delays the popup display by 1 second

    // Greyscale toggle with localStorage
    function applyGreyscalePreference() {
        const greyscaleOn = localStorage.getItem("greyscale") === "true";
        if (greyscaleOn) {
            document.body.classList.add("greyscale");
        } else {
            document.body.classList.remove("greyscale");
        }
    }

    // Apply greyscale preference on page load
    applyGreyscalePreference();

    // Greyscale toggle button logic
    $("#greyscale-toggle").click(function () {
        const currentlyOn = $("body").hasClass("greyscale");
        if (currentlyOn) {
            $("body").removeClass("greyscale");
            localStorage.setItem("greyscale", "false");
        } else {
            $("body").addClass("greyscale");
            localStorage.setItem("greyscale", "true");
        }
    });
    
    // Enforce HTTPS
    if (location.protocol !== 'https:') {
        location.replace(`https://${location.hostname}${location.pathname}${location.search}`);
    }

    // Get a cookie by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Cookies and LocalStorage
    let cookiesAccepted = getCookie("cookiesAccepted");

    // Check cookie first, then localStorage as backup
    cookiesAccepted = getCookie("cookiesAccepted") ?? localStorage.getItem("cookiesAccepted");

    // Show banner only if preference is not set
    if (cookiesAccepted === null) {
        console.log("Cookie banner is visible (no preference set)");
        $("#cookie-banner").show();
    } else {
        console.log("Cookie preference found:", cookiesAccepted);
        $("#cookie-banner").hide();
    }

    // Handle the accept button
    $("#accept-cookies").click(function() {
        document.cookie = "cookiesAccepted=true; path=/; Secure; SameSite=Strict; max-age=31536000";
        localStorage.setItem("cookiesAccepted", "true");
        console.log("Cookies Accepted");

        // Hide the cookie banner
        $("#cookie-banner").hide();
    });

    // Handle the reject button
    $("#reject-cookies").click(function() {
        document.cookie = "cookiesAccepted=false; path=/; Secure; SameSite=Strict; max-age=31536000";
        localStorage.setItem("cookiesAccepted", "false");

        // Optionally clear any stored form data when rejected
        localStorage.removeItem("contactName");
        localStorage.removeItem("contactEmail");
        localStorage.removeItem("contactMessage");
        console.log("Cookies Rejected");

        // Hide the cookie banner
        $("#cookie-banner").hide();
    });

    // LocalStorage for form
    function sanitizeInput(input) {
        return $("<div>").text(input).html(); // Prevents XSS by escaping HTML
    }

    // Sanitize the email input
    function sanitizeEmail(input) {
        return $("<div>").text(input).html(); // Prevents XSS by escaping HTML
    }

    // Check if there is any saved form data
    let savedName = sanitizeInput(localStorage.getItem("contactName") || "");
    let savedEmail = sanitizeInput(localStorage.getItem("contactEmail") || "");
    let savedMessage = sanitizeInput(localStorage.getItem("contactMessage") || "");

    // Populate form fields if saved data exists
    $("#name").val(savedName);
    $("#email").val(savedEmail);
    $("#message").val(savedMessage);

    // Save the form data to localStorage when submitted
    $("#name, #email, #message").on("input", function() {
        localStorage.setItem("contactName", sanitizeInput($("#name").val()));
        localStorage.setItem("contactEmail", sanitizeInput($("#email").val()));
        localStorage.setItem("contactMessage", sanitizeInput($("#message").val()));
    });

    // Session Storage (checking if they've already visited ts and cs)
    if (window.location.pathname.includes("terms-and-conditions.html")) {
        if (!sessionStorage.getItem("termsVisited")) {
            sessionStorage.setItem("termsVisited", "true");
            console.log("User visited the Terms and Conditions page.");
        }
    }

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // Contact form validation and popup on submission
    $("#contact-form").submit(function(e) {
        e.preventDefault(); // Prevent form submission

        let name = sanitizeInput($("#name").val());
        let email = sanitizeEmail($("#email").val());
        let message = sanitizeInput($("#message").val());

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (name === "" || email === "" || message === "") {
            alert("Please fill out all required fields.");
            return;
        }

        if (!emailPattern.test(email)) {
            alert("Invalid email address.");
            return;
        }

        $("#success-popup").fadeIn();
        setTimeout(function() {
            $("#success-popup").fadeOut();
            $("#contact-form")[0].reset();
            updateContactCharCount();
        }, 3000);
    });

    $("#close-popup").click(function() {
        $("#success-popup").fadeOut();
        $("#contact-form")[0].reset();
        updateContactCharCount();
    });

    // Update character count for message area in contact form
    function updateContactCharCount() {
        const messageField = $('#message');
        const charCountContact = $('#char-count-contact');
        const maxCharsContact = 500;

        if (messageField.length > 0) {
            let remaining = maxCharsContact - messageField.val().length;
            charCountContact.text(`${remaining} characters remaining`);
        } else {
            console.error("Message field not found!");
        }
    }

    $('#message').on('input', function() {
        updateContactCharCount();
    });

    updateContactCharCount();

    // Index page interactive quiz
    const indexQuizData = [
        {
            question: "What does 'CSS' stand for?",
            options: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Styling System",
                "Colorful Style Syntax"
            ],
            correctAnswer: "Cascading Style Sheets"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: [
                "Mars",
                "Venus",
                "Earth",
                "Jupiter"
            ],
            correctAnswer: "Mars"
        },
        {
            question: "Who wrote the play 'Romeo and Juliet'?",
            options: [
                "William Shakespeare",
                "Charles Dickens",
                "Jane Austen",
                "Mark Twain"
            ],
            correctAnswer: "William Shakespeare"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: [
                "Au",
                "Ag",
                "Pb",
                "Fe"
            ],
            correctAnswer: "Au"
        },
        {
            question: "Which element is the most abundant in the Earth's crust?",
            options: [
                "Oxygen",
                "Silicon",
                "Aluminium",
                "Iron"
            ],
            correctAnswer: "Oxygen"
        }
    ];

    // Function to select a random question
    function getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * indexQuizData.length);
        return indexQuizData[randomIndex];
    }

    // Ensure quiz only loads on index page
    if (document.getElementById("index-quiz-question")) {
        const questionElement = document.getElementById("index-quiz-question");
        const optionsContainer = document.getElementById("index-quiz-options");
        const submitButton = document.getElementById("index-submit-answer");
        const feedbackElement = document.getElementById("index-quiz-feedback");

        // Get a random question
        const selectedQuiz = getRandomQuestion();

        // Display quiz question and options
        questionElement.textContent = selectedQuiz.question;
        optionsContainer.innerHTML = ''; // Clear previous options
        selectedQuiz.options.forEach(option => {
            const optionElement = document.createElement("label");
            optionElement.innerHTML = `
                <input type="radio" name="index-quiz-option" value="${option}">
                ${option}
            `;
            optionsContainer.appendChild(optionElement);
            optionsContainer.appendChild(document.createElement("br"));
        });

        // Handle answer submission
        submitButton.addEventListener("click", function () {
            const selectedOption = document.querySelector("input[name='index-quiz-option']:checked");

    if (selectedOption) { // Check if an answer is selected
                const userAnswer = selectedOption.value;
                const correctAnswer = selectedQuiz.correctAnswer;

                if (userAnswer === correctAnswer) {
                    feedbackElement.classList.remove('quiz-incorrect');
                    feedbackElement.classList.add('quiz-correct');
                    feedbackElement.textContent = 'Correct! 🎉 You are a true Brainiac!';
                } else {
                    feedbackElement.classList.remove('quiz-correct');
                    feedbackElement.classList.add('quiz-incorrect');
                    feedbackElement.innerHTML = `Oops! The correct answer is "${correctAnswer}".`;
                }
            } else {
                feedbackElement.classList.remove('quiz-correct', 'quiz-incorrect');
                feedbackElement.textContent = 'Please select an answer!';
            }
        });
    }
    
    // Update character count for quiz answer field
    function updateQuizCharCount() {
        $("input[data-char-count]").each(function() {
            let maxChars = $(this).data("char-count");
            let remaining = maxChars - $(this).val().length;
            $(`#${$(this).attr("id")}-char-count`).text(`${remaining} characters remaining`);
        });
    }

    // Event listener for typing in quiz input
    $("input[data-char-count]").on("input", function() {
        updateQuizCharCount();
    });

    // Initialise character count
    updateQuizCharCount();

    // About Kelly quiz
    function confettiEffect() {
        let confettiSettings = { target: "confetti-canvas" };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            confetti.clear();
        }, 5000);
    }

    let lastAttemptTime = sessionStorage.getItem("quizLastAttempt") || 0;

    $("#submit-answer").click(function() {
        const currentTime = Date.now();

        if (currentTime - lastAttemptTime < 5000) {
            alert("Please wait a few seconds before trying again.");
            return;
        }

        sessionStorage.setItem("quizLastAttempt", currentTime);

        let answer = sanitizeInput($("#quiz-answer").val().trim().toLowerCase());
        const alphaSpaceRegex = /^[A-Za-z\s]+$/;

        if (!alphaSpaceRegex.test(answer)) {
            $("#quiz-result")
                .removeClass("quiz-correct")
                .addClass("quiz-incorrect")
                .html("❌ Invalid input! Only letters and spaces allowed.");
            return;
        }

        if (answer === "harry potter") {
            $("#quiz-result")
                .removeClass("quiz-incorrect")
                .addClass("quiz-correct")
                .html("🎉 Correct! You are a wizard! 🧙‍♂️");
            confettiEffect();
        } else {
            let spells = [
                "Expelliarmus!",
                "Wingardium Leviosa!",
                "Riddikulus!",
                "Obliviate!",
                "Stupefy!"
            ];
            let randomSpell = spells[Math.floor(Math.random() * spells.length)];
            $("#quiz-result")
                .removeClass("quiz-correct")
                .addClass("quiz-incorrect")
                .html(`❌ Nope! My favourite book is Harry Potter! ${randomSpell}`);
        }

        $("#quiz-answer").val("");
        updateQuizCharCount();
    });

    // Ensure the character count updates on input
    $("input[data-char-count]").on("input", function() {
        updateQuizCharCount();
    });

    // About Sebastian quiz
    function confettiEffectSebastian(targetCanvas) {
        let confettiSettings = { target: targetCanvas };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            confetti.clear();
        }, 5000);
    }

    function sanitizeInput(input) {
        return input.replace(/[^a-zA-Z\s]/g, '');
    }

    function setupQuiz(questionId, correctAnswer, confettiCanvas) {
        let lastAttemptTime = sessionStorage.getItem(`${questionId}-quizLastAttempt`) || 0;

        $(`#${questionId}-submit-answer`).click(function() {
            const currentTime = Date.now();

            if (currentTime - lastAttemptTime < 5000) {
                alert("Please wait a few seconds before trying again.");
                return;
            }

            sessionStorage.setItem(`${questionId}-quizLastAttempt`, currentTime);

            let answer = sanitizeInput($(`#${questionId}-quiz-answer`).val().trim().toLowerCase());
            const alphaSpaceRegex = /^[A-Za-z\s]+$/;

            if (!alphaSpaceRegex.test(answer)) {
                $(`#${questionId}-quiz-result`)
                    .removeClass("quiz-correct")
                    .addClass("quiz-incorrect")
                    .html("❌ Invalid input! Only letters and spaces allowed.");
                return;
            }

            if (answer === correctAnswer.toLowerCase()) {
                $(`#${questionId}-quiz-result`)
                    .removeClass("quiz-incorrect")
                    .addClass("quiz-correct")
                    .html("🎉 Correct! You got it right! 🎬🍕");
                confettiEffectSebastian(confettiCanvas);
            } else {
                let wrongMessages = [
                    "Try again!",
                    "Close, but not quite!",
                    "Nope! Give it another go!",
                    "Not this time!"
                ];
                let randomMessage = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
                $(`#${questionId}-quiz-result`)
                    .removeClass("quiz-correct")
                    .addClass("quiz-incorrect")
                    .html(`❌ ${randomMessage}`);
            }

            $(`#${questionId}-quiz-answer`).val("");

            updateQuizCharCount();
        });
    }

    // Initialise Sebastian quizzes with correct answers
    setupQuiz("quiz-2022", "The Batman", "confetti-canvas");
    setupQuiz("quiz-2024", "Sonic The Hedgehog Three", "confetti-canvas");
    setupQuiz("quiz-food", "Pizza", "confetti-canvas");

    // Array of Eoin's random quotes
    const quotes = [
        { text: '"The only way to do great work is to love what you do."', author: 'Steve Jobs' },
        { text: '"In the middle of difficulty lies opportunity."', author: 'Albert Einstein' },
        { text: '"Life is what happens when you\'re busy making other plans."', author: 'John Lennon' },
        { text: '"Take care of your body, it’s the only place you have to live."', author: 'Jim Rohn' },
        { text: '"Success is not final, failure is not fatal: It is the courage to continue that counts."', author: 'Winston Churchill' },
        { text: '"It does not matter how slowly you go as long as you do not stop."', author: 'Confucius' },
        { text: '"Better to die on your feet than live on your knees."', author: 'Padraig Pearse' }
    ];

    // Function making a random quote
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        return randomQuote;
    }

    // Function changing the quote when its clicked
    function changeQuote() {
        const randomQuote = getRandomQuote();

        // my quote animation
        $('#quote-text').fadeOut(300, function() {
            $(this).text(randomQuote.text).fadeIn(300);
        });

        // my author animation
        $('#author-text').fadeOut(300, function() {
            $(this).text("- " + randomQuote.author).fadeIn(300);
        });
    } 

    // Change quote when the button is clicked
    $('#new-quote-btn').click(function() {
        changeQuote();
    });

    // Change the quote when the page loads
    changeQuote();

    //Sean's quiz
    function confettiEffectSean() {
        let confettiSettings = { target: "confetti-canvas" };
        let confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            confetti.clear();
        }, 5000);
    }
    let quizdata = [
        {
            question: "Where do I work?",
            options: ["Ballyliffin Lodge", "Ballyliffin Hotel", "Grand Central Hotel", "Poundland"],
            correct: "Ballyliffin Hotel"
        },
    ];

    const checkanswer = (e) => {
        let userAnswer = e.target.textContent;

        if (userAnswer === quizdata[0].correct) {
            e.target.classList.add("correct");
            confettiEffectSean("confetti-canvas")
        } else {
            e.target.classList.add("incorrect");
        }

        let alloptions = document.querySelectorAll(".seans-container .option");
        alloptions.forEach(o => {
            o.disabled = true;
        });
    };

    const optionsContainer = document.querySelector(".seans-container .options");
    optionsContainer.innerHTML = '';
    quizdata[0].options.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) => {
            checkanswer(e);
        });

        optionsContainer.appendChild(option);

    //Retry button
        function resetButtonStyles() {
            let allOptions = document.querySelectorAll('.option');
            allOptions.forEach(button => {
                button.classList.remove('correct', 'incorrect');
                button.disabled = false;
                button.classList.add('option');
            });
        }
        document.getElementById('retry').addEventListener('click', resetButtonStyles);
    });//End of sean quiz
    
}); // This is the end of the script.js file.