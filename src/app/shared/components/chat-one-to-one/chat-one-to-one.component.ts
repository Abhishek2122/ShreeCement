import { Component } from '@angular/core';

@Component({
  selector: 'chat-one-to-one',
  templateUrl: './chat-one-to-one.component.html',
  styleUrl: './chat-one-to-one.component.scss'
})
export class ChatOneToOneComponent {

  messages: any[]=[];

  constructor() {
    // this.messages = this.chatShowcaseService.loadMessages();
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: { src: any; type: any; }) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    // const botReply = this.chatShowcaseService.reply(event.message);
    // if (botReply) {
    //   setTimeout(() => { this.messages.push(botReply) }, 500);
    // }
  }
}
