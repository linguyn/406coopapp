
import { useNavigate } from 'react-router-dom';
import sortIcon from '../assets/sortButton.svg'
import React, {useState, useEffect} from 'react'

const applicantListHeaders = [
    {
        id: 1,
        KEY: "createdAt",
        LABEL: "Date",
    },
    {
        id: 2,
        KEY: "fullName",
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
        KEY: "fullName",
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
        LABEL: "Applications",
    },
    {
        id: 6,
        KEY: "interviewed",
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
        KEY: "fullName",
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

    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

    const listType = (listTypeMap.get(String(props.listType)));
    const listTypeStr = String(props.listType)

    const [users, setUsers] = useState(props.userData);
    const navigate = useNavigate();

    useEffect(() => {
        setUsers(props.userData);
    }, [props.userData]);

    const labelToKeyURL = {
    "Name": "firstName",
    "Email": "email",
    "Date": "createdAt",
    "Applications": "applications",
    "Status": "status",
    "Student ID": "studentId",
    "Program": "program",
    "Year": "year",
    "GPA": "gpa",
    "Company": "company",
    "Job Title": "jobTitle",
    "Interviews" : "interviewed"
};

    const handleHeaderClick = async (label) => {
            const apiKey = labelToKeyURL[label];
            if (!apiKey) return;

            let newDirection = 'asc';

            if (sortConfig.key === apiKey && sortConfig.direction === 'asc') {
                newDirection = 'desc';
            }

            setSortConfig({ key: apiKey, direction: newDirection });

            if (props.listType === "applicant") {
                props.fetchApplicants("", apiKey, newDirection);
            } else if (props.listType === "coop-student") {
                props.fetchStudents("", apiKey, newDirection);
            } else if (props.listType === "supervisor") {
                props.fetchSupervisors("", apiKey, newDirection);
            }

        };

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
                        {(header.LABEL === "Name" || 
                        header.LABEL === "Email" || 
                        header.LABEL === "Date" ||
                        header.LABEL === "Year" ||
                        header.LABEL === "GPA" || 
                        header.LABEL === "Status" ||
                        header.LABEL === "Applications" ||
                        header.LABEL === "Company" ||
                        header.LABEL === "Job Title") && (
            <img 
                className={`sort-icon sort-icon-${header.LABEL.toLowerCase()}`}
                src={sortIcon}
                alt="sort"
                style={{ cursor: 'pointer', marginLeft: '5px' }} 
                onClick={() => handleHeaderClick(header.LABEL)}
            />
        )}
    </th>
))}

                </tr>

                </thead>

                    <tbody>
                    {users.map((item) =>(

                        <tr key={item.id} className="table-row">
                    
                            {listType.map((column) =>(
                                <td key={column.id} className="table-cell">
                                    {column.KEY === "fullName" ? (
                                        <span className="clickable-name" onClick={() => handleRowClick(item.id)}>
                                            {item[column.KEY] ?? "N/A"}
                                        </span>

                                    ) : column.KEY === "createdAt" ? (
                                        item[column.KEY]?.slice(0,10)

                                    ) : ["program", "year", "gpa"].includes(column.KEY) ? (
                                        item.academics?.[column.KEY] ?? item[column.KEY] ?? "N/A"

                                    ) : ["applications", "interviewed"].includes(column.KEY) ? (
                                        item.termActivity?.[column.KEY] ?? item.termActivity?.interviewed ?? item[column.KEY] ?? 0
                                    
                                    

                                    ) : column.KEY === "interns" ? (
                                        Array.isArray(item[column.KEY]) && item[column.KEY].length > 0 ? (

                                            <div className="table-interns-list">
                                                {item[column.KEY].map((intern, i) => (
                                                    <div key={intern._id || i} className="table-intern-tag">
                                                        {typeof intern === 'string' ? intern : intern.fullName || "Unknown"}
                                                    </div>
                                                            ))}
                                            </div>
                                    ) : "No Interns"
                                    ) : ( item[column.KEY] ?? "N/A"

                                    )}
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