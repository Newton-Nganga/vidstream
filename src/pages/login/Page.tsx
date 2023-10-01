
import {SignIn} from "@clerk/clerk-react";
import InnerPage from "@/components/InnerPages/InnerPages";
export default function LoginPage(){
    return (<InnerPage title="My Profile">
        <section className="section">
          <div className="flex w-full min-h-[100vh] items-center justify-center  bg-[#3c3e52]">
            <SignIn/>
            </div>
        </section>
    </InnerPage>
    )
    
    
}