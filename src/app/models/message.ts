export class Message {
    messageId?: string;
    sendFrom: object;
    sendTo: string;
    title: string;
    body: string;
    active?: true;
    archived?:  false;
    createdAt?: Date = new Date();
    updatedOn?: Date = new Date();
  }
  