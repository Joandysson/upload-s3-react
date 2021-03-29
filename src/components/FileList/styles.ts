import { MdLink } from "react-icons/md";
import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;

  li {
    margin-top: 10px;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    color: #444;
    min-width: 150px;

    div {
      width: 90%;
    }

    & + li {
      /* margin-top: 15px; */
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    width: 100%
  }

  div {
    display: flex;
    flex-direction: column;

    strong {
      display: flex;
      align-items: center;
    }

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

interface PreviewProps {
  src: string
}

export const Preview = styled.div<PreviewProps>`
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width:100% !important;
    height:100%;
  }

  div:hover {
    background-color: #ffffff90
  }
`;


export const MdLinkStyle = styled(MdLink)`
  opacity: 0;
  ${Preview}:hover & {
    opacity: 1;
  }
`