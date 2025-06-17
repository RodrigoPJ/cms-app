import type { ProfileInfoComponent } from "../utils/types/components-interface";

export default function ProfileInfo({
  email,
  firstName,
  accountType,
}: ProfileInfoComponent) {
  return (
    <>
      <h1 className="text-2xl m-3 text-center font-bold">Account Settings</h1>
      {/* Personal Info */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title text-xl">Profile Information</h2>
          <div className="flex ">
            <div>
            <p className="font-bold text-lg">First Name</p>
            <p className="text-lg text-blue-600">{firstName}</p>
            <p className="font-bold text-lg">Email</p>
            <p className="text-lg text-blue-600">{email}</p>
          </div>
          <div>
            <p className="font-bold text-lg"> Account Type</p>
            <p className="text-lg text-red-600">{accountType}</p>
          </div>

          </div>
          
          <button className="btn btn-tertiary mt-4 w-fit">Edit</button>
        </div>
      </div>
    </>
  );
}
