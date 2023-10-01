import { SignUp } from "@clerk/clerk-react";

export default function RegisterPage() {


  const hours = new Date().getHours()

  return (
    <div className="flex w-full min-h-[100vh] items-center justify-center bg-[#3c3e52]">
      <SignUp 
      afterSignUpUrl={`/register/account/${hours}`}
      routing="path"
      path="/register"
      />
    </div>
  );
}
