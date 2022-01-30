import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { Box } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js'
import { MessageBox } from '../src/components/MessageBox'
import { Header } from '../src/components/Header'
import { MessageList } from '../src/components/MessageList'

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const dbListener = (setNewMessage) => {
  supabaseClient.from('messages').on('INSERT', (message) => {
    setNewMessage(message.new)
  }).subscribe();
};

export default function ChatPage() {
  const router = useRouter();
  const { username } = router.query;

  const [messagesList, setMessagesList] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchSupabase = async () => {
      const { data } = await supabaseClient
        .from('messages')
        .select('*')
        .order('id', { ascending: false });

      setMessagesList(data);
      setLoading(false);
    }

    dbListener((newMessage) => {
      setMessagesList((oldList) => [newMessage, ...oldList]);
    });

    fetchSupabase();
  }, [])

  const handleNewMessage = async (newMessage) => {
    if (newMessage === '' ) return;

    const messageDetails = {
      text: newMessage,
      from: username,
    }

    await supabaseClient.from('messages').insert([messageDetails]);
  }

  const removeMessage = (messageId) => {
    setMessagesList((oldList) => {
      const copyList = [...oldList];
      const index = copyList.findIndex(({id}) => id === messageId);
      copyList.splice(index, 1);
      return copyList;
    })
  };

  const onStickerClick = (sticker) => {
    handleNewMessage(`:sticker: ${sticker}`)
  };

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundImage: `url(https://i.pinimg.com/originals/ad/66/49/ad66497baf21cb2ae11d65be0b59cc63.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList messages={messagesList} removeMessage={removeMessage} loading={loading} />
          <MessageBox handleNewMessage={handleNewMessage} onStickerClick={onStickerClick} />
        </Box>
      </Box>
    </Box>
  )
}
