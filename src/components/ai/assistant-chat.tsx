"use client"

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, X, Send, User, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// FEATURE FLAG: Définit si l'assistant IA est visible et utilisable par les utilisateurs.
// Actuellement désactivé conformément à la demande "mettre en place sans activer".
export const IS_AI_ENABLED = false;

export function AssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, status, error, sendMessage } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: 'Bonjour ! Je suis l\'assistant expert ElecNorme. Posez-moi vos questions sur la norme NFC 15-100 (ex: "Quelle est la section pour une plaque de cuisson ?").' }]
      }
    ]
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ parts: [{ type: 'text', text: input }], role: 'user' });
    setInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!IS_AI_ENABLED) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-xl shadow-primary/20 hover:scale-105 transition-transform z-50 p-0"
        >
          <Bot className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] transition-all duration-300 transform origin-bottom-right",
        isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
      )}>
        <Card className="border-primary/20 shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[80vh]">
          <CardHeader className="bg-primary/5 border-b p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg text-primary-foreground">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base font-bold">Assistant Normatif</CardTitle>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-500" /> Propulsé par l'IA
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={cn("flex gap-2 max-w-[85%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  m.role === 'user' ? "bg-muted" : "bg-primary/10 text-primary"
                )}>
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm",
                  m.role === 'user' ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
                )}>
                  {m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 max-w-[85%] mr-auto">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl text-sm bg-muted rounded-tl-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce delay-150" />
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Une erreur est survenue de la part de l'assistant.
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-card">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
