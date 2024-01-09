import React, { useState, useEffect } from 'react';
import { Input, Button, VStack, IconButton, HStack, Textarea, Text, Container } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import getEnvironment from '../../getenvironment';
import Header from "../../components/header";


const CertificateForm = () => {
  const apiUrl = getEnvironment();

  const [formData, setFormData] = useState({
    logos: [''],
    header: [''],
    body: '',
    footer: [''],
    signatures: [''],
  });

  const currentURL = window.location.pathname;
  const parts = currentURL.split('/');
  const eventId = parts[parts.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/certificatemodule/certificate/getcertificatedetails/${eventId}`,
        {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',

        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData && Array.isArray(responseData) && responseData.length > 0) {
            // Assuming the backend sends the entire form data in an array
            setFormData(responseData[0]);
          } else {
            console.error('Error: Fetched data does not match expected structure.');
          }
        } else {
          console.error('Error fetching form data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    fetchData();
}, [apiUrl, eventId]);


  const handleChange = (e, fieldName, index) => {
    const { value } = e.target;

    if (fieldName === 'logos' || fieldName === 'header' || fieldName === 'footer' || fieldName === 'signatures') {
      setFormData((prevData) => {
        const updatedField = [...prevData[fieldName]];

        if (index !== null) {
          updatedField[index] = value;
        }

        return {
          ...prevData,
          [fieldName]: updatedField,
        };
      });
    } else if (fieldName === 'body') {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const addField = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: [...prevData[fieldName], ''],
    }));
  };

  const handleDelete = (fieldName, index) => {
    const updatedField = [...formData[fieldName]];
    updatedField.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: updatedField,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/certificatemodule/certificate/content/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxW="lg">
    <Header title="Enter Certificate Details"></Header>

    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="start">
        <Text>Enter the link for the logos:</Text>
        {/* Logos Fields */}
        {formData.logos.map((logo, index) => (
                  <HStack key={index}>
            <Input
              name="logos"
              value={logo}
              onChange={(e) => handleChange(e, 'logos', index)}
              placeholder="Logo"
            />
            {index > 0 && (
              <IconButton
                icon={<CloseIcon />}
                onClick={() => handleDelete('logos', index)}
              />
            )}
            {index === formData.logos.length - 1 && (
              <IconButton
                icon={<AddIcon />}
                onClick={() => addField('logos')}
              />
            )}
          </HStack>
        ))}

        {/* Header Fields */}
        <Text>Enter the Header data:</Text>

        {formData.header.map((header, index) => (
                  <HStack key={index}>
            <Input
              name="header"
              value={header}
              onChange={(e) => handleChange(e, 'header', index)}
              placeholder="Header"
            />
            {index > 0 && (
              <IconButton
                icon={<CloseIcon />}
                onClick={() => handleDelete('header', index)}
              />
            )}
            {index === formData.header.length - 1 && (
              <IconButton
                icon={<AddIcon />}
                onClick={() => addField('header')}
              />
            )}
          </HStack>
        ))}
        <Text>Enter the body of the certificate:</Text>

        <Textarea
          name="body"
          value={formData.body}
          onChange={(e) => handleChange(e, 'body', null)}
          placeholder="Body"
        />
        {/* Footer Fields */}
        <Text>Enter the signature data:</Text>

        {formData.footer.map((footer, index) => (

          <HStack key={index}>
            <Input
              name="footer"
              value={footer}
              onChange={(e) => handleChange(e, 'footer', index)}
              placeholder="Footer"
            />
            {index > 0 && (
              <IconButton
                icon={<CloseIcon />}
                onClick={() => handleDelete('footer', index)}
              />
            )}
            {index === formData.footer.length - 1 && (
              <IconButton
                icon={<AddIcon />}
                onClick={() => addField('footer')}
              />
            )}
          </HStack>
        ))}

<Text>Enter the link for signatures:</Text>
        
        {formData.signatures.map((signature, index) => (
          <HStack key={index}>
            <Input
              name="signatures"
              value={signature}
              onChange={(e) => handleChange(e, 'signatures', index)}
              placeholder="Signature"
            />
            {index > 0 && (
              <IconButton
                icon={<CloseIcon />}
                onClick={() => handleDelete('signatures', index)}
              />
            )}
            {index === formData.signatures.length - 1 && (
              <IconButton
                icon={<AddIcon />}
                onClick={() => addField('signatures')}
              />
            )}
          </HStack>
        ))}

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>

      </VStack>
    </form>
</Container>
  );
};

export default CertificateForm;
