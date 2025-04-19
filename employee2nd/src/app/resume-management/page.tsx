'use client';
import React, { useState, useEffect } from 'react';

type ResumeCategory = 'Data Analytics' | 'Data Science' | 'Software Development' | 'Machine Learning' | 'DevOps';

interface Resume {
  name: string;
  date: string;
  link: string;
}

const ResumeManagement = () => {
  const [resumes, setResumes] = useState<Record<ResumeCategory, Resume[]>>({
    'Data Analytics': [],
    'Data Science': [],
    'Software Development': [],
    'Machine Learning': [],
    DevOps: [],
  });
  
  const [showModal, setShowModal] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeCategory, setResumeCategory] = useState<ResumeCategory>('Data Analytics');
  const [masterResumeLink, setMasterResumeLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories: ResumeCategory[] = ['Data Analytics', 'Data Science', 'Software Development', 'Machine Learning', 'DevOps'];

  // Function to start Google OAuth flow
  // const startOAuthFlow = async () => {
  //   try {
  //     const response = await fetch('/api/get-google-auth-url');
  //     if (response.redirected) {
  //       window.location.href = response.url;
  //     }
  //   } catch (error) {
  //     setError('Failed to initiate Google authentication.');
  //     console.error('Error starting OAuth flow:', error);
  //   }
  // };

  const startOAuthFlow = () => {
    window.location.href = '/api/get-google-auth-url';
  };
  
  // Function to fetch the "Master Resume" from Google Drive
  const fetchMasterResume = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // No need to pass tokens explicitly since they are stored in cookies and will be sent automatically
      const response = await fetch('/api/search-google-drive?fileName=Master Resume');
      const data = await response.json();
  
      if (response.ok && data.url) {
        setMasterResumeLink(data.url); // Set the master resume link
      } else {
        throw new Error(data.error || 'File not found');
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  

  // Function to handle adding a new resume
  const handleAddResumeClick = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    if (resumeFileName) {
      try {
        // Call the API to copy the Master Resume and rename it
        const response = await fetch('/api/copy-master-resume', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newFileName: resumeFileName }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Add the new copied file as a resume entry
          const newResume: Resume = {
            name: resumeFileName,
            date: new Date().toLocaleDateString(),
            link: `https://docs.google.com/document/d/${data.newFileId}/edit`, // Link to the new copied file
          };
  
          setResumes((prevResumes) => {
            const updatedCategory = [...prevResumes[resumeCategory]];
  
            // Add the new resume version at the beginning of the array
            updatedCategory.unshift(newResume);
  
            // Keep only the most recent 5 versions
            if (updatedCategory.length > 5) {
              updatedCategory.pop();
            }
  
            return {
              ...prevResumes,
              [resumeCategory]: updatedCategory,
            };
          });
  
          // Open the new Google Docs file in a new tab
          window.open(`https://docs.google.com/document/d/${data.newFileId}/edit`, '_blank');
  
          // Clear the input fields and close the modal
          setResumeFileName('');
          setResumeCategory('Data Analytics');
          setShowModal(false);
        } else {
          throw new Error(data.error || 'Failed to copy and rename the file');
        }
      } catch (error) {
        console.error('Error saving resume:', error);
        setError('Failed to copy and rename the file');
      }
    }
  };
  

  const handleDelete = (category: ResumeCategory, index: number) => {
    setResumes((prevResumes) => {
      const updatedCategory = [...prevResumes[category]];
      updatedCategory.splice(index, 1);
      return {
        ...prevResumes,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Resume Management</h1>

      {/* Master Resume Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Master Resume</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p>
            {masterResumeLink ? (
              <a href={masterResumeLink} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Download Master Resume
              </a>
            ) : (
              <>
                <button
                  onClick={fetchMasterResume}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                >
                  Load Master Resume
                </button>
                <button
                  onClick={startOAuthFlow} // New button to start Google authentication
                  className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                >
                  Authenticate with Google
                </button>
              </>
            )}
          </p>
        )}
      </div>

      {/* Tailored Resumes Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tailored Resumes</h2>
          <button
            onClick={handleAddResumeClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            + Add New Resume
          </button>
        </div>

        {/* Subsections for Tailored Resumes with multiple versions */}
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-medium mb-2">{category}</h3>
            {resumes[category].length > 0 ? (
              resumes[category].map((resume, index) => (
                <div key={index} className="mb-2 flex justify-between items-center">
                  <a href={resume.link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                    {resume.name} - {resume.date}
                  </a>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(category, index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No resumes yet</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Adding New Resume */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Resume</h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">File Name</label>
              <input
                type="text"
                className="border rounded-lg p-2 w-full"
                value={resumeFileName}
                onChange={(e) => setResumeFileName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Category</label>
              <select
                className="border rounded-lg p-2 w-full"
                value={resumeCategory}
                onChange={(e) => setResumeCategory(e.target.value as ResumeCategory)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeManagement;
