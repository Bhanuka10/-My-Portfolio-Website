import { getImagePath } from '../utils/imagePaths';

const projectsData = [
  {
    id: 1,
    title: "Personalized Learning Web Application",
    description: "Personalized Learning Web Application designed to help learners become experts in their chosen field. The system analyzes user profiles such as educational background, skills, and learning goals and recommends the most relevant online courses and resources.",
    image: getImagePath("assets/Cpstone/Screenshot (161).png"),
    o_image:[
      getImagePath("assets/Cpstone/Screenshot (166).png"),
      getImagePath("assets/Cpstone/Screenshot (167).png"),
      getImagePath("assets/Cpstone/Screenshot (162).png"),
      getImagePath("assets/Cpstone/Screenshot (165).png"),
      getImagePath("assets/Cpstone/Screenshot (163).png"),
      getImagePath("assets/Cpstone/Screenshot (164).png"),
      getImagePath("assets/Cpstone/Screenshot (161).png")
    ],

    indetails:"A personalized learning platform designed to guide learners toward becoming experts in their chosen field. The system intelligently analyzes each user’s profile including their educational background, existing skills, learning preferences, and career goals to create a tailored learning journey that adapts to their needs. Using AI-powered recommendations, the platform curates the most relevant courses, video tutorials, and resources from trusted online sources. By integrating with the YouTube API, Skill Forge filters and delivers only high-quality educational content based on engagement factors like views, likes, popularity, and duration, ensuring learners get the best possible material.Learners are supported with an interactive AI chatbot (powered by the Gemini API) that engages in conversations, clarifies goals, and refines course suggestions. The system further enhances the experience with progress tracking dashboards, helping users visualize their growth, track completed lessons, and stay motivated through milestones.Beyond individual learning, Skill Forge fosters a collaborative community where users can connect, share knowledge, and support one another in their learning journey.Built with a modern tech stack React.js for the frontend, Firebase for backend services and real-time data, and AI/ML integration via Gemini API the platform delivers a smooth, responsive, and intelligent experience across both web and mobile.In short, Skill Forge transforms scattered online resources into a structured, goal driven roadmap, empowering learners to move confidently from beginner to expert in their chosen domain.",
    techStack: ["React", "Firebase", "JavaScript","HTML","CSS","Gemini API","git",],
    prompt:"I took the lead role in guiding the team, managing tasks, and ensuring smooth communication and collaboration throughout the project. I coordinated work distribution, resolved technical challenges, and made sure that deadlines were consistently met. In addition, I designed the complete user interface in Figma, focusing on creating a visually appealing and user-friendly experience. I also implemented the AI-driven recommendation system that analyzes user profiles to suggest personalized learning resources and developed the roadmap generator that provides structured learning paths from beginner to expert level."+

"Furthermore, I integrated the YouTube Data API to fetch, filter, and display educational playlists based on relevance, popularity, and user needs. I also created an interactive chatbot feature capable of understanding user goals and recommending suitable learning resources accordingly. Working across both frontend and backend, I ensured seamless integration of all modules and maintained the system’s consistency, performance, and scalability throughout development.",
    link: "https://github.com/Bhanuka10/Capstone"
    
  },
  {
    id: 2,
    title: "Hostel Management System",
    description: "A Laravel-based Hostel Management System that streamlines operations by managing student registration, room allocation, fee tracking, and staff records. It provides administrators with reporting and payment tools, while students can easily view their details, reducing manual work and improving efficiency.",
    image: getImagePath("assets/Hostel_management_System/first one(1).png"),

    o_image:[
      getImagePath("assets/Hostel_management_System/Adding Complains page(8).png"),
      getImagePath("assets/Hostel_management_System/Adding Hostels details(13).png"),
      getImagePath("assets/Hostel_management_System/Adding Room details (9).png"),
      getImagePath("assets/Hostel_management_System/Admin login page(4).png"),
      getImagePath("assets/Hostel_management_System/Admin pannel dashboard(10).png"),
      getImagePath("assets/Hostel_management_System/admin pannel romm(12).png"),
      getImagePath("assets/Hostel_management_System/Admin pannel search(11).png"),
      getImagePath("assets/Hostel_management_System/Edit profile details (7).png"),
      getImagePath("assets/Hostel_management_System/first one(1).png"),
      getImagePath("assets/Hostel_management_System/Messaging page(14).png"),
      getImagePath("assets/Hostel_management_System/Read Messages (15).png"),
      getImagePath("assets/Hostel_management_System/Register page(2).png"),
      getImagePath("assets/Hostel_management_System/See complains page(16).png"),
      getImagePath("assets/Hostel_management_System/SignIn page(3).png"),
      getImagePath("assets/Hostel_management_System/User profile page (5).png"),
      getImagePath("assets/Hostel_management_System/User profile(6).png")
    ],

    techStack: ["Laravel", "PHP", "MySQL", "Blade", "HTML", "CSS", "JavaScript","git"],

    indetails:" A Laravel-based Hostel Management System designed to automate and simplify hostel administration processes. The system covers core functionalities such as student registration, room allocation, fee collection, staff management, and record keeping, minimizing the reliance on manual paperwork.Administrators are provided with powerful tools, including automated reporting, payment tracking, and occupancy monitoring, allowing them to make data-driven decisions and ensure smooth hostel operations. Staff details, duty assignments, and payroll can also be maintained within the system for better organization.For students, the platform offers a self-service portal where they can view personal details, room information, payment status, and fee history. Notifications and reminders about due payments or announcements can also be sent directly through the system, improving communication between hostel management and residents.By digitizing these workflows, the system enhances efficiency, reduces errors, increases transparency, and saves significant administrative time, creating a seamless hostel management experience for both staff and students.",

    prompt:"I led the project team by assigning tasks, coordinating sprints, facilitating daily standups, and resolving technical blockers to ensure all milestones and deadlines were successfully met. I designed and implemented the Laravel-based backend architecture, including RESTful APIs, authentication, and role-based access control, while defining the business logic for room allocation, fee processing, and staff management. I modeled and optimized the database schema for students, rooms, payments, and staff data, ensuring scalability and performance. Additionally, I developed the automated room allocation engine that efficiently handles capacity, roommate preferences, and conflict resolution, reducing the need for manual intervention. I integrated payment and billing modules with online payment hooks, transaction tracking, and automated reminders for overdue fees. To support data-driven decisions, I also created admin dashboards and automated reports for occupancy, fee collection, and payroll summaries."+

"On the design and user experience side, I created the complete application interface in Figma, ensuring a visually consistent and intuitive experience for both administrators and students. I implemented a self-service student portal where residents can view personal profiles, payment history, and room details, as well as submit repair or leave requests. Furthermore, I integrated in app and email/SMS notification systems for reminders and announcements, improving communication between management and residents. I also built staff management and payroll modules to handle HR-related operations efficiently. To ensure system security, I implemented input validation, CSRF protection, secure password storage, and strict role based permissions. Throughout development, I maintained quality through unit and integration testing, end-to-end validation, and bug fixes. Finally, I containerized the application, set up automated deployments, and prepared developer and user documentation while conducting training sessions for hostel staff to ensure a smooth handover and adoption of the system.",
    link: "https://github.com/Bhanuka10/Hostel-Management-System-Laravel-"
  },


  {
  id: 3,
  title: "Latest Movies Library",
  description: "A React-based web application that fetches and displays popular movies using a movie API. The app presents movie posters, titles, and details in a responsive layout with smooth navigation. It helps users explore trending films in an interactive and visually engaging way.",
  image: getImagePath("assets/Movie-Hub/Screenshot (306).png"),
  o_image:[
    getImagePath("assets/Movie-Hub/Screenshot (306).png"),
    getImagePath("assets/Movie-Hub/Screenshot (307).png"),
    getImagePath("assets/Movie-Hub/Screenshot (308).png"),
    getImagePath("assets/Movie-Hub/Screenshot (309).png")
  ],
  indetails:"A React-powered web application designed to fetch and showcase popular movies using a third-party movie API. The system dynamically retrieves real-time movie data and presents it through a visually engaging, responsive interface. Users can explore trending films with features such as movie posters, titles, release dates, and descriptions, all arranged in a clean grid layout.The application emphasizes smooth navigation and interactivity, allowing users to seamlessly browse through movie collections. Built with React.js, JavaScript, HTML, and CSS, it ensures fast rendering, reusable components, and a mobile-friendly design.By combining API integration with modern frontend development, this project demonstrates the ability to create data-driven applications that deliver both functionality and a great user experience.",
  techStack: ["React", "JavaScript", "HTML", "CSS", "API Integration", "Git"],
  prompt:"I took responsibility for planning, organizing, and executing the project timeline while ensuring smooth collaboration and code consistency throughout development. I led the frontend development using React.js, building the entire interface with reusable components for scalability and maintainability. By implementing React hooks such as useState and useEffect, I enabled dynamic fetching and rendering of real-time movie data from a third-party API. I designed a modern, responsive layout focused on user engagement and intuitive navigation, ensuring a visually appealing browsing experience. The interface was structured using a grid-based design, displaying key movie details like posters, titles, release dates, and descriptions in a clean and accessible format."+

"I integrated the movie API to deliver trending and popular films while handling asynchronous data loading, errors, and performance optimizations for a smooth user experience. Interactive features such as hover effects, transitions, and filtering options were added to enhance usability and engagement. I optimized rendering performance using React’s virtual DOM and conditional components, minimizing unnecessary re-renders and API calls. The entire application was styled using responsive CSS techniques to ensure consistency across devices. Finally, I conducted comprehensive testing and debugging to ensure data accuracy and cross-browser compatibility, followed by deployment setup, asset optimization, and documentation for seamless maintenance and scalability.",
  link: "https://github.com/Bhanuka10/Movies-collection"
},
{
  id: 4,
  title: "Expense Tracker System",
  description: "A MERN stack-based expense management system that enables users to track income and expenses with real-time updates and data persistence. It provides a secure backend, an intuitive frontend interface, and insightful financial overviews through charts and categorized summaries.",
  image: getImagePath("assets/Expenses tracker/Screenshot (314).png"),
  o_image: [
    getImagePath("assets/Expenses tracker/Screenshot (315).png"),
    getImagePath("assets/Expenses tracker/Screenshot (316).png")
    
  ],
  indetails: "The Expense Tracker System is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to simplify personal financial management. It allows users to securely add, edit, and delete transactions while automatically calculating total income, expenses, and remaining balance. All data is stored in a MongoDB database through an Express and Node backend, ensuring persistence and security. The frontend, built in React, offers a modern and responsive dashboard that displays categorized transactions, charts for spending patterns, and a clean overview of financial activity. Real-time updates, RESTful API integration, and authentication features make the system reliable and user-friendly. This project emphasizes both frontend interactivity and backend efficiency, showcasing complete full-stack development capability.",
  techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API", "JavaScript", "CSS", ],
  prompt: "I was responsible for designing, developing, and integrating both the frontend and backend of the Expense Tracker System using the MERN stack. On the frontend, I used React.js to create reusable components for forms, transaction lists, and summary dashboards, ensuring a responsive and intuitive user experience. I implemented dynamic state management using React hooks such as useState and useEffect to update balances and transaction lists in real time. On the backend, I built RESTful APIs using Node.js and Express.js to handle CRUD operations securely and efficiently. MongoDB was used as the database to store user transactions and categories with schema validation and indexing for fast data retrieval." +

  "I implemented routes for adding, deleting, and updating transactions while maintaining data consistency and validation at both frontend and backend levels. Additionally, I focused on authentication and middleware logic to ensure secure access and data privacy. The system also includes data visualization features like spending distribution charts to help users analyze their financial patterns. Styling was handled using modern CSS techniques, maintaining a clean and minimal layout. Finally, I deployed and tested the system to ensure performance, scalability, and cross-browser compatibility. This project demonstrates proficiency in full-stack development, API integration, and end-to-end system design using the MERN stack.",
  link: "https://github.com/Bhanuka10/MERN-Expense-Tracker-"
},
{
  id: 5,
  title: "Interactive Brand Website",
  description: "An engaging, interactive website built using HTML, CSS, and JavaScript that showcases various brands and their shop details. Designed with smooth navigation, hover effects, and responsive layouts to provide a visually appealing browsing experience.",
  image: getImagePath("assets/Bar site/Screenshot (194).png"),
  o_image: [
    getImagePath("assets/Bar site/Screenshot (196).png"),
    getImagePath("assets/Bar site/Screenshot (197).png"),
    getImagePath("assets/Bar site/Screenshot (198).png"),
    getImagePath("assets/Bar site/Screenshot (199).png")
  ],
  indetails: "This project is my very first website a fully interactive platform that displays brand details and shop information in an elegant and user-friendly layout. Built with pure HTML, CSS, and JavaScript, it allows users to explore different brands through smooth transitions, animations, and clickable sections. Each brand section includes shop details, product highlights, and styled visual components to maintain a modern and professional appearance. The site emphasizes clean structure, responsive design, and basic interactivity, laying the foundation for my journey into web development.",
  techStack: ["HTML", "CSS", "JavaScript"],
  prompt: "As my very first web project, I took responsibility for designing and developing the entire site structure using HTML and CSS. I implemented JavaScript to add interactivity, such as hover animations, clickable brand sections, and dynamic content displays. The website highlights various brands and their associated shop details with a focus on clean presentation and easy navigation. Through this project, I learned the fundamentals of web structure, responsive design, and user interface interaction. It marked the beginning of my journey as a web developer and helped me build a strong foundation in front-end development concepts.",
  link: "https://github.com/Bhanuka10/Bar_website"
},
{
  id: 6,
  title: "School Management System",
  description: "A Laravel-powered web application designed to manage school operations efficiently. It streamlines student registration, teacher management, class scheduling, and attendance tracking through a secure and user-friendly dashboard.",
  image: getImagePath("assets/School management/images.jpeg"),
  o_image: [
   
  ],
  indetails: "The School Management System is a dynamic web application built using the Laravel framework to simplify and automate key school management tasks. It includes modules for managing students, teachers, classes, attendance, and subjects within a single platform. The system provides role-based access, allowing administrators, teachers, and students to interact through tailored dashboards. Built with Laravel Blade templates, it ensures a clean and responsive UI, while Eloquent ORM manages efficient database communication. Features such as CRUD operations, data validation, and authentication ensure security and reliability. The project emphasizes structured backend logic, smooth navigation, and a scalable architecture suitable for educational institutions.",
  techStack: ["Laravel", "PHP", "MySQL", "Blade Templates", "HTML", "CSS", "JavaScript"],
  prompt: "I developed this full-featured web application using the Laravel framework, handling both backend logic and frontend integration. I designed the database schema using MySQL and implemented models, controllers, and routes to manage core operations such as student registration, teacher allocation, and attendance recording. Using Laravel’s authentication system, I added secure login and role-based access control for different user types. I created Blade template views for a clean, consistent, and responsive interface. The project also includes validation, session handling, and CRUD functionalities for managing academic data efficiently. Through this system, I strengthened my understanding of MVC architecture, Laravel routing, and backend web application development.",
  link: "https://github.com/Yasithb/EduBridge"
}



];
const UisData=[
  {
    id: 1,
    title: "Capstone Interface Design",
    description: "The UI/UX design of Skill Forge was created using Figma, focusing on delivering a clean, modern, and user-friendly experience for learners. The design process followed a user-centered approach, ensuring intuitive navigation and accessibility across devices",

    indetails:"The UI/UX design of Skill Forge was created using Figma, focusing on delivering a clean, modern, and user friendly experience for learners. The design process followed a user-centered approach, ensuring intuitive navigation and accessibility across devices. Key features include a personalized dashboard, course catalog with filtering options, progress tracking, and interactive elements to enhance engagement. The color scheme and typography were chosen to create a visually appealing interface that aligns with the brand identity. Overall, the design aims to provide an enjoyable learning journey for users.",

    image: getImagePath("assets/UI/Capstone/Desktop - 1.png"),
   
    techStack: ["Figma"],
    o_image:[
      getImagePath("assets/UI/Capstone/Desktop - 1.png"),
      getImagePath("assets/UI/Capstone/Desktop - 3.png"),
      getImagePath("assets/UI/Capstone/Desktop - 4.png"),
      getImagePath("assets/UI/Capstone/Desktop - 5.png"),
      getImagePath("assets/UI/Capstone/Desktop - 8.png")
    ],
    explore_link: "https://github.com/Bhanuka10/UI-Designs"
  },

  {
    id: 3,
    title: "Wet",
    description: "I created the UI/UX design for the WET Hospital system in Figma, ensuring a clear and professional interface for both patients and administrators. The design includes pages such as the home page, apply for medicine, doctor dashboard all connected with interactive prototypes to reflect a smooth hospital workflow.",
    indetails:"The UI/UX design for the WET Hospital system was meticulously crafted using Figma to ensure a clear and professional interface for both patients and administrators. The design encompasses key pages such as the home page, application for medicine, and doctor dashboard, all interconnected with interactive prototypes to facilitate a seamless hospital workflow. Emphasizing usability and accessibility, the design incorporates intuitive navigation, consistent color schemes, and clear typography to enhance user experience. The goal was to create an efficient and user-friendly platform that meets the needs of its diverse users while maintaining a cohesive visual identity.",
    o_image:[
      getImagePath("assets/UI/wet/Front page-1.png"),
      getImagePath("assets/UI/wet/Front page.png"),
      getImagePath("assets/UI/wet/Home page.png")
    ],
    
    image: getImagePath("assets/UI/wet/Home page.png"),
    techStack: ["Figma"],
    explore_link: "https://github.com/Bhanuka10/Mobile-App-UI-Kit"
  },

  {
    id: 4,
    title: "Learning web",
    description: "A modern and user-friendly UI/UX design for a learning web application, created using Figma. The design focuses on intuitive navigation, clean layouts, and engaging visuals to enhance the user experience for learners.",
    indetails:"A modern and user-friendly UI/UX design for a learning web application, created using Figma. The design focuses on intuitive navigation, clean layouts, and engaging visuals to enhance the user experience for learners. Key features include a personalized dashboard, course catalog with filtering options, progress tracking, and interactive elements to boost engagement. The color scheme and typography were carefully selected to create a visually appealing interface that aligns with the brand identity. Overall, the design aims to provide an enjoyable and effective learning journey for users.",
    o_image:[getImagePath("assets/UI/class/Desktop - 2.png")],
    image: getImagePath("assets/UI/class/Desktop - 2.png"),
    techStack: ["Figma"],
    explore_link: "https://github.com/Bhanuka10/Mobile-App-UI-Kit" 
  },
  {
  id: 2,
  title: "Soul Sync – Emotional AI Companion App",
  description: "A mobile app UI/UX design for Soul Sync, an AI-powered emotional companion that provides empathy, support, and connection through realistic avatars and voices.",
  indetails: "Soul Sync’s Figma design showcases a sleek, emotionally engaging interface for an AI companion mobile app. The design includes key screens such as onboarding, emotion setup, avatar and voice selection, chat interface, and digital twin creation. Each element focuses on emotional comfort, simplicity, and personalization. Soft gradients, warm tones, and fluid layouts were used to evoke calmness and trust, while smooth transitions enhance user engagement. The design ensures users feel connected, supported, and safe while interacting with their AI companion.",
  o_image: [
    getImagePath("assets/UI/HackX/Register.jpg"), 
    getImagePath("assets/UI/HackX/Register2.jpg"), 
    getImagePath("assets/UI/HackX/Avetar style selector3.jpg"), 
    getImagePath("assets/UI/HackX/voice selector.png"), 
    getImagePath("assets/UI/HackX/Avetar style selector.jpg"), 
    getImagePath("assets/UI/HackX/Avetar style selector2.jpg"), 
    getImagePath("assets/UI/HackX/Avetar style selector3.jpg"), 
    getImagePath("assets/UI/HackX/Avetar style selector4.jpg"), 
    getImagePath("assets/UI/HackX/Emotions.jpg"), 
    getImagePath("assets/UI/HackX/Help Center.jpg"), 
    getImagePath("assets/UI/HackX/Help Center1.jpg"), 
    getImagePath("assets/UI/HackX/Login.jpg"), 
    getImagePath("assets/UI/HackX/Login2.jpg"), 
    getImagePath("assets/UI/HackX/Main chat interface.png"), 
    getImagePath("assets/UI/HackX/onboding.png")
  ],
  image: getImagePath("assets/UI/HackX/onboding.png"),
  techStack: ["Figma"],
  explore_link: "https://www.figma.com/file/your-soul-sync-design-link"
}

]

export default projectsData;
export { UisData };
