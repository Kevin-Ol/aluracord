import React, { useState } from 'react';
import { Box, TextField, Button } from '@skynexui/components';
import appConfig from '../../config.json';
import { ButtonSendSticker } from './ButtonSendSticker'

export function MessageBox({ handleNewMessage, onStickerClick }) {
  const [message, setMessage] = useState('');

  return (
    <Box
      as="form"
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        value={ message }
        onChange={ ({target: {value: value}}) => setMessage(value) }
        onKeyPress={ (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleNewMessage(message);
            setMessage('');
          }
        } }
        placeholder="Insira sua mensagem aqui..."
        type="textarea"
        styleSheet={{
          width: '100%',
          border: '0',
          resize: 'none',
          borderRadius: '5px',
          padding: '6px 8px',
          backgroundColor: appConfig.theme.colors.neutrals[800],
          marginRight: '12px',
          color: appConfig.theme.colors.neutrals[200],
        }}
      />
      <ButtonSendSticker onStickerClick={onStickerClick} />
      <Button
        type="button"
        label="Enviar"
        styleSheet={{
          marginBottom: '9px',
        }}
        onClick={ () => {
          handleNewMessage(message);
          setMessage('');
        } }
        buttonColors={{
          contrastColor: appConfig.theme.colors.neutrals[900],
          mainColor: appConfig.theme.colors.primary[500],
          mainColorLight: appConfig.theme.colors.primary[400],
          mainColorStrong: appConfig.theme.colors.primary[600],
        }}
      />
    </Box>
  )
}
