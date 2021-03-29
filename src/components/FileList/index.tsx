import { FC } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError } from "react-icons/md";

import { Container, FileInfo, MdLinkStyle, Preview } from "./styles";


interface FileListProps {
  files: any,
  onDelete: (id: any) => Promise<void>
}

const FileList: FC<FileListProps> = ({ files, onDelete }) => (
  <Container>
    {files.map((uploadedFile: any) => (
      <li key={uploadedFile.id}>
        {!uploadedFile.uploaded &&
          !uploadedFile.error ? (
          <CircularProgressbar
            styles={{
              root: { width: 60, height: 80 },
              path: { stroke: "#ff0785" },
            }}
            strokeWidth={10}
            value={uploadedFile.progress}
          />
        ) : (
          <FileInfo>
            <a
              href={uploadedFile.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Preview src={uploadedFile.preview} >
                <div>
                  <MdLinkStyle size={35} color="#222" />
                </div>
              </Preview>
            </a>
            <div>
              <strong>
                {uploadedFile.name.slice(-8)}
                {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
                {uploadedFile.error && <MdError size={24} color="#e57878" />}
              </strong>
              {uploadedFile.type ? (<div>Tipo: {uploadedFile.type}</div>) : null}
              <span>
                {uploadedFile.readableSize}{" "}
                {!!uploadedFile.url && (
                  <button onClick={() => onDelete(uploadedFile.id)}>
                    Excluir
                  </button>
                )}

              </span>
            </div>
          </FileInfo>
        )}
      </li>
    ))}
  </Container>
);

export default FileList;
