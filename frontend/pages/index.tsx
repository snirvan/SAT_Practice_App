// export default function LoginPage() {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
//       <div className="text-center space-y-6 bg-white p-8 rounded shadow-md">
//         <h1 className="text-3xl font-bold">Welcome to SATApp</h1>
//         <p className="text-gray-700">Sign in to start practicing SAT problems</p>
//         <a
//           href="http://localhost:3001/auth/google"
//           className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Login with Google
//         </a>
//       </div>
//     </main>
//   );
// }

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f6ff] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-blue-600">SAT Practice App</h1>
        <p className="text-gray-600">login or sign up below to get started!</p>

        <a
          href="http://localhost:3001/auth/google"
          className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M533.5 278.4c0-17.4-1.5-34-4.3-50.2H272.1v95.1h146.9c-6.4 34.6-25.3 63.9-53.6 83.6v69.4h86.7c50.7-46.7 81.4-115.6 81.4-197.9z"
              fill="#4285f4"
            />
            <path
              d="M272.1 544.3c72.9 0 134.1-24.1 178.7-65.5l-86.7-69.4c-24.1 16.1-55 25.4-92 25.4-70.8 0-130.8-47.9-152.3-112.3H30.7v70.6c44.5 87.8 135.2 151.2 241.4 151.2z"
              fill="#34a853"
            />
            <path
              d="M119.8 322.5c-10.1-30-10.1-62.5 0-92.5v-70.6H30.7c-29.5 58.6-29.5 126.8 0 185.4l89.1-70.6z"
              fill="#fbbc04"
            />
            <path
              d="M272.1 107.7c39.7 0 75.4 13.7 103.5 40.7l77.6-77.6C406.1 24.1 344.9 0 272.1 0 165.9 0 75.2 63.4 30.7 151.2l89.1 70.6c21.5-64.3 81.5-112.3 152.3-112.3z"
              fill="#ea4335"
            />
          </svg>
          Login with Google
        </a>

        <p className="text-sm text-gray-500"> By signing up, you agree to the{' '} <a href="#" className="underline text-blue-600">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="underline text-blue-600">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
