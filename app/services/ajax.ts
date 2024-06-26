import Service from '@ember/service';
import { fetch } from 'fetch';

export default class AjaxService extends Service {
  async post(url: string, options: { data: any }): Promise<any> {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options.data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }
}
