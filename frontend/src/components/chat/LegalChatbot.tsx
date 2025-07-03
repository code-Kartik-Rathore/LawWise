import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Fab,
  Collapse,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const LegalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const API_KEY = 'AIzaSyDhyuXj2KLCclCsN_-yDr0NuOOLIRQQnls';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Saarthi, a helpful legal assistant chatbot for the LawWise website. You should always identify yourself as Saarthi in your responses. The website offers document analysis and legal assistance services. Answer the following question in a helpful and professional manner. If the question is about legal matters, provide accurate information and cite relevant laws or regulations when possible. If the question is about the website's functionality, explain the features clearly. Do not use asterisks or markdown formatting in your response.

User question: ${input}

Please provide a clear and concise response without any special formatting characters.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text.replace(/\*/g, '');

      const botMessage: Message = {
        text: botResponse.trim(),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      let errorText = 'I apologize, but I encountered an error. Please try again.';
      if (error instanceof Error) {
        errorText += `\nDetails: ${error.message}`;
      }
      // Try to parse API error details if available
      if (error && error.response) {
        try {
          const errData = await error.response.json();
          if (errData && errData.error && errData.error.message) {
            errorText += `\nAPI Error: ${errData.error.message}`;
          }
        } catch {}
      }
      const errorMessage: Message = {
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 
      <Box mt={2}>
        <Blogs />
      </Box>
      */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: '#2563eb',
          '&:hover': { bgcolor: '#1d4ed8' },
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      <Collapse
        in={isChatOpen}
        sx={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 350,
          maxWidth: '90vw',
          zIndex: 1000,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: '#2563eb',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <SmartToyIcon />
            <Typography variant="h6">Saarthi</Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              p: 2,
              bgcolor: '#f8fafc',
            }}
          >
            <List>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{
                    flexDirection: 'column',
                    alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'flex-start',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.sender === 'user' ? '#2563eb' : '#64748b',
                        width: 32,
                        height: 32,
                      }}
                    >
                      {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1.5,
                        maxWidth: '80%',
                        bgcolor: message.sender === 'user' ? '#2563eb' : 'white',
                        color: message.sender === 'user' ? 'white' : 'inherit',
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: '#64748b', ml: message.sender === 'user' ? 0 : 5 }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </ListItem>
              ))}
              {isLoading && (
                <ListItem>
                  <CircularProgress size={20} />
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          <Box sx={{ p: 2, bgcolor: 'white' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              size="small"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    color="primary"
                  >
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Paper>
      </Collapse>
    </>
  );
};

export default LegalChatbot;
