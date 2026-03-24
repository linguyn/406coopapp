const listType = [
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

function DataTable(props) {

    const applicants = props.applicantData

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
                    {applicants.map((applicant) =>(

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