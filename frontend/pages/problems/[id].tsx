import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Problem = {
    _id: string;
    title: string;
    question: string;
    options: string[];
    correctAnswer: string,
    explanation: string;
};

export default function ProblemPage() {
    const router = useRouter();
    const { id } = router.query;

    // 🧪 Full debug useEffect to inspect router state
    useEffect(() => {
        console.log("=== ROUTER DEBUG ===");
        console.log("router.isReady:", router.isReady);
        console.log("router.query:", router.query);
        console.log("router.query.id:", router.query.id);
        console.log("router.pathname:", router.pathname);
        console.log("router.asPath:", router.asPath);
    }, [router.isReady]);

    const [problem, setProblem] = useState<Problem | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [result, setResult] = useState<{
        correct: boolean;
        message?: string;
        explanation?: string;
        correctAnswer: string;
    } | null>(null);

    useEffect(() => {
        if (!router.isReady || !id) return;

        fetch(`http://localhost:3001/api/problems/${id}`, {
            credentials: 'include',
        })
            .then(async res => {
                if (res.status === 401) {
                    window.location.href = '/';
                    return;
                }
                const data = await res.json();
                console.log('Fetched problem:', data);
                setProblem(data.problem ?? data);
            })
            .catch(err => console.error('Problem fetch failed:', err));
    }, [router.isReady, id]);

    const handleSubmit = async () => {
        if (!selected) return;

        const res = await fetch(`http://localhost:3001/api/problems/${id}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ answer: selected }),
        });

        const data = await res.json();
        setResult(data.result || data);
    };

    if (!problem) return <p className="p-6">Loading...</p>;

//     return (
//         <div className="bg-[#f0f6ff] min-h-screen w-full flex flex-col">
//           {/* Top Blue Bar */}
//           <div className="bg-[#c6e0ff] text-black px-6 py-4 flex items-center justify-between relative">
//             <button
//               onClick={() => router.push('/home')}
//               className="absolute left-6 bg-black text-white font-semibold px-4 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
//             >
//               Exit
//             </button>
//             <h1 className="text-lg font-bold mx-auto">{problem.title}</h1>
//           </div>
      
//           {/* Main Layout */}
//           <main className="flex max-w-6xl w-full mx-auto p-8 gap-6">
//             {/* Left Column: Question + Choices after submit */}
//             <div className="w-1/2 pr-6 flex flex-col items-start">
//               <p className="text-lg text-black font-medium mb-6">{problem.question}</p>
      
//          {result && (
//             <div className="space-y-3 w-full">
//                 {problem.options.map((choice, i) => {
//                 const letter = String.fromCharCode(65 + i);
//                 const isSelected = selected === choice;
//                 const isCorrect = problem.correctAnswer === choice; 
//                 const isWrongSelection = isSelected && !isCorrect;

//                 let bgColor = 'bg-white';
//                 let borderColor = 'border-blue-900';

//                 if (isCorrect) {
//                     bgColor = 'bg-green-100';
//                     borderColor = 'border-green-600';
//                 } else if (isWrongSelection) {
//                     bgColor = 'bg-red-100';
//                     borderColor = 'border-red-600';
//                 }

//                 return (
//                     <div
//                     key={letter}
//                     className={`flex items-center w-full border-2 rounded-lg px-4 py-2 text-left ${bgColor} ${borderColor}`}
//                     >
//                     <div
//                         className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 ${
//                         isCorrect ? 'border-green-600' : isWrongSelection ? 'border-red-600' : 'border-blue-900'
//                         }`}
//                     >
//                         <span className="font-semibold text-blue-900">{letter}</span>
//                     </div>
//                     <span className="italic text-blue-900">{choice}</span>
//                     </div>
//                 );
//                 })}
//   </div>
// )}

//             </div>
      
//             {/* Divider */}
//             <div className="w-px bg-gray-300" />
      
//             {/* Right Column */}
//             <div className="w-1/2 pl-6 space-y-4">
//               {!result && (
//                 <>
//                   <div className="space-y-3">
//                     {problem.options.map((choice, i) => {
//                       const letter = String.fromCharCode(65 + i);
//                       const isSelected = selected === choice;
//                       return (
//                         <button
//                           key={letter}
//                           onClick={() => setSelected(choice)}
//                           className={`flex items-center w-full border-2 rounded-lg px-4 py-2 text-left transition ${
//                             isSelected
//                               ? 'bg-yellow-300 border-yellow-500'
//                               : 'bg-white hover:bg-gray-100 border-blue-900'
//                           }`}
//                         >
//                           <div
//                             className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 ${
//                               isSelected ? 'border-yellow-700' : 'border-blue-900'
//                             }`}
//                           >
//                             <span className="font-semibold text-blue-900">{letter}</span>
//                           </div>
//                           <span className="italic text-blue-900">{choice}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
      
//                   <button
//                     onClick={handleSubmit}
//                     disabled={!selected}
//                     className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-indigo-700 transition-colors duration-200 cursor-pointer disabled:opacity-50"
//                   >
//                     Submit
//                   </button>
//                 </>
//               )}
//               {result && (
//                 <div className="mt-4 p-4 border rounded bg-white">
//                     <p className={result.correct ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
//                     {result.message}
//                     </p>

//                     {result.explanation && (
//                     <div className="mt-3">
//                         <p className="text-blue-600 font-bold">Explanation</p>
//                         <p className="mt-2 text-gray-800">{result.explanation}</p>
//                     </div>
//                     )}
//                 </div>
//                 )}

//             </div>
//           </main>
//         </div>
//       );
return (
    <div className="bg-[#f0f6ff] min-h-screen w-full flex flex-col">
      {/* Top Blue Bar */}
      <div className="bg-[#c6e0ff] text-black px-6 py-4 flex items-center justify-between relative">
        <button
          onClick={() => router.push('/home')}
          className="absolute left-6 bg-black text-white font-semibold px-4 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
        >
          Exit
        </button>
        <h1 className="text-lg font-bold mx-auto">{problem.title}</h1>
      </div>
  
      {/* Main Layout */}
      <main className="flex flex-col md:flex-row max-w-6xl w-full mx-auto p-8 gap-6">
        {/* Left Column */}
        <div className="w-full md:w-1/2 md:pr-6 flex flex-col items-start">
          <p className="text-lg text-black font-medium mb-6">{problem.question}</p>
  
          {result && (
            <div className="space-y-3 w-full">
              {problem.options.map((choice, i) => {
                const letter = String.fromCharCode(65 + i);
                const isSelected = selected === choice;
                const isCorrect = problem.correctAnswer === choice;
                const isWrongSelection = isSelected && !isCorrect;
  
                let bgColor = 'bg-white';
                let borderColor = 'border-blue-900';
  
                if (isCorrect) {
                  bgColor = 'bg-green-100';
                  borderColor = 'border-green-600';
                } else if (isWrongSelection) {
                  bgColor = 'bg-red-100';
                  borderColor = 'border-red-600';
                }
  
                return (
                  <div
                    key={letter}
                    className={`flex items-center w-full border-2 rounded-lg px-4 py-2 text-left ${bgColor} ${borderColor}`}
                  >
                    <div
                      className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 ${
                        isCorrect
                          ? 'border-green-600'
                          : isWrongSelection
                          ? 'border-red-600'
                          : 'border-blue-900'
                      }`}
                    >
                      <span className="font-semibold text-blue-900">{letter}</span>
                    </div>
                    <span className="italic text-blue-900">{choice}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
  
        {/* Divider */}
        <div className="hidden md:block w-px bg-gray-300" />
  
        {/* Right Column */}
        <div className="w-full md:w-1/2 md:pl-6 space-y-4">
          {!result && (
            <>
              <div className="space-y-3">
                {problem.options.map((choice, i) => {
                  const letter = String.fromCharCode(65 + i);
                  const isSelected = selected === choice;
                  return (
                    <button
                      key={letter}
                      onClick={() => setSelected(choice)}
                      className={`flex items-center w-full border-2 rounded-lg px-4 py-2 text-left transition ${
                        isSelected
                          ? 'bg-yellow-300 border-yellow-500'
                          : 'bg-white hover:bg-gray-100 border-blue-900'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 mr-4 flex items-center justify-center rounded-full border-2 ${
                          isSelected ? 'border-yellow-700' : 'border-blue-900'
                        }`}
                      >
                        <span className="font-semibold text-blue-900">{letter}</span>
                      </div>
                      <span className="italic text-blue-900">{choice}</span>
                    </button>
                  );
                })}
              </div>
  
              <button
                onClick={handleSubmit}
                disabled={!selected}
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-indigo-700 transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                Submit
              </button>
            </>
          )}
  
          {result && (
            <div className="mt-4 p-4 border rounded bg-white">
              <p className={result.correct ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                {result.message}
              </p>
  
              {result.explanation && (
                <div className="mt-3">
                  <p className="text-blue-600 font-bold">Explanation</p>
                  <p className="mt-2 text-gray-800">{result.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
  
      
      
}
