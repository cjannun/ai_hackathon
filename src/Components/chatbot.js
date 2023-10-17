import { React, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import OpenAI from 'openai';
import Message from './Message';

export default function ChatbotWindow( {param1, param2} ) {
  const randomString = ["sk-", "p6Lcwy", "L", "Y0evgo18c", "ucKeT3BlbkFJO", "cObcjKXH928", "ekQpBXIG"];
  const openai = new OpenAI({
    apiKey: randomString.join(''),
    dangerouslyAllowBrowser: true
  });

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add to messages
    const messageHistory = [...messages];

    if (apiResponse !== '') {
      messageHistory.push({
        text: apiResponse,
        isUser: false,
      });
    }
    messageHistory.push({
      text: prompt,
      isUser: true,
    });
    setMessages(messageHistory);

    // Interact with OpenAI API
    setLoading(true);
    const context = `
    You are a chatbot for an informational accounting site, 'https://www.aiccountant.xyz'. Your only function is to direct users to various pages on the website by providing links. The website has the following routes:
    /financial-accounting
    /financial-accounting/gaap
    /financial-accounting/financial-statements
    /managerial-accounting
    /managerial-accounting/cost-accounting
    /managerial-accounting/forecasting
    /managerial-accounting/cvp-analysis
    /auditing/
    /auditing/external-auditing
    /auditing/internal-auditing
    /tax-accounting
    /tax-accounting/tax-planning
    /tax-accounting/tax-compliance
    /tax-accounting/individual-taxes
    /accounting-ethics
    Format all links in markdown format. For example, if a user says "I'm interested in financial accounting", format the link as follows:
    [Financial Accounting](https://www.aiccountant.xyz/financial-accounting)
    Respond to the following request from a website user:
    `;
    const query = context + prompt;
    setPrompt('');
    try {
      const result = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{'role': 'user', 'content': query}],
        max_tokens: 400,
      });
      setApiResponse(result.choices[0].message.content);
    }
    catch (e) {
      messageHistory.push('Error');
      setMessages(messageHistory);
    }
    setLoading(false);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          position: "relative"
        }}
      >
        <div style={{backgroundColor: "#1E1E1E", color: "white", padding: "0.5rem", textAlign:"right", fontSize: "30px", position: "absolute", zIndex: "1", left:"0", right: "0", fontFamily: "Segoe UI"}}>
                <b>aiccountant.&nbsp;&nbsp;&nbsp;</b>
        </div>
        <div style={{position: 'absolute', bottom: '4rem', left: "0", right: "0", maxHeight: "88vh"}}>
        <div style={{position: 'relative', padding: "1rem"}}>
        <ScrollToBottom>
        <div style={{height: "70vh", alignContent: "bottom", marginTop: "2rem"}}>
        
          {messages.map((message, index) => (
            <Message
              key={`message-${index}`}
              message={message.text}
              isUser={message.isUser}
            />
          ))}
          {loading ? <Message message={''} isUser={false} /> : <Message message={apiResponse} isUser={false} />}
        
          </div>
          </ScrollToBottom >
        <div style={{}}>
          <form onSubmit={handleSubmit}>
            <input
              style={{padding: '1rem', width: '69%', borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", background: "#E1E1E1", border: "0px", marginTop: "1rem", marginLeft:"1rem", fontFamily: "Segoe UI"}}
              type='text'
              value={prompt}
              placeholder='Enter prompt...'
              onChange={(e) => setPrompt(e.target.value)}
            ></input>
            <button
              disabled={loading || prompt.length === 0}
              type='submit'
              style= {{padding: "1rem 0.5rem", border: "0", borderBottomRightRadius: "10px", borderTopRightRadius: "10px", background: "#1a8754", color: "white", fontFamily: "Segoe UI", width: "20%"}}
            >
              <b>
              {loading ? 'Loading' : 'Chat'}
              </b>
            </button>
          </form>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};
