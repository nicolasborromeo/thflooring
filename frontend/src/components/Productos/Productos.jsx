import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { useMemo, useState } from 'react'



// const editButton = p => {
//     return <>
//         <button onClick={() => openModal}>Edit</button>
//         {p.value}
//     </>
// }



function Productos({ productData }) {

    const headers = [
        {
            field: 'codigo',
            // cellRenderer: editButton,
            checkboxSelection: true,
            flex: 2,
        },
        {
            field: 'descripcion',
            flex: 5,
        },
        {
            field: 'medidasType',
            headerName: 'Un. Med.',
            flex: 1,
        },
        {
            field: 'costo',
            valueFormatter: p => "$ " + p.value.toLocaleString(),
            flex: 1,
        },
        {
            field: 'precio',
            valueFormatter: p => "$ " + p.value.toLocaleString(),
            flex: 1,
        },
        {
            field: 'company',
            headerName: 'Compania',
            flex: 1,
        }
    ]
    const defaultColDef = useMemo( ()=> {
        return {
            filter:true,
            floatingFilter: true
        }
    }, [])


    const [rowData, setRowData] = useState(productData)
    const [colDefs, setColDefs] = useState(headers)


    return (
        <>


        <h1 className="budget-title" style={{width: '85vw', marginTop: '-20px'}}>Productos</h1>

        <div
            className="ag-theme-quartz"
            style={{ height: '80vh', width: '70vw', marginBottom: '25px', fontSize: '11px' }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                defaultJoinOperator={'OR'}
                pagination={true}
                paginationPageSize={40}
                paginationPageSizeSelector={[10, 20, 30, 40, 50, 100]}
            />
        </div>
        </>
    )


}

export default Productos
