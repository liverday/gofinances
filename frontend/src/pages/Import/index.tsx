import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();

    const file = uploadedFiles[0];

    data.append('file', file.file, file.name);

    try {
      await api.post('/transactions/import', data);
      toast.success('Transações importadas com sucesso!');
      history.push('/dashboard');
    } catch (err) {
      console.log(err.response.error);
      toast.error(
        'Ocorreu um erro ao realizar a importação, verique os dados e tente novamente.',
      );
    }
  }

  function submitFile(files: File[]): void {
    if (uploadedFiles.length > 0) {
      toast.error('Envie um arquivo por vez');
      return;
    }

    const filteredFiles = files.filter(file => file.type === 'text/csv');

    if (filteredFiles.length === 0) {
      toast.error('É permitido apenas arquivos do tipo CSV');
      return;
    }

    const foundFile = uploadedFiles.filter(({ name }): boolean =>
      filteredFiles.map(file => file.name).includes(name),
    );

    if (foundFile.length > 0) {
      toast.error('Selecione um arquivo diferente');
      return;
    }

    setUploadedFiles([
      ...uploadedFiles,
      ...filteredFiles.map(
        (file): FileProps => ({
          file,
          name: file.name,
          readableSize: filesize(file.size),
        }),
      ),
    ]);
  }

  function handleFileDelete(file: FileProps): void {
    const filteredFiles = uploadedFiles.filter(
      uploadFile => uploadFile.name !== file.name,
    );

    setUploadedFiles([...filteredFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={handleFileDelete} />
          )}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
