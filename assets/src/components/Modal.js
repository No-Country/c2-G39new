import React from 'react';
import styled from 'styled-components'; 


const Modal = ({children, estado, cambiarEstado, titulo="CryptoCheck", mostrarHeader, mostrarOverlay, posicionModal, padding}) => {
  return ( 
      <>

{estado && 

        <Overlay mostrarOverlay={mostrarOverlay} posicionModal={posicionModal}>
            <ContenedorModal padding={padding}>
            {mostrarHeader &&
                <EncabezadoModal>
                    <h3>{titulo}</h3>
                </EncabezadoModal> 
                }

                <BotonCerrar className="fas fa-times" onClick={() => cambiarEstado(false)}></BotonCerrar>
           {children}
           </ContenedorModal>
        </Overlay>
    }
      </>
  )
};

export default Modal

const Overlay = styled.div`
width: 100%; /*ancho*/
height: 100%; /*alto*/
position: fixed; /*fijo*/ 
top: 0;
left: 0;
background: ${props => props.mostrarOverlay ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }; /*si es verdadero se muestra lo primero si es falso lo segundo*/ 
padding: 0px;
display: flex;
align-items: ${props => props.posicionModal ? props.posicionModal : 'center'}; /*centra el modal de forma vertical*/
justify-content: center; /*centra el modal de forma horizontal*/
`;


const ContenedorModal = styled.div`
width: 500px;
${'' /* height: 0px; */}
background: #1f2528;
position: relative;
border-radius: 5px;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
padding: ${props => props.padding ? props.padding : '20px'};


}
`;

const EncabezadoModal = styled.div`
display: flex;
align-items: center; 
justify-content: space-between; /*un elemento a la izquierda y otro a la derecha*/
margin-bottom: 20px;
padding-bottom: 20px;
border-bottom: 1px solid #E8E8E8;

h3{
    font-weight: 500;
    font-size: 16px;
    color: #18a724;
}
`;


const BotonCerrar = styled.button`
position: absolute;
top: 25px;
right: 20px;
width: 30px;
height: 30px;
border: none;
background: none;
cursor: pointer;
transition: .3s ease all;
border-radius: 5px;
color: #18a724;

&:hover{
    background: #f2f2f2;
}

.fas fa-times{
  width: 100%;
  height: 100%;  
}
`;