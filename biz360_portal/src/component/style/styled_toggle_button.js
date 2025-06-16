import styled from "styled-components";

export const StyledToggledButton = styled.div`
    position: relative;
    border: ${({theme})=>"solid 6px "+theme.colors.primary};
    border-radius: 20px;
    transition: transform cubic-bezier(0, 0, 0.30, 2) .4s;
    transform-style: preserve-3d;
    height: 40px;

    &>input[type="radio"] {
        display: none;
    }
    &>#choice1:checked~#flap {
        transform: rotateY(-180deg);
    }
    &>#choice1:checked~#flap>.content {
        transform: rotateY(-180deg);
    } 
        &>#choice2:checked~#flap {
        transform: rotateY(0deg);
    }

    &>label {
        display: inline-block;
        width: 170px;
        padding: 0 10px;
        font-size: 20px;
        text-align: center;
        color: ${({theme})=>theme.colors.font};
        cursor: pointer;
    }

    &>label, &>#flap {
        font-weight: bold;
        text-transform: capitalize;
    }

    &>#flap {
        position: absolute;
        top: calc( 0px - 6px);
        left: 50%;
        height: calc(100% + 5px * 2);
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        background-color:  ${({theme})=>theme.colors.primary};
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        transform-style: preserve-3d;
        transform-origin: left;
        transition: transform cubic-bezier(0.4, 0, 0.2, 1) .5s;
    }

    &>#flap>span{
        color: ${({theme})=>theme.colors.font};
        transition: transform 0s linear .25s;
        transform-style: preserve-3d;
    }
`;