import InnerPage from "@/components/InnerPages/InnerPages";
import { UserProfile,useUser } from "@clerk/clerk-react";
export default function UserProfilePage() {
  const {isLoaded} = useUser()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkIfClerkIsInitialized = async():Promise<void>=>{
    //check if clerk is initialized && isLoaded === true
    //else await for 100ms then call the while loop again
     while(!isLoaded || !isLoaded == null){
       await new Promise(resolve => setTimeout(resolve,100))
     }
   }
   checkIfClerkIsInitialized()
  return (
    <InnerPage title="My Profile">
      <section className="section">
        <div className="flex w-full min-h-[100vh] items-center  justify-center ">
          <UserProfile />
        </div>
      </section>
    </InnerPage>
  );
}
