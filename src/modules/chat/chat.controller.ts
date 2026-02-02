import type { Request, Response } from 'express'
import {
  createOrGetConversation,
  getMessages
} from './chart.service.js'


export const startConversation = async (req: Request, res: Response) => {
  const { otherUserId } = req.body;
  const user = (req as any).user;

  const convo = await createOrGetConversation(user.id, otherUserId);
  res.json(convo);
};

export const fetchMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const messages = await getMessages(conversationId as string);
  res.json(messages);
}