import React from "react";
import {Input,
    GrupoInput,  
    LeyendaError, 
    IconoValidacion,
    Label} from './../elements/Formularios';
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const ComponenteInput = ({estado, cambiarEstado, type, name, leyendaError, expresionRegular, label, placeholder, funcion}) => {
const onChange = (e) => {
cambiarEstado({...estado, campo: e.target.value}); 
}

const validacion = () => {
    if(expresionRegular){
if(expresionRegular.test(estado.campo)){
cambiarEstado({...estado, valido: 'true'})
}else {
    cambiarEstado({...estado, valido: 'false'})
}
    }

    if(funcion){
        funcion();
    }
}

    return (   
    <div>
        <Label htmlFor={name} valido={estado.valido}>{label}</Label>
            <GrupoInput> 
                <Input 
                type={type} 
                placeholder={placeholder} 
                id={name}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta la funcion al levantar el dedo del teclado
                onBlur={validacion} 
                valido={estado.valido}
                />
                <IconoValidacion 
                icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
                valido={estado.valido}

                />
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
      </div> 
      );
}
 
export default ComponenteInput;