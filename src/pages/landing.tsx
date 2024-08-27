import AttractiveFeed from "../components/attractiveFeed"
import Navbar from "../components/navbar"
import SecondLanding from "../components/secondLandingComp"
import autolayout from '../assets/Auto Layout Horizontal.png'
import TopTier from "../components/toptier"
import Comments from "../components/comments"
import Subscribe from "../components/Subscribe"
import Footer from "../components/footer"


const Landing = () => {
  return (
    <div className="bg-gradient-to-l overflow-x-hidden from-blue-950 to-black w-full h-full lg:h-full sm:h-full">
        <Navbar/>
        <AttractiveFeed/>
        <SecondLanding/>
        <img src={autolayout} alt="" className="sm:w-[500px] w-72 mt-14 sm:mt-16 ml-auto" />
        <TopTier/>
        <Comments/>
        <Subscribe/>
        <Footer/>
    </div>
  )
}

export default Landing