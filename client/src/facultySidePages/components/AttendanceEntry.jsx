import React, { useState, useEffect } from 'react';
import LoadingIcon from '../../utils/Loadingicon';

function AttendanceEntry({ selectedSemester, selectedSubject, selectedTimeSlot, selectedDate }) {
    const [data, setData] = useState([]);
    const [presenceStatus, setPresenceStatus] = useState([]);
    const [remarks, setRemarks] = useState([]);
    const [rollNumbers, setRollNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [ref, setRef] = useState(0);
    const dataToSent = {
        "subject": selectedSubject.label,
        "slot": selectedTimeSlot.label,
        "date": selectedDate,
        "sem": selectedSemester.value,
        "attendance": presenceStatus,
        "faculty": "will come from backend", // Make sure to update this value from the backend.
        "remark": remarks,
        "studentID": rollNumbers,
    };

    useEffect(() => {
        setLoading(true);
      
        // Replace 'YOUR_SEM_VALUE' with the actual value of 'sem'
        const sem = selectedSemester.value;
        //console.log(sem);
      
        // Include the 'sem' parameter in the URL
        fetch(`http://localhost:8000/attendanceModule/student?semester=${sem}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setPresenceStatus(new Array(data.length).fill(true));
            setRemarks(new Array(data.length).fill(''));
            const rollNumbersArray = data.map((item) => item.rollNo);
            setRollNumbers(rollNumbersArray);
          })
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, [ref]);
    const handleDropdownChange = (index, isPresent) => {
        const newStatus = [...presenceStatus];
        newStatus[index] = isPresent;
        setPresenceStatus(newStatus);
    };

    const handlePostData = () => {
        const url = "http://localhost:8000/attendanceModule/attendance/";

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSent),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((dataToSent) => {
                console.log(dataToSent);
                setRef(ref + 1);
                alert('Attendance posted successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRemarkChange = (index, remark) => {
        const newRemarks = [...remarks];
        newRemarks[index] = remark;
        setRemarks(newRemarks);
    };

    return (
        <div className='ml-10 mr-10'>
            {!loading ? (
                <table className="min-w-full border-collapse box-border">
                    <thead>
                        <tr className="border-[2px] bg-blue-100 border-blue-500">
                            <th className="p-1 text-center">Name</th>
                            <th className="p-1 text-center">Roll No.</th>
                            <th className="p-1 text-center">Department</th>
                            <th className="p-1 text-center">Semester</th>
                            <th className="p-1 text-center">Attendance</th>
                            <th className="p-1 text-center">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr className="border-[1px] font-serif border-blue-500" key={index}>
                                <td className="p-1 text-center">{item.name}</td>
                                <td className="p-1 text-center">{item.rollNo}</td>
                                <td className="p-1 text-center">{item.dept}</td>
                                <td className="p-1 text-center">{item.sem}</td>
                                <td className="p-1 text-center">
                                    <select
                                        onChange={(e) => handleDropdownChange(index, e.target.value === 'present')}
                                        value={presenceStatus[index] ? 'present' : 'absent'}
                                    >
                                        <option value="present">Present</option>
                                        <option value="absent">Absent</option>
                                    </select>
                                </td>
                                <td className="p-1 text-center">
                                    <input
                                        type="text"
                                        value={remarks[index]}
                                        onChange={(e) => handleRemarkChange(index, e.target.value)}
                                        className='border-[2px]'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <LoadingIcon />
                </div>
            )}
            <div className='flex justify-center'>
                <button
                    type="submit"
                    className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 hover:shadow-md hover:bg-blue-600"
                    onClick={handlePostData}
                >

                    Post Attendance
                </button>
            </div>
        </div>
    );
}

export default AttendanceEntry;
