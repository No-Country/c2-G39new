import styled, {css} from 'styled-components';


const colores = { 
    textSucces: "#18a724",
    textDanger: "#bb2929"
}

const Table = styled.table`
    color: #fff; 
    background-color: black;
    width:100%;
    height:100%;

    td{
        border-bottom: 1px solid;
    }

@media(max-width: 800px) {
    
}
`;

// const Tr = styled.tr`
// border: white solid;
// `;



export {
    Table,
    colores
    // Tr
};
