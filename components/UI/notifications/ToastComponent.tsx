import Image from "next/image";
import toast, { Toast } from "react-hot-toast";

// react-hot-toast toast object type

type Props = {
  toastObject: Toast;
  children: React.ReactNode;
  error?: boolean;
};

export default function ToastComponent({
  toastObject,
  children,
  error = false,
}: Props) {
  return (
    <div
      className={`${
        toastObject.visible ? "animate-enter" : "animate-exit"
      } max-w-md w-full bg-white  shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center ">
          {error && (
            <span className="text-bold text-red-600 mr-2 text-center">
              ⚠️ Error
            </span>
          )}
          {/* content start */}
          {false && (
            <>
              <div className="flex-shrink-0 pt-0.5">
                <Image
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                  width="32"
                  height="32"
                  alt="User"
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">
                  Emilia Gates
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Sure! 8:30pm works great!
                </p>
              </div>
            </>
          )}
          {children}
          {/* content end */}
        </div>
      </div>
      {/* close button column */}
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(toastObject.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
