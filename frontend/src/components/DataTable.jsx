
import { useNavigate } from 'react-router-dom';

const applicantListHeaders = [
    {
        id: 1,
        KEY: "date",
        LABEL: "Date",
    },
    {
        id: 2,
        KEY: "name",
        LABEL: "Name",
    },
    {
        id: 3,
        KEY: "email",
        LABEL: "Email",
    },
    {
        id: 4,
        KEY: "studentId",
        LABEL: "Student ID",
    },
    {
        id: 5,
        KEY: "program",
        LABEL: "Program",
    },
    {
        id: 6,
        KEY: "year",
        LABEL: "Year",
    },
    {
        id: 7,
        KEY: "gpa",
        LABEL: "GPA",
    },
    {
        id: 8,
        KEY: "coverLetter",
        LABEL: "Cover Letter",
    },
    {
        id: 9,
        KEY: "status",
        LABEL: "Status",
    }
]

const coopStudentListHeaders = [
    {
        id: 1,
        KEY: "name",
        LABEL: "Name",
    },
    {
        id: 2,
        KEY: "email",
        LABEL: "Email",
    },
    {
        id: 3,
        KEY: "studentId",
        LABEL: "Student ID",
    },
    {
        id: 4,
        KEY: "program",
        LABEL: "Program",
    },
    {
        id: 5,
        KEY: "applications",
        LABEL: "Applications sent",
    },
    {
        id: 6,
        KEY: "interviews",
        LABEL: "Interviews",
    },
    {
        id: 7,
        KEY: "report",
        LABEL: "Progress Report",
    },
    {
        id: 8,
        KEY: "status",
        LABEL: "Status",
    }
]

const supervisorListHeaders = [
    {
        id: 1,
        KEY: "name",
        LABEL: "Name",
    },
    {
        id: 2,
        KEY: "email",
        LABEL: "Email",
    },
    {
        id: 3,
        KEY: "company",
        LABEL: "Company",
    },
    {
        id: 4,
        KEY: "jobTitle",
        LABEL: "Job Title",
    },
    {
        id: 5,
        KEY: "interns",
        LABEL: "Interns",
    },
    {
        id: 6,
        KEY: "report",
        LABEL: "Progress Report",
    },
    {
        id: 7,
        KEY: "status",
        LABEL: "Status",
    }
]

function DataTable(props) {

    
    const listTypeMap = new Map()
    listTypeMap.set("applicant", applicantListHeaders);
    listTypeMap.set("coop-student", coopStudentListHeaders);
    listTypeMap.set("supervisor", supervisorListHeaders);

    const listType = (listTypeMap.get(String(props.listType)));
    const listTypeStr = String(props.listType)

    const users = props.userData
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/coordinator/detailed-user-info/${listTypeStr}/${id}`)
    }
    
    return(
        <div className="data-table">

            <table>

                <thead>
                <tr>
                    
                    {listType.map((header) => (
                        <th key={header.id} className="table-header">
                            {header.LABEL}
                        </th>
                    ))}

                </tr>

                </thead>

                    <tbody>
                    {users.map((item) =>(

                        <tr key={item.id} className="table-row">
                    
                            {listType.map((column) =>(
                                <td key={column.id} className="table-cell">
                                    {column.KEY === "name" ? (
                                        <span className="clickable-name" onClick={() => handleRowClick(item.id)}>
                                            {item[column.KEY]}
                                        </span>
                                    ) : (item[column.KEY])

                                    }
                                </td>

                            ))}
                        </tr>
                        
                    ))}

                    </tbody>

            </table>

        </div>
        
    )

}

export default DataTable