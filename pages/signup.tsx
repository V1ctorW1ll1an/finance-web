import { MobilePayImage } from '../components/MobilePayImage'
import { SignupForm } from '../components/SignUpForm'

export default function Signup() {
  return (
    <main className="flex items-center justify-center w-screen h-screen flex-wrap bg-gray-50">
      <div className="h-[613px] max-w-[485px] w-full flex justify-center items-center">
        <SignupForm />
      </div>
      <div className="h-[613px] max-w-[485px] w-full flex justify-center items-center">
        <MobilePayImage />
      </div>
    </main>
  )
}