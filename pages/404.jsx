import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import {
  Box, Button, Text, TextField, Image,
} from '@skynexui/components';

export default function Error() {
  const router = useRouter();

  return (
    <section>
      <h1>404 - Página não encontrada</h1>
      <div>
        <img src="https://www.themarysue.com/wp-content/uploads/2020/01/geralt-of-rivia-sword-the-witcher.jpg"/>
        <div>
          <h1>Ops, você não deveria estar aqui!</h1>
          <Button
                label="Voltar para página inicial"
                onClick={() => router.push('/')}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
        </div>
      </div>

      <style jsx>{`
        section {
          padding: 36px;
          background-color: ${appConfig.theme.colors.neutrals[900]};
          min-height: 100vh;
        }
        section > div { 
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          place-items: center;
          height: 98%;
        }
        
        img {
          max-width: 100%;
        }

        h1 {
          color: ${appConfig.theme.colors.primary[700]};
          margin-bottom: 16px;
        }

      `}</style>
    </section>
  );
}
