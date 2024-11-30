import './presupuestos.css';

import { IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";
import { BiLastPage } from "react-icons/bi";
import { BiFirstPage } from "react-icons/bi";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fechaArgentina } from '../../utils/helperFunctions';

import PresupuestoDetails from './DetailsComponent/PresupuestoDetails';
import PrintablePresupuesto from './DetailsComponent/PrintablePresupuesto';



function Presupuestos() {
  const [fetched, setFeched] = useState(false)
  const [sideOpen, setSideOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [presupuestos, setPresupuestos] = useState([]);
  const [showModal, setShowModal] = useState(false)

  // Table Pagination
  const [page, setPage] = useState(1)
  const [startIndex, setStartIndex] = useState(null)
  const [endIndex, setEndIndex] = useState(null)
  const [totalPages, setTotalPages] = useState(null)

  useEffect(() => {
    setStartIndex((page - 1) * 20)
    setEndIndex(page * 20)
  }, [page])

  useEffect(() => {
    if (presupuestos) {
      setTotalPages(Math.ceil(presupuestos.length / 20))
    }
  }, [presupuestos, setTotalPages])

  const handlePagination = (action) => {
    switch (action) {
      case 'first': setPage(1)
        break;
      case 'prev': setPage((prev) => prev - 1)
        break;
      case 'next': setPage((prev) => prev + 1)
        break;
      case 'last': setPage(totalPages)
        break;
      default:
        break;
    }
  }

  const tableHead = ['Codigo', 'Vendedor', 'Cliente', 'Fecha', 'Total', 'PDF'];

  // API OPERATIONS
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/presupuestos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const presupuestos = await response.json();
      setPresupuestos(presupuestos);
      setFeched(true)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  const deletePresupuesto = async () => {
    if (!selected) return; // Add a check to make sure `selected` is defined

    try {
      const response = await fetch(`/api/presupuestos/${selected.id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message);
        fetchData()
      } else {
        alert(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Error deleting in the database:', error);
    }
  };
  // Fetch data upon loading
  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (selected) setSideOpen(true);
  // }, [selected]);

  useEffect(() => {
    if (!sideOpen) setSelected(null);
  }, [sideOpen]);

  const handleClick = (e) => {
    e.preventDefault()
    setShowModal(true)
  }
  const handlePrint = (e) => {
    e.preventDefault()
    window.print()
  }
  while (!fetched) return (
    <div className="loading-container">
      <VscLoading className="vsc-loading" />
    </div>
  )
  if (!presupuestos.length) {
    return <h3>No hay ningun presupuesto guardado</h3>
  }



  return (
    <>
      <div className="presupuestos-main-view">
        <div className="presupuestos-container">
          <h1 className="budget-title">Presupuestos</h1>
          <div className="table-container">
            <table className="presupuestos-table">
              <thead className="presupuestos-table-head">
                <tr>
                  {tableHead.map(th => <th key={th}>{th}</th>)}
                </tr>
              </thead>
              <tbody className="presupuestos-table-body">
                {presupuestos
                  .slice(startIndex, endIndex)
                  .map(detailsObj => (
                    <PresupuestoRow
                      key={detailsObj.codigo}
                      detailsObj={detailsObj}
                      selected={selected}
                      setSelected={setSelected}
                      sideOpen={sideOpen}
                      setSideOpen={setSideOpen}
                      handleClick={handleClick}
                      showModal={showModal}
                    />
                  ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className='pagination-row'>
              <span>Showing 20 of {presupuestos.length} entries</span>
              <span>
                <BiFirstPage size={20} onClick={() => handlePagination('first')} />
                <GrFormPrevious size={20} onClick={() => page != 1 ? handlePagination('prev') : null} />
                Page {page} of {totalPages}
                <GrFormNext size={20} onClick={() => page != totalPages ? handlePagination('next') : null} />
                <BiLastPage size={20} onClick={() => handlePagination('last')} />
              </span>
            </div>
            {/* End Pagination */}
          </div>
        </div>
        <div className="presupuesto-side-panel-toggle-wrapper">
          <div className="presupuesto-side-panel-toggle clickable"
            onClick={() => setSideOpen(!sideOpen)}
          >
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <div className="presupuesto-side-panel">
          <PresupuestoDetails
            visible={sideOpen}
            selected={selected}
            handleClick={handleClick}
            deletePresupuesto={deletePresupuesto}
          />
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className='preview-presupuesto-modal'>
            <div className='close-print-container' style={{ textAlign: 'right', margin: 'auto', width: '70vh' }}>
              <button className='print-save-button' onClick={handlePrint}><IoMdDownload /></button>
              <button className="print-save-button" onClick={() => setShowModal(false)}><IoClose /></button>
            </div>
            <div className="presupuesto-modal-content">
              <PrintablePresupuesto presupuesto={selected} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const PresupuestoRow = ({ detailsObj, selected, setSelected, setSideOpen, sideOpen, handleClick }) => {
  return (
    <tr
      key={detailsObj.codigo}
      onClick={(e) => {

        setSelected(detailsObj);
        if (e.target.innerText !== "Ver") {
          if (!sideOpen) setSideOpen(true);
        }
      }}
      className={selected === detailsObj ? 'selected' : ''}
    >
      <td>{detailsObj.codigo}</td>
      <td>{detailsObj.vendedor}</td>
      <td>{detailsObj.cliente}</td>
      <td>{fechaArgentina(detailsObj.fecha)}</td>
      <td>{detailsObj.total}</td>
      <td><Link onClick={handleClick}>Ver</Link></td>
    </tr>
  );
};

export default Presupuestos;
