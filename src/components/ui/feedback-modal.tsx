"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { MessageSquare } from "lucide-react"

export function FeedbackModal() {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementação futura do envio do formulário
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <MessageSquare className="mr-2 h-4 w-4" />
          Enviar Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enviar Feedback</DialogTitle>
          <DialogDescription>
            Compartilhe sua experiência e sugestões para melhorarmos nossos serviços.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Feedback</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de feedback" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggestion">Sugestão</SelectItem>
                <SelectItem value="improvement">Melhoria</SelectItem>
                <SelectItem value="compliment">Elogio</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Digite um assunto"
              className="w-full"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva seu feedback detalhadamente..."
              className="min-h-[150px]"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="attachments">Anexos (opcional)</Label>
            <Input
              id="attachments"
              type="file"
              className="w-full"
              accept="image/*,.pdf,.doc,.docx"
              multiple
            />
            <p className="text-xs text-muted-foreground">
              Aceita imagens, PDF e documentos Word
            </p>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              Enviar Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 