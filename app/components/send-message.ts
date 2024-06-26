import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import AjaxService from '../services/ajax'; // Adjust import path as necessary

interface SendMessageArgs {}

export default class SendMessageComponent extends Component<SendMessageArgs> {
  @tracked message: string = '';
  @service declare ajax: AjaxService;

  @action
  updateMessage(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.message = target.value;
  }

  @action
  async sendMessage(event: Event): Promise<void> {
    event.preventDefault();
    try {
      await this.ajax.post('/send-message', { data: { message: this.message } });
      alert('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
