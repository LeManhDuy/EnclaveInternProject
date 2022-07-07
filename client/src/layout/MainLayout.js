import React, { useEffect } from "react"
// import { useDispatch } from "react-redux"
import "./MainLayout.css"

// import TopicService from "../config/service/TopicService"
import Header from "../common/Header/Header"
import Footer from "../common/Footer/Footer"
// import ScrollToTop from "../lib/ScrollToTop/ScrollToTop"
// import { isMobile } from "react-device-detect"
// import { setTopics } from "../config/redux/ActionCreators"

const MainLayout = ({ children }) => {
//   const dispatch = useDispatch()

//   useEffect(() => {
//     getTopicsByDeletedFalse()
//   }, [])

//   const getTopicsByDeletedFalse = () => {
//     TopicService.getTopicsByDeletedFalse().then((res) => {
//       dispatch(setTopics(res))
//     })
//   }
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout