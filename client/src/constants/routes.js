import Home from "../page/Home/Home"
// import EventList from "../page/EventList/EventList"
// import Information from "../page/Information/Information"
// import QuestionList from "../page/QuestionList/QuestionList"
// import MyQuestions from "../page/MyQuestion/MyQuestions"
// import QuestionForm from "../page/QuestionForm/QuestionForm.js"
// import ProfileDetail from "../page/ProfileDetail/ProfileDetail"
// import EventDetail from "../page/EventDetail/EventDetail"
// import TopicDetail from "../page/TopicDetail/TopicDetail"
// import EmailVerification from "../page/EmailVerification/EmailVerification"
// import ForgotPassword from "../page/ForgotPassword/ForgotPassword"
// import ResetPassword from "../page/ResetPassword/ResetPassword"
// import VotingCongress from "../page/VotingCongress/VotingCongress"

const ROUTES = {
  HOME_PAGE: {
    path: "/",
    isPrivate: false,
    component: Home
  },
//   EVENTS_PAGE: {
//     path: "/events",
//     isPrivate: false,
//     component: EventList
//   },
//   INFORMATION_PAGE: {
//     path: "/information",
//     isPrivate: false,
//     component: Information
//   },
//   QUESTIONS_PAGE: {
//     path: "/questions",
//     isPrivate: false,
//     component: QuestionList
//   },

//   CREATE_QUESTION_PAGE: {
//     path: "/create-question",
//     isPrivate: true,
//     component: QuestionForm
//   },

//   EDIT_QUESTION_PAGE: {
//     path: "/edit-question/:id",
//     isPrivate: true,
//     component: QuestionForm
//   },

//   MY_QUESTIONS_PAGE: {
//     path: "/my-questions",
//     isPrivate: true,
//     component: MyQuestions
//   },

//   PROFILE_DETAIL_PAGE: {
//     path: "/profile-detail",
//     isPrivate: true,
//     component: ProfileDetail
//   },

//   TOPIC_DETAIL_PAGE: {
//     path: "/topic-detail/:id",
//     isPrivate: false,
//     component: TopicDetail
//   },

//   EVENT_DETAIL_PAGE: {
//     path: "/event-detail/:id",
//     isPrivate: false,
//     component: EventDetail
//   },

//   EMAIL_VERIFICATION_PAGE: {
//     path: "/active-email",
//     isPrivate: false,
//     component: EmailVerification
//   },

//   FORGOT_PASSWORD_PAGE: {
//     path: "/forgot-password",
//     isPrivate: false,
//     component: ForgotPassword
//   },

//   RESET_PASSWORD_PAGE: {
//     path: "/reset-password",
//     isPrivate: false,
//     component: ResetPassword
//   },

//   VOTING_CONGRESS_PAGE: {
//     path: "/votes",
//     isPrivate: false,
//     component: VotingCongress
//   },

  NOT_FOUND_PAGE: {
    path: "*",
    component: Home,
    isPrivate: false
  }
}

export default ROUTES
