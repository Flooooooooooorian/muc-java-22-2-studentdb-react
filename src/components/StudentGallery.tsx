import {Student} from "../model/Student";
import StudentCard from "./StudentCard";
import "./StudentGallery.css"
import {ChangeEvent, useState} from "react";

type StudentGalleryProps = {
    students: Student[]
    removeStudent: (id: string) => void
}

export default function StudentGallery(props: StudentGalleryProps) {

    const [searchText, setSearchText] = useState<string>("")

    const filteredStudents: Student[] = props.students.filter(student => student.name.toLowerCase().includes(searchText.toLowerCase()))

    function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchText(event.target.value)
    }

    function mapStudents() {
        if (filteredStudents.length > 0) {
            return filteredStudents.map(student => <StudentCard student={student} key={student.id}
                                                                removeStudent={props.removeStudent}/>)
        }
        return <p>Es wurden keine Student gefunden!</p>
    }

    return (
        <div>
            <input className={"student-gallery__search"} placeholder={"Search"} value={searchText}
                   onChange={onSearchChange}/>

            <div className="student-gallery">
                {filteredStudents.length > 0 && filteredStudents.map(student => <StudentCard student={student}
                                                                                             key={student.id}
                                                                                             removeStudent={props.removeStudent}/>)}
                {filteredStudents.length <= 0 && <p>Es wurden keine Student gefunden!</p>}

            </div>

            <div className="student-gallery">
                {mapStudents()}
            </div>

            <div className="student-gallery">

                {filteredStudents.length > 0
                    ? filteredStudents.map(student => <StudentCard student={student} key={student.id}
                                                                   removeStudent={props.removeStudent}/>)
                    : <p>Es wurden keine Student gefunden!</p>
                }
            </div>
        </div>
    )
}
