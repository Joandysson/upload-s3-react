import React, { ReactElement, useEffect, useState } from "react";
import { uniqueId } from "lodash";
import filesize from "filesize";

import api from "./services/api";

import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

function App(): ReactElement {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any

  useEffect(() => {
    async function getUploads() {
      const response = await api.get("uploads");
      setUploadedFiles(
        response.data.map((file: any) => ({
          id: file.id,
          name: file.name,
          readableSize: filesize(file.size),
          type: file.type,
          preview: file.url,
          uploaded: true,
          url: file.url
        }))
      )
    }
    getUploads()

    // return function cleanup() {
    //   uploadedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    // }
  }, [])

  const handleUpload = (files: any) => {
    const uploadedFiles = files.map((file: any) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      type: '',
      uploaded: false,
      error: false,
      url: null
    }));

    setUploadedFiles((state: []) => [...state, ...uploadedFiles])

    uploadedFiles.forEach(processUpload);
  };

  const updateFile = (id: any, data: any) => {

    setUploadedFiles((state: []) => state.map((uploadedFile: any) => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile;
    }))
  };

  const processUpload = (uploadedFile: any) => {
    const data = new FormData();

    data.append("image", uploadedFile.file, uploadedFile.name);

    api
      .post("upload", data, {
        onUploadProgress: e => {
          const progress = Math.round((e.loaded * 100) / e.total);
          updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id,
          type: response.data.type,
          url: response.data.url
        });
      })
      .catch(() => {
        updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  const handleDelete = async (id: any) => {
    await api.delete(`upload/${id}`);

    setUploadedFiles(uploadedFiles.filter((file: any) => file.id !== id))
  };

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </Content>
      <GlobalStyle />
    </Container>
  );
}

export default App;
