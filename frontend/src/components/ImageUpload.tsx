import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from './Modal';

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 400px;
  margin: 2rem auto;
  text-align: left;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #888;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  margin-top: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface UploadResponse {
  url: string;
}

const ImageUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expiration, setExpiration] = useState<number>(60);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiration(Number(e.target.value));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please choose an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('expiration', String(expiration));

      const response = await axios.post<UploadResponse>('/v1/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadUrl(response.data.url);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      alert('Upload failed. Check console for details.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Card>
      <Title>Upload an image</Title>

      <FormGroup>
        <Label htmlFor="imageFile">Choose file:</Label>
        <Input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="expiration">Expiration (seconds):</Label>
        <Input
          id="expiration"
          type="number"
          value={expiration}
          onChange={handleExpirationChange}
        />
      </FormGroup>

      <Button onClick={handleUpload}>Upload</Button>

      {showModal && uploadUrl && (
        <Modal onClose={closeModal}>
          <p style={{ fontWeight: 'bold' }}>Image uploaded successfully!</p>
          <p style={{ margin: '0.5rem 0' }}>Shareable link:</p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '0.4rem 0.6rem',
            }}
          >
            <code
              style={{
                flex: 1,
                marginRight: '1rem',
                wordBreak: 'break-all',
              }}
            >
              {uploadUrl}
            </code>
            <Button
              onClick={() => navigator.clipboard.writeText(uploadUrl)}
              style={{ marginTop: 0 }}
            >
              Copy
            </Button>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default ImageUpload;
