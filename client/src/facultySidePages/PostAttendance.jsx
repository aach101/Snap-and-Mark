import React, { useState, useEffect } from "react";
import Select from "react-select";
import subjectData from './components/subjects.json'; // Import the JSON data
import AttendanceEntry from "./components/AttendanceEntry";

function PostAttendance() {
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const [showAddAttend, setshowAddAttend] = useState(false);
    const [showViewAttend, setViewAttend] = useState(false);


    const handleAddAttendance = () => {
        setshowAddAttend(true); 
        setViewAttend(false); 

    };
    const handleViewAttendance = () => {
        setViewAttend(true); 
        setshowAddAttend(false); 

    };
    const timeslots = [
        "08:30-09:30",
        "09:30-10:30",
        "10:30-11:30",
        "11:30-12:30",
        "01:30-02:30",
        "02:30-03:30",
        "03:30-04:30",
        "04:30-05:30",
    ];

    const timeSlotOptions = timeslots.map((slot, index) => ({
        value: slot,
        label: slot,
    }));

    const handleTimeChange = (selectedOption) => {
        setSelectedTime(selectedOption);
    };
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSemesterChange = (selectedSemester) => {
        setSemester(selectedSemester);
        if (selectedSemester) {
            // Filter subjects based on the selected semester
            const subjectsForSemester = subjectData.filter(
                (subject) => subject.sem === selectedSemester.value
            );
            setSubjectList(subjectsForSemester);
            setSubject(null);
        } else {
            setSubjectList([]);
            setSubject(null);
        }
    };

    const handleSubjectChange = (selectedSubject) => {
        setSubject(selectedSubject);
    };


    const getSemesterOptions = () => {
        const semesters = [...new Set(subjectData.map((subject) => subject.sem))];
        return semesters.map((semester) => ({
            value: semester,
            label: `Semester ${semester}`,
        }));
    };

    const getSubjectOptions = (subjectList) => {
        return subjectList.map((subject) => ({
            value: subject.subCode,
            label: `${subject.subName} (${subject.subCode})`,
        }));
    };

    return (<>
        <div className="m-5 ">
            <div className="text-center"><p className="font-bold text-2xl text-black-500 underline mb-2 ">Post Attendance</p></div>
            <div className="m-5 flex flex-wrap justify-evenly items-center border-2 p-4 rounded-lg bg-white hover:border-3 hover:shadow-md">

                <div className="m-2 w-[200px]">
                    <b>Semester</b>
                    <Select
                        placeholder="Select Semester"
                        value={semester}
                        options={getSemesterOptions()}
                        onChange={handleSemesterChange}
                    />
                </div>
                <div className="m-2 w-[200px] ">
                    <b>Subject</b>
                    <Select
                        placeholder="Select Subject"
                        value={subject}
                        options={getSubjectOptions(subjectList)}
                        onChange={handleSubjectChange}
                    />
                </div>
                <div className="ml-2 mr-2 flex flex-col  ">
                    <b>Date</b>
                    <input type="date"
                        placeholder="Select the Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-[200px] border p-1.5 rounded border-solid border-1.5 border-gray-300"
                    />
                </div>
                <div className="m-2 w-[200px] ">
                    <b>Time Slot</b>
                    <Select
                        placeholder="Select Time Slot"
                        value={selectedTime}
                        options={timeSlotOptions}
                        onChange={handleTimeChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline" onClick={handleAddAttendance} >
                    Add Attendance
                </button>
                {/* <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline" onClick={handleViewAttendance} >
                    View Attendance
                </button> */}
            </div>
        </div>
        {showAddAttend && <AttendanceEntry selectedSemester={semester}
            selectedSubject={subject}
            selectedTimeSlot={selectedTime}
            selectedDate={selectedDate}

        />}
        {/* {showViewAttend && <ViewAttendance selectedSemester={semester}
            selectedSubject={subject}
            selectedTimeSlot={selectedTime}
            selectedDate={selectedDate}

        />} */}
    </>
    );
}

export default PostAttendance;
