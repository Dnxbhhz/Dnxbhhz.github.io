import { Marquee3D } from './components/Techs'
import Intro from './components/Intro'

export default function Home() {
  return (
    <div className="h-full px-4 w-full flex flex-row">
      <div className="w-1/2 h-full relative flex items-center justify-center">
        {/* {背景色块} */}
        <Intro></Intro>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-300 opacity-40 blur-2xl"></div>
      </div>
      <Marquee3D></Marquee3D>
    </div>
  )
}
