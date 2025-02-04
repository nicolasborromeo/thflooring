import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Presupuesto from '../Presupuestador/Presupuesto';

import { IoMdDownload } from 'react-icons/io';

// Class wrapper for Presupuesto so that react-to-print can attach a ref
class PresupuestoToPrint extends React.Component {
  render() {
    // Pass all props to the Presupuesto component
    return <Presupuesto {...this.props} />;
  }
}

export function PrintablePresupuesto({ presupuesto }) {
    const componentRef = useRef(); // Reference for the printable content

    return (
      <div>
        {/* react-to-print triggers printing when the button is clicked */}
        <ReactToPrint
          trigger={() => (
            <div className='close-print-container'>
                <button className='print-save-button'><IoMdDownload /></button>  
            </div>
        )}
          content={() => componentRef.current}      // <-- Content to print
        />
        <div ref={componentRef}>
          {/* Render the wrapped Presupuesto */}
          <PresupuestoToPrint presupuesto={presupuesto} />
        </div>
      </div>
    );
  }
