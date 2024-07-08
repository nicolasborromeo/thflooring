import './presupuestos.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

import { IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscLoading } from "react-icons/vsc";



import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fechaArgentina } from '../../utils/helperFunctions';

import PresupuestoDetails from './DetailsComponent/PresupuestoDetails';
import PrintablePresupuesto from './DetailsComponent/PrintablePresupuesto';



function Presupuestos() {
  console.log(' API BASE URl', API_BASE_URL)

  const [fetched, setFeched] = useState(false)
  const [sideOpen, setSideOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [presupuestos, setPresupuestos] = useState([]);
  const [showModal, setShowModal] = useState(false)

  const tableHead = ['Codigo', 'Vendedor', 'Cliente', 'Fecha', 'Total', 'PDF'];
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/presupuestos`);
      console.log('response', response)
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


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selected) setSideOpen(true);
  }, [selected]);

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
  while(!fetched) return (
    <div className="loading-container">
       {/* <h4>Loading...</h4> */}
      <VscLoading className="vsc-loading" />
    </div>
  );
  if (!presupuestos.length) return <h3>No hay ningun presupuesto guardado</h3>;

  return (
    <div className="presupuestos-main-view">
      <div className="presupuestos-container">
      <h1 className="budget-title">Presupuestos</h1>
        <table className="presupuestos-table">
          <thead className="presupuestos-table-head">
            <tr>
              {tableHead.map(th => <th key={th}>{th}</th>)}
            </tr>
          </thead>
          <tbody className="presupuestos-table-body">
            {presupuestos.map(detailsObj => (
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
      </div>
      <div className="presupuesto-side-panel-toggle-wrapper">
        <div className="presupuesto-side-panel-toggle"
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

      {showModal && (
        <div className="modal">
            <div className='close-print-container' style={{textAlign:'right', margin: 'auto', width: '70vh'}}>
              <button className='print-save-button' onClick={handlePrint}><IoMdDownload /></button>
              <button className="print-save-button" onClick={() => setShowModal(false)}><IoClose /></button>
            </div>
          <div className="presupuesto-modal-content">
            <PrintablePresupuesto presupuesto={selected} />
          </div>
        </div>
      )}

    </div>
  );
}

const PresupuestoRow = ({ detailsObj, selected, setSelected, setSideOpen, sideOpen, handleClick }) => {
  return (
    <tr
      key={detailsObj.codigo}
      onClick={() => {
        setSelected(detailsObj);
        if (!sideOpen) setSideOpen(true);
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
