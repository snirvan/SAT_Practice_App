import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

// import {
//     CircularProgressbar,
//     buildStyles
//   } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

type Problem = {
  _id: string;
  title: string;
  correctAnswer: string;
};

type User = {
    name: string;
    image: string;
};

type ProgressMap = Record<string, 'Not Started' | 'Completed'>;
// type ProgressMap = Record<string,{answer?: string;}>;

export default function HomePage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/problems', {
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/';
        }
        return res.json();
      })
      .then(data => {
        setProblems(data.problems);
        setProgress(data.userProgress);
        setUser(data.user)
        console.log("Profile image URL:", data.user.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch problems:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !user) return <p className="text-center mt-10">Loading...</p>

  const totalProblems = problems.length;
//   const completedCount = problems.filter(p => progress[p._id]?.answer === p.correctAnswer).length;
  const completedCount = problems.filter(p => progress[p._id] === 'Completed').length;
  const completionPercent = totalProblems === 0 ? 0 : Math.round((completedCount / totalProblems) * 100);

  return (
    <div className="bg-[#f0f6ff] min-h-screen w-full flex justify-center px-4 py-10">
  {/* Responsive Container */}
  <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6">
    
    {/* Left column becomes stacked on small screens */}
    <div className="flex flex-col gap-6 w-full md:w-[320px]">
      {/* Welcome Box */}
      {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">Welcome, Saksham!</h2>
        <p className="text-sm text-gray-600 mt-1">Ready to keep practicing?</p>
      </div> */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            {/* <Image
                src={user.image} 
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full object-cover border-3 border-blue-600"
            /> */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.name}!</h2>
                <p className="text-sm text-gray-600 mt-1">Ready to keep practicing?</p>
            </div>
        </div>
        
      {/* Progress Card */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-yellow-50 rounded-t-lg px-6 py-4">
          <h3 className="text-lg font-bold text-[#1a1a2e]">Progress</h3>
        </div>
        <div className="px-6 py-6 flex items-center gap-6">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-[10px] border-yellow-100 border-t-yellow-400 text-yellow-500 font-bold text-lg">
            {completionPercent}%
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800">{completedCount} / {totalProblems}</p>
            <p className="text-gray-500 text-sm">Problems Solved</p>
          </div>
        </div>
      </div>
    </div>

    {/* Problem List */}
    <div className="flex-1 bg-white rounded shadow-md">
        <div className="bg-blue-500 rounded-t-lg px-6 py-4">
            <h1 className="text-3xl font-bold text-white px-1 py-3">Problem List</h1>
        </div>
      <ul className="divide-y">
        {problems.map((problem, index) => {
        //   const userAnswer = progress[problem._id]?.answer;
        //   const isCorrect = userAnswer === problem.correctAnswer;
          
        //   let bgColor = 'bg-white';
        //   if (userAnswer != null) {
        //     bgColor = isCorrect ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200';
        //   }
        const isCompleted = progress[problem._id] === 'Completed';
        // const bgColor = isCompleted ? 'bg-green-100 hover:bg-green-200' : 'bg-white hover:bg-gray-200';
          return (
            <li
              key={problem._id}
              className={`flex items-center justify-between px-6 py-3 text-sm ${
                isCompleted ? 'bg-green-100 hover:bg-green-200' : 'bg-white hover:bg-gray-200'
              } cursor-pointer`}
            >
              <Link
                href={`/problems/${problem._id}`}
                className="flex gap-4 items-center w-full"
              >
                <span className="font-semibold text-gray-700">Q{index + 1})</span>
                <span className="font-bold text-md text-gray-800">{problem.title}</span>
              </Link>
            </li>

            // <li
            //     key={problem._id}
            //     className={`flex items-center justify-between px-6 py-3 text-sm ${bgColor} cursor-pointer`}
            // >
            //     <Link
            //         href={`/problems/${problem._id}`}
            //         className="flex gap-4 items-center w-full"
            //     >
            //         <span className="font-semibold text-gray-700">Q{index + 1})</span>
            //         <span className="font-bold text-md text-gray-800">{problem.title}</span>
            //     </Link>
            // </li>
          );
        })}
      </ul>
    </div>
  </div>
</div>


  );
}
