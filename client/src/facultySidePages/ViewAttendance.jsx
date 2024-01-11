import React, { useState, useEffect } from 'react';
import formatDate from '../utils/formatDate';
import LoadingIcon from '../utils/Loadingicon';

function ViewAttendance({ selectedSemester, selectedSubject }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ref, setRef] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setLoading(true);
        const sub = selectedSubject.label;
console.log(sub);
        fetch(`http://localhost:8000/attendanceModule/attendance?subject=${sub}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setTotal(data.length); // Use data.length to get the total number of items.
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, [ref]);

    // Helper function to calculate attendance percentage
    const calculateAttendancePercentage = (attended, total) => {
        if (total === 0) {
            return 0;
        }
        return ((attended / total) * 100).toFixed(2);
    };

    return (
        <div className="ml-10 mt-10 mr-10 shadow-md">
            {!loading ? (
                <div className="table-container border border-blue-500 overflow-x-auto hover:shadow-md rounded-md">
                    <table className="min-w-full table-fixed border-collapse">
                        <thead>
                            <tr className="border bg-blue-100 border-blue-500">
                                <th className="p-1 border-blue-500 text-center sticky left-0 bg-blue-100 z-5">Roll No.</th>
                                {data.map((item, index) => (
                                    <th className="p-1 border-blue-500 text-center" key={index}>{formatDate(item.date)}</th>
                                ))}
                                <th className="p-1 text-center sticky border-blue-500 right-0 bg-blue-100 z-5">Attendance Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data[0]?.studentID.map((id, index) => (
                                <tr className="border-[1px] border-blue-500" key={id}>
                                    <td className="p-1 text-center sticky left-0 z-5 font-semibold bg-white">{id}</td>
                                    {data.map((item, subjectIndex) => (
                                        <td className="p-1 text-center border border-blue-500" key={subjectIndex}>
                                            {item.attendance[index] ? (
                                                <p className="text-blue-600">P</p>
                                            ) : (
                                                <p className="text-red-600">A</p>
                                            )}
                                        </td>
                                    ))}
                                    <td className="p-1 text-center font-semibold sticky right-0 bg-white z-5">
                                        {calculateAttendancePercentage(
                                            data.reduce((count, item) => count + (item.attendance[index] ? 1 : 0), 0),
                                            total
                                        )}%
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    <LoadingIcon />
                </div>
            )}
        </div>
    );
}

export default ViewAttendance;
