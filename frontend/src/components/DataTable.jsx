import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'

const applicantListHeaders = [
    {
        id: 1,
        KEY: "DATE",
        LABEL: "Date",
    },
    {
        id: 2,
        KEY: "NAME",
        LABEL: "Name",
    },
    {
        id: 3,
        KEY: "EMAIL",
        LABEL: "Email",
    },
    {
        id: 4,
        KEY: "STUDENTID",
        LABEL: "Student ID",
    },
    {
        id: 5,
        KEY: "PROGRAM",
        LABEL: "Program",
    },
    {
        id: 6,
        KEY: "YEAR",
        LABEL: "Year",
    },
    {
        id: 7,
        KEY: "STUGPA",
        LABEL: "GPA",
    },
    {
        id: 8,
        KEY: "COVERLETTER",
        LABEL: "Cover Letter",
    },
    {
        id: 9,
        KEY: "STATUS",
        LABEL: "Status",
    }
]

const coopStudentListHeaders = [
    {
        id: 1,
        KEY: "NAME",
        LABEL: "Name",
    },
    {
        id: 2,
        KEY: "EMAIL",
        LABEL: "Email",
    },
    {
        id: 3,
        KEY: "STUDENTID",
        LABEL: "Student ID",
    },
    {
        id: 4,
        KEY: "PROGRAM",
        LABEL: "Program",
    },
    {
        id: 5,
        KEY: "APPLICATIONSSENT",
        LABEL: "Applications sent",
    },
    {
        id: 6,
        KEY: "PROGRESSREPORT",
        LABEL: "Progress Report",
    },
    {
        id: 7,
        KEY: "STATUS",
        LABEL: "Status",
    }
]

const supervisorListHeaders = [
    {
        id: 1,
        KEY: "NAME",
        LABEL: "Name",
    },
    {
        id: 2,
        KEY: "EMAIL",
        LABEL: "Email",
    },
    {
        id: 3,
        KEY: "COMPANY",
        LABEL: "Company",
    },
    {
        id: 4,
        KEY: "JOBTITLE",
        LABEL: "Job Title",
    },
    {
        id: 5,
        KEY: "INTERNS",
        LABEL: "Interns",
    },
    {
        id: 6,
        KEY: "PROGRESSREPORTS",
        LABEL: "Progress Report",
    },
    {
        id: 7,
        KEY: "STATUS",
        LABEL: "Status",
    }
]

function DataTable(props) {
    
    const listTypeMap = new Map()
    listTypeMap.set("applicant", applicantListHeaders);
    listTypeMap.set("coop-student", coopStudentListHeaders);
    listTypeMap.set("supervisor", supervisorListHeaders);

    const listType = (listTypeMap.get(String(props.listType)));

    const users = props.userData
    console.log(props.listType)
    console.log(users)
    console.log(listType)

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
                    {users.map((applicant) =>(

                        <tr key={applicant.id} className="table-row">
                    
                            {listType.map((column) =>(
                                <td key={column.id} className="table-cell">
                                    {applicant[column.KEY]}
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