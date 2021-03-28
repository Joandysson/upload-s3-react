import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;

  li {
    margin-top: 10px;
    display: flex;
    flex: 1;
    justify-content: space-between;
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

  div {
    display: flex;
    flex-direction: column;

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
`;
