import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box, Button, Text, TextField, Image,
} from '@skynexui/components';

import appConfig from '../config.json';

function Title({ children, tag }) {
  const Tag = tag || 'h1';
  return (
    <>
      <Tag>{children}</Tag>
      <style jsx>
        {`
          ${Tag} {
              color: ${appConfig.theme.colors.primary['600']};
              font-size: 28px;
              font-weight: 600;
              -webkit-text-stroke: 0.7px black;
          }
        `}
      </style>
    </>
  );
}

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(https://i.pinimg.com/originals/ad/66/49/ad66497baf21cb2ae11d65be0b59cc63.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            maxWidth: '800px',
            borderRadius: '5px',
            padding: '64px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: 'rgba(22, 22, 22, 0.35)',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              router.push('/chat');
            }}
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '100%', sm: '50%' },
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: '32px',
                fontSize: '16px',
                color: appConfig.theme.colors.primary[500],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={({ target: { value } }) => {
                setUsername(value)
                if (value.length <= 2) {
                  return setBtnDisabled(true)
                }
                setBtnDisabled(false)
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[100],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              disabled={btnDisabled}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals[900],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: 'rgba(11, 11, 11, 0.8)',
              border: '1px solid',
              borderColor: appConfig.theme.colors.primary['200'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            { !btnDisabled &&
              <>
                <Image
                  styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                  }}
                  src={`https://github.com/${username}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.primary['300'],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    border: '1px solid',
                    borderColor: appConfig.theme.colors.primary['200'],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                  }}
                >
                  {username}
                </Text>
              </>
            }
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
