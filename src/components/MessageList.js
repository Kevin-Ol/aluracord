import React from 'react';
import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json';

export function MessageList({ messages, removeMessage, loading }) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      { loading && <p>Carregando mensagens...</p> }
      {messages.map((message) => (
        <Text
          key={message.id}
          tag="li"
          styleSheet={{
            borderRadius: '5px',
            padding: '6px',
            marginBottom: '12px',
            hover: {
              backgroundColor: appConfig.theme.colors.neutrals[700],
            }
          }}
        >
          <Box
            styleSheet={{
              marginBottom: '8px',
            }}
          >
            <Image
              styleSheet={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'inline-block',
                marginRight: '8px',
              }}
              src={`https://github.com/${message.from}.png`}
            />
            <Text tag="strong">
                {message.from}
            </Text>

            <Text
              styleSheet={{
                fontSize: '10px',
                marginLeft: '8px',
                color: appConfig.theme.colors.neutrals[300],
              }}
              tag="span"
            >
              {(new Date().toLocaleDateString())}
            </Text>
            <Button
              variant='tertiary'
              colorVariant='neutral'
              label='x'
              onClick={() => removeMessage(message.id)}
              styleSheet={{
                position: 'absolute',
                right: '8px',
              }}
            />

          </Box>
          {message.text.startsWith(':sticker:') 
            ? (
              <Image 
                src={message.text.replace(':sticker:', '')} 
                styleSheet={{
                  maxWidth: '20%',
                }}
              />
            )
            : (
              message.text
            )
          }
        </Text>
      ))}
    </Box>
  )
}
