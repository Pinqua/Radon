import { useSession } from "next-auth/client";
import Skeleton from "react-loading-skeleton";

function Profile() {
  const [session] = useSession();

  return (
    <>
      <div className="heightFix">
        <div className="max-w-screen-xl mx-auto py-20 space-y-10">
          <h3 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
            Profile
          </h3>
          <div className="space-y-4 font-medium">
            {session ? (
              <img
                src={session?.user?.image || "/img/profile_pic.svg"}
                loading="lazy"
                alt="pic"
                width="80"
                height="80"
                className="object-contain w-24 h-24 rounded-full hover:shadow-md"
              />
            ) : (
              <Skeleton circle={true} width={80} height={80} />
            )}
            <p>
              {session ? (
                <>
                  <span className="font-semibold">Name - </span>
                  {session?.user?.name}
                </>
              ) : (
                <Skeleton />
              )}
            </p>
            <p>
              {session ? (
                <>
                  <span className="font-semibold">Email - </span>
                  {session?.user?.email}
                </>
              ) : (
                <Skeleton />
              )}
            </p>
            <p className="font-medium text-xl pt-8 text-blue-light">
              "Whoever said money can't buy happiness didn't know where to
              shop".
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
